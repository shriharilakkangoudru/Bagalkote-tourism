import React from 'react';
import { Landmark, Compass, Droplets, MapPin, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutBagalkotSectionProps {
  onExploreDestinations?: () => void;
  onExploreRouteMap?: () => void;
}

export const AboutBagalkotSection: React.FC<AboutBagalkotSectionProps> = ({
  onExploreDestinations,
  onExploreRouteMap
}) => {
  const taluks = [
    { name: 'Badami', highlight: 'Rock-Cut Cave Temples, Agastya Lake, Banashankari & Mahakuta' },
    { name: 'Hungund', highlight: 'Aihole Temple Laboratory, Kudalasangama Confluence & Ilkal Handlooms' },
    { name: 'Bagalkot', highlight: 'District HQ, Navanagar, Ghataprabha River basin & Kerur rocks' },
    { name: 'Bilgi', highlight: 'Historic Arekal Siddeshwara Temple & Royal 16th-century Stepwells' },
    { name: 'Mudhol', highlight: 'Ghorpade princely state on Ghataprabha & indigenous Mudhol Hound' },
    { name: 'Jamkhandi', highlight: 'Royal Patwardhan Palace, sacred Ramtirth reservoir & hilltop views' },
    { name: 'Guledgudda', highlight: 'Scenic hill fort & centuries-old traditional Khana blouse handlooms' },
    { name: 'Rabkavi Banhatti', highlight: 'Major textile manufacturing hub and vibrant weaving cooperatives' }
  ];

  const districtStats = [
    { label: 'Geographical Area', val: '6,593 sq km' },
    { label: 'UNESCO World Heritage Sites', val: '1 (Pattadakal Complex)' },
    { label: 'Protected Ancient Temples', val: '150+ Monuments' },
    { label: 'Sacred River Lifelines', val: '3 (Krishna, Ghataprabha, Malaprabha)' },
    { label: 'Administrative Taluks', val: '8 Taluks' },
    { label: 'GI-Tagged Handicrafts', val: 'Ilkal Sarees (GI Tagged)' }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Landmark className="w-3.5 h-3.5 text-amber-400" />
          <span>District Profile & Geography</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
          About Bagalkot District
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Known as the heritage heart of North Karnataka, Bagalkot is blessed with three sacred river basins, red sandstone ravines, and the highest concentration of early stone monuments in peninsular India.
        </p>
      </div>

      {/* Key District Facts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {districtStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-[#121927] border border-gray-800 p-4 rounded-2xl text-center space-y-1 shadow-lg"
          >
            <span className="text-xs text-gray-400 block">{stat.label}</span>
            <strong className="text-base sm:text-lg font-bold text-amber-400 font-serif block">
              {stat.val}
            </strong>
          </div>
        ))}
      </div>

      {/* 3 River Lifelines Section */}
      <div className="bg-gradient-to-r from-[#141e30] via-[#19273f] to-[#141e30] border border-amber-500/30 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-cyan-400" />
            The Three Sacred Lifelines
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Where Sacred Rivers Sculpted Civilizations
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
            The topography of Bagalkot District is uniquely carved by three major perennial river basins that nurtured royal dynasties, agriculture, and spiritual philosophy for millennia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-[#101725] border border-gray-800 p-5 rounded-2xl space-y-2">
            <h4 className="text-base font-bold font-serif text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>Krishna River</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Flows across the northern boundary, cradling the colossal Almatti Dam and its vast backwaters, before embracing the Malaprabha at holy Kudalasangama.
            </p>
          </div>

          <div className="bg-[#101725] border border-gray-800 p-5 rounded-2xl space-y-2">
            <h4 className="text-base font-bold font-serif text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Malaprabha River</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              The sacred cradle of Chalukyan architectural genius, winding gently past the stone sanctuaries of Badami, Pattadakal, and Aihole into Kudalasangama.
            </p>
          </div>

          <div className="bg-[#101725] border border-gray-800 p-5 rounded-2xl space-y-2">
            <h4 className="text-base font-bold font-serif text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Ghataprabha River</span>
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Enriches the western and central taluks of Mudhol and Bagalkot city, supporting lush sugarcane farming and traditional handloom settlements.
            </p>
          </div>
        </div>
      </div>

      {/* 8 Taluks Directory */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold font-serif text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>Administrative Taluks of Bagalkot District</span>
          </h3>
          <span className="text-xs text-amber-400 font-semibold">8 Distinct Taluks</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {taluks.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#121927] border border-gray-800 p-4 rounded-2xl space-y-1.5 hover:border-amber-500/40 transition-colors"
            >
              <h4 className="text-base font-bold font-serif text-white">{t.name}</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{t.highlight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-[#131b28] border border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-xl font-bold font-serif text-white">Plan Your Exploration of Bagalkot</h3>
          <p className="text-xs text-gray-300">Discover all destinations, plan your routes, and immerse yourself in Chalukyan majesty.</p>
        </div>

        <div className="flex items-center space-x-3">
          {onExploreDestinations && (
            <button
              onClick={onExploreDestinations}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 text-xs font-bold transition-colors"
            >
              Explore Destinations
            </button>
          )}
          {onExploreRouteMap && (
            <button
              onClick={onExploreRouteMap}
              className="px-5 py-2.5 rounded-xl bg-[#1a2334] hover:bg-[#222e44] text-white border border-gray-700 text-xs font-semibold transition-colors"
            >
              View Route Map
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
