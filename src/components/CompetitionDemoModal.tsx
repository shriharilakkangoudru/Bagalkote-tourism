import React, { useState } from 'react';
<<<<<<< HEAD
import { Sparkles, X, ChevronRight, ChevronLeft, CheckCircle2, Play, Award, Zap, Code, ShieldCheck, Compass, Camera, Bot, Calendar, MapPin } from 'lucide-react';
=======
import { Sparkles, X, ChevronRight, ChevronLeft, CheckCircle2, Play, Award, Zap, Code, ShieldCheck, Compass, Bot, Calendar, MapPin } from 'lucide-react';
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
import { Monument } from '../types';
import { MONUMENTS } from '../data/monumentsData';

interface CompetitionDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: 'home' | 'identify' | 'details' | 'assistant' | 'planner' | 'map' | 'explore' | 'services' | 'admin') => void;
  onSelectMonument: (m: Monument) => void;
}

interface DemoStep {
  step: number;
  title: string;
  tab: 'identify' | 'details' | 'assistant' | 'planner' | 'map';
  icon: any;
  headline: string;
  description: string;
  techHighlights: string[];
  actionLabel: string;
}

export const CompetitionDemoModal: React.FC<CompetitionDemoModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectMonument,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const demoSteps: DemoStep[] = [
    {
      step: 1,
      title: 'Step 1: AI Monument Recognition',
      tab: 'identify',
<<<<<<< HEAD
      icon: Camera,
      headline: 'Neural Visual Identification & Multimodal Vision',
      description:
        'Demonstrates real-time image processing via camera capture or photo upload, with live Gemini 3.8 Flash Vision model analysis and an instant smart fallback classifier for offline presentations.',
      techHighlights: [
        'WebRTC MediaDevices camera streaming & canvas capture',
=======
      icon: Sparkles,
      headline: 'Neural Visual Identification & Multimodal Vision',
      description:
        'Demonstrates real-time architectural analysis across verified Chalukya monuments, with live Gemini 3.8 Flash Vision model analysis and an instant smart fallback classifier for offline presentations.',
      techHighlights: [
        'Client-side architectural analysis & neural vision',
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
        'Gemini Vision API multimodal prompt orchestration',
        'Confidence score calculation & architectural feature segmentation',
      ],
      actionLabel: 'Launch Monument Recognition',
    },
    {
      step: 2,
      title: 'Step 2: Monument Details & Epigraphy',
      tab: 'details',
      icon: Compass,
      headline: 'Interactive Archaeological Chronicles & Specifications',
      description:
        'Displays full structural breakdown, royal inscriptions, native Kannada script, photography tips, and accessibility ratings for the identified Badami Chalukyan masterpiece.',
      techHighlights: [
        'Trilingual dataset (Kannada, Hindi, English)',
        'Epigraphical analysis & architectural taxonomy',
        'Direct GPS navigation & Google Maps deep links',
      ],
      actionLabel: 'View Detailed Monument Dossier',
    },
    {
      step: 3,
      title: 'Step 3: Multilingual Voice AI Assistant',
      tab: 'assistant',
      icon: Bot,
      headline: 'Conversational Tourism Intelligence with Speech I/O',
      description:
        'Allows tourists to speak queries in Kannada, Hindi, or English. Uses the Web Speech API for voice recognition and text-to-speech audio synthesis.',
      techHighlights: [
        'Web Speech API SpeechRecognition & SpeechSynthesis',
        'Domain-specific Chalukyan RAG knowledge base',
        'Reasoning mode toggle for intricate historical debates',
      ],
      actionLabel: 'Open Voice AI Assistant',
    },
    {
      step: 4,
      title: 'Step 4: Smart Trip Planner',
      tab: 'planner',
      icon: Calendar,
      headline: 'Dynamic Budget & Itinerary Optimizer',
      description:
        'Calculates synchronized travel times, local auto/bus logistics, Jolada Rotti dining stops, and itemized ticket budgets across Badami, Pattadakal, and Aihole.',
      techHighlights: [
        'Algorithmic circuit optimization for the Golden Triangle',
        'Detailed budget categories in INR (₹)',
        'Printable and exportable travel itineraries',
      ],
      actionLabel: 'Open Smart Trip Planner',
    },
    {
      step: 5,
      title: 'Step 5: Interactive Golden Triangle Map',
      tab: 'map',
      icon: MapPin,
      headline: 'Geospatial Heritage Explorer',
      description:
        'Interactive SVG map illustrating the Malaprabha River valley, highway distance markers, travel durations, and direct route navigation.',
      techHighlights: [
        'Responsive SVG coordinate mapping with dynamic pins',
        'Real-time distance & transit duration indicators',
        'Direct links to Google Maps Directions API',
      ],
      actionLabel: 'Open Interactive Tourism Map',
    },
  ];

  const currentStep = demoSteps[currentStepIndex];
  const StepIcon = currentStep.icon;

  const handleExecuteAction = () => {
    // Select Virupaksha temple as standard competition demo monument
    const sample = MONUMENTS.find((m) => m.id === 'virupaksha-pattadakal') || MONUMENTS[0];
    onSelectMonument(sample);
    onNavigateTab(currentStep.tab);
    onClose();
  };

  const handleNext = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#121824] border-2 border-amber-500/60 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col text-white animate-in fade-in zoom-in duration-200">
=======
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#121824] border-2 border-amber-500/60 rounded-2xl sm:rounded-3xl max-w-2xl w-full my-2 sm:my-auto max-h-[94vh] sm:max-h-[90vh] shadow-2xl overflow-hidden flex flex-col text-white animate-in fade-in zoom-in duration-200">
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-600/30 via-[#182133] to-amber-600/30 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/40">
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif flex items-center space-x-2">
<<<<<<< HEAD
                <span>College Technology Competition Mode</span>
              </h3>
              <p className="text-[11px] text-amber-300/80">
                Guided Demonstration Flow • Step {currentStep.step} of {demoSteps.length}
=======
                <span>Team Tech Yoddhas Showcase Mode</span>
              </h3>
              <p className="text-[11px] text-amber-300/80">
                Interactive Guided Flow • Step {currentStep.step} of {demoSteps.length}
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker */}
        <div className="px-6 pt-4 flex space-x-2">
          {demoSteps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'bg-amber-400'
                  : idx < currentStepIndex
                  ? 'bg-amber-600/60'
                  : 'bg-gray-800'
              }`}
              title={s.title}
            />
          ))}
        </div>

        {/* Step Body */}
<<<<<<< HEAD
        <div className="p-6 sm:p-8 space-y-5">
=======
        <div className="p-5 sm:p-8 space-y-5 overflow-y-auto flex-1">
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shadow-lg flex-shrink-0">
              <StepIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {currentStep.title}
              </span>
              <h4 className="text-xl font-bold font-serif text-white mt-0.5">
                {currentStep.headline}
              </h4>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed bg-[#182132] p-4 rounded-xl border border-gray-800">
            {currentStep.description}
          </p>

          {/* Technical highlights bullet list */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Code className="w-3.5 h-3.5" />
              <span>Key Technical Highlights:</span>
            </p>
            <ul className="space-y-1.5">
              {currentStep.techHighlights.map((hl, i) => (
                <li key={i} className="text-xs text-gray-300 flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-[#0d121c] border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-gray-300 text-xs font-semibold flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === demoSteps.length - 1}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-gray-300 text-xs font-semibold flex items-center space-x-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleExecuteAction}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-bold text-xs sm:text-sm shadow-md flex items-center space-x-2 transition-all hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{currentStep.actionLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
