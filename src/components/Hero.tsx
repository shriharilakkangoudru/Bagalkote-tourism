import React from 'react';
import { Camera, Compass, Bot, Globe2, Map, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { VERIFIED_IMAGES } from '../data/verifiedImages';
import { handleImageError } from '../utils/imageUtils';

interface HeroProps {
  language: Language;
  onIdentifyClick: () => void;
  onExploreClick: () => void;
  onOpenCompetitionDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onIdentifyClick,
  onExploreClick,
  onOpenCompetitionDemo
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0c1017] via-[#121824] to-[#182030] text-white pt-10 pb-20 border-b border-amber-500/20">
      {/* Subtle heritage background watermark texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top badge */}
        <div className="flex items-center justify-center sm:justify-start mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold backdrop-blur-sm shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Bagalkote Early Chalukyan Heritage • AI-Powered Tourism Platform</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to actions */}
          <div className="lg:col-span-7 space-y-7 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif text-white leading-tight">
              {t.heroTagline.split('.')[0]}.{' '}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent block sm:inline">
                {t.heroTagline.split('.')[1] || 'Powered by AI.'}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              {t.heroDescription}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center sm:justify-start">
              <button
                id="hero-primary-identify-btn"
                onClick={onIdentifyClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-bold text-base shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
              >
                <Camera className="w-5 h-5 text-gray-950" />
                <span>{t.identifyButton}</span>
                <ChevronRight className="w-4 h-4 text-gray-950/70" />
              </button>

              <button
                id="hero-secondary-explore-btn"
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/20 hover:border-amber-400/50 backdrop-blur-md transition-all flex items-center justify-center space-x-2"
              >
                <Compass className="w-5 h-5 text-amber-400" />
                <span>{t.exploreButton}</span>
              </button>

              <button
                id="hero-start-demo-btn"
                onClick={onOpenCompetitionDemo}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 text-xs font-bold tracking-wide flex items-center justify-center space-x-1.5 transition-colors"
                title="Open guided competition presentation mode"
              >
                <span>🎬</span>
                <span>Competition Demo</span>
              </button>
            </div>

            {/* Key trust bullets */}
            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-gray-400">
              <span className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>UNESCO World Heritage Pattadakal</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Badami 6th Century Caves</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Aihole Architectural Laboratory</span>
              </span>
            </div>
          </div>

          {/* Right Column: Cinematic Heritage Visual with Floating Cards */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Main Visual Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/40 group">
              <img
                src={VERIFIED_IMAGES.virupaksha}
                alt="Virupaksha Temple at Pattadakal and Badami rock cut monuments"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="eager"
                onError={(e) => handleImageError(e, VERIFIED_IMAGES.defaultFallback)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f141d] via-[#0f141d]/30 to-transparent" />

              {/* Bottom banner in image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                      Bagalkote Golden Triangle
                    </span>
                    <h2 className="text-lg font-bold text-white font-serif">
                      Badami • Pattadakal • Aihole
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500 text-gray-950 text-xs font-extrabold">
                    UNESCO
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Feature Card 1: AI Recognition */}
            <div className="absolute -top-5 -left-4 sm:-left-6 p-3 rounded-xl bg-[#1a2333]/90 backdrop-blur-md border border-amber-500/40 shadow-xl flex items-center space-x-3 hidden sm:flex animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">📷 AI Monument Recognition</p>
                <p className="text-[10px] text-gray-300">Neural image classification</p>
              </div>
            </div>

            {/* Floating Feature Card 2: AI Assistant */}
            <div className="absolute -bottom-6 -right-2 sm:-right-4 p-3 rounded-xl bg-[#1a2333]/90 backdrop-blur-md border border-amber-500/40 shadow-xl flex items-center space-x-3 hidden sm:flex">
              <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">🤖 AI Heritage Assistant</p>
                <p className="text-[10px] text-gray-300">Multilingual audio Q&A</p>
              </div>
            </div>

            {/* Floating Feature Card 3: Multilingual & Trip Planner (Mobile/Desktop friendly badges) */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:hidden">
              <div className="p-2.5 rounded-lg bg-[#182030] border border-amber-500/30 text-xs flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-white">🌐 Kannada • Hindi • English</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#182030] border border-amber-500/30 text-xs flex items-center space-x-2">
                <Map className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">🗺️ Smart Trip Planner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-16 pt-10 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="p-5 rounded-2xl bg-[#151c28]/80 border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">25+</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-medium">{t.statsMonuments}</p>
            </div>

            {/* Stat 2 */}
            <div className="p-5 rounded-2xl bg-[#151c28]/80 border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">3</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-medium">{t.statsLanguages}</p>
            </div>

            {/* Stat 3 */}
            <div className="p-5 rounded-2xl bg-[#151c28]/80 border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">100%</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-medium">{t.statsAiPowered}</p>
            </div>

            {/* Stat 4 */}
            <div className="p-5 rounded-2xl bg-[#151c28]/80 border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">24/7</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-medium">{t.statsAssistant}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
