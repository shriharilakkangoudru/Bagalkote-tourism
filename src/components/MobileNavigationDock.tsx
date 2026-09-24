import React from 'react';
import { Landmark, Compass, Sparkles, Bot, MapPin } from 'lucide-react';
import { AppSection } from '../App';
import { Language } from '../types';

interface MobileNavigationDockProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
  language: Language;
}

export const MobileNavigationDock: React.FC<MobileNavigationDockProps> = ({
  activeSection,
  onNavigate,
  language,
}) => {
  const labels = {
    en: { home: 'Home', sites: 'Sites', lens: 'AI Lens', ai: 'Voice AI', map: 'Map' },
    kn: { home: 'ಮುಖ್ಯ', sites: 'ತಾಣಗಳು', lens: 'ಎಐ ಲೆನ್ಸ್', ai: 'ಧ್ವನಿ AI', map: 'ನಕ್ಷೆ' },
    hi: { home: 'होम', sites: 'स्थल', lens: 'एआई लेंस', ai: 'ध्वनि AI', map: 'मानचित्र' },
  }[language];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1424]/95 backdrop-blur-xl border-t border-amber-500/30 px-2 pt-1.5 shadow-[0_-8px_30px_rgba(0,0,0,0.8)]"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeSection === 'home'
              ? 'text-amber-400 font-bold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Landmark className={`w-5 h-5 ${activeSection === 'home' ? 'text-amber-400 scale-110' : ''}`} />
          <span className="text-[10px] mt-0.5">{labels.home}</span>
        </button>

        {/* 2. Destinations */}
        <button
          onClick={() => onNavigate('destinations')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeSection === 'destinations'
              ? 'text-amber-400 font-bold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Compass className={`w-5 h-5 ${activeSection === 'destinations' ? 'text-amber-400 scale-110' : ''}`} />
          <span className="text-[10px] mt-0.5">{labels.sites}</span>
        </button>

        {/* 3. Center Elevated AI Lens Action */}
        <button
          onClick={() => onNavigate('identify')}
          className="relative -top-3 flex flex-col items-center group"
          title="AI Monument Lens"
        >
          <div className={`w-[50px] h-[50px] rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/40 group-active:scale-95 transition-transform ${activeSection === 'identify' ? 'ring-2 ring-amber-300 ring-offset-2 ring-offset-[#0d1424]' : ''}`}>
            <div className="w-full h-full rounded-full bg-[#101725] flex items-center justify-center border-2 border-amber-400/80">
              <Sparkles className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <span className={`text-[9px] font-extrabold mt-0.5 tracking-tight uppercase ${activeSection === 'identify' ? 'text-amber-300' : 'text-amber-400'}`}>
            {labels.lens}
          </span>
        </button>

        {/* 4. Heritage Voice AI */}
        <button
          onClick={() => onNavigate('assistant')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeSection === 'assistant'
              ? 'text-amber-400 font-bold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <div className="relative">
            <Bot className={`w-5 h-5 ${activeSection === 'assistant' ? 'text-amber-400 scale-110' : ''}`} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="text-[10px] mt-0.5">{labels.ai}</span>
        </button>

        {/* 5. Route Map */}
        <button
          onClick={() => onNavigate('route-map')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
            activeSection === 'route-map'
              ? 'text-amber-400 font-bold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <MapPin className={`w-5 h-5 ${activeSection === 'route-map' ? 'text-amber-400 scale-110' : ''}`} />
          <span className="text-[10px] mt-0.5">{labels.map}</span>
        </button>
      </div>
    </nav>
  );
};
