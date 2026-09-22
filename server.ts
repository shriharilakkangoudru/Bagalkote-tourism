import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Increase payload limit for image base64 uploads
app.use(express.json({ limit: '20mb' }));

// Lazy GoogleGenAI client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Model availability & cooldown tracker for resilient fallback
const modelCooldowns: Record<string, number> = {};

function isModelCoolingDown(model: string): boolean {
  const expiry = modelCooldowns[model];
  if (!expiry) return false;
  if (Date.now() > expiry) {
    delete modelCooldowns[model];
    return false;
  }
  return true;
}

function markModelUnavailable(model: string, durationMs = 180_000) {
  modelCooldowns[model] = Date.now() + durationMs;
}

// Resilient Gemini caller supporting automatic fallback across valid models
// According to Gemini API guidance: 'gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'
async function generateWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    preferredModel?: string;
  }
): Promise<{ text: string; modelUsed: string }> {
  // Healthy candidate pool: prioritize flash-lite and flash-latest to avoid 503 high-demand blocks
  const preferred = params.preferredModel;
  const basePool = preferred && !isModelCoolingDown(preferred)
    ? [preferred, 'gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash']
    : ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];

  // De-duplicate while prioritizing models that are NOT cooling down
  const uniquePool = [...new Set(basePool)];
  const modelsToTry = [
    ...uniquePool.filter((m) => !isModelCoolingDown(m)),
    ...uniquePool.filter((m) => isModelCoolingDown(m)),
  ];

  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
      });

      // Clear any cooldown on success
      delete modelCooldowns[model];

      return {
        text: response.text || '',
        modelUsed: model,
      };
    } catch (err: any) {
      lastError = err;
      const isOverloaded =
        err?.status === 503 ||
        err?.message?.includes('503') ||
        err?.message?.includes('high demand') ||
        err?.message?.includes('UNAVAILABLE');

      if (isOverloaded) {
        // Cooldown for 3 minutes to skip 503 delays on subsequent requests
        markModelUnavailable(model, 180_000);
      }
      // Non-blocking brief pause before trying next model
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }

  throw lastError || new Error('All candidate Gemini models are currently unavailable');
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    appName: 'AI HERITAGE LENS',
    region: "Bagalkote, Karnataka, India",
  });
});

// 1a. Google Maps Platform config
app.get('/api/config/maps', (req, res) => {
  const apiKey =
    process.env.VITE_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    '';
  res.json({
    apiKey,
    configured: !!apiKey,
  });
});

// 1b. Check Image from Internet URL
app.post('/api/check-image-url', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl || typeof imageUrl !== 'string') {
      return res.status(400).json({ valid: false, error: 'Valid imageUrl required' });
    }

    const response = await fetch(imageUrl, {
      signal: AbortSignal.timeout(8000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      return res.json({
        valid: false,
        status: response.status,
        error: `Remote server returned HTTP ${response.status}`,
      });
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) {
      return res.json({
        valid: false,
        error: `URL is not an image (Content-Type: ${contentType})`,
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${contentType};base64,${base64}`;

    return res.json({
      valid: true,
      status: 200,
      contentType,
      sizeBytes: buffer.length,
      dataUrl,
      sourceUrl: imageUrl,
    });
  } catch (error: any) {
    return res.json({
      valid: false,
      error: error?.message || 'Failed to reach image on the internet',
    });
  }
});

// 1c. Safe Image Proxy for Internet Images
app.get('/api/proxy-image', async (req, res) => {
  try {
    const imageUrl = req.query.url as string;
    if (!imageUrl) return res.status(400).send('No url provided');

    const response = await fetch(imageUrl, {
      signal: AbortSignal.timeout(8000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(Buffer.from(buffer));
  } catch (err: any) {
    res.status(500).send('Proxy error: ' + err?.message);
  }
});

// 2. Real Gemini Vision Monument Recognition
app.post('/api/gemini/recognize', async (req, res) => {
  try {
    const { imageBase64, imageUrl, mimeType = 'image/jpeg' } = req.body;
    let cleanBase64 = '';
    let effectiveMime = mimeType;

    if (imageBase64) {
      cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    } else if (imageUrl) {
      // Download image from internet
      try {
        const imgRes = await fetch(imageUrl, {
          signal: AbortSignal.timeout(8000),
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });
        if (!imgRes.ok) {
          return res.status(400).json({ error: `Could not fetch image from internet: HTTP ${imgRes.status}` });
        }
        effectiveMime = imgRes.headers.get('content-type') || 'image/jpeg';
        const arrayBuffer = await imgRes.arrayBuffer();
        cleanBase64 = Buffer.from(arrayBuffer).toString('base64');
      } catch (fetchErr: any) {
        return res.status(400).json({ error: `Failed to download image from internet: ${fetchErr?.message}` });
      }
    } else {
      return res.status(400).json({ error: 'No image or imageUrl provided' });
    }

    const ai = getAIClient();
    if (!ai) {
      return res.json({
        isLiveAI: false,
        message: 'Gemini API key not configured. Using local visual classifier & demo datasets.',
      });
    }

    const prompt = `You are an expert archeologist and architectural historian specializing in Karnataka's Early Chalukyan monuments (Badami, Pattadakal, Aihole in Bagalkote district).
Analyze this image and identify which monument it is.
Candidate monuments include:
1. Badami Cave Temples (Cave 1 Shiva/Nataraja, Cave 2 Vishnu/Trivikrama, Cave 3 Vishnu/Narasimha, Cave 4 Jain)
2. Virupaksha Temple, Pattadakal
3. Papanatha Temple, Pattadakal
4. Durga Temple, Aihole (Apsidal)
5. Lad Khan Temple, Aihole
6. Bhutanatha Temple, Badami (Lake Agastya)
7. Mallikarjuna Temple, Pattadakal
8. Ravana Phadi Cave, Aihole
9. Banashankari Amma Temple, Cholachagudda
10. Badami Northern Fort / Lower Shivalaya / Upper Shivalaya
11. Other historical monument

Respond strictly in valid JSON format with this schema:
{
  "matchedId": "badami-caves" | "virupaksha-pattadakal" | "papanatha-pattadakal" | "durga-temple-aihole" | "lad-khan-aihole" | "bhutanatha-badami" | "other",
  "monumentName": "string",
  "location": "string",
  "confidenceScore": number (between 70 and 99),
  "period": "string",
  "architectureStyle": "string",
  "detectedFeatures": ["feature 1", "feature 2", "feature 3"],
  "historicalSignificance": "string",
  "recommendedAction": "string"
}`;

    // Call Gemini with automatic fallback across supported vision models
    const { text: responseText, modelUsed } = await generateWithFallback(ai, {
      preferredModel: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: cleanBase64,
                mimeType: effectiveMime,
              },
            },
          ],
        },
      ],
    });

    let parsed = null;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      }
    } catch {
      console.warn('Failed to parse json from Gemini response, raw:', responseText);
    }

    return res.json({
      isLiveAI: true,
      modelUsed,
      rawText: responseText,
      data: parsed,
    });
  } catch (error: any) {
    console.error('Error in /api/gemini/recognize:', error?.message || error);
    return res.json({
      isLiveAI: false,
      error: error?.message || 'Error executing AI recognition',
      fallbackToDemo: true,
    });
  }
});

// 3. AI Heritage Assistant Chat
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, monumentContext, language = 'en', highThinking = false } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getAIClient();
    if (!ai) {
      return res.json({
        isLiveAI: false,
        response: null,
      });
    }

    const langInstruction =
      language === 'kn'
        ? 'Please answer in fluent, respectful, and culturally authentic Kannada (ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ).'
        : language === 'hi'
        ? 'Please answer in clear, engaging Hindi (हिन्दी देवनागरी लिपि में).'
        : 'Please answer in engaging, informative, high-clarity English.';

    const systemPrompt = `You are the official AI Heritage Assistant for "AI HERITAGE LENS", specializing in the monuments of Bagalkote district, Karnataka, India (specifically Badami, Pattadakal, Aihole, Mahakuta, and Banashankari).
You possess deep historical, architectural, epigraphical, and travel knowledge about the Badami Chalukyas (6th to 8th century CE), Pulakeshin II, Queen Lokamahadevi, Dravidian, Nagara and Vesara architecture styles, Agastya Lake, UNESCO World Heritage status of Pattadakal, Aihole as the "Cradle of Indian Temple Architecture", local North Karnataka cuisine (Jolada Rotti oota, Shenga Chutney), traveling distances, guides, and photography tips.

Current Monument in View (if any): ${monumentContext || 'General Bagalkote Heritage'}
Language Requirement: ${langInstruction}

Keep answers authoritative, warm, well-formatted with concise bullet points or short paragraphs. Suggest practical tips for tourists (best time to visit, walking distances, photography spots).`;

    const { text: responseText, modelUsed } = await generateWithFallback(ai, {
      preferredModel: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nTourist Query: ${message}` }],
        },
      ],
    });

    return res.json({
      isLiveAI: true,
      modelUsed,
      response: responseText,
    });
  } catch (error: any) {
    console.error('Error in /api/gemini/chat:', error?.message || error);
    return res.json({
      isLiveAI: false,
      error: error?.message,
    });
  }
});

// 4. AI Trip Planner Generator
app.post('/api/gemini/trip-plan', async (req, res) => {
  try {
    const {
      startLocation = 'Badami',
      days = 1,
      people = 2,
      budget = '₹1500',
      travelPreference = 'Historic & Photography',
      interests = 'Temples, Architecture, Lake View',
      language = 'en',
    } = req.body;

    const ai = getAIClient();
    if (!ai) {
      return res.json({ isLiveAI: false });
    }

    const prompt = `Generate a realistic, practical, and culturally rich ${days}-day travel itinerary for Bagalkote heritage sites starting from ${startLocation} for ${people} people with an estimated budget of ${budget}.
Travel style: ${travelPreference}, Interests: ${interests}.
Language: ${language === 'kn' ? 'Kannada' : language === 'hi' ? 'Hindi' : 'English'}.

Respond strictly with valid JSON format:
{
  "title": "string",
  "summary": "string",
  "timeline": [
    {
      "time": "08:00 AM",
      "activity": "string",
      "location": "string",
      "tips": "string"
    }
  ],
  "budgetBreakdown": [
    { "category": "Entry Tickets & ASI Passes", "estimatedCost": "₹..." },
    { "category": "Local Transport (Auto / Taxi)", "estimatedCost": "₹..." },
    { "category": "Food & North Karnataka Jolada Rotti", "estimatedCost": "₹..." },
    { "category": "Guide / Audio / Miscellaneous", "estimatedCost": "₹..." }
  ],
  "proTips": ["tip 1", "tip 2", "tip 3"]
}`;

    const { text: responseText, modelUsed } = await generateWithFallback(ai, {
      preferredModel: 'gemini-3.8-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    let plan = null;
    try {
      const match = responseText.match(/\{[\s\S]*\}/);
      if (match) plan = JSON.parse(match[0]);
    } catch (e) {
      console.warn('Could not parse trip plan JSON:', e);
    }

    return res.json({ isLiveAI: true, modelUsed, plan, rawText: responseText });
  } catch (error: any) {
    return res.json({ isLiveAI: false, error: error?.message });
  }
});

// Setup Vite development middleware or static production serving
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AI HERITAGE LENS] Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
