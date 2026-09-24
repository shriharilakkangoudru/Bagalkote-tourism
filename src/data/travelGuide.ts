export interface TransportOption {
  mode: 'Road' | 'Rail' | 'Air';
  title: string;
  kannadaTitle: string;
  iconName: string;
  summary: string;
  details: string[];
  keyRoutes: {
    origin: string;
    distance: string;
    duration: string;
    modeDescription: string;
  }[];
}

export interface SeasonInfo {
  season: 'Winter (Peak Season)' | 'Monsoon (Green & Lush)' | 'Summer (Off-Season)';
  months: string;
  temperature: string;
  rating: string;
  description: string;
  whatToExpect: string[];
  clothing: string;
}

export interface TravelTip {
  category: 'Safety' | 'Temple Etiquette' | 'Photography' | 'Health & Hydration' | 'Shopping & Cash';
  title: string;
  tip: string;
}

export const TRANSPORT_OPTIONS: TransportOption[] = [
  {
    mode: 'Road',
    title: 'By Road (Highways & Bus Network)',
    kannadaTitle: 'ರಸ್ತೆ ಸಾರಿಗೆ',
    iconName: 'Bus',
    summary: 'Bagalkot District is exceptionally well-connected through smooth National Highways (NH-52, NH-367, NH-50) and State Highways (SH-14, SH-18).',
    details: [
      'KSRTC operates daily Airavat Club Class, Rajahamsa, and Sleeper bus services from Bengaluru, Hubballi, Belagavi, Mysuru, and Hyderabad.',
      'Frequent non-stop express buses connect Bagalkot and Badami to Hubballi (every 30 mins) and Belagavi (hourly).',
      'Local KSRTC red buses provide reliable connectivity between Badami, Pattadakal, Aihole, and Kudalasangama throughout daytime hours.',
      'Self-drive rental cars and private taxis can be easily booked from Hubballi, Belagavi, or Bagalkot City.'
    ],
    keyRoutes: [
      {
        origin: 'Bengaluru',
        distance: '480 km',
        duration: '8.5 – 9.0 Hours',
        modeDescription: 'Via NH-48 (Tumakuru, Chitradurga) and NH-52 (Hospet, Bagalkot) or overnight sleeper bus'
      },
      {
        origin: 'Hubballi / Dharwad',
        distance: '105 km to Badami / 120 km to Bagalkot',
        duration: '2.0 – 2.5 Hours',
        modeDescription: 'Direct 4-lane driving via NH-52 via Navalgund and Kerur'
      },
      {
        origin: 'Belagavi',
        distance: '140 km',
        duration: '2.5 – 3.0 Hours',
        modeDescription: 'Via SH-20 and SH-18 through Yaragatti and Lokapur'
      },
      {
        origin: 'Hyderabad',
        distance: '390 km',
        duration: '7.0 – 7.5 Hours',
        modeDescription: 'Via Raichur and Hungund on NH-167 / NH-50'
      },
      {
        origin: 'Goa (Panaji)',
        distance: '240 km',
        duration: '5.5 – 6.0 Hours',
        modeDescription: 'Via Belagavi and Chorla Ghat / Anmod Ghat'
      }
    ]
  },
  {
    mode: 'Rail',
    title: 'By Rail (Railway Network)',
    kannadaTitle: 'ರೈಲು ಸಾರಿಗೆ',
    iconName: 'Train',
    summary: 'Bagalkot Junction (BGK) and Badami Railway Station (BDM) lie on the South Western Railway network with direct trains to major Indian metros.',
    details: [
      'Badami Railway Station (BDM) is situated just 4 km from Badami Cave Temples, with auto-rickshaws available for every arriving train.',
      'Bagalkot Railway Station (BGK) is a major A-category junction with modern passenger amenities, waiting lounges, and taxi ranks.',
      'Direct daily and weekly express trains operate from Bengaluru (Gol Gumbaz Express, Basava Express, Hampi Express connect), Mumbai (CSMT/LTT), Hyderabad, Pune, Solapur, and Hubballi.'
    ],
    keyRoutes: [
      {
        origin: 'Bengaluru (SBC / YPR)',
        distance: '620 km Rail',
        duration: '11 – 12 Hours',
        modeDescription: 'Daily overnight Gol Gumbaz Express (16535) and Basava Express (17307)'
      },
      {
        origin: 'Mumbai (CSMT / LTT)',
        distance: '580 km Rail',
        duration: '12 – 13 Hours',
        modeDescription: 'Daily trains via Pune and Solapur stopping directly at Badami and Bagalkot'
      },
      {
        origin: 'Hubballi Junction (UBL)',
        distance: '125 km Rail',
        duration: '2.0 – 2.5 Hours',
        modeDescription: 'Multiple daily passenger and express intercity shuttles'
      }
    ]
  },
  {
    mode: 'Air',
    title: 'Nearest Airports',
    kannadaTitle: 'ವಿಮಾನ ನಿಲ್ದಾಣಗಳು',
    iconName: 'Plane',
    summary: 'The nearest operational domestic and international airports provide quick flight access with onward taxi/train connections to Bagalkot District.',
    details: [
      'Hubballi Airport (HBX) is the closest commercial airport (105 km to Badami / 120 km to Bagalkot), featuring daily direct flights from Bengaluru, Mumbai, Delhi, Hyderabad, and Chennai operated by IndiGo and Star Air.',
      'Belagavi Airport (IXG) is 140 km from Badami, offering regular connections to Mumbai, Bengaluru, Tirupati, and Delhi.',
      'Goa International Airport (Dabolim / Mopa) is approximately 240 km away, ideal for international tourists combining beach vacations with heritage circuits.'
    ],
    keyRoutes: [
      {
        origin: 'Hubballi Airport (HBX)',
        distance: '105 km to Badami',
        duration: '2.0 Hours Drive',
        modeDescription: 'Taxi readily available at airport terminal exit (₹2,500 – ₹3,200)'
      },
      {
        origin: 'Belagavi Airport (IXG)',
        distance: '140 km to Badami',
        duration: '2.5 – 3.0 Hours Drive',
        modeDescription: 'Direct state highway connection via Lokapur'
      },
      {
        origin: 'Goa International Airport (GOI / GOX)',
        distance: '245 km',
        duration: '5.5 Hours Drive',
        modeDescription: 'Scenic route across Western Ghats to the Deccan plateau'
      }
    ]
  }
];

export const SEASONS: SeasonInfo[] = [
  {
    season: 'Winter (Peak Season)',
    months: 'October to March',
    temperature: '15°C to 30°C',
    rating: 'Best Time to Visit ★★★★★',
    description: 'Crisp morning air, gentle breezes, mild sunny afternoons, and cool evenings make this the ideal window for extensive walking through open-air sandstone temple complexes.',
    whatToExpect: [
      'Clear blue skies with soft golden lighting ideal for photography',
      'All major festivals: Chalukya Utsav, Pattadakal Dance Festival, Banashankari Jathre, and Kudalasangama Sharana Mela',
      'Pleasant river breezes along Agastya Lake and Malaprabha River',
      'Comfortable hiking up to Badami North Fort and Meguti Hill Aihole'
    ],
    clothing: 'Light cotton shirts and trousers for daytime; light cardigan, shawl, or jacket for chilly early mornings and nights.'
  },
  {
    season: 'Monsoon (Green & Lush)',
    months: 'July to September',
    temperature: '22°C to 31°C',
    rating: 'Scenic & Fresh ★★★★☆',
    description: 'The Deccan drylands turn emerald green as intermittent showers fill the waterfalls on Badami cliffs and replenish Agastya Lake and Almatti Dam.',
    whatToExpect: [
      'Temporary seasonal waterfalls cascading down the red cliffs behind Bhutanatha Temple',
      'High water levels in Krishna, Malaprabha, and Ghataprabha rivers',
      'Almatti Dam crest gates opened, displaying thunderous torrents of water',
      'Fewer tourist crowds and lush green agricultural countryside'
    ],
    clothing: 'Quick-dry clothes, sturdy umbrella, raincoat, and waterproof footwear with good traction on wet stone.'
  },
  {
    season: 'Summer (Off-Season)',
    months: 'April to June',
    temperature: '26°C to 41°C',
    rating: 'Hot & Dry ★★☆☆☆',
    description: 'The Deccan sun can be intense during midday. However, early morning (06:00 AM – 09:30 AM) and late evening visits to monuments are still peaceful and uncrowded.',
    whatToExpect: [
      'Hot dry conditions; sandstone boulders heat up significantly between 11:30 AM and 04:00 PM',
      'Budget hotel discounts and zero wait times at ticket counters',
      'Delicious summer North Karnataka fruits: watermelons, tender mangoes, and sweet sugarcane juice',
      'Ideal time for early sunrise photography'
    ],
    clothing: 'Ultra-light, breathable cotton or linen clothing, wide-brim hat, UV sunglasses, and high-SPF sunscreen.'
  }
];

export const TRAVEL_TIPS: TravelTip[] = [
  {
    category: 'Safety',
    title: 'Monkey Caution at Badami Caves',
    tip: 'Badami caves and Agastya Lake have resident bonnet macaque monkeys. Keep food items, plastic bags, and dangling water bottles securely zipped inside your backpack. Avoid feeding them or making sudden threatening gestures.'
  },
  {
    category: 'Temple Etiquette',
    title: 'Active Sanctuaries & Dress Codes',
    tip: 'While ASI monument ruins have no dress code, active temples (Virupaksha at Pattadakal, Banashankari Temple, Kudalasangama, Mahakuteshwara) require modest attire covering shoulders and knees. Always remove footwear outside before entering sanctums.'
  },
  {
    category: 'Photography',
    title: 'Golden Hour Angles & Tripods',
    tip: 'Still photography with mobile phones and DSLR cameras is permitted across all Bagalkot ASI monuments. Tripods and commercial video rigs generally require permission from the Superintending Archaeologist (ASI Dharwad Circle).'
  },
  {
    category: 'Health & Hydration',
    title: 'Drinking Water & Sun Protection',
    tip: 'Exploring Aihole and Pattadakal requires 2 to 3 kilometers of walking across stone courtyards. Always carry a refillable water bottle, electrolyte sachets, and apply sun protection before leaving your hotel.'
  },
  {
    category: 'Shopping & Cash',
    title: 'Handloom Saree Purchases & UPI',
    tip: 'UPI payments (GPay, PhonePe, Paytm) work at almost all shops, eateries, and ticket booths. However, carrying ₹500 to ₹1,000 in cash is recommended for rural auto-rickshaws, shoe minders, and village tender coconut stalls.'
  }
];
