import React, { useMemo } from 'react';
import { AppTheme } from '../types';

interface AnimatedHeritageBackgroundProps {
  theme?: AppTheme;
}

export const THEMES_METADATA: Record<
  AppTheme,
  {
    name: { en: string; kn: string; hi: string };
    icon: string;
    accentHex: string;
    ringColor: string;
    bgClass: string;
  }
> = {
  'sandstone-gold': {
    name: {
      en: 'Royal Sandstone Gold',
      kn: 'ರಾಜಮನೆತನದ ಸುವರ್ಣ ಮರಳುಗಲ್ಲು',
      hi: 'शाही बलुआ पत्थर स्वर्ण',
    },
    icon: '🏛️',
    accentHex: '#f59e0b',
    ringColor: 'ring-amber-500',
    bgClass: 'bg-[#0d0c10]',
  },
  'agastya-night': {
    name: {
      en: 'Midnight Agastya Sapphire',
      kn: 'ಮಧ್ಯರಾತ್ರಿ ಅಗಸ್ತ್ಯ ನೀಲಮಣಿ',
      hi: 'मध्यरात्रि अगस्त्य नीलम',
    },
    icon: '🌌',
    accentHex: '#38bdf8',
    ringColor: 'ring-cyan-500',
    bgClass: 'bg-[#040814]',
  },
  'emerald-monsoon': {
    name: {
      en: 'Deccan Monsoon Emerald',
      kn: 'ದಖನ್ ಮುಂಗಾರು ಮರಕತ ಹಸಿರು',
      hi: 'दक्कन मानसून पन्ना हरा',
    },
    icon: '🌿',
    accentHex: '#10b981',
    ringColor: 'ring-emerald-500',
    bgClass: 'bg-[#04120e]',
  },
  'royal-amethyst': {
    name: {
      en: 'Imperial Chalukya Amethyst',
      kn: 'ಚಾಲುಕ್ಯ ಸಾಮ್ರಾಜ್ಯದ ನೇರಳೆ ಮಣಿ',
      hi: 'चालुक्य शाही जामुनी',
    },
    icon: '👑',
    accentHex: '#a855f7',
    ringColor: 'ring-purple-500',
    bgClass: 'bg-[#0e0717]',
  },
};

export const AnimatedHeritageBackground: React.FC<AnimatedHeritageBackgroundProps> = ({
  theme = 'sandstone-gold',
}) => {
  // Generate random stable particle coordinates
  const particles = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.4 + 2) % 100}%`,
      top: `${(i * 7.1 + 8) % 96}%`,
      size: i % 4 === 0 ? 3.5 : i % 2 === 0 ? 2 : 1.5,
      duration: `${11 + (i % 7) * 2.2}s`,
      delay: `${(i % 5) * 1.1}s`,
    }));
  }, []);

  const config = useMemo(() => {
    switch (theme) {
      case 'agastya-night':
        return {
          baseBg: 'bg-[#040814]',
          gradient1: 'from-cyan-500/40 via-blue-600/25 to-transparent',
          gradient2: 'from-sky-500/35 via-indigo-700/25 to-transparent',
          gradient3: 'from-cyan-400/25 via-blue-700/20 to-transparent',
          gridColor: '#38bdf8',
          watermarkStroke: '#38bdf8',
          particleClass: 'bg-cyan-300 shadow-[0_0_12px_rgba(56,189,248,1)]',
        };
      case 'emerald-monsoon':
        return {
          baseBg: 'bg-[#04120e]',
          gradient1: 'from-emerald-500/40 via-teal-500/25 to-transparent',
          gradient2: 'from-green-600/35 via-emerald-800/25 to-transparent',
          gradient3: 'from-teal-400/25 via-emerald-700/20 to-transparent',
          gridColor: '#10b981',
          watermarkStroke: '#10b981',
          particleClass: 'bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,1)]',
        };
      case 'royal-amethyst':
        return {
          baseBg: 'bg-[#0e0717]',
          gradient1: 'from-purple-500/40 via-violet-600/25 to-transparent',
          gradient2: 'from-fuchsia-600/35 via-purple-800/25 to-transparent',
          gradient3: 'from-violet-400/25 via-purple-700/20 to-transparent',
          gridColor: '#a855f7',
          watermarkStroke: '#a855f7',
          particleClass: 'bg-purple-300 shadow-[0_0_12px_rgba(168,85,247,1)]',
        };
      case 'sandstone-gold':
      default:
        return {
          baseBg: 'bg-[#0d0c10]',
          gradient1: 'from-amber-500/40 via-orange-600/25 to-transparent',
          gradient2: 'from-amber-600/35 via-red-900/25 to-transparent',
          gradient3: 'from-amber-400/25 via-yellow-600/20 to-transparent',
          gridColor: '#f59e0b',
          watermarkStroke: '#f59e0b',
          particleClass: 'bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,1)]',
        };
    }
  }, [theme]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transition-colors duration-700"
    >
      {/* 1. Deep Space Themed Background Vignette */}
      <div className={`absolute inset-0 ${config.baseBg} transition-colors duration-700`} />

      {/* 2. Ambient Floating Luminous Gradients */}
      <div
        className={`absolute -top-32 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-br ${config.gradient1} blur-[85px] animate-pulse-glow transition-all duration-700`}
      />
      <div
        className={`absolute top-1/2 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-bl ${config.gradient2} blur-[90px] animate-float-delayed transition-all duration-700`}
      />
      <div
        className={`absolute -bottom-32 left-1/3 w-[700px] h-[700px] rounded-full bg-gradient-to-tr ${config.gradient3} blur-[95px] animate-float-slow transition-all duration-700`}
      />

      {/* 3. Sandstone & Architectural Texture Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.10] transition-opacity duration-700 [background-size:28px_28px]"
        style={{
          backgroundImage: `radial-gradient(${config.gridColor} 1.2px, transparent 1.2px)`,
        }}
      />

      {/* 4. Elegant Chalukya Temple Mandala Watermark (Gentle Spin) */}
      <div className="absolute -right-24 top-1/4 w-[650px] h-[650px] opacity-[0.09] pointer-events-none transition-all duration-700">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_140s_linear_infinite]">
          <circle cx="100" cy="100" r="92" fill="none" stroke={config.watermarkStroke} strokeWidth="1.2" strokeDasharray="6 4" />
          <polygon points="100,12 188,100 100,188 12,100" fill="none" stroke={config.watermarkStroke} strokeWidth="1.2" />
          <polygon points="100,28 172,100 100,172 28,100" fill="none" stroke={config.watermarkStroke} strokeWidth="1" />
          <circle cx="100" cy="100" r="48" fill="none" stroke={config.watermarkStroke} strokeWidth="1.2" strokeDasharray="3 3" />
        </svg>
      </div>

      {/* 5. Floating Glowing Particle Dust Embers */}
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full ${config.particleClass} animate-float-slow transition-all duration-700`}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};
