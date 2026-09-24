import React from 'react';
import { Award, Sparkles, CheckCircle2, Code, ShieldCheck, Heart, ExternalLink, Cpu, Layers, Globe } from 'lucide-react';
import { Language } from '../types';

interface AboutProjectProps {
  language: Language;
  onOpenDemo: () => void;
}

export const AboutProject: React.FC<AboutProjectProps> = ({ onOpenDemo }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 text-white">
      {/* Top Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Award className="w-4 h-4" />
<<<<<<< HEAD
          <span>College-Level Technology Competition Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
          About AI HERITAGE LENS
        </h2>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
          "Your Intelligent Gateway to Bagalkote's Heritage" — Bridging 1,400 years of Early Chalukya stone art with state-of-the-art multimodal artificial intelligence.
=======
          <span>Team Tech Yoddhas Innovation Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
          Tech Yoddhas — AI Heritage Lens
        </h2>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
          "Your Intelligent Gateway to Bagalkot's Heritage" — Bridging 1,400 years of Early Chalukya stone art with state-of-the-art multimodal artificial intelligence.
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
        </p>
      </div>

      {/* 3 Core Pillars: Problem, Objective, Solution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#141b28] border border-gray-800 rounded-3xl p-6 space-y-3 shadow-xl hover:border-amber-500/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-lg">
            ⚠️
          </div>
          <h3 className="text-lg font-bold font-serif text-white">The Challenge</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Bagalkote's UNESCO World Heritage complex at Pattadakal and the sacred caves of Badami attract global visitors, yet physical signage is often sparse, weathered, or unilingual, leaving architectural depth unrevealed.
          </p>
        </div>

        <div className="bg-[#141b28] border border-gray-800 rounded-3xl p-6 space-y-3 shadow-xl hover:border-amber-500/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
            🎯
          </div>
          <h3 className="text-lg font-bold font-serif text-white">The Objective</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
<<<<<<< HEAD
            Create an intuitive, zero-barrier digital guide that instantly decodes any temple facade through a tourist's camera, speaks native Kannada and Hindi, and crafts optimized travel itineraries tailored to real budgets.
=======
            Create an intuitive, zero-barrier digital guide that instantly decodes any temple facade through interactive AI vision, speaks native Kannada and Hindi, and crafts optimized travel itineraries tailored to real budgets.
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
          </p>
        </div>

        <div className="bg-[#141b28] border border-gray-800 rounded-3xl p-6 space-y-3 shadow-xl hover:border-amber-500/40 transition-colors">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
            💡
          </div>
          <h3 className="text-lg font-bold font-serif text-white">The AI Solution</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            A fullstack system pairing multimodal computer vision (Gemini 3.8 Flash) with browser Web Speech APIs, geospatial Golden Triangle route calculators, and verified local tourism registries.
          </p>
        </div>
      </div>

      {/* Tech Stack Breakdown */}
      <div className="bg-[#141b28] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <h3 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <span>System Architecture & Technology Stack</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#1b2333] border border-gray-800 space-y-1">
            <p className="text-xs font-bold text-amber-400 uppercase">Frontend</p>
            <p className="text-sm font-semibold text-white">React 18 + Vite</p>
            <p className="text-[11px] text-gray-400">Tailwind CSS, Lucide icons, responsive canvas</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1b2333] border border-gray-800 space-y-1">
            <p className="text-xs font-bold text-purple-400 uppercase">AI & Vision</p>
            <p className="text-sm font-semibold text-white">Google Gemini API</p>
            <p className="text-[11px] text-gray-400">Gemini 3.8 Flash with secure server-side proxy</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1b2333] border border-gray-800 space-y-1">
<<<<<<< HEAD
            <p className="text-xs font-bold text-emerald-400 uppercase">Audio & Camera</p>
            <p className="text-sm font-semibold text-white">Web Browser APIs</p>
            <p className="text-[11px] text-gray-400">MediaDevices getUserMedia + Web Speech API</p>
=======
            <p className="text-xs font-bold text-emerald-400 uppercase">Audio & Speech</p>
            <p className="text-sm font-semibold text-white">Web Speech API</p>
            <p className="text-[11px] text-gray-400">SpeechRecognition & SpeechSynthesis in Kannada, Hindi & English</p>
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
          </div>

          <div className="p-4 rounded-2xl bg-[#1b2333] border border-gray-800 space-y-1">
            <p className="text-xs font-bold text-sky-400 uppercase">Data & Fallback</p>
            <p className="text-sm font-semibold text-white">Multi-lingual RAG</p>
            <p className="text-[11px] text-gray-400">Offline knowledge base for reliable competition demo</p>
          </div>
        </div>

        {/* Call to open demo */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800">
          <div className="text-xs text-gray-400">
<<<<<<< HEAD
            Engineered for excellence in technological innovation, aesthetic sophistication, and cultural preservation.
=======
            Engineered with pride by Team Tech Yoddhas for excellence in technological innovation, aesthetic sophistication, and cultural preservation.
>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
          </div>
          <button
            onClick={onOpenDemo}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs shadow-md transition-all flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Interactive Competition Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
