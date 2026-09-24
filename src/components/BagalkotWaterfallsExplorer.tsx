import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MapPin,
  Compass,
  Footprints,
  Calendar,
  Sparkles,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
  Droplets,
  Waves,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import {
  ALL_BAGALKOT_WATERFALLS,
  TALUK_LIST,
  WaterfallItem,
  BagalkotTaluk,
} from '../data/waterfallsData';
import { speakMultilingualText, stopAllSpeech, isTTSSupported } from '../utils/speechUtils';

interface BagalkotWaterfallsExplorerProps {
  language: Language;
  onClose?: () => void;
  initialWaterfallId?: string;
}

export const BagalkotWaterfallsExplorer: React.FC<BagalkotWaterfallsExplorerProps> = ({
  language,
  onClose,
  initialWaterfallId,
}) => {
  const [selectedTaluk, setSelectedTaluk] = useState<'all' | BagalkotTaluk>('all');
  const [activeWaterfallId, setActiveWaterfallId] = useState<string>(() => {
    if (initialWaterfallId) {
      const found = ALL_BAGALKOT_WATERFALLS.find((w) => w.id === initialWaterfallId);
      if (found) return found.id;
    }
    return ALL_BAGALKOT_WATERFALLS[0].id;
  });
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<'detail' | 'grid'>('detail');

  const activeWaterfall =
    ALL_BAGALKOT_WATERFALLS.find((w) => w.id === activeWaterfallId) ||
    ALL_BAGALKOT_WATERFALLS[0];

  // Stop audio on change or unmount
  useEffect(() => {
    stopAllSpeech();
    setIsPlayingAudio(false);
    setActiveImageIndex(0);
  }, [activeWaterfallId]);

  useEffect(() => {
    stopAllSpeech();
    setIsPlayingAudio(false);
    return () => {
      stopAllSpeech();
    };
  }, [language, activeWaterfallId]);

  const filteredWaterfalls = ALL_BAGALKOT_WATERFALLS.filter((w) => {
    if (selectedTaluk === 'all') return true;
    return w.taluk === selectedTaluk;
  });

  const handleNextWaterfall = () => {
    const currentIndex = ALL_BAGALKOT_WATERFALLS.findIndex((w) => w.id === activeWaterfallId);
    const nextIndex = (currentIndex + 1) % ALL_BAGALKOT_WATERFALLS.length;
    setActiveWaterfallId(ALL_BAGALKOT_WATERFALLS[nextIndex].id);
  };

  const handlePrevWaterfall = () => {
    const currentIndex = ALL_BAGALKOT_WATERFALLS.findIndex((w) => w.id === activeWaterfallId);
    const prevIndex =
      (currentIndex - 1 + ALL_BAGALKOT_WATERFALLS.length) % ALL_BAGALKOT_WATERFALLS.length;
    setActiveWaterfallId(ALL_BAGALKOT_WATERFALLS[prevIndex].id);
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopAllSpeech();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak =
      activeWaterfall.audioGuideText[language] ||
      activeWaterfall.description[language] ||
      activeWaterfall.audioGuideText.en;

    speakMultilingualText(textToSpeak, language, {
      rate: audioSpeed,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const labels = {
    en: {
      teamBadge: 'Team Tech Yoddhas • Bagalkote Tourism',
      title: 'Waterfalls & Hidden Cascades of Bagalkote',
      subtitle:
        'Official comprehensive guide to all seasonal waterfalls, secret forest cascades, perennial springs, and river rapids across all 9 taluks of Bagalkote District.',
      allTaluks: 'All 9 Taluks',
      hiddenGem: 'Hidden Gem',
      dropHeight: 'Drop / Height',
      bestSeason: 'Best Season',
      trekDifficulty: 'Trek & Accessibility',
      location: 'Location',
      highlightsTitle: 'Waterfall Highlights & Geological Features',
      safetyTitle: 'Travel & Monsoon Safety Advisory',
      audioGuide: 'Listen Audio Guide',
      playing: 'Playing Narration...',
      paused: 'Play Audio Guide',
      speed: 'Speed',
      viewAllGrid: 'View All in Grid',
      showDetail: 'Show Showcase View',
      prev: 'Previous Falls',
      next: 'Next Falls',
      close: 'Close Explorer',
    },
    kn: {
      teamBadge: 'ಟೀಮ್ ಟೆಕ್ ಯೋಧಾಸ್ • ಬಾಗಲಕೋಟೆ ಪ್ರವಾಸೋದ್ಯಮ',
      title: 'ಬಾಗಲಕೋಟೆಯ ಜಲಪಾತಗಳು ಮತ್ತು ಗುಪ್ತ ಜಲಧಾರೆಗಳು',
      subtitle:
        'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ಎಲ್ಲಾ ೯ ತಾಲೂಕುಗಳ ರಮಣೀಯ ಮಳೆಗಾಲದ ಜಲಪಾತಗಳು, ಅಡಗಿರುವ ಕಾಡಿನ ಜಲಧಾರೆಗಳು, ಪವಿತ್ರ ಜಲಬುಗ್ಗೆಗಳು ಮತ್ತು ನದಿ ಸೆಳೆತಗಳ ಅಧಿಕೃತ ಪರಿಶೋಧಕ.',
      allTaluks: 'ಎಲ್ಲಾ ೯ ತಾಲೂಕುಗಳು',
      hiddenGem: 'ಗುಪ್ತ ನೈಸರ್ಗಿಕ ತಾಣ',
      dropHeight: 'ಎತ್ತರ / ಹರಿವು',
      bestSeason: 'ಉತ್ತಮ ಸಮಯ',
      trekDifficulty: 'ಚಾರಣ ಮತ್ತು ಪ್ರವೇಶ',
      location: 'ಸ್ಥಳ',
      highlightsTitle: 'ಜಲಪಾತದ ಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯಗಳು',
      safetyTitle: 'ಪ್ರವಾಸ ಮತ್ತು ಸುರಕ್ಷತಾ ಮಾರ್ಗಸೂಚಿ',
      audioGuide: 'ಧ್ವನಿ ವಿವರಣೆ ಕೇಳಿ',
      playing: 'ವಿವರಣೆ ಚಾಲನೆಯಲ್ಲಿದೆ...',
      paused: 'ಧ್ವನಿ ವಿವರಣೆ ಪ್ಲೇ ಮಾಡಿ',
      speed: 'ವೇಗ',
      viewAllGrid: 'ಎಲ್ಲಾ ಜಲಪಾತಗಳ ಗ್ರಿಡ್',
      showDetail: 'ವಿವರವಾದ ನೋಟ',
      prev: 'ಹಿಂದಿನ ಜಲಪಾತ',
      next: 'ಮುಂದಿನ ಜಲಪಾತ',
      close: 'ಮುಚ್ಚಿ',
    },
    hi: {
      teamBadge: 'टीम टेक योद्धास • बागलकोट पर्यटन',
      title: 'बागलकोट के जलप्रपात एवं गुप्त प्राकृतिक झरने',
      subtitle:
        'बागलकोट जिले के सभी 9 तालुकों के मौसमी जलप्रपातों, छिपे हुए वन झरनों, पवित्र प्राकृतिक जलस्रोतों एवं नदी रैपिड्स की आधिकारिक संपूर्ण गाइड।',
      allTaluks: 'सभी 9 तालुक',
      hiddenGem: 'गुप्त प्राकृतिक धरोहर',
      dropHeight: 'ऊंचाई / प्रवाह',
      bestSeason: 'सर्वोत्तम समय',
      trekDifficulty: 'ट्रैकिंग एवं पहुंच',
      location: 'स्थान',
      highlightsTitle: 'जलप्रपात की मुख्य विशेषताएं',
      safetyTitle: 'यात्रा एवं मानसून सुरक्षा निर्देश',
      audioGuide: 'ऑडियो गाइड सुनें',
      playing: 'ऑडियो गाइड चल रहा है...',
      paused: 'ऑडियो गाइड चलाएं',
      speed: 'गति',
      viewAllGrid: 'सभी झरने ग्रिड में देखें',
      showDetail: 'विस्तृत दृश्य',
      prev: 'पिछला झरना',
      next: 'अगला झरना',
      close: 'बंद करें',
    },
  }[language];

  return (
    <div className="relative w-full rounded-3xl bg-[#0b1320] border border-cyan-500/30 text-white shadow-2xl overflow-hidden animate-waterfall-modal">
      {/* Background Animated Water Mist & Radial Light Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-mist-glow" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-mist-glow" />

      {/* Decorative Wave Flow Bar on Top */}
      <div className="h-1.5 w-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-amber-500" />

      {/* Header Bar */}
      <div className="p-4 sm:p-6 border-b border-gray-800 bg-[#0d1626]/90 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 text-xs font-semibold">
              <Droplets className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
              <span>{labels.teamBadge}</span>
            </span>
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <Waves className="w-3 h-3 text-emerald-400" />
              <span>100% Bagalkote District (All 9 Taluks)</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight flex items-center gap-2">
            <span>{labels.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            {labels.subtitle}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => setViewMode((prev) => (prev === 'detail' ? 'grid' : 'detail'))}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 text-xs font-semibold border border-white/15 transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>{viewMode === 'detail' ? labels.viewAllGrid : labels.showDetail}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/20 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title={labels.close}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 9 Taluks Filter Pill Bar */}
      <div className="px-4 sm:px-6 py-3 bg-[#0a101b] border-b border-gray-800/80 overflow-x-auto scrollbar-none flex items-center gap-2 relative z-10">
        {TALUK_LIST.map((t) => {
          const isSelected = selectedTaluk === t.id;
          return (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTaluk(t.id);
                if (t.id !== 'all') {
                  const firstOfTaluk = ALL_BAGALKOT_WATERFALLS.find((w) => w.taluk === t.id);
                  if (firstOfTaluk) setActiveWaterfallId(firstOfTaluk.id);
                }
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-gray-950 shadow-md shadow-cyan-500/20 scale-105'
                  : 'bg-[#131d2e] text-gray-300 hover:text-white hover:bg-[#1a283f] border border-gray-800'
              }`}
            >
              <span>{t.label[language] || t.label.en}</span>
            </button>
          );
        })}
      </div>

      {/* Main Body: Either Showcase Detail or All Grid View */}
      {viewMode === 'detail' ? (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 relative z-10">
          {/* Top Navigator between Falls */}
          <div className="flex items-center justify-between bg-[#101a2b] p-3 sm:p-4 rounded-2xl border border-gray-800">
            <button
              onClick={handlePrevWaterfall}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">{labels.prev}</span>
            </button>

            {/* Quick Taluk & Hidden Gem Badges */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                {activeWaterfall.kannadaTaluk && language === 'kn'
                  ? activeWaterfall.kannadaTaluk
                  : activeWaterfall.hindiTaluk && language === 'hi'
                  ? activeWaterfall.hindiTaluk
                  : activeWaterfall.taluk}{' '}
                Taluk
              </span>

              {activeWaterfall.isHiddenGem && (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold flex items-center space-x-1 animate-pulse">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{labels.hiddenGem}</span>
                </span>
              )}
            </div>

            <button
              onClick={handleNextWaterfall}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">{labels.next}</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>

          {/* Two-Column Showcase: Media on Left, Story on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Photo Showcase & Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#0c1320] border border-cyan-500/30 shadow-xl group">
                <img
                  src={activeWaterfall.galleryImages[activeImageIndex] || activeWaterfall.image}
                  alt={activeWaterfall.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/images/monuments/bhutanatha.jpg';
                  }}
                />

                {/* Gradient Overlay for Title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Category & Location Floating Pill */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-cyan-300 border border-cyan-400/30">
                    {activeWaterfall.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs text-gray-200 border border-white/20 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>
                      {activeWaterfall.kannadaLocation && language === 'kn'
                        ? activeWaterfall.kannadaLocation
                        : activeWaterfall.hindiLocation && language === 'hi'
                        ? activeWaterfall.hindiLocation
                        : activeWaterfall.location}
                    </span>
                  </span>
                </div>

                {/* Bottom Photo Caption */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gray-200 bg-black/50 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                  <span className="font-semibold truncate">
                    Photo {activeImageIndex + 1} of {activeWaterfall.galleryImages.length}: {activeWaterfall.name}
                  </span>
                  <span className="text-cyan-400 font-mono text-[11px] shrink-0">
                    Verified Photographic Capture
                  </span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {activeWaterfall.galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {activeWaterfall.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/30'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Info Matrix */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#121c2e] border border-gray-800 text-center space-y-1">
                  <span className="text-[11px] text-gray-400 font-medium block">
                    {labels.dropHeight}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-cyan-300">
                    {activeWaterfall.dropHeight}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121c2e] border border-gray-800 text-center space-y-1">
                  <span className="text-[11px] text-gray-400 font-medium block">
                    {labels.bestSeason}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-300">
                    {activeWaterfall.kannadaBestMonths && language === 'kn'
                      ? activeWaterfall.kannadaBestMonths
                      : activeWaterfall.hindiBestMonths && language === 'hi'
                      ? activeWaterfall.hindiBestMonths
                      : activeWaterfall.bestMonths}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121c2e] border border-gray-800 text-center space-y-1">
                  <span className="text-[11px] text-gray-400 font-medium block">
                    {labels.trekDifficulty}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-amber-300 flex items-center justify-center gap-1">
                    <Footprints className="w-3 h-3 text-amber-400" />
                    <span>{activeWaterfall.accessibility}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative, Audio Player, Highlights & Safety */}
            <div className="lg:col-span-5 space-y-6">
              {/* Title & Native Script Names */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
                    {activeWaterfall.taluk} Taluk • {activeWaterfall.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                  {language === 'kn'
                    ? activeWaterfall.kannadaName
                    : language === 'hi'
                    ? activeWaterfall.hindiName
                    : activeWaterfall.name}
                </h3>

                {language !== 'kn' && (
                  <p className="text-sm font-serif text-cyan-200/80 italic">
                    {activeWaterfall.kannadaName}
                  </p>
                )}
              </div>

              {/* TTS Audio Player Bar */}
              {isTTSSupported() && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-[#132238] to-[#122033] border border-cyan-500/40 flex items-center justify-between gap-3 shadow-lg shadow-cyan-950/30">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleToggleAudio}
                      className={`p-3 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isPlayingAudio
                          ? 'bg-cyan-500 text-gray-950 shadow-lg shadow-cyan-400/50 scale-105'
                          : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/40'
                      }`}
                      title={isPlayingAudio ? 'Pause Narration' : 'Play Audio Narration'}
                    >
                      {isPlayingAudio ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <div>
                      <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{isPlayingAudio ? labels.playing : labels.audioGuide}</span>
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {language === 'kn' ? 'ಕನ್ನಡ ಧ್ವನಿ' : language === 'hi' ? 'हिंदी आवाज' : 'English Narration'}
                      </div>
                    </div>
                  </div>

                  {/* Audio Equalizer bars when playing */}
                  {isPlayingAudio && (
                    <div className="flex items-end space-x-1 h-5">
                      <span className="w-1 bg-cyan-400 rounded-full animate-[audioEqualizer_0.8s_ease-in-out_infinite]" />
                      <span className="w-1 bg-cyan-300 rounded-full animate-[audioEqualizer_1.1s_ease-in-out_0.2s_infinite]" />
                      <span className="w-1 bg-emerald-400 rounded-full animate-[audioEqualizer_0.9s_ease-in-out_0.4s_infinite]" />
                    </div>
                  )}

                  {/* Playback speed selector */}
                  <div className="flex items-center space-x-1">
                    {[0.75, 1.0, 1.25].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setAudioSpeed(speed)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                          audioSpeed === speed
                            ? 'bg-cyan-400 text-gray-950 font-bold'
                            : 'bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Narrative Description */}
              <div className="text-xs sm:text-sm text-gray-300 leading-relaxed space-y-3 bg-[#0d1624] p-4 sm:p-5 rounded-2xl border border-gray-800">
                <p>
                  {activeWaterfall.description[language] ||
                    activeWaterfall.description.en}
                </p>
              </div>

              {/* Highlights Checklist */}
              <div className="space-y-3 bg-[#0d1624] p-4 sm:p-5 rounded-2xl border border-gray-800">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{labels.highlightsTitle}</span>
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {(language === 'kn' && activeWaterfall.kannadaHighlights
                    ? activeWaterfall.kannadaHighlights
                    : language === 'hi' && activeWaterfall.hindiHighlights
                    ? activeWaterfall.hindiHighlights
                    : activeWaterfall.highlights
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Travel & Monsoon Safety Advisory */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start space-x-3 text-xs text-amber-200/90 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-amber-300 font-bold mb-1">
                    {labels.safetyTitle}
                  </strong>
                  <span>
                    {activeWaterfall.safetyAdvisory[language] ||
                      activeWaterfall.safetyAdvisory.en}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* GRID VIEW OF ALL WATERFALLS ACROSS ALL TALUKS */
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWaterfalls.map((w, index) => {
              const isSelected = w.id === activeWaterfallId;
              return (
                <div
                  key={w.id}
                  onClick={() => {
                    setActiveWaterfallId(w.id);
                    setViewMode('detail');
                  }}
                  className={`group rounded-2xl overflow-hidden bg-[#10192a] border transition-all duration-300 cursor-pointer flex flex-col animate-cascade-card hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-950/40 ${
                    isSelected ? 'border-cyan-400 ring-2 ring-cyan-500/40' : 'border-gray-800 hover:border-cyan-500/40'
                  }`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                    <img
                      src={w.image}
                      alt={w.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = '/images/monuments/bhutanatha.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/40 text-cyan-300 text-[10px] font-bold">
                        {w.taluk}
                      </span>
                      {w.isHiddenGem && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/30 border border-amber-400/50 text-amber-200 text-[10px] font-bold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                          <span>Hidden Gem</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-gray-200">
                      <span className="font-mono text-cyan-300 font-bold">{w.dropHeight}</span>
                      <span className="text-gray-300 font-medium">{w.accessibility}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-base font-bold font-serif text-white group-hover:text-cyan-300 transition-colors">
                        {language === 'kn' ? w.kannadaName : language === 'hi' ? w.hindiName : w.name}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                        {w.description[language] || w.description.en}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-xs">
                      <span className="text-emerald-400 font-semibold">{w.bestMonths}</span>
                      <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        <span>Explore</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
