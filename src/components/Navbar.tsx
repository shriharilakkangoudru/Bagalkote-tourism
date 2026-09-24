<<<<<<< HEAD
import React, { useState } from 'react';
import { Camera, Compass, MapPin, MessageSquareText, Calendar, ShieldAlert, Sparkles, Menu, X, LayoutDashboard, Globe, Landmark } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  onSelectLanguage: (lang: Language) => void;
  onOpenCompetitionDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onSelectLanguage,
  onOpenCompetitionDemo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navLinks = [
    { id: 'home', label: t.navHome, icon: Landmark },
    { id: 'identify', label: t.navIdentify, icon: Camera },
    { id: 'explore', label: t.navExplore, icon: Compass },
    { id: 'planner', label: t.navPlanner, icon: Calendar },
    { id: 'assistant', label: t.navAssistant, icon: MessageSquareText },
    { id: 'map', label: t.navMap, icon: MapPin },
    { id: 'services', label: t.navServices, icon: ShieldAlert },
    { id: 'admin', label: t.navAdmin, icon: LayoutDashboard },
    { id: 'about', label: t.navAbout, icon: Globe },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f141d]/95 backdrop-blur-md border-b border-amber-500/20 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Subtitle */}
          <button
            id="brand-logo-btn"
            onClick={() => onSelectTab('home')}
            className="flex items-center space-x-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/25 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#121824] rounded-[10px] flex items-center justify-center">
                <Landmark className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white font-serif">
                  AI HERITAGE LENS
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">
                  AI v3.8
                </span>
              </div>
              <p className="text-xs text-amber-200/70 hidden sm:block">
                {t.appSubtitle}
=======
import React, { useState, useEffect, useRef } from 'react';
import { Landmark, Compass, MapPin, Route, Calendar, Utensils, BookOpen, Image as ImageIcon, Menu, X, ShieldCheck, HelpCircle, Bot, Globe, Sparkles, Shield, Droplets, Palette, Check } from 'lucide-react';
import { Language, AppTheme } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { THEMES_METADATA } from './AnimatedHeritageBackground';

export type MainNavSection =
  | 'home'
  | 'destinations'
  | 'heritage'
  | 'things-to-do'
  | 'route-map'
  | 'food-culture'
  | 'events'
  | 'travel-guide'
  | 'gallery'
  | 'about'
  | 'identify'
  | 'assistant'
  | 'planner';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  language?: Language;
  onSelectLanguage?: (lang: Language) => void;
  theme?: AppTheme;
  onSelectTheme?: (theme: AppTheme) => void;
  onOpenHDIntro?: () => void;
  onOpenWaterfalls?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  language = 'en',
  onSelectLanguage,
  theme = 'sandstone-gold',
  onSelectTheme,
  onOpenHDIntro,
  onOpenWaterfalls,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState<boolean>(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  // Close theme dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const t = TRANSLATIONS[language];

  const navItems = [
    { id: 'home', label: t.navHome, icon: Landmark },
    { id: 'destinations', label: t.navExplore, icon: Compass },
    { id: 'heritage', label: t.navHeritage, icon: Landmark },
    { id: 'things-to-do', label: t.navThingsToDo, icon: Compass },
    { id: 'route-map', label: t.navRouteMap, icon: Route, highlight: true },
    { id: 'assistant', label: t.navAssistant, icon: Bot, isAssistant: true },
    { id: 'food-culture', label: t.navFoodCulture, icon: Utensils },
    { id: 'events', label: t.navEvents, icon: Calendar },
    { id: 'travel-guide', label: t.navTravelGuide, icon: HelpCircle },
    { id: 'gallery', label: t.navGallery, icon: ImageIcon },
    { id: 'about', label: t.navAbout, icon: Globe },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const bannerText = {
    en: 'Tech Yoddhas • Bagalkot AI Tourism & Heritage Platform',
    kn: 'ಟೆಕ್ ಯೋಧಾಸ್ • ಬಾಗಲಕೋಟೆ ಪ್ರವಾಸೋದ್ಯಮ ಮತ್ತು ಎಐ ಪರಂಪರೆ ತಾಣ',
    hi: 'टेक योद्धास • बागलकोट पर्यटन एवं एआई धरोहर पोर्टल'
  }[language];

  const helplineText = {
    en: '24x7 Tourist Helpline',
    kn: '೨೪x೭ ಪ್ರವಾಸಿ ಸಹಾಯವಾಣಿ',
    hi: '24x7 पर्यटक हेल्पलाइन'
  }[language];

  const emergencyText = {
    en: 'Emergency',
    kn: 'ತುರ್ತು ಸೇವೆ',
    hi: 'आपातकालीन'
  }[language];

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b text-white shadow-2xl transition-colors duration-500 ${
        theme === 'emerald-monsoon'
          ? 'bg-[#061410]/95 border-emerald-500/30'
          : theme === 'agastya-night'
          ? 'bg-[#050b18]/95 border-cyan-500/30'
          : theme === 'royal-amethyst'
          ? 'bg-[#10071c]/95 border-purple-500/30'
          : 'bg-[#0c111b]/95 border-amber-500/25'
      }`}
    >
      {/* Top micro-banner for Team Tech Yoddhas Tourism Portal */}
      <div className="bg-[#141b28] border-b border-gray-800/80 text-[11px] py-1.5 px-4 text-gray-400 hidden sm:block">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-amber-400 font-extrabold flex items-center space-x-1.5">
              <Shield className="w-3 h-3 text-amber-400" />
              <span>{bannerText}</span>
            </span>
            <span>|</span>
            <span>{helplineText}: <strong className="text-white">1363</strong></span>
            <span>|</span>
            <span>{emergencyText}: <strong className="text-white">112</strong></span>
          </div>

          <div className="flex items-center space-x-3">
            {/* HD Intro replay button */}
            {onOpenHDIntro && (
              <button
                onClick={onOpenHDIntro}
                className="text-amber-300 hover:text-white font-bold flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 transition-colors"
                title="Open High-Definition Opening Graphic Design"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{t.hdIntroButton}</span>
              </button>
            )}

            {/* AI Monument Identification Trigger */}
            <button
              onClick={() => handleNavClick('identify')}
              className="text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/40 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>{t.recTitle}</span>
            </button>

            <span>•</span>

            <button
              onClick={() => handleNavClick('assistant')}
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-1"
            >
              <Bot className="w-3 h-3" />
              <span>{t.navAssistant}</span>
            </button>

            {onOpenWaterfalls && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenWaterfalls}
                  className="text-cyan-300 hover:text-white font-bold flex items-center space-x-1 px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-400/40 transition-colors cursor-pointer"
                  title="Explore All Waterfalls across Bagalkote's 9 Taluks"
                >
                  <Droplets className="w-3 h-3 text-cyan-400 animate-pulse" />
                  <span>{language === 'kn' ? 'ಜಲಪಾತಗಳು' : language === 'hi' ? 'जलप्रपात' : 'Waterfalls'}</span>
                </button>
              </>
            )}

            <span>|</span>

            {/* Trilingual Language Selector Pills */}
            {onSelectLanguage && (
              <div className="flex items-center space-x-1 bg-black/50 p-0.5 rounded-lg border border-gray-700">
                {(['en', 'kn', 'hi'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => onSelectLanguage(l)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                      language === l
                        ? 'bg-amber-500 text-gray-950 shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {l === 'en' ? 'EN' : l === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}
                  </button>
                ))}
              </div>
            )}

            {/* Theme Selector Dropdown in Top Banner */}
            {onSelectTheme && (
              <div className="relative" ref={themeMenuRef}>
                <button
                  type="button"
                  onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                  className="flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-white transition-colors text-[10px] font-bold cursor-pointer"
                  title="Change Background Theme / ಹಿನ್ನೆಲೆ ಥೀಮ್ ಬದಲಾಯಿಸಿ / बैकग्राउंड थीम बदलें"
                >
                  <Palette className="w-3 h-3 text-amber-400" />
                  <span>{THEMES_METADATA[theme]?.icon}</span>
                  <span className="hidden lg:inline">{THEMES_METADATA[theme]?.name[language]}</span>
                </button>

                {themeDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0f172a]/95 backdrop-blur-xl border border-gray-700 shadow-2xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2.5 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-800 flex items-center justify-between">
                      <span>
                        {language === 'kn'
                          ? 'ಹಿನ್ನೆಲೆ ಥೀಮ್ ಆಯ್ಕೆಮಾಡಿ'
                          : language === 'hi'
                          ? 'बैकग्राउंड थीम चुनें'
                          : 'Select Heritage Theme'}
                      </span>
                      <Palette className="w-3 h-3 text-amber-400" />
                    </div>
                    {(Object.keys(THEMES_METADATA) as AppTheme[]).map((tKey) => {
                      const tMeta = THEMES_METADATA[tKey];
                      const isSelected = theme === tKey;
                      return (
                        <button
                          key={tKey}
                          type="button"
                          onClick={() => {
                            onSelectTheme(tKey);
                            setThemeDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/20 border border-amber-500/50 text-white font-bold'
                              : 'hover:bg-white/10 text-gray-300 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className="text-base">{tMeta.icon}</span>
                            <div className="text-left">
                              <div className="font-semibold text-xs leading-tight">
                                {tMeta.name[language] || tMeta.name.en}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <div
                              className="w-3 h-3 rounded-full border border-white/40 shadow-sm"
                              style={{ backgroundColor: tMeta.accentHex }}
                            />
                            {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Tech Yoddhas Brand Logo & Tagline */}
          <button
            id="navbar-brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 sm:space-x-3 text-left group focus:outline-none shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-amber-500/25 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-[#0d121c] rounded-[14px] flex items-center justify-center">
                <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-extrabold tracking-tight text-sm sm:text-base md:text-lg text-white font-serif">
                  BAGALKOT TOURISM
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  TECH YODDHAS
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-amber-300/80 hidden sm:block font-serif italic">
                {language === 'kn'
                  ? '"ಬಾಗಲಕೋಟೆ ಐತಿಹಾಸಿಕ ಪರಂಪರೆಗೆ ನಿಮ್ಮ ಜಾಣ ಗವಾಕ್ಷಿ"'
                  : language === 'hi'
                  ? '"बागलकोट की ऐतिहासिक धरोहर का स्मार्ट प्रवेश द्वार"'
                  : '"Discover the Heritage Heart of North Karnataka"'}
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
<<<<<<< HEAD
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || (item.id === 'explore' && currentTab === 'details');
=======
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
<<<<<<< HEAD
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-[#0f141d] font-bold shadow-md shadow-amber-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0f141d]' : 'text-amber-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More Menu Dropdown or quick links */}
            <div className="relative group pl-1">
              <button
                id="nav-more-btn"
                className="px-2.5 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg flex items-center space-x-1"
              >
                <span>More</span>
                <span className="text-xs text-amber-400">▾</span>
              </button>
              <div className="absolute right-0 mt-1 w-48 bg-[#161d2b] border border-amber-500/30 rounded-xl shadow-2xl py-2 hidden group-hover:block transition-all">
                {navLinks.slice(6).map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`nav-more-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center space-x-2 px-4 py-2 text-sm text-left ${
                        isActive ? 'text-amber-400 bg-amber-500/10 font-bold' : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-amber-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Right Action Controls: Language + Competition Demo Button */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="flex items-center bg-[#182030] border border-gray-700/80 rounded-lg p-0.5 text-xs font-semibold">
              <button
                id="lang-btn-en"
                onClick={() => onSelectLanguage('en')}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  language === 'en'
                    ? 'bg-amber-500 text-gray-950 font-bold shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                id="lang-btn-kn"
                onClick={() => onSelectLanguage('kn')}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  language === 'kn'
                    ? 'bg-amber-500 text-gray-950 font-bold shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
                title="ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ"
              >
                ಕನ್ನಡ
              </button>
              <button
                id="lang-btn-hi"
                onClick={() => onSelectLanguage('hi')}
                className={`px-2.5 py-1.5 rounded-md transition-colors ${
                  language === 'hi'
                    ? 'bg-amber-500 text-gray-950 font-bold shadow'
                    : 'text-gray-300 hover:text-white'
                }`}
                title="हिन्दी में बदलें"
              >
                हिन्दी
              </button>
            </div>

            {/* Competition Demo Mode Button */}
            <button
              id="competition-demo-header-btn"
              onClick={onOpenCompetitionDemo}
              className="relative group overflow-hidden px-3.5 py-2 rounded-lg bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 hover:shadow-amber-500/50 hover:scale-[1.02] transition-all flex items-center space-x-1.5 border border-amber-300/40"
            >
              <Sparkles className="w-4 h-4 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{t.startDemoButton}</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
=======
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? item.isAssistant
                        ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                        : 'bg-amber-500 text-gray-950 font-bold shadow-md shadow-amber-500/20'
                      : item.isAssistant
                      ? 'text-purple-300 hover:text-white bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/30'
                      : item.highlight
                      ? 'text-amber-300 hover:text-white bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: AI Voice Assistant, AI Identify, Language switcher & Mobile Toggle */}
          <div className="flex items-center space-x-2">
            {/* Direct AI Assistant Button - hidden on xs to prevent mobile cramming */}
            <button
              id="navbar-ai-assistant-btn"
              onClick={() => handleNavClick('assistant')}
              className={`hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeSection === 'assistant'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 hover:border-purple-400'
              }`}
              title="AI Heritage Voice Assistant"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span className="hidden lg:inline">{t.navAssistant}</span>
            </button>

            {/* Dedicated AI Identify Quick Action */}
            <button
              id="navbar-identify-btn"
              onClick={() => handleNavClick('identify')}
              className="flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-105"
              title="AI Architectural Analysis"
            >
              <Sparkles className="w-4 h-4 text-gray-950" />
              <span>{t.recTitle}</span>
            </button>

            {/* Universal Language Switcher - visible across tablet & desktop, integrated into mobile menu on phone */}
            {onSelectLanguage && (
              <div className="hidden sm:flex items-center space-x-0.5 bg-[#141b28] p-1 rounded-xl border border-gray-750 shadow-inner">
                <Globe className="w-3.5 h-3.5 text-amber-400 mx-1 hidden md:inline" />
                {(['en', 'kn', 'hi'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => onSelectLanguage(l)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      language === l
                        ? 'bg-amber-500 text-gray-950 shadow-sm font-extrabold'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    title={l === 'en' ? 'English' : l === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}
                  >
                    {l === 'en' ? 'EN' : l === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}
                  </button>
                ))}
              </div>
            )}

            {/* Quick Theme Cycle Toggle Button - visible on all screens (mobile & desktop) */}
            {onSelectTheme && (
              <button
                id="navbar-theme-quick-btn"
                type="button"
                onClick={() => {
                  const themeKeys: AppTheme[] = ['sandstone-gold', 'agastya-night', 'emerald-monsoon', 'royal-amethyst'];
                  const nextIdx = (themeKeys.indexOf(theme) + 1) % themeKeys.length;
                  onSelectTheme(themeKeys[nextIdx]);
                }}
                className="flex items-center space-x-1 sm:space-x-1.5 px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl bg-[#141b28] hover:bg-[#1a2334] border border-amber-500/30 text-gray-300 hover:text-white transition-all text-xs font-semibold cursor-pointer shadow-sm"
                title={`${language === 'kn' ? 'ಥೀಮ್ ಬದಲಾಯಿಸಿ: ' : language === 'hi' ? 'थीम बदलें: ' : 'Switch Theme: '}${THEMES_METADATA[theme]?.name[language]}`}
              >
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-sm leading-none">{THEMES_METADATA[theme]?.icon}</span>
                <span className="hidden 2xl:inline text-[11px] font-medium text-amber-300">
                  {THEMES_METADATA[theme]?.name[language]}
                </span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-xl bg-[#151c2a] border border-gray-750 text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6 text-amber-400" />}
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
            </button>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121824] border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Language Switcher */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-800">
            <span className="text-xs text-gray-400 font-medium">Select Language:</span>
            <div className="flex space-x-1">
              {(['en', 'kn', 'hi'] as Language[]).map((l) => (
                <button
                  key={l}
                  id={`mobile-lang-${l}`}
                  onClick={() => onSelectLanguage(l)}
                  className={`px-3 py-1 text-xs rounded font-bold ${
                    language === l ? 'bg-amber-500 text-gray-950' : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {l === 'en' ? 'English' : l === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || (item.id === 'explore' && currentTab === 'details');
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-semibold text-left ${
                    isActive ? 'bg-amber-500 text-gray-950' : 'bg-white/5 text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
=======
      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0e1420] border-b border-gray-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Language Switcher */}
          {onSelectLanguage && (
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#151d2c] border border-gray-800">
              <span className="text-xs text-gray-400 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Language / ಭಾಷೆ / भाषा:</span>
              </span>
              <div className="flex items-center space-x-1">
                {(['en', 'kn', 'hi'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => onSelectLanguage(l)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      language === l
                        ? 'bg-amber-500 text-gray-950 shadow'
                        : 'bg-black/40 text-gray-300 hover:text-white'
                    }`}
                  >
                    {l === 'en' ? 'English' : l === 'kn' ? 'ಕನ್ನಡ' : 'हिन्दी'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Theme Switcher */}
          {onSelectTheme && (
            <div className="p-2.5 rounded-xl bg-[#151d2c] border border-gray-800 space-y-2">
              <div className="text-xs text-gray-400 flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'kn' ? 'ಹಿನ್ನೆಲೆ ಥೀಮ್ / Theme:' : language === 'hi' ? 'बैकग्राउंड थीम / Theme:' : 'Heritage Background Theme:'}</span>
                </span>
                <span className="text-[11px] font-bold text-amber-400">
                  {THEMES_METADATA[theme]?.icon}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(THEMES_METADATA) as AppTheme[]).map((tKey) => {
                  const meta = THEMES_METADATA[tKey];
                  const isSel = theme === tKey;
                  return (
                    <button
                      key={tKey}
                      type="button"
                      onClick={() => onSelectTheme(tKey)}
                      className={`flex items-center space-x-2 px-2.5 py-2 rounded-lg text-[11px] font-medium transition-all ${
                        isSel
                          ? 'bg-amber-500 text-gray-950 font-bold shadow'
                          : 'bg-black/40 text-gray-300 hover:text-white border border-gray-800'
                      }`}
                    >
                      <span className="text-sm">{meta.icon}</span>
                      <span className="truncate">{meta.name[language]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    isActive
                      ? 'bg-amber-500 text-gray-950 font-bold shadow'
                      : 'bg-[#151d2c] text-gray-200 hover:text-white border border-gray-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gray-950' : 'text-amber-400'}`} />
                  <span className="line-clamp-1">{item.label}</span>
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
                </button>
              );
            })}
          </div>

<<<<<<< HEAD
          <button
            id="mobile-competition-demo-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCompetitionDemo();
            }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>{t.startDemoButton}</span>
          </button>
=======
          <div className={`pt-2 border-t border-gray-800 grid ${onOpenHDIntro ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
            <button
              onClick={() => {
                handleNavClick('identify');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-amber-500 text-gray-950 text-xs font-bold shadow"
            >
              <Sparkles className="w-4 h-4 text-gray-950" />
              <span>{t.recTitle}</span>
            </button>

            <button
              onClick={() => handleNavClick('assistant')}
              className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold"
            >
              <Bot className="w-4 h-4" />
              <span>{t.navAssistant}</span>
            </button>

            {onOpenHDIntro && (
              <button
                onClick={() => {
                  onOpenHDIntro();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.hdIntroButton}</span>
              </button>
            )}
          </div>
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
        </div>
      )}
    </header>
  );
};
