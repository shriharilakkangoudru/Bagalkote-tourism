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
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || (item.id === 'explore' && currentTab === 'details');
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
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
            </button>
          </div>
        </div>
      </div>

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
                </button>
              );
            })}
          </div>

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
        </div>
      )}
    </header>
  );
};
