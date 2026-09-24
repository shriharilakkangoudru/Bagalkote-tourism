export interface RouteStop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  order: number;
  suggestedDuration: string;
  activityHighlight: string;
}

export interface TourismRoute {
  id: string;
  name: string;
  kannadaName: string;
  subtitle: string;
  description: string;
  theme: string;
  color: string;
  distanceKm: number;
  estimatedDuration: string;
  bestStartTime: string;
  highways: string[];
  roadQuality: 'Excellent' | 'Good' | 'Fair' | 'Good to Excellent';
  stops: RouteStop[];
  waypoints: [number, number][];
  highlights: string[];
  insiderTip: string;
}

export const TOURISM_ROUTES: TourismRoute[] = [
  {
    id: 'route-1',
    name: 'Bagalkot → Aihole → Pattadakal → Badami',
    kannadaName: 'ಮಾರ್ಗ ೧: ಬಾಗಲಕೋಟೆ → ಐಹೊಳೆ → ಪಟ್ಟದಕಲ್ಲು → ಬಾದಾಮಿ',
    subtitle: 'The Classic Chalukyan Architectural Odyssey',
    description: 'Starting from the district headquarters at Bagalkot, journey southeast through the Malaprabha River valley to experience the evolution of stone architecture: from the experimental temples of Aihole, through the UNESCO coronation sanctuary of Pattadakal, to the monolithic rock-cut cave temples of Badami.',
    theme: 'Evolution of Indian Temple Architecture',
    color: '#d97706', // Sandstone Amber
    distanceKm: 105,
    estimatedDuration: '2.5 – 3.0 Hours Drive (1 Full Day Exploration)',
    bestStartTime: '07:30 AM from Bagalkot',
    highways: ['SH-14', 'NH-367', 'Bagalkot-Hungund Road'],
    roadQuality: 'Good',
    highlights: [
      'Begin at Bagalkot and head to Aihole through scenic sunflower and sugarcane fields',
      'Walk among 120 structural temples in Aihole and marvel at the apsidal Durga Temple',
      'Drive along the river to Pattadakal to witness the UNESCO-inscribed Virupaksha Temple',
      'Arrive in Badami for golden hour light across Agastya Lake and the rock-cut cave temples'
    ],
    insiderTip: 'Start early at Aihole before the sun gets too intense. Spend midday under the shaded mandapas of Pattadakal, and reach Badami by 3:30 PM for breathtaking sunset photography at Cave 1 and Bhutanatha Temple.',
    stops: [
      {
        id: 'bagalkot-city',
        name: 'Bagalkot (Departure)',
        lat: 16.1817,
        lng: 75.6958,
        order: 1,
        suggestedDuration: 'Departure Point',
        activityHighlight: 'Start journey after hearty North Karnataka breakfast'
      },
      {
        id: 'aihole',
        name: 'Aihole (Aryapura)',
        lat: 16.0205,
        lng: 75.8829,
        order: 2,
        suggestedDuration: '2.5 Hours',
        activityHighlight: 'Explore Durga Temple, Lad Khan, and Ravana Phadi Cave'
      },
      {
        id: 'pattadakal',
        name: 'Pattadakal (UNESCO Site)',
        lat: 15.9493,
        lng: 75.8166,
        order: 3,
        suggestedDuration: '2.5 Hours',
        activityHighlight: 'Admire Virupaksha, Mallikarjuna, and Sangameshwara shrines'
      },
      {
        id: 'badami',
        name: 'Badami (Caves & Fort)',
        lat: 15.9189,
        lng: 75.6826,
        order: 4,
        suggestedDuration: '3.0 Hours',
        activityHighlight: 'Climb 4 Cave Temples, stroll Agastya Lake at sunset'
      }
    ],
    waypoints: [
      [16.1817, 75.6958], // Bagalkot
      [16.1200, 75.7600],
      [16.0500, 75.8300],
      [16.0205, 75.8829], // Aihole
      [15.9800, 75.8500],
      [15.9493, 75.8166], // Pattadakal
      [15.9350, 75.7500],
      [15.9189, 75.6826]  // Badami
    ]
  },
  {
    id: 'route-2',
    name: 'Badami → Mahakuta → Pattadakal → Aihole',
    kannadaName: 'ಮಾರ್ಗ ೨: ಬಾದಾಮಿ → ಮಹಾಕೂಟ → ಪಟ್ಟದಕಲ್ಲು → ಐಹೊಳೆ',
    subtitle: 'Sacred Springs & UNESCO Golden Circuit',
    description: 'A compact and rewarding heritage corridor starting directly in Badami, winding through the secluded forest springs of Mahakuta, and connecting Pattadakal UNESCO World Heritage Site with the cradle of temple architecture at Aihole.',
    theme: 'Sacred Springs, Caves & Royal Coronation',
    color: '#ea580c', // Terracotta Red
    distanceKm: 48,
    estimatedDuration: '1.2 Hours Drive (Full Day Tour)',
    bestStartTime: '08:00 AM from Badami',
    highways: ['SH-14', 'Badami-Mahakuta Rural Road'],
    roadQuality: 'Good',
    highlights: [
      'Ascend the Badami rock-cut caves early in the morning when the sandstone glows crimson',
      'Immerse in the natural spring-fed Vishnu Pushkarini at the serene Mahakuta temple grove',
      'Discover masterstone craftsmanship at Pattadakal alongside the Malaprabha River',
      'Conclude at Aihole taking in the Meguti hill view and the apsidal Durga sanctum'
    ],
    insiderTip: 'Pack quick-drying clothing if you intend to take a holy dip in the natural spring water of Mahakuta’s Vishnu Pushkarini tank.',
    stops: [
      {
        id: 'badami',
        name: 'Badami Caves & Lake',
        lat: 15.9189,
        lng: 75.6826,
        order: 1,
        suggestedDuration: '2.5 Hours',
        activityHighlight: 'Rock-cut caves 1 to 4 and Bhutanatha temple'
      },
      {
        id: 'mahakuta',
        name: 'Mahakuta Forest Shrines',
        lat: 15.9328,
        lng: 75.7289,
        order: 2,
        suggestedDuration: '1.5 Hours',
        activityHighlight: 'Panchamukha Linga and sacred spring Pushkarini dip'
      },
      {
        id: 'pattadakal',
        name: 'Pattadakal UNESCO Group',
        lat: 15.9493,
        lng: 75.8166,
        order: 3,
        suggestedDuration: '2.0 Hours',
        activityHighlight: 'Royal coronation complex & Dravida-Nagara fusion'
      },
      {
        id: 'aihole',
        name: 'Aihole Experimental Complex',
        lat: 16.0205,
        lng: 75.8829,
        order: 4,
        suggestedDuration: '2.5 Hours',
        activityHighlight: 'Durga Temple apsidal colonnade & Meguti hilltop'
      }
    ],
    waypoints: [
      [15.9189, 75.6826], // Badami
      [15.9250, 75.7050],
      [15.9328, 75.7289], // Mahakuta
      [15.9400, 75.7700],
      [15.9493, 75.8166], // Pattadakal
      [15.9800, 75.8500],
      [16.0205, 75.8829]  // Aihole
    ]
  },
  {
    id: 'route-3',
    name: 'Bagalkot → Kudalasangama → Almatti',
    kannadaName: 'ಮಾರ್ಗ ೩: ಬಾಗಲಕೋಟೆ → ಕೂಡಲಸಂಗಮ → ಆಲಮಟ್ಟಿ',
    subtitle: 'Sacred Confluence & Mighty Krishna River Trail',
    description: 'Journey northeast from Bagalkot into the verdant Krishna river basin. Seek peace at the holy river confluence and Sri Basaveshwara Samadhi in Kudalasangama, then proceed to the immense Almatti Dam for illuminated Mughal gardens and dancing musical fountains.',
    theme: 'Spiritual River Confluence, Garden Landscapes & Water Marvels',
    color: '#0284c7', // Krishna Sky Blue
    distanceKm: 92,
    estimatedDuration: '2.0 Hours Drive (Full Day Itinerary)',
    bestStartTime: '09:00 AM from Bagalkot',
    highways: ['NH-52', 'SH-44'],
    roadQuality: 'Excellent',
    highlights: [
      'Smooth 4-lane driving along National Highway 52',
      'Pay homage at Aikya Mantapa where the Malaprabha meets the holy Krishna',
      'Enjoy peaceful boating along the riverbanks of Kudalasangama',
      'Explore the vast landscaped Mughal and Rock gardens at Almatti Dam',
      'Witness the spectacular laser and musical dancing fountain evening show'
    ],
    insiderTip: 'Plan your arrival at Almatti Dam by 4:30 PM so you have ample daylight to explore the terraced gardens and Rock Garden before the musical fountain begins at 7:00 PM.',
    stops: [
      {
        id: 'bagalkot-city',
        name: 'Bagalkot City',
        lat: 16.1817,
        lng: 75.6958,
        order: 1,
        suggestedDuration: 'Departure',
        activityHighlight: 'Transit departure from Navanagar'
      },
      {
        id: 'kudalasangama',
        name: 'Kudalasangama Pilgrimage',
        lat: 16.2081,
        lng: 76.0847,
        order: 2,
        suggestedDuration: '3.0 Hours',
        activityHighlight: 'Visit Aikya Mantapa, Sangameshwara Temple & Basava Museum'
      },
      {
        id: 'almatti',
        name: 'Almatti Dam & Gardens',
        lat: 16.3292,
        lng: 75.8887,
        order: 3,
        suggestedDuration: '3.5 Hours',
        activityHighlight: 'Mughal Gardens, reservoir promenade, musical fountain show'
      }
    ],
    waypoints: [
      [16.1817, 75.6958], // Bagalkot
      [16.1850, 75.8500],
      [16.1950, 75.9800],
      [16.2081, 76.0847], // Kudalasangama
      [16.2600, 76.0000],
      [16.3000, 75.9300],
      [16.3292, 75.8887]  // Almatti Dam
    ]
  },
  {
    id: 'route-4',
    name: 'Bagalkot Heritage Grand Circuit',
    kannadaName: 'ಮಾರ್ಗ ೪: ಬಾಗಲಕೋಟೆ ಮಹಾ ಪರಂಪರೆ ಪರಿಕ್ರಮ',
    subtitle: 'The Comprehensive District Loop (Caves, UNESCO, Springs, Silk & Rivers)',
    description: 'The ultimate panoramic tour connecting all prime historical, cultural, and spiritual landmarks of Bagalkot District: Badami Caves, Banashankari, Mahakuta, Pattadakal, Aihole, Ilkal handlooms, Kudalasangama, and Almatti Dam in an unforgettable loop.',
    theme: 'Complete District Odyssey',
    color: '#7c3aed', // Royal Chalukya Purple
    distanceKm: 185,
    estimatedDuration: '4.5 Hours Drive (Ideal 2 to 3-Day Grand Tour)',
    bestStartTime: 'Day 1 Morning',
    highways: ['SH-14', 'NH-367', 'NH-50', 'NH-52'],
    roadQuality: 'Good to Excellent',
    highlights: [
      'Comprehensive exploration of all UNESCO, ASI, and state protected landmarks',
      'Covers 6 distinct taluks across Bagalkot District',
      'Combines 6th-century rock carvings, 8th-century royal temples, and 12th-century Sharana heritage',
      'Exclusive stop at Ilkal to witness traditional pit loom saree weaving directly from master artisans',
      'Spectacular finale with Krishna River sunsets at Almatti Dam'
    ],
    insiderTip: 'Break this circuit into 2 full days with an overnight stay in Badami or KSTDC Hotel Mayura to comfortably enjoy all sites without fatigue.',
    stops: [
      {
        id: 'bagalkot-city',
        name: 'Bagalkot',
        lat: 16.1817,
        lng: 75.6958,
        order: 1,
        suggestedDuration: 'Starting Hub',
        activityHighlight: 'Central base'
      },
      {
        id: 'badami',
        name: 'Badami',
        lat: 15.9189,
        lng: 75.6826,
        order: 2,
        suggestedDuration: '3 Hours',
        activityHighlight: 'Rock-cut caves and Agastya Lake'
      },
      {
        id: 'banashankari',
        name: 'Banashankari',
        lat: 15.8753,
        lng: 75.7003,
        order: 3,
        suggestedDuration: '1 Hour',
        activityHighlight: 'Shakthi temple and Haridra Tirtha lake'
      },
      {
        id: 'mahakuta',
        name: 'Mahakuta',
        lat: 15.9328,
        lng: 75.7289,
        order: 4,
        suggestedDuration: '1.5 Hours',
        activityHighlight: 'Perennial natural spring pool'
      },
      {
        id: 'pattadakal',
        name: 'Pattadakal',
        lat: 15.9493,
        lng: 75.8166,
        order: 5,
        suggestedDuration: '2.5 Hours',
        activityHighlight: 'UNESCO World Heritage complex'
      },
      {
        id: 'aihole',
        name: 'Aihole',
        lat: 16.0205,
        lng: 75.8829,
        order: 6,
        suggestedDuration: '2.5 Hours',
        activityHighlight: 'Durga and Lad Khan temples'
      },
      {
        id: 'ilkal',
        name: 'Ilkal',
        lat: 15.9600,
        lng: 76.1300,
        order: 7,
        suggestedDuration: '1.5 Hours',
        activityHighlight: 'GI-tagged Handloom saree weaving'
      },
      {
        id: 'kudalasangama',
        name: 'Kudalasangama',
        lat: 16.2081,
        lng: 76.0847,
        order: 8,
        suggestedDuration: '2 Hours',
        activityHighlight: 'River confluence & Sri Basaveshwara Samadhi'
      },
      {
        id: 'almatti',
        name: 'Almatti',
        lat: 16.3292,
        lng: 75.8887,
        order: 9,
        suggestedDuration: '2.5 Hours',
        activityHighlight: 'Mughal Gardens and Musical Fountains'
      }
    ],
    waypoints: [
      [16.1817, 75.6958], // Bagalkot
      [16.0500, 75.7833], // Guledgudda
      [15.9189, 75.6826], // Badami
      [15.8753, 75.7003], // Banashankari
      [15.9328, 75.7289], // Mahakuta
      [15.9493, 75.8166], // Pattadakal
      [16.0205, 75.8829], // Aihole
      [15.9600, 76.1300], // Ilkal
      [16.2081, 76.0847], // Kudalasangama
      [16.3292, 75.8887], // Almatti
      [16.1817, 75.6958]  // Return to Bagalkot
    ]
  }
];
