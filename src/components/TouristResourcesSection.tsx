import React, { useState } from 'react';
import { Bed, PhoneCall, ShieldAlert, Navigation, HelpCircle, Star, CheckCircle2, ExternalLink } from 'lucide-react';
import { TOURIST_STAYS, EMERGENCY_CONTACTS, TOURIST_FACILITIES } from '../data/touristResources';

export const TouristResourcesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stays' | 'emergency' | 'facilities'>('stays');

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>District Tourist Helplines & Resources</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
          Tourist Resources & Support
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Verified heritage accommodations, certified ASI tourist guide counters, KSRTC transit offices, and verified 24x7 emergency helplines for Bagalkot District.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => setActiveTab('stays')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'stays'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <Bed className="w-4 h-4" />
          <span>Accommodations & Stays</span>
        </button>

        <button
          onClick={() => setActiveTab('emergency')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'emergency'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>Verified Emergency Helplines</span>
        </button>

        <button
          onClick={() => setActiveTab('facilities')}
          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'facilities'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Information & Guide Counters</span>
        </button>
      </div>

      {/* TAB 1: ACCOMMODATIONS */}
      {activeTab === 'stays' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOURIST_STAYS.map((stay) => (
            <div
              key={stay.id}
              className="bg-[#121927] border border-gray-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {stay.type}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{stay.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-serif text-white">{stay.name}</h3>
                <p className="text-xs text-gray-400">{stay.location}</p>

                <div className="space-y-1.5 pt-2 border-t border-gray-800">
                  {stay.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1 pt-2">
                  {stay.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#182335] text-[10px] text-gray-300 border border-gray-700"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Tariff Estimate:</span>
                  <strong className="text-amber-400">{stay.priceRange}</strong>
                </div>
                <div className="text-[11px] text-gray-300 bg-[#162031] p-2.5 rounded-xl border border-gray-750">
                  📞 Contact: <strong className="text-white">{stay.phone}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: EMERGENCY CONTACTS */}
      {activeTab === 'emergency' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EMERGENCY_CONTACTS.map((em, idx) => (
            <div
              key={idx}
              className="bg-[#121927] border border-gray-800 rounded-3xl p-6 space-y-3 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider block">
                  {em.department}
                </span>
                <h3 className="text-xl font-bold font-serif text-white">{em.service}</h3>
                <p className="text-xs text-gray-300">{em.notes}</p>
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">{em.availability}</span>
                  <a
                    href={`tel:${em.number.split('/')[0].trim()}`}
                    className="text-lg font-extrabold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    {em.number}
                  </a>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: FACILITIES & GUIDES */}
      {activeTab === 'facilities' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOURIST_FACILITIES.map((fac, idx) => (
            <div
              key={idx}
              className="bg-[#121927] border border-gray-800 rounded-3xl p-6 space-y-3 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {fac.category}
                </span>
                <h3 className="text-lg font-bold font-serif text-white">{fac.title}</h3>
                <p className="text-xs text-amber-400/90 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5" />
                  {fac.location}
                </p>
                <p className="text-xs text-gray-300 leading-relaxed pt-1">
                  {fac.details}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-800 text-xs text-gray-400">
                Contact: <strong className="text-white">{fac.contact}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
