import React from 'react';
<<<<<<< HEAD
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
=======
import { Compass, MapPin, Sparkles, ChevronRight, ShieldCheck, Route, Landmark, ArrowRight, Shield, Zap, Bot } from 'lucide-react';
import { handleImageError } from '../utils/imageUtils';
import { Language } from '../types';

interface HeroProps {
  onExploreDestinations: () => void;
  onExploreRouteMap: () => void;
  onLaunchAssistant?: () => void;
  onOpenAllCaves?: () => void;
  onOpenWaterfalls?: () => void;
  language?: Language;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreDestinations,
  onExploreRouteMap,
  onLaunchAssistant,
  onOpenAllCaves,
  onOpenWaterfalls,
  language = 'en',
}) => {
  const content = {
    en: {
      teamBadge: 'Crafted by Team Tech Yoddhas • Bagalkot AI Heritage & Smart Tourism',
      kicker: 'Discover the Heritage Heart of North Karnataka',
      titleP1: 'Discover',
      titleHighlight: 'Bagalkot',
      subtitle: 'Where Chalukyan heritage, sacred rivers, and timeless landscapes meet.',
      description: 'Step into the sixth-century rock-cut caves of Badami, wander through the UNESCO coronation monuments of Pattadakal, unravel the experimental temple laboratory of Aihole, and experience the sacred confluences of the Krishna and Malaprabha rivers.',
      exploreDestBtn: 'Explore Destinations',
      exploreRouteBtn: 'Explore Route Map',
      aiAssistantBtn: '🤖 Ask AI Assistant',
      badgeUnesco: 'UNESCO Site Pattadakal',
      badgeCaves: 'All 8 Caves of Badami (Real Footage)',
      badgeWaterfalls: '🌊 Waterfalls & Hidden Cascades (9 Taluks)',
      badgeAihole: 'Aihole Architectural Cradle',
      statMonuments: '150+',
      statMonumentsSub: 'Ancient Stone Monuments',
      statYears: '1,400+',
      statYearsSub: 'Years of Living History',
      statRivers: '3 Rivers',
      statRiversSub: 'Krishna, Ghataprabha & Malaprabha',
      statTaluks: '9 Taluks',
      statTaluksSub: 'Full District Network'
    },
    kn: {
      teamBadge: 'ತಂಡ ಟೆಕ್ ಯೋಧಾಸ್ ನಿರ್ಮಿತ • ಬಾಗಲಕೋಟೆ ಪ್ರವಾಸೋದ್ಯಮ ಮತ್ತು ಎಐ ತಂತ್ರಜ್ಞಾನ',
      kicker: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯ ತವರೂರು',
      titleP1: 'ಅನ್ವೇಷಿಸಿ',
      titleHighlight: 'ಬಾಗಲಕೋಟೆ',
      subtitle: 'ಚಾಲುಕ್ಯರ ಶಿಲ್ಪ ಪರಂಪರೆ, ಪವಿತ್ರ ನದಿಗಳು ಹಾಗೂ ರಮಣೀಯ ಪ್ರಕೃತಿಯ ಸಮ್ಮಿಲನ.',
      description: 'ಆರನೇ ಶತಮಾನದ ಬಾದಾಮಿ ಬಂಡೆ-ಕೊರೆದ ಗುಹೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ, ಪಟ್ಟದಕಲ್ಲಿನ ಯುನೆಸ್ಕೋ ಪಟ್ಟಾಭಿಷೇಕ ದೇಗುಲಗಳನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ, ಐಹೊಳೆಯ ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲನ್ನು ಅನ್ವೇಷಿಸಿ ಹಾಗೂ ಕೃಷ್ಣಾ-ಮಲಪ್ರಭಾ ನದಿಗಳ ಸಂಗಮವನ್ನು ಅನುಭವಿಸಿ.',
      exploreDestBtn: 'ಪ್ರವಾಸಿ ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
      exploreRouteBtn: 'ಮಾರ್ಗ ನಕ್ಷೆ ವೀಕ್ಷಿಸಿ',
      aiAssistantBtn: '🤖 ಧ್ವನಿ ಎಐ ಸಹಾಯಕ',
      badgeUnesco: 'ಯುನೆಸ್ಕೋ ತಾಣ ಪಟ್ಟದಕಲ್ಲು',
      badgeCaves: 'ಬಾದಾಮಿಯ ಎಲ್ಲಾ ೮ ಗುಹೆಗಳು (ನೈಜ ಫೋಟೋಗಳು)',
      badgeWaterfalls: '🌊 ಜಲಪಾತಗಳು ಮತ್ತು ಗುಪ್ತ ಜಲಧಾರೆಗಳು (೯ ತಾಲೂಕುಗಳು)',
      badgeAihole: 'ಐಹೊಳೆ ವಾಸ್ತುಶಿಲ್ಪದ ಶಾಲೆ',
      statMonuments: '೧೫೦+',
      statMonumentsSub: 'ಪ್ರಾಚೀನ ಕಲ್ಲಿನ ಸ್ಮಾರಕಗಳು',
      statYears: '೧,೪೦೦+',
      statYearsSub: 'ವರ್ಷಗಳ ಜೀವಂತ ಇತಿಹಾಸ',
      statRivers: '೩ ನದಿಗಳು',
      statRiversSub: 'ಕೃಷ್ಣಾ, ಘಟಪ್ರಭಾ ಮತ್ತು ಮಲಪ್ರಭಾ',
      statTaluks: '೯ ತಾಲೂಕುಗಳು',
      statTaluksSub: 'ಸಂಪೂರ್ಣ ಜಿಲ್ಲಾ ಸಂಪರ್ಕ'
    },
    hi: {
      teamBadge: 'टीम टेक योद्धास द्वारा निर्मित • बागलकोट एआई हेरिटेज एवं स्मार्ट पर्यटन',
      kicker: 'उत्तर कर्नाटक के ऐतिहासिक हृदयस्थल की खोज करें',
      titleP1: 'अन्वेषण करें',
      titleHighlight: 'बागलकोट',
      subtitle: 'जहाँ चालुक्य कालीन पाषाण शिल्प, पवित्र नदियाँ और मनोरम प्रकृति मिलती हैं।',
      description: 'छठी शताब्दी की बादामी की चट्टानी रॉक-कट गुफाओं, पट्टदकल के यूनेस्को विश्व धरोहर मंदिरों, ऐहोले की भारतीय मंदिर वास्तुकला की प्रयोगशाला तथा कृष्णा और मलप्रभा नदियों के पवित्र संगम का जीवंत अनुभव करें।',
      exploreDestBtn: 'पर्यटन स्थल देखें',
      exploreRouteBtn: 'रूट मैप देखें',
      aiAssistantBtn: '🤖 वॉइस एआई सहायक',
      badgeUnesco: 'यूनेस्को धरोहर पट्टदकल',
      badgeCaves: 'बादामी की सभी 8 गुफाएं (वास्तविक तस्वीरें)',
      badgeWaterfalls: '🌊 जलप्रपात एवं गुप्त प्राकृतिक झरने (9 तालुक)',
      badgeAihole: 'ऐहोले स्थापत्य कला पालना',
      statMonuments: '150+',
      statMonumentsSub: 'प्राचीन पाषाण स्मारक',
      statYears: '1,400+',
      statYearsSub: 'वर्षों का समृद्ध इतिहास',
      statRivers: '3 नदियाँ',
      statRiversSub: 'कृष्णा, घटप्रभा एवं मलप्रभा',
      statTaluks: '9 तालुक',
      statTaluksSub: 'संपूर्ण जिला नेटवर्क'
    }
  }[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-blur-[2px] text-white pt-10 pb-20 border-b border-amber-500/20">
      {/* HD Sandstone Grid Pattern & Atmospheric Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* HD Decorative Architectural Ring Watermark */}
      <div className="absolute -top-24 -right-24 w-96 h-96 border border-amber-500/10 rounded-full pointer-events-none flex items-center justify-center">
        <div className="w-80 h-80 border border-amber-500/15 rounded-full" />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 space-y-12">
        {/* Top Tech Yoddhas Badge (Replaces Gov Name) */}
        <div className="flex items-center justify-center sm:justify-start">
          <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-amber-500/15 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-lg shadow-amber-500/10">
            <Shield className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
            <span className="font-medium tracking-wide truncate max-w-[280px] sm:max-w-none">{content.teamBadge}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center sm:text-left">
            <div className="space-y-2.5 sm:space-y-3">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-400 uppercase font-mono">
                {content.kicker}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold tracking-tight font-serif text-white leading-[1.12]">
                {content.titleP1}{' '}
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  {content.titleHighlight}
                </span>
              </h1>
              <p className="text-base sm:text-xl lg:text-2xl text-amber-100/90 font-serif italic max-w-2xl leading-relaxed">
                {content.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
              {content.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 pt-2 justify-center sm:justify-start">
              {/* PRIMARY DESTINATIONS CTA */}
              <button
                id="hero-explore-destinations-btn"
                onClick={onExploreDestinations}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-extrabold text-xs sm:text-sm md:text-base shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-gray-950" />
                <span>{content.exploreDestBtn}</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-950/80" />
              </button>

              {/* AI HERITAGE VOICE ASSISTANT CTA */}
              {onLaunchAssistant && (
                <button
                  id="hero-ask-ai-assistant-btn"
                  onClick={onLaunchAssistant}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-purple-600/25 hover:bg-purple-600/35 text-purple-200 font-bold text-xs sm:text-sm border border-purple-500/50 hover:border-purple-400 backdrop-blur-md transition-all flex items-center justify-center space-x-2 shadow-lg shadow-purple-950/50 hover:scale-105 active:scale-95 cursor-pointer"
                  title="Talk with AI Heritage Assistant in Kannada, Hindi, or English"
                >
                  <Bot className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span>{content.aiAssistantBtn}</span>
                </button>
              )}

              <button
                id="hero-explore-route-map-btn"
                onClick={onExploreRouteMap}
                className="w-full sm:w-auto px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-medium text-xs sm:text-sm border border-gray-750 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Route className="w-4 h-4 text-gray-400" />
                <span>{content.exploreRouteBtn}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{content.badgeUnesco}</span>
              </div>
              <button
                type="button"
                onClick={onOpenAllCaves}
                className="flex items-center space-x-2 text-amber-300 hover:text-amber-200 transition-colors group cursor-pointer"
                title="Explore All 8 Caves of Badami"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform animate-pulse" />
                <span className="font-semibold underline decoration-amber-500/50 underline-offset-4">{content.badgeCaves}</span>
              </button>
              {onOpenWaterfalls && (
                <button
                  type="button"
                  onClick={onOpenWaterfalls}
                  className="flex items-center space-x-2 text-cyan-300 hover:text-cyan-200 transition-colors group cursor-pointer"
                  title="Explore All Waterfalls & Hidden Cascades of Bagalkote"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform animate-pulse" />
                  <span className="font-semibold underline decoration-cyan-500/50 underline-offset-4">{content.badgeWaterfalls}</span>
                </button>
              )}
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{content.badgeAihole}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Heritage Media Area with HD Visual Effects */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Cinematic Image Frame */}
              <div
                onClick={onOpenAllCaves}
                className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-gray-900 group cursor-pointer"
                title="Click to Open All 8 Caves of Badami Explorer"
              >
                <img
                  src="/images/monuments/badami-caves.jpg"
                  alt="Badami Rock-Cut Caves and Sandstone Cliffs"
                  className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Floating Destination Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/40 text-[11px] font-bold text-amber-300 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>All 8 Badami Caves (540–700 CE)</span>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0f1522]/90 backdrop-blur-md border border-gray-750 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white font-serif text-sm">Vatapi Monolithic Sanctuary</span>
                    <span className="text-amber-400 font-semibold">Caves 1–8 Full Guide</span>
                  </div>
                  <p className="text-[11px] text-gray-300">
                    All eight monumental caves and rock shelters sculpted into the crimson bluffs of South Hill, North Hill & Lake Agastya.
                  </p>
                </div>
              </div>

              {/* Overlapping Secondary Card (Pattadakal UNESCO) */}
              <div className="hidden md:flex absolute -bottom-4 -left-3 lg:-bottom-6 lg:-left-6 bg-[#131a28]/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-amber-500/30 shadow-2xl items-center space-x-3 max-w-xs">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-800 shrink-0">
                  <img
                    src="/images/monuments/virupaksha.jpg"
                    alt="Pattadakal UNESCO Site"
                    className="w-full h-full object-cover"
                    onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase block">UNESCO World Heritage</span>
                  <span className="text-xs font-bold text-white block">Pattadakal Coronation Complex</span>
                  <span className="text-[10px] text-gray-400">Where North & South styles fused</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Counter Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#111724]/90 border border-gray-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md text-center">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-400 block">{content.statMonuments}</span>
            <span className="text-xs text-gray-300 font-medium">{content.statMonumentsSub}</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-white block">{content.statYears}</span>
            <span className="text-xs text-gray-300 font-medium">{content.statYearsSub}</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-400 block">{content.statRivers}</span>
            <span className="text-xs text-gray-300 font-medium">{content.statRiversSub}</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-white block">{content.statTaluks}</span>
            <span className="text-xs text-gray-300 font-medium">{content.statTaluksSub}</span>
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
          </div>
        </div>
      </div>
    </section>
  );
};
