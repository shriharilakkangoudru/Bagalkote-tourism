import React from 'react';
import { Landmark, Sparkles, Mountain, Camera, Users, Shirt, UtensilsCrossed, Compass, ArrowRight, MapPin } from 'lucide-react';
import { ExperienceCategory } from '../data/experiences';
import { handleImageError } from '../utils/imageUtils';

interface ExperienceCardProps {
  experience: ExperienceCategory;
  onExploreCategory?: (category: ExperienceCategory) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onExploreCategory }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Mountain':
        return <Mountain className="w-5 h-5 text-amber-400" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-amber-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-amber-400" />;
      case 'Shirt':
        return <Shirt className="w-5 h-5 text-amber-400" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-amber-400" />;
      default:
        return <Compass className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="group bg-[#121926] border border-gray-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Visual Image Header */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-900">
        <img
          src={experience.image}
          alt={experience.title}
          loading="lazy"
          onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121926] via-transparent to-black/50" />

        <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-black/70 backdrop-blur-md border border-white/20">
          {getIcon(experience.iconName)}
        </div>

        <div className="absolute bottom-3 left-4 right-4">
          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
            {experience.bestSeason}
          </span>
          <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
            {experience.title}
          </h3>
          <p className="text-xs text-gray-300">
            {experience.kannadaTitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <p className="text-xs text-gray-300 leading-relaxed">
            {experience.description}
          </p>

          {/* Destinations covered */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Prime Destinations:
            </span>
            <div className="flex flex-wrap gap-1">
              {experience.destinationsCovered.map((dest, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-[#182233] text-[11px] text-amber-200/90 border border-gray-750"
                >
                  {dest}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-1 pt-2 border-t border-gray-800/80">
            {experience.keyActivities.slice(0, 2).map((act, idx) => (
              <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                <span className="line-clamp-1">{act}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Practical tips */}
        <div className="pt-3 border-t border-gray-800 text-[11px] text-amber-300/80 italic">
          💡 {experience.practicalTips}
        </div>
      </div>
    </div>
  );
};
