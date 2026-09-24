export interface TouristStay {
  id: string;
  name: string;
  type: 'KSTDC Stay' | 'Heritage Resort' | 'Comfort Hotel' | 'Pilgrim Guest House';
  location: string;
  rating: number;
  priceRange: string;
  phone: string;
  highlights: string[];
  features: string[];
}

export interface EmergencyContact {
  department: string;
  service: string;
  number: string;
  availability: string;
  notes: string;
}

export interface TouristFacility {
  category: 'Information' | 'Guides' | 'Transit' | 'Medical';
  title: string;
  location: string;
  contact: string;
  details: string;
}

export const TOURIST_STAYS: TouristStay[] = [
  {
    id: 'kstdc-mayura-badami',
    name: 'KSTDC Hotel Mayura Chalukya',
    type: 'KSTDC Stay',
    location: 'Ramdurg Road, Badami (1 km from Cave Temples)',
    rating: 4.3,
    priceRange: '₹1,500 – ₹2,800 / night',
    phone: '08357-220046 (KSTDC Booking: kstdc.co)',
    highlights: [
      'Karnataka State Tourism Development Corporation property',
      'Spacious garden cottages, AC & Non-AC rooms',
      'On-site multi-cuisine restaurant serving authentic North Karnataka meals',
      'Ample secure parking and tourist assistance desk'
    ],
    features: ['Restaurant', 'Free Parking', 'Room Service', 'AC Available', 'Garden Campus']
  },
  {
    id: 'heritage-resort-badami',
    name: 'Heritage Resort Badami',
    type: 'Heritage Resort',
    location: 'Station Road, Badami (Near Badami Railway Station)',
    rating: 4.4,
    priceRange: '₹3,500 – ₹5,500 / night',
    phone: '08357-220250',
    highlights: [
      'Eco-friendly luxury cottages surrounded by native flowering trees and birds',
      'Swimming pool overlooking sandstone landscapes',
      'Specialized cultural excursions and local guides arranged on request',
      'Buffet dining with organic regional specialties'
    ],
    features: ['Swimming Pool', 'Multi-Cuisine Restaurant', 'WiFi', 'Travel Desk', 'Cottages']
  },
  {
    id: 'badami-court',
    name: 'The Badami Court Hotel',
    type: 'Comfort Hotel',
    location: 'Station Road, Badami',
    rating: 4.1,
    priceRange: '₹2,200 – ₹3,800 / night',
    phone: '08357-220207',
    highlights: [
      'Well-established hotel popular with international and domestic heritage tourists',
      'Courtyard swimming pool and peaceful surroundings',
      'Clean modern rooms with satellite TV and generator backup'
    ],
    features: ['Pool', 'AC Rooms', 'Conference Hall', 'Car Rental', 'Bar & Dining']
  },
  {
    id: 'kudalasangama-yatri-nivas',
    name: 'Kudalasangama Yatri Nivas & Guest Houses',
    type: 'Pilgrim Guest House',
    location: 'Near Sangameshwara Temple, Kudalasangama',
    rating: 4.2,
    priceRange: '₹400 – ₹1,200 / night',
    phone: '08356-266225 (Kudalasangama Development Board)',
    highlights: [
      'Operated by Kudalasangama Kshetra Development Board',
      'Clean budget pilgrim rooms and VIP suites overlooking the river confluence',
      'Walking distance to Aikya Mantapa and free Dasoha meal halls'
    ],
    features: ['Budget Friendly', 'Riverfront Proximity', '24x7 Water', 'Canteen Nearby']
  },
  {
    id: 'clarks-inn-bagalkot',
    name: 'Clarks Inn / Hotel Anugraha Deluxe',
    type: 'Comfort Hotel',
    location: 'Sector 24, Navanagar, Bagalkot City',
    rating: 4.2,
    priceRange: '₹2,000 – ₹3,500 / night',
    phone: '08354-235444',
    highlights: [
      'Modern business & transit hotel in Bagalkot Navanagar',
      'Close to Bagalkot District Collectorate and New Bus Terminal',
      'Banquet facilities and high-speed internet'
    ],
    features: ['Modern Amenities', 'Elevator', 'Restaurant', 'WiFi', 'Ample Parking']
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    department: 'Police Emergency',
    service: 'All-India Police & Emergency Helpline',
    number: '112',
    availability: '24 Hours / Toll-Free',
    notes: 'Direct GPS dispatch for police, traffic, and emergency assistance.'
  },
  {
    department: 'Tourist Helpline',
    service: 'National Tourist Information & Emergency Helpline',
    number: '1363 / 1800-11-1363',
    availability: '24 Hours / 12 Languages',
    notes: 'Multi-lingual emergency tourist support for travelers.'
  },
  {
    department: 'Medical & Ambulance',
    service: '24x7 Ambulance Emergency Response',
    number: '108',
    availability: '24 Hours / Toll-Free',
    notes: 'Immediate ambulance dispatch for medical and trauma emergencies.'
  },
  {
    department: 'Bagalkot District Hospital',
    service: 'District Civil Hospital, Navanagar',
    number: '08354-220025',
    availability: '24 Hours Emergency Casualty',
    notes: 'Fully equipped general hospital with trauma center.'
  },
  {
    department: 'District Police Control Room',
    service: 'Superintendent of Police Office, Bagalkot',
    number: '08354-235000',
    availability: '24 Hours',
    notes: 'Bagalkot District Police Headquarters.'
  },
  {
    department: 'Women Safety Helpline',
    service: 'State Women Helpline',
    number: '1091',
    availability: '24 Hours',
    notes: 'Toll-free dedicated women safety assistance.'
  },
  {
    department: 'Fire & Rescue',
    service: 'Bagalkot Fire Brigade',
    number: '101 / 08354-220101',
    availability: '24 Hours',
    notes: 'Emergency fire fighting and rescue services.'
  }
];

export const TOURIST_FACILITIES: TouristFacility[] = [
  {
    category: 'Information',
    title: 'District Tourism Information Centre',
    location: 'Navanagar, Bagalkot',
    contact: '08354-235650',
    details: 'Curated brochures, circuit maps, and tourism advisory assistance.'
  },
  {
    category: 'Guides',
    title: 'Certified ASI Tourist Guide Counter',
    location: 'Badami Cave Temples Entrance Ticket Complex & Pattadakal Gate',
    contact: 'Inquire directly at ASI Ticket Booth',
    details: 'Certified licensed guides fluent in Kannada, English, Hindi, and regional languages. Rates regulated by ASI guidelines.'
  },
  {
    category: 'Transit',
    title: 'KSRTC Central Bus Stand & Railway Inquiry',
    location: 'Bagalkot Central Bus Stand & Badami Railway Station',
    contact: 'KSRTC: 08354-220130 | Railway Inquiry: 139',
    details: 'Bus ticket booking, schedules for Airavat/Rajahamsa, and train timings.'
  }
];
