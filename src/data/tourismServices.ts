import { TourismServiceItem, TouristServiceListing, EmergencyContact, CulturalGuideline } from '../types';

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { service: 'Police Control Room', number: '112 / 100', icon: '🚨', description: 'Immediate law enforcement & 24/7 patrol' },
  { service: 'Ambulance & Trauma', number: '108', icon: '🚑', description: 'Emergency medical services & CHC dispatch' },
  { service: 'Tourist Police & Security', number: '1363 / +91 80 2235 2828', icon: '🛡️', description: 'Dedicated Karnataka Tourism helpline' },
  { service: 'Women Helpline', number: '1091 / 181', icon: '📞', description: 'Toll-free 24/7 safety assistance' },
];

export const CULTURAL_GUIDELINES: CulturalGuideline[] = [
  {
    icon: '👞',
    title: 'Footwear Protocol in Sanctums',
    detail: 'Remove footwear before stepping onto raised temple plinths and consecrated sanctums (garbhagriha) at active shrines like Virupaksha and Banashankari. Designated shoe-holding counters are located at the entrance.'
  },
  {
    icon: '👗',
    title: 'Modest Temple Dress Code',
    detail: 'Modest attire covering shoulders and knees is recommended out of respect for local traditions and active temple rituals. Light breathable cotton clothes are best suited for the Deccan climate.'
  },
  {
    icon: '📸',
    title: 'Archaeological Photography Norms',
    detail: 'Still photography for personal tourism is permitted at all ASI monuments. Flash photography is prohibited inside painted caves and dark sanctums to protect pigments. Tripods and commercial video gear require prior ASI permission.'
  },
  {
    icon: '☀️',
    title: 'Best Visiting Months & Hours',
    detail: 'October through March provides pleasant daytime weather (18°C–28°C). During summer, visit between 06:00 AM–10:30 AM and 04:00 PM–06:30 PM to avoid hot sandstone temperatures.'
  },
  {
    icon: '🌿',
    title: 'Clean Monument Initiative',
    detail: 'Bagalkote monuments are strictly plastic-discouraged zones. Use designated recycling bins and do not touch or lean on ancient carved stone reliefs.'
  },
  {
    icon: '🪙',
    title: 'Digital Payments & Small Cash',
    detail: 'ASI QR code ticket counters accept UPI/cards with discounted rates for digital booking. Keep ₹50–₹100 small cash for local auto-rickshaws, shoe stands, and street tender coconut vendors.'
  }
];

export const TOURIST_SERVICES: TouristServiceListing[] = [
  // Emergency / Healthcare
  {
    id: 'em-chc-badami',
    category: 'emergency',
    title: 'Badami Community Health Centre (CHC)',
    location: 'Station Road, Badami (near Bus Stand)',
    description: '24/7 emergency trauma care, medical ward, and ambulance base for the Badami heritage circuit.',
    phone: '+91 8357 220025',
    timings: '24 Hours / Casualty',
    highlight: 'Nearest Public Health Hospital to Cave Temples'
  },
  {
    id: 'em-hosp-bagalkote',
    category: 'emergency',
    title: 'Bagalkote District Civil Hospital',
    location: 'Navanagar Sector 23, Bagalkote Town',
    description: 'Full multi-speciality tertiary care referral hospital with advanced ICU and diagnostic imaging.',
    phone: '+91 8354 235122 / 108',
    timings: '24 Hours Open',
    highlight: 'Apex District Medical Facility'
  },
  {
    id: 'em-pol-badami',
    category: 'emergency',
    title: 'Badami Town Police Station',
    location: 'Near Old Bus Stand, Badami',
    description: 'Local jurisdiction police station with dedicated tourist verification and assistance desk.',
    phone: '+91 8357 220033',
    timings: '24/7 Duty Officer',
    highlight: 'Prompt tourist dispute & lost property assistance'
  },

  // Transportation
  {
    id: 'trans-ksrtc',
    category: 'transport',
    title: 'Badami KSRTC Bus Station',
    location: 'Station Road, Badami Town',
    description: 'Central transport hub running frequent shuttle buses to Pattadakal (every 30 mins), Aihole, Bagalkote Town, and Hubballi Junction.',
    phone: '+91 8357 220037',
    timings: '05:30 AM - 10:30 PM',
    priceRange: '₹20 - ₹45 per seat',
    highlight: 'Budget-friendly direct links to all monuments'
  },
  {
    id: 'trans-auto-taxi',
    category: 'transport',
    title: 'Badami Tourist Auto & Cab Union',
    location: 'Badami Railway Station & Bus Stand Stand',
    description: 'Pre-negotiated day packages covering Badami Caves, Banashankari, Mahakuta, Pattadakal, and Aihole round trips.',
    phone: '+91 97401 22845',
    timings: '06:00 AM - 09:00 PM',
    priceRange: 'Auto: ₹800–₹1200 / Taxi: ₹2200–₹3000',
    highlight: 'Flexible multi-site full day driver packages'
  },
  {
    id: 'trans-railway',
    category: 'transport',
    title: 'Badami Railway Station (BDM)',
    location: 'South Western Railway, Badami',
    description: 'Direct express rail connectivity to Bengaluru, Hubballi, Gadag, Solapur, and Hyderabad.',
    phone: '139 (Rail Inquiry)',
    timings: 'Round the clock trains',
    highlight: 'Located 4.5 km from the historic rock caves'
  },

  // Heritage Hotels & Stays
  {
    id: 'hotel-kstdc',
    category: 'hotels',
    title: 'KSTDC Hotel Mayura Chalukya',
    location: 'Ramdurg Road, Badami (1.2 km from Caves)',
    description: 'Official Karnataka Tourism resort offering spacious air-conditioned rooms, manicured gardens, safe parking, and an on-site restaurant.',
    phone: '+91 8357 220046',
    timings: 'Check-in: 12:00 PM',
    priceRange: '₹1,800 - ₹3,500 / night',
    highlight: 'State Tourism verified with serene surroundings'
  },
  {
    id: 'hotel-heritage-resort',
    category: 'hotels',
    title: 'The Heritage Resort Badami',
    location: 'Station Road, Badami',
    description: 'Cottage resort designed with rustic vernacular architecture, outdoor pool, and proximity to scenic sandstone ridges.',
    phone: '+91 94806 88700',
    timings: '24-hour reception',
    priceRange: '₹3,500 - ₹6,000 / night',
    highlight: 'Swimming pool & peaceful farm atmosphere'
  },
  {
    id: 'hotel-clarks-inn',
    category: 'hotels',
    title: 'Badami Court & Clarks Inn',
    location: 'Near Station Road, Badami',
    description: 'Modern luxury comfort with multi-cuisine dining, conference halls, travel concierge, and family suites.',
    phone: '+91 8357 220230',
    timings: '24 Hours',
    priceRange: '₹2,800 - ₹5,000 / night',
    highlight: 'Modern comfort & multi-cuisine restaurant'
  },

  // Local Food & Restaurants
  {
    id: 'food-krishna',
    category: 'food',
    title: 'Sri Krishna Khanavali',
    location: 'Near Badami Bus Stand Circle',
    description: 'Authentic North Karnataka Jolada Rotti Oota (sorghum flatbread) served with stuffed brinjal (ennegayi), spicy shenga chutney, dal, and fresh curds.',
    phone: '+91 98452 33110',
    timings: '11:30 AM - 03:30 PM & 07:30 PM - 10:30 PM',
    priceRange: '₹100 - ₹150 per thali',
    highlight: 'Best authentic Jolada Rotti in town'
  },
  {
    id: 'food-banashankari',
    category: 'food',
    title: 'Banashankari Temple Prasada & Khanavali',
    location: 'Cholachagudda (5 km from Badami)',
    description: 'Traditional temple satvik meals served on banana leaves alongside sweet Badami peda and hot mirchi bajji.',
    timings: '12:00 PM - 03:30 PM',
    priceRange: '₹60 - ₹120',
    highlight: 'Devotional atmosphere & delicious satvik cuisine'
  },
  {
    id: 'food-pattadakal-canteen',
    category: 'food',
    title: 'Pattadakal Heritage Tourism Canteen',
    location: 'Opposite Pattadakal UNESCO Entrance',
    description: 'Clean quick-service vegetarian eatery offering South Indian breakfast, fresh tender coconuts, and vegetarian lunch platters.',
    timings: '07:30 AM - 06:00 PM',
    priceRange: '₹40 - ₹120',
    highlight: 'Immediate walking proximity to the temple complex'
  },

  // Souvenirs & Handlooms
  {
    id: 'souv-ilkal',
    category: 'souvenirs',
    title: 'Ilkal Weavers Co-operative Society',
    location: 'Ilkal Town & Badami Showroom',
    description: 'World-famous GI-tagged Ilkal Handloom Sarees renowned for their distinctive "Topi Teni" red silk pallu and Kasuti needle embroidery.',
    timings: '10:00 AM - 08:30 PM',
    priceRange: '₹1,500 - ₹12,000',
    highlight: 'Direct from master heritage weavers'
  },
  {
    id: 'souv-khana',
    category: 'souvenirs',
    title: 'Guledgudda Khana Handloom Center',
    location: 'Guledgudda & Badami Market Street',
    description: 'Karnataka’s legendary traditional geometric-weave blouse fabrics, woven on pit looms for over 400 years.',
    timings: '10:00 AM - 08:00 PM',
    priceRange: '₹200 - ₹1,200',
    highlight: 'GI-tagged heritage textile of Bagalkote'
  },
  {
    id: 'souv-crafts',
    category: 'souvenirs',
    title: 'Chalukya Stone Craft & Souvenir Arcade',
    location: 'Agastya Lake Walkway, Badami',
    description: 'Hand-carved miniature red sandstone Nataraja figures, soapstone elephant lamps, and ASI illustrated monographs.',
    timings: '09:00 AM - 07:00 PM',
    priceRange: '₹150 - ₹2,500',
    highlight: 'Authentic stone miniatures carved by local artisans'
  }
];

export const TOURISM_SERVICES: TourismServiceItem[] = [
  {
    id: 'em-1',
    type: 'emergency',
    title: 'Karnataka State Emergency Helpline',
    kannadaTitle: 'ಕರ್ನಾಟಕ ತುರ್ತು ಸಹಾಯವಾಣಿ',
    subtitle: 'Unified Emergency Response Support System (ERSS)',
    contact: '112',
    timing: '24/7 Available',
    address: 'State Emergency Command & Control Center, Karnataka',
    badge: 'Toll-Free',
    verified: true
  },
  {
    id: 'em-2',
    type: 'emergency',
    title: 'Karnataka Tourism 24x7 Tourist Helpline',
    kannadaTitle: 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ಸಹಾಯವಾಣಿ',
    subtitle: 'Assistance for Domestic & International Travelers',
    contact: '1363 / +91 80 2235 2828',
    timing: '24/7 Available in English, Kannada, Hindi',
    address: 'District Tourism Facilitation Center, Navanagar, Bagalkot',
    badge: 'Tourist Desk',
    verified: true
  }
];
