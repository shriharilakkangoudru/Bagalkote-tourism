import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, Bus, Hotel, Utensils, ShoppingBag, Info, AlertTriangle, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { Language, TourismServiceCategory } from '../types';
import { TOURIST_SERVICES, EMERGENCY_CONTACTS, CULTURAL_GUIDELINES } from '../data/tourismServices';
import { TRANSLATIONS } from '../data/translations';

interface TouristServicesProps {
  language: Language;
}

export const TouristServices: React.FC<TouristServicesProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<TourismServiceCategory>('emergency');

  return (
    <div className="max-w-7xl mx-auto space-y-10 text-white">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Verified Bagalkote District Tourism Registry</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
          Emergency & Tourist Services
        </h2>
        <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
          Essential travel logistics, 24/7 emergency helplines, transport schedules, authentic North Karnataka dining, and cultural customs.
        </p>
      </div>

      {/* Emergency Quick Hotlines Bar */}
      <div className="bg-gradient-to-r from-red-950/60 via-[#1c1214] to-red-950/60 border-2 border-red-500/40 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
          <AlertTriangle className="w-4 h-4 animate-pulse" />
          <span>Immediate 24/7 Emergency Helplines (Toll-Free)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {EMERGENCY_CONTACTS.map((contact, idx) => (
            <a
              key={idx}
              href={`tel:${contact.number.replace(/\s+/g, '')}`}
              id={`emergency-call-${idx}`}
              className="p-4 rounded-2xl bg-black/50 border border-red-500/30 hover:border-red-400 hover:bg-red-950/40 transition-all flex flex-col items-center text-center space-y-1 group"
            >
              <span className="text-2xl mb-1">{contact.icon}</span>
              <p className="text-xs font-bold text-gray-200">{contact.service}</p>
              <p className="text-sm font-extrabold text-red-400 font-mono group-hover:text-red-300">
                {contact.number}
              </p>
              <span className="text-[10px] text-gray-400">{contact.description}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 border-b border-gray-800 scrollbar-none">
        {[
          { id: 'emergency', label: 'Emergency & Health', icon: ShieldAlert },
          { id: 'transport', label: 'Transit & Mobility', icon: Bus },
          { id: 'hotels', label: 'Heritage Hotels & Stays', icon: Hotel },
          { id: 'food', label: 'Local Food & Flavors', icon: Utensils },
          { id: 'souvenirs', label: 'Handlooms & Souvenirs', icon: ShoppingBag },
          { id: 'guidelines', label: 'Cultural Guidelines', icon: Info },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`services-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold flex items-center space-x-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#182132] text-amber-300 border-b-2 border-amber-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-gray-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels Content */}
      <div className="bg-[#141b28] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {/* Cultural Guidelines Tab */}
        {activeTab === 'guidelines' ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
                <Info className="w-5 h-5 text-amber-400" />
                <span>Bagalkote Heritage Cultural Guidelines & Etiquette</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Help safeguard the 1,400-year-old fragile sandstone sanctuaries and honor local community customs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CULTURAL_GUIDELINES.map((guide, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#1b2333] border border-gray-800 hover:border-amber-500/40 transition-colors space-y-2"
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl">{guide.icon}</span>
                    <h4 className="text-sm font-bold text-amber-300 font-serif">{guide.title}</h4>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed pl-8">{guide.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Structured Services Listing */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-800">
              <h3 className="text-xl font-bold font-serif text-white capitalize">
                {activeTab} Listings
              </h3>
              <span className="text-xs text-gray-400">
                Verified listings for Badami, Pattadakal, Aihole & Bagalkote Town
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOURIST_SERVICES.filter((s) => s.category === activeTab).map((service) => (
                <div
                  key={service.id}
                  className="bg-[#1a2333] border border-gray-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-base font-bold text-white font-serif">{service.title}</h4>
                      {service.phone && (
                        <a
                          href={`tel:${service.phone.replace(/\s+/g, '')}`}
                          className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                          title="Call directly"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center space-x-1 text-xs text-amber-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{service.location}</span>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">{service.description}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-800/80 space-y-1.5 text-[11px] text-gray-400">
                    {service.timings && (
                      <p>
                        <span className="text-gray-500 font-semibold">Timings:</span> {service.timings}
                      </p>
                    )}
                    {service.phone && (
                      <p>
                        <span className="text-gray-500 font-semibold">Phone:</span>{' '}
                        <span className="text-emerald-300 font-mono">{service.phone}</span>
                      </p>
                    )}
                    {service.priceRange && (
                      <p>
                        <span className="text-gray-500 font-semibold">Cost:</span>{' '}
                        <span className="text-amber-300">{service.priceRange}</span>
                      </p>
                    )}
                    {service.highlight && (
                      <p className="text-amber-200/90 italic bg-amber-500/5 p-1.5 rounded">
                        ★ {service.highlight}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
