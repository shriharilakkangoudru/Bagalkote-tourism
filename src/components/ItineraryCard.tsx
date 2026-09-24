import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, ArrowRight, Utensils, Bed, Compass, Sparkles } from 'lucide-react';
import { CuratedItinerary } from '../data/itineraries';

interface ItineraryCardProps {
  itinerary: CuratedItinerary;
  onSelectRoute?: (routeId: string) => void;
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({ itinerary, onSelectRoute }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0);

  const activeDay = itinerary.days[activeDayIndex] || itinerary.days[0];

  return (
    <div className="bg-[#121927] border border-gray-800 hover:border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300 space-y-6">
      {/* Top Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
            {itinerary.badge}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-300 border border-gray-700">
            {itinerary.duration}
          </span>
        </div>

        <div className="text-xs text-gray-400">
          Est. Budget: <strong className="text-amber-300">{itinerary.estimatedBudgetPerPerson}</strong>
        </div>
      </div>

      {/* Title & Tagline */}
      <div className="space-y-1">
        <h3 className="text-2xl font-bold font-serif text-white">
          {itinerary.title}
        </h3>
        <p className="text-xs sm:text-sm text-amber-400 font-medium">
          {itinerary.kannadaTitle}
        </p>
        <p className="text-xs text-gray-300 italic pt-1">
          "{itinerary.tagline}"
        </p>
      </div>

      {/* Travel Sequence Chain */}
      <div className="space-y-2 bg-[#172133] p-4 rounded-2xl border border-gray-750">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
          Travel Sequence:
        </span>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {itinerary.travelSequence.map((step, idx) => (
            <React.Fragment key={idx}>
              <span className="px-2.5 py-1 rounded-lg bg-[#111723] text-gray-200 border border-gray-700 font-medium flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{step}</span>
              </span>
              {idx < itinerary.travelSequence.length - 1 && (
                <span className="text-amber-500 font-bold">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Day Selector (for multi-day trips) */}
      {itinerary.days.length > 1 && (
        <div className="flex items-center space-x-2 border-b border-gray-800 pb-3">
          <span className="text-xs text-gray-400 font-semibold mr-2">Select Day:</span>
          {itinerary.days.map((day, idx) => (
            <button
              key={day.dayNumber}
              onClick={() => setActiveDayIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeDayIndex === idx
                  ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                  : 'bg-[#1b2537] text-gray-300 hover:text-white border border-gray-700'
              }`}
            >
              Day {day.dayNumber}
            </button>
          ))}
        </div>
      )}

      {/* Day Timeline Breakdown: Morning / Afternoon / Evening */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Day {activeDay.dayNumber}: {activeDay.title}</span>
          </h4>
          <span className="text-[11px] text-amber-300 font-medium">{activeDay.theme}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Morning */}
          <div className="bg-[#141d2e] border border-gray-800 p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span>🌅 Morning</span>
              <span className="text-[10px] text-gray-400">{activeDay.morning.time}</span>
            </div>
            <strong className="text-white block">{activeDay.morning.location}</strong>
            <p className="text-gray-300 leading-relaxed text-[11px]">{activeDay.morning.activity}</p>
            <div className="text-[10px] text-amber-300/80 italic pt-1">
              Tip: {activeDay.morning.notes}
            </div>
          </div>

          {/* Afternoon */}
          <div className="bg-[#141d2e] border border-gray-800 p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span>☀️ Afternoon</span>
              <span className="text-[10px] text-gray-400">{activeDay.afternoon.time}</span>
            </div>
            <strong className="text-white block">{activeDay.afternoon.location}</strong>
            <p className="text-gray-300 leading-relaxed text-[11px]">{activeDay.afternoon.activity}</p>
            <div className="text-[10px] text-amber-300/80 italic pt-1">
              Tip: {activeDay.afternoon.notes}
            </div>
          </div>

          {/* Evening */}
          <div className="bg-[#141d2e] border border-gray-800 p-4 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span>🌇 Evening</span>
              <span className="text-[10px] text-gray-400">{activeDay.evening.time}</span>
            </div>
            <strong className="text-white block">{activeDay.evening.location}</strong>
            <p className="text-gray-300 leading-relaxed text-[11px]">{activeDay.evening.activity}</p>
            <div className="text-[10px] text-amber-300/80 italic pt-1">
              Tip: {activeDay.evening.notes}
            </div>
          </div>
        </div>

        {/* Meal & Stay Recommendation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="flex items-start space-x-2.5 bg-[#172235] p-3 rounded-xl border border-gray-750">
            <Utensils className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-gray-400 font-medium block">Regional Food Recommendation:</span>
              <span className="text-gray-200">{activeDay.foodRecommendation}</span>
            </div>
          </div>

          <div className="flex items-start space-x-2.5 bg-[#172235] p-3 rounded-xl border border-gray-750">
            <Bed className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-gray-400 font-medium block">Recommended Accommodation:</span>
              <span className="text-gray-200">{activeDay.stayRecommendation}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Packing Tips */}
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1.5 focus:outline-none"
        >
          <span>{isExpanded ? 'Hide Packing & Local Tips' : 'View Essential Packing Tips'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {isExpanded && (
          <div className="mt-3 p-4 bg-[#151e30] border border-gray-800 rounded-2xl space-y-2 text-xs text-gray-300 animate-in fade-in duration-200">
            <span className="font-bold text-white block">Travel Packing Recommendations:</span>
            <ul className="space-y-1 list-disc list-inside">
              {itinerary.packingTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
