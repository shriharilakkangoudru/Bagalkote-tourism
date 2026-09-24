import React, { useState } from 'react';
import { Bus, Train, Plane, Calendar, ShieldCheck, HelpCircle, Navigation, Clock, CheckCircle2, AlertTriangle, PhoneCall } from 'lucide-react';
import { TRANSPORT_OPTIONS, SEASONS, TRAVEL_TIPS } from '../data/travelGuide';

export const TravelGuideSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transport' | 'seasons' | 'tips'>('transport');

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Navigation className="w-3.5 h-3.5 text-amber-400" />
          <span>Practical Traveler Handbook</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
          Bagalkot Travel Guide
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Everything you need to plan a smooth journey: road connections, direct trains, airport distances, seasonal weather windows, and safety protocols.
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => setActiveTab('transport')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'transport'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <Bus className="w-4 h-4" />
          <span>How to Reach & Transit</span>
        </button>

        <button
          onClick={() => setActiveTab('seasons')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'seasons'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Best Time to Visit</span>
        </button>

        <button
          onClick={() => setActiveTab('tips')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'tips'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Travel & Safety Tips</span>
        </button>
      </div>

      {/* TAB 1: TRANSPORT & TRANSIT */}
      {activeTab === 'transport' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TRANSPORT_OPTIONS.map((opt) => (
              <div
                key={opt.mode}
                className="bg-[#121927] border border-gray-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                      {opt.mode === 'Road' && <Bus className="w-6 h-6" />}
                      {opt.mode === 'Rail' && <Train className="w-6 h-6" />}
                      {opt.mode === 'Air' && <Plane className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-serif text-white">{opt.title}</h3>
                      <p className="text-xs text-amber-400">{opt.kannadaTitle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {opt.summary}
                  </p>

                  <div className="space-y-2 pt-2">
                    {opt.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Major Connecting Cities */}
                <div className="pt-4 border-t border-gray-800 space-y-2">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                    Key Route Connections:
                  </span>
                  <div className="space-y-2 text-xs">
                    {opt.keyRoutes.map((route, i) => (
                      <div key={i} className="bg-[#172133] p-2.5 rounded-xl border border-gray-750">
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>{route.origin}</span>
                          <span className="text-amber-300 text-[11px]">{route.distance} • {route.duration}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5">{route.modeDescription}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Local Transportation Box */}
          <div className="bg-[#141d2d] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-400" />
              <span>Local Transportation in Bagalkot & Badami</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300">
              <div className="p-4 rounded-2xl bg-[#182338] border border-gray-750 space-y-1.5">
                <strong className="text-white text-sm block">KSRTC Rural Buses</strong>
                <p className="leading-relaxed">
                  Regular red KSRTC transit buses depart every 30 to 45 minutes between Badami, Pattadakal (₹25), Aihole (₹40), and Bagalkot (₹45).
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#182338] border border-gray-750 space-y-1.5">
                <strong className="text-white text-sm block">Auto-Rickshaws & Taxis</strong>
                <p className="leading-relaxed">
                  Available in abundance at Badami station, bus stand, and Navanagar. Negotiate a full-day tour fare (approx ₹1,200 – ₹1,800 for auto / ₹2,500 – ₹3,200 for AC taxi).
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#182338] border border-gray-750 space-y-1.5">
                <strong className="text-white text-sm block">Bicycle & Walking</strong>
                <p className="leading-relaxed">
                  Badami town center, Agastya Lake, and the cave temples are within pleasant walking or cycling distance during cool mornings and late afternoons.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BEST SEASONS */}
      {activeTab === 'seasons' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SEASONS.map((season, idx) => (
            <div
              key={idx}
              className="bg-[#121927] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {season.rating}
                  </span>
                  <span className="text-xs text-gray-400 font-bold">{season.temperature}</span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-white">{season.season}</h3>
                <p className="text-xs text-amber-400 font-semibold">{season.months}</p>

                <p className="text-xs text-gray-300 leading-relaxed">{season.description}</p>

                <div className="space-y-1.5 pt-2 border-t border-gray-800">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    What to Expect:
                  </span>
                  {season.whatToExpect.map((exp, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{exp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 text-xs text-gray-400">
                👔 <strong>Clothing Advice:</strong> {season.clothing}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: TRAVEL & SAFETY TIPS */}
      {activeTab === 'tips' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TRAVEL_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="bg-[#121927] border border-gray-800 p-6 rounded-3xl space-y-2.5 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-0.5 rounded-md bg-amber-500/15 text-amber-300 text-[11px] font-bold uppercase border border-amber-500/30">
                  {tip.category}
                </span>
              </div>
              <h4 className="text-base font-bold font-serif text-white">{tip.title}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{tip.tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
