import React from 'react';
<<<<<<< HEAD
import { Camera, Compass, Bot, Map, Calendar, ShieldAlert, Sparkles, Globe, Heart } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onNavigateTab: (tab: 'home' | 'identify' | 'details' | 'assistant' | 'planner' | 'map' | 'explore' | 'services' | 'admin' | 'about') => void;
  onOpenDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigateTab,
  onOpenDemo,
}) => {
  return (
    <footer className="bg-[#0a0d14] text-gray-400 border-t border-amber-500/20 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-gray-950 font-extrabold shadow-lg shadow-amber-500/30">
                <span className="font-serif text-xl tracking-tight">HL</span>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-serif">
                  AI HERITAGE LENS
                </span>
                <p className="text-[11px] text-amber-400/90 font-medium">
                  Your Intelligent Gateway to Bagalkote's Heritage
=======
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
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
<<<<<<< HEAD
              Empowering global travelers and culture enthusiasts with multimodal AI vision, voice-guided narratives in native Kannada, Hindi, and English, and smart itinerary planning across Badami, Pattadakal, and Aihole.
            </p>

            <div className="flex items-center space-x-2 text-xs text-amber-300/80">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Languages: ಕನ್ನಡ (Kannada) • हिन्दी (Hindi) • English</span>
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenDemo}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                <span>🎬</span>
                <span>Competition Presentation Mode</span>
              </button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              Explore Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab('identify')}
                  className="hover:text-amber-300 flex items-center space-x-2 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI Monument Recognition</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('explore')}
                  className="hover:text-amber-300 flex items-center space-x-2 transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Explore Heritage Catalog</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('assistant')}
                  className="hover:text-amber-300 flex items-center space-x-2 transition-colors"
                >
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                  <span>AI Heritage Assistant</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('planner')}
                  className="hover:text-amber-300 flex items-center space-x-2 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Smart Trip Planner</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('map')}
                  className="hover:text-amber-300 flex items-center space-x-2 transition-colors"
                >
                  <Map className="w-3.5 h-3.5 text-sky-400" />
                  <span>Interactive Tourism Map</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('services')}
                  className="hover:text-amber-300 flex items-center space-x-2 transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                  <span>Emergency & Tourist Services</span>
=======
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
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
                </button>
              </li>
            </ul>
          </div>

<<<<<<< HEAD
          {/* Cultural Heritage Preservation Note */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">
              Cultural Preservation Note
            </h4>
            <div className="p-4 rounded-2xl bg-[#141b28] border border-gray-800 text-xs text-gray-300 space-y-2 leading-relaxed">
              <p>
                Dedicated to honoring and promoting the sacred monuments of Bagalkote District, Karnataka: the rock-cut cave shrines of Badami, the UNESCO World Heritage royal coronation temples of Pattadakal, and the cradle of Indian architecture at Aihole.
              </p>
              <p className="text-[11px] text-amber-400/90 font-medium">
                Respect ancient stone surfaces: do not touch delicate carved friezes or leave litter.
              </p>
            </div>
            <p className="text-[11px] text-gray-400">
              Curated using Archaeological Survey of India (ASI) epigraphical records & Karnataka Tourism information.
            </p>
          </div>
        </div>

        {/* Bottom Subfooter */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400">
          <p>© {new Date().getFullYear()} AI Heritage Lens • Built for College Technology Competition Showcase</p>
          <div className="flex items-center space-x-4">
            <button onClick={() => onNavigateTab('admin')} className="hover:text-amber-300 transition-colors">
              Platform Admin
            </button>
            <span>•</span>
            <button onClick={() => onNavigateTab('about')} className="hover:text-amber-300 transition-colors">
              Project Architecture
            </button>
=======
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
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
          </div>
        </div>
      </div>
    </footer>
  );
};
