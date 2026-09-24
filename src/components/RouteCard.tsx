import React from 'react';
import { Route, Clock, ArrowRight, Compass, ShieldCheck, MapPin, Navigation } from 'lucide-react';
import { TourismRoute } from '../data/routes';

interface RouteCardProps {
  route: TourismRoute;
  onExploreRoute: (routeId: string) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onExploreRoute }) => {
  return (
    <div className="bg-[#131b28] border border-gray-800 hover:border-amber-500/50 rounded-3xl p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 group">
      <div className="space-y-4">
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span
              className="w-3.5 h-3.5 rounded-full ring-4 ring-white/10"
              style={{ backgroundColor: route.color }}
            />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {route.theme}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-black/50 text-gray-300 border border-gray-750 font-medium">
              {route.highways.join(', ')}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
            {route.name}
          </h3>
          <p className="text-xs text-amber-200/80 font-medium font-serif italic">
            "{route.subtitle}"
          </p>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          {route.description}
        </p>

        {/* Route Stops Sequence */}
        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
            Travel Sequence & Waypoints:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {route.stops.map((stop, idx) => (
              <React.Fragment key={stop.id}>
                <span className="px-2.5 py-1 rounded-lg bg-[#192233] text-gray-200 border border-gray-750 font-medium flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{stop.name.split('(')[0].trim()}</span>
                </span>
                {idx < route.stops.length - 1 && (
                  <span className="text-amber-500 font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        <div className="space-y-1.5 pt-2 border-t border-gray-800/80">
          {route.highlights.slice(0, 2).map((h, i) => (
            <div key={i} className="flex items-start space-x-2 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Metrics & CTA */}
      <div className="pt-4 border-t border-gray-800 flex items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="text-xs text-gray-400">Total Distance</div>
          <div className="text-base font-extrabold text-amber-400">{route.distanceKm} km</div>
        </div>

        <div className="space-y-0.5">
          <div className="text-xs text-gray-400">Drive Time</div>
          <div className="text-xs font-semibold text-gray-200">{route.estimatedDuration.split('(')[0]}</div>
        </div>

        <button
          onClick={() => onExploreRoute(route.id)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 text-xs font-bold shadow-md shadow-amber-500/20 flex items-center space-x-1.5 transition-all group-hover:scale-105"
        >
          <span>Explore Route</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
