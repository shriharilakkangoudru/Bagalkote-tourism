import React, { useState } from 'react';
import { Utensils, Shirt, Sparkles, Heart, CheckCircle2, Info } from 'lucide-react';
import { FOOD_ITEMS, CULTURAL_TRADITIONS } from '../data/foodAndCulture';
import { handleImageError } from '../utils/imageUtils';

export const FoodAndCultureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'food' | 'culture'>('food');

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Utensils className="w-3.5 h-3.5 text-amber-400" />
          <span>Flavors & Living Heritage of North Karnataka</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
          Food & Culture in Bagalkot
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Savor crisp Jolada Rotti with spicy Ennegayi, discover centuries-old GI-tagged Ilkal saree handlooms, and celebrate the fiery folk energy of North Karnataka.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center space-x-3">
        <button
          onClick={() => setActiveTab('food')}
          className={`px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'food'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>North Karnataka Culinary Heritage</span>
        </button>

        <button
          onClick={() => setActiveTab('culture')}
          className={`px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'culture'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <Shirt className="w-4 h-4" />
          <span>Handlooms, Folk Arts & Living Traditions</span>
        </button>
      </div>

      {/* Food Items View */}
      {activeTab === 'food' && (
        <div className="space-y-8">
          {/* Khanavali Callout Banner */}
          <div className="bg-gradient-to-r from-[#172338] via-[#1b2a44] to-[#172338] border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                The Khanavali Tradition
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Nutrient-Rich, Gluten-Free & Distinctly Earthy
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                North Karnataka cuisine revolves around dryland millets, aromatic roasted seeds, and spicy relishes. At traditional "Khanavalis" (eateries) across Bagalkot, hot rotis are prepared fresh on order and served with unlimited accompaniments.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                Gluten-Free Jowar
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                Organic Jaggery
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                Home-Churned Butter
              </span>
            </div>
          </div>

          {/* Grid of Dishes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOOD_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-[#121927] border border-gray-800 hover:border-amber-500/50 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">
                      {item.category}
                    </span>
                    <span className="text-xs text-amber-400 font-semibold">{item.kannadaName}</span>
                  </div>

                  <h4 className="text-lg font-bold font-serif text-white">{item.name}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{item.description}</p>

                  {/* Key ingredients */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Ingredients:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.keyIngredients.map((ing, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#182335] text-[10px] text-gray-300 border border-gray-700">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-800/80 space-y-1.5 text-xs">
                  <div className="text-amber-300 font-medium">
                    🍽️ Best enjoyed with: <strong className="text-white">{item.mustTryWith}</strong>
                  </div>
                  <div className="text-gray-400 text-[11px]">
                    ✨ {item.healthBenefits}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cultural Traditions View */}
      {activeTab === 'culture' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CULTURAL_TRADITIONS.map((tradition) => (
            <div
              key={tradition.id}
              className="bg-[#121927] border border-gray-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all"
            >
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {tradition.category}
                  </span>
                  <span className="text-xs text-amber-400 font-semibold">{tradition.kannadaName}</span>
                </div>

                <h3 className="text-2xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                  {tradition.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {tradition.description}
                </p>

                <div className="space-y-2 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#172133] border border-gray-750 space-y-1">
                    <strong className="text-amber-300 block">Historical Origins:</strong>
                    <span className="text-gray-300 leading-relaxed">{tradition.historicalOrigins}</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#172133] border border-gray-750 space-y-1">
                    <strong className="text-emerald-400 block">Where to Experience:</strong>
                    <span className="text-gray-300 leading-relaxed">{tradition.whereToExperience}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-[#0d131f] border-t border-gray-800 text-xs text-gray-400 flex items-center justify-between">
                <span>Living Heritage of Bagalkot District</span>
                <span className="text-amber-400 font-bold">Preserved Artisan Tradition</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
