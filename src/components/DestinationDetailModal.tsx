import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  X,
  MapPin,
  Clock,
  Calendar,
  ShieldCheck,
  Camera,
  Navigation,
  ArrowRight,
  Compass,
  Sparkles,
  Car,
  Train,
  Plane,
  Info,
  Scroll,
  BookOpen,
  Layers,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Timer
} from 'lucide-react';
import { Destination } from '../data/destinations';
import { handleImageError } from '../utils/imageUtils';
import { TTSAudioPlayer } from './TTSAudioPlayer';
import { BadamiCavesExplorer } from './BadamiCavesExplorer';
import { Language } from '../types';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onViewOnMap: (dest: Destination) => void;
  onPlanTrip: (dest: Destination) => void;
  language?: Language;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onViewOnMap,
  onPlanTrip,
  language = 'en',
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [slideSeconds, setSlideSeconds] = useState<5 | 6>(5);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [slideProgress, setSlideProgress] = useState<number>(0);

  const galleryList = destination?.galleryImages && destination.galleryImages.length > 0
    ? destination.galleryImages
    : destination?.image
    ? [destination.image]
    : [];

  const totalImages = galleryList.length;

  const handleNextPhoto = useCallback(() => {
    if (totalImages <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
    setSlideProgress(0);
  }, [totalImages]);

  const handlePrevPhoto = useCallback(() => {
    if (totalImages <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    setSlideProgress(0);
  }, [totalImages]);

  // Sync activeImageIndex when destination changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSlideProgress(0);
  }, [destination?.id]);

  // 5 or 6 seconds auto-slide loop
  useEffect(() => {
    if (!destination || !isAutoPlaying || totalImages <= 1) {
      setSlideProgress(0);
      return;
    }

    const durationMs = slideSeconds * 1000;
    const intervalStep = 50;
    setSlideProgress(0);

    const startTime = Date.now();
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setSlideProgress(pct);
    }, intervalStep);

    const autoTimer = setTimeout(() => {
      handleNextPhoto();
    }, durationMs);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(autoTimer);
    };
  }, [activeImageIndex, slideSeconds, isAutoPlaying, totalImages, destination, handleNextPhoto]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!destination) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [destination, onClose]);

  if (!destination) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl my-2 sm:my-auto bg-[#101725] border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] sm:max-h-[90vh]"
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-gray-300 hover:text-white border border-white/20 flex items-center justify-center transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8">
          {/* Header & Badges */}
          <div className="space-y-3 pr-12">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {destination.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-750">
                {destination.taluk} Taluk
              </span>
              {destination.id === 'pattadakal' && (
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500 text-gray-950">
                  UNESCO World Heritage Site
                </span>
              )}
            </div>

            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
                {destination.name}
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <p className="text-base sm:text-lg text-amber-400 font-medium">
                  {destination.kannadaName}
                </p>
                {destination.hindiName && (
                  <span className="text-sm sm:text-base text-amber-200/80 font-medium">
                    • {destination.hindiName}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-300 italic font-serif">
              "{destination.tagline}"
            </p>

            {/* Trilingual Text-to-Speech (TTS) Audio Player */}
            <div className="pt-2">
              <TTSAudioPlayer
                title={language === 'kn' ? destination.kannadaName : language === 'hi' ? (destination.hindiName || destination.name) : destination.name}
                defaultLanguage={language}
                textMap={{
                  en: `${destination.name}. ${destination.tagline}. ${destination.fullOverview} Highlights: ${destination.keyHighlights.slice(0, 3).join('. ')}`,
                  kn: `${destination.kannadaName}. ${destination.kannadaOverview || destination.fullOverview}`,
                  hi: `${destination.hindiName || destination.name}. ${destination.hindiOverview || destination.fullOverview}`,
                }}
              />
            </div>
          </div>

          {/* Interactive Photo Stage with 5-6s Auto-Slide & Clicks */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 group shadow-xl">
              <img
                key={activeImageIndex}
                src={galleryList[activeImageIndex] || destination.image}
                alt={destination.name}
                onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

              {/* Prev / Next Slide Click Buttons */}
              {totalImages > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevPhoto}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-amber-500 hover:text-gray-950 text-white border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-lg cursor-pointer"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPhoto}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-amber-500 hover:text-gray-950 text-white border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-lg cursor-pointer"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Top Controls: 5s/6s speed toggle and play/pause */}
              {totalImages > 1 && (
                <div className="absolute top-3 left-3 z-20 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-bold text-gray-200 hover:text-white border border-white/20 flex items-center space-x-1.5 transition-colors cursor-pointer"
                    title={isAutoPlaying ? 'Pause Slide' : `Auto-Slide (${slideSeconds}s)`}
                  >
                    {isAutoPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                    <span>{isAutoPlaying ? 'Auto' : 'Paused'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSlideSeconds((prev) => (prev === 5 ? 6 : 5))}
                    className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/40 text-[10px] font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
                    title="Click to toggle between 5 and 6 seconds auto-slide"
                  >
                    <Timer className="w-3 h-3 inline mr-1 text-amber-400" />
                    {slideSeconds}s clicks
                  </button>
                </div>
              )}

              {/* Bottom Info Tags */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-lg bg-black/75 backdrop-blur-sm text-xs text-gray-300 border border-white/10">
                  Historical Era: <strong className="text-amber-300">{destination.historicalEra}</strong>
                </span>
                {totalImages > 1 && (
                  <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-[11px] font-mono text-amber-400 border border-white/10">
                    Photo {activeImageIndex + 1} of {totalImages}
                  </span>
                )}
              </div>
            </div>

            {/* 5-6s Slide Progress Bar */}
            {totalImages > 1 && (
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                  style={{ width: `${isAutoPlaying ? slideProgress : 0}%` }}
                />
              </div>
            )}

            {/* Thumbnail Carousel Bar */}
            {totalImages > 1 && (
              <div className="flex items-center space-x-2.5 overflow-x-auto pb-1 scrollbar-none">
                {galleryList.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveImageIndex(i);
                      setSlideProgress(0);
                    }}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === i
                        ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/30'
                        : 'border-gray-800 opacity-60 hover:opacity-100'
                    }`}
                    title={`Click photo ${i + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
                    />
                    <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1 py-0.2 rounded bg-black/80 text-white font-bold">
                      {i + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Quick Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#161f30] p-4 rounded-2xl border border-gray-800 text-xs">
            <div className="space-y-1">
              <span className="text-gray-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Visiting Hours:
              </span>
              <p className="font-semibold text-white">{destination.timings}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Best Season:
              </span>
              <p className="font-semibold text-white">{destination.bestTimeToVisit}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                Entry Fee:
              </span>
              <p className="font-semibold text-white">{destination.entryFee}</p>
            </div>
            <div className="space-y-1">
              <span className="text-gray-400 flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                Photography:
              </span>
              <p className="font-semibold text-white">{destination.photography}</p>
            </div>
          </div>

          {/* Overview & Key Highlights */}
          <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-serif text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Historical Overview</span>
              </h3>
              <p>{destination.fullOverview}</p>
            </div>

            <div className="space-y-3 bg-[#131b2a] p-5 rounded-2xl border border-gray-800">
              <h3 className="text-base font-bold font-serif text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Key Architectural & Tourism Highlights</span>
              </h3>
              <ul className="grid grid-cols-1 gap-2.5">
                {destination.keyHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-2 text-xs text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architectural Style & Masonry Analysis */}
            {destination.architecturalStyleDetails && (
              <div className="space-y-2 bg-[#141b2c] p-5 rounded-2xl border border-blue-500/20">
                <h3 className="text-base font-bold font-serif text-blue-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span>Architectural Classification & Masonry</span>
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  {destination.architecturalStyleDetails}
                </p>
              </div>
            )}

            {/* Epigraphy & Historic Inscriptions */}
            {destination.epigraphyAndInscriptions && destination.epigraphyAndInscriptions.length > 0 && (
              <div className="space-y-3 bg-[#181a24] p-5 rounded-2xl border border-amber-500/30">
                <h3 className="text-base font-bold font-serif text-amber-300 flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-amber-400" />
                  <span>Epigraphy & Royal Inscriptions</span>
                </h3>
                <div className="space-y-2">
                  {destination.epigraphyAndInscriptions.map((inscription, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-black/40 border border-amber-500/20 text-xs text-amber-100/90 leading-relaxed flex items-start space-x-2.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{inscription}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All 8 Caves of Badami Interactive Explorer & Real Footage */}
            {destination.id === 'badami' && (
              <div className="pt-2">
                <BadamiCavesExplorer language={language} />
              </div>
            )}
          </div>

          {/* How to Reach Detailed Section */}
          <div className="space-y-3">
            <h3 className="text-base font-bold font-serif text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>How to Reach {destination.name}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-[#141d2e] border border-gray-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-400 font-bold">
                  <Car className="w-4 h-4" />
                  <span>By Road</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{destination.howToReach.byRoad}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#141d2e] border border-gray-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-400 font-bold">
                  <Train className="w-4 h-4" />
                  <span>By Rail</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{destination.howToReach.byRail}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#141d2e] border border-gray-800 space-y-1.5">
                <div className="flex items-center space-x-2 text-amber-400 font-bold">
                  <Plane className="w-4 h-4" />
                  <span>Nearest Airports</span>
                </div>
                <p className="text-gray-300 leading-relaxed">{destination.howToReach.nearestAirport}</p>
              </div>
            </div>
          </div>

          {/* Nearby Sites */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-gray-400 font-medium">Nearby Circuit Sites:</span>
            {destination.nearbyAttractions.map((site, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-gray-800 text-amber-200 border border-gray-700">
                {site}
              </span>
            ))}
          </div>

          {/* Action CTAs Footer */}
          <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-400">
              Bagalkot District Tourism Portal • Verified Geological Data
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  onViewOnMap(destination);
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#1b2436] hover:bg-[#232e44] text-white border border-gray-700 hover:border-amber-400/50 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Locate on District Map</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onPlanTrip(destination);
                }}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 text-xs font-bold shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 transition-all"
              >
                <span>Plan Journey Here</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
