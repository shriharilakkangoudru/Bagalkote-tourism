export interface ExperienceCategory {
  id: string;
  title: string;
  kannadaTitle: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  destinationsCovered: string[];
  keyActivities: string[];
  practicalTips: string;
  bestSeason: string;
}

export const EXPERIENCES: ExperienceCategory[] = [
  {
    id: 'heritage-architecture',
    title: 'Heritage & Architecture',
    kannadaTitle: 'ಪರಂಪರೆ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ',
    tagline: 'Witness the Genesis and Zenith of Classical Indian Stone Architecture',
    description: 'Bagalkot is universally acclaimed as the crucible of classical Indian temple architecture. Explore over 150 early temples and monolithic rock-cut caves carved by master guilds between 540 and 757 CE, showing the birth of southern Dravidian Vimana and northern Nagara Shikhara styles.',
    iconName: 'Landmark',
    image: '/images/monuments/virupaksha.jpg',
    destinationsCovered: ['Badami Caves', 'Pattadakal UNESCO Site', 'Aihole Durga Temple', 'Mahakuta', 'Badami Fort'],
    keyActivities: [
      'Study 8th-century temple architectural models and prototype shrines in Aihole',
      'Marvel at the UNESCO-inscribed Virupaksha temple and monolithic Nandi pavilion at Pattadakal',
      'Climb into the four rock-cut monolithic caves carved into the crimson sandstone cliffs of Badami',
      'Examine bilingual Sanskrit-Kannada royal inscriptions carved onto living rock cliffs'
    ],
    practicalTips: 'Hire certified ASI guides at Badami and Pattadakal for authoritative architectural insights. Early morning is ideal for avoiding direct sun on stone courtyards.',
    bestSeason: 'October to March'
  },
  {
    id: 'spiritual-journeys',
    title: 'Spiritual Journeys',
    kannadaTitle: 'ಆಧ್ಯಾತ್ಮಿಕ ಪಯಣಗಳು',
    tagline: 'Sacred Confluences, Historic Shakthi Sanctuaries & Ancient Shiva Shrines',
    description: 'Immerse yourself in deep devotional heritage across the sacred confluences and temple sanctums of Bagalkot: from the holy Krishna-Malaprabha confluence at Kudalasangama where Sri Basaveshwara attained Aikya, to the ancient Goddess Banashankari shrine and the secluded spring-fed shrines of Mahakuta.',
    iconName: 'Sparkles',
    image: '/images/monuments/banashankari.jpg',
    destinationsCovered: ['Kudalasangama', 'Banashankari Temple', 'Mahakuta Shiva Temples', 'Bhutanatha Group'],
    keyActivities: [
      'Take a holy dip at the confluence (Sangama) of the sacred Krishna and Malaprabha rivers',
      'Meditate at Sri Basaveshwara Aikya Mantapa and delve into Vachana literature',
      'Seek blessings at the 7th-century Goddess Banashankari Amma temple during morning pooja',
      'Bathe in the natural perennial spring waters of Vishnu Pushkarini at Mahakuta'
    ],
    practicalTips: 'Functional Hindu temples require traditional modest attire (covering shoulders and knees). Remove footwear at designated shoe stands before entering courtyards.',
    bestSeason: 'Year-round; winter months and Shravana / Karthika months are especially festive'
  },
  {
    id: 'nature-landscapes',
    title: 'Nature & Landscapes',
    kannadaTitle: 'ಪ್ರಕೃತಿ ಮತ್ತು ನಿಸರ್ಗ ತಾಣಗಳು',
    tagline: 'Crimson Canyons, Sacred River Basins & Sprawling Reservoirs',
    description: 'Beyond its stone monuments, Bagalkot features breathtaking geological and riverine landscapes: dramatic red sandstone bluffs enclosing Agastya Lake, fertile river valleys of the Malaprabha and Ghataprabha, and the massive inland sea of Almatti Dam surrounded by manicured Mughal gardens.',
    iconName: 'Mountain',
    image: '/images/monuments/bhutanatha.jpg',
    destinationsCovered: ['Agastya Lake Badami', 'Almatti Dam & Gardens', 'Krishna River Basin', 'Ghataprabha Promenade'],
    keyActivities: [
      'Boat across the tranquil waters of the Krishna and Malaprabha confluence at Kudalasangama',
      'Hike the sandstone ridges of the Badami North Fort for sweeping vistas of the Deccan canyon',
      'Stroll through the terraced Mughal and Rock gardens facing the Almatti reservoir',
      'Watch migratory water birds flocking to Agastya Lake and Almatti backwaters during winter'
    ],
    practicalTips: 'Carry drinking water and binoculars for birdwatching near waterbodies. Avoid slippery rock faces during monsoon rains.',
    bestSeason: 'August to February (monsoon greenery & pleasant winter)'
  },
  {
    id: 'photography',
    title: 'Photography & Creative Arts',
    kannadaTitle: 'ಛಾಯಾಗ್ರಹಣ ಮತ್ತು ಕಲೆ',
    tagline: 'Golden Hour Reflections, Intricate Stone Friezes & Dramatic Rock Facades',
    description: 'A paradise for architectural, landscape, and cultural photographers. From golden morning light illuminating the dancing Nataraja in Badami Cave 1, to sunset reflections of Bhutanatha Temple across Agastya Lake, Bagalkot offers dramatic textures, deep shadows, and cinematic vantage points.',
    iconName: 'Camera',
    image: '/images/monuments/badami-caves-exterior.jpg',
    destinationsCovered: ['Bhutanatha Temple', 'Badami Caves', 'Durga Temple Aihole', 'Virupaksha Pattadakal'],
    keyActivities: [
      'Golden hour reflection photography of Bhutanatha Temple across Agastya Lake',
      'Capture intricate pillar narrative carvings from the Ramayana and Mahabharata at Pattadakal',
      'Wide-angle panoramic shots of the apsidal peristyle colonnade at the Durga Temple in Aihole',
      'Document traditional pit-loom weavers crafting shimmering silk Ilkal sarees'
    ],
    practicalTips: 'ASI sites allow still photography; tripods or professional video equipment may require prior permission or modest ASI camera tickets.',
    bestSeason: 'October to February (clear atmospheric skies and soft winter light)'
  },
  {
    id: 'family-travel',
    title: 'Family Travel & Leisure',
    kannadaTitle: 'ಕುಟುಂಬ ಪ್ರವಾಸ',
    tagline: 'Safe Paved Walkways, Green Lawns, Boating & Musical Fountains',
    description: 'Bagalkot provides a balanced mix of educational heritage and family leisure. Expansive grassy lawns at Pattadakal provide safe spaces for all generations, while Almatti Dam offers illuminated fountains, lush gardens, and boating activities that delight travelers of all ages.',
    iconName: 'Users',
    image: '/images/monuments/aihole-complex.jpg',
    destinationsCovered: ['Pattadakal Lawns', 'Almatti Dam & Gardens', 'Archaeological Museum Badami', 'Kudalasangama'],
    keyActivities: [
      'Picnic and relax on the well-maintained lawns of the UNESCO Pattadakal complex',
      'Watch the laser musical dancing fountain evening extravaganza at Almatti Dam',
      'Explore life-sized village craft sculptures in the Almatti Rock Garden',
      'Take safe family boat rides at Kudalasangama and Almatti backwaters'
    ],
    practicalTips: 'Many ASI monuments offer paved ramp access for senior citizens and strollers. Pack sunhats, wet wipes, and water bottles for younger children.',
    bestSeason: 'October to March'
  },
  {
    id: 'local-culture',
    title: 'Local Culture & Handloom Craft',
    kannadaTitle: 'ಸ್ಥಳೀಯ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಕೈಮಗ್ಗ',
    tagline: 'GI-Tagged Ilkal Sarees, Guledgudda Khana & Vibrant Folk Traditions',
    description: 'Experience the living cultural tapestry of North Karnataka. Watch master weavers in Ilkal create the legendary GI-tagged saree with its red silk tope-tenge pallu, explore historic Guledgudda Khana blouse weaving, and witness dynamic folk arts like Dollu Kunitha drumming and Lambani mirror embroidery.',
    iconName: 'Shirt',
    image: '/images/monuments/carvings-pattadakal.jpg',
    destinationsCovered: ['Ilkal Weaving Colonies', 'Guledgudda Hill Town', 'Banashankari Fair Grounds', 'Navanagar Bagalkot'],
    keyActivities: [
      'Visit master weaver households in Ilkal to watch pit-loom weaving and the unique "Kondi" technique',
      'Shop for authentic GI-certified Ilkal sarees and traditional Guledgudda Khana fabrics directly from cooperatives',
      'Experience the energetic beats of North Karnataka Dollu Kunitha and Karadi Majalu folk drums',
      'Meet Lambani artisan groups preserving vibrant centuries-old mirrorwork and embroidery'
    ],
    practicalTips: 'Buying directly from registered handloom weavers’ co-operative societies ensures authentic hand-spun quality and fair compensation for artisan families.',
    bestSeason: 'Year-round; January–February during district fairs'
  },
  {
    id: 'food-experiences',
    title: 'Food Experiences & Culinary Trail',
    kannadaTitle: 'ಉತ್ತರ ಕರ್ನಾಟಕ ಆಹಾರಾನುಭವ',
    tagline: 'Authentic Jolada Rotti Oota, Spicy Yennegai, Shenga Pudi & Local Sweets',
    description: 'Taste the celebrated, healthy, and fiery flavors of North Karnataka cuisine. Relish crisp sorghum flatbreads (Jolada Rotti) served hot with stuffed brinjal (Badanekayi Yennegai), spiced peanut powders (Shenga Chutney Pudi), fresh butter, and mouthwatering local sweets like Karadantu and Shenga Holige.',
    iconName: 'UtensilsCrossed',
    image: '/images/monuments/lad-khan-interior.jpg',
    destinationsCovered: ['Bagalkot City Khanavalis', 'Badami Town Eateries', 'Ilkal Sweet Houses'],
    keyActivities: [
      'Enjoy an authentic unlimited North Karnataka Jolada Rotti meal at a traditional Khanavali',
      'Pair soft Jolada Rotti with spicy Yennegai brinjal curry, fresh home-churned white butter, and thick curd',
      'Sample famous North Karnataka snacks: piping hot Mirchi Bajji, Girmit, and puffed rice specialties',
      'Taste nutritious Karadantu from Ilkal/Gokak (made of edible gum, jaggery, cashew, almonds, and dry fruits)'
    ],
    practicalTips: 'Specify your spice tolerance when ordering if unaccustomed to North Karnataka chili levels; ask for extra curd or jaggery to balance the heat.',
    bestSeason: 'Year-round'
  },
  {
    id: 'road-trips',
    title: 'Road Trips & Scenic Drives',
    kannadaTitle: 'ರೋಡ್ ಟ್ರಿಪ್ಸ್ ಮತ್ತು ರಮಣೀಯ ಡ್ರೈವ್',
    tagline: 'Smooth Highways, Sunflower Fields & Rustic Malaprabha Byways',
    description: 'Bagalkot District offers scenic road touring with modern 4-lane national highways (NH-52) seamlessly intersecting quiet state highways and rural byways. Drive past golden sunflower fields, sugarcane estates, red sandstone escarpments, and winding riverbanks.',
    iconName: 'Compass',
    image: '/images/monuments/badami-caves.jpg',
    destinationsCovered: ['NH-52 Hubballi-Bagalkot Highway', 'SH-14 Badami-Pattadakal Byway', 'Krishna River Corridors'],
    keyActivities: [
      'Cruise along the scenic 22 km rural highway between Badami and Pattadakal under shaded tamarind avenues',
      'Drive across the Krishna River bridges near Kudalasangama and Almatti with open water views',
      'Stop by rural sugarcane juice crushers and roadside agricultural farm stands',
      'Photograph vintage bullock carts and village stone temples dotted along country roads'
    ],
    practicalTips: 'Fuel pumps and puncture repair shops are well distributed along NH-52 and SH-14. Keep cash handy for rural toll booths and local village tea stalls.',
    bestSeason: 'September to March'
  }
];
