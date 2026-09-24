import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Camera, Users, Accessibility, Ticket, ChevronLeft, ChevronRight, Play, Pause, Navigation, MessageSquareText, Calendar, Sparkles, Check, Share2, Info, Globe, ExternalLink, Search, Image as ImageIcon } from 'lucide-react';
import { Monument, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { handleImageError, getGoogleLensVerifyUrl, getWikimediaSearchUrl, getGoogleImagesUrl } from '../utils/imageUtils';

interface MonumentDetailsViewProps {
  monument: Monument;
  language: Language;
  onBack: () => void;
  onAskAi: (monument: Monument) => void;
  onAddToTrip: (monument: Monument) => void;
  onViewOnMap: (monument: Monument) => void;
}

export const MonumentDetailsView: React.FC<MonumentDetailsViewProps> = ({
  monument,
  language,
  onBack,
  onAskAi,
  onAddToTrip,
  onViewOnMap,
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'history' | 'architecture' | 'whyVisit' | 'travelInfo' | 'nearby'>('history');
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [slideDuration, setSlideDuration] = useState<number>(5000); // 5000ms or 6000ms
  const [isAutoPlaySlides, setIsAutoPlaySlides] = useState<boolean>(true);
  const [slideProgress, setSlideProgress] = useState<number>(0);

  const monumentPhotos = monument.galleryImages && monument.galleryImages.length > 0
    ? monument.galleryImages
    : [monument.image];

  // Immediately synchronize internal state whenever monument prop changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSlideProgress(0);
    setActiveTab('history');
  }, [monument.id, monument.image]);

  // 5 to 6 seconds auto-slide timer
  useEffect(() => {
    if (!isAutoPlaySlides || monumentPhotos.length <= 1) {
      setSlideProgress(0);
      return;
    }

    const intervalStep = 100;
    const progressIncrement = (intervalStep / slideDuration) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setActiveImageIndex((curr) => (curr + 1) % monumentPhotos.length);
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isAutoPlaySlides, slideDuration, monumentPhotos.length, monument.id]);

  const handleNextPhoto = () => {
    setActiveImageIndex((prev) => (prev + 1) % monumentPhotos.length);
    setSlideProgress(0);
  };

  const handlePrevPhoto = () => {
    setActiveImageIndex((prev) => (prev - 1 + monumentPhotos.length) % monumentPhotos.length);
    setSlideProgress(0);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${monument.coordinates.lat},${monument.coordinates.lng}&destination_place_id=${encodeURIComponent(monument.name)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-white">
      {/* Top back navigation and quick actions */}
      <div className="flex items-center justify-between">
        <button
          id="monument-back-btn"
          onClick={onBack}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 text-sm font-semibold flex items-center space-x-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            id="monument-share-btn"
            onClick={handleShare}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 text-xs font-semibold flex items-center space-x-1.5"
            title="Copy share link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Section with 5-6s Slideshow */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-black select-none">
        <img
          src={monumentPhotos[activeImageIndex] || monument.image}
          alt={`${monument.name} photo ${activeImageIndex + 1}`}
          className="w-full h-80 sm:h-[450px] object-cover transition-transform duration-700"
          onError={(e) => handleImageError(e, monument.image)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d121c] via-[#0d121c]/40 to-transparent pointer-events-none" />

        {/* Top Right Slideshow Controls */}
        {monumentPhotos.length > 1 && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40 shadow-lg">
            <button
              onClick={() => setSlideDuration((d) => (d === 5000 ? 6000 : 5000))}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-colors border border-amber-500/40 cursor-pointer"
              title="Toggle slide interval between 5s and 6s clicks"
            >
              ⏱ {slideDuration / 1000}s clicks
            </button>
            <button
              onClick={() => setIsAutoPlaySlides(!isAutoPlaySlides)}
              className="p-1 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isAutoPlaySlides ? 'Pause Slideshow' : 'Play Slideshow'}
            >
              {isAutoPlaySlides ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        )}

        {/* Manual Prev / Next Click Arrows */}
        {monumentPhotos.length > 1 && (
          <>
            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-amber-500/90 text-white hover:text-gray-950 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer"
              title="Previous Photo click"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-amber-500/90 text-white hover:text-gray-950 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all shadow-lg active:scale-95 cursor-pointer"
              title="Next Photo click"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* 5-6s Progress Bar */}
        {monumentPhotos.length > 1 && isAutoPlaySlides && (
          <div className="absolute top-0 inset-x-0 h-1 bg-black/60 z-20">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(245,158,11,0.8)]"
              style={{ width: `${slideProgress}%` }}
            />
          </div>
        )}

        {/* Thumbnail selector */}
        {monumentPhotos.length > 1 && (
          <div className="absolute bottom-4 right-4 flex space-x-2 z-20 overflow-x-auto max-w-[240px] sm:max-w-xs p-1">
            {monumentPhotos.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setSlideProgress(0);
                }}
                className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/30 ring-2 ring-amber-400/40'
                    : 'border-white/40 opacity-70 hover:opacity-100'
                }`}
                title={`Photo ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => handleImageError(e, monument.image)}
                />
              </button>
            ))}
          </div>
        )}

        {/* Hero Bottom Banner */}
        <div className="absolute bottom-6 left-6 right-6 sm:right-64 z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-500 text-gray-950 text-xs font-extrabold uppercase">
              {monument.cluster} Cluster
            </span>
            <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/20 text-xs text-amber-300 font-semibold">
              {monument.period}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/20 text-xs text-gray-200">
              {monument.dynasty}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
            {monument.name}
          </h1>

          {/* Native Script Subheading (Kannada & Hindi) */}
          <div className="flex flex-wrap items-center gap-3 text-amber-200/90 text-sm sm:text-base font-medium">
            <span>{monument.kannadaName}</span>
            <span>•</span>
            <span>{monument.hindiName}</span>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 flex items-center space-x-1.5 pt-1">
            <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{monument.subLocation}, {monument.district} District, Karnataka</span>
          </p>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="bg-[#151c2a] border border-amber-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300">
          <span className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{monument.suggestedVisitingTime}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Ticket className="w-4 h-4 text-emerald-400" />
            <span>Indian: {monument.entryFee.indian}</span>
          </span>
        </div>

        {/* Mandatory Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="monument-get-directions-btn"
            onClick={handleGetDirections}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs shadow-md flex items-center space-x-1.5 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{t.getDirections}</span>
          </button>

          <button
            id="monument-ask-ai-btn"
            onClick={() => onAskAi(monument)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>{t.askAi}</span>
          </button>

          <button
            id="monument-add-to-trip-btn"
            onClick={() => onAddToTrip(monument)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.addToTrip}</span>
          </button>
        </div>
      </div>

      {/* Grid: Main Information Tabs vs Practical Sidebar Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 cols: Tabbed content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-800 space-x-1 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'history', label: t.historyTab },
              { id: 'architecture', label: t.architectureTab },
              { id: 'whyVisit', label: t.whyVisitTab },
              { id: 'travelInfo', label: t.travelInfoTab },
              { id: 'nearby', label: t.nearbyTab },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`monument-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1a2334] text-amber-300 border-b-2 border-amber-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Panels */}
          <div className="bg-[#151c2a] border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl leading-relaxed">
            {activeTab === 'history' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Historical Chronicles & Royal Inscriptions</span>
                </h3>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  {monument.history[language] || monument.history.en}
                </p>

                {monument.builtBy && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                    <span className="font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      Royal Patronage:
                    </span>
                    <p>{monument.builtBy}</p>
                  </div>
                )}

                <div className="pt-2">
                  <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">
                    Historical Significance
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300">
                    {monument.historicalSignificance}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-serif text-white">
                  Architectural Masterwork & Engineering
                </h3>
                <div className="p-3.5 rounded-xl bg-[#0f141f] border border-gray-800 text-xs">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">Style Classification: </span>
                  <span className="text-amber-300 font-semibold">{monument.architectureStyle}</span>
                </div>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  {monument.architecture[language] || monument.architecture.en}
                </p>

                {/* Interesting Facts */}
                <div className="pt-4 border-t border-gray-800 space-y-2">
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                    Interesting Facts & Curiosities
                  </h4>
                  <ul className="space-y-2">
                    {monument.interestingFacts.map((fact, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-gray-300 flex items-start space-x-2">
                        <span className="text-amber-400 font-bold mt-0.5">✦</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'whyVisit' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-serif text-white">
                  {t.whyVisitTab}
                </h3>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                  {monument.whyVisit[language] || monument.whyVisit.en}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-gray-800">
                    <p className="text-xs font-bold text-amber-400 mb-1">Scenic Backdrop</p>
                    <p className="text-xs text-gray-300">
                      Framed by ancient sandstone bluffs and rivers that glow rich gold during twilight.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-gray-800">
                    <p className="text-xs font-bold text-emerald-400 mb-1">Authentic Heritage</p>
                    <p className="text-xs text-gray-300">
                      Directly preserved by the ASI with authentic 1,300-year-old Sanskrit & Old Kannada lithic epigraphs.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'travelInfo' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold font-serif text-white">
                  Visitor Guide & Logistics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/30 border border-gray-800">
                    <span className="text-xs font-bold text-amber-400 uppercase block mb-1">
                      Distance from Badami Central
                    </span>
                    <p className="text-sm font-semibold text-white">
                      {monument.distanceFromBadamiKm} km ({monument.approxTravelTime})
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/30 border border-gray-800">
                    <span className="text-xs font-bold text-amber-400 uppercase block mb-1">
                      Ticket Prices
                    </span>
                    <p className="text-xs text-gray-300">Indian: {monument.entryFee.indian}</p>
                    <p className="text-xs text-gray-300">Foreign: {monument.entryFee.foreign}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/30 border border-gray-800 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase block">
                    Public Transit Options
                  </span>
                  <p className="text-xs text-gray-300">
                    KSRTC buses depart from Badami Bus Stand every 30 minutes towards Pattadakal & Aihole. Private auto-rickshaws and taxis provide fixed-rate round trips.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'nearby' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-serif text-white">
                  Nearby Attractions & Circuits
                </h3>
                <p className="text-xs text-gray-400">
                  Combine this visit with other landmarks within easy walking or driving distance:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {monument.nearbyAttractions.map((att, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-black/40 border border-gray-800 flex items-center justify-between"
                    >
                      <span className="text-xs font-medium text-gray-200">{att}</span>
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 4 cols: Detailed Specifications Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#151c2a] border border-amber-500/30 rounded-2xl p-6 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <Info className="w-4 h-4" />
              <span>Monument Specifications</span>
            </h3>

            {/* 1. Location */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-gray-400 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.locationLabel}</span>
              </div>
              <p className="text-xs text-gray-200 pl-5">{monument.subLocation}</p>
            </div>

            {/* 2. Suggested visiting time */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-gray-400 font-semibold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.visitingTimeLabel}</span>
              </div>
              <p className="text-xs text-gray-200 pl-5">{monument.suggestedVisitingTime}</p>
            </div>

            {/* 3. Photography tips */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-gray-400 font-semibold">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.photographyTipsLabel}</span>
              </div>
              <p className="text-xs text-amber-200/90 pl-5 leading-relaxed bg-amber-500/5 p-2 rounded-lg border border-amber-500/20">
                {monument.photographyTips}
              </p>
            </div>

            {/* 4. Family friendly */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-gray-400 font-semibold">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.familyFriendlyLabel}</span>
              </div>
              <p className="text-xs text-gray-200 pl-5">
                {monument.familyFriendly ? 'Yes — ' : 'Moderate stairs — '} {monument.familyFriendlyNote}
              </p>
            </div>

            {/* 5. Accessibility information */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-xs text-gray-400 font-semibold">
                <Accessibility className="w-3.5 h-3.5 text-sky-400" />
                <span>{t.accessibilityLabel}</span>
              </div>
              <p className="text-xs text-gray-200 pl-5">{monument.accessibility}</p>
            </div>

            {/* 6. Internet Verification & Open Web Links */}
            <div className="pt-3 border-t border-gray-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400 flex items-center space-x-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Internet Research Links</span>
                </span>
                <span className="text-[10px] text-gray-500">Live web</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={getGoogleLensVerifyUrl(monument.name, monument.image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-black/40 hover:bg-black/70 border border-gray-800 hover:border-amber-400/50 text-[11px] text-gray-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center space-x-1">
                    <Search className="w-3 h-3 text-amber-400" />
                    <span>Google Lens</span>
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                </a>

                <a
                  href={getWikimediaSearchUrl(monument.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-black/40 hover:bg-black/70 border border-gray-800 hover:border-amber-400/50 text-[11px] text-gray-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center space-x-1">
                    <Globe className="w-3 h-3 text-blue-400" />
                    <span>Wikimedia</span>
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 text-gray-500" />
                </a>
              </div>
            </div>

            {/* Bottom action button */}
            <div className="pt-2">
              <button
                id="sidebar-ask-ai-prompt"
                onClick={() => onAskAi(monument)}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-colors shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                <span>Ask AI Heritage Guide about this</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
