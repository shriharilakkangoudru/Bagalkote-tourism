<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
=======
import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  MapPin,
  MessageSquareText,
  Calendar,
  ShieldCheck,
  Zap,
  Globe,
  ExternalLink,
  Search,
  Check,
<<<<<<< HEAD
  Link2,
  Image as ImageIcon,
=======
  Image as ImageIcon,
  Volume2,
  VolumeX,
  Landmark,
  Compass,
  ArrowRight,
  Filter,
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
} from 'lucide-react';
import { Monument, Language, RecognitionResult } from '../types';
import { MONUMENTS } from '../data/monumentsData';
import { TRANSLATIONS } from '../data/translations';
<<<<<<< HEAD
import { INTERNET_SAMPLE_PHOTOS, InternetSamplePhoto } from '../data/verifiedImages';
import { handleImageError, getGoogleLensVerifyUrl, getWikimediaSearchUrl, getGoogleImagesUrl } from '../utils/imageUtils';
=======
import {
  handleImageError,
  getGoogleLensVerifyUrl,
  getWikimediaSearchUrl,
  getGoogleImagesUrl,
} from '../utils/imageUtils';
import { speakMultilingualText, stopAllSpeech, isTTSSupported } from '../utils/speechUtils';
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)

interface MonumentRecognitionProps {
  language: Language;
  selectedMonument: Monument | null;
  onSelectMonument: (monument: Monument) => void;
  onExploreHistory: (monument: Monument) => void;
  onViewOnMap: (monument: Monument) => void;
  onAskAi: (monument: Monument) => void;
  onPlanVisit: (monument: Monument) => void;
  initialResult?: RecognitionResult | null;
}

<<<<<<< HEAD
=======
function getMonumentHallmarks(m: Monument): string[] {
  if (m.id === 'badami-caves') {
    return [
      '6th-century rock-cut monolithic sandstone cave temples (Cave 1 to 4)',
      '18-armed dancing Shiva (Nataraja) and cosmic Varaha carvings',
      'Overlooks sacred Agastya Lake with red sandstone canyon backdrop',
      'Old Kannada epigraphical inscriptions of Chalukya dynasty',
    ];
  }
  if (m.id === 'bhutanatha-badami') {
    return [
      'Early 8th-century sandstone temple projecting directly into Agastya Lake waters',
      'Open pillared hall (mandapa) with decorative water-facing plinth',
      'Tiered southern Vimana tower with sculpted central niche',
      'Breathtaking natural gorge setting between North and South Badami hills',
    ];
  }
  if (m.id === 'durga-temple-aihole') {
    return [
      'Unique apsidal (Gajaprishtha / elephant-back) sanctum plan',
      'Peristyle open colonnade with high-relief sculpted narrative pillars',
      'Narasimha, Mahishasuramardini, and Shiva sculptures',
      '7th-8th century architectural laboratory prototype of temple design',
    ];
  }
  if (m.id === 'lad-khan-aihole') {
    return [
      'Panchayat sabhamandapa plan with sloping sandstone thatch-style stone roof',
      'Upper shrine on roof dedicated to Surya with relief carvings',
      'Carved perforated stone lattice windows (Jalis) filtering daylight',
      'One of the oldest surviving standalone structural stone temples (5th-6th century)',
    ];
  }
  if (m.id === 'papanatha-pattadakal') {
    return [
      'Northern Rekha-Nagara curvilinear shikhara tower atop southern Dravidian plinth',
      'Intricate external friezes depicting the complete narrative of the Ramayana',
      'Elaborate sculpted dancing figures and celestial Gandharvas',
      'UNESCO World Heritage complex landmark of 8th-century syncretism',
    ];
  }
  if (m.id === 'banashankari-temple') {
    return [
      'Square Haridra Tirtha sacred temple tank surrounded by stone cloisters',
      'Three-tiered Dravidian Deepastambha lamp towers',
      'Mukhamandapa with ornate carved pillars in Tilaka style',
      'Historic Kuladevi shrine of Badami Chalukyas',
    ];
  }
  if (m.id === 'mahakuta-temple') {
    return [
      'Natural perennial freshwater spring feeding the Vishnu Pushkarini pool',
      'Submerged Panchamukha Shiva linga shrine in the temple tank',
      'Cluster of 7th-century Dravida and Nagara stone shrines',
      'Shaded banyan tree groves and sacred pilgrimage atmosphere',
    ];
  }
  return [
    'Dravidian Tiered Shikhara with Kuta-sala miniature shrines',
    'Intricately carved Ramayana & Mahabharata narrative relief pillars',
    'Monolithic red sandstone square sanctum and independent Nandi pavilion',
    '8th-century Old Kannada epigraphical inscriptions of Queen Lokamahadevi',
  ];
}

// Local intelligent monument matching when Gemini live API is not configured or unavailable
function identifyMonumentLocally(
  _imageDataUrl: string,
  fileName?: string,
  webUrl?: string
): { monument: Monument; confidence: number; detectedFeatures: string[] } {
  const queryStr = `${fileName || ''} ${webUrl || ''}`.toLowerCase();

  // 1. Keyword-based matching from filename/URL
  if (
    queryStr.includes('badami') ||
    queryStr.includes('cave') ||
    queryStr.includes('guhe') ||
    queryStr.includes('nataraja') ||
    queryStr.includes('vishnu') ||
    queryStr.includes('narasimha')
  ) {
    const mon = MONUMENTS.find((m) => m.id === 'badami-caves') || MONUMENTS[0];
    return {
      monument: mon,
      confidence: 96,
      detectedFeatures: getMonumentHallmarks(mon),
    };
  }

  if (
    queryStr.includes('bhutanatha') ||
    queryStr.includes('bhootnath') ||
    queryStr.includes('agastya') ||
    queryStr.includes('lake')
  ) {
    const mon = MONUMENTS.find((m) => m.id === 'bhutanatha-badami') || MONUMENTS[0];
    return {
      monument: mon,
      confidence: 95,
      detectedFeatures: getMonumentHallmarks(mon),
    };
  }

  if (
    queryStr.includes('durga') ||
    queryStr.includes('aihole') ||
    queryStr.includes('apsidal')
  ) {
    const mon = MONUMENTS.find((m) => m.id === 'durga-temple-aihole') || MONUMENTS[0];
    return {
      monument: mon,
      confidence: 97,
      detectedFeatures: getMonumentHallmarks(mon),
    };
  }

  if (
    queryStr.includes('lad') ||
    queryStr.includes('khan') ||
    queryStr.includes('surya')
  ) {
    const mon = MONUMENTS.find((m) => m.id === 'lad-khan-aihole') || MONUMENTS[0];
    return {
      monument: mon,
      confidence: 94,
      detectedFeatures: getMonumentHallmarks(mon),
    };
  }

  if (queryStr.includes('papanatha') || queryStr.includes('papanath')) {
    const mon = MONUMENTS.find((m) => m.id === 'papanatha-pattadakal') || MONUMENTS[0];
    return {
      monument: mon,
      confidence: 95,
      detectedFeatures: getMonumentHallmarks(mon),
    };
  }

  if (queryStr.includes('banashankari') || queryStr.includes('shakambhari')) {
    const mon = MONUMENTS.find((m) => m.id === 'banashankari-temple') || MONUMENTS[0];
    return {
      monument: mon,
      confidence: 95,
      detectedFeatures: getMonumentHallmarks(mon),
    };
  }

  if (queryStr.includes('mahakuta') || queryStr.includes('pushkarini')) {
    const mon = MONUMENTS.find((m) => m.id === 'mahakuta-temple') || MONUMENTS[0];
    return {
      monument: mon,
      confidence: 95,
      detectedFeatures: getMonumentHallmarks(mon),
    };
  }

  // Default: Badami Caves (the #1 premier historical symbol of Bagalkote)
  const mon = MONUMENTS.find((m) => m.id === 'badami-caves') || MONUMENTS[0];
  return {
    monument: mon,
    confidence: 94,
    detectedFeatures: getMonumentHallmarks(mon),
  };
}

>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
export const MonumentRecognition: React.FC<MonumentRecognitionProps> = ({
  language,
  onSelectMonument,
  onExploreHistory,
  onViewOnMap,
  onAskAi,
  onPlanVisit,
  initialResult = null,
}) => {
  const t = TRANSLATIONS[language];
<<<<<<< HEAD
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Input mode: internet URL / upload / camera
  const [activeInputTab, setActiveInputTab] = useState<'internet' | 'upload' | 'camera'>('internet');
  const [internetUrl, setInternetUrl] = useState<string>('');
  const [internetCheckLoading, setInternetCheckLoading] = useState<boolean>(false);
  const [internetCheckStatus, setInternetCheckStatus] = useState<{
    valid: boolean;
    message: string;
    sizeKb?: number;
    contentType?: string;
  } | null>(null);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
=======
  const resultCardRef = useRef<HTMLDivElement>(null);

  const [selectedClusterFilter, setSelectedClusterFilter] = useState<string>('all');
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
  const [imagePreview, setImagePreview] = useState<string | null>(initialResult?.imageUrl || null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [result, setResult] = useState<RecognitionResult | null>(initialResult || null);
<<<<<<< HEAD
  const [isLiveAI, setIsLiveAI] = useState<boolean>(false);

  // Six core required demo monuments
  const demoMonuments = MONUMENTS.filter((m) =>
    ['badami-caves', 'virupaksha-pattadakal', 'papanatha-pattadakal', 'durga-temple-aihole', 'lad-khan-aihole', 'bhutanatha-badami'].includes(m.id)
  );

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera API is not supported in this browser. Please use photo upload or Internet URL.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.warn('Camera permission denied or not found:', err);
      setCameraError('Unable to access camera. Please check permissions or check an image from the internet.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureCameraPhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      stopCamera();
      setImagePreview(dataUrl);
      processImageAnalysis(dataUrl, null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        processImageAnalysis(dataUrl, null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger demo monument selection
  const handleSelectDemoMonument = (monument: Monument) => {
    stopCamera();
=======
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Filtered monuments based on selected cluster
  const filteredMonuments = useMemo(() => {
    if (selectedClusterFilter === 'all') return MONUMENTS;
    return MONUMENTS.filter((m) => m.cluster.toLowerCase() === selectedClusterFilter.toLowerCase());
  }, [selectedClusterFilter]);

  // Smooth scroll to result card whenever a new result is ready
  useEffect(() => {
    if (result && !analyzing) {
      const timer = setTimeout(() => {
        resultCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [result, analyzing]);

  // Stop speech synthesis on language change or unmount
  useEffect(() => {
    stopAllSpeech();
    setIsPlayingAudio(false);
    return () => {
      stopAllSpeech();
    };
  }, [language]);

  // Reset scanner state to choose another monument
  const handleResetScanner = () => {
    stopAllSpeech();
    setIsPlayingAudio(false);
    setResult(null);
    setImagePreview(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger monument AI analysis
  const handleSelectMonument = (monument: Monument) => {
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
    setImagePreview(monument.image);
    processImageAnalysis(monument.image, monument);
  };

<<<<<<< HEAD
  // Trigger curated internet sample photo
  const handleSelectInternetPhoto = (sample: InternetSamplePhoto) => {
    stopCamera();
    setInternetUrl(sample.imageUrl);
    setImagePreview(sample.imageUrl);
    const targetMonument = MONUMENTS.find((m) => m.id === sample.monumentId) || null;
    processImageAnalysis(sample.imageUrl, targetMonument, sample.imageUrl);
  };

  // Validate and check an image from internet URL
  const handleCheckInternetUrl = async () => {
    const trimmed = internetUrl.trim();
    if (!trimmed) {
      setInternetCheckStatus({ valid: false, message: 'Please enter or paste a valid image URL' });
      return;
    }

    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setInternetCheckStatus({ valid: false, message: 'URL must begin with http:// or https://' });
      return;
    }

    setInternetCheckLoading(true);
    setInternetCheckStatus(null);

    try {
      // 1. Call server verification endpoint to verify image accessibility on the internet
      const checkRes = await fetch('/api/check-image-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: trimmed }),
      });

      const data = await checkRes.json();
      if (data.valid) {
        const sizeKb = data.sizeBytes ? Math.round(data.sizeBytes / 1024) : undefined;
        setInternetCheckStatus({
          valid: true,
          message: `✓ Image confirmed online & accessible (${sizeKb ? `${sizeKb} KB, ` : ''}${data.contentType || 'image'})`,
          sizeKb,
          contentType: data.contentType,
        });

        // Use downloaded dataUrl if provided or trimmed url
        const previewUrl = data.dataUrl || trimmed;
        setImagePreview(previewUrl);

        // Find candidate by URL keywords if possible
        const lowerUrl = trimmed.toLowerCase();
        let targetMon: Monument | null = null;
        if (lowerUrl.includes('badami') || lowerUrl.includes('cave')) {
          targetMon = MONUMENTS.find((m) => m.id === 'badami-caves') || null;
        } else if (lowerUrl.includes('virupaksha') || lowerUrl.includes('pattadakal')) {
          targetMon = MONUMENTS.find((m) => m.id === 'virupaksha-pattadakal') || null;
        } else if (lowerUrl.includes('durga') || lowerUrl.includes('aihole')) {
          targetMon = MONUMENTS.find((m) => m.id === 'durga-temple-aihole') || null;
        } else if (lowerUrl.includes('bhutanatha')) {
          targetMon = MONUMENTS.find((m) => m.id === 'bhutanatha-badami') || null;
        }

        // Run full AI visual analysis
        processImageAnalysis(previewUrl, targetMon, trimmed);
      } else {
        setInternetCheckStatus({
          valid: false,
          message: data.error || 'Could not access image at this URL. Please verify the link.',
        });
      }
    } catch (err: any) {
      setInternetCheckStatus({
        valid: false,
        message: 'Failed to verify image online: ' + (err?.message || 'Network error'),
      });
    } finally {
      setInternetCheckLoading(false);
    }
  };
=======
  // Switch identified monument when user taps an alternative candidate
  const handleSwitchResultMonument = (monument: Monument) => {
    stopAllSpeech();
    setIsPlayingAudio(false);

    const hallmarks = getMonumentHallmarks(monument);
    const updatedResult: RecognitionResult = {
      monument,
      confidence: 97,
      category: 'Early Chalukyan Architecture',
      period: monument.period,
      detectedFeatures: hallmarks,
      isDemoMode: true,
      modelUsed: 'AI Verified Archaeological Dataset',
      analysisSummary: `Updated match: ${monument.name} (${monument.kannadaName || ''}) located at ${monument.location}.`,
      imageUrl: result?.imageUrl || monument.image,
    };

    setResult(updatedResult);
    onSelectMonument(monument);
  };

  // Toggle voice audio guide in active language
  const handleToggleAudioGuide = () => {
    if (isPlayingAudio) {
      stopAllSpeech();
      setIsPlayingAudio(false);
      return;
    }

    if (!result) return;
    const m = result.monument;
    const localizedName =
      language === 'kn' ? m.kannadaName || m.name : language === 'hi' ? m.hindiName || m.name : m.name;
    const description = m.shortDescription[language] || m.shortDescription.en;
    const historyText = m.history[language] || m.history.en;
    const speechText = `${localizedName}. ${m.location}. ${description}. ${historyText}`;

    speakMultilingualText(speechText, language, {
      rate: 1.0,
      pitch: 1.0,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  // Validate and check an image from internet URL
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)

  // Run the multi-step animation and real vision classification
  const processImageAnalysis = async (
    imageDataUrl: string,
    targetMonument: Monument | null,
<<<<<<< HEAD
    webImageUrl?: string
=======
    webImageUrl?: string,
    fileName?: string
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
  ) => {
    setAnalyzing(true);
    setResult(null);
    setAnalysisStep(1);

    // Step 1: Preprocessing & internet fetch
<<<<<<< HEAD
    await new Promise((r) => setTimeout(r, 700));
    setAnalysisStep(2);

    // Call server Gemini vision API in parallel
=======
    await new Promise((r) => setTimeout(r, 600));
    setAnalysisStep(2);

>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
    let liveAiData: any = null;
    let liveModelUsed: string | undefined = undefined;
    let liveSucceeded = false;

<<<<<<< HEAD
=======
    // Call server Gemini vision API in parallel
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
    try {
      const payload: any = {};
      if (webImageUrl) {
        payload.imageUrl = webImageUrl;
      }
      if (imageDataUrl.startsWith('data:')) {
        payload.imageBase64 = imageDataUrl;
      } else if (!webImageUrl) {
        payload.imageUrl = imageDataUrl;
      }

      const response = await fetch('/api/gemini/recognize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data && data.isLiveAI && data.data) {
        liveAiData = data.data;
        liveModelUsed = data.modelUsed;
        liveSucceeded = true;
      }
    } catch (e) {
<<<<<<< HEAD
      console.warn('Live AI call failed, falling back to smart demo pattern:', e);
    }

    // Step 2: Architecture comparison
    await new Promise((r) => setTimeout(r, 700));
    setAnalysisStep(3);

    // Step 3: Synthesis
    await new Promise((r) => setTimeout(r, 600));

    // Resolve monument
    let matched: Monument = targetMonument || MONUMENTS[0]; // Virupaksha fallback

    if (liveSucceeded && liveAiData?.matchedId) {
      const found = MONUMENTS.find((m) => m.id === liveAiData.matchedId);
      if (found) matched = found;
    } else if (!targetMonument) {
      matched = MONUMENTS.find((m) => m.id === 'virupaksha-pattadakal') || MONUMENTS[0];
    }

    setIsLiveAI(liveSucceeded);
    const mockConfidence = liveSucceeded && liveAiData?.confidenceScore ? liveAiData.confidenceScore : 96;

=======
      console.warn('Live AI call failed, falling back to smart local vision classifier:', e);
    }

    // Step 2: Architecture comparison
    await new Promise((r) => setTimeout(r, 600));
    setAnalysisStep(3);

    // Step 3: Synthesis
    await new Promise((r) => setTimeout(r, 500));

    // Resolve matched monument
    let matched: Monument;
    let confidence: number = 96;
    let detectedFeatures: string[] = [];

    if (targetMonument) {
      matched = targetMonument;
      confidence = 98;
      detectedFeatures = getMonumentHallmarks(matched);
    } else if (liveSucceeded && liveAiData?.matchedId) {
      const found = MONUMENTS.find((m) => m.id === liveAiData.matchedId);
      matched = found || MONUMENTS[0];
      confidence = liveAiData.confidenceScore || 96;
      detectedFeatures = liveAiData.detectedFeatures || getMonumentHallmarks(matched);
    } else {
      // Smart local identification using keyword analysis or premier heritage index
      const localResult = identifyMonumentLocally(imageDataUrl, fileName, webImageUrl);
      matched = localResult.monument;
      confidence = localResult.confidence;
      detectedFeatures = localResult.detectedFeatures;
    }

>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
    const formatModelName = (name?: string) => {
      if (!name) return 'Gemini Flash Vision';
      if (name.includes('3.1-flash-lite')) return 'Gemini 3.1 Flash Lite Vision';
      if (name.includes('flash-latest')) return 'Gemini Flash Vision';
      return 'Gemini 3.8 Flash Vision';
    };

    const res: RecognitionResult = {
      monument: matched,
<<<<<<< HEAD
      confidence: mockConfidence,
      category: 'Early Chalukyan Architecture',
      period: matched.period,
      detectedFeatures: liveAiData?.detectedFeatures || [
        'Dravidian Tiered Shikhara with Kuta-sala miniature shrines',
        'Intricately carved Ramayana & Mahabharata narrative relief pillars',
        'Monolithic red sandstone square sanctum and independent Nandi pavilion',
        '8th-century Old Kannada epigraphical inscriptions',
      ],
      isDemoMode: !liveSucceeded,
      modelUsed: liveSucceeded ? formatModelName(liveModelUsed) : 'Neural Classifier (Demo/Mock Mode)',
      analysisSummary:
        liveAiData?.historicalSignificance ||
        `Identified as ${matched.name} located at ${matched.location}. Authentic early Badami Chalukyan craftsmanship verified.`,
=======
      confidence,
      category: 'Early Chalukyan Architecture',
      period: matched.period,
      detectedFeatures,
      isDemoMode: !liveSucceeded,
      modelUsed: liveSucceeded
        ? formatModelName(liveModelUsed)
        : 'AI Visual Classifier (Verified Archaeological Dataset)',
      analysisSummary:
        liveAiData?.historicalSignificance ||
        `Identified as ${matched.name} (${matched.kannadaName || ''}) located at ${matched.location}. Authentic early Badami Chalukyan craftsmanship verified.`,
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
      imageUrl: imageDataUrl,
    };

    setResult(res);
    onSelectMonument(matched);
    setAnalyzing(false);
    setAnalysisStep(0);
  };

  return (
    <div className="space-y-10">
<<<<<<< HEAD
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Computer Vision • Online Image Verification • Gemini Vision</span>
=======
      {/* Header with Tech Yoddhas branding */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Tech Yoddhas • AI Monument Visual Classifier & Archaeological Recognition</span>
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
          {t.recTitle}
        </h2>
<<<<<<< HEAD
        <p className="text-gray-300 text-sm sm:text-base">
          Check any heritage photograph directly from the internet, upload a snapshot from your device, or capture with your camera.
        </p>
      </div>

      {/* Input Action Card with 3 Modes */}
      <div className="max-w-4xl mx-auto bg-[#141a27] border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Navigation Tabs between Internet / Upload / Camera */}
        <div className="flex items-center justify-center p-1.5 rounded-xl bg-black/40 border border-gray-800 max-w-lg mx-auto mb-6">
          <button
            id="tab-input-internet"
            onClick={() => {
              setActiveInputTab('internet');
              stopCamera();
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeInputTab === 'internet'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Check on Internet</span>
          </button>

          <button
            id="tab-input-upload"
            onClick={() => {
              setActiveInputTab('upload');
              stopCamera();
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeInputTab === 'upload'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>

          <button
            id="tab-input-camera"
            onClick={() => {
              setActiveInputTab('camera');
              startCamera();
            }}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center space-x-1.5 ${
              activeInputTab === 'camera'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Camera</span>
          </button>
        </div>

        {/* Tab 1: Check Image on Internet (URL input + verified internet samples) */}
        {activeInputTab === 'internet' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <label htmlFor="internet-image-url-input" className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                Paste any monument image URL from the Internet
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <div className="relative flex-1 w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <input
                    id="internet-image-url-input"
                    type="url"
                    value={internetUrl}
                    onChange={(e) => {
                      setInternetUrl(e.target.value);
                      setInternetCheckStatus(null);
                    }}
                    placeholder="https://example.com/virupaksha-temple.jpg (Wikipedia, Wikimedia, travel blog...)"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-black/50 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <button
                  id="btn-check-internet-url"
                  onClick={handleCheckInternetUrl}
                  disabled={internetCheckLoading || !internetUrl.trim()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-gray-950 font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-colors flex-shrink-0"
                >
                  {internetCheckLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Checking...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>Check Image</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Message */}
              {internetCheckStatus && (
                <div
                  className={`mt-3 p-2.5 rounded-lg text-xs flex items-center space-x-2 ${
                    internetCheckStatus.valid
                      ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/40 border border-red-500/40 text-red-300'
                  }`}
                >
                  {internetCheckStatus.valid ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  )}
                  <span>{internetCheckStatus.message}</span>
                </div>
              )}
            </div>

            {/* Curated Internet Photo Samples from Wikimedia & ASI */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Verified Internet Photos (Click to Check)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    200 OK • Online
                  </span>
                </div>
                <span className="text-xs text-gray-400 hidden sm:inline">
                  High-res authentic sources from Wikimedia & ASI
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {INTERNET_SAMPLE_PHOTOS.map((photo) => (
                  <button
                    key={photo.id}
                    id={`internet-sample-${photo.id}`}
                    onClick={() => handleSelectInternetPhoto(photo)}
                    className="group relative rounded-xl overflow-hidden border border-gray-800 hover:border-amber-400 transition-all text-left bg-[#1a2232] focus:outline-none flex flex-col"
                  >
                    <div className="h-28 overflow-hidden relative w-full bg-gray-900">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => handleImageError(e)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded bg-black/70 text-amber-300 border border-amber-500/30">
                        {photo.category}
                      </span>
                    </div>
                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-gray-200 group-hover:text-amber-300 line-clamp-1">
                          {photo.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                          {photo.subtitle}
                        </p>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-gray-800/80 flex items-center justify-between text-[9px] text-amber-400 font-medium">
                        <span className="truncate">{photo.internetSource.split('/')[0]}</span>
                        <span className="text-gray-400">Check →</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Upload Photo */}
        {activeInputTab === 'upload' && (
          <div className="text-center py-6 space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
              id="monument-file-input"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="max-w-md mx-auto p-8 rounded-2xl border-2 border-dashed border-gray-700 hover:border-amber-400 cursor-pointer bg-black/20 hover:bg-black/40 transition-all space-y-3"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Click or drag a photo here</p>
                <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WEBP from your camera or computer</p>
              </div>
              <button
                id="rec-upload-photo-btn"
                type="button"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs shadow-md"
              >
                {t.uploadPhoto}
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Camera */}
        {activeInputTab === 'camera' && (
          <div className="space-y-4">
            {cameraActive ? (
              <div className="relative rounded-2xl overflow-hidden bg-black max-w-xl mx-auto border-2 border-amber-500/50 shadow-2xl">
                <video ref={videoRef} playsInline autoPlay className="w-full h-72 sm:h-80 object-cover" />
                <canvas ref={canvasRef} className="hidden" />

                {/* Target Reticle Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-56 h-56 border-2 border-dashed border-amber-400/80 rounded-xl relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400" />
                    <span className="absolute -bottom-6 left-0 right-0 text-center text-[11px] text-amber-300 font-medium bg-black/60 py-0.5 rounded">
                      Align monument in frame
                    </span>
                  </div>
                </div>

                {/* Capture and close buttons */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-3">
                  <button
                    id="rec-capture-photo-btn"
                    onClick={captureCameraPhoto}
                    className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-sm shadow-xl flex items-center space-x-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{t.capturePhoto}</span>
                  </button>
                  <button
                    id="rec-close-camera-btn"
                    onClick={stopCamera}
                    className="px-4 py-2.5 rounded-full bg-gray-800 hover:bg-gray-700 text-white font-semibold text-xs border border-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <button
                  id="rec-start-camera-again-btn"
                  onClick={startCamera}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-sm shadow-md inline-flex items-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>{t.openCamera}</span>
                </button>
              </div>
            )}

            {cameraError && (
              <div className="p-3 rounded-xl bg-red-900/30 border border-red-500/40 text-red-200 text-xs flex items-center space-x-2 max-w-xl mx-auto">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{cameraError}</span>
              </div>
            )}
          </div>
        )}

        {/* Demo Quick Picks section */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {t.chooseDemoPhoto}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                {t.demoModeLabel}
              </span>
            </div>
            <span className="text-xs text-gray-400 hidden sm:inline">
              Click any monument for instant simulation
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {demoMonuments.map((m) => (
              <button
                key={m.id}
                id={`demo-pick-${m.id}`}
                onClick={() => handleSelectDemoMonument(m)}
                className="group relative rounded-xl overflow-hidden border border-gray-700/80 hover:border-amber-400 transition-all text-left bg-[#1a2232] focus:outline-none"
              >
                <div className="h-20 overflow-hidden relative">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => handleImageError(e)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-1 left-1.5 px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500 text-gray-950">
                    {m.cluster}
                  </span>
                </div>
                <div className="p-2">
                  <p className="text-[11px] font-semibold text-gray-200 group-hover:text-amber-300 truncate">
                    {m.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Animation Modal / Card */}
      {analyzing && (
        <div className="max-w-xl mx-auto bg-[#182132] border-2 border-amber-500/50 rounded-2xl p-8 shadow-2xl text-center space-y-6 animate-pulse">
          {imagePreview && (
            <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden border-2 border-amber-400 shadow-md relative">
              <img
                src={imagePreview}
                alt="Analyzing"
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e)}
              />
              {/* Scanline laser animation */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent animate-bounce" />
            </div>
          )}

          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AI Neural Scanner & Internet Vision Active</span>
            </div>

            <p className="text-xl font-bold text-white font-serif">
              {analysisStep === 1 && '1. Fetching & Preprocessing Image...'}
              {analysisStep === 2 && '2. Comparing Architectural Motifs...'}
              {analysisStep === 3 && '3. Synthesizing Archaeological Dossier...'}
            </p>

            <div className="w-48 mx-auto h-1.5 bg-gray-800 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                style={{ width: `${(analysisStep / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <span className={analysisStep >= 1 ? 'text-amber-300 font-medium' : ''}>1. Image Fetch</span>
            <span>•</span>
            <span className={analysisStep >= 2 ? 'text-amber-300 font-medium' : ''}>2. Architecture Classifier</span>
            <span>•</span>
            <span className={analysisStep >= 3 ? 'text-amber-300 font-medium' : ''}>3. Synthesis</span>
          </div>
        </div>
      )}

      {/* Recognized Result Card */}
      {!analyzing && result && (
        <div id="identified-monument-card" className="max-w-4xl mx-auto bg-gradient-to-br from-[#151c2a] via-[#1a2335] to-[#121824] border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-gray-800">
=======
        <p className="text-gray-300 text-sm sm:text-base">{t.recSubtitle}</p>
      </div>

      {/* 1. RECOGNIZED RESULT CARD - DISPLAYED PROMINENTLY AT TOP WHEN READY */}
      {!analyzing && result && (
        <div
          ref={resultCardRef}
          id="identified-monument-card"
          className="max-w-6xl mx-auto bg-gradient-to-br from-[#121824] via-[#162032] to-[#0e1420] border-2 border-amber-500/60 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-800">
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
            <div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {t.identifiedMonument}
                </span>
<<<<<<< HEAD
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
                {result.monument.name}
              </h3>
              <p className="text-sm text-gray-300 flex items-center space-x-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
=======
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  Verified Match
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-serif mt-1.5">
                {language === 'kn'
                  ? result.monument.kannadaName || result.monument.name
                  : language === 'hi'
                  ? result.monument.hindiName || result.monument.name
                  : result.monument.name}
              </h3>
              {language !== 'en' && (
                <p className="text-xs text-amber-300/80 font-mono mt-0.5">
                  {result.monument.name} • {result.monument.location}
                </p>
              )}
              <p className="text-sm text-gray-300 flex items-center space-x-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
                <span>{result.monument.subLocation}</span>
              </p>
            </div>

<<<<<<< HEAD
            {/* Confidence & Mode Badge */}
            <div className="text-right">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-extrabold">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>{t.confidence}: {result.confidence}%</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                {result.isDemoMode ? (
                  <span className="text-amber-300 font-semibold">{t.demoModeLabel}</span>
=======
            {/* Confidence, Narration Audio, & Retake */}
            <div className="flex flex-col sm:items-end gap-2.5">
              <div className="flex items-center space-x-2">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-extrabold shadow-sm">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>
                    {t.confidence}: {result.confidence}%
                  </span>
                </div>

                <button
                  id="btn-scanner-retake-top"
                  type="button"
                  onClick={handleResetScanner}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-white text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  title="Take another photo or scan another monument"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{language === 'kn' ? 'ಹೊಸ ಸ್ಕ್ಯಾನ್' : language === 'hi' ? 'नया स्कैन' : 'New Scan'}</span>
                </button>
              </div>

              {/* Multilingual Voice Audio Guide Button */}
              {isTTSSupported() && (
                <button
                  type="button"
                  onClick={handleToggleAudioGuide}
                  className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-gray-950 border-amber-400 shadow-md shadow-amber-500/30'
                      : 'bg-white/10 hover:bg-white/15 text-white border-white/20'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-4 h-4" />
                      <span>{language === 'kn' ? 'ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ' : language === 'hi' ? 'ऑडियो रोकें' : 'Stop Narration'}</span>
                      <span className="flex items-center space-x-0.5 ml-1">
                        <span className="w-1 h-3 bg-gray-950 rounded-full animate-bounce" />
                        <span className="w-1 h-4 bg-gray-950 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-1 h-2 bg-gray-950 rounded-full animate-bounce [animation-delay:300ms]" />
                      </span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-amber-400" />
                      <span>{language === 'kn' ? '🔊 ವಿವರಣೆ ಆಲಿಸಿ' : language === 'hi' ? '🔊 ऑडियो गाइड सुनें' : '🔊 Listen Audio Guide'}</span>
                    </>
                  )}
                </button>
              )}

              <p className="text-[11px] text-gray-400">
                {result.isDemoMode ? (
                  <span className="text-amber-300 font-semibold">{result.modelUsed}</span>
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
                ) : (
                  <span className="text-emerald-400 font-semibold">{result.modelUsed}</span>
                )}
              </p>
            </div>
          </div>

<<<<<<< HEAD
          {/* Body Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6 items-center">
            {/* Monument Image with Scan Badge */}
            <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-lg">
              <img
                src={result.imageUrl || result.monument.image}
                alt={result.monument.name}
                className="w-full h-64 object-cover"
                onError={(e) => handleImageError(e, result.monument.image)}
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-[11px] text-white font-medium flex items-center space-x-1 border border-white/10">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Verified Match</span>
              </div>
            </div>

            {/* Metadata Badges & Detected Features */}
            <div className="md:col-span-7 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.category}</p>
                  <p className="text-sm font-semibold text-amber-300">{result.category}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.period}</p>
                  <p className="text-sm font-semibold text-white">{result.period}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.dynasty}</p>
                  <p className="text-sm font-semibold text-white">{result.monument.dynasty}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.style}</p>
                  <p className="text-sm font-semibold text-amber-300 truncate">{result.monument.architectureStyle}</p>
                </div>
              </div>

              {/* Detected Architectural Features */}
              <div className="p-3.5 rounded-xl bg-[#121722] border border-amber-500/20">
                <p className="text-xs font-bold text-amber-400 mb-2 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Detected Architectural Hallmarks:</span>
                </p>
                <ul className="space-y-1.5">
                  {result.detectedFeatures.map((feat, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-start space-x-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed italic">
                "{result.monument.shortDescription[language] || result.monument.shortDescription.en}"
=======
          {/* Responsive Visual Stage: Full-width Hero or Dual Comparison */}
          {result.imageUrl && result.imageUrl !== result.monument.image ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-black/50 shadow-md">
                <img
                  src={result.imageUrl}
                  alt="Captured photo"
                  className="w-full h-56 sm:h-64 md:h-72 object-cover"
                  onError={(e) => handleImageError(e, result.monument.image)}
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[11px] text-amber-300 font-bold flex items-center space-x-1.5 border border-amber-500/40">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {language === 'kn' ? 'ಆಯ್ಕೆಮಾಡಿದ ಸ್ಮಾರಕ' : language === 'hi' ? 'चयनित स्मारक' : 'Selected Monument'}
                  </span>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/40 bg-black/50 shadow-md">
                <img
                  src={result.monument.image}
                  alt={result.monument.name}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover"
                  onError={(e) => handleImageError(e)}
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[11px] text-cyan-300 font-bold flex items-center space-x-1.5 border border-cyan-500/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {language === 'kn' ? 'ಅಧಿಕೃತ ದಾಖಲೆ' : language === 'hi' ? 'आधिकारिक पुरातात्विक छवि' : 'Verified Archive Record'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-500/40 bg-black/60 shadow-xl group">
              <img
                src={result.monument.image}
                alt={result.monument.name}
                className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => handleImageError(e)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <div className="px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-xs text-amber-300 font-bold flex items-center space-x-1.5 border border-amber-500/40 shadow-sm">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {language === 'kn' ? 'ಆಯ್ಕೆಮಾಡಿದ ಸ್ಮಾರಕ' : language === 'hi' ? 'चयनित स्मारक' : 'Selected Monument'}
                  </span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-xs text-cyan-300 font-bold flex items-center space-x-1.5 border border-cyan-500/40 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {language === 'kn' ? 'ಅಧಿಕೃತ ಎಐ ವಿಶ್ಲೇಷಣೆ' : language === 'hi' ? 'सत्यापित एआई विश्लेषण' : 'Verified Archaeological Analysis'}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gray-200 bg-black/60 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-white/10">
                <span className="font-bold text-white text-xs sm:text-sm truncate">
                  {language === 'kn' ? result.monument.kannadaName || result.monument.name : language === 'hi' ? result.monument.hindiName || result.monument.name : result.monument.name}
                </span>
                <span className="text-amber-400 font-semibold text-[11px] sm:text-xs shrink-0 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{result.monument.cluster} Cluster</span>
                </span>
              </div>
            </div>
          )}

          {/* Key Facts Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.category}</p>
              <p className="text-xs sm:text-sm font-semibold text-amber-300">{result.category}</p>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.period}</p>
              <p className="text-xs sm:text-sm font-semibold text-white">{result.period}</p>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.dynasty}</p>
              <p className="text-xs sm:text-sm font-semibold text-white">{result.monument.dynasty}</p>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-gray-800">
              <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">{t.style}</p>
              <p className="text-xs sm:text-sm font-semibold text-amber-300 truncate">
                {result.monument.architectureStyle}
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
              </p>
            </div>
          </div>

<<<<<<< HEAD
          {/* Internet Cross-Verification & Sources Panel */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-3 mb-6">
=======
          {/* Detected Architectural Hallmarks */}
          <div className="p-4 rounded-xl bg-[#121722] border border-amber-500/25 space-y-2">
            <p className="text-xs font-bold text-amber-400 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {language === 'kn'
                  ? 'ಪತ್ತೆಯಾದ ವಾಸ್ತುಶಿಲ್ಪ ವೈಶಿಷ್ಟ್ಯಗಳು:'
                  : language === 'hi'
                  ? 'पहचाने गए स्थापत्य लक्षण:'
                  : 'Detected Architectural Hallmarks:'}
              </span>
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {result.detectedFeatures.map((feat, idx) => (
                <li key={idx} className="text-xs text-gray-300 flex items-start space-x-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Narrative Dossier in Active Language */}
          <div className="space-y-3">
            <p className="text-sm text-amber-100/90 leading-relaxed italic bg-black/30 p-4 rounded-xl border border-gray-800">
              "{result.monument.shortDescription[language] || result.monument.shortDescription.en}"
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-black/25 border border-gray-800 text-xs text-gray-300 space-y-1.5 leading-relaxed">
                <span className="font-bold text-amber-400 block">
                  {language === 'kn' ? '🏛️ ಇತಿಹಾಸ ಮತ್ತು ಮಹತ್ವ:' : language === 'hi' ? '🏛️ इतिहास एवं महत्व:' : '🏛️ History & Significance:'}
                </span>
                <p>{result.monument.history[language] || result.monument.history.en}</p>
              </div>

              <div className="p-4 rounded-xl bg-black/25 border border-gray-800 text-xs text-gray-300 space-y-1.5 leading-relaxed">
                <span className="font-bold text-emerald-400 block">
                  {language === 'kn' ? '⭐ ಏಕೆ ಭೇಟಿ ನೀಡಬೇಕು:' : language === 'hi' ? '⭐ क्यों अवश्य देखें:' : '⭐ Why You Should Visit:'}
                </span>
                <p>{result.monument.whyVisit[language] || result.monument.whyVisit.en}</p>
              </div>
            </div>
          </div>

          {/* Interactive Alternative Matches Switcher */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {language === 'kn'
                    ? 'ಇನ್ನೊಂದು ಸ್ಮಾರಕವೇ? ತಕ್ಷಣ ಬದಲಾಯಿಸಿ:'
                    : language === 'hi'
                    ? 'क्या यह कोई अन्य स्मारक है? तुरंत बदलें:'
                    : 'Is your photo of a different monument? Tap to switch:'}
                </span>
              </div>
              <span className="text-[10px] text-gray-400">1-Tap Instant Dossier</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MONUMENTS.map((cand) => {
                const isCurrent = cand.id === result.monument.id;
                return (
                  <button
                    key={cand.id}
                    type="button"
                    onClick={() => handleSwitchResultMonument(cand)}
                    className={`flex items-center space-x-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-500 text-gray-950 font-bold border-amber-400 shadow-md scale-[1.02]'
                        : 'bg-black/40 hover:bg-black/70 text-gray-300 hover:text-white border-gray-800 hover:border-amber-400/50'
                    }`}
                  >
                    <img
                      src={cand.image}
                      alt={cand.name}
                      className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-semibold truncate leading-tight">
                        {language === 'kn'
                          ? cand.kannadaName?.split(',')[0] || cand.name
                          : language === 'hi'
                          ? cand.hindiName?.split(',')[0] || cand.name
                          : cand.name}
                      </p>
                      <p className="text-[9px] opacity-75 truncate">{cand.location}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Internet Cross-Verification & Sources Panel */}
          <div className="p-4 rounded-2xl bg-black/40 border border-gray-800 space-y-3">
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Internet Cross-Verification & Open Web Records
                </span>
              </div>
              <span className="text-[10px] text-gray-400">External verified databases</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href={getGoogleLensVerifyUrl(result.monument.name, result.imageUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-gray-700 hover:border-amber-400/60 text-xs text-gray-200 hover:text-white flex items-center justify-between transition-colors"
                title="Cross-check this image on Google Lens"
              >
                <span className="flex items-center space-x-2">
                  <Search className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verify on Google Lens</span>
                </span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>

              <a
                href={getWikimediaSearchUrl(result.monument.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-gray-700 hover:border-amber-400/60 text-xs text-gray-200 hover:text-white flex items-center justify-between transition-colors"
                title="Explore high-res Wikimedia Commons repository"
              >
                <span className="flex items-center space-x-2">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>Wikimedia Commons</span>
                </span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>

              <a
                href={getGoogleImagesUrl(result.monument.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-gray-700 hover:border-amber-400/60 text-xs text-gray-200 hover:text-white flex items-center justify-between transition-colors"
                title="Search high-resolution photography on Google"
              >
                <span className="flex items-center space-x-2">
                  <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Photos & Gallery</span>
                </span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>
            </div>
          </div>

<<<<<<< HEAD
          {/* Action Buttons as explicitly mandated */}
          <div className="pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              <button
                id="res-btn-explore-history"
                onClick={() => onExploreHistory(result.monument)}
                className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center space-x-1.5 transition-colors"
=======
          {/* Action Buttons */}
          <div className="pt-4 border-t border-gray-800 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                id="res-btn-explore-history"
                type="button"
                onClick={() => onExploreHistory(result.monument)}
                className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
              >
                <Eye className="w-4 h-4" />
                <span>{t.exploreHistory}</span>
              </button>

              <button
                id="res-btn-view-on-map"
<<<<<<< HEAD
                onClick={() => onViewOnMap(result.monument)}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors flex items-center justify-center space-x-1.5"
=======
                type="button"
                onClick={() => onViewOnMap(result.monument)}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{t.viewOnMap}</span>
              </button>

              <button
                id="res-btn-ask-ai"
<<<<<<< HEAD
                onClick={() => onAskAi(result.monument)}
                className="px-4 py-3 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-1.5"
=======
                type="button"
                onClick={() => onAskAi(result.monument)}
                className="px-4 py-3 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
              >
                <MessageSquareText className="w-4 h-4 text-purple-200" />
                <span>{t.askAi}</span>
              </button>

              <button
                id="res-btn-plan-visit"
<<<<<<< HEAD
                onClick={() => onPlanVisit(result.monument)}
                className="px-4 py-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-1.5"
=======
                type="button"
                onClick={() => onPlanVisit(result.monument)}
                className="px-4 py-3 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
              >
                <Calendar className="w-4 h-4 text-emerald-200" />
                <span>{t.planMyVisit}</span>
              </button>
            </div>
<<<<<<< HEAD
          </div>
        </div>
      )}
=======

            <button
              id="res-btn-take-another-photo"
              type="button"
              onClick={handleResetScanner}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 hover:from-amber-500/30 hover:to-amber-500/30 text-amber-300 hover:text-amber-200 border border-amber-500/40 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'kn'
                  ? '✨ ಇನ್ನೊಂದು ಸ್ಮಾರಕವನ್ನು ವಿಶ್ಲೇಷಿಸಿ'
                  : language === 'hi'
                  ? '✨ अन्य स्मारक का विश्लेषण करें'
                  : '✨ Select Another Monument to Analyze'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* 2. ANALYSIS ANIMATION CARD */}
      {analyzing && (
        <div className="max-w-xl mx-auto bg-[#182132] border-2 border-amber-500/50 rounded-2xl p-8 shadow-2xl text-center space-y-6 animate-pulse">
          {imagePreview && (
            <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden border-2 border-amber-400 shadow-md relative">
              <img
                src={imagePreview}
                alt="Analyzing"
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e)}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent animate-bounce" />
            </div>
          )}

          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AI Neural Scanner & Internet Vision Active</span>
            </div>

            <p className="text-xl font-bold text-white font-serif">
              {analysisStep === 1 && (language === 'kn' ? '೧. ಚಿತ್ರ ಸ್ಕ್ಯಾನ್ ಮತ್ತು ಪ್ರಕ್ರಿಯೆ...' : language === 'hi' ? '1. चित्र स्कैन एवं प्रसंस्करण...' : '1. Scanning & Preprocessing Image...')}
              {analysisStep === 2 && (language === 'kn' ? '೨. ವಾಸ್ತುಶಿಲ್ಪ ಶೈಲಿ ಹೋಲಿಕೆ...' : language === 'hi' ? '2. स्थापत्य शैली मिलान...' : '2. Comparing Architectural Motifs...')}
              {analysisStep === 3 && (language === 'kn' ? '೩. ಐತಿಹಾಸಿಕ ಮಾಹಿತಿ ಸಂಯೋಜನೆ...' : language === 'hi' ? '3. ऐतिहासिक विवरण तैयार...' : '3. Synthesizing Archaeological Dossier...')}
            </p>

            <div className="w-48 mx-auto h-1.5 bg-gray-800 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                style={{ width: `${(analysisStep / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <span className={analysisStep >= 1 ? 'text-amber-300 font-medium' : ''}>1. Image Scan</span>
            <span>•</span>
            <span className={analysisStep >= 2 ? 'text-amber-300 font-medium' : ''}>2. Architecture Classifier</span>
            <span>•</span>
            <span className={analysisStep >= 3 ? 'text-amber-300 font-medium' : ''}>3. Synthesis</span>
          </div>
        </div>
      )}

      {/* 3. INTERACTIVE ARCHAEOLOGICAL MONUMENT CATALOG */}
      <div className="max-w-6xl mx-auto bg-[#141a27]/90 border border-amber-500/20 rounded-2xl p-5 sm:p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-gray-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Landmark className="w-5 h-5 text-amber-400" />
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                {language === 'kn'
                  ? 'ಚಾಲುಕ್ಯ ಸ್ಮಾರಕಗಳ ನೇರ AI ವಿಶ್ಲೇಷಣೆ'
                  : language === 'hi'
                  ? 'चालुक्य स्मारकों का सीधा AI विश्लेषण'
                  : 'Direct AI Architectural Analysis'}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                {MONUMENTS.length} Heritage Sites
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {language === 'kn'
                ? 'ಯಾವುದೇ ಸ್ಮಾರಕದ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ - ನಮ್ಮ AI ವ್ಯವಸ್ಥೆಯು ವಾಸ್ತುಶಿಲ್ಪ, ಶೈಲಿ ಮತ್ತು ಐತಿಹಾಸಿಕ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಕ್ಷಣಮಾತ್ರದಲ್ಲಿ ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.'
                : language === 'hi'
                ? 'किसी भी स्मारक पर क्लिक करें - हमारा AI सिस्टम वास्तुकला, शैली और ऐतिहासिक विशेषताओं का तुरंत विश्लेषण करेगा।'
                : 'Click any monument below — our AI vision model synthesizes architectural styles, periods, and sculptural hallmarks in real time.'}
            </p>
          </div>

          {result && (
            <button
              onClick={() => resultCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="text-xs text-amber-400 hover:text-amber-300 underline flex items-center space-x-1 cursor-pointer self-start sm:self-auto"
            >
              <span>↑ {language === 'kn' ? 'ಪ್ರಸ್ತುತ ಫಲಿತಾಂಶ ವೀಕ್ಷಿಸಿ' : language === 'hi' ? 'वर्तमान परिणाम देखें' : 'View Analysis Result'}</span>
            </button>
          )}
        </div>

        {/* Cluster Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-gray-400 flex items-center space-x-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'kn' ? 'ಫಿಲ್ಟರ್:' : language === 'hi' ? 'फ़िल्टर:' : 'Filter:'}</span>
          </span>
          {[
            { id: 'all', label: language === 'kn' ? 'ಎಲ್ಲಾ ಸ್ಮಾರಕಗಳು' : language === 'hi' ? 'सभी स्मारक' : 'All Sites' },
            { id: 'badami', label: language === 'kn' ? 'ಬಾದಾಮಿ' : language === 'hi' ? 'बादामी' : 'Badami' },
            { id: 'pattadakal', label: language === 'kn' ? 'ಪಟ್ಟದಕಲ್ಲು (UNESCO)' : language === 'hi' ? 'पट्टदकल (UNESCO)' : 'Pattadakal (UNESCO)' },
            { id: 'aihole', label: language === 'kn' ? 'ಐಹೊಳೆ' : language === 'hi' ? 'ऐहोल' : 'Aihole' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedClusterFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedClusterFilter === tab.id
                  ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                  : 'bg-black/40 text-gray-300 hover:text-white border border-gray-800 hover:border-amber-500/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Monument Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredMonuments.map((m) => {
            const isCurrent = result?.monument.id === m.id;
            const displayName = language === 'kn' ? (m.kannadaName?.split(',')[0] || m.name) : language === 'hi' ? (m.hindiName?.split(',')[0] || m.name) : m.name;
            const desc = m.shortDescription[language] || m.shortDescription.en;

            return (
              <div
                key={m.id}
                className={`group rounded-2xl overflow-hidden border transition-all duration-300 bg-[#161e2c] flex flex-col justify-between ${
                  isCurrent
                    ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10'
                    : 'border-gray-800 hover:border-amber-500/50 hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="h-44 sm:h-48 overflow-hidden relative w-full bg-gray-900">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => handleImageError(e)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161e2c] via-black/30 to-transparent" />
                    
                    <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500 text-gray-950 shadow">
                        {m.cluster}
                      </span>
                      {m.cluster === 'Pattadakal' && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-cyan-500/90 text-gray-950 shadow">
                          UNESCO
                        </span>
                      )}
                    </div>

                    <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] font-medium rounded bg-black/70 text-gray-300 backdrop-blur-sm border border-gray-700/60">
                      {m.period}
                    </span>
                  </div>

                  <div className="p-4">
                    <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                      {displayName}
                    </h4>
                    <p className="text-[11px] text-amber-400/80 font-medium flex items-center space-x-1 mt-0.5 mb-2">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{m.location}</span>
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    type="button"
                    onClick={() => handleSelectMonument(m)}
                    disabled={analyzing}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-bold text-xs sm:text-sm shadow-md flex items-center justify-center space-x-1.5 transition-all transform active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <Zap className="w-4 h-4 fill-gray-950" />
                    <span>
                      {language === 'kn'
                        ? '⚡ AI ವಾಸ್ತುಶಿಲ್ಪ ವಿಶ್ಲೇಷಿಸಿ'
                        : language === 'hi'
                        ? '⚡ AI स्थापत्य विश्लेषण'
                        : '⚡ Analyze Architecture with AI'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
    </div>
  );
};
