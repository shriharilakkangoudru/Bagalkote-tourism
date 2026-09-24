import { Language } from '../types';

/**
 * Strips markdown, emojis, HTML, and extra symbols so TTS reads clean, natural sentences.
 */
export function cleanTextForTTS(text: string): string {
  return text
    .replace(/[*_#`~[\]()]/g, '') // remove markdown symbols
    .replace(/•/g, ', ')
    .replace(/https?:\/\/\S+/g, '') // remove urls
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '') // comprehensive emoji regex
    .replace(/[📸🎙️🏛️🚀✨📍💡🎯⚠️ℹ️🔊🔇]/g, '') // specific emojis
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks if SpeechSynthesis is supported by current browser
 */
export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/**
 * Checks if SpeechRecognition (Mic) is supported
 */
export function isMicSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

/**
 * In Kannada (a Dravidian language), words naturally end in open, flowing vowels (inherent 'a' or explicit matras).
 * In Hindi (an Indo-Aryan language), word-final consonants undergo "schwa deletion" (the final 'a' is dropped),
 * which previously caused Kannada words to sound abruptly chopped and monotone/mournful if not preserved.
 *
 * This function detects word-final bare Kannada consonants and appends the vocalic sign AA (\u0CBE)
 * so that Indian/Hindi TTS engines pronounce the open, melodic ending vowel ("Namaskara", "Karnatakada", "Sahayaka").
 */
export function preserveKannadaEndingVowels(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += text[i];
    const code = text.charCodeAt(i);
    // Kannada consonants: Ka (0x0C95) to Ha (0x0CB9) or Fa/Zha (0x0CDE)
    const isConsonant = (code >= 0x0C95 && code <= 0x0CB9) || code === 0x0CDE;
    if (isConsonant) {
      const nextChar = text[i + 1] || '';
      // If followed by space, punctuation, or end of string, this consonant is word-final
      const isWordEnd = i + 1 === text.length || /[\s\.,!?;:()।\-"'«»“”‘’]/.test(nextChar);
      if (isWordEnd) {
        result += '\u0CBE'; // Append AA matra so Devanagari receives ा
      }
    }
  }
  return result;
}

/**
 * High-fidelity phonetic transliteration from Kannada Unicode (U+0C80–U+0CFF)
 * to standardized Devanagari Unicode (U+0900–U+097F) with vowel preservation.
 *
 * Background: Kannada and Devanagari share exact 1:1 Unicode phonetic block alignment
 * (offset 0x0380 / 896). Transliterating Kannada to standard Devanagari allows
 * high-quality Hindi/Indian TTS voices (such as macOS 'Lekha', Windows 'Microsoft Kalpana',
 * or Android 'Google हिन्दी') to speak fluent, authentic-sounding Kannada on the ~95%
 * of devices where native Kannada TTS voice packages are not installed.
 */
export function kannadaToDevanagariStandard(raw: string): string {
  if (!raw) return '';

  // 1. Unicode NFC normalization
  let text = raw.normalize('NFC');

  // 2. Normalize composite two-character sequences
  text = text
    .replace(/\u0CC6\u0CD5/g, '\u0CCB') // e + length mark -> oo
    .replace(/\u0CC7\u0CD5/g, '\u0CCB') // ee + length mark -> oo
    .replace(/\u0CC6\u0CD6/g, '\u0CC8') // e + ai length mark -> ai
    .replace(/\u0CC6\u0CC2/g, '\u0CCC'); // e + uu -> au

  // 3. Preserve melodic Dravidian ending vowels before Devanagari mapping
  text = preserveKannadaEndingVowels(text);

  let res = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    // Kannada Block is 0x0C80 (3200) to 0x0CFF (3327)
    if (code >= 0x0C82 && code <= 0x0CD6) {
      if (code === 0x0C8E || code === 0x0C8F) {
        res += '\u090F'; // ಎ, ಏ -> ए
      } else if (code === 0x0C92 || code === 0x0C93) {
        res += '\u0913'; // ಒ, ಓ -> ओ
      } else if (code === 0x0CC6 || code === 0x0CC7) {
        res += '\u0947'; // ೆ, ೇ -> े
      } else if (code === 0x0CCA || code === 0x0CCB) {
        res += '\u094B'; // ೊ, ೋ -> ो
      } else if (code === 0x0CC8) {
        res += '\u0948'; // ೈ -> ै
      } else if (code === 0x0CCC) {
        res += '\u094C'; // ೌ -> ौ
      } else if (code === 0x0CD5 || code === 0x0CD6) {
        // standalone length mark
        continue;
      } else if (code === 0x0CB1) {
        res += '\u0930'; // ಱ -> र
      } else {
        res += String.fromCharCode(code - 896);
      }
    } else if (code >= 0x0CE6 && code <= 0x0CEF) {
      // Kannada digits ೦-೯ to Devanagari digits ०-९
      res += String.fromCharCode(code - 896);
    } else if (code === 0x0CDE) {
      res += 'ळ'; // ೞ
    } else {
      res += text[i];
    }
  }
  return res;
}

// Global cached voices list and loader promise
let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    cachedVoices = window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', () => {
      try {
        cachedVoices = window.speechSynthesis.getVoices();
      } catch {
        // ignore
      }
    });
  } catch {
    // ignore
  }
}

/**
 * Asynchronously loads voices, handling the Chrome/Safari asynchronous voice list population.
 */
export function getVoicesAsync(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!isTTSSupported()) {
      resolve([]);
      return;
    }

    if (cachedVoices && cachedVoices.length > 0) {
      resolve(cachedVoices);
      return;
    }

    const immediate = window.speechSynthesis.getVoices();
    if (immediate && immediate.length > 0) {
      cachedVoices = immediate;
      resolve(immediate);
      return;
    }

    let settled = false;
    const finish = () => {
      if (!settled) {
        settled = true;
        try {
          cachedVoices = window.speechSynthesis.getVoices();
        } catch {
          // ignore
        }
        resolve(cachedVoices);
      }
    };

    window.speechSynthesis.addEventListener('voiceschanged', finish, { once: true });
    // Fallback timeout in case voiceschanged already fired or won't fire
    setTimeout(finish, 250);
  });
}

/**
 * Finds a native Kannada voice if one is installed on the user's OS / browser.
 * Prioritizes natural, upbeat voices (like Sapna or Google Kannada) over low monotone ones.
 */
function findKannadaVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // Priority 1: Clear, upbeat female or neural Kannada voice
  // (Soumya on macOS/iOS, Sapna or Gagan on Windows, Google Kannada on Android/Chrome)
  const priorityKn = voices.find((v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    const name = (v.name || '').toLowerCase();
    const isKn = lang.startsWith('kn') || name.includes('kannada') || name.includes('ಕನ್ನಡ');
    return (
      isKn &&
      (name.includes('soumya') ||
        name.includes('sapna') ||
        name.includes('gagan') ||
        name.includes('natural') ||
        name.includes('online') ||
        name.includes('google'))
    );
  });
  if (priorityKn) return priorityKn;

  // Priority 2: Any Kannada voice (generic kn-IN)
  return (
    voices.find((v) => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      const name = (v.name || '').toLowerCase();
      return (
        lang === 'kn-in' ||
        lang === 'kn' ||
        lang.startsWith('kn-') ||
        lang.startsWith('kn_') ||
        name.includes('kannada') ||
        name.includes('ಕನ್ನಡ') ||
        name.includes('gagan') ||
        name.includes('sapna')
      );
    }) || null
  );
}

/**
 * Finds a high-quality Hindi voice (Lekha on macOS/iOS, Kalpana/Swara on Windows,
 * Google हिन्दी on Android/Chrome).
 *
 * Crucial: Only returns genuine Hindi engines. Returning English (en-IN) voices
 * causes complete silence on Devanagari text.
 */
function findHindiVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // 1. High priority: Bright, lively, natural female or neural voices
  const brightVoices = voices.find((v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    const name = (v.name || '').toLowerCase();
    const isHindi =
      lang === 'hi-in' ||
      lang === 'hi' ||
      lang.startsWith('hi-') ||
      lang.startsWith('hi_') ||
      name.includes('hindi') ||
      name.includes('हिन्दी') ||
      name.includes('lekha') ||
      name.includes('kalpana') ||
      name.includes('swara') ||
      name.includes('madhur') ||
      name.includes('heera');

    return (
      isHindi &&
      (name.includes('swara') ||
        name.includes('kalpana') ||
        name.includes('lekha') ||
        name.includes('natural') ||
        name.includes('online') ||
        name.includes('google') ||
        name.includes('madhur') ||
        name.includes('heera'))
    );
  });
  if (brightVoices) return brightVoices;

  // 2. Any other genuine Hindi voice (including Hemant)
  const anyHindi = voices.find((v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    const name = (v.name || '').toLowerCase();
    return (
      lang === 'hi-in' ||
      lang === 'hi' ||
      lang.startsWith('hi-') ||
      lang.startsWith('hi_') ||
      name.includes('hindi') ||
      name.includes('हिन्दी') ||
      name.includes('hemant')
    );
  });
  if (anyHindi) return anyHindi;

  // Do not fall back to English voices for Hindi text; returning null lets browser's cloud TTS handle it
  return null;
}

/**
 * Finds the best English voice (preferring Indian English en-IN for authenticity).
 */
function findEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  const enIn = voices.find((v) => {
    const lang = (v.lang || '').toLowerCase().replace('_', '-');
    const name = (v.name || '').toLowerCase();
    return (
      lang === 'en-in' ||
      name.includes('rishi') ||
      name.includes('veena') ||
      name.includes('neerja') ||
      name.includes('ravi')
    );
  });
  if (enIn) return enIn;

  return (
    voices.find((v) => {
      const lang = (v.lang || '').toLowerCase().replace('_', '-');
      return lang.startsWith('en-') || lang.startsWith('en');
    }) || null
  );
}

/**
 * Splits long paragraphs into natural sentences to avoid the Chromium 15-second cutoff bug.
 */
function splitIntoSpeechChunks(text: string): string[] {
  if (!text) return [];

  // Protect common dot abbreviations from splitting
  const safe = text
    .replace(/(ಕ್ರಿ\.)(ಶ\.)/g, 'ಕ್ರಿ_ಶ_')
    .replace(/(ಕ್ರಿ\.)(ಪೂ\.)/g, 'ಕ್ರಿ_ಪೂ_')
    .replace(/(ई\.)(पू\.)/g, 'ई_पू_')
    .replace(/(डॉ\.)/g, 'डॉ_')
    .replace(/(श्री\.)/g, 'श्री_')
    .replace(/(Dr\.)/g, 'Dr_')
    .replace(/(Mr\.)/g, 'Mr_')
    .replace(/(Mrs\.)/g, 'Mrs_')
    .replace(/(i\.e\.)/g, 'ie_')
    .replace(/(e\.g\.)/g, 'eg_');

  const rawChunks = safe.split(/(?<=[।!?.\n;])\s+/);
  const chunks: string[] = [];
  let buffer = '';

  for (const raw of rawChunks) {
    const unmasked = raw
      .replace(/ಕ್ರಿ_ಶ_/g, 'ಕ್ರಿ.ಶ.')
      .replace(/ಕ್ರಿ_ಪೂ_/g, 'ಕ್ರಿ.ಪೂ.')
      .replace(/ई_पू_/g, 'ई.पू.')
      .replace(/डॉ_/g, 'डॉ.')
      .replace(/श्री_/g, 'श्री.')
      .replace(/Dr_/g, 'Dr.')
      .replace(/Mr_/g, 'Mr.')
      .replace(/Mrs_/g, 'Mrs.')
      .replace(/ie_/g, 'i.e.')
      .replace(/eg_/g, 'e.g.')
      .trim();

    if (!unmasked) continue;

    // Buffer chunks together up to ~180 characters for natural speech pacing
    if (buffer && buffer.length + unmasked.length < 180) {
      buffer += ' ' + unmasked;
    } else {
      if (buffer) chunks.push(buffer);
      buffer = unmasked;
    }
  }
  if (buffer) chunks.push(buffer);

  return chunks.length > 0 ? chunks : [text];
}

// Session state tracking to coordinate cancellations and keep-alive
let activePlaybackSessionId = 0;
let keepAliveTimer: any = null;
const activeUtterances = new Set<SpeechSynthesisUtterance>();

function clearKeepAlive() {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
}

function startKeepAlive() {
  clearKeepAlive();
  keepAliveTimer = setInterval(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
        try {
          window.speechSynthesis.resume();
        } catch {
          // ignore
        }
      }
    }
  }, 2500);
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (e: any) => void;
}

/**
 * Speaks text using the browser's speech synthesis engine in Kannada, Hindi, or English.
 *
 * Enhancements:
 * 1. Solves "sad/monotone" voice in Kannada by preserving Dravidian word-final open vowels
 * 2. Tuned pitch (1.14) and lively conversational pace (1.04) for cheerful, welcoming delivery
 * 3. Prioritizes natural/bright voices (Kalpana, Swara, Lekha, Google Kannada) over dull legacy voices
 * 4. Eliminates async voice loading bug on Chrome & Safari
 * 5. WebKit/Safari cancel-race bug fixed via 60ms delay
 * 6. Chromium 15s freeze bug resolved via sentence chunking & keep-alive timer
 */
export function speakMultilingualText(
  text: string,
  language: Language,
  options: SpeakOptions = {}
): void {
  if (!isTTSSupported()) {
    console.warn('SpeechSynthesis is not supported in this browser.');
    options.onError?.('Not supported');
    return;
  }

  // 1. Invalidate previous session and clear speech
  const currentSessionId = ++activePlaybackSessionId;
  clearKeepAlive();

  try {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch {
    // ignore
  }

  const clean = cleanTextForTTS(text);
  if (!clean) return;

  // Auto-detect script if text is in Kannada or Devanagari
  let effectiveLang: Language = language;
  if (/[\u0C80-\u0CFF]/.test(clean)) {
    effectiveLang = 'kn';
  } else if (/[\u0900-\u097F]/.test(clean)) {
    effectiveLang = 'hi';
  }

  // 2. Wait 60ms to avoid Safari / Chrome cancel-race condition
  setTimeout(async () => {
    if (currentSessionId !== activePlaybackSessionId) return;

    const voices = await getVoicesAsync();
    if (currentSessionId !== activePlaybackSessionId) return;

    let targetVoice: SpeechSynthesisVoice | null = null;
    let textToSpeak = clean;
    let targetLangCode = 'en-IN';
    let defaultRate = 1.0;
    let defaultPitch = 1.0;

    if (effectiveLang === 'kn') {
      const nativeKnVoice = findKannadaVoice(voices);
      if (nativeKnVoice) {
        // Native Kannada voice installed (Soumya on macOS/iOS, Google Kannada on Android, Sapna on Windows)
        targetVoice = nativeKnVoice;
        targetLangCode = nativeKnVoice.lang || 'kn-IN';
        textToSpeak = clean;
        defaultRate = 1.02; // Lively, energetic pace
        defaultPitch = 1.08; // Cheerful, bright tone
      } else {
        const hindiVoice = findHindiVoice(voices);
        if (hindiVoice) {
          // Genuine Hindi voice present: Transliterate to standard Devanagari with preserved ending vowels
          targetVoice = hindiVoice;
          targetLangCode = hindiVoice.lang || 'hi-IN';
          textToSpeak = kannadaToDevanagariStandard(clean);
          defaultRate = 1.04;
          defaultPitch = 1.14;
        } else {
          // No local Kannada or Hindi voice package installed:
          // Keep Kannada script and specify kn-IN so browser's cloud TTS engine can render it
          targetVoice = null;
          targetLangCode = 'kn-IN';
          textToSpeak = clean;
          defaultRate = 1.0;
          defaultPitch = 1.0;
        }
      }
    } else if (effectiveLang === 'hi') {
      const hindiVoice = findHindiVoice(voices);
      targetVoice = hindiVoice;
      targetLangCode = hindiVoice ? hindiVoice.lang || 'hi-IN' : 'hi-IN';
      textToSpeak = clean;
      defaultRate = 0.98;
      defaultPitch = 1.05;
    } else {
      // English
      const engVoice = findEnglishVoice(voices);
      targetVoice = engVoice;
      targetLangCode = engVoice ? engVoice.lang || 'en-IN' : 'en-IN';
      textToSpeak = clean;
      defaultRate = 1.0;
      defaultPitch = 1.0;
    }

    const chunks = splitIntoSpeechChunks(textToSpeak);
    if (chunks.length === 0) return;

    let chunkIndex = 0;
    let hasStarted = false;
    startKeepAlive();

    const speakNextChunk = () => {
      if (currentSessionId !== activePlaybackSessionId) {
        clearKeepAlive();
        return;
      }

      if (chunkIndex >= chunks.length) {
        clearKeepAlive();
        options.onEnd?.();
        return;
      }

      const chunkText = chunks[chunkIndex];
      chunkIndex++;

      const utterance = new SpeechSynthesisUtterance(chunkText);
      // Retain utterance in Set to prevent Chromium/Safari garbage collector from dropping audio midway
      activeUtterances.add(utterance);

      if (targetVoice) {
        utterance.voice = targetVoice;
        utterance.lang = targetVoice.lang || targetLangCode;
      } else {
        utterance.lang = targetLangCode;
      }

      // Apply dynamic pace and uplifting pitch
      utterance.rate = options.rate ? options.rate * defaultRate : defaultRate;
      utterance.pitch = options.pitch ?? defaultPitch;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        if (!hasStarted) {
          hasStarted = true;
          options.onStart?.();
        }
      };

      utterance.onend = () => {
        activeUtterances.delete(utterance);
        if (currentSessionId === activePlaybackSessionId) {
          speakNextChunk();
        }
      };

      utterance.onerror = (e) => {
        activeUtterances.delete(utterance);
        if (currentSessionId === activePlaybackSessionId) {
          if (e.error !== 'interrupted' && e.error !== 'canceled') {
            console.warn('SpeechSynthesis error on chunk:', e);
            options.onError?.(e);
          }
          clearKeepAlive();
        }
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        activeUtterances.delete(utterance);
        console.error('Failed to call window.speechSynthesis.speak:', err);
        options.onError?.(err);
        clearKeepAlive();
      }
    };

    speakNextChunk();
  }, 60);
}

/**
 * Stops any active speech synthesis immediately
 */
export function stopAllSpeech(): void {
  activePlaybackSessionId++;
  clearKeepAlive();
  activeUtterances.clear();
  if (isTTSSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }
}
