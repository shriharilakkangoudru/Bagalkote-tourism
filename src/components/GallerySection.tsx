import React, { useState, useMemo } from 'react';
import { Camera, X, ZoomIn, MapPin, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import { handleImageError } from '../utils/imageUtils';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Badami', 'Pattadakal', 'Aihole', 'Rivers & Confluence', 'Culture & Handlooms'];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

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
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
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

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
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

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-start sm:items-center justify-center p-2 sm:p-6 md:p-8 overflow-y-auto animate-in fade-in duration-200">
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-50 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/70 text-gray-200 hover:text-white border border-white/20 flex items-center justify-center transition-colors shadow-lg"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="max-w-4xl w-full my-2 sm:my-auto max-h-[94vh] sm:max-h-[90vh] flex flex-col bg-[#121927] rounded-2xl sm:rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl">
            <div className="relative flex-1 max-h-[60vh] sm:max-h-[68vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="w-full h-full object-contain"
                onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
              />
            </div>

            <div className="p-6 bg-[#121927] border-t border-gray-800 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold font-serif text-white">
                  {lightboxItem.title}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {lightboxItem.category} • {lightboxItem.era}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300">{lightboxItem.caption}</p>
              <p className="text-xs text-amber-400/80 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Location: {lightboxItem.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
