import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Globe } from 'lucide-react';
import { Language } from '../types';
import { speakMultilingualText, stopAllSpeech, isTTSSupported } from '../utils/speechUtils';

interface TTSAudioPlayerProps {
  textMap: {
    en: string;
    kn: string;
    hi: string;
  };
  title?: string;
  defaultLanguage?: Language;
}

export const TTSAudioPlayer: React.FC<TTSAudioPlayerProps> = ({
  textMap,
  title = 'Audio Guide',
  defaultLanguage = 'en',
}) => {
  const [activeLang, setActiveLang] = useState<Language>(defaultLanguage);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);
  const supported = isTTSSupported();

  // Keep activeLang in sync with defaultLanguage changes
  useEffect(() => {
    stopAllSpeech();
    setIsPlaying(false);
    setActiveLang(defaultLanguage);
  }, [defaultLanguage]);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopAllSpeech();
    };
  }, []);

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopAllSpeech();
      setIsPlaying(false);
      return;
    }

    const textToSpeak = textMap[activeLang] || textMap.en;
    if (!textToSpeak) return;

    speakMultilingualText(textToSpeak, activeLang, {
      rate: speed,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const handleLanguageChange = (lang: Language) => {
    stopAllSpeech();
    setIsPlaying(false);
    setActiveLang(lang);
  };

  const cycleSpeed = () => {
    const nextSpeed = speed === 0.85 ? 1.0 : speed === 1.0 ? 1.2 : 0.85;
    setSpeed(nextSpeed);
    if (isPlaying) {
      stopAllSpeech();
      const textToSpeak = textMap[activeLang] || textMap.en;
      speakMultilingualText(textToSpeak, activeLang, {
        rate: nextSpeed,
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    }
  };

  if (!supported) return null;

  const labels = {
    en: { guide: 'Audio Guide', listen: 'Listen Aloud', stop: 'Stop Audio' },
    kn: { guide: 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ', listen: 'ಆಲಿಸಿ (ಧ್ವನಿ)', stop: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ' },
    hi: { guide: 'ऑडियो गाइड', listen: 'बोलकर सुनें', stop: 'ऑडियो रोकें' },
  }[activeLang];

  return (
    <div className="p-3.5 rounded-2xl bg-[#0f1726]/90 border border-amber-500/30 backdrop-blur-md shadow-lg space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        {/* Title and Animated Audio Equalizer */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Volume2 className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              {labels.guide}
            </span>
            <span className="text-xs font-semibold text-white truncate block max-w-[160px] sm:max-w-xs">
              {title}
            </span>
          </div>

          {/* Equalizer animation when playing */}
          {isPlaying && (
            <div className="flex items-end space-x-1 h-5 px-1.5 py-0.5 bg-black/40 rounded">
              <span className="w-1 bg-amber-400 rounded-full animate-[audioEqualizer_0.8s_ease-in-out_infinite]" />
              <span className="w-1 bg-amber-300 rounded-full animate-[audioEqualizer_0.6s_ease-in-out_0.2s_infinite]" />
              <span className="w-1 bg-amber-500 rounded-full animate-[audioEqualizer_0.7s_ease-in-out_0.4s_infinite]" />
              <span className="w-1 bg-amber-400 rounded-full animate-[audioEqualizer_0.9s_ease-in-out_0.1s_infinite]" />
            </div>
          )}
        </div>

        {/* Language Selector Pills */}
        <div className="flex items-center space-x-1 bg-black/60 p-0.5 rounded-xl border border-gray-800">
          {(['en', 'kn', 'hi'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => handleLanguageChange(l)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                activeLang === l
                  ? 'bg-amber-500 text-gray-950 shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {l === 'en' ? 'EN' : l === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-800/80">
        <button
          onClick={handlePlayToggle}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-md ${
            isPlaying
              ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40'
              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>{labels.stop}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{labels.listen} ({activeLang === 'kn' ? 'ಕನ್ನಡ' : activeLang === 'hi' ? 'हिन्दी' : 'English'})</span>
            </>
          )}
        </button>

        {/* Speed Toggle */}
        <button
          onClick={cycleSpeed}
          className="px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-black/70 text-gray-300 hover:text-amber-300 text-[11px] font-mono border border-gray-800"
          title="Change audio playback speed"
        >
          {speed}x
        </button>
      </div>
    </div>
  );
};
