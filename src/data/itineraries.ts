export interface ItineraryStopDetail {
  time: string;
  activity: string;
  location: string;
  notes: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  theme: string;
  morning: ItineraryStopDetail;
  afternoon: ItineraryStopDetail;
  evening: ItineraryStopDetail;
  foodRecommendation: string;
  stayRecommendation: string;
}

export interface CuratedItinerary {
  id: string;
  title: string;
  kannadaTitle: string;
  duration: string;
  tagline: string;
  description: string;
  idealFor: string;
  totalDistanceKm: number;
  estimatedBudgetPerPerson: string;
  badge: string;
  days: ItineraryDay[];
  travelSequence: string[];
  packingTips: string[];
}

export const CURATED_ITINERARIES: CuratedItinerary[] = [
  {
    id: 'itinerary-1-day',
    title: '1 Day in Bagalkot: Highlights of Badami & Pattadakal',
    kannadaTitle: '೧ ದಿನದ ಬಾಗಲಕೋಟೆ ಪ್ರವಾಸ: ಬಾದಾಮಿ ಮತ್ತು ಪಟ್ಟದಕಲ್ಲು ಮುಖ್ಯಾಂಶಗಳು',
    duration: '1 Day (Express Tour)',
    tagline: 'The essential UNESCO and rock-cut cave experience for short visits',
    description: 'Perfect for travelers with limited time who want to experience the absolute zenith of Early Chalukyan rock architecture and the UNESCO World Heritage coronation sanctuary.',
    idealFor: 'Day-trippers, Solo Explorers, Weekend Photographers',
    totalDistanceKm: 70,
    estimatedBudgetPerPerson: '₹1,200 – ₹1,800',
    badge: 'Express Essential',
    travelSequence: ['Badami Cave Temples', 'Agastya Lake', 'Archaeological Museum', 'Pattadakal UNESCO Temples', 'Bhutanatha Sunset'],
    packingTips: [
      'Slip-on footwear for easy removal at temple sanctums',
      'Wide-brim hat, sunscreen, and polarized sunglasses for outdoor sandstone exploration',
      'At least 1.5 litres of water per person'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Masterpieces in Stone',
        theme: 'Rock-Cut Monoliths & World Heritage Sanctuaries',
        morning: {
          time: '07:30 AM – 10:30 AM',
          location: 'Badami Cave Temples',
          activity: 'Climb the red sandstone steps through Cave 1 (dancing Nataraja), Cave 2 (Trivikrama), Cave 3 (Vaishnava relief carvings), and Cave 4 (Jain Tirthankaras).',
          notes: 'Visit early when the morning light highlights the warm sandstone faces and temperatures remain cool.'
        },
        afternoon: {
          time: '11:30 AM – 02:30 PM',
          location: 'Pattadakal UNESCO World Heritage Complex',
          activity: 'Drive 22 km to Pattadakal. Explore Virupaksha Temple, Mallikarjuna, Papanatha, and Sangameshwara temples showcasing the harmony of northern and southern temple towers.',
          notes: 'ASI guided tours available at entrance. Spend time marveling at the Ramayana narrative pillar friezes.'
        },
        evening: {
          time: '04:00 PM – 06:30 PM',
          location: 'Bhutanatha Temple & Agastya Lake',
          activity: 'Return to Badami. Stroll along the ancient stone steps of Agastya Lake to the waterside Bhutanatha Temple as the setting sun turns the sandstone bluffs incandescent gold.',
          notes: 'Iconic spot for postcard-perfect reflection photography on the placid waters.'
        },
        foodRecommendation: 'Traditional North Karnataka Jolada Rotti lunch with spicy Badanekayi Yennegai, Shenga Pudi, and chilled churned buttermilk in Badami town.',
        stayRecommendation: 'KSTDC Hotel Mayura Chalukya, Badami'
      }
    ]
  },
  {
    id: 'itinerary-2-days',
    title: '2 Days in Bagalkot: The Chalukyan Golden Triangle',
    kannadaTitle: '೨ ದಿನಗಳ ಪ್ರವಾಸ: ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ ಮತ್ತು ಬನಶಂಕರಿ',
    duration: '2 Days / 1 Night',
    tagline: 'Comprehensive journey through Badami, Pattadakal, Aihole & Banashankari',
    description: 'The definitive two-day immersion tracing the entire arc of Chalukyan civilizational genius: from rock-cut caves to structural experiments and living sacred Shakthi traditions.',
    idealFor: 'Couples, History Enthusiasts, Culture Seekers, Families',
    totalDistanceKm: 110,
    estimatedBudgetPerPerson: '₹3,000 – ₹4,500',
    badge: 'Most Popular',
    travelSequence: [
      'Day 1: Badami Caves → North Fort & Museum → Banashankari Temple → Agastya Lake Sunset',
      'Day 2: Mahakuta Spring Temple → Pattadakal UNESCO Complex → Aihole Temple Cradle'
    ],
    packingTips: [
      'Comfortable walking shoes with good grip for climbing stone steps',
      'Camera with wide-angle lens for sweeping monument vistas and architectural ceiling reliefs',
      'Modest cultural clothing suitable for functional temple shrines'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Capital of Vatapi & Sacred Shakthi Forest',
        theme: 'Imperial Caves, Fortresses & Ancient Deities',
        morning: {
          time: '08:00 AM – 11:30 AM',
          location: 'Badami Cave Temples & North Fort',
          activity: 'Exhaustive exploration of all four rock-cut caves. Ascend towards the Northern Fort ramparts for aerial canyon panoramas over Vatapi.',
          notes: 'Wear sturdy walking shoes for the rocky path up the northern hill.'
        },
        afternoon: {
          time: '01:00 PM – 03:30 PM',
          location: 'Banashankari Amma Temple',
          activity: 'Drive 5 km south to the historic 7th-century Banashankari Shakthi temple. Walk around the monumental Haridra Tirtha water tank and view the multi-tiered stone lamp towers.',
          notes: 'Taste the freshly pressed local sugarcane juice outside the temple gates.'
        },
        evening: {
          time: '04:30 PM – 06:30 PM',
          location: 'Agastya Lake & Bhutanatha Temple Group',
          activity: 'Circumambulate the eastern lake edge, visit the Archaeological Museum, and capture the sun dipping behind the southern cave cliffs.',
          notes: 'Watch the local birds nesting along the canyon cliffs at dusk.'
        },
        foodRecommendation: 'Authentic Lingayat/North Karnataka Khanavali dinner: Jolada Rotti, Junka, Jowar Bhakri, Shenga Chutney, and sweet Shenga Holige.',
        stayRecommendation: 'Heritage Resort Badami or KSTDC Hotel Mayura Chalukya'
      },
      {
        dayNumber: 2,
        title: 'Coronations, Springs & The Cradle of Architecture',
        theme: 'Natural Springs, Royal Ceremonies & Experimental Masons',
        morning: {
          time: '07:30 AM – 10:00 AM',
          location: 'Mahakuta Temple Complex',
          activity: 'Drive 14 km into the lush forested ravine of Mahakuta. Explore 7th-century Shiva shrines and marvel at the perennial Vishnu Pushkarini natural spring pool.',
          notes: 'Quiet early morning atmosphere with ancient banyan trees and flowing crystal spring water.'
        },
        afternoon: {
          time: '10:30 AM – 01:30 PM',
          location: 'Pattadakal UNESCO World Heritage Complex',
          activity: 'Detailed study of Virupaksha, Mallikarjuna, Sangameshwara, and Papanatha temples. Inspect bilingual 8th-century inscriptions and temple ceiling panels.',
          notes: 'Carry an umbrella or hat for the sun between temples across the expansive manicured lawns.'
        },
        evening: {
          time: '02:30 PM – 05:30 PM',
          location: 'Aihole Temple Complex',
          activity: 'Proceed to Aihole. Explore the apsidal Durga Temple with its horse-shoe colonnade, the ancient Lad Khan assembly hall, and the 6th-century Ravana Phadi rock-cut cave.',
          notes: 'Hike up to Meguti Jain Temple on the low hill for a panoramic view of the entire valley dotted with ancient shrines.'
        },
        foodRecommendation: 'Lunch at Pattadakal or Aihole tourism restaurant; try authentic Shenga Pudi and curd rice.',
        stayRecommendation: 'Overnight in Badami or proceed to Bagalkot City'
      }
    ]
  },
  {
    id: 'itinerary-3-days',
    title: '3 Days Heritage Circuit: Complete Chalukyan & Confluence Odyssey',
    kannadaTitle: '೩ ದಿನಗಳ ಮಹಾ ಪರಂಪರೆ ಪ್ರವಾಸ: ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು, ಐಹೊಳೆ, ಕೂಡಲಸಂಗಮ ಮತ್ತು ಆಲಮಟ್ಟಿ',
    duration: '3 Days / 2 Nights',
    tagline: 'The ultimate panoramic expedition spanning heritage, sacred rivers & modern marvels',
    description: 'An all-inclusive North Karnataka journey linking the ancient Early Chalukyan stone capitals with the spiritual confluence at Kudalasangama and the majestic water engineering of Almatti Dam.',
    idealFor: 'Vacationers, Photography Groups, Heritage Lovers, Multi-generational Families',
    totalDistanceKm: 210,
    estimatedBudgetPerPerson: '₹5,000 – ₹7,500',
    badge: 'Grand Expedition',
    travelSequence: [
      'Day 1: Badami Caves, Fort & Banashankari Temple',
      'Day 2: Mahakuta Springs, Pattadakal UNESCO & Aihole',
      'Day 3: Kudalasangama River Confluence & Almatti Dam Gardens/Musical Fountain'
    ],
    packingTips: [
      'Light cotton clothing for sunny daytime travel',
      'Light shawl or jacket for cool winter evenings in Almatti and Badami',
      'Power bank and ample memory cards for extensive photography'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'The Rock-Hewn Heart of Vatapi',
        theme: 'Caves, Canyon Lakes & Shakthi Sanctuaries',
        morning: {
          time: '08:00 AM – 11:30 AM',
          location: 'Badami Cave Temples',
          activity: 'Detailed exploration of all 4 cave temples, Nataraja carving, Vishnu avatars, and monolithic pillars.',
          notes: 'Hire a licensed ASI guide for in-depth iconography interpretation.'
        },
        afternoon: {
          time: '12:30 PM – 03:00 PM',
          location: 'Banashankari & Haridra Tirtha',
          activity: 'Visit Goddess Banashankari shrine, take a quiet walk around the stepped lake, and inspect Maratha lamp towers.',
          notes: 'Great local sweet stalls selling Belagavi style Karadantu.'
        },
        evening: {
          time: '04:00 PM – 06:30 PM',
          location: 'Agastya Lake & Bhutanatha Temple Group',
          activity: 'Photography session around the lake as sunset colors reflect against the red sandstone bluffs.',
          notes: 'Capture long-exposure reflections if you carry a tripod.'
        },
        foodRecommendation: 'North Karnataka Thali with Jolada Rotti, Ennegai, Kaalu Palya, Bele Saaru, and Curd.',
        stayRecommendation: 'KSTDC Hotel Mayura Chalukya, Badami'
      },
      {
        dayNumber: 2,
        title: 'Stone Temples & The Malaprabha Valley',
        theme: 'Forest Shrines & World Heritage Architecture',
        morning: {
          time: '08:00 AM – 10:00 AM',
          location: 'Mahakuta Natural Springs & Temples',
          activity: 'Explore shaded temple groves and the sacred perennial spring pool with submerged Shiva linga.',
          notes: 'Serene forest atmosphere away from vehicular noise.'
        },
        afternoon: {
          time: '10:30 AM – 01:30 PM',
          location: 'Pattadakal UNESCO World Heritage Complex',
          activity: 'Tour Virupaksha, Mallikarjuna, Sangameshwara, Galaganatha, and Papanatha temples.',
          notes: 'Examine the transition from southern Vimana to northern Nagara shikhara forms.'
        },
        evening: {
          time: '02:30 PM – 06:00 PM',
          location: 'Aihole Temple Village',
          activity: 'Tour Durga Temple, Lad Khan, Konti Gudi, Ravana Phadi Cave, and Meguti Hilltop Temple.',
          notes: 'Catch panoramic sunset views of the Malaprabha countryside from Meguti Hill.'
        },
        foodRecommendation: 'Traditional countryside meals at Aihole KSTDC Mayura restaurant.',
        stayRecommendation: 'Overnight in Bagalkot City (Hotel Anugraha Deluxe or Clarks Inn Bagalkot)'
      },
      {
        dayNumber: 3,
        title: 'Sacred Confluences & The Mighty Krishna',
        theme: 'Riverside Peace, Sharana Philosophy & Dancing Waters',
        morning: {
          time: '08:30 AM – 12:30 PM',
          location: 'Kudalasangama Sacred Confluence',
          activity: 'Drive to the confluence of the Krishna and Malaprabha rivers. Pay respects at Sri Basaveshwara Aikya Mantapa and visit the ancient Sangameshwara temple.',
          notes: 'Enjoy a scenic boat cruise on the peaceful river waters.'
        },
        afternoon: {
          time: '02:00 PM – 05:00 PM',
          location: 'Almatti Dam & Rock Garden',
          activity: 'Drive to Almatti Dam. Walk across the landscaped Mughal and Krishna gardens, and visit the Rock Garden depicting North Karnataka rural crafts and folklore.',
          notes: 'Panoramic viewpoints over the colossal reservoir.'
        },
        evening: {
          time: '06:30 PM – 08:30 PM',
          location: 'Almatti Musical Dancing Fountain',
          activity: 'Witness the multi-colored musical fountain show synchronized to classical and patriotic music under the evening sky.',
          notes: 'Show usually starts at 7:00 PM; arrive 15 minutes early to secure good terrace seating.'
        },
        foodRecommendation: 'Evening snacks and dinner in Almatti or Navanagar Bagalkot: hot Mirchi Bajji, Girmit, and North Karnataka Jolada Rotti.',
        stayRecommendation: 'Almatti Dam Guest House or return from Bagalkot Railway Station'
      }
    ]
  },
  {
    id: 'itinerary-weekend',
    title: 'Weekend Bagalkot Trip: Heritage, Handlooms & River Vistas',
    kannadaTitle: 'ವಾರಾಂತ್ಯದ ಬಾಗಲಕೋಟೆ ಪ್ರವಾಸ: ಪರಂಪರೆ, ಕೈಮಗ್ಗ ಮತ್ತು ನದಿಯ ಸೊಬಗು',
    duration: '2 Days (Saturday – Sunday)',
    tagline: 'Ideal quick getaway from Bengaluru, Hubballi, Belagavi, or Hyderabad',
    description: 'Designed specifically for weekend travelers arriving by Friday overnight train. Combines the legendary Badami cave shrines, Pattadakal UNESCO temples, and authentic shopping for GI-tagged Ilkal Sarees and Guledgudda Khana.',
    idealFor: 'Weekend Travelers, Heritage Shoppers, Friends & Family Getaways',
    totalDistanceKm: 140,
    estimatedBudgetPerPerson: '₹2,500 – ₹3,800',
    badge: 'Weekend Getaway',
    travelSequence: [
      'Saturday: Arrive Badami → Cave Temples → Mahakuta Springs → Agastya Lake Sunset',
      'Sunday: Pattadakal UNESCO → Guledgudda Khana Weavers / Ilkal Sarees → Departure from Bagalkot'
    ],
    packingTips: [
      'Carry extra tote bags for authentic handloom saree purchases in Ilkal or Guledgudda',
      'Comfortable walking shoes',
      'Camera or smartphone with wide-angle lens'
    ],
    days: [
      {
        dayNumber: 1,
        title: 'Saturday: Caves & Forest Springs',
        theme: 'Arrival, Rock Shrines & Lakeside Splendour',
        morning: {
          time: '07:30 AM – 11:30 AM',
          location: 'Badami Cave Temples',
          activity: 'Arrive at Badami station, check in to hotel, and explore the 4 rock-cut caves before noon.',
          notes: 'Morning sunlight lights up Cave 1 and Cave 3 beautifully.'
        },
        afternoon: {
          time: '01:00 PM – 03:30 PM',
          location: 'Mahakuta Temple Grove',
          activity: 'Visit the peaceful forest sanctuary of Mahakuta and relax near the perennial spring.',
          notes: 'Shady canopy keeps temperatures comfortable even during afternoons.'
        },
        evening: {
          time: '04:30 PM – 06:30 PM',
          location: 'Agastya Lake & Bhutanatha Temple',
          activity: 'Stroll around Agastya Lake, view the northern fort, and photograph sunset over the waters.',
          notes: 'Enjoy authentic North Karnataka evening tea and spicy snacks in town.'
        },
        foodRecommendation: 'Dinner at Badami: Fresh Jolada Rotti, Badanekayi Yennegai, and local sweets.',
        stayRecommendation: 'KSTDC Hotel Mayura Chalukya, Badami'
      },
      {
        dayNumber: 2,
        title: 'Sunday: UNESCO Heritage & Handloom Trails',
        theme: 'Coronation Temples & Century-Old Weaving Looms',
        morning: {
          time: '08:00 AM – 11:00 AM',
          location: 'Pattadakal UNESCO World Heritage Complex',
          activity: 'Explore Virupaksha and the royal temples along the Malaprabha riverbank.',
          notes: 'Marvel at the stone sculptures and monolithic Nandi mandapa.'
        },
        afternoon: {
          time: '12:00 PM – 03:30 PM',
          location: 'Guledgudda / Ilkal Handloom Hub',
          activity: 'Visit master weavers working on traditional pit looms in Guledgudda (Khana blouse cloth) or Ilkal (GI-tagged Sarees with silk tope-tenge pallu). Buy directly from artisan cooperatives.',
          notes: 'Authentic GI-certified sarees directly support local weaver families.'
        },
        evening: {
          time: '04:30 PM – 06:30 PM',
          location: 'Bagalkot Navanagar Ghataprabha Riverfront',
          activity: 'Return to Bagalkot City for evening coffee, delicious Karadantu sweets shopping, and board the overnight return train to Bengaluru or Hubballi.',
          notes: 'Bagalkot Railway Station has comfortable waiting rooms and direct evening express trains.'
        },
        foodRecommendation: 'Special North Karnataka sweets: Karadantu from Gokak/Ilkal and Shenga Holige.',
        stayRecommendation: 'Board evening overnight train or return drive'
      }
    ]
  }
];
