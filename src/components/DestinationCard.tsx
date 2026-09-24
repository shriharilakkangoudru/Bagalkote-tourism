import React from 'react';
import { MapPin, ArrowRight, Star, Clock, Compass } from 'lucide-react';
import { Destination } from '../data/destinations';
import { handleImageError } from '../utils/imageUtils';

interface DestinationCardProps {
  destination: Destination;
  onExplore: (dest: Destination) => void;
  onViewOnMap?: (dest: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onExplore,
  onViewOnMap
}) => {
  return (
    <div className="group bg-[#131a27] border border-gray-800 hover:border-amber-500/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Thumbnail Stage */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-900">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131a27] via-transparent to-black/40" />

        {/* Category Pill */}
        <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase backdrop-blur-md bg-black/60 text-amber-300 border border-amber-500/40 shadow-sm">
            {destination.category}
          </span>
          {destination.id === 'pattadakal' && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-amber-500 text-gray-950 shadow">
              UNESCO Site
            </span>
          )}
        </div>

        {/* Distance Badge */}
        <div className="absolute top-3.5 right-3.5 flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-md bg-black/60 text-gray-200 border border-white/10">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>{destination.distanceFromBagalkotKm === 0 ? 'HQ City' : `${destination.distanceFromBagalkotKm} km from Bagalkot`}</span>
        </div>

        {/* Rating and Reviews */}
        <div className="absolute bottom-3 left-4 flex items-center space-x-1.5 text-xs text-amber-300 font-semibold">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{destination.rating}</span>
          <span className="text-gray-400 text-[11px]">({destination.reviewsCount} reviews)</span>
        </div>
      </div>

      {/* Content Stage */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              {destination.taluk} Taluk
            </span>
            <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
              {destination.name}
            </h3>
            <p className="text-xs text-amber-200/80 font-medium">
              {destination.kannadaName}
            </p>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
            {destination.shortDescription}
          </p>

          {/* Bullet Key Highlights */}
          <div className="pt-2 space-y-1">
            {destination.keyHighlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between gap-2">
          {onViewOnMap && (
            <button
              onClick={() => onViewOnMap(destination)}
              className="text-xs text-gray-400 hover:text-amber-300 flex items-center space-x-1 py-1 px-2 rounded-lg hover:bg-white/5 transition-colors"
              title="View on Bagalkot Route Map"
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Map</span>
            </button>
          )}

          <button
            onClick={() => onExplore(destination)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500 hover:to-amber-600 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-gray-950 text-xs font-bold transition-all duration-200 flex items-center justify-center space-x-1.5 shadow-sm group/btn"
          >
            <span>Explore Destination</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
