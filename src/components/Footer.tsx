import React from 'react';
import { Landmark, Compass, Route, HelpCircle, PhoneCall, Mail, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateSection?: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const handleNav = (section: string) => {
    if (onNavigateSection) {
      onNavigateSection(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0a0e16] border-t border-amber-500/20 text-gray-400 font-sans text-xs">
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Brand & District Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-extrabold text-white font-serif tracking-tight">
                    BAGALKOT TOURISM
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                    TECH YODDHAS
                  </span>
                </div>
                <p className="text-[11px] text-amber-400/90 font-serif italic">
                  "Discover the Heritage Heart of North Karnataka"
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              Created and engineered with pride by Team Tech Yoddhas — dedicated to promoting the early Chalukyan architectural sanctuaries, sacred river confluences, curated road routes, and vibrant living traditions of Bagalkot District.
            </p>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Inscribed UNESCO World Heritage Site • ASI Protected Monuments</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-serif text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-amber-300 transition-colors">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-amber-300 transition-colors">
                  Explore Destinations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('heritage')} className="hover:text-amber-300 transition-colors">
                  Chalukyan Heritage
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('things-to-do')} className="hover:text-amber-300 transition-colors">
                  Things to Do & Experiences
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('route-map')} className="hover:text-amber-300 transition-colors text-amber-400 font-semibold">
                  Bagalkot Route Map
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-amber-300 transition-colors">
                  About Bagalkot District
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Destinations */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-serif text-white uppercase tracking-wider">
              Destinations
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-amber-300 transition-colors">
                  Badami Cave Temples
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-amber-300 transition-colors">
                  Pattadakal UNESCO Site
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-amber-300 transition-colors">
                  Aihole Architecture Cradle
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-amber-300 transition-colors">
                  Kudalasangama Confluence
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-amber-300 transition-colors">
                  Almatti Dam & Gardens
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-amber-300 transition-colors">
                  Banashankari & Mahakuta
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-amber-300 transition-colors">
                  Ilkal Handloom City
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Tourist Support & Helplines */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-serif text-white uppercase tracking-wider">
              Support & Helpline
            </h4>
            <div className="space-y-2.5">
              <div>
                <span className="text-gray-400 block text-[11px]">24x7 Tourist Helpline:</span>
                <a href="tel:1363" className="font-extrabold text-amber-400 hover:underline">
                  1363 / 1800-11-1363
                </a>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Emergency Response:</span>
                <a href="tel:112" className="font-extrabold text-white hover:underline">
                  112 (Police / Fire / Traffic)
                </a>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Ambulance Emergency:</span>
                <a href="tel:108" className="font-extrabold text-white hover:underline">
                  108
                </a>
              </div>
              <div>
                <span className="text-gray-400 block text-[11px]">Platform Innovation & AI:</span>
                <span className="text-amber-400 font-bold">Team Tech Yoddhas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Disclaimers */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Team Tech Yoddhas. All rights reserved. Bagalkot AI Heritage & Tourism Platform.
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => handleNav('travel-guide')} className="hover:text-gray-300">
              Travel Advisory
            </button>
            <span>•</span>
            <button onClick={() => handleNav('about')} className="hover:text-gray-300">
              Privacy & Guidelines
            </button>
            <span>•</span>
            <span>Made with pride for North Karnataka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
