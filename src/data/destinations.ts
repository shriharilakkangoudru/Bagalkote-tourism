export interface Destination {
  id: string;
  name: string;
  kannadaName: string;
  hindiName?: string;
  tagline: string;
  taluk: string;
  category: 'UNESCO Heritage' | 'Rock-Cut Caves' | 'Ancient Temples' | 'Confluence & Sacred' | 'Dams & Nature' | 'Crafts & Culture';
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  shortDescription: string;
  fullOverview: string;
  kannadaOverview?: string;
  hindiOverview?: string;
  epigraphyAndInscriptions?: string[];
  architecturalStyleDetails?: string;
  keyHighlights: string[];
  historicalEra: string;
  bestTimeToVisit: string;
  timings: string;
  entryFee: string;
  photography: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distanceFromBagalkotKm: number;
  distanceFromBadamiKm: number;
  howToReach: {
    byRoad: string;
    byRail: string;
    nearestAirport: string;
  };
  nearbyAttractions: string[];
  featured: boolean;
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'badami',
    name: 'Badami (Vatapi)',
    kannadaName: 'ಬಾದಾಮಿ (ವಾತಾಪಿ)',
    hindiName: 'बादामी (वातापी)',
    tagline: 'Magnificent 6th-Century Rock-Cut Cave Temples & Crimson Cliffs',
    taluk: 'Badami',
    category: 'Rock-Cut Caves',
    rating: 4.9,
    reviewsCount: 1420,
    image: '/images/monuments/badami-caves.jpg',
    galleryImages: [
      '/images/monuments/badami-caves.jpg',
      '/images/monuments/badami-caves-exterior.jpg',
      '/images/monuments/bhutanatha.jpg',
      '/images/monuments/badami-fort.jpg',
      '/images/monuments/nataraja-cave1.jpg'
    ],
    shortDescription: 'The ancient capital of the Early Chalukyas, famed for four monolithic rock-cut cave temples carved into dramatic red sandstone cliffs cradling Agastya Lake.',
    fullOverview: 'Founded in 540 CE by Pulakeshin I, Badami (ancient Vatapi) was the royal cradle of the Chalukya dynasty. Nestled in a rugged canyon between two steep sandstone hills, Badami boasts four magnificent rock-cut cave temples reflecting Vedic, Vaishnava, Shaiva, and Jain traditions. Across the placid waters of Agastya Lake sits the iconic Bhutanatha temple group, while ancient forts, bastions, and the Archaeological Museum crown the rocky ramparts.',
    kannadaOverview: 'ಕ್ರಿ.ಶ. 540 ರಲ್ಲಿ ಒಂದನೇ ಪುಲಕೇಶಿಯಿಂದ ಸ್ಥಾಪಿಸಲ್ಪಟ್ಟ ಬಾದಾಮಿ (ಪ್ರಾಚೀನ ವಾತಾಪಿ) ಚಾಲುಕ್ಯ ರಾಜವಂಶದ ರಾಜಧಾನಿಯಾಗಿತ್ತು. ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಕಡಿದಾದ ಬಂಡೆಗಳ ನಡುವೆ ಕೊರೆಯಲಾದ ನಾಲ್ಕು ಭವ್ಯ ಗುಹಾ ದೇವಾಲಯಗಳು ಶೈವ, ವೈಷ್ಣವ ಹಾಗೂ ಜೈನ ಸಂಸ್ಕೃತಿಯನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ. ಅಗಸ್ತ್ಯ ಸರೋವರದ ತೀರದಲ್ಲಿರುವ ಭೂತನಾಥ ದೇವಾಲಯ ಸಮೂಹ ಮತ್ತು ಪ್ರಾಚೀನ ಕೋಟೆಯು ಇಲ್ಲಿನ ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳಾಗಿವೆ.',
    hindiOverview: '540 ईस्वी में पुलकेशिन प्रथम द्वारा स्थापित बादामी प्रारंभिक चालुक्य वंश की भव्य राजधानी थी। दो खड़ी लाल बलुआ पत्थर की पहाड़ियों के बीच स्थित बादामी में चार भव्य रॉक-कट गुफा मंदिर हैं जो वैदिक, वैष्णव, शैव और जैन परंपराओं को दर्शाते हैं। अगस्त्य झील के शांत जल पर स्थित भूतनाथ मंदिर समूह और उत्तरी किला अद्वितीय हैं।',
    epigraphyAndInscriptions: [
      'Kappe Arabhatta Rock Inscription (7th century CE) — famous Old Kannada poetic verse: "Sadhuge Sadhu, Madhuryange Madhurya..." engraved on the cliff over Agastya Lake',
      'Cave 3 Foundation Inscription (578 CE) — Prince Mangalesha grants village revenues for the temple of Vishnu',
      'Badami Cliff Inscription of Pulakeshin I (543 CE) — records the founding of the capital hill-fort of Vatapi'
    ],
    architecturalStyleDetails: 'Early Chalukyan Rock-Cut Monolithic Sanctuary. Features sanctums, pillared mukhamandapas, and relief sculptures carved directly into living sandstone.',
    keyHighlights: [
      'Four rock-cut monolithic cave temples carved between 578 CE and 610 CE',
      'The famed 18-armed dancing Nataraja carving depicting 81 classical Bharatanatyam poses in Cave 1',
      'Serene Bhutanatha Group of Temples reflecting upon the sacred Agastya Lake waters',
      'Badami Northern Fort, Tipu Sultan treasury, and 7th-century rock inscriptions',
      'Archaeological Museum housing rare Chalukyan sculptures and hero stones'
    ],
    historicalEra: '540 CE – 757 CE (Early Chalukya Dynasty)',
    bestTimeToVisit: 'October to March (pleasant morning/evening winter weather)',
    timings: '06:00 AM – 06:00 PM (Daily)',
    entryFee: '₹25 for Indians, ₹300 for Foreign tourists (Free for children below 15)',
    photography: 'Allowed (Still photography free; tripods may require ASI permit in caves)',
    coordinates: {
      lat: 15.9189,
      lng: 75.6826
    },
    distanceFromBagalkotKm: 34,
    distanceFromBadamiKm: 0,
    howToReach: {
      byRoad: 'Connected via SH-14 and SH-57 from Bagalkot (34 km) and Hubballi (105 km). Frequent KSRTC buses operate throughout the day.',
      byRail: 'Badami Railway Station (BDM) is 4 km from town center with daily trains to Bengaluru, Hubballi, Solapur, and Mumbai.',
      nearestAirport: 'Hubballi Airport (HBX) - 105 km; Belagavi Airport (IXG) - 140 km.'
    },
    nearbyAttractions: ['Pattadakal (22 km)', 'Mahakuta (14 km)', 'Banashankari (5 km)', 'Aihole (35 km)'],
    featured: true
  },
  {
    id: 'pattadakal',
    name: 'Pattadakal',
    kannadaName: 'ಪಟ್ಟದಕಲ್ಲು',
    hindiName: 'पट्टदकल',
    tagline: 'UNESCO World Heritage Sanctuary of Royal Coronation & Temple Architecture',
    taluk: 'Badami',
    category: 'UNESCO Heritage',
    rating: 4.9,
    reviewsCount: 1180,
    image: '/images/monuments/virupaksha.jpg',
    galleryImages: [
      '/images/monuments/virupaksha.jpg',
      '/images/monuments/virupaksha-view2.jpg',
      '/images/monuments/mallikarjuna.jpg',
      '/images/monuments/papanatha.jpg',
      '/images/monuments/carvings-pattadakal.jpg'
    ],
    shortDescription: 'A UNESCO World Heritage Site on the banks of the sacred Malaprabha River, Pattadakal represents the high point of an eclectic art that harmonized northern Nagara and southern Dravida architectural traditions.',
    fullOverview: 'Pattadakal (ancient Raktapura or "City of Red Sand") served as the ceremonial coronation sanctuary for the Chalukyan monarchs. Inscribed as a UNESCO World Heritage Site in 1987, the complex features nine grand Hindu temples and a Jain sanctuary. The crowning monument, Virupaksha Temple, was commissioned in 740 CE by Queen Lokamahadevi to celebrate King Vikramaditya II’s victory over the Pallavas of Kanchipuram, and directly inspired the Kailash Temple at Ellora.',
    kannadaOverview: 'ಮಲಪ್ರಭಾ ನದಿಯ ತೀರದಲ್ಲಿರುವ ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣವಾಗಿದೆ. ಇದು ಚಾಲುಕ್ಯ ರಾಜರ ಪಟ್ಟಾಭಿಷೇಕ ತಾಣವಾಗಿತ್ತು. ಇಲ್ಲಿನ ಪ್ರಮುಖ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯವನ್ನು ಕ್ರಿ.ಶ. 740 ರಲ್ಲಿ ರಾಣಿ ಲೋಕಮಹಾದೇವಿ ನಿರ್ಮಿಸಿದಳು. ಉತ್ತರ ಭಾರತದ ನಾಗರ ಶೈಲಿ ಹಾಗೂ ದಕ್ಷಿಣ ಭಾರತದ ದ್ರಾವಿಡ ವಾಸ್ತುಶಿಲ್ಪ ಶೈಲಿಗಳ ಸುಂದರ ಸಂಗಮ ಇಲ್ಲಿದೆ.',
    hindiOverview: 'पवित्र मलप्रभा नदी के तट पर स्थित पट्टदकल एक यूनेस्को विश्व धरोहर स्थल है। यह चालुक्य नरेशों का राज्याभिषेक स्थल रहा है। इसका प्रमुख मंदिर विरूपाक्ष मंदिर है, जिसे 740 ईस्वी में रानी लोकमहादेवी ने बनवाया था। यहाँ उत्तर भारतीय नागर और दक्षिण भारतीय द्रविड़ वास्तुकला का अनुपम संगम देखने को मिलता है।',
    epigraphyAndInscriptions: [
      'Virupaksha Temple Pillar Inscription — records the royal honors and title "Tribhuvanacharya" bestowed upon chief architect Gundan Anivaritachari',
      'Papanatha Temple Epigraph — mentions royal patronage of sculptors and stonemasons from Kanchipuram',
      'Sangameshwara Temple Inscription of Vijayaditya (696–733 CE) — records construction of the Vijayeshwara sanctuary'
    ],
    architecturalStyleDetails: 'Eclectic Coronation Complex fusing Northern Rekha-Nagara spires with Southern Dravidian multi-tiered Vimanas and independent Nandi pavilions.',
    keyHighlights: [
      'UNESCO World Heritage Site inscribed in 1987',
      'Virupaksha Temple: Pristine Karnataka Dravida architecture with monolithic Nandi pavilion',
      'Sangameshwara Temple: One of the oldest surviving royal Chalukyan temples (c. 720 CE)',
      'Mallikarjuna & Papanatha Temples displaying intricate Ramayana and Mahabharata narrative friezes',
      'Rare fusion where Northern Rekha-Nagara towers stand beside Southern Vimana spires'
    ],
    historicalEra: '7th – 8th Century CE (King Vijayaditya & Vikramaditya II)',
    bestTimeToVisit: 'October to February (Hosts the annual Pattadakal Dance Festival in January)',
    timings: '06:00 AM – 06:00 PM (Daily)',
    entryFee: '₹40 for Indians & SAARC/BIMSTEC; ₹600 for Foreign Tourists',
    photography: 'Allowed on complex grounds and exteriors',
    coordinates: {
      lat: 15.9493,
      lng: 75.8166
    },
    distanceFromBagalkotKm: 42,
    distanceFromBadamiKm: 22,
    howToReach: {
      byRoad: '22 km northeast of Badami via Badami-Pattadakal Road. Regular buses and taxis ply between Badami and Pattadakal.',
      byRail: 'Badami Railway Station (22 km) or Bagalkot Railway Station (42 km).',
      nearestAirport: 'Hubballi Airport (125 km); Belagavi Airport (155 km).'
    },
    nearbyAttractions: ['Badami Caves (22 km)', 'Aihole (13 km)', 'Mahakuta (12 km)'],
    featured: true
  },
  {
    id: 'aihole',
    name: 'Aihole (Aryapura)',
    kannadaName: 'ಐಹೊಳೆ (ಆರ್ಯಪುರ)',
    hindiName: 'ऐहोले (आर्यपुर)',
    tagline: 'The Celebrated Cradle of Indian Stone Temple Architecture',
    taluk: 'Hungund',
    category: 'Ancient Temples',
    rating: 4.8,
    reviewsCount: 950,
    image: '/images/monuments/durga-temple.jpg',
    galleryImages: [
      '/images/monuments/durga-temple.jpg',
      '/images/monuments/lad-khan.jpg',
      '/images/monuments/lad-khan-interior.jpg',
      '/images/monuments/ravana-phadi.jpg',
      '/images/monuments/aihole-complex.jpg'
    ],
    shortDescription: 'An open-air architectural museum of over 120 stone temples built between the 5th and 12th centuries, where master artisan guilds experimented with embryonic temple forms.',
    fullOverview: 'Described by art historians as the "Cradle of Indian Temple Architecture", Aihole (ancient Aryapura) was the premier experimental laboratory for ancient Indian architects and the guild of "Ayyavole 500" merchants. Here stone masons transitioned from wood and rock excavations to structural masonry. Highlights include the iconic apsidal Durga Temple with its horse-shoe peripteral colonnade, the ancient Lad Khan assembly hall, the 6th-century Ravana Phadi rock-cut cave, and the hilltop Meguti Jain temple bearing Ravikirti’s famed 634 CE inscription.',
    kannadaOverview: 'ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು ಎಂದು ಪ್ರಸಿದ್ಧವಾಗಿರುವ ಐಹೊಳೆ (ಪ್ರಾಚೀನ ಆರ್ಯಪುರ) 120ಕ್ಕೂ ಹೆಚ್ಚು ಪ್ರಾಚೀನ ಶಿಲಾ ದೇವಾಲಯಗಳ ತೆರೆದ ವಸ್ತುಸಂಗ್ರಹಾಲಯವಾಗಿದೆ. ಇಲ್ಲಿ ಪ್ರಸಿದ್ಧ "ಅಯ್ಯಾವೊಳೆ 500" ವ್ಯಾಪಾರಿ ಶ್ರೇಣಿಯು ಪ್ರವರ್ಧಮಾನಕ್ಕೆ ಬಂದಿತ್ತು. ಗಜಪೃಷ್ಠಾಕಾರದ ದುರ್ಗಾ ದೇವಾಲಯ, ಪ್ರಾಚೀನ ಲಾಡ್ ಖಾನ್ ದೇವಾಲಯ, ರಾವಣ ಫಡಿ ಗುಹೆ ಮತ್ತು ಮೇಗುತಿ ಜೈನ ದೇವಾಲಯದಲ್ಲಿರುವ ಕ್ರಿ.ಶ. 634 ರ ರವಿಕೀರ್ತಿಯ ಶಾಸನವು ಐಹೊಳೆಯ ಅತಿಮುಖ್ಯ ಆಕರ್ಷಣೆಗಳಾಗಿವೆ.',
    hindiOverview: 'भारतीय मंदिर वास्तुकला का पालना कहे जाने वाले ऐहोले (प्राचीन आर्यपुर) में 5वीं से 12वीं शताब्दी के बीच निर्मित 120 से अधिक पाषाण मंदिर हैं। यहाँ वास्तुकारों ने लकड़ी की संरचनाओं से पत्थर के संरचनात्मक मंदिरों के निर्माण का ऐतिहासिक प्रयोग किया था। प्रसिद्ध गजपृष्ठाकार दुर्गा मंदिर, लाड खान मंदिर, रावण फडी रॉक-कट गुफा और मेगुती पहाड़ी पर स्थित 634 ईस्वी का रविकीर्ति शिलालेख प्रमुख आकर्षण हैं।',
    epigraphyAndInscriptions: [
      'Meguti Temple Inscription (634 CE) — Classical Sanskrit poem by court poet Ravikirti recording Emperor Pulakeshin II’s triumph over King Harsha on the banks of Narmada, and providing the pivotal historical date connecting poets Kalidasa and Bharavi',
      'Aihole Inscription of Ayyavole 500 (8th Century CE) — Chronicles the international guild of 500 merchant princes trading across South Asia',
      'Ravana Phadi 6th-century Shaiva dedicatory records and artisan insignia'
    ],
    architecturalStyleDetails: 'Experimental Evolution Laboratory spanning Early Chalukyan Mandapa prototypes, apsidal Buddhist-influenced Gajaprashtha sanctums, and northern Rekha-Nagara spires.',
    keyHighlights: [
      'Over 120 historic stone temples spanning 7 centuries across the village and fields',
      'The Durga Temple: World-renowned apsidal sanctum and gallery with life-sized ceiling sculptures',
      'Lad Khan Temple: One of the oldest structural stone temples in peninsular India',
      'Ravana Phadi Cave: 6th-century monolithic rock-cut cave featuring 10-armed Nataraja',
      'Meguti Temple & 634 CE Inscription: Composed by court poet Ravikirti dating Emperor Pulakeshin II & Kalidasa'
    ],
    historicalEra: '5th Century – 12th Century CE',
    bestTimeToVisit: 'October to March (cool days ideal for walking between scattered temple clusters)',
    timings: '06:00 AM – 06:00 PM (Daily)',
    entryFee: '₹25 for Indians, ₹300 for Foreign tourists (covers main ASI enclosure)',
    photography: 'Allowed across monuments and museum grounds',
    coordinates: {
      lat: 16.0205,
      lng: 75.8829
    },
    distanceFromBagalkotKm: 44,
    distanceFromBadamiKm: 34,
    howToReach: {
      byRoad: 'Situated 34 km from Badami and 13 km from Pattadakal. Direct road connection via SH-14 and Hungund-Aihole road.',
      byRail: 'Badami Station (34 km) or Bagalkot Station (44 km).',
      nearestAirport: 'Hubballi Airport (138 km).'
    },
    nearbyAttractions: ['Pattadakal (13 km)', 'Badami (34 km)', 'Kudalasangama (42 km)'],
    featured: true
  },
  {
    id: 'kudalasangama',
    name: 'Kudalasangama',
    kannadaName: 'ಕೂಡಲಸಂಗಮ',
    hindiName: 'कुडलसंगम',
    tagline: 'Sacred Confluence of Rivers Krishna & Malaprabha & Sri Basaveshwara Samadhi',
    taluk: 'Hungund',
    category: 'Confluence & Sacred',
    rating: 4.8,
    reviewsCount: 1650,
    image: '/images/monuments/virupaksha-view2.jpg',
    galleryImages: [
      '/images/monuments/virupaksha-view2.jpg',
      '/images/monuments/carvings-pattadakal.jpg'
    ],
    shortDescription: 'The holy sangama (confluence) of the Krishna and Malaprabha rivers and the eternal resting place (Aikya Mantapa) of 12th-century philosopher-saint Sri Basaveshwara.',
    fullOverview: 'Kudalasangama is an eminent pilgrim center situated at the confluence of the holy Krishna and Malaprabha rivers in Bagalkot District. It is sanctified by the presence of Sri Basaveshwara, the revolutionary 12th-century social reformer, philosopher, and founder of the Sharana movement. The historic Sangameshwara Temple dates back to the Chalukyan era, while an engineered cylindrical protective well (Aikya Mantapa) allows devotees to visit the saint’s samadhi safely amidst the surrounding Almatti reservoir backwaters.',
    kannadaOverview: 'ಪವಿತ್ರ ಕೃಷ್ಣಾ ಮತ್ತು ಮಲಪ್ರಭಾ ನದಿಗಳ ಸಂಗಮ ಕ್ಷೇತ್ರವಾದ ಕೂಡಲಸಂಗಮವು 12ನೇ ಶತಮಾನದ ಸಮಾಜ ಸುಧಾರಕ, ಶರಣ ಚಳವಳಿಯ ಪ್ರವರ್ತಕ ಜಗದ್ಜ್ಯೋತಿ ಶ್ರೀ ಬಸವೇಶ್ವರರ ಐಕ್ಯ ಮಂಟಪವನ್ನು ಹೊಂದಿರುವ ಪರಮ ಪವಿತ್ರ ಪುಣ್ಯಕ್ಷೇತ್ರ. ಇಲ್ಲಿನ ಪ್ರಾಚೀನ ಸಂಗಮೇಶ್ವರ ದೇವಾಲಯವು ಚಾಲುಕ್ಯ ಶೈಲಿಯಲ್ಲಿದೆ. ಆಲಮಟ್ಟಿ ಜಲಾಶಯದ ಹಿನ್ನೀರಿನ ನಡುವೆ ನಿರ್ಮಿಸಲಾದ ರಕ್ಷಣಾ ಕವಚದೊಳಗಿನ ಐಕ್ಯ ಮಂಟಪ ಮತ್ತು ಅಂತರರಾಷ್ಟ್ರೀಯ ಬಸವ ಕೇಂದ್ರವು ಲಕ್ಷಾಂತರ ಪ್ರವಾಸಿಗರನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ.',
    hindiOverview: 'पवित्र कृष्णा और मलप्रभा नदियों के संगम पर स्थित कुडलसंगम 12वीं शताब्दी के महान समाज सुधारक एवं दार्शनिक जगद्गुरु श्री बसवेश्वर की पावन समाधि (ऐक्य मंडप) का स्थल है। यहाँ स्थित ऐतिहासिक संगमेश्वर मंदिर कल्याणी चालुक्य शैली का उत्कृष्ट उदाहरण है। अलमट्टी बांध के विशाल बैकवाटर के बीच स्थित बेलनाकार ऐक्य मंडप और अंतरराष्ट्रीय बसव केंद्र प्रमुख आकर्षण हैं।',
    epigraphyAndInscriptions: [
      '12th-century Kalyana Chalukya royal stone inscriptions recording grants to Lord Sangameshwara',
      'Vachana epigraphical archives immortalizing the historic reformist teachings of Basavanna and the Anubhava Mantapa'
    ],
    architecturalStyleDetails: 'Kalyana Chalukya river-ghat stone temple architecture fused with contemporary circular hydro-protective engineering surrounding the sacred Aikya Samadhi.',
    keyHighlights: [
      'Confluence (Sangama) point of the sacred Krishna and Malaprabha rivers',
      'Aikya Mantapa: The sanctified samadhi of Sri Basaveshwara encased in a cylindrical stone tower',
      'Ancient Sangameshwara Temple featuring Chalukyan carvings, pillars, and sanctum',
      'Basava International Centre and museum dedicated to Vachana literature and social equality',
      'Serene river ghats, boat rides, and sprawling landscaped spiritual gardens'
    ],
    historicalEra: '12th Century CE (Kalyana Chalukyas & Sharana Movement)',
    bestTimeToVisit: 'July to February (Pleasant weather, scenic high water levels in rivers)',
    timings: '05:00 AM – 09:00 PM (Daily)',
    entryFee: 'Free entry to temple and Aikya Mantapa; nominal fee for boat rides',
    photography: 'Allowed on river ghats and campus; restricted inside sanctum',
    coordinates: {
      lat: 16.2081,
      lng: 76.0847
    },
    distanceFromBagalkotKm: 52,
    distanceFromBadamiKm: 70,
    howToReach: {
      byRoad: '52 km east of Bagalkot via NH-52 and Hungund road. Excellent 4-lane connectivity.',
      byRail: 'Bagalkot Railway Station (52 km) or Almatti Railway Station (35 km).',
      nearestAirport: 'Hubballi Airport (155 km); Belagavi Airport (190 km).'
    },
    nearbyAttractions: ['Almatti Dam (38 km)', 'Aihole (42 km)', 'Bagalkot City (52 km)'],
    featured: true
  },
  {
    id: 'almatti',
    name: 'Almatti (Lal Bahadur Shastri Dam)',
    kannadaName: 'ಆಲಮಟ್ಟಿ ಅಣೆಕಟ್ಟು (ಲಾಲ್ ಬಹದ್ದೂರ್ ಶಾಸ್ತ್ರಿ ಸಾಗರ)',
    hindiName: 'अलमट्टी बांध (लाल बहादुर शास्त्री सागर)',
    tagline: 'North Karnataka’s Engineering Marvel, Mughal Gardens & Musical Fountains',
    taluk: 'Nidagundi / Bilgi Border',
    category: 'Dams & Nature',
    rating: 4.7,
    reviewsCount: 1340,
    image: '/images/monuments/almatti-dam.jpg',
    galleryImages: [
      '/images/monuments/almatti-dam.jpg',
      '/images/monuments/almatti-panoramic.jpg',
      '/images/monuments/almatti-downstream.jpg',
      '/images/monuments/almatti-gardens.jpg',
      '/images/monuments/almatti-reservoir.jpg'
    ],
    shortDescription: 'The crown jewel of the Upper Krishna Project with a massive reservoir, illuminated landscaped Mughal gardens, musical fountains, and boating lagoons.',
    fullOverview: 'The Almatti Dam, officially named Lal Bahadur Shastri Dam, is one of the largest engineering projects in Karnataka, built across the Krishna River in Bagalkot District. The dam not only irrigates lakhs of hectares across North Karnataka but has also been developed into a top-tier tourist leisure destination. The complex features terraced Mughal-style gardens, a vibrant musical dancing fountain, a rock garden, boating facilities, and scenic panoramic viewpoints over the vast backwaters.',
    kannadaOverview: 'ಕೃಷ್ಣಾ ನದಿಗೆ ಅಡ್ಡಲಾಗಿ ನಿರ್ಮಿಸಲಾದ ಆಲಮಟ್ಟಿ ಅಣೆಕಟ್ಟು (ಲಾಲ್ ಬಹದ್ದೂರ್ ಶಾಸ್ತ್ರಿ ಜಲಾಶಯ) ಉತ್ತರ ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆಯ ಜಲವಿದ್ಯುತ್ ಹಾಗೂ ನೀರಾವರಿ ಯೋಜನೆಯಾಗಿದೆ. ಇಲ್ಲಿ ಸುಂದರ ಮೊಘಲ್ ಉದ್ಯಾನವನ, ಸಂಜೆಯ ಲೇಸರ್ ಮ್ಯೂಸಿಕಲ್ ಫೌಂಟೇನ್, ಕಲ್ಲಿನ ಉದ್ಯಾನವನ (ರಾಕ್ ಗಾರ್ಡನ್) ಮತ್ತು ಬೋಟಿಂಗ್ ಸೌಲಭ್ಯಗಳಿದ್ದು, ಕುಟುಂಬ ಸಮೇತ ಭೇಟಿ ನೀಡಲು ಅತ್ಯುತ್ತಮ ಪ್ರವಾಸಿ ತಾಣವಾಗಿದೆ.',
    hindiOverview: 'कृष्णा नदी पर निर्मित अलमट्टी बांध (लाल बहादुर शास्त्री सागर) उत्तरी कर्नाटक की जीवनरेखा और प्रमुख पर्यटन स्थल है। 1,565 मीटर लंबा यह बांध अपनी विशाल जलराशि, वृंदावन गार्डन की तर्ज पर बने भव्य मुगल गार्डन, शाम के समय लेजर युक्त संगीतमय फव्वारे (म्यूजिकल फाउंटेन) और नौका विहार के लिए प्रसिद्ध है।',
    epigraphyAndInscriptions: [
      'Upper Krishna Project historical dedication plaque commemorating Prime Minister Lal Bahadur Shastri and modern Karnataka hydraulic engineers'
    ],
    architecturalStyleDetails: 'Modern Hydraulic Masonry and Earthen Dam Engineering integrated with terraced Mughal landscape gardens, illuminated water promenades, and eco-parks.',
    keyHighlights: [
      'Massive 1,565-metre masonry and earthen dam spanning the Krishna River',
      'Spectacular landscaped gardens inspired by Brindavan Gardens (Mughal Garden, Krishna Garden)',
      'High-tech laser musical dancing fountain shows in the evenings',
      'Rock Garden with artistic sculptures portraying traditional North Karnataka village life',
      'Boating facilities on the sprawling reservoir backwaters'
    ],
    historicalEra: 'Modern Karnataka Engineering & Tourism Marvel (Commissioned 2005)',
    bestTimeToVisit: 'August to January (dam gates open during monsoon, post-monsoon greenery)',
    timings: '10:00 AM – 08:30 PM (Musical fountain shows start at 07:00 PM)',
    entryFee: '₹20 garden entry; ₹30 for Musical Fountain; nominal parking fees',
    photography: 'Allowed in gardens and viewpoints; restricted near high-security dam crest',
    coordinates: {
      lat: 16.3292,
      lng: 75.8887
    },
    distanceFromBagalkotKm: 36,
    distanceFromBadamiKm: 68,
    howToReach: {
      byRoad: '36 km north of Bagalkot on NH-52. Direct highway access with scenic roadside views.',
      byRail: 'Almatti Railway Station (LMT) is 3 km from the dam with stops for express trains.',
      nearestAirport: 'Hubballi Airport (145 km); Belagavi Airport (165 km).'
    },
    nearbyAttractions: ['Kudalasangama (38 km)', 'Bagalkot (36 km)', 'Bilgi Stepwells (30 km)'],
    featured: true
  },
  {
    id: 'banashankari',
    name: 'Banashankari Amma Temple',
    kannadaName: 'ಬನಶಂಕರಿ ದೇವಾಲಯ',
    hindiName: 'बनशंकरी अम्मा मंदिर',
    tagline: 'Ancient 7th-Century Shakthi Shrine & Sacred Haridra Tirtha Pushkarini',
    taluk: 'Badami',
    category: 'Ancient Temples',
    rating: 4.8,
    reviewsCount: 1510,
    image: '/images/monuments/banashankari.jpg',
    galleryImages: [
      '/images/monuments/banashankari.jpg',
      '/images/monuments/badami-caves-exterior.jpg'
    ],
    shortDescription: 'A revered 7th-century sanctuary dedicated to Goddess Shakakambhari (Banashankari), located amidst the sacred Tilakaaranya forest with its massive stepped water tank.',
    fullOverview: 'Located just 5 km from Badami along the road to Gadag, the Banashankari Temple is one of the most venerated Shakthi shrines in North Karnataka. Originally founded in the 7th century by the Badami Chalukyas and later renovated during the Vijayanagara and Maratha periods, the temple houses a magnificent black stone idol of eight-armed Goddess Banashankari mounted on a lion. In front of the temple lies Haridra Tirtha, a massive square pushkarini pool with stone pavilions (deepamalas) on all four sides.',
    kannadaOverview: 'ಬಾದಾಮಿಯಿಂದ ಕೇವಲ 5 ಕಿಮೀ ದೂರದಲ್ಲಿರುವ ಬನಶಂಕರಿ ಅಮ್ಮನವರ ದೇವಾಲಯವು ಉತ್ತರ ಕರ್ನಾಟಕದ ಅತಿ ಪ್ರಸಿದ್ಧ ಶಕ್ತಿಪೀಠವಾಗಿದೆ. ಕ್ರಿ.ಶ. 7ನೇ ಶತಮಾನದಲ್ಲಿ ಬಾದಾಮಿ ಚಾಲುಕ್ಯರಿಂದ ಸ್ಥಾಪಿಸಲ್ಪಟ್ಟ ಈ ದೇಗುಲದಲ್ಲಿ ಎಂಟು ಕೈಗಳ ಕಪ್ಪು ಶಿಲೆಯ ಸಿಂಹವಾಹಿನಿ ದೇವಿಯ ಮೂರ್ತಿಯಿದೆ. ದೇವಾಲಯದ ಎದುರಿನ ಹರಿದ್ರ ತೀರ್ಥ ಪುಷ್ಕರಿಣಿ, ವಿಜಯನಗರ-ಮರಾಠಾ ಶೈಲಿಯ ದೀಪಸ್ತಂಭಗಳು ಮತ್ತು ಪ್ರತಿ ವರ್ಷ ಜನವರಿ-ಫೆಬ್ರವರಿಯಲ್ಲಿ ನಡೆಯುವ ತಿಂಗಳ ಪರ್ಯಂತದ ಬನಶಂಕರಿ ಜಾತ್ರೆ ಅತ್ಯಂತ ಜನಪ್ರಿಯ.',
    hindiOverview: 'बादामी से मात्र 5 किमी दूर स्थित बनशंकरी देवी मंदिर उत्तरी कर्नाटक का अत्यंत पूजनीय शक्ति पीठ है। 7वीं शताब्दी में बादामी चालुक्यों द्वारा स्थापित इस मंदिर में सिंह पर सवार अष्टभुजा बनशंकरी (शाकंभरी) देवी की भव्य काले पाषाण की मूर्ति है। मंदिर के सम्मुख स्थित विशाल हरिद्रा तीर्थ पुष्करिणी कुंड, भव्य दीपमालाएं और वार्षिक बनशंकरी जात्रा मेला विश्वविख्यात हैं।',
    epigraphyAndInscriptions: [
      'Kannada stone inscription (1019 CE) of Western Chalukya King Jagadekamalla I recording land endowments to Goddess Banashankari',
      '18th-century Maratha stone records documenting the renovation of the Haridra Tirtha stepped pavilion'
    ],
    architecturalStyleDetails: 'Composite Early Chalukya Dravidian sanctum enhanced with Vijayanagara pillared corridors and Maratha style stone Deepamala lamp towers.',
    keyHighlights: [
      'Ancient Chalukyan Shakthi shrine venerating Goddess Banashankari (Shakambhari)',
      'Eight-armed deity slaying the demon Durgamasura under her feet',
      'Haridra Tirtha: Grand stepped sacred tank surrounded by stone corridors and viewing towers',
      'Unique stone lamp towers (Deepamalas) built in Maratha and Vijayanagara architectural styles',
      'Hosts the legendary month-long Banashankari Jathre every January/February'
    ],
    historicalEra: '7th Century Chalukya Foundation; 18th Century Renovations',
    bestTimeToVisit: 'Year-round; January–February during the annual Banashankari Jathre',
    timings: '06:00 AM – 01:00 PM and 04:30 PM – 08:30 PM (Daily)',
    entryFee: 'Free entry (Special pooja tickets available at temple counter)',
    photography: 'Allowed on exterior campus and pushkarini; prohibited inside inner sanctum',
    coordinates: {
      lat: 15.8753,
      lng: 75.7003
    },
    distanceFromBagalkotKm: 39,
    distanceFromBadamiKm: 5,
    howToReach: {
      byRoad: 'Just 5 km south of Badami on the Badami-Gadag road (SH-14). Accessible by auto-rickshaw or bus in 10 minutes.',
      byRail: 'Badami Railway Station (7 km).',
      nearestAirport: 'Hubballi Airport (100 km).'
    },
    nearbyAttractions: ['Badami Caves (5 km)', 'Mahakuta (18 km)', 'Pattadakal (26 km)'],
    featured: true
  },
  {
    id: 'mahakuta',
    name: 'Mahakuta Group of Temples',
    kannadaName: 'ಮಹಾಕೂಟ ದೇವಾಲಯಗಳ ಸಮೂಹ',
    hindiName: 'महाकूट मंदिर समूह',
    tagline: 'Serene Forest Sanctuary with Perennial Natural Springs & Shiva Shrines',
    taluk: 'Badami',
    category: 'Ancient Temples',
    rating: 4.8,
    reviewsCount: 890,
    image: '/images/monuments/mahakuta.jpg',
    galleryImages: [
      '/images/monuments/mahakuta.jpg',
      '/images/monuments/carvings-pattadakal.jpg'
    ],
    shortDescription: 'A peaceful forested retreat cradling 7th-century Early Chalukyan temples centered around the Vishnu Pushkarini, a sacred pool fed by natural freshwater springs.',
    fullOverview: 'Tucked away in a tranquil wooded ravine 14 km from Badami, the Mahakuta complex is one of the most evocative spiritual sites in Bagalkot. Dating back to the 6th and 7th centuries during the reigns of Chalukya kings Pulakeshin I and Mangalesha, the complex comprises around two dozen stone temples dedicated to Lord Shiva. At its heart lies the holy Vishnu Pushkarini, a crystal-clear natural spring where pilgrims bathe. A rare submerged five-faced Shiva linga (Panchamukha Linga) graces the center of the water pavilion.',
    kannadaOverview: 'ಬಾದಾಮಿಯಿಂದ 14 ಕಿಮೀ ದೂರದ ಹಸಿರು ಕಣಿವೆಯಲ್ಲಿರುವ ಮಹಾಕೂಟವು ಕ್ರಿ.ಶ. 6-7ನೇ ಶತಮಾನದ ಚಾಲುಕ್ಯ ಶೈವ ಸಂಸ್ಕೃತಿಯ ಅದ್ಭುತ ಕೇಂದ್ರವಾಗಿದೆ. ಇಲ್ಲಿನ ಪ್ರಮುಖ ಆಕರ್ಷಣೆ ನೈಸರ್ಗಿಕ ಶುದ್ಧ ನೀರಿನ ಬುಗ್ಗೆಯಿಂದ ಕೂಡಿದ "ವಿಷ್ಣು ಪುಷ್ಕರಿಣಿ". ನೀರಿನ ಒಳಗೆ ಅಪರೂಪದ ಪಂಚಮುಖ ಶಿವಲಿಂಗವಿದೆ. ಪ್ರಾಚೀನ ಮಹಾಕೂಟೇಶ್ವರ ಹಾಗೂ ಮಲ್ಲಿಕಾರ್ಜುನ ದೇವಾಲಯಗಳು ಮತ್ತು ಕ್ರಿ.ಶ. 595 ರ ಮಂಗಳೇಶನ ಐತಿಹಾಸಿಕ ಶಿಲಾಸ್ತಂಭ ಶಾಸನವು ಇಲ್ಲಿನ ಪ್ರಮುಖ ದಾಖಲೆಯಾಗಿದೆ.',
    hindiOverview: 'बादामी से 14 किमी दूर घने जंगलों की शांत घाटी में स्थित महाकूट 6वीं-7वीं शताब्दी का प्राचीन चालुक्य शिव तीर्थ है। इसका केंद्र बिंदु पवित्र "विष्णु पुष्करिणी" कुंड है, जो प्राकृतिक मीठे पानी के झरनों से सदैव भरा रहता है। जलकुंड के मध्य एक दुर्लभ पंचमुख शिवलिंग स्थापित है। महाकूटेश्वर मंदिर और 595 ईस्वी का प्रसिद्ध महाकूट स्तंभ शिलालेख चालुक्य राजवंश के इतिहास की अमूल्य धरोहर हैं।',
    epigraphyAndInscriptions: [
      'Mahakuta Pillar Inscription of King Mangalesha (595–602 CE) — Red sandstone pillar recording royal lineage, military conquests of Kirtivarman I, and grant of ten villages to Makuteshwaranatha',
      'Porch inscription of Vinayaditya’s concubine recording religious endowments'
    ],
    architecturalStyleDetails: 'Classic Early Chalukya Dravida Vimana architecture with tiered pyramidal storeys and octagonal griva-shikhara.',
    keyHighlights: [
      'Mahakuteshwara Temple: Main sanctum featuring pristine Early Chalukyan Dravidian shikhara',
      'Vishnu Pushkarini: Sacred perennial spring pool with crystalline natural water',
      'Submerged Panchamukha Linga (five-faced Shiva linga) in the tank pavilion',
      'The famed Mahakuta Pillar Inscription of 595–602 CE recording Chalukya royal lineage',
      'Shaded woodland setting with ancient banyan trees and serene meditative atmosphere'
    ],
    historicalEra: '595 CE – 7th Century CE (King Mangalesha Period)',
    bestTimeToVisit: 'October to February (ideal cool weather and fresh spring water)',
    timings: '06:00 AM – 06:30 PM (Daily)',
    entryFee: 'Free entry for all visitors',
    photography: 'Allowed on temple grounds and courtyard',
    coordinates: {
      lat: 15.9328,
      lng: 75.7289
    },
    distanceFromBagalkotKm: 38,
    distanceFromBadamiKm: 14,
    howToReach: {
      byRoad: '14 km east of Badami through scenic village roads. Auto-rickshaws and taxis easily hired from Badami.',
      byRail: 'Badami Railway Station (14 km).',
      nearestAirport: 'Hubballi Airport (118 km).'
    },
    nearbyAttractions: ['Badami Caves (14 km)', 'Pattadakal (12 km)', 'Aihole (25 km)'],
    featured: true
  },
  {
    id: 'bagalkot-city',
    name: 'Bagalkot (District Headquarters)',
    kannadaName: 'ಬಾಗಲಕೋಟೆ (ಜಿಲ್ಲಾ ಕೇಂದ್ರ)',
    hindiName: 'बागलकोट (जिला मुख्यालय)',
    tagline: 'Administrative Heart on Ghataprabha River & Gateway to the Heritage Circuit',
    taluk: 'Bagalkot',
    category: 'Crafts & Culture',
    rating: 4.6,
    reviewsCount: 720,
    image: '/images/monuments/badami-caves-exterior.jpg',
    galleryImages: [
      '/images/monuments/badami-caves-exterior.jpg',
      '/images/monuments/virupaksha.jpg'
    ],
    shortDescription: 'The historic district headquarters along the Ghataprabha River, offering modern transit hubs, rich culinary heritage, and easy hub access to all regional circuits.',
    fullOverview: 'Bagalkot is the administrative and commercial capital of Bagalkot District. Historically ruled by the Chalukyas, Rashtrakutas, and the Adil Shahis of Bijapur, the town was thoughtfully redesigned and rebuilt as Navanagar (New Bagalkot) on higher ground following the construction of the Almatti reservoir. Today, Bagalkot serves as the ultimate base for tourists exploring the Chalukyan heritage trail, with comfortable hotels, excellent railway links, and authentic North Karnataka Jolada Rotti dining.',
    kannadaOverview: 'ಘಟಪ್ರಭಾ ನದಿಯ ದಂಡೆಯಲ್ಲಿರುವ ಬಾಗಲಕೋಟೆಯು ಜಿಲ್ಲಾ ಆಡಳಿತ ಕೇಂದ್ರ ಹಾಗೂ ಪ್ರವಾಸೋದ್ಯಮದ ಹೆಬ್ಬಾಗಿಲಾಗಿದೆ. ಆಲಮಟ್ಟಿ ಜಲಾಶಯದ ನಿರ್ಮಾಣದ ನಂತರ ಯೋಜಿತವಾಗಿ ನಿರ್ಮಿಸಲಾದ ನವನಗರವು ಆಧುನಿಕ ರಸ್ತೆಗಳು ಮತ್ತು ಉದ್ಯಾನವನಗಳನ್ನು ಹೊಂದಿದೆ. ಉತ್ತರ ಕರ್ನಾಟಕದ ಪ್ರಸಿದ್ಧ ಜೋಳದ ರೊಟ್ಟಿ, ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ ಊಟದ ಸವಿಗೆ ಬಾಗಲಕೋಟೆ ಹೆಸರಾಗಿದೆ.',
    hindiOverview: 'घटप्रभा नदी के तट पर स्थित बागलकोट जिला मुख्यालय और चालुक्य हेरिटेज सर्किट का मुख्य प्रवेश द्वार है। अलमट्टी बांध के निर्माण के बाद योजनाबद्ध तरीके से बसाया गया नवनगर आधुनिक सुविधाओं से संपन्न है। यहाँ का पारंपरिक उत्तर कर्नाटक खान-पान (जोलाडा रोटी, शेंगा चटनी और बादामी-पट्टदकल के लिए सीधी कनेक्टिविटी) पर्यटकों को आकर्षित करता है।',
    epigraphyAndInscriptions: [
      'Badami Chalukya copper plate charters mentioning administrative divisions of Bagadage-70 (historical name of Bagalkot)',
      '11th-century Kalyana Chalukya stone epigraphs at nearby Bilgi and Kerur'
    ],
    architecturalStyleDetails: 'Modern planned township (Navanagar) harmonized with traditional Deccan bazaar architecture and historic riverine heritage.',
    keyHighlights: [
      'Ghataprabha River basin and scenic lakeside parks in Navanagar',
      'Hub of North Karnataka culinary delights: authentic Jolada Rotti Oota, Shenga Pudi, and spicy curries',
      'Central transit gateway with direct trains and bus connections across Karnataka and Maharashtra',
      'Modern University of Horticultural Sciences (UHS) campus and regional research centres',
      'Proximity to Kerur rock formations and historic taluk handloom weavers'
    ],
    historicalEra: 'Ancient Chalukya Settlements to Modern Navanagar',
    bestTimeToVisit: 'October to March',
    timings: 'Open City / Urban Commercial Hub',
    entryFee: 'Free',
    photography: 'Allowed across city public spaces',
    coordinates: {
      lat: 16.1817,
      lng: 75.6958
    },
    distanceFromBagalkotKm: 0,
    distanceFromBadamiKm: 34,
    howToReach: {
      byRoad: 'Well-connected via NH-52 (Bijapur-Hubli highway). 480 km from Bengaluru, 120 km from Hubballi.',
      byRail: 'Bagalkot Railway Station (BGK) is a major junction on the South Western Railway.',
      nearestAirport: 'Hubballi Airport (120 km); Belagavi Airport (145 km).'
    },
    nearbyAttractions: ['Badami (34 km)', 'Almatti Dam (36 km)', 'Kudalasangama (52 km)', 'Aihole (44 km)'],
    featured: true
  },
  {
    id: 'ilkal',
    name: 'Ilkal Handloom City',
    kannadaName: 'ಇಲಕಲ್ಲ ಕೈಮಗ್ಗ ನಗರ',
    hindiName: 'इलकल हथकरघा नगरी',
    tagline: 'World-Renowned Geographical Indication (GI) Ilkal Saree Weaving Capital',
    taluk: 'Hungund',
    category: 'Crafts & Culture',
    rating: 4.7,
    reviewsCount: 640,
    image: '/images/monuments/carvings-pattadakal.jpg',
    galleryImages: [
      '/images/monuments/carvings-pattadakal.jpg',
      '/images/monuments/lad-khan-interior.jpg'
    ],
    shortDescription: 'The 8th-century handloom weaving hub famous for its authentic GI-tagged Ilkal Sarees characterized by the distinctive red silk "tope-tenge" pallu and Chikki Paras border.',
    fullOverview: 'Ilkal, located in the southeastern part of Bagalkot District, has been a vibrant textile weaving center since the 8th century CE under the patronage of regional dynasties. The town is globally renowned for the Ilkal Saree, awarded a prestigious Geographical Indication (GI) tag. The defining hallmark of an authentic Ilkal saree is its "tope-tenge" pallu, where the cotton body and silk pallu are joined through an ingenious ancient interlocking loop technique called "Kondi". Visitors can witness master weavers operating traditional pit looms in heritage weaver quarters.',
    kannadaOverview: 'ಕ್ರಿ.ಶ. 8ನೇ ಶತಮಾನದಿಂದಲೂ ಪ್ರಸಿದ್ಧ ಜವಳಿ ನೇಯ್ಗೆ ಕೇಂದ್ರವಾಗಿರುವ ಇಲಕಲ್ಲ ತನ್ನ ಭೌಗೋಳಿಕ ಮಾನ್ಯತೆ (GI Tag) ಪಡೆದ ಇಲಕಲ್ ಸೀರೆಗಳಿಗೆ ವಿಶ್ವವಿಖ್ಯಾತವಾಗಿದೆ. ಹತ್ತಿಯ ಮೈಭಾಗ ಮತ್ತು ರೇಷ್ಮೆಯ ಪಲ್ಲುವನ್ನು ಜೋಡಿಸುವ ಪ್ರಾಚೀನ "ಕೊಂಡಿ" ತಂತ್ರಜ್ಞಾನ ಹಾಗೂ ಕೆಂಪು-ಬಿಳಿ ಗೋಪುರಗಳಂತಹ "ಟೋಪೆ-ತೆಂಗೆ" ಪಲ್ಲು ಇದರ ಅನನ್ಯ ವೈಶಿಷ್ಟ್ಯ. ಇಲ್ಲಿನ ಸಾಂಪ್ರದಾಯಿಕ ಪಿಟ್ ಲೂಮ್ ನೇಯ್ಗೆ ಮತ್ತು ರುಚಿಕರವಾದ ಇಲಕಲ್ ಕರದಂಟು ಪ್ರವಾಸಿಗರ ನೆಚ್ಚಿನ ಅನುಭವ.',
    hindiOverview: '8वीं शताब्दी से हथकरघा उद्योग का प्रसिद्ध केंद्र रहा इलकल अपने जीआई टैग (GI Tag) प्राप्त इलकल साड़ियों के लिए विश्व भर में विख्यात है। सूती बॉडी और रेशमी पल्लू को जोड़ने वाली प्राचीन "कोंडी" तकनीक और विशिष्ट लाल "टोपे-तेंगो" मंदिर पल्लू इसकी मुख्य पहचान है। यहाँ पारंपरिक हथकरघा बुनकरों के कार्य को प्रत्यक्ष देखा जा सकता है और प्रसिद्ध इलकल करदंटू का स्वाद लिया जा सकता है।',
    epigraphyAndInscriptions: [
      'Guild epigraphs of the Chalukya and Vijayanagara eras recording state patronage and tax remissions for textile artisan guilds (Kaikolars)'
    ],
    architecturalStyleDetails: 'Heritage Artisan Pit Loom quarters, traditional open-courtyard Deccan stone weaver households, and historic saree bazaars.',
    keyHighlights: [
      'Geographical Indication (GI) certified heritage handloom industry',
      'Unique "Kondi" interlocking joint connecting cotton body to pure silk pallu',
      'Distinctive "Tope Tenge" temple spire motifs in rich crimson and gold threads',
      'Historic pit loom artisan cooperatives and direct saree shopping',
      'Taste authentic Ilkal Karadantu (nutritious sweet made from edible gum, nuts, and dry fruits)'
    ],
    historicalEra: '8th Century CE Handloom Guild Traditions',
    bestTimeToVisit: 'October to February',
    timings: '09:00 AM – 08:00 PM (Weaver cooperatives & shops)',
    entryFee: 'Free entry to weaving colonies and markets',
    photography: 'Allowed with permission of local master weavers',
    coordinates: {
      lat: 15.9600,
      lng: 76.1300
    },
    distanceFromBagalkotKm: 60,
    distanceFromBadamiKm: 55,
    howToReach: {
      byRoad: '60 km southeast of Bagalkot on the NH-50 / SH-14 highway. Frequent buses connect from Bagalkot and Badami.',
      byRail: 'Bagalkot Railway Station (60 km).',
      nearestAirport: 'Hubballi Airport (165 km).'
    },
    nearbyAttractions: ['Aihole (32 km)', 'Pattadakal (42 km)', 'Kudalasangama (35 km)'],
    featured: false
  },
  {
    id: 'guledgudda',
    name: 'Guledgudda (Hill of Jaggery)',
    kannadaName: 'ಗುಳೇದಗುಡ್ಡ',
    hindiName: 'गुलेडगुड्डा',
    tagline: 'Historic Hill Fort & Famed Traditional Khana Blouse Weaving Center',
    taluk: 'Guledgudda',
    category: 'Crafts & Culture',
    rating: 4.6,
    reviewsCount: 480,
    image: '/images/monuments/badami-fort.jpg',
    galleryImages: [
      '/images/monuments/badami-fort.jpg',
      '/images/monuments/durga-temple.jpg'
    ],
    shortDescription: 'A historic hill town nestled amid scenic sandstone crags, famed for its centuries-old handloom Khana (choli) blouse fabric and ancient hill-temple panoramas.',
    fullOverview: 'Located just 22 km northeast of Badami, Guledgudda is an ancient town nestled in a picturesque sandstone valley with a steep hilltop fort. The town is celebrated across India for its traditional "Guledgudda Khana" — the exquisite hand-woven, patterned pure cotton-and-silk blouse fabric with centuries of royal history. Along with its weaving culture, visitors can hike up the historic hill to visit ancient stepwells, the Venkateshwara Temple, and enjoy sweeping vistas of the North Karnataka Deccan plains.',
    kannadaOverview: 'ಬಾದಾಮಿಯಿಂದ 22 ಕಿಮೀ ದೂರದಲ್ಲಿರುವ ಗುಳೇದಗುಡ್ಡವು ಮರಳುಗಲ್ಲಿನ ಸುಂದರ ಬೆಟ್ಟಗಳ ಸಾಲಿನಲ್ಲಿರುವ ಐತಿಹಾಸಿಕ ಪಟ್ಟಣ. ಶತಮಾನಗಳ ಇತಿಹಾಸವಿರುವ "ಗುಳೇದಗುಡ್ಡ ಖಣ" (ರವಿಕೆ ಕಣ) ಕೈಮಗ್ಗ ನೇಯ್ಗೆಗೆ ಈ ಊರು ಭಾರತಾದ್ಯಂತ ಪ್ರಖ್ಯಾತವಾಗಿದೆ. ಬೆಟ್ಟದ ಮೇಲಿನ ಕೋಟೆ, ವೆಂಕಟೇಶ್ವರ ದೇವಾಲಯ, ಪ್ರಾಚೀನ ಕಲ್ಯಾಣಿಗಳು ಮತ್ತು ಕಣಿವೆ ನೋಟಗಳು ಇಲ್ಲಿನ ಮುಖ್ಯ ಆಕರ್ಷಣೆಗಳಾಗಿವೆ.',
    hindiOverview: 'बादामी से 22 किमी दूर स्थित गुलेडगुड्डा बलुआ पत्थर की पहाड़ियों और ऐतिहासिक पहाड़ी किले के लिए विख्यात है। यह शहर सदियों पुरानी "गुलेडगुड्डा खना" (पारंपरिक चोली/ब्लाउज का हाथ से बुना कपड़ा) हथकरघा कला के लिए पूरे भारत में प्रसिद्ध है। पहाड़ी पर स्थित प्राचीन बावड़ियां और वेंकटेश्वर मंदिर दर्शनीय हैं।',
    epigraphyAndInscriptions: [
      '16th-century Adil Shahi and Maratha fort inscriptions recording military outposts and trade route taxations'
    ],
    architecturalStyleDetails: 'Deccan Hill Fort fortifications, stone stepwells (Baolis), and specialized artisan weaver tenements.',
    keyHighlights: [
      'Traditional "Guledgudda Khana" handloom weaving clusters',
      'Scenic hill fort overlooking the sandstone ravines and agricultural valley',
      'Historic Venkateshwara Temple and stone stepwells (Baolis)',
      'Centuries-old market streets offering authentic local fabrics directly from artisans',
      'Picturesque stone architecture reflecting Deccan village traditions'
    ],
    historicalEra: '16th Century Adil Shahi & Maratha Period',
    bestTimeToVisit: 'October to February',
    timings: '08:00 AM – 06:00 PM',
    entryFee: 'Free',
    photography: 'Allowed across town and hill fort trails',
    coordinates: {
      lat: 16.0500,
      lng: 75.7833
    },
    distanceFromBagalkotKm: 24,
    distanceFromBadamiKm: 22,
    howToReach: {
      byRoad: '24 km south of Bagalkot and 22 km from Badami. Accessible via state highway in 30 minutes.',
      byRail: 'Guledagudda Road Railway Station (GDM) on the Hubli-Solapur line.',
      nearestAirport: 'Hubballi Airport (125 km).'
    },
    nearbyAttractions: ['Badami (22 km)', 'Pattadakal (18 km)', 'Bagalkot (24 km)'],
    featured: false
  },
  {
    id: 'bilgi',
    name: 'Bilgi Historic Stepwells & Temples',
    kannadaName: 'ಬೀಳಗಿ ಐತಿಹಾಸಿಕ ತಾಣಗಳು',
    hindiName: 'बीलगी ऐतिहासिक बावड़ियां एवं मंदिर',
    tagline: '16th-Century Royal Arekal Siddeshwara Temple & Royal Aralikatti Stepwells',
    taluk: 'Bilgi',
    category: 'Ancient Temples',
    rating: 4.5,
    reviewsCount: 390,
    image: '/images/monuments/lad-khan.jpg',
    galleryImages: [
      '/images/monuments/lad-khan.jpg',
      '/images/monuments/virupaksha.jpg'
    ],
    shortDescription: 'A historic taluk center famous for its rock-hewn Arekal Siddeshwara Temple and the monumental 16th-century Aralikatti Baoli (royal stepped well).',
    fullOverview: 'Bilgi is an ancient town in Bagalkot District with significant heritage from the 16th and 17th centuries under local Vijayanagara-era Nayaka rulers. The prime architectural marvel is the Arekal Siddeshwara Temple, built uniquely inside a natural rock shelter on a low hill. Nearby lies the Aralikatti Baoli, an elaborate stone stepwell featuring Persian and Kannada inscriptions, royal dressing chambers, and decorative stone archways that provided cooling retreats for royalty.',
    kannadaOverview: 'ಬೀಳಗಿಯು 16-17ನೇ ಶತಮಾನದ ವಿಜಯನಗರ ಕಾಲದ ನಾಯಕರ ಆಳ್ವಿಕೆಯಲ್ಲಿದ್ದ ಐತಿಹಾಸಿಕ ತಾಣ. ಬಂಡೆಯ ಗುಹೆಯೊಳಗೆ ನಿರ್ಮಿಸಲಾದ ಅರೆಕಲ್ ಸಿದ್ದೇಶ್ವರ ದೇವಾಲಯ ಮತ್ತು ಕನ್ನಡ-ಪರ್ಷಿಯನ್ ಭಾಷೆಗಳ ಶಾಸನಗಳನ್ನು ಹೊಂದಿರುವ ಐತಿಹಾಸಿಕ "ಅರಳಿ ಕಟ್ಟೆ ಬಾವಿ" (ರಾಜಮನೆತನದ ಕಲ್ಯಾಣಿ) ಇಲ್ಲಿನ ಮುಖ್ಯ ಶಿಲ್ಪಕಲಾ ವಿಸ್ಮಯಗಳಾಗಿವೆ.',
    hindiOverview: 'बीलगी 16वीं-17वीं शताब्दी के विजयनगर कालीन नायकों की विरासत समेटे हुए है। यहाँ की प्राकृतिक चट्टान गुफा के भीतर बना अरेकल सिद्धेश्वर मंदिर और फारसी व कन्नड़ द्विभाषी शिलालेखों वाली 16वीं सदी की अरलिकट्टी बावड़ी (शाही बावड़ी) वास्तुकला के अनूठे नमूने हैं।',
    epigraphyAndInscriptions: [
      'Bilingual Kannada and Persian inscription (1588 CE) at Aralikatti Baoli commissioned by Visvanatha Nayaka of Bilgi recording the well construction and public water endowment'
    ],
    architecturalStyleDetails: 'Vijayanagara-Deccan transition water architecture featuring subterranean arcaded chambers, dressed stone steps, and troglodytic cave shrines.',
    keyHighlights: [
      'Arekal Siddeshwara Temple: Unique temple built inside a natural rock cave cavern',
      'Aralikatti Stepwell (Baoli): 16th-century stepped royal water monument with arched pavilions',
      'Bilingual Persian and Kannada stone inscriptions chronicling 16th-century history',
      'Panoramic sunset viewpoints over the Ghataprabha canal networks',
      'Peaceful rural heritage setting away from crowded tourist circuits'
    ],
    historicalEra: '16th – 17th Century CE (Bilgi Nayakas & Vijayanagara Period)',
    bestTimeToVisit: 'October to February',
    timings: '06:00 AM – 06:00 PM',
    entryFee: 'Free',
    photography: 'Allowed across stepwells and temple exterior',
    coordinates: {
      lat: 16.3475,
      lng: 75.6178
    },
    distanceFromBagalkotKm: 30,
    distanceFromBadamiKm: 64,
    howToReach: {
      byRoad: '30 km northwest of Bagalkot on the Bagalkot-Bijapur route via Bilgi.',
      byRail: 'Bagalkot Railway Station (30 km).',
      nearestAirport: 'Hubballi Airport (150 km).'
    },
    nearbyAttractions: ['Almatti Dam (30 km)', 'Bagalkot (30 km)', 'Mudhol (40 km)'],
    featured: false
  },
  {
    id: 'mudhol',
    name: 'Mudhol (Ghataprabha Heritage & Canine Pride)',
    kannadaName: 'ಮುಧೋಳ',
    hindiName: 'मुधोल (घटप्रभा विरासत)',
    tagline: 'Historic Princely State on Ghataprabha River & Home of the Mudhol Hound',
    taluk: 'Mudhol',
    category: 'Crafts & Culture',
    rating: 4.5,
    reviewsCount: 410,
    image: '/images/monuments/bhutanatha.jpg',
    galleryImages: [
      '/images/monuments/bhutanatha.jpg',
      '/images/monuments/badami-caves.jpg'
    ],
    shortDescription: 'A historic royal principality on the Ghataprabha River, celebrated for its Ghorpade royal dynasty, historic riverside temples, and the indigenous Mudhol Hound breed.',
    fullOverview: 'Mudhol is a historic town in Bagalkot District, renowned as the capital of the Ghorpade Maratha princely state. Situated gracefully along the banks of the Ghataprabha River, the town is world-famous for giving its name to the Mudhol Hound, an elite ancient Indian sighthound breed prized for its speed, stamina, and loyalty since the era of Chhatrapati Shivaji Maharaj. The town features the old royal palace grounds, riverside ghats, and vibrant agricultural markets.',
    kannadaOverview: 'ಘಟಪ್ರಭಾ ನದಿಯ ತೀರದಲ್ಲಿರುವ ಮುಧೋಳವು ಐತಿಹಾಸಿಕ ಘೋರ್ಪಡೆ ರಾಜಮನೆತನದ ರಾಜಧಾನಿಯಾಗಿತ್ತು. ಛತ್ರಪತಿ ಶಿವಾಜಿ ಮಹಾರಾಜರ ಕಾಲದಿಂದಲೂ ತನ್ನ ನಿಷ್ಠೆ, ವೇಗ ಮತ್ತು ಕಾವಲು ಶಕ್ತಿಗೆ ಹೆಸರುವಾಸಿಯಾದ ವಿಶ್ವವಿಖ್ಯಾತ "ಮುಧೋಳ ಹೌಂಡ್" (ಮುಧೋಳ ನಾಯಿ ತಳಿ) ಈ ಊರಿನ ಹೆಮ್ಮೆ. ಇಲ್ಲಿ ನಾಯಿ ಸಂಶೋಧನಾ ಕೇಂದ್ರ (CRIC), ಹಳೆಯ ಅರಮನೆ ಮತ್ತು ಘಟಪ್ರಭಾ ನದಿಯ ಸುಂದರ ಸ್ನಾನಘಟ್ಟಗಳಿವೆ.',
    hindiOverview: 'घटप्रभा नदी के तट पर स्थित मुधोल घोरपड़े मराठा रियासत की ऐतिहासिक राजधानी रहा है। यह शहर विश्वप्रसिद्ध भारतीय शिकारी श्वान नस्ल "मुधोल हाउंड" के लिए जाना जाता है, जिसे छत्रपति शिवाजी महाराज की सेना में भी सम्मान प्राप्त था। यहाँ कैनाइन रिसर्च सेंटर, शाही महल और नदी के घाट दर्शनीय हैं।',
    epigraphyAndInscriptions: [
      'Ghorpade Royal Sanads and Maratha Modi script state archives documenting royal treaties and cavalry divisions'
    ],
    architecturalStyleDetails: 'Maratha-Deccan Princely architecture featuring river stone Ghats, Wada courtyards, and equestrian pavilions.',
    keyHighlights: [
      'CRIC (Canine Research and Information Centre) dedicated to the legendary Mudhol Hound',
      'Scenic Ghataprabha River ghats and traditional riverside stone temples',
      'Heritage palaces and historic gates of the Ghorpade royal dynasty',
      'North Karnataka agro-industrial hub famous for sugarcane and jaggery',
      'Rich folk wrestling (Garadi Mane) and martial sports heritage'
    ],
    historicalEra: '17th – 20th Century Royal Ghorpade Principality',
    bestTimeToVisit: 'October to February',
    timings: 'Open Town / Daytime visits',
    entryFee: 'Free',
    photography: 'Allowed across river ghats and public monuments',
    coordinates: {
      lat: 16.3400,
      lng: 75.2800
    },
    distanceFromBagalkotKm: 55,
    distanceFromBadamiKm: 85,
    howToReach: {
      byRoad: '55 km west of Bagalkot via SH-18. Direct bus services from Bagalkot, Belagavi, and Hubballi.',
      byRail: 'Bagalkot Railway Station (55 km) or Ghataprabha Station (50 km).',
      nearestAirport: 'Belagavi Airport (105 km); Hubballi Airport (140 km).'
    },
    nearbyAttractions: ['Jamkhandi (32 km)', 'Bilgi (40 km)', 'Bagalkot (55 km)'],
    featured: false
  },
  {
    id: 'jamkhandi',
    name: 'Jamkhandi Royal Heritage',
    kannadaName: 'ಜಮಖಂಡಿ ರಾಜಮನೆತನ ತಾಣ',
    hindiName: 'जमखंडी राजघराना धरोहर',
    tagline: 'Historic Patwardhan Palace, Sacred Ramtirth Reservoir & Temples',
    taluk: 'Jamkhandi',
    category: 'Ancient Temples',
    rating: 4.6,
    reviewsCount: 520,
    image: '/images/monuments/aihole-complex.jpg',
    galleryImages: [
      '/images/monuments/aihole-complex.jpg',
      '/images/monuments/badami-fort.jpg'
    ],
    shortDescription: 'The former capital of the royal Patwardhan dynasty, featuring royal hilltop palaces, the sacred Ramtirth reservoir, and historic stone temples.',
    fullOverview: 'Jamkhandi, situated in northern Bagalkot District, was the distinguished capital of the Jamkhandi State ruled by the Patwardhan family. The town is enveloped by hills and derives its name from the ancient Jambukeshwara temple. Just 3 km from town lies Ramtirth, a sacred pilgrimage spot with ancient stone temples dedicated to Lord Rama, Shiva, and natural perennial springs where Lord Rama is believed to have halted during his exile.',
    kannadaOverview: 'ಉತ್ತರ ಬಾಗಲಕೋಟೆಯ ಜಮಖಂಡಿಯು ಪಟವರ್ಧನ್ ರಾಜಮನೆತನದ ರಾಜಧಾನಿಯಾಗಿತ್ತು. ಬೆಟ್ಟದ ಕಣಿವೆಯಲ್ಲಿರುವ ಐತಿಹಾಸಿಕ ಜಂಬುಕೇಶ್ವರ ದೇವಾಲಯ, ಪಟವರ್ಧನ್ ಅರಮನೆ ಮತ್ತು 3 ಕಿಮೀ ದೂರದಲ್ಲಿರುವ ರಾಮತೀರ್ಥ ಜಲಾಶಯ ಹಾಗೂ ಪ್ರಾಚೀನ ದೇವಾಲಯಗಳು ಪ್ರವಾಸಿಗರನ್ನು ಸೂಜಿಗಲ್ಲಿನಂತೆ ಸೆಳೆಯುತ್ತವೆ.',
    hindiOverview: 'जमखंडी पटवर्धन राजघराने की पूर्व राजधानी रहा है। शहर से 3 किमी दूर स्थित "रामतीर्थ" प्राकृतिक पहाड़ियों और बारहमासी झरनों से घिरा एक पवित्र तीर्थ स्थल है जहाँ माना जाता है कि भगवान राम वनवास काल में रुके थे। यहाँ का भव्य पटवर्धन राजमहल और प्राचीन जंबुकेश्वर मंदिर प्रसिद्ध हैं।',
    epigraphyAndInscriptions: [
      'Patwardhan dynasty royal charters and 19th-century educational founding records of the Jamkhandi Durbar'
    ],
    architecturalStyleDetails: 'Indo-Saracenic and Maratha Royal Palace architecture integrated with ancient hill water tank pavilions (Ramtirth).',
    keyHighlights: [
      'Ramtirth: Sacred lake and historic stone temple complex surrounded by green hills',
      'The historic Patwardhan Royal Palace and grand ceremonial court halls',
      'Ancient Jambukeshwara Temple in a natural ravine',
      'Scenic views of the fertile Krishna River agricultural valley',
      'Rich educational and classical musical heritage of North Karnataka'
    ],
    historicalEra: '18th – 20th Century Princely State',
    bestTimeToVisit: 'October to February',
    timings: '06:00 AM – 07:00 PM',
    entryFee: 'Free',
    photography: 'Allowed on temple grounds and Ramtirth park',
    coordinates: {
      lat: 16.5100,
      lng: 75.3000
    },
    distanceFromBagalkotKm: 75,
    distanceFromBadamiKm: 110,
    howToReach: {
      byRoad: '75 km northwest of Bagalkot via SH-18 and Mudhol road. Direct KSRTC connectivity.',
      byRail: 'Kudachi Railway Station (45 km) or Bagalkot (75 km).',
      nearestAirport: 'Belagavi Airport (125 km); Hubballi Airport (160 km).'
    },
    nearbyAttractions: ['Mudhol (32 km)', 'Bilgi (45 km)', 'Almatti (65 km)'],
    featured: false
  }
];
