import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Camera,
  MapPin,
  Footprints,
  Sparkles,
  Layers,
  Info,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Language } from '../types';
import { ALL_BADAMI_CAVES, BadamiCaveItem } from '../data/badamiCavesData';
import { speakMultilingualText, stopAllSpeech, isTTSSupported } from '../utils/speechUtils';

interface BadamiCavesExplorerProps {
  language: Language;
  initialCaveNumber?: number;
  onClose?: () => void;
}

export const BadamiCavesExplorer: React.FC<BadamiCavesExplorerProps> = ({
  language,
  initialCaveNumber = 1,
  onClose,
}) => {
  const [activeCaveIndex, setActiveCaveIndex] = useState<number>(
    Math.max(0, Math.min(ALL_BADAMI_CAVES.length - 1, initialCaveNumber - 1))
  );
  const [activeFilter, setActiveFilter] = useState<'all' | 'south' | 'north' | 'lake'>('all');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [slideDuration, setSlideDuration] = useState<number>(5000); // 5000ms or 6000ms
  const [isAutoPlaySlides, setIsAutoPlaySlides] = useState<boolean>(true);
  const [slideProgress, setSlideProgress] = useState<number>(0);

  const activeCave = ALL_BADAMI_CAVES[activeCaveIndex];
  const cavePhotos = activeCave.galleryImages && activeCave.galleryImages.length > 0
    ? activeCave.galleryImages
    : [activeCave.image || activeCave.fallbackImage];

  // Stop audio and reset slide state on unmount or cave change
  useEffect(() => {
    stopAllSpeech();
    setIsPlayingAudio(false);
    setActiveImageIndex(0);
    setSlideProgress(0);
  }, [activeCaveIndex]);

  // 5 to 6 seconds auto-slide timer
  useEffect(() => {
    if (!isAutoPlaySlides || cavePhotos.length <= 1) {
      setSlideProgress(0);
      return;
    }

    const intervalStep = 100;
    const progressIncrement = (intervalStep / slideDuration) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setActiveImageIndex((curr) => (curr + 1) % cavePhotos.length);
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isAutoPlaySlides, slideDuration, cavePhotos.length, activeCaveIndex]);

  const handleNextPhoto = () => {
    setActiveImageIndex((prev) => (prev + 1) % cavePhotos.length);
    setSlideProgress(0);
  };

  const handlePrevPhoto = () => {
    setActiveImageIndex((prev) => (prev - 1 + cavePhotos.length) % cavePhotos.length);
    setSlideProgress(0);
  };

  useEffect(() => {
    stopAllSpeech();
    setIsPlayingAudio(false);
    return () => {
      stopAllSpeech();
    };
  }, [language, activeCaveIndex]);

  const filteredCaves = ALL_BADAMI_CAVES.filter((c) => {
    if (activeFilter === 'south') return c.hillLocation === 'South Hill';
    if (activeFilter === 'north') return c.hillLocation === 'North Hill';
    if (activeFilter === 'lake') return c.hillLocation === 'Agastya Lake East Bank';
    return true;
  });

  const handleNextCave = () => {
    setActiveCaveIndex((prev) => (prev + 1) % ALL_BADAMI_CAVES.length);
  };

  const handlePrevCave = () => {
    setActiveCaveIndex((prev) => (prev - 1 + ALL_BADAMI_CAVES.length) % ALL_BADAMI_CAVES.length);
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopAllSpeech();
      setIsPlayingAudio(false);
      return;
    }

    const textToSpeak =
      activeCave.audioGuideText[language] ||
      activeCave.description[language] ||
      activeCave.audioGuideText.en;

    speakMultilingualText(textToSpeak, language, {
      rate: audioSpeed,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const labels = {
    en: {
      title: 'The 8 Caves & Rock Sanctuaries of Badami',
      subtitle:
        'Complete Comprehensive Guide to all South Cliff, North Fort & Lake-bank rock shelters carved by the Early Chalukyas.',
      allCaves: 'All 8 Caves',
      southHill: 'South Hill (Caves 1–5)',
      northHill: 'North Hill (Caves 6–7)',
      lakeEast: 'East Lake Boulder (Cave 8)',
      caveLabel: 'Cave',
      listenAudio: 'Listen Audio Guide',
      stopAudio: 'Stop Audio',
      keySculptures: 'Key Sculptural Masterpieces',
      architecturalHighlights: 'Architectural & Engineering Highlights',
      stepsLabel: 'Elevation & Accessibility',
      periodLabel: 'Historical Era',
      photoTip: 'Photography & Lighting Guide',
      nextCave: 'Next Cave',
      prevCave: 'Previous Cave',
      realPhotos: 'Real High-Definition Footage & Photos',
    },
    kn: {
      title: 'ಬಾದಾಮಿಯ ಎಲ್ಲಾ ೮ ಗುಹೆಗಳು ಮತ್ತು ಶಿಲಾ ತಾಣಗಳು',
      subtitle:
        'ದಕ್ಷಿಣ ಬೆಟ್ಟ, ಉತ್ತರ ಕೋಟೆ ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರದ ತೀರದಲ್ಲಿ ಚಾಲುಕ್ಯರು ಕೊರೆದ ಸಮಗ್ರ ೮ ಗುಹೆಗಳ ಸಂಪೂರ್ಣ ವಿವರಣೆ.',
      allCaves: 'ಎಲ್ಲಾ ೮ ಗುಹೆಗಳು',
      southHill: 'ದಕ್ಷಿಣ ಬೆಟ್ಟ (ಗುಹೆ ೧-೫)',
      northHill: 'ಉತ್ತರ ಬೆಟ್ಟ (ಗುಹೆ ೬-೭)',
      lakeEast: 'ಕೆರೆ ತೀರದ ಶಿಲೆಗಳು (ಗುಹೆ ೮)',
      caveLabel: 'ಗುಹೆ',
      listenAudio: 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ ಆಲಿಸಿ',
      stopAudio: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
      keySculptures: 'ಪ್ರಮುಖ ಶಿಲ್ಪಕಲಾ ವೈಭವ',
      architecturalHighlights: 'ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಎಂಜಿನಿಯರಿಂಗ್ ವಿಶೇಷತೆಗಳು',
      stepsLabel: 'ಮೆಟ್ಟಿಲುಗಳು ಮತ್ತು ತಲುಪುವ ಮಾರ್ಗ',
      periodLabel: 'ಐತಿಹಾಸಿಕ ಕಾಲಘಟ್ಟ',
      photoTip: 'ಛಾಯಾಗ್ರಹಣ ಮತ್ತು ಬೆಳಕಿನ ಸಲಹೆ',
      nextCave: 'ಮುಂದಿನ ಗುಹೆ',
      prevCave: 'ಹಿಂದಿನ ಗುಹೆ',
      realPhotos: 'ನೈಜ ಫೋಟೋಗಳು ಮತ್ತು ಚಿತ್ರಗಳು',
    },
    hi: {
      title: 'बादामी की सभी 8 गुफाएं एवं शैल मंदिर',
      subtitle:
        'दक्षिणी पहाड़ी, उत्तरी किले और अगस्त्य झील के तट पर चालुक्यों द्वारा तराशी गई सभी 8 ऐतिहासिक गुफाओं का विस्तृत विवरण।',
      allCaves: 'सभी 8 गुफाएं',
      southHill: 'दक्षिणी पहाड़ी (गुफा 1-5)',
      northHill: 'उत्तरी पहाड़ी (गुफा 6-7)',
      lakeEast: 'झील तट शिलाएं (गुफा 8)',
      caveLabel: 'गुफा',
      listenAudio: 'ऑडियो गाइड सुनें',
      stopAudio: 'ऑडियो रोकें',
      keySculptures: 'प्रमुख मूर्तिकला एवं विशेषताएं',
      architecturalHighlights: 'स्थापत्य एवं इंजीनियरिंग विशेषताएं',
      stepsLabel: 'ऊंचाई एवं सीढ़ियों की जानकारी',
      periodLabel: 'ऐतिहासिक काल',
      photoTip: 'फोटोग्राफी एवं प्रकाश मार्गदर्शिका',
      nextCave: 'अगली गुफा',
      prevCave: 'पिछली गुफा',
      realPhotos: 'वास्तविक उच्च-रिज़ॉल्यूशन तस्वीरें',
    },
  }[language];

  const currentImage =
    activeCave.galleryImages[activeImageIndex] || activeCave.image || activeCave.fallbackImage;

  return (
    <div className="bg-[#0b101b] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl space-y-6 p-4 sm:p-6 lg:p-8 text-gray-200">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Complete 8-Cave Heritage Dossier • Badami (Vatapi)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
            {labels.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">{labels.subtitle}</p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="self-end md:self-auto p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            title="Close Explorer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Tabs by Location */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-amber-500 text-gray-950 shadow-md font-extrabold'
              : 'bg-black/40 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          {labels.allCaves} (8)
        </button>
        <button
          onClick={() => setActiveFilter('south')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'south'
              ? 'bg-amber-500 text-gray-950 shadow-md font-extrabold'
              : 'bg-black/40 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          {labels.southHill} (5)
        </button>
        <button
          onClick={() => setActiveFilter('north')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'north'
              ? 'bg-amber-500 text-gray-950 shadow-md font-extrabold'
              : 'bg-black/40 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          {labels.northHill} (2)
        </button>
        <button
          onClick={() => setActiveFilter('lake')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'lake'
              ? 'bg-amber-500 text-gray-950 shadow-md font-extrabold'
              : 'bg-black/40 text-gray-400 hover:text-white border border-gray-800'
          }`}
        >
          {labels.lakeEast} (1)
        </button>
      </div>

      {/* 8 Cave Selection Pills Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {ALL_BADAMI_CAVES.map((cave, index) => {
          const isSelected = index === activeCaveIndex;
          const isDimmed =
            (activeFilter === 'south' && cave.hillLocation !== 'South Hill') ||
            (activeFilter === 'north' && cave.hillLocation !== 'North Hill') ||
            (activeFilter === 'lake' && cave.hillLocation !== 'Agastya Lake East Bank');

          return (
            <button
              key={cave.id}
              onClick={() => setActiveCaveIndex(index)}
              className={`p-2.5 rounded-2xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-gradient-to-b from-amber-500/25 to-[#161f30] border-amber-400 shadow-lg ring-1 ring-amber-400/50'
                  : isDimmed
                  ? 'opacity-40 bg-black/20 border-gray-800 hover:opacity-80'
                  : 'bg-[#121826] border-gray-800 hover:border-gray-700 hover:bg-[#161f30]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                    isSelected ? 'bg-amber-500 text-gray-950' : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {cave.number}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-gray-400 border border-gray-800">
                  {cave.category}
                </span>
              </div>
              <p className="text-xs font-bold text-white truncate">
                {language === 'kn' ? cave.kannadaName : language === 'hi' ? cave.hindiName : cave.name}
              </p>
              <p className="text-[10px] text-gray-400 truncate">{cave.hillLocation}</p>
            </button>
          );
        })}
      </div>

      {/* Main Cave Detail Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
        {/* Left Column: Photo Stage & Media with 5-6s Slideshow */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-amber-500/30 shadow-2xl group select-none">
            <img
              src={cavePhotos[activeImageIndex] || activeCave.fallbackImage}
              alt={`${activeCave.name} photo ${activeImageIndex + 1}`}
              onError={(e) => {
                (e.target as HTMLImageElement).src = activeCave.fallbackImage;
              }}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

            {/* Top Badges & Controls Header */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 gap-2">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="px-2.5 sm:px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md text-amber-400 text-xs font-black border border-amber-500/40">
                  {labels.caveLabel} {activeCave.number}
                </span>
                <span className="px-2.5 sm:px-3 py-1 rounded-xl bg-black/80 backdrop-blur-md text-emerald-400 text-xs font-semibold border border-emerald-500/40">
                  {activeCave.hillLocation}
                </span>
              </div>

              {/* 5s/6s Slideshow Quick Controls */}
              {cavePhotos.length > 1 && (
                <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2 py-1 rounded-xl border border-white/20">
                  <button
                    onClick={() => setSlideDuration((d) => (d === 5000 ? 6000 : 5000))}
                    className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors border border-amber-500/40"
                    title="Toggle auto-slide speed between 5s and 6s clicks"
                  >
                    ⏱ {slideDuration / 1000}s clicks
                  </button>
                  <button
                    onClick={() => setIsAutoPlaySlides(!isAutoPlaySlides)}
                    className="p-1 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
                    title={isAutoPlaySlides ? 'Pause Slideshow' : 'Play Slideshow'}
                  >
                    {isAutoPlaySlides ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* Left and Right Manual Click Controls */}
            {cavePhotos.length > 1 && (
              <>
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-amber-500/90 text-white hover:text-gray-950 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95"
                  title="Previous Photo click"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-amber-500/90 text-white hover:text-gray-950 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95"
                  title="Next Photo click"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* 5-6s Progress Bar */}
            {cavePhotos.length > 1 && isAutoPlaySlides && (
              <div className="absolute bottom-0 inset-x-0 h-1 bg-black/60 z-20">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                  style={{ width: `${slideProgress}%` }}
                />
              </div>
            )}

            {/* Bottom Floating Info & Dots */}
            <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-between z-10">
              <div>
                <p className="text-xs text-amber-300 font-bold truncate">
                  {language === 'kn'
                    ? activeCave.kannadaTheme
                    : language === 'hi'
                    ? activeCave.hindiTheme
                    : activeCave.deityAndTheme}
                </p>
                <p className="text-[11px] text-gray-300">{activeCave.period}</p>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[10px] text-amber-300 font-mono px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  {activeImageIndex + 1} / {cavePhotos.length}
                </span>
                <span className="text-[10px] text-gray-400 font-mono hidden sm:inline">
                  {labels.realPhotos}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Thumbnail Gallery Strip */}
          {cavePhotos.length > 1 && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-0.5">
              {cavePhotos.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveImageIndex(i);
                    setSlideProgress(0);
                  }}
                  className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === i
                      ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20 ring-2 ring-amber-400/40'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:scale-102'
                  }`}
                  title={`View photo ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = activeCave.fallbackImage;
                    }}
                    className="w-full h-full object-cover"
                  />
                  {activeImageIndex === i && (
                    <div className="absolute inset-0 bg-amber-400/10 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Trilingual Audio Narration Player */}
          {isTTSSupported() && (
            <div className="p-3.5 rounded-2xl bg-[#141b29] border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Volume2 className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {language === 'kn'
                      ? 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ'
                      : language === 'hi'
                      ? 'ऑडियो गाइड'
                      : 'Audio Guide'}
                  </p>
                  <p className="text-xs font-bold text-white">
                    {language === 'kn'
                      ? activeCave.kannadaName
                      : language === 'hi'
                      ? activeCave.hindiName
                      : activeCave.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleToggleAudio}
                  className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md ${
                    isPlayingAudio
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 hover:from-amber-400 hover:to-amber-500'
                  }`}
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>{labels.stopAudio}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{labels.listenAudio}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Historical Dossier, Carvings, Architecture */}
        <div className="lg:col-span-5 space-y-4">
          {/* Cave Title & Subtitle */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                {activeCave.category} • {activeCave.hillLocation}
              </span>
              <span className="text-xs text-gray-400 font-mono">{activeCave.stepsCount}</span>
            </div>
            <h3 className="text-2xl font-black text-white font-serif mt-1">
              {language === 'kn'
                ? activeCave.kannadaName
                : language === 'hi'
                ? activeCave.hindiName
                : activeCave.name}
            </h3>
            <p className="text-xs text-amber-300/90 font-serif italic mt-0.5">
              "{activeCave.deityAndTheme}"
            </p>
          </div>

          {/* Description */}
          <div className="p-4 rounded-2xl bg-black/40 border border-gray-800 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
            {activeCave.description[language] || activeCave.description.en}
          </div>

          {/* Key Sculptural Masterpieces */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{labels.keySculptures}</span>
            </h4>
            <div className="space-y-1.5">
              {activeCave.keySculptures.map((sculpture, i) => (
                <div
                  key={i}
                  className="flex items-start space-x-2 text-xs text-gray-300 bg-[#121826]/80 p-2.5 rounded-xl border border-gray-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                  <span>{sculpture}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Highlights */}
          {activeCave.architecturalHighlights && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>{labels.architecturalHighlights}</span>
              </h4>
              <ul className="space-y-1 text-xs text-gray-400 list-disc list-inside">
                {activeCave.architecturalHighlights.map((hl, i) => (
                  <li key={i}>{hl}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Photography & Visiting Tip */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold">
              <Camera className="w-3.5 h-3.5" />
              <span>{labels.photoTip}</span>
            </div>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              {activeCave.photographyTip}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-800">
            <button
              onClick={handlePrevCave}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{labels.prevCave}</span>
            </button>
            <span className="text-xs font-mono text-gray-400">
              {activeCaveIndex + 1} / {ALL_BADAMI_CAVES.length}
            </span>
            <button
              onClick={handleNextCave}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-colors"
            >
              <span>{labels.nextCave}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
