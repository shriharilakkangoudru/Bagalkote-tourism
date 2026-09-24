import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, Calendar, ShieldCheck, Camera, Navigation, ArrowRight, Compass, Sparkles, Car, Train, Plane, Info, Scroll, BookOpen, Layers } from 'lucide-react';
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
  const [activeImage, setActiveImage] = useState<string>(destination ? destination.image : '');

  // Sync activeImage when destination changes
  useEffect(() => {
    if (destination) {
      setActiveImage(destination.image);
    }
  }, [destination]);

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

          {/* Interactive Photo Stage */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
              <img
                src={activeImage}
                alt={destination.name}
                onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-sm text-xs text-gray-300 border border-white/10">
                Historical Era: <strong className="text-amber-300">{destination.historicalEra}</strong>
              </div>
            </div>

            {/* Thumbnail Carousel */}
            {destination.galleryImages && destination.galleryImages.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-1">
                {destination.galleryImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === imgUrl ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20' : 'border-gray-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
                    />
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
