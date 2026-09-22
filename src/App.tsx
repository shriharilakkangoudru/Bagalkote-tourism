import React, { useState, useEffect } from 'react';
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
  }
};

export default function App() {
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
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('explore')}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 flex items-center space-x-2 transition-colors"
                  >
                    <span>View All 25+ Monuments</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>

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
              </div>
            </div>
          </div>
        )}

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
            />
          </div>
        )}

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
              }}
            />
          </div>
        )}

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
              }}
            />
          </div>
        )}

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
      />
    </div>
  );
}
