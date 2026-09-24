import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MonumentRecognition } from './components/MonumentRecognition';
import { MonumentDetailsView } from './components/MonumentDetailsView';
import { AIAssistant } from './components/AIAssistant';
import { TripPlanner } from './components/TripPlanner';
import { TourismMap } from './components/TourismMap';
import { ExploreHeritage } from './components/ExploreHeritage';
import { TouristServices } from './components/TouristServices';
import { AdminDashboard } from './components/AdminDashboard';
import { AboutProject } from './components/AboutProject';
import { Footer } from './components/Footer';
import { CompetitionDemoModal } from './components/CompetitionDemoModal';
import { Language, Monument, RecognitionResult } from './types';
import { MONUMENTS } from './data/monumentsData';
import { VERIFIED_IMAGES } from './data/verifiedImages';
import { handleImageError } from './utils/imageUtils';
import { Camera, Compass, Bot, Map, Calendar, ShieldAlert, Sparkles, ArrowRight, Eye, CheckCircle2, Landmark, Clock, Navigation } from 'lucide-react';
import { TRANSLATIONS } from './data/translations';

export type AppTab =
  | 'home'
  | 'identify'
  | 'details'
  | 'assistant'
  | 'planner'
  | 'map'
  | 'explore'
  | 'services'
  | 'admin'
  | 'about';

// Deep-link parser to synchronize tab & monument state on initial load or popstate
const parseLocationState = (): { tab: AppTab; monument?: Monument } => {
  try {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash) return { tab: 'home' };
    const [tabPart, queryPart] = hash.split('?');
    const validTabs: AppTab[] = [
      'home',
      'identify',
      'details',
      'assistant',
      'planner',
      'map',
      'explore',
      'services',
      'admin',
      'about',
    ];
    const tab = validTabs.includes(tabPart as AppTab) ? (tabPart as AppTab) : 'home';
    let monument: Monument | undefined;
    if (queryPart) {
      const params = new URLSearchParams(queryPart);
      const mId = params.get('monument');
      if (mId) {
        monument = MONUMENTS.find((m) => m.id === mId);
      }
    }
    return { tab, monument };
  } catch {
    return { tab: 'home' };
=======
import { Navbar, MainNavSection } from './components/Navbar';
import { Hero } from './components/Hero';
import { DestinationCard } from './components/DestinationCard';
import { DestinationGrid } from './components/DestinationGrid';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { HeritageSection } from './components/HeritageSection';
import { BagalkotRouteMap } from './components/BagalkotRouteMap';
import { RouteCard } from './components/RouteCard';
import { ItineraryCard } from './components/ItineraryCard';
import { ExperienceCard } from './components/ExperienceCard';
import { FoodAndCultureSection } from './components/FoodAndCultureSection';
import { EventsSection } from './components/EventsSection';
import { TravelGuideSection } from './components/TravelGuideSection';
import { GallerySection } from './components/GallerySection';
import { StoriesSection } from './components/StoriesSection';
import { TouristResourcesSection } from './components/TouristResourcesSection';
import { AboutBagalkotSection } from './components/AboutBagalkotSection';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MobileNavigationDock } from './components/MobileNavigationDock';

// Preserve existing AI modules
import { MonumentRecognition } from './components/MonumentRecognition';
import { AIAssistant } from './components/AIAssistant';
import { TripPlanner } from './components/TripPlanner';
import { BadamiCavesExplorer } from './components/BadamiCavesExplorer';
import { BagalkotWaterfallsExplorer } from './components/BagalkotWaterfallsExplorer';
import { AnimatedHeritageBackground } from './components/AnimatedHeritageBackground';

// Data imports
import { DESTINATIONS, Destination } from './data/destinations';
import { TOURISM_ROUTES } from './data/routes';
import { CURATED_ITINERARIES } from './data/itineraries';
import { EXPERIENCES } from './data/experiences';
import { MONUMENTS } from './data/monumentsData';
import { ALL_BAGALKOT_WATERFALLS } from './data/waterfallsData';
import { Language, Monument, AppTheme } from './types';
import { ArrowRight, Compass, Route, Calendar, Utensils, BookOpen, ShieldCheck, Landmark, Sparkles, MapPin, Droplets, Waves } from 'lucide-react';

export type AppSection =
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

const parseHash = (): { section: AppSection; destId?: string } => {
  try {
    const raw = window.location.hash.replace(/^#\/?/, '');
    if (!raw) return { section: 'home' };
    const [sectionPart, queryPart] = raw.split('?');
    const validSections: AppSection[] = [
      'home',
      'destinations',
      'heritage',
      'things-to-do',
      'route-map',
      'food-culture',
      'events',
      'travel-guide',
      'gallery',
      'about',
      'identify',
      'assistant',
      'planner',
    ];
    const section = validSections.includes(sectionPart as AppSection)
      ? (sectionPart as AppSection)
      : 'home';
    let destId: string | undefined;
    if (queryPart) {
      const params = new URLSearchParams(queryPart);
      destId = params.get('dest') || undefined;
    }
    return { section, destId };
  } catch {
    return { section: 'home' };
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
  }
};

export default function App() {
<<<<<<< HEAD
  const [activeTab, setActiveTab] = useState<AppTab>(() => parseLocationState().tab);
  const [language, setLanguage] = useState<Language>('en');
  const [selectedMonument, setSelectedMonument] = useState<Monument>(() => {
    return (
      parseLocationState().monument ||
      MONUMENTS.find((m) => m.id === 'virupaksha-pattadakal') ||
      MONUMENTS[0]
    );
  });
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  const t = TRANSLATIONS[language];

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Synchronize URL hash with activeTab and selectedMonument
  useEffect(() => {
    const hash =
      activeTab === 'details'
        ? `#details?monument=${selectedMonument.id}`
        : `#${activeTab}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  }, [activeTab, selectedMonument.id]);

  // Synchronize state on browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const { tab, monument } = parseLocationState();
      setActiveTab(tab);
      if (monument) {
        setSelectedMonument(monument);
=======
  const [activeSection, setActiveSection] = useState<AppSection>(() => parseHash().section);
  const [language, setLanguage] = useState<Language>('en');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(() => {
    const parsed = parseHash();
    if (parsed.destId) {
      return DESTINATIONS.find((d) => d.id === parsed.destId) || null;
    }
    return null;
  });
  const [focusedRouteId, setFocusedRouteId] = useState<string | null>(null);
  const [showAllCavesModal, setShowAllCavesModal] = useState<boolean>(false);
  const [showWaterfallsModal, setShowWaterfallsModal] = useState<boolean>(false);
  const [theme, setTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem('bagalkot_app_theme') as AppTheme;
      if (saved && ['sandstone-gold', 'agastya-night', 'emerald-monsoon', 'royal-amethyst'].includes(saved)) {
        return saved;
      }
    } catch {}
    return 'sandstone-gold';
  });

  const [selectedWaterfallId, setSelectedWaterfallId] = useState<string | undefined>(undefined);

  // Sync theme to localStorage, HTML data-theme, meta theme-color, and body background
  useEffect(() => {
    try {
      localStorage.setItem('bagalkot_app_theme', theme);
    } catch {}
    document.documentElement.setAttribute('data-theme', theme);
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const colorMap: Record<AppTheme, { accent: string; bg: string }> = {
      'sandstone-gold': { accent: '#f59e0b', bg: '#0d0c10' },
      'agastya-night': { accent: '#38bdf8', bg: '#040814' },
      'emerald-monsoon': { accent: '#10b981', bg: '#04120e' },
      'royal-amethyst': { accent: '#a855f7', bg: '#0e0717' },
    };
    const currentThemeInfo = colorMap[theme] || colorMap['sandstone-gold'];
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', currentThemeInfo.accent);
    }
    document.body.style.backgroundColor = currentThemeInfo.bg;
  }, [theme]);

  const handleOpenWaterfalls = (waterfallId?: string) => {
    setSelectedWaterfallId(waterfallId);
    setShowWaterfallsModal(true);
  };

  // Sync hash on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const hash =
      selectedDestination && activeSection === 'destinations'
        ? `#destinations?dest=${selectedDestination.id}`
        : `#${activeSection}`;
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
  }, [activeSection, selectedDestination]);

  // Handle browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const { section, destId } = parseHash();
      setActiveSection(section);
      if (destId) {
        const found = DESTINATIONS.find((d) => d.id === destId);
        if (found) setSelectedDestination(found);
      } else {
        setSelectedDestination(null);
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

<<<<<<< HEAD
  // Handlers for cross-component workflows ensuring immediate prop synchronization
  const handleSelectMonumentAndExplore = (monumentOrId: Monument | string) => {
    const target =
      typeof monumentOrId === 'string'
        ? MONUMENTS.find((m) => m.id === monumentOrId) || selectedMonument
        : monumentOrId;
    setSelectedMonument(target);
    setActiveTab('details');
  };

  const handleAskAiAboutMonument = (monumentOrId: Monument | string) => {
    const target =
      typeof monumentOrId === 'string'
        ? MONUMENTS.find((m) => m.id === monumentOrId) || selectedMonument
        : monumentOrId;
    setSelectedMonument(target);
    setActiveTab('assistant');
  };

  const handlePlanVisitToMonument = (monumentOrId: Monument | string) => {
    const target =
      typeof monumentOrId === 'string'
        ? MONUMENTS.find((m) => m.id === monumentOrId) || selectedMonument
        : monumentOrId;
    setSelectedMonument(target);
    setActiveTab('planner');
  };

  const handleViewMonumentOnMap = (monumentOrId: Monument | string) => {
    const target =
      typeof monumentOrId === 'string'
        ? MONUMENTS.find((m) => m.id === monumentOrId) || selectedMonument
        : monumentOrId;
    setSelectedMonument(target);
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen bg-[#0d121c] text-white flex flex-col font-sans selection:bg-amber-500 selection:text-gray-950">
      {/* Top Navigation */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab as any)}
        language={language}
        onSelectLanguage={setLanguage}
        onOpenCompetitionDemo={() => setIsDemoModalOpen(true)}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-16 pb-20">
            {/* Hero Section with Live Stats & CTAs */}
            <Hero
              language={language}
              onIdentifyClick={() => setActiveTab('identify')}
              onExploreClick={() => setActiveTab('explore')}
              onOpenCompetitionDemo={() => setIsDemoModalOpen(true)}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              {/* Feature Highlights Grid */}
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                    Core Capabilities
                  </span>
                  <h2 className="text-3xl font-extrabold font-serif text-white tracking-tight">
                    Smart Tourism Features
                  </h2>
                  <p className="text-gray-300 text-sm max-w-xl mx-auto">
                    Experience Bagalkote through cutting-edge multimodal vision, voice AI assistance, and synchronized travel itineraries.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: AI Recognition */}
                  <div
                    onClick={() => setActiveTab('identify')}
                    className="p-6 rounded-3xl bg-[#141b28] border border-gray-800 hover:border-amber-500/50 cursor-pointer shadow-xl transition-all group space-y-4 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold font-serif text-white group-hover:text-amber-300">
                        AI Monument Recognition
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Snap or upload a photo of any facade to instantly identify the monument and architectural period.
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs font-bold text-amber-400 pt-2">
                      <span>Try Scanner</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 2: AI Voice Assistant */}
                  <div
                    onClick={() => setActiveTab('assistant')}
                    className="p-6 rounded-3xl bg-[#141b28] border border-gray-800 hover:border-purple-500/50 cursor-pointer shadow-xl transition-all group space-y-4 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold font-serif text-white group-hover:text-purple-300">
                        Multilingual Voice AI
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Ask deep questions in Kannada, Hindi, or English with browser voice input and spoken audio narration.
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs font-bold text-purple-400 pt-2">
                      <span>Start Conversation</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 3: Smart Planner */}
                  <div
                    onClick={() => setActiveTab('planner')}
                    className="p-6 rounded-3xl bg-[#141b28] border border-gray-800 hover:border-emerald-500/50 cursor-pointer shadow-xl transition-all group space-y-4 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold font-serif text-white group-hover:text-emerald-300">
                        Smart Trip Planner
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Enter your days, budget, and travel interests to generate an hour-by-hour timeline with cost breakdowns.
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs font-bold text-emerald-400 pt-2">
                      <span>Plan My Journey</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Card 4: Tourism Map */}
                  <div
                    onClick={() => setActiveTab('map')}
                    className="p-6 rounded-3xl bg-[#141b28] border border-gray-800 hover:border-sky-500/50 cursor-pointer shadow-xl transition-all group space-y-4 hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Map className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold font-serif text-white group-hover:text-sky-300">
                        Interactive Map
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Visualize the Malaprabha River circuit, calculate travel times, and launch one-click Google Maps navigation.
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs font-bold text-sky-400 pt-2">
                      <span>Explore Circuits</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Spotlight: The Golden Triangle (Badami • Pattadakal • Aihole) */}
              <div className="bg-[#141a27] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-800">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      The Bagalkote Golden Triangle
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-1">
                      Vatapi, Raktapura & Aryapura
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
                      Over 150 stone sanctuaries built between 540 CE and 757 CE that defined the foundations of classical Indian architecture.
=======
  const handleOpenDestinationDossier = (dest: Destination) => {
    setSelectedDestination(dest);
  };

  const handleCloseDestinationDossier = () => {
    setSelectedDestination(null);
  };

  const handleViewDestinationOnMap = (dest: Destination) => {
    setSelectedDestination(null);
    setActiveSection('route-map');
  };

  const handleFocusRouteAndNavigate = (routeId: string) => {
    setFocusedRouteId(routeId);
    setActiveSection('route-map');
  };

  // Top featured destinations for homepage Section 1
  const featuredDestinations = DESTINATIONS.slice(0, 6);

  return (
    <div className="min-h-screen relative text-white flex flex-col font-sans selection:bg-amber-500 selection:text-gray-950 pb-20 sm:pb-0 overflow-x-hidden">
      {/* Dynamic Heritage Background with 4 selectable themes */}
      <AnimatedHeritageBackground theme={theme} />

      {/* Top Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={(sec) => setActiveSection(sec as AppSection)}
        language={language}
        onSelectLanguage={setLanguage}
        theme={theme}
        onSelectTheme={setTheme}
        onOpenWaterfalls={() => handleOpenWaterfalls()}
      />

      {/* Main View Container */}
      <main className="flex-1 relative z-10">
        <ErrorBoundary onReset={() => setActiveSection('home')}>
          {/* VIEW 1: HOME PORTAL */}
        {activeSection === 'home' && (
          <div className="space-y-24 pb-24">
            {/* Cinematic Hero */}
            <Hero
              onExploreDestinations={() => setActiveSection('destinations')}
              onExploreRouteMap={() => setActiveSection('route-map')}
              onLaunchAssistant={() => setActiveSection('assistant')}
              onOpenAllCaves={() => setShowAllCavesModal(true)}
              onOpenWaterfalls={() => handleOpenWaterfalls()}
              language={language}
            />

            <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 space-y-24">
              {/* SECTION 1 — EXPLORE BAGALKOT */}
              <section id="section-explore-bagalkot" className="space-y-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Landmark className="w-4 h-4" />
                      Section 1 • Major Tourism Destinations
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
                      Explore Bagalkot District
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                      Discover the crown jewels of North Karnataka: Badami rock caves, Pattadakal UNESCO temples, Aihole architecture, Kudalasangama river confluence, Almatti Dam, and Banashankari.
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
                    </p>
                  </div>

                  <button
<<<<<<< HEAD
                    onClick={() => setActiveTab('explore')}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 flex items-center space-x-2 transition-colors"
                  >
                    <span>View All 25+ Monuments</span>
=======
                    onClick={() => setActiveSection('destinations')}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 flex items-center space-x-2 transition-colors self-start md:self-auto"
                  >
                    <span>View All 13+ Destinations</span>
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>

<<<<<<< HEAD
                {/* 3 Featured Cluster Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Badami */}
                  <div
                    onClick={() => {
                      const m = MONUMENTS.find((x) => x.id === 'badami-caves') || MONUMENTS[0];
                      handleSelectMonumentAndExplore(m);
                    }}
                    className="group bg-[#1a2232] border border-gray-800 hover:border-amber-500/50 rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={VERIFIED_IMAGES.badamiCaves}
                        alt="Badami Cave Temples"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => handleImageError(e, VERIFIED_IMAGES.defaultFallback)}
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-amber-300 text-xs font-bold">
                        Badami
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="text-lg font-bold font-serif text-white group-hover:text-amber-300">
                        Badami Cave Temples
                      </h4>
                      <p className="text-xs text-gray-300 line-clamp-2">
                        Four magnificent 6th-century rock-cut monolithic caves carved into dramatic red sandstone cliffs above Agastya Lake.
                      </p>
                      <span className="text-[11px] text-amber-400 font-semibold block pt-1">
                        Explore Rock Architecture →
                      </span>
                    </div>
                  </div>

                  {/* Pattadakal */}
                  <div
                    onClick={() => {
                      const m = MONUMENTS.find((x) => x.id === 'virupaksha-pattadakal') || MONUMENTS[0];
                      handleSelectMonumentAndExplore(m);
                    }}
                    className="group bg-[#1a2232] border border-gray-800 hover:border-amber-500/50 rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={VERIFIED_IMAGES.virupaksha}
                        alt="Virupaksha Temple Pattadakal"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => handleImageError(e, VERIFIED_IMAGES.defaultFallback)}
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-amber-500 text-gray-950 text-xs font-extrabold">
                        UNESCO Site
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="text-lg font-bold font-serif text-white group-hover:text-amber-300">
                        Pattadakal Royal Temples
                      </h4>
                      <p className="text-xs text-gray-300 line-clamp-2">
                        The coronation holy ground uniting Dravidian and Nagara temples, commissioned by royal Chalukya queens.
                      </p>
                      <span className="text-[11px] text-amber-400 font-semibold block pt-1">
                        Explore UNESCO Monument →
                      </span>
                    </div>
                  </div>

                  {/* Aihole */}
                  <div
                    onClick={() => {
                      const m = MONUMENTS.find((x) => x.id === 'durga-temple-aihole') || MONUMENTS[0];
                      handleSelectMonumentAndExplore(m);
                    }}
                    className="group bg-[#1a2232] border border-gray-800 hover:border-amber-500/50 rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-all"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={VERIFIED_IMAGES.durgaTemple}
                        alt="Durga Temple Aihole"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => handleImageError(e, VERIFIED_IMAGES.defaultFallback)}
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-emerald-300 text-xs font-bold">
                        Aihole
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="text-lg font-bold font-serif text-white group-hover:text-amber-300">
                        Durga Temple & Aihole
                      </h4>
                      <p className="text-xs text-gray-300 line-clamp-2">
                        Celebrated apsidal laboratory sanctum featuring 120 stone structures built by ancient artisan guilds.
                      </p>
                      <span className="text-[11px] text-amber-400 font-semibold block pt-1">
                        Explore Architecture Cradle →
                      </span>
                    </div>
                  </div>
                </div>
=======
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredDestinations.map((destination) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                      onExplore={handleOpenDestinationDossier}
                      onViewOnMap={handleViewDestinationOnMap}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION 2 — HERITAGE OF BAGALKOT */}
              <section id="section-heritage" className="space-y-8 pt-6 border-t border-gray-800/80">
                <HeritageSection
                  onExploreDestinations={() => setActiveSection('destinations')}
                  onExploreRouteMap={() => setActiveSection('route-map')}
                />
              </section>

              {/* SECTION: WATERFALLS & HIDDEN CASCADES OF BAGALKOT */}
              <section id="section-waterfalls" className="space-y-10 pt-6 border-t border-gray-800/80">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-cyan-400 animate-bounce" />
                      {language === 'kn'
                        ? 'ವಿಶೇಷ ವಿಭಾಗ • ೧೦೦% ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ (ಎಲ್ಲಾ ೯ ತಾಲೂಕುಗಳು)'
                        : language === 'hi'
                        ? 'विशेष अनुभाग • 100% बागलकोट जिला (सभी 9 तालुक)'
                        : 'Featured Explorer • 100% Bagalkote District (All 9 Taluks)'}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
                      {language === 'kn'
                        ? 'ಬಾಗಲಕೋಟೆಯ ಜಲಪಾತಗಳು ಮತ್ತು ಗುಪ್ತ ಜಲಧಾರೆಗಳು'
                        : language === 'hi'
                        ? 'बागलकोट के जलप्रपात एवं गुप्त प्राकृतिक झरने'
                        : 'Waterfalls & Hidden Cascades of Bagalkote'}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                      {language === 'kn'
                        ? 'ಬಾದಾಮಿಯ ಅಕ್ಕ-ತಂಗಿಯರ ಜಲಪಾತ, ಗುಳೇದಗುಡ್ಡದ ಗುಪ್ತ ದಿಡುಗಿನ ಜಲಪಾತ, ಧಮ್ಮೂರು ಜಲಪಾತ, ಮಹಾಕೂಟದ ನೈಸರ್ಗಿಕ ಜಲಬುಗ್ಗೆ ಹಾಗೂ ಎಲ್ಲಾ ೯ ತಾಲೂಕುಗಳ ರಮಣೀಯ ಜಲಧಾರೆಗಳು.'
                        : language === 'hi'
                        ? 'बादामी का अक्का-तंगी झरना, गुलेदगुड्डा का गुप्त दिदुगु फॉल्स, धम्मूर झरना, महाकूट का प्राकृतिक जलस्रोत तथा सभी 9 तालुकों के मनोहारी जलप्रपात।'
                        : 'Discover seasonal cliff drops, secret forest cascades, perennial sacred springs, and river rapids across Badami, Guledgudda, Bagalkote, Bilagi, Hungund, Ilkal, Mudhol, Jamkhandi, and Rabkavi Banhatti.'}
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenWaterfalls()}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-gray-950 text-xs font-bold flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20 self-start md:self-auto cursor-pointer"
                  >
                    <Droplets className="w-3.5 h-3.5 fill-current" />
                    <span>
                      {language === 'kn'
                        ? 'ಜಲಪಾತ ಪರಿಶೋಧಕ ತೆರೆಯಿರಿ'
                        : language === 'hi'
                        ? 'जलप्रपात एक्सप्लोरर खोलें'
                        : 'Launch Waterfalls Explorer (11+ Falls)'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 4 Featured Waterfall Teasers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ALL_BAGALKOT_WATERFALLS.slice(0, 4).map((waterfall) => (
                    <div
                      key={waterfall.id}
                      onClick={() => handleOpenWaterfalls(waterfall.id)}
                      className="group rounded-2xl overflow-hidden bg-[#10192a] border border-cyan-500/25 hover:border-cyan-400/60 transition-all duration-300 cursor-pointer flex flex-col hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-950/40"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                        <img
                          src={waterfall.image}
                          alt={waterfall.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = '/images/monuments/bhutanatha.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                        <div className="absolute top-2 left-2 flex gap-1">
                          <span className="px-2 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-400/40 text-cyan-300 text-[10px] font-bold">
                            {waterfall.taluk} Taluk
                          </span>
                          {waterfall.isHiddenGem && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/30 border border-amber-400/50 text-amber-200 text-[10px] font-bold flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                              <span>Hidden Gem</span>
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[11px] text-gray-200 font-mono">
                          <span className="text-cyan-300 font-bold">{waterfall.dropHeight}</span>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <h4 className="text-sm font-bold font-serif text-white group-hover:text-cyan-300 transition-colors">
                            {language === 'kn'
                              ? waterfall.kannadaName
                              : language === 'hi'
                              ? waterfall.hindiName
                              : waterfall.name}
                          </h4>
                          <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">
                            {waterfall.description[language] || waterfall.description.en}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-[11px]">
                          <span className="text-emerald-400 font-semibold">{waterfall.bestMonths}</span>
                          <span className="text-cyan-400 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                            <span>Photos & Audio</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 3 — BAGALKOT DISTRICT ROUTE MAP TEASER & CARDS */}
              <section id="section-routes" className="space-y-10 pt-6 border-t border-gray-800/80">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Route className="w-4 h-4" />
                      Section 3 • Interactive Circuit Explorer
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
                      Bagalkot District Route Map
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                      Dedicated interactive travel routes connecting Bagalkot, Badami, Pattadakal, Aihole, Mahakuta, Kudalasangama, and Almatti with verified coordinates.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveSection('route-map')}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 text-xs font-bold flex items-center space-x-2 transition-colors self-start md:self-auto"
                  >
                    <span>Launch Full Interactive Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Embedded Leaflet Map */}
                <BagalkotRouteMap
                  onSelectDestination={handleOpenDestinationDossier}
                  focusedRouteId={focusedRouteId}
                />

                {/* 4 Suggested Routes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {TOURISM_ROUTES.map((route) => (
                    <RouteCard
                      key={route.id}
                      route={route}
                      onExploreRoute={handleFocusRouteAndNavigate}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION 4 — PLAN YOUR JOURNEY */}
              <section id="section-itineraries" className="space-y-10 pt-6 border-t border-gray-800/80">
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Section 4 • Tailored Itineraries
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
                    Plan Your Journey in Bagalkot
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Curated morning-to-evening travel itineraries designed for express day-trips, weekend breaks, and complete 3-day heritage expeditions.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {CURATED_ITINERARIES.map((itinerary) => (
                    <ItineraryCard
                      key={itinerary.id}
                      itinerary={itinerary}
                      onSelectRoute={handleFocusRouteAndNavigate}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION 5 — EXPERIENCES */}
              <section id="section-experiences" className="space-y-10 pt-6 border-t border-gray-800/80">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-800 pb-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-4 h-4" />
                      Section 5 • Travel Themes
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
                      Things to Do & Experiences
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
                      From rock-cut architectural walks and spiritual confluences to landscape photography, family leisure, and authentic culinary trails.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveSection('things-to-do')}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 flex items-center space-x-2 transition-colors self-start md:self-auto"
                  >
                    <span>View All Experiences</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {EXPERIENCES.map((exp) => (
                    <ExperienceCard
                      key={exp.id}
                      experience={exp}
                      onExploreCategory={() => setActiveSection('things-to-do')}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION 6 — FOOD & CULTURE */}
              <section id="section-food-culture" className="space-y-8 pt-6 border-t border-gray-800/80">
                <FoodAndCultureSection />
              </section>

              {/* SECTION 7 — EVENTS & FESTIVALS */}
              <section id="section-events" className="space-y-8 pt-6 border-t border-gray-800/80">
                <EventsSection />
              </section>

              {/* SECTION 8 — TRAVEL GUIDE PREVIEW */}
              <section id="section-travel-guide" className="space-y-8 pt-6 border-t border-gray-800/80">
                <TravelGuideSection />
              </section>

              {/* SECTION 9 — GALLERY */}
              <section id="section-gallery" className="space-y-8 pt-6 border-t border-gray-800/80">
                <GallerySection />
              </section>

              {/* SECTION 10 — STORIES / BLOG */}
              <section id="section-stories" className="space-y-8 pt-6 border-t border-gray-800/80">
                <StoriesSection />
              </section>

              {/* SECTION 11 — TOURIST RESOURCES */}
              <section id="section-resources" className="space-y-8 pt-6 border-t border-gray-800/80">
                <TouristResourcesSection />
              </section>
            </div>
          </div>
        )}

        {/* VIEW 2: DESTINATIONS FULL CATALOG */}
        {activeSection === 'destinations' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
            <DestinationGrid
              onSelectDestination={handleOpenDestinationDossier}
              onViewOnMap={handleViewDestinationOnMap}
            />
          </div>
        )}

        {/* VIEW 3: CHALUKYAN HERITAGE */}
        {activeSection === 'heritage' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
            <HeritageSection
              onExploreDestinations={() => setActiveSection('destinations')}
              onExploreRouteMap={() => setActiveSection('route-map')}
            />
          </div>
        )}

        {/* VIEW 4: THINGS TO DO / EXPERIENCES */}
        {activeSection === 'things-to-do' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Immersive Travel Categories
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
                Things to Do in Bagalkot
              </h2>
              <p className="text-sm text-gray-300">
                Curated travel categories tailored for culture enthusiasts, architecture scholars, spiritual seekers, and families.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EXPERIENCES.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  onExploreCategory={() => setActiveSection('destinations')}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: BAGALKOT DISTRICT ROUTE MAP */}
        {activeSection === 'route-map' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12 space-y-10">
            <BagalkotRouteMap
              onSelectDestination={handleOpenDestinationDossier}
              focusedRouteId={focusedRouteId}
            />

            <div className="space-y-4">
              <h3 className="text-xl font-bold font-serif text-white">Suggested Tourism Routes in Bagalkot</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TOURISM_ROUTES.map((route) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    onExploreRoute={handleFocusRouteAndNavigate}
                  />
                ))}
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
              </div>
            </div>
          </div>
        )}

<<<<<<< HEAD
        {/* VIEW 2: AI MONUMENT RECOGNITION */}
        {activeTab === 'identify' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <MonumentRecognition
              language={language}
              selectedMonument={selectedMonument}
              onSelectMonument={(m) => setSelectedMonument(m)}
              onExploreHistory={handleSelectMonumentAndExplore}
              onViewOnMap={handleViewMonumentOnMap}
              onAskAi={handleAskAiAboutMonument}
              onPlanVisit={handlePlanVisitToMonument}
              initialResult={recognitionResult}
=======
        {/* VIEW 6: FOOD & CULTURE */}
        {activeSection === 'food-culture' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
            <FoodAndCultureSection />
          </div>
        )}

        {/* VIEW 7: EVENTS & FESTIVALS */}
        {activeSection === 'events' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
            <EventsSection />
          </div>
        )}

        {/* VIEW 8: TRAVEL GUIDE */}
        {activeSection === 'travel-guide' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
            <TravelGuideSection />
          </div>
        )}

        {/* VIEW 9: GALLERY */}
        {activeSection === 'gallery' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
            <GallerySection />
          </div>
        )}

        {/* VIEW 10: ABOUT BAGALKOT */}
        {activeSection === 'about' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
            <AboutBagalkotSection
              onExploreDestinations={() => setActiveSection('destinations')}
              onExploreRouteMap={() => setActiveSection('route-map')}
            />
          </div>
        )}

        {/* VIEW 11: AI MONUMENT RECOGNITION SCANNER */}
        {activeSection === 'identify' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
            <MonumentRecognition
              language={language}
              selectedMonument={MONUMENTS[0]}
              onSelectMonument={() => {}}
              onExploreHistory={(m) => {
                const foundDest = DESTINATIONS.find((d) => d.id === m.id || d.id === m.cluster.toLowerCase());
                if (foundDest) handleOpenDestinationDossier(foundDest);
                else setActiveSection('destinations');
              }}
              onViewOnMap={(m) => {
                const foundDest = DESTINATIONS.find((d) => d.id === m.id || d.id === m.cluster.toLowerCase());
                if (foundDest) handleViewDestinationOnMap(foundDest);
                else setActiveSection('route-map');
              }}
              onAskAi={() => setActiveSection('assistant')}
              onPlanVisit={(m) => {
                const foundDest = DESTINATIONS.find((d) => d.id === m.id || d.id === m.cluster.toLowerCase());
                if (foundDest) setSelectedDestination(foundDest);
                setActiveSection('planner');
              }}
              initialResult={null}
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
            />
          </div>
        )}

<<<<<<< HEAD
        {/* VIEW 3: MONUMENT DETAILS DOSSIER */}
        {activeTab === 'details' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <MonumentDetailsView
              key={`details-${selectedMonument.id}-${language}`}
              monument={selectedMonument}
              language={language}
              onBack={() => setActiveTab('explore')}
              onAskAi={handleAskAiAboutMonument}
              onAddToTrip={handlePlanVisitToMonument}
              onViewOnMap={handleViewMonumentOnMap}
            />
          </div>
        )}

        {/* VIEW 4: AI HERITAGE ASSISTANT */}
        {activeTab === 'assistant' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <AIAssistant
              key={`assistant-${selectedMonument.id}-${language}`}
              language={language}
              contextMonument={selectedMonument}
              onNavigateToMonument={(id) => {
                const found = MONUMENTS.find((m) => m.id === id);
                if (found) handleSelectMonumentAndExplore(found);
=======
        {/* VIEW 12: AI HERITAGE VOICE ASSISTANT */}
        {activeSection === 'assistant' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
            <AIAssistant
              language={language}
              onSelectLanguage={setLanguage}
              contextMonument={MONUMENTS[0]}
              onNavigateToMonument={(id) => {
                const foundDest = DESTINATIONS.find((d) => d.id === id);
                if (foundDest) handleOpenDestinationDossier(foundDest);
                else setActiveSection('destinations');
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
              }}
            />
          </div>
        )}

<<<<<<< HEAD
        {/* VIEW 5: SMART TRIP PLANNER */}
        {activeTab === 'planner' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <TripPlanner
              key={`planner-${selectedMonument.id}-${language}`}
              language={language}
              presetMonumentName={selectedMonument.name}
              onNavigateToMonument={(id) => {
                const found = MONUMENTS.find((m) => m.id === id);
                if (found) handleSelectMonumentAndExplore(found);
=======
        {/* VIEW 13: SMART TRIP PLANNER */}
        {activeSection === 'planner' && (
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 py-12">
            <TripPlanner
              language={language}
              presetMonumentName={selectedDestination?.name || 'Badami Cave Temples'}
              onNavigateToMonument={(id) => {
                const foundDest = DESTINATIONS.find((d) => d.id === id);
                if (foundDest) handleOpenDestinationDossier(foundDest);
                else setActiveSection('destinations');
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
              }}
            />
          </div>
        )}

<<<<<<< HEAD
        {/* VIEW 6: INTERACTIVE TOURISM MAP */}
        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <TourismMap
              key={`map-${selectedMonument.id}-${language}`}
              language={language}
              initialMonument={selectedMonument}
              onSelectMonument={handleSelectMonumentAndExplore}
              onExploreHistory={handleSelectMonumentAndExplore}
            />
          </div>
        )}

        {/* VIEW 7: EXPLORE ALL HERITAGE */}
        {activeTab === 'explore' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ExploreHeritage
              language={language}
              onExploreMonument={handleSelectMonumentAndExplore}
            />
          </div>
        )}

        {/* VIEW 8: TOURIST & EMERGENCY SERVICES */}
        {activeTab === 'services' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <TouristServices language={language} />
          </div>
        )}

        {/* VIEW 9: ADMIN & TELEMETRY DASHBOARD */}
        {activeTab === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <AdminDashboard
              language={language}
              onSelectMonument={handleSelectMonumentAndExplore}
            />
          </div>
        )}

        {/* VIEW 10: ABOUT PROJECT ARCHITECTURE */}
        {activeTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <AboutProject
              language={language}
              onOpenDemo={() => setIsDemoModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Guided Competition Demonstration Flow Modal */}
      <CompetitionDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onNavigateTab={(t) => setActiveTab(t)}
        onSelectMonument={(m) => setSelectedMonument(m)}
      />

      {/* Footer */}
      <Footer
        language={language}
        onNavigateTab={setActiveTab}
        onOpenDemo={() => setIsDemoModalOpen(true)}
=======
        {/* FALLBACK VIEW IF UNMATCHED SECTION */}
        {!['home', 'destinations', 'heritage', 'things-to-do', 'route-map', 'food-culture', 'events', 'travel-guide', 'gallery', 'about', 'identify', 'assistant', 'planner'].includes(activeSection) && (
          <div className="max-w-xl mx-auto my-20 p-8 rounded-3xl bg-[#141b28] border border-amber-500/30 text-center space-y-4 shadow-xl">
            <h3 className="text-2xl font-bold font-serif text-white">
              {language === 'kn' ? 'ವಿಭಾಗ ಕಂಡುಬಂದಿಲ್ಲ' : language === 'hi' ? 'अनुभाग नहीं मिला' : 'Section Not Found'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              {language === 'kn'
                ? 'ವಿನಂತಿಸಿದ ಪುಟ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ.'
                : language === 'hi'
                ? 'अनुरोधित पृष्ठ उपलब्ध नहीं है। कृपया मुख्य पृष्ठ पर वापस जाएं।'
                : 'The requested section could not be found. Return to the home portal to continue exploring.'}
            </p>
            <button
              onClick={() => setActiveSection('home')}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              {language === 'kn' ? 'ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ' : language === 'hi' ? 'मुख्य पोर्टल पर जाएं' : 'Return to Home Portal'}
            </button>
          </div>
        )}
        </ErrorBoundary>
      </main>

      {/* Full-Screen Destination Dossier Modal */}
      <DestinationDetailModal
        destination={selectedDestination}
        language={language}
        onClose={handleCloseDestinationDossier}
        onViewOnMap={handleViewDestinationOnMap}
        onPlanTrip={(dest) => {
          setSelectedDestination(dest);
          setActiveSection('planner');
        }}
      />

      {/* Standalone All 8 Caves of Badami Explorer Modal */}
      {showAllCavesModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-2 sm:p-4 md:p-6 flex justify-center items-start sm:items-center bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-5xl my-2 sm:my-auto max-h-[94vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl shadow-2xl">
            <BadamiCavesExplorer
              language={language}
              onClose={() => setShowAllCavesModal(false)}
            />
          </div>
        </div>
      )}

      {/* Standalone All 9 Taluks Waterfalls & Hidden Falls Explorer Modal */}
      {showWaterfallsModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-2 sm:p-4 md:p-6 flex justify-center items-start sm:items-center bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-6xl my-2 sm:my-auto max-h-[94vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl shadow-2xl">
            <BagalkotWaterfallsExplorer
              language={language}
              initialWaterfallId={selectedWaterfallId}
              onClose={() => {
                setShowWaterfallsModal(false);
                setSelectedWaterfallId(undefined);
              }}
            />
          </div>
        </div>
      )}

      {/* Official Footer */}
      <Footer onNavigateSection={(sec) => setActiveSection(sec as AppSection)} />

      {/* Mobile Navigation Dock for 1-tap phone access */}
      <MobileNavigationDock
        activeSection={activeSection}
        onNavigate={(sec) => setActiveSection(sec)}
        language={language}
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
      />
    </div>
  );
}
