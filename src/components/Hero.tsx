import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Compass,
  MapPin,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Route,
  Landmark,
  ArrowRight,
  Shield,
  Zap,
  Bot,
  Play,
  Pause,
  Timer
} from 'lucide-react';
import { handleImageError } from '../utils/imageUtils';
import { Language } from '../types';

interface HeroProps {
  onExploreDestinations: () => void;
  onExploreRouteMap: () => void;
  onLaunchAssistant?: () => void;
  onOpenAllCaves?: () => void;
  onOpenWaterfalls?: () => void;
  language?: Language;
}

const HERO_SLIDES = [
  {
    id: 'badami-caves',
    title: {
      en: 'All 8 Badami Rock-Cut Caves',
      kn: 'ಬಾದಾಮಿಯ ಎಲ್ಲಾ ೮ ಗುಹೆಗಳು',
      hi: 'बादामी की सभी 8 रॉक-कट गुफाएं',
    },
    badge: {
      en: '6th-Century Monolithic Sanctuary',
      kn: '೬ನೇ ಶತಮಾನದ ಶಿಲಾ ವೈಭವ',
      hi: 'छठी शताब्दी का शैल स्थापत्य',
    },
    subtitle: {
      en: 'Carved into crimson sandstone bluffs over sacred Agastya Lake.',
      kn: 'ಅಗಸ್ತ್ಯ ಸರೋವರದ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಕಣಿವೆಯಲ್ಲಿ ಕೊರೆದ ಶಿಲ್ಪಕಲಾ ಲೋಕ.',
      hi: 'अगस्त्य झील की लाल बलुआ पत्थर की चट्टानों में तराशे गए अनुपम गुहा मंदिर।',
    },
    image: '/images/monuments/badami-caves.jpg',
    action: 'caves',
  },
  {
    id: 'pattadakal',
    title: {
      en: 'Pattadakal UNESCO Coronation Complex',
      kn: 'ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ಪಟ್ಟಾಭಿಷೇಕ ಸಂಕೀರ್ಣ',
      hi: 'पट्टदकल यूनेस्को राज्याभिषेक परिसर',
    },
    badge: {
      en: 'UNESCO World Heritage Site • 740 CE',
      kn: 'ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ • ಕ್ರಿ.ಶ. ೭೪೦',
      hi: 'यूनेस्को विश्व धरोहर • 740 ई.',
    },
    subtitle: {
      en: 'Where North Indian Nagara and South Indian Dravida temple spires fused in harmony.',
      kn: 'ಉತ್ತರದ ನಾಗರ ಮತ್ತು ದಕ್ಷಿಣದ ದ್ರಾವಿಡ ಶಿಖರ ಶೈಲಿಗಳ ಐತಿಹಾಸಿಕ ಸಂಗಮ ತಾಣ.',
      hi: 'जहाँ नागर और द्रविड़ मंदिर शैलियों का अद्भुत संगम हुआ।',
    },
    image: '/images/monuments/virupaksha.jpg',
    action: 'destinations',
  },
  {
    id: 'aihole',
    title: {
      en: 'Aihole Durga Temple & Architectural Cradle',
      kn: 'ಐಹೊಳೆ ದುರ್ಗಾ ದೇಗುಲ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪದ ಶಾಲೆ',
      hi: 'ऐहोले दुर्गा मंदिर एवं स्थापत्य पालना',
    },
    badge: {
      en: 'Cradle of Temple Architecture • 120+ Temples',
      kn: 'ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು • ೧೨೦+ ದೇಗುಲಗಳು',
      hi: 'मंदिर वास्तुकला पालना • 120+ मंदिर',
    },
    subtitle: {
      en: 'Experimental horseshoe-shaped apsidal sanctuary and carved pillar galleries.',
      kn: 'ಅಪರೂಪದ ಗಜಪೃಷ್ಠಾಕಾರದ ಅರ್ಧವೃತ್ತಾಕಾರದ ದೇವಾಲಯ ಮತ್ತು ಕೆತ್ತನೆಗಳ ಕಂಬಸಾಲು.',
      hi: 'अनोखी गजपृष्ठाकार अर्ध-वृत्ताकार योजना और नक्काशीदार स्तंभ वीथिका।',
    },
    image: '/images/monuments/durga-temple.jpg',
    action: 'destinations',
  },
  {
    id: 'bhutanatha',
    title: {
      en: 'Bhutanatha Waterside Shrines on Lake Agastya',
      kn: 'ಅಗಸ್ತ್ಯ ಸರೋವರದ ತೀರದ ಭೂತನಾಥ ದೇವಾಲಯಗಳು',
      hi: 'अगस्त्य झील तट पर स्थित भूतनाथ देवालय',
    },
    badge: {
      en: 'Lakeside Shrines • 7th–11th Century',
      kn: 'ಸರೋವರ ದೇಗುಲಗಳು • ೭-೧೧ನೇ ಶತಮಾನ',
      hi: 'झील तट मंदिर • 7वीं-11वीं सदी',
    },
    subtitle: {
      en: 'Golden reflections resting gracefully against the backdrop of crimson bluffs.',
      kn: 'ಸೂರ್ಯಾಸ್ತದ ಸಮಯದಲ್ಲಿ ಸರೋವರದ ನೀರಿನಲ್ಲಿ ಮಿನುಗುವ ಭವ್ಯ ದೇಗುಲಗಳ ಪ್ರತಿಬಿಂಬ.',
      hi: 'सूर्यास्त के समय झील के शांत जल में उभरता स्वर्णिम पाषाण प्रतिबिंब।',
    },
    image: '/images/monuments/bhutanatha.jpg',
    action: 'caves',
  },
  {
    id: 'waterfalls',
    title: {
      en: 'Akka-Tangi Falls & Hidden District Cascades',
      kn: 'ಅಕ್ಕ-ತಂಗಿಯರ ಜಲಪಾತ ಮತ್ತು ನೈಸರ್ಗಿಕ ಜಲಧಾರೆಗಳು',
      hi: 'अक्का-तंगी जलप्रपात एवं प्राकृतिक झरने',
    },
    badge: {
      en: '9 Taluk Cascades • Monsoon Spectacle',
      kn: '೯ ತಾಲೂಕುಗಳ ಜಲಪಾತಗಳು • ನೈಸರ್ಗಿಕ ವಿಸ್ಮಯ',
      hi: '9 तालुकों के जलप्रपात • मानसूनी सुंदरता',
    },
    subtitle: {
      en: '70-meter twin torrents leaping down the gorge directly into Agastya Lake.',
      kn: 'ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಕಣಿವೆಯಿಂದ ಅಗಸ್ತ್ಯ ಸರೋವರಕ್ಕೆ ಧುಮುಕುವ ೭೦ ಮೀಟರ್ ಜಂಟಿ ಜಲಪಾತ.',
      hi: 'चट्टानी घाटी से सीधे अगस्त्य झील में 70 मीटर की ऊंचाई से गिरता जुड़वां जलप्रपात।',
    },
    image: '/images/waterfalls/akka-tangi-falls.jpg',
    action: 'waterfalls',
  },
  {
    id: 'kudalasangama',
    title: {
      en: 'Kudalasangama Sacred River Confluence',
      kn: 'ಕೂಡಲಸಂಗಮ ಪವಿತ್ರ ಕೃಷ್ಣಾ-ಮಲಪ್ರಭಾ ಸಂಗಮ',
      hi: 'कूडलसंगम पवित्र कृष्णा-मलप्रभा संगम',
    },
    badge: {
      en: 'Sacred Confluence & Aikya Mantapa',
      kn: 'ಪವಿತ್ರ ಸಂಗಮ ಮತ್ತು ಐಕ್ಯ ಮಂಟಪ',
      hi: 'पवित्र संगम एवं ऐक्य मंटप',
    },
    subtitle: {
      en: 'Where the Krishna and Malaprabha embrace beside Sri Basaveshwara’s resting shrine.',
      kn: 'ಜಗಜ್ಯೋತಿ ಬಸವೇಶ್ವರರ ಪವಿತ್ರ ಐಕ್ಯ ಮಂಟಪವಿರುವ ಕೃಷ್ಣಾ-ಮಲಪ್ರಭಾ ನದಿಗಳ ಪವಿತ್ರ ಸಂಗಮ.',
      hi: 'भगवान बसवेश्वर का पावन ऐक्य मंटप जहाँ कृष्णा और मलप्रभा नदियाँ मिलती हैं।',
    },
    image: '/images/waterfalls/kudalasangama-confluence.jpg',
    action: 'destinations',
  },
  {
    id: 'banashankari',
    title: {
      en: 'Banashankari Haridra Tirtha & Deepastambhas',
      kn: 'ಬನಶಂಕರಿ ಹರಿದ್ರ ತೀರ್ಥ ಮತ್ತು ದೀಪಸ್ತಂಭಗಳು',
      hi: 'बनशंकरी हरिद्रा तीर्थ एवं भव्य दीपस्तंभ',
    },
    badge: {
      en: 'Supreme Shakthi Peetha • Stepped Tank',
      kn: 'ಅತಿ ಪವಿತ್ರ ಶಕ್ತಿಪೀಠ • ಹರಿದ್ರ ತೀರ್ಥ',
      hi: 'प्रमुख शक्ति पीठ • विशाल पुष्करिणी',
    },
    subtitle: {
      en: 'Vast square sacred pushkarini surrounded by ancient stone corridors.',
      kn: 'ಕಲ್ಲಿನ ಕಂಬಗಳ ಹರಿದ್ರ ತೀರ್ಥ ಪುಷ್ಕರಿಣಿ ಮತ್ತು ತಿಲಕಾರಣ್ಯದ ಐತಿಹಾಸಿಕ ತಾಣ.',
      hi: 'पत्थर के बरामदों से घिरा विशाल हरिद्रा तीर्थ पुष्करिणी कुंड।',
    },
    image: '/images/monuments/banashankari.jpg',
    action: 'destinations',
  },
  {
    id: 'almatti',
    title: {
      en: 'Almatti Lal Bahadur Shastri Dam & Gardens',
      kn: 'ಆಲಮಟ್ಟಿ ಲಾಲ್ ಬಹದ್ದೂರ್ ಶಾಸ್ತ್ರಿ ಜಲಾಶಯ ಮತ್ತು ಉದ್ಯಾನ',
      hi: 'अलमट्टी लाल बहादुर शास्त्री बांध एवं मुगल गार्डन',
    },
    badge: {
      en: 'Krishna River Basin • Laser & Music Fountain',
      kn: 'ಕೃಷ್ಣಾ ಜಲಾಶಯ • ನೃತ್ಯ ಕಾರಂಜಿ',
      hi: 'कृष्णा नदी जलाशय • संगीतमय फव्वारे',
    },
    subtitle: {
      en: 'Sprawling reservoir, manicured Mughal gardens, and evening dancing light fountain shows.',
      kn: 'ವಿಶಾಲ ಹಿನ್ನೀರು, ಸುಂದರ ಮೊಘಲ್ ಗಾರ್ಡನ್ ಮತ್ತು ಸಂಜೆಯ ಲೇಸರ್ ನೃತ್ಯ ಕಾರಂಜಿ.',
      hi: 'विशाल जल भंडार, सुंदर मुगल उद्यान और शाम का आकर्षक संगीतमय फव्वारा शो।',
    },
    image: '/images/monuments/almatti-dam.jpg',
    action: 'destinations',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreDestinations,
  onExploreRouteMap,
  onLaunchAssistant,
  onOpenAllCaves,
  onOpenWaterfalls,
  language = 'en',
}) => {
  // Slideshow state: 5s or 6s timer clicks
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideSeconds, setSlideSeconds] = useState<5 | 6>(5);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;
  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);

  const handleSelectSlide = (idx: number) => {
    setCurrentSlideIndex(idx);
    setProgress(0);
  };

  const handleSlideAction = () => {
    if (currentSlide.action === 'caves' && onOpenAllCaves) {
      onOpenAllCaves();
    } else if (currentSlide.action === 'waterfalls' && onOpenWaterfalls) {
      onOpenWaterfalls();
    } else {
      onExploreDestinations();
    }
  };

  // Timer loop for 5 or 6 seconds auto-advance
  useEffect(() => {
    if (!isAutoPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const durationMs = slideSeconds * 1000;
    const intervalStep = 50; // update progress every 50ms
    setProgress(0);

    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setProgress(pct);
    }, intervalStep);

    timerRef.current = setTimeout(() => {
      handleNextSlide();
    }, durationMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentSlideIndex, slideSeconds, isAutoPlaying, handleNextSlide]);

  const content = {
    en: {
      teamBadge: 'Crafted by Team Tech Yoddhas • Bagalkot AI Heritage & Smart Tourism',
      kicker: 'Discover the Heritage Heart of North Karnataka',
      titleP1: 'Discover',
      titleHighlight: 'Bagalkot',
      subtitle: 'Where Chalukyan heritage, sacred rivers, and timeless landscapes meet.',
      description: 'Step into the sixth-century rock-cut caves of Badami, wander through the UNESCO coronation monuments of Pattadakal, unravel the experimental temple laboratory of Aihole, and experience the sacred confluences of the Krishna and Malaprabha rivers.',
      exploreDestBtn: 'Explore Destinations',
      exploreRouteBtn: 'Explore Route Map',
      aiAssistantBtn: '🤖 Ask AI Assistant',
      badgeUnesco: 'UNESCO Site Pattadakal',
      badgeCaves: 'All 8 Caves of Badami (Real Footage)',
      badgeWaterfalls: '🌊 Waterfalls & Hidden Cascades (9 Taluks)',
      badgeAihole: 'Aihole Architectural Cradle',
      statMonuments: '150+',
      statMonumentsSub: 'Ancient Stone Monuments',
      statYears: '1,400+',
      statYearsSub: 'Years of Living History',
      statRivers: '3 Rivers',
      statRiversSub: 'Krishna, Ghataprabha & Malaprabha',
      statTaluks: '9 Taluks',
      statTaluksSub: 'Full District Network'
    },
    kn: {
      teamBadge: 'ತಂಡ ಟೆಕ್ ಯೋಧಾಸ್ ನಿರ್ಮಿತ • ಬಾಗಲಕೋಟೆ ಪ್ರವಾಸೋದ್ಯಮ ಮತ್ತು ಎಐ ತಂತ್ರಜ್ಞಾನ',
      kicker: 'ಉತ್ತರ ಕರ್ನಾಟಕದ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯ ತವರೂರು',
      titleP1: 'ಅನ್ವೇಷಿಸಿ',
      titleHighlight: 'ಬಾಗಲಕೋಟೆ',
      subtitle: 'ಚಾಲುಕ್ಯರ ಶಿಲ್ಪ ಪರಂಪರೆ, ಪವಿತ್ರ ನದಿಗಳು ಹಾಗೂ ರಮಣೀಯ ಪ್ರಕೃತಿಯ ಸಮ್ಮಿಲನ.',
      description: 'ಆರನೇ ಶತಮಾನದ ಬಾದಾಮಿ ಬಂಡೆ-ಕೊರೆದ ಗುಹೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ, ಪಟ್ಟದಕಲ್ಲಿನ ಯುನೆಸ್ಕೋ ಪಟ್ಟಾಭಿಷೇಕ ದೇಗುಲಗಳನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ, ಐಹೊಳೆಯ ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲನ್ನು ಅನ್ವೇಷಿಸಿ ಹಾಗೂ ಕೃಷ್ಣಾ-ಮಲಪ್ರಭಾ ನದಿಗಳ ಸಂಗಮವನ್ನು ಅನುಭವಿಸಿ.',
      exploreDestBtn: 'ಪ್ರವಾಸಿ ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
      exploreRouteBtn: 'ಮಾರ್ಗ ನಕ್ಷೆ ವೀಕ್ಷಿಸಿ',
      aiAssistantBtn: '🤖 ಧ್ವನಿ ಎಐ ಸಹಾಯಕ',
      badgeUnesco: 'ಯುನೆಸ್ಕೋ ತಾಣ ಪಟ್ಟದಕಲ್ಲು',
      badgeCaves: 'ಬಾದಾಮಿಯ ಎಲ್ಲಾ ೮ ಗುಹೆಗಳು (ನೈಜ ಫೋಟೋಗಳು)',
      badgeWaterfalls: '🌊 ಜಲಪಾತಗಳು ಮತ್ತು ಗುಪ್ತ ಜಲಧಾರೆಗಳು (೯ ತಾಲೂಕುಗಳು)',
      badgeAihole: 'ಐಹೊಳೆ ವಾಸ್ತುಶಿಲ್ಪದ ಶಾಲೆ',
      statMonuments: '೧೫೦+',
      statMonumentsSub: 'ಪ್ರಾಚೀನ ಕಲ್ಲಿನ ಸ್ಮಾರಕಗಳು',
      statYears: '೧,೪೦೦+',
      statYearsSub: 'ವರ್ಷಗಳ ಜೀವಂತ ಇತಿಹಾಸ',
      statRivers: '೩ ನದಿಗಳು',
      statRiversSub: 'ಕೃಷ್ಣಾ, ಘಟಪ್ರಭಾ ಮತ್ತು ಮಲಪ್ರಭಾ',
      statTaluks: '೯ ತಾಲೂಕುಗಳು',
      statTaluksSub: 'ಸಂಪೂರ್ಣ ಜಿಲ್ಲಾ ಸಂಪರ್ಕ'
    },
    hi: {
      teamBadge: 'टीम टेक योद्धास द्वारा निर्मित • बागलकोट एआई हेरिटेज एवं स्मार्ट पर्यटन',
      kicker: 'उत्तर कर्नाटक के ऐतिहासिक हृदयस्थल की खोज करें',
      titleP1: 'अन्वेषण करें',
      titleHighlight: 'बागलकोट',
      subtitle: 'जहाँ चालुक्य कालीन पाषाण शिल्प, पवित्र नदियाँ और मनोरम प्रकृति मिलती हैं।',
      description: 'छठी शताब्दी की बादामी की चट्टानी रॉक-कट गुफाओं, पट्टदकल के यूनेस्को विश्व धरोहर मंदिरों, ऐहोले की भारतीय मंदिर वास्तुकला की प्रयोगशाला तथा कृष्णा और मलप्रभा नदियों के पवित्र संगम का जीवंत अनुभव करें।',
      exploreDestBtn: 'पर्यटन स्थल देखें',
      exploreRouteBtn: 'रूट मैप देखें',
      aiAssistantBtn: '🤖 वॉइस एआई सहायक',
      badgeUnesco: 'यूनेस्को धरोहर पट्टदकल',
      badgeCaves: 'बादामी की सभी 8 गुफाएं (वास्तविक तस्वीरें)',
      badgeWaterfalls: '🌊 जलप्रपात एवं गुप्त प्राकृतिक झरने (9 तालुक)',
      badgeAihole: 'ऐहोले स्थापत्य कला पालना',
      statMonuments: '150+',
      statMonumentsSub: 'प्राचीन पाषाण स्मारक',
      statYears: '1,400+',
      statYearsSub: 'वर्षों का समृद्ध इतिहास',
      statRivers: '3 नदियाँ',
      statRiversSub: 'कृष्णा, घटप्रभा एवं मलप्रभा',
      statTaluks: '9 तालुक',
      statTaluksSub: 'संपूर्ण जिला नेटवर्क'
    }
  }[language];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-blur-[2px] text-white pt-10 pb-20 border-b border-amber-500/20">
      {/* HD Sandstone Grid Pattern & Atmospheric Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* HD Decorative Architectural Ring Watermark */}
      <div className="absolute -top-24 -right-24 w-96 h-96 border border-amber-500/10 rounded-full pointer-events-none flex items-center justify-center">
        <div className="w-80 h-80 border border-amber-500/15 rounded-full" />
      </div>

      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 space-y-12">
        {/* Top Tech Yoddhas Badge */}
        <div className="flex items-center justify-center sm:justify-start">
          <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-amber-500/15 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-lg shadow-amber-500/10">
            <Shield className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
            <span className="font-medium tracking-wide truncate max-w-[280px] sm:max-w-none">{content.teamBadge}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center sm:text-left">
            <div className="space-y-2.5 sm:space-y-3">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-amber-400 uppercase font-mono">
                {content.kicker}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold tracking-tight font-serif text-white leading-[1.12]">
                {content.titleP1}{' '}
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                  {content.titleHighlight}
                </span>
              </h1>
              <p className="text-base sm:text-xl lg:text-2xl text-amber-100/90 font-serif italic max-w-2xl leading-relaxed">
                {content.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
              {content.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 pt-2 justify-center sm:justify-start">
              {/* PRIMARY DESTINATIONS CTA */}
              <button
                id="hero-explore-destinations-btn"
                onClick={onExploreDestinations}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-extrabold text-xs sm:text-sm md:text-base shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-gray-950" />
                <span>{content.exploreDestBtn}</span>
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-950/80" />
              </button>

              {/* AI HERITAGE VOICE ASSISTANT CTA */}
              {onLaunchAssistant && (
                <button
                  id="hero-ask-ai-assistant-btn"
                  onClick={onLaunchAssistant}
                  className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-purple-600/25 hover:bg-purple-600/35 text-purple-200 font-bold text-xs sm:text-sm border border-purple-500/50 hover:border-purple-400 backdrop-blur-md transition-all flex items-center justify-center space-x-2 shadow-lg shadow-purple-950/50 hover:scale-105 active:scale-95 cursor-pointer"
                  title="Talk with AI Heritage Assistant in Kannada, Hindi, or English"
                >
                  <Bot className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span>{content.aiAssistantBtn}</span>
                </button>
              )}

              <button
                id="hero-explore-route-map-btn"
                onClick={onExploreRouteMap}
                className="w-full sm:w-auto px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-medium text-xs sm:text-sm border border-gray-750 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Route className="w-4 h-4 text-gray-400" />
                <span>{content.exploreRouteBtn}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{content.badgeUnesco}</span>
              </div>
              <button
                type="button"
                onClick={onOpenAllCaves}
                className="flex items-center space-x-2 text-amber-300 hover:text-amber-200 transition-colors group cursor-pointer"
                title="Explore All 8 Caves of Badami"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform animate-pulse" />
                <span className="font-semibold underline decoration-amber-500/50 underline-offset-4">{content.badgeCaves}</span>
              </button>
              {onOpenWaterfalls && (
                <button
                  type="button"
                  onClick={onOpenWaterfalls}
                  className="flex items-center space-x-2 text-cyan-300 hover:text-cyan-200 transition-colors group cursor-pointer"
                  title="Explore All Waterfalls & Hidden Cascades of Bagalkote"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform animate-pulse" />
                  <span className="font-semibold underline decoration-cyan-500/50 underline-offset-4">{content.badgeWaterfalls}</span>
                </button>
              )}
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{content.badgeAihole}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Heritage Slideshow with 5-6s Click Controls */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Slideshow Card Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-gray-950 group">
                {/* Clickable Image Slides */}
                <div
                  onClick={handleSlideAction}
                  className="relative h-80 sm:h-[430px] w-full overflow-hidden cursor-pointer"
                  title="Click to explore this monument in full view"
                >
                  <img
                    key={currentSlide.id}
                    src={currentSlide.image}
                    alt={currentSlide.title[language] || currentSlide.title.en}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40" />

                  {/* Top Floating Badge & Slide Counter */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                    <div className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/50 text-[11px] font-bold text-amber-300 flex items-center space-x-1.5 shadow-md">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate max-w-[220px]">
                        {currentSlide.badge[language] || currentSlide.badge.en}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {/* 5s or 6s Click Speed Toggle Pill */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSlideSeconds((prev) => (prev === 5 ? 6 : 5));
                        }}
                        className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/40 text-[10px] font-bold text-amber-300 hover:text-white hover:border-amber-300 transition-colors shadow flex items-center space-x-1 cursor-pointer"
                        title="Click to toggle between 5 and 6 seconds auto-slide"
                      >
                        <Timer className="w-3 h-3 text-amber-400" />
                        <span>{slideSeconds}s clicks</span>
                      </button>

                      {/* Play/Pause Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsAutoPlaying(!isAutoPlaying);
                        }}
                        className="w-7 h-7 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-gray-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow"
                        title={isAutoPlaying ? 'Pause Slideshow' : 'Resume Auto Slideshow (5-6s)'}
                      >
                        {isAutoPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400 ml-0.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Previous Slide Click Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevSlide();
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-amber-500 hover:text-gray-950 border border-white/20 hover:border-amber-400 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Next Slide Click Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextSlide();
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-amber-500 hover:text-gray-950 border border-white/20 hover:border-amber-400 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Floating Bottom Card with Info & Dots */}
                  <div className="absolute bottom-3 left-3 right-3 p-3.5 sm:p-4 rounded-2xl bg-[#0f1522]/95 backdrop-blur-md border border-gray-750/90 space-y-2 z-10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white font-serif text-sm sm:text-base leading-snug truncate pr-2">
                        {currentSlide.title[language] || currentSlide.title.en}
                      </span>
                      <span className="text-amber-400 font-bold text-[11px] shrink-0 font-mono">
                        {currentSlideIndex + 1}/{totalSlides}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                      {currentSlide.subtitle[language] || currentSlide.subtitle.en}
                    </p>

                    {/* Interactive Slide Dots */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-1.5">
                        {HERO_SLIDES.map((slide, i) => (
                          <button
                            key={slide.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectSlide(i);
                            }}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              currentSlideIndex === i
                                ? 'w-6 bg-gradient-to-r from-amber-400 to-amber-500 shadow-sm'
                                : 'w-2 bg-gray-600 hover:bg-gray-400'
                            }`}
                            title={`Jump to slide ${i + 1}: ${slide.title.en}`}
                          />
                        ))}
                      </div>

                      <span className="text-[10px] text-amber-300/80 font-medium flex items-center space-x-1">
                        <span>Click to view</span>
                        <ChevronRight className="w-3 h-3 text-amber-400" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5-6s Progress Bar at Bottom of Image Card */}
                <div className="h-1.5 w-full bg-gray-800 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 transition-all duration-75 ease-linear shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                    style={{ width: `${isAutoPlaying ? progress : 0}%` }}
                  />
                </div>
              </div>

              {/* Overlapping Secondary Card (Next Upcoming Preview) */}
              <div
                onClick={handleNextSlide}
                className="hidden md:flex absolute -bottom-4 -left-3 lg:-bottom-6 lg:-left-6 bg-[#131a28]/95 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-amber-500/30 shadow-2xl items-center space-x-3 max-w-xs cursor-pointer hover:border-amber-400 hover:scale-105 transition-all group z-20"
                title="Click to jump to next photo"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-800 shrink-0 border border-white/20">
                  <img
                    src={HERO_SLIDES[(currentSlideIndex + 1) % totalSlides].image}
                    alt="Next slide"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
                  />
                </div>
                <div className="truncate">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">
                    Next in {slideSeconds}s
                  </span>
                  <span className="text-xs font-bold text-white block truncate">
                    {HERO_SLIDES[(currentSlideIndex + 1) % totalSlides].title[language] || HERO_SLIDES[(currentSlideIndex + 1) % totalSlides].title.en}
                  </span>
                  <span className="text-[10px] text-gray-400">Click to advance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Counter Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#111724]/90 border border-gray-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md text-center">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-400 block">{content.statMonuments}</span>
            <span className="text-xs text-gray-300 font-medium">{content.statMonumentsSub}</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-white block">{content.statYears}</span>
            <span className="text-xs text-gray-300 font-medium">{content.statYearsSub}</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-400 block">{content.statRivers}</span>
            <span className="text-xs text-gray-300 font-medium">{content.statRiversSub}</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold font-serif text-white block">{content.statTaluks}</span>
            <span className="text-xs text-gray-300 font-medium">{content.statTaluksSub}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
