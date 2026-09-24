export interface TourismEvent {
  id: string;
  name: string;
  kannadaName: string;
  timing: string;
  month: string;
  location: string;
  taluk: string;
  category: 'Cultural Festival' | 'Temple Fair (Jathre)' | 'Dance Festival' | 'Spiritual Gathering';
  description: string;
  fullDetails: string;
  image: string;
  highlights: string[];
  visitorTips: string;
  organizedBy: string;
}

export const EVENTS: TourismEvent[] = [
  {
    id: 'chalukya-utsav',
    name: 'Chalukya Utsav',
    kannadaName: 'ಚಾಲುಕ್ಯ ಉತ್ಸವ',
    timing: 'Annual (Usually January / February)',
    month: 'January / February',
    location: 'Badami Cave Grounds & Pattadakal Temple Complex',
    taluk: 'Badami',
    category: 'Cultural Festival',
    description: 'The premier annual cultural festival celebrating the glory of the Early Chalukya dynasty with illuminated stone monuments, classical dance, music, wrestling bouts, and folk arts.',
    fullDetails: 'Chalukya Utsav is a grand regional festival hosted annually in Bagalkot District. The 1,400-year-old rock-cut caves of Badami and the temples of Pattadakal are brilliantly illuminated with ambient color projection lights, forming a surreal open-air stage for India’s finest classical dancers, Hindustani classical vocalists, and regional folk ensembles. The festival also features traditional bullock cart races, wrestling competitions (Kusti), and craft fairs.',
    image: '/images/monuments/badami-caves.jpg',
    highlights: [
      'Monumental multi-colored architectural laser illumination of Badami sandstone cliffs',
      'Classical Bharatanatyam, Kathak, and Kuchipudi recitals on open-air stages',
      'Folk processions featuring Dollu Kunitha, Lambani dances, and Veeragase',
      'Traditional North Karnataka wrestling (Kusti) tournaments in historic red-soil arenas',
      'Culinary food pavilions showcasing authentic Jolada Rotti, Ennegai, and local sweets'
    ],
    visitorTips: 'Arrive before 05:30 PM to secure good seating facing the illuminated cave stage. Entry to the cultural programs is free for all visitors.',
    organizedBy: 'Bagalkot Heritage & Cultural Festival Committee'
  },
  {
    id: 'banashankari-jathre',
    name: 'Banashankari Temple Jathre (Rathotsava)',
    kannadaName: 'ಬನಶಂಕರಿ ಜಾತ್ರೆ (ರಥೋತ್ಸವ)',
    timing: 'Pushya Shuddha Poornima (January – February, Month-long)',
    month: 'January – February',
    location: 'Banashankari Amma Temple, Badami',
    taluk: 'Badami',
    category: 'Temple Fair (Jathre)',
    description: 'One of the largest and oldest rural fairs in Karnataka, drawing over 500,000 pilgrims and tourists for the grand chariot pulling (Rathotsava) and sprawling cultural bazaar.',
    fullDetails: 'The Banashankari Jathre is an ancient month-long fair held around the full moon day of Pushya month. The centerpiece is the ceremonial pulling of the colossal decorated wooden chariot (Brahma Rathotsava) bearing Goddess Banashankari around the sacred Haridra Tirtha water tank. The entire rural landscape transforms into a vibrant carnival with giant Ferris wheels, dramatic folk theatre (Company Nataka), live cattle and horse markets, and thousands of stalls selling traditional cookware, bangles, and regional sweets.',
    image: '/images/monuments/banashankari.jpg',
    highlights: [
      'Spectacular pulling of the multi-tiered wooden temple chariot by thousands of devotees',
      'Month-long village carnival with traditional North Karnataka drama companies (Nataka)',
      'Famous agricultural and livestock fair featuring indigenous Khillari cattle and horses',
      'Grand evening lamp illumination across the Haridra Tirtha pushkarini stepped tank',
      'Special sweet stalls selling fresh hot Shenga Holige and crisp Jalebis'
    ],
    visitorTips: 'Heavy crowd on the main Rathotsava day; park vehicles in designated outer grounds and use shuttle autos to reach the temple.',
    organizedBy: 'Banashankari Temple Trust & Muzrai Department'
  },
  {
    id: 'pattadakal-dance-festival',
    name: 'Pattadakal Dance Festival (Nritya Utsava)',
    kannadaName: 'ಪಟ್ಟದಕಲ್ಲು ನೃತ್ಯೋತ್ಸವ',
    timing: 'January (Winter Season)',
    month: 'January',
    location: 'Virupaksha Temple Courtyard, Pattadakal',
    taluk: 'Badami',
    category: 'Dance Festival',
    description: 'A national-level classical dance festival set against the illuminated 8th-century sandstone facade of the UNESCO World Heritage Virupaksha Temple.',
    fullDetails: 'Organized annually in celebration of heritage arts, the Pattadakal Dance Festival brings together maestro classical dancers from across India to perform under the starlit sky against the illuminated backdrop of the 740 CE Virupaksha Temple. The rhythmic footwork of Bharatanatyam, Odissi, Kathakali, and Mohiniyattam mirrors the sculpted poses of the dancing Apsaras and Nataraja carved into the ancient temple stones.',
    image: '/images/monuments/virupaksha.jpg',
    highlights: [
      'National classical dance performances against 8th-century UNESCO World Heritage stone facades',
      'Performances by Sangeet Natak Akademi awardees and renowned dance academies',
      'Atmospheric nighttime illumination highlighting the Kadamba-Dravida Vimana spires',
      'Craft and heritage photo exhibitions curated on the expansive temple lawns'
    ],
    visitorTips: 'Carry a light sweater or shawl as January evenings in Pattadakal along the river breeze can get brisk.',
    organizedBy: 'Pattadakal Classical Arts & Cultural Society'
  },
  {
    id: 'kudalasangama-sharana-mela',
    name: 'Kudalasangama Sharana Mela',
    kannadaName: 'ಕೂಡಲಸಂಗಮ ಶರಣ ಮೇಳ',
    timing: 'January (Makar Sankranti Festival)',
    month: 'January',
    location: 'Basava International Center & River Confluence, Kudalasangama',
    taluk: 'Hungund',
    category: 'Spiritual Gathering',
    description: 'A massive annual spiritual congregation honoring 12th-century philosopher-reformer Sri Basaveshwara, featuring Vachana recitals, spiritual discourses, and mass communal dining.',
    fullDetails: 'Held annually around Makar Sankranti, the Sharana Mela attracts hundreds of thousands of followers, scholars, and pilgrims to the sacred confluence of the Krishna and Malaprabha rivers. The festival celebrates the casteless, egalitarian philosophy of Sri Basaveshwara. Highlights include round-the-clock Vachana singing (Vachana Gayana), symposiums on human rights and social equality, holy dips at the Sangama, and massive Dasoha (free community meals) serving everyone regardless of caste or background.',
    image: '/images/monuments/virupaksha-view2.jpg',
    highlights: [
      'Solemn prayer gatherings at Sri Basaveshwara Aikya Mantapa inside the cylindrical water tower',
      'Melodious Vachana Gayana concerts by renowned Karnataka classical and folk vocalists',
      'Interfaith dialogues and seminars on egalitarian social philosophy',
      'Grand Dasoha serving traditional Jolada Rotti and sweet Huggi to over 200,000 pilgrims'
    ],
    visitorTips: 'Boat ferry services operate across the river confluence during the festival. Pre-book accommodation at Kudalasangama guest houses or stay in Bagalkot.',
    organizedBy: 'Kudalasangama Kshetra Development Board'
  },
  {
    id: 'mahakuta-shivaratri-jathre',
    name: 'Mahakuta Maha Shivaratri Jathre',
    kannadaName: 'ಮಹಾಕೂಟ ಮಹಾ ಶಿವರಾತ್ರಿ ಜಾತ್ರೆ',
    timing: 'Maha Shivaratri (February / March)',
    month: 'February / March',
    location: 'Mahakuteshwara Temple Complex, Mahakuta',
    taluk: 'Badami',
    category: 'Temple Fair (Jathre)',
    description: 'A sacred night vigil and annual jathre around the ancient natural freshwater pushkarini spring and 7th-century Shiva shrines.',
    fullDetails: 'On the holy night of Maha Shivaratri, thousands of devotees gather at the forested sanctuary of Mahakuta to perform night-long vigils (Jagarene) and ritual abhishekha on the ancient Mahakuteshwara Linga and the submerged Panchamukha Linga in the Vishnu Pushkarini. The temple grove is decorated with oil lamps, and devotional bhajans echo through the sandstone ravine until dawn.',
    image: '/images/monuments/mahakuta.jpg',
    highlights: [
      'Sacred night bath (Snana) in the crystal perennial waters of Vishnu Pushkarini',
      'Special Rudrabhisheka rituals on the 1,400-year-old Mahakuteshwara sanctum linga',
      'All-night devotional singing and Harikatha narrations in the stone mandapa',
      'Forest market selling earthen pots, stone craft souvenirs, and local prasad'
    ],
    visitorTips: 'Wear easy-to-dry traditional clothes if bathing in the Pushkarini. Flashlights are helpful for walking the shaded forest paths at night.',
    organizedBy: 'Mahakuta Temple Management Committee & Badami Taluk Administration'
  }
];
