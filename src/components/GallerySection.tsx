import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  Camera,
  X,
  ZoomIn,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Timer,
  Sliders,
  Grid,
  Maximize2
} from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import { handleImageError } from '../utils/imageUtils';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Featured Slideshow state
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [slideSeconds, setSlideSeconds] = useState<5 | 6>(5);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [slideProgress, setSlideProgress] = useState<number>(0);

  // Lightbox auto-play state
  const [lightboxAutoPlay, setLightboxAutoPlay] = useState<boolean>(false);
  const [lightboxProgress, setLightboxProgress] = useState<number>(0);

  const categories = ['All', 'Badami', 'Pattadakal', 'Aihole', 'Rivers & Confluence', 'Culture & Handlooms'];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const totalFiltered = filteredItems.length;

  // Make sure activeSlideIndex is within bounds when category changes
  useEffect(() => {
    setActiveSlideIndex(0);
    setSlideProgress(0);
  }, [selectedCategory]);

  const handleNextSlide = useCallback(() => {
    if (totalFiltered === 0) return;
    setActiveSlideIndex((prev) => (prev + 1) % totalFiltered);
    setSlideProgress(0);
  }, [totalFiltered]);

  const handlePrevSlide = useCallback(() => {
    if (totalFiltered === 0) return;
    setActiveSlideIndex((prev) => (prev - 1 + totalFiltered) % totalFiltered);
    setSlideProgress(0);
  }, [totalFiltered]);

  const handleSelectSlide = (idx: number) => {
    setActiveSlideIndex(idx);
    setSlideProgress(0);
  };

  // Main Featured Slideshow Auto-Play Timer (5 or 6 seconds)
  useEffect(() => {
    if (!isAutoPlaying || totalFiltered <= 1) {
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
      handleNextSlide();
    }, durationMs);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(autoTimer);
    };
  }, [activeSlideIndex, slideSeconds, isAutoPlaying, totalFiltered, handleNextSlide]);

  // Lightbox Keyboard and Auto-Play navigation
  const handleNextLightbox = useCallback(() => {
    if (lightboxIndex === null || totalFiltered === 0) return;
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % totalFiltered));
    setLightboxProgress(0);
  }, [lightboxIndex, totalFiltered]);

  const handlePrevLightbox = useCallback(() => {
    if (lightboxIndex === null || totalFiltered === 0) return;
    setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + totalFiltered) % totalFiltered));
    setLightboxProgress(0);
  }, [lightboxIndex, totalFiltered]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextLightbox();
      if (e.key === 'ArrowLeft') handlePrevLightbox();
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNextLightbox, handlePrevLightbox]);

  // Lightbox 5-6s auto-slide timer
  useEffect(() => {
    if (lightboxIndex === null || !lightboxAutoPlay || totalFiltered <= 1) {
      setLightboxProgress(0);
      return;
    }

    const durationMs = slideSeconds * 1000;
    const intervalStep = 50;
    setLightboxProgress(0);

    const startTime = Date.now();
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setLightboxProgress(pct);
    }, intervalStep);

    const autoTimer = setTimeout(() => {
      handleNextLightbox();
    }, durationMs);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(autoTimer);
    };
  }, [lightboxIndex, lightboxAutoPlay, slideSeconds, totalFiltered, handleNextLightbox]);

  const currentSlideItem = filteredItems[activeSlideIndex] || filteredItems[0];
  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>Visual Heritage Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
          Bagalkot District Gallery
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          High-resolution photography capturing sixth-century monolithic carvings, UNESCO World Heritage temples, sacred waters, and living artisan communities.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/25 scale-105'
                  : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* FEATURED AUTO-PLAYING PHOTO SLIDESHOW (5 or 6 seconds clicks) */}
      {currentSlideItem && (
        <div className="bg-[#0e1422] border-2 border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-3 p-3 sm:p-5">
          {/* Slideshow Top Controls Bar */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Featured Slideshow</span>
              </span>
              <span className="text-xs text-gray-400 font-mono hidden sm:inline">
                Photo {activeSlideIndex + 1} of {totalFiltered}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* 5s or 6s Click Speed Toggle */}
              <button
                type="button"
                onClick={() => setSlideSeconds((prev) => (prev === 5 ? 6 : 5))}
                className="px-2.5 py-1 rounded-xl bg-[#161f30] hover:bg-amber-500/20 border border-amber-400/40 text-amber-300 hover:text-white text-xs font-bold transition-all flex items-center space-x-1 shadow-sm cursor-pointer"
                title="Click to toggle between 5s and 6s auto-slide"
              >
                <Timer className="w-3.5 h-3.5 text-amber-400" />
                <span>{slideSeconds}s clicks</span>
              </button>

              {/* Play / Pause Toggle */}
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-3 py-1 rounded-xl bg-[#161f30] hover:bg-white/10 border border-gray-700 text-gray-200 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                title={isAutoPlaying ? 'Pause Slideshow' : `Resume Auto-Slide (${slideSeconds}s)`}
              >
                {isAutoPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Play</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Slide Stage */}
          <div className="relative h-72 sm:h-96 md:h-[460px] w-full rounded-2xl overflow-hidden bg-black group border border-gray-800">
            <img
              key={currentSlideItem.id}
              src={currentSlideItem.imageUrl}
              alt={currentSlideItem.title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
              onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/30 pointer-events-none" />

            {/* Click Left (Previous Slide) */}
            <button
              type="button"
              onClick={handlePrevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-amber-500 hover:text-gray-950 border border-white/20 hover:border-amber-400 text-white flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Click Right (Next Slide) */}
            <button
              type="button"
              onClick={handleNextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-amber-500 hover:text-gray-950 border border-white/20 hover:border-amber-400 text-white flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Top Tag Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md bg-black/75 text-amber-300 border border-amber-500/40">
                {currentSlideItem.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-black/75 text-gray-200 border border-white/20">
                {currentSlideItem.era}
              </span>
            </div>

            {/* Fullscreen Zoom trigger */}
            <button
              type="button"
              onClick={() => setLightboxIndex(activeSlideIndex)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-amber-500 hover:text-gray-950 text-white border border-white/20 transition-all cursor-pointer shadow-lg"
              title="Open Fullscreen View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-2xl bg-[#0f1624]/90 backdrop-blur-md border border-gray-700/80 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base sm:text-xl font-bold font-serif text-white">
                  {currentSlideItem.title}
                </h3>
                <span className="text-xs text-amber-400/90 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{currentSlideItem.location}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed">
                {currentSlideItem.caption}
              </p>
            </div>
          </div>

          {/* 5-6s Progress Bar */}
          <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(245,158,11,0.8)]"
              style={{ width: `${isAutoPlaying ? slideProgress : 0}%` }}
            />
          </div>

          {/* Clickable Thumbnail Carousel Bar */}
          <div className="flex items-center space-x-2.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {filteredItems.map((item, idx) => {
              const isSelected = activeSlideIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectSlide(idx)}
                  className={`relative w-20 sm:w-24 h-14 sm:h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-400 scale-105 shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/50'
                      : 'border-gray-800 opacity-60 hover:opacity-100 hover:border-gray-600'
                  }`}
                  title={`Click to slide to: ${item.title}`}
                >
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => handleImageError(e, item.imageUrl)}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono px-1 py-0.2 rounded bg-black/80 text-white font-bold">
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Grid Sub-Header */}
      <div className="flex items-center justify-between border-t border-gray-800 pt-6">
        <div className="flex items-center space-x-2">
          <Grid className="w-4 h-4 text-amber-400" />
          <h3 className="text-lg font-bold font-serif text-white">All Curated Photographs ({totalFiltered})</h3>
        </div>
        <span className="text-xs text-gray-400">Click any photograph to view high-definition slides</span>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative bg-[#121927] rounded-3xl overflow-hidden border border-gray-800 hover:border-amber-500/50 shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-gray-900">
              <img
                src={item.thumbnailUrl}
                alt={item.title}
                loading="lazy"
                onError={(e) => handleImageError(e, item.imageUrl)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

            {/* Tag Badge */}
            <div className="absolute top-3.5 left-3.5">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md bg-black/60 text-amber-300 border border-amber-500/30">
                {item.category}
              </span>
            </div>

            <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4 text-amber-400" />
            </div>

            {/* Bottom Caption Info */}
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <span className="text-[10px] text-amber-400 font-semibold">{item.era}</span>
              <h4 className="text-sm sm:text-base font-bold font-serif text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                {item.title}
              </h4>
              <p className="text-xs text-gray-300 line-clamp-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{item.location}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Slides & 5-6s Clicks */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-start sm:items-center justify-center p-2 sm:p-6 md:p-8 overflow-y-auto animate-in fade-in duration-200">
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 text-gray-200 hover:text-white border border-white/20 flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Lightbox Slide Box */}
          <div className="max-w-4xl w-full my-2 sm:my-auto max-h-[94vh] sm:max-h-[90vh] flex flex-col bg-[#121927] rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl relative">
            {/* Image Stage */}
            <div className="relative flex-1 min-h-[40vh] max-h-[58vh] sm:max-h-[64vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={currentLightboxItem.imageUrl}
                alt={currentLightboxItem.title}
                className="w-full h-full object-contain"
                onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
              />

              {/* Prev Slide Click Arrow */}
              <button
                type="button"
                onClick={handlePrevLightbox}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-amber-500 hover:text-gray-950 border border-white/20 text-white flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Slide Click Arrow */}
              <button
                type="button"
                onClick={handleNextLightbox}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-amber-500 hover:text-gray-950 border border-white/20 text-white flex items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-110 shadow-xl cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Auto-play Toggle in Top Bar */}
              <div className="absolute top-3 left-3 z-20 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setLightboxAutoPlay(!lightboxAutoPlay)}
                  className={`px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold border flex items-center space-x-1.5 transition-all cursor-pointer ${
                    lightboxAutoPlay
                      ? 'bg-amber-500 text-gray-950 border-amber-400'
                      : 'bg-black/70 text-gray-200 border-white/20 hover:text-white'
                  }`}
                  title="Toggle 5-6s auto-slide in full view"
                >
                  {lightboxAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{lightboxAutoPlay ? `Auto (${slideSeconds}s)` : 'Slideshow'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSlideSeconds((prev) => (prev === 5 ? 6 : 5))}
                  className="px-2 py-1 rounded-full bg-black/70 border border-white/20 text-[10px] font-bold text-amber-300 hover:text-white transition-colors cursor-pointer"
                  title="Change slide speed between 5s and 6s"
                >
                  {slideSeconds}s
                </button>
              </div>
            </div>

            {/* Lightbox Progress Bar */}
            {lightboxAutoPlay && (
              <div className="h-1 w-full bg-gray-800">
                <div
                  className="h-full bg-amber-400 transition-all duration-75 ease-linear"
                  style={{ width: `${lightboxProgress}%` }}
                />
              </div>
            )}

            {/* Lightbox Caption & Info */}
            <div className="p-4 sm:p-6 bg-[#121927] border-t border-gray-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
                  {currentLightboxItem.title}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {currentLightboxItem.category} • {currentLightboxItem.era}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">{currentLightboxItem.caption}</p>
              <div className="flex items-center justify-between text-xs text-amber-400/80 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Location: {currentLightboxItem.location}
                </span>
                <span className="font-mono text-gray-400">
                  {lightboxIndex + 1} / {totalFiltered}
                </span>
              </div>

              {/* Lightbox Thumbnails Strip */}
              <div className="flex items-center space-x-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
                {filteredItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setLightboxProgress(0);
                    }}
                    className={`relative w-16 h-11 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      lightboxIndex === idx ? 'border-amber-400 scale-105' : 'border-gray-800 opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e, item.imageUrl)}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

