import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, Landmark, Shield, X, ArrowRight, Zap, Globe, Layers } from 'lucide-react';
import { Language } from '../types';

interface HDOpeningExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onLaunchIdentify?: () => void;
}

export const HDOpeningExperience: React.FC<HDOpeningExperienceProps> = ({
  isOpen,
  onClose,
  language,
  onSelectLanguage,
  onLaunchIdentify
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'ready'>('loading');

  useEffect(() => {
    if (!isOpen) return;

    setProgress(0);
    setPhase('loading');

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase('ready');
          return 100;
        }
        return prev + 4;
      });
    }, 45);

    // Auto-advance after 4.2 seconds if user doesn't interact
    const autoClose = setTimeout(() => {
      onClose();
    }, 4200);

    return () => {
      clearInterval(interval);
      clearTimeout(autoClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = {
    en: {
      teamTag: 'TEAM TECH YODDHAS PRESENTS',
      portalTitle: 'BAGALKOT TOURISM',
      portalSubtitle: 'AI HERITAGE LENS',
      description: 'Bridging 1,400 Years of Early Chalukya Rock-Cut Architecture with Multimodal Artificial Intelligence',
      enterBtn: 'Enter Heritage Portal',
      identifyBtn: '✨ AI Monument Lens',
      skipBtn: 'Skip Intro',
      statusLoading: 'Calibrating High-Definition Heritage Assets...',
      statusReady: 'Neural Vision & Geospatial Engine Ready',
      features: [
        { icon: Landmark, title: '150+ Temples', desc: 'Badami, Pattadakal, Aihole' },
        { icon: Sparkles, title: 'AI Monument Lens', desc: 'Neural architectural vision' },
        { icon: Globe, title: '3 Languages', desc: 'English, ಕನ್ನಡ, हिन्दी' },
      ]
    },
    kn: {
      teamTag: 'ತಂಡ ಟೆಕ್ ಯೋಧಾಸ್ ಪ್ರಸ್ತುತಿ',
      portalTitle: 'ಬಾಗಲಕೋಟೆ ಪ್ರವಾಸೋದ್ಯಮ',
      portalSubtitle: 'ಎಐ ಹೆರಿಟೇಜ್ ಲೆನ್ಸ್',
      description: '೧೪೦೦ ವರ್ಷಗಳ ಬಾದಾಮಿ ಚಾಲುಕ್ಯ ಶಿಲ್ಪ ವೈಭವ ಹಾಗೂ ನೂತನ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ಅದ್ಭುತ ಸಂಗಮ',
      enterBtn: 'ಪರಂಪರೆ ತಾಣ ಪ್ರವೇಶಿಸಿ',
      identifyBtn: '✨ ಎಐ ಸ್ಮಾರಕ ಲೆನ್ಸ್',
      skipBtn: 'ಮುಂದೆ ಹೋಗಿ',
      statusLoading: 'ಹೆಚ್‌ಡಿ ವಾಸ್ತುಶಿಲ್ಪ ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      statusReady: 'ಎಐ ದೃಷ್ಟಿ ಮತ್ತು ಮಾರ್ಗಸೂಚಿ ಸಿದ್ಧವಾಗಿದೆ',
      features: [
        { icon: Landmark, title: '೧೫೦+ ದೇವಾಲಯಗಳು', desc: 'ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ' },
        { icon: Sparkles, title: 'ಎಐ ಸ್ಮಾರಕ ಲೆನ್ಸ್', desc: 'ವಾಸ್ತುಶಿಲ್ಪ ವಿಶ್ಲೇಷಣೆ' },
        { icon: Globe, title: '೩ ಭಾಷೆಗಳು', desc: 'ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ' },
      ]
    },
    hi: {
      teamTag: 'टीम टेक योद्धास की प्रस्तुति',
      portalTitle: 'बागलकोट पर्यटन',
      portalSubtitle: 'एआई हेरिटेज लेंस',
      description: '1400 वर्ष प्राचीन चालुक्य पाषाण वास्तुकला और आधुनिक मल्टीमॉडल एआई का संगम',
      enterBtn: 'हेरिटेज पोर्टल में प्रवेश करें',
      identifyBtn: '✨ एआई स्मारक लेंस',
      skipBtn: 'स्किप करें',
      statusLoading: 'एचडी धरोहर सामग्री लोड हो रही है...',
      statusReady: 'एआई विजन एवं पर्यटन इंजन तैयार',
      features: [
        { icon: Landmark, title: '150+ प्राचीन मंदिर', desc: 'बादामी, पट्टदकल, ऐहोले' },
        { icon: Sparkles, title: 'एआई स्मारक लेंस', desc: 'वास्तुकला विश्लेषण' },
        { icon: Globe, title: '3 भाषाएं', desc: 'अंग्रेजी, कन्नड़, हिंदी' },
      ]
    }
  }[language];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060911] text-white overflow-hidden select-none animate-in fade-in duration-300">
      {/* HD BACKGROUND GRAPHICS */}
      {/* 1. Deep Space Golden Radial Nebula */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/20 via-[#0a101d] to-[#04060b] pointer-events-none" />

      {/* 2. Sandstone Grid & Constellation Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* 3. Rotating Sacred Mandala Ring in Golden Vector Wireframe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] pointer-events-none opacity-25">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_60s_linear_infinite]">
          <circle cx="100" cy="100" r="95" fill="none" stroke="#d97706" strokeWidth="0.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="#f59e0b" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="#d97706" strokeWidth="0.5" strokeDasharray="8 6" />
          <polygon points="100,20 180,100 100,180 20,100" fill="none" stroke="#f59e0b" strokeWidth="0.6" opacity="0.6" />
          <polygon points="100,35 165,100 100,165 35,100" fill="none" stroke="#fbbf24" strokeWidth="0.4" opacity="0.5" />
          <polygon points="100,10 190,100 100,190 10,100" fill="none" stroke="#b45309" strokeWidth="0.3" />
        </svg>
      </div>

      {/* 4. Layered Badami Sandstone Silhouette Silhouette Horizon at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-56 pointer-events-none opacity-30 overflow-hidden">
        <svg viewBox="0 0 1200 240" preserveAspectRatio="none" className="w-full h-full text-amber-950/80 fill-current">
          <path d="M0,240 L0,170 Q120,110 240,150 T480,120 T720,160 T960,110 T1200,150 L1200,240 Z" opacity="0.6" />
          <path d="M0,240 L0,190 Q150,140 320,175 T640,155 T960,180 T1200,160 L1200,240 Z" fill="#78350f" opacity="0.8" />
        </svg>
      </div>

      {/* Top Controls: Language Switcher & Skip Button */}
      <div className="absolute top-5 left-4 right-4 sm:left-8 sm:right-8 z-30 flex items-center justify-between">
        {/* Language Switcher */}
        <div className="flex items-center space-x-1 p-1 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md">
          {(['en', 'kn', 'hi'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => onSelectLanguage(l)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                language === l
                  ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {l === 'en' ? 'EN' : l === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}
            </button>
          ))}
        </div>

        {/* Skip Button */}
        <button
          onClick={onClose}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold backdrop-blur-md transition-all hover:scale-105"
        >
          <span>{content.skipBtn}</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* MAIN CENTERPIECE: HD GRAPHIC BANNER */}
      <div className="relative z-20 max-w-3xl w-full px-6 py-8 text-center space-y-6">
        {/* Holographic Team Badge */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border border-amber-400/50 shadow-lg shadow-amber-500/20 backdrop-blur-md animate-bounce">
          <Shield className="w-4 h-4 text-amber-400" />
          <span className="text-xs sm:text-sm font-extrabold tracking-widest text-amber-300 uppercase font-mono">
            {content.teamTag}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        {/* Grand Typography with Metallic Gold Gradient */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-serif tracking-tight leading-[1.05]">
            <span className="block text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              {content.portalTitle}
            </span>
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(245,158,11,0.5)]">
              {content.portalSubtitle}
            </span>
          </h1>
          <p className="text-sm sm:text-base text-amber-100/90 font-serif italic max-w-xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* 3 Interactive Feature Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-2xl mx-auto">
          {content.features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/25 backdrop-blur-md shadow-xl flex sm:flex-col items-center sm:text-center space-x-3 sm:space-x-0 sm:space-y-1.5 hover:border-amber-400/60 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{feat.title}</h4>
                  <p className="text-[11px] text-gray-400">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* HD Neural Progress Gauge */}
        <div className="max-w-md mx-auto space-y-2 pt-2">
          <div className="flex items-center justify-between text-[11px] text-amber-300/90 font-mono font-medium">
            <span className="flex items-center space-x-1.5">
              <Zap className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>{phase === 'loading' ? content.statusLoading : content.statusReady}</span>
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-950 rounded-full overflow-hidden border border-amber-500/30 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 rounded-full transition-all duration-100 shadow-[0_0_12px_#f59e0b]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <button
            id="btn-hd-enter-portal"
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-extrabold text-sm sm:text-base shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <Compass className="w-5 h-5 text-gray-950" />
            <span>{content.enterBtn}</span>
            <ArrowRight className="w-4 h-4 text-gray-950" />
          </button>

          <button
            id="btn-hd-open-identify"
            onClick={() => {
              onClose();
              if (onLaunchIdentify) onLaunchIdentify();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#141d2e] hover:bg-[#1a273f] text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 text-xs sm:text-sm font-bold shadow-xl backdrop-blur-md transition-all flex items-center justify-center space-x-2 hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{content.identifyBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
