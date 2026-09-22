import React, { useState, useMemo } from 'react';
import { Search, Compass, MapPin, Eye, Sparkles, Filter, Clock, Tag } from 'lucide-react';
import { Monument, Language, MonumentCategory } from '../types';
import { MONUMENTS } from '../data/monumentsData';
import { TRANSLATIONS } from '../data/translations';
import { handleImageError } from '../utils/imageUtils';

interface ExploreHeritageProps {
  language: Language;
  onExploreMonument: (monument: Monument) => void;
}

export const ExploreHeritage: React.FC<ExploreHeritageProps> = ({
  language,
  onExploreMonument,
}) => {
  const t = TRANSLATIONS[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<MonumentCategory>('All');

  const categories: MonumentCategory[] = ['All', 'Badami', 'Pattadakal', 'Aihole', 'Temples', 'Caves', 'Museums'];

  const filteredMonuments = useMemo(() => {
    return MONUMENTS.filter((m) => {
      // Category filter
      let matchesCategory = true;
      if (activeCategory === 'Badami') matchesCategory = m.cluster === 'Badami';
      else if (activeCategory === 'Pattadakal') matchesCategory = m.cluster === 'Pattadakal';
      else if (activeCategory === 'Aihole') matchesCategory = m.cluster === 'Aihole';
      else if (activeCategory === 'Temples') matchesCategory = m.category === 'Temples';
      else if (activeCategory === 'Caves') matchesCategory = m.category === 'Caves';
      else if (activeCategory === 'Museums') matchesCategory = m.category === 'Museums';

      // Search term filter
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.kannadaName.toLowerCase().includes(q) ||
        m.hindiName.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.architectureStyle.toLowerCase().includes(q) ||
        m.period.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 text-white">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Curated Monuments Database</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
          Explore Bagalkote Heritage
        </h2>
        <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
          Discover UNESCO World Heritage sites, 6th-century rock-cut caves, and early structural sanctuaries of the Chalukyan dynasty.
        </p>
      </div>

      {/* Search & Category Filter Section */}
      <div className="bg-[#141a27] border border-amber-500/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="monuments-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search monuments, kings, styles..."
              className="w-full bg-[#1b2333] border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <span className="text-xs text-gray-400 font-medium self-end sm:self-center">
            Showing <span className="font-bold text-amber-300">{filteredMonuments.length}</span> monuments
          </span>
        </div>

        {/* Categories as mandated: All, Badami, Pattadakal, Aihole, Temples, Caves, Museums */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                  : 'bg-[#1e2738] text-gray-300 hover:text-white hover:bg-[#253247] border border-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Monuments Grid */}
      {filteredMonuments.length === 0 ? (
        <div className="text-center py-16 bg-[#141a27] border border-gray-800 rounded-2xl p-8">
          <p className="text-gray-400 text-sm">No monuments match your current search filter.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('All');
            }}
            className="mt-3 px-4 py-2 rounded-lg bg-amber-500 text-gray-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMonuments.map((monument) => (
            <div
              key={monument.id}
              id={`monument-card-${monument.id}`}
              onClick={() => onExploreMonument(monument)}
              className="group bg-[#141b28] border border-gray-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image with Cluster Badge */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={monument.image}
                  alt={monument.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => handleImageError(e)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141b28] via-transparent to-transparent" />

                <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-amber-300 text-[11px] font-bold border border-white/10">
                    {monument.cluster}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-gray-200 text-[11px] font-medium border border-white/10">
                    {monument.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-gray-300">
                  <span className="flex items-center space-x-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{monument.period.split('(')[0]}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-1 text-xs text-amber-400 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{monument.location}, Karnataka</span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                    {monument.name}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {monument.shortDescription[language] || monument.shortDescription.en}
                  </p>
                </div>

                {/* Architecture pill */}
                <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400 truncate max-w-[60%]">
                    {monument.architectureStyle}
                  </span>

                  {/* Mandated "Explore" button */}
                  <button
                    id={`btn-explore-${monument.id}`}
                    onClick={() => onExploreMonument(monument)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs shadow flex items-center space-x-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Explore</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
