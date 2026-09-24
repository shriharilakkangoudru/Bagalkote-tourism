import React, { useState, useMemo } from 'react';
import { Search, Filter, Compass, Landmark, Sparkles, MapPin } from 'lucide-react';
import { DESTINATIONS, Destination } from '../data/destinations';
import { DestinationCard } from './DestinationCard';

interface DestinationGridProps {
  onSelectDestination: (dest: Destination) => void;
  onViewOnMap?: (dest: Destination) => void;
  initialCategory?: string;
}

export const DestinationGrid: React.FC<DestinationGridProps> = ({
  onSelectDestination,
  onViewOnMap,
  initialCategory = 'All'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTaluk, setSelectedTaluk] = useState<string>('All');

  const categories = [
    'All',
    'UNESCO Heritage',
    'Rock-Cut Caves',
    'Ancient Temples',
    'Confluence & Sacred',
    'Dams & Nature',
    'Crafts & Culture'
  ];

  const taluks = ['All', 'Badami', 'Hungund', 'Bagalkot', 'Bilgi', 'Mudhol', 'Jamkhandi', 'Guledgudda'];

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      const matchCategory = selectedCategory === 'All' || d.category === selectedCategory;
      const matchTaluk = selectedTaluk === 'All' || d.taluk.toLowerCase().includes(selectedTaluk.toLowerCase());
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.kannadaName.toLowerCase().includes(q) ||
        (d.hindiName && d.hindiName.toLowerCase().includes(q)) ||
        d.shortDescription.toLowerCase().includes(q) ||
        d.taluk.toLowerCase().includes(q) ||
        d.keyHighlights.some((h) => h.toLowerCase().includes(q));

      return matchCategory && matchTaluk && matchSearch;
    });
  }, [selectedCategory, selectedTaluk, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Header & Subtitle */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Landmark className="w-3.5 h-3.5 text-amber-400" />
          <span>Bagalkot District Tourism Directory</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
          Explore Destinations in Bagalkot
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          From ancient 6th-century rock-cut capitals and UNESCO World Heritage sanctuaries to sacred river confluences and vibrant handloom capitals.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#121927] border border-gray-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Badami, Pattadakal, Aihole, Almatti, Ilkal..."
              className="w-full bg-[#0d131f] border border-gray-700 focus:border-amber-400 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Taluk Filter Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Taluk:
            </span>
            <select
              value={selectedTaluk}
              onChange={(e) => setSelectedTaluk(e.target.value)}
              className="bg-[#0d131f] border border-gray-700 text-xs sm:text-sm text-white rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400"
            >
              {taluks.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Taluks (8)' : `${t} Taluk`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-[#182133] text-gray-300 hover:text-white hover:bg-[#1f2b42] border border-gray-750'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count Notification */}
      <div className="flex items-center justify-between text-xs text-gray-400 px-2">
        <span>
          Showing <strong className="text-amber-300">{filteredDestinations.length}</strong> tourism destination{filteredDestinations.length !== 1 ? 's' : ''} in Bagalkot District
        </span>
        {(selectedCategory !== 'All' || selectedTaluk !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedTaluk('All');
              setSearchQuery('');
            }}
            className="text-amber-400 hover:text-amber-300 underline font-medium"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {filteredDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onExplore={onSelectDestination}
              onViewOnMap={onViewOnMap}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#121825] border border-gray-800 rounded-3xl p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-serif text-white">No destinations found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            Try adjusting your search keywords or switching category filters to discover destinations across Bagalkot District.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedTaluk('All');
              setSearchQuery('');
            }}
            className="px-5 py-2 rounded-xl bg-amber-500 text-gray-950 font-bold text-xs"
          >
            Show All Destinations
          </button>
        </div>
      )}
    </div>
  );
};
