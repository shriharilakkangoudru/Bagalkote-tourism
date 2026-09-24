import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, Clock, ArrowRight, X, ShieldCheck, Info } from 'lucide-react';
import { EVENTS, TourismEvent } from '../data/events';
import { handleImageError } from '../utils/imageUtils';

export const EventsSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TourismEvent | null>(null);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Annual Cultural Calendar</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
          Events & Festivals in Bagalkot
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Experience world-class classical dance against illuminated UNESCO monuments, month-long rural temple fairs, and spiritual confluences across Bagalkot District.
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVENTS.map((event) => (
          <div
            key={event.id}
            className="group bg-[#121927] border border-gray-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            {/* Visual Header */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-900">
              <img
                src={event.image}
                alt={event.name}
                loading="lazy"
                onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121927] via-transparent to-black/40" />

              <div className="absolute top-3.5 left-3.5">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/40">
                  {event.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-amber-300 font-semibold">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {event.month}
                </span>
                <span className="px-2 py-0.5 rounded bg-black/60 text-[11px] text-gray-300">
                  {event.taluk}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div>
                  <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                    {event.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">{event.kannadaName}</p>
                </div>

                <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                  {event.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">{event.timing.split('(')[0]}</span>
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-gray-950 border border-amber-500/30 hover:border-amber-400 text-xs font-bold transition-all flex items-center space-x-1.5"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl my-2 sm:my-auto bg-[#101725] border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 space-y-6 max-h-[94vh] sm:max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-gray-300 hover:text-white border border-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 pr-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {selectedEvent.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                {selectedEvent.name}
              </h3>
              <p className="text-sm text-amber-400 font-medium">{selectedEvent.kannadaName}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#151f31] p-4 rounded-2xl border border-gray-800 text-xs">
              <div>
                <span className="text-gray-400 block">Season / Schedule:</span>
                <strong className="text-white">{selectedEvent.timing}</strong>
              </div>
              <div>
                <span className="text-gray-400 block">Venue & Location:</span>
                <strong className="text-white">{selectedEvent.location}</strong>
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
              <p>{selectedEvent.fullDetails}</p>
            </div>

            <div className="space-y-2 bg-[#131b2a] p-4 rounded-2xl border border-gray-800">
              <span className="text-xs font-bold text-white block">Key Festival Attractions:</span>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {selectedEvent.highlights.map((h, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-amber-300/90 bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/20">
              💡 <strong>Visitor Tip:</strong> {selectedEvent.visitorTips}
            </div>

            <div className="pt-2 text-[11px] text-gray-400">
              Organized by: <strong className="text-gray-300">{selectedEvent.organizedBy}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
