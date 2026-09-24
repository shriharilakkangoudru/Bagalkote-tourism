export type Language = 'en' | 'kn' | 'hi';

<<<<<<< HEAD
=======
export type AppTheme =
  | 'sandstone-gold'
  | 'agastya-night'
  | 'emerald-monsoon'
  | 'royal-amethyst';

>>>>>>> 21ec09a (Bagalkote-Tourism-Website)
export type MonumentCategory = 'All' | 'Badami' | 'Pattadakal' | 'Aihole' | 'Temples' | 'Caves' | 'Museums';

export interface Monument {
  id: string;
  name: string;
  kannadaName: string;
  hindiName: string;
  location: string;
  subLocation: string;
  district: string;
  period: string;
  dynasty: string;
  builtBy?: string;
  architectureStyle: string;
  category: 'Caves' | 'Temples' | 'Museums';
  cluster: 'Badami' | 'Pattadakal' | 'Aihole';
  image: string;
  galleryImages?: string[];
  shortDescription: {
    en: string;
    kn: string;
    hi: string;
  };
  history: {
    en: string;
    kn: string;
    hi: string;
  };
  architecture: {
    en: string;
    kn: string;
    hi: string;
  };
  whyVisit: {
    en: string;
    kn: string;
    hi: string;
  };
  historicalSignificance: string;
  interestingFacts: string[];
  suggestedVisitingTime: string;
  timings?: string;
  entryFee: {
    indian: string;
    foreign: string;
    camera?: string;
  };
  photographyTips: string;
  familyFriendly: boolean;
  familyFriendlyNote: string;
  accessibility: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceFromBadamiKm: number;
  approxTravelTime: string;
  nearbyAttractions: string[];
  featured?: boolean;
}

export interface RecognitionResult {
  monument: Monument;
  confidence: number;
  category: string;
  period: string;
  detectedFeatures: string[];
  isDemoMode: boolean;
  modelUsed?: string;
  analysisSummary: string;
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isHighThinking?: boolean;
  detectedLanguage?: Language;
}

export interface ItineraryStop {
  time: string;
  monumentName: string;
  location: string;
  activity: string;
  duration: string;
  travelInfo?: string;
  insiderTip: string;
  highlightImage?: string;
}

export interface TripPlanResult {
  id: string;
  title: string;
  summary: string;
  startLocation: string;
  days: number;
  people: number;
  budget: string;
  travelPreference: string;
  timeline: ItineraryStop[];
  budgetBreakdown: {
    category: string;
    cost: string;
    details: string;
  }[];
  insiderAdvice: string[];
}

export type TourismServiceCategory = 'emergency' | 'transport' | 'hotels' | 'food' | 'souvenirs' | 'guidelines';

export interface TourismServiceItem {
  id: string;
  type: 'emergency' | 'hospital' | 'police' | 'hotel' | 'restaurant' | 'transport';
  title: string;
  kannadaTitle?: string;
  subtitle: string;
  contact: string;
  timing?: string;
  address: string;
  badge?: string;
  verified: boolean;
}

export interface TouristServiceListing {
  id: string;
  category: 'emergency' | 'transport' | 'hotels' | 'food' | 'souvenirs';
  title: string;
  location: string;
  description: string;
  phone?: string;
  timings?: string;
  priceRange?: string;
  highlight?: string;
}

export interface EmergencyContact {
  service: string;
  number: string;
  icon: string;
  description: string;
}

export interface CulturalGuideline {
  icon: string;
  title: string;
  detail: string;
}
