export interface TravelStory {
  id: string;
  title: string;
  kannadaTitle: string;
  subtitle: string;
  author: string;
  readTime: string;
  date: string;
  category: 'Heritage Trail' | 'Exploration' | 'Architecture' | 'Spiritual' | 'Craft & Culture';
  coverImage: string;
  summary: string;
  paragraphs: string[];
  keyTakeaway: string;
}

export const STORIES: TravelStory[] = [
  {
    id: 'chalukyan-heritage-trail',
    title: 'The Chalukyan Heritage Trail: Walking Through 1,400 Years of Stone Magic',
    kannadaTitle: 'ಚಾಲುಕ್ಯ ಪರಂಪರೆ ಹಾದಿ: ೧೪೦೦ ವರ್ಷಗಳ ಶಿಲ್ಪ ಮಾಯಾಲೋಕ',
    subtitle: 'How a sixth-century desert canyon empire laid the structural foundation of Indian art',
    author: 'Bagalkot Heritage Bureau',
    readTime: '6 min read',
    date: 'Autumn 2026',
    category: 'Heritage Trail',
    coverImage: '/images/monuments/virupaksha.jpg',
    summary: 'From the monolithic rock-cut cave sanctuaries of Badami to the coronation mandapas of Pattadakal and the experimental laboratories of Aihole, the Malaprabha river valley preserves one of humanity’s greatest creative leaps.',
    paragraphs: [
      'In the sixth century CE, when Europe was in the depths of the early Middle Ages, an extraordinary surge of stonecraft transformed a rugged river valley in North Karnataka. The Chalukyas of Vatapi, founded by Pulakeshin I in 540 CE, chose a dramatic red sandstone gorge between two steep cliffs as their royal capital.',
      'What makes the Badami Chalukyan realm singular in world art history is their deliberate, state-supported artistic experimentation. Rather than imposing a single dogmatic building template, Chalukyan monarchs and queens invited artisan guilds from the north and south to experiment side-by-side.',
      'At Aihole, stone masons constructed over 120 temples trying out different floor plans: apsidal barrel roofs, flat pillared mandapas, and rising towers. At Pattadakal, this reached its zenith where southern Dravidian vimanas and northern Nagara curvilinear towers stood in majestic dialogue.',
      'Walking this trail today along the sacred Malaprabha River is not merely visiting ruins; it is witnessing the embryonic heartbeat of classical Indian temple architecture before it spread to Ellora, Elephanta, and Southeast Asia.'
    ],
    keyTakeaway: 'The Chalukyan heritage trail is the open-air textbook of Indian architecture, illustrating how master guilds transitioned from wooden halls to everlasting stone sanctuaries.'
  },
  {
    id: 'exploring-badami',
    title: 'Exploring Badami: Crimson Sandstone Cliffs and Waters of Agastya',
    kannadaTitle: 'ಬಾದಾಮಿ ಅನ್ವೇಷಣೆ: ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಕಡಿದಾದ ಬಂಡೆಗಳು ಮತ್ತು ಅಗಸ್ತ್ಯ ಜಲ',
    subtitle: 'A sensory journey through the four royal caves and placid waters of ancient Vatapi',
    author: 'Travel & Architecture Journal',
    readTime: '5 min read',
    date: 'Winter 2026',
    category: 'Exploration',
    coverImage: '/images/monuments/badami-caves.jpg',
    summary: 'Tucked between towering sandstone bluffs that glow like burning embers at sunset, Badami remains an intimate, living temple city where sacred waters, monkeys, and stone deities merge.',
    paragraphs: [
      'As the morning mist lifts over Agastya Lake, the colossal southern sandstone cliff of Badami begins to glow in hues of amber, ochre, and vermilion. Carved directly into this sheer stone face are four monolithic cave temples, sequentially numbered 1 through 4.',
      'Cave 1 immediately shocks the visitor with the sheer dynamism of its 18-armed Nataraja. With nine arms on either side, master sculptors encoded 81 combinations of Bharatanatyam movements into a single five-foot relief. Look closely at Ganesha and the drummer Tandu keeping rhythm below Shiva’s cosmic dance.',
      'Climbing higher to Cave 3, dedicated to Lord Vishnu in 578 CE by Chalukya Prince Mangalesha, one steps into the most sumptuously carved cave in peninsular India. The massive seated Vishnu on the serpent Adisesha possesses an astonishing calm dignity, while ceiling panels still reveal traces of ancient fresco pigments.',
      'Across the water, on the northeastern shore of Agastya Lake, sits the serene Bhutanatha temple complex. At late afternoon, when the wind settles, the temples cast mirror-crisp reflections across the water, creating an unforgettable portrait of timeless peace.'
    ],
    keyTakeaway: 'Badami’s genius lies in how royal architects harmonized wild, rugged topography with breathtakingly delicate sculptural precision.'
  },
  {
    id: 'aihole-cradle-of-architecture',
    title: 'Aihole: The Experimental Cradle Where Temple Architecture Was Born',
    kannadaTitle: 'ಐಹೊಳೆ: ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು',
    subtitle: 'Stepping into the 7th-century laboratory of the legendary Ayyavole artisan guilds',
    author: 'Archaeological Insights',
    readTime: '5 min read',
    date: 'Winter 2026',
    category: 'Architecture',
    coverImage: '/images/monuments/durga-temple.jpg',
    summary: 'With over 120 stone structures scattered through rural courtyards, farmlands, and hillocks, Aihole is the premier laboratory of Indian structural masonry.',
    paragraphs: [
      'Imagine an entire village where every backyard, farm boundary, and street corner holds an ancient structural stone shrine. That is Aihole, ancient Aryapura, situated along the Malaprabha River in eastern Bagalkot District.',
      'Art historian Percy Brown aptly christened Aihole "the cradle of Indian temple architecture." Between the 5th and 12th centuries, the powerful merchant guild of Ayyavole 500 financed stone sculptors to solve architectural puzzles: how to transfer weight from timber beams to stone lintels, how to light up dark sanctums, and how to crown shrines with stone towers.',
      'The star of this laboratory is the apsidal Durga Temple. Built with a semi-circular curved sanctum and an open pillared ambulatory gallery, its form echoes ancient Buddhist chaitya halls while sheltering magnificent Hindu deities like Mahishasuramardini and Harihara in its outer niches.',
      'Nearby, the Lad Khan temple resembles a royal village assembly hall with pierced stone lattice windows, showing the literal step-by-step transition from civil community meeting halls to sacred sanctums.'
    ],
    keyTakeaway: 'No understanding of South Asian art is complete without visiting Aihole, where the rules of stone temple design were first written in sandstone.'
  },
  {
    id: 'pattadakal-unesco-confluence',
    title: 'Pattadakal Heritage: Where North and South Indian Temple Styles Met',
    kannadaTitle: 'ಪಟ್ಟದಕಲ್ಲು ಪರಂಪರೆ: ಉತ್ತರ ಮತ್ತು ದಕ್ಷಿಣ ಶೈಲಿಗಳ ಮಿಲನ',
    subtitle: 'The coronation sanctuary where Dravidian vimanas and Nagara towers stand side by side',
    author: 'UNESCO Heritage Notes',
    readTime: '5 min read',
    date: 'Autumn 2026',
    category: 'Architecture',
    coverImage: '/images/monuments/virupaksha-view2.jpg',
    summary: 'A World Heritage masterpiece along the Malaprabha River, Pattadakal represents the ultimate summit of Chalukyan architectural harmony.',
    paragraphs: [
      'Pattadakal, meaning "Stone of Coronation", was reserved exclusively for the royal crowning ceremonies of Chalukyan kings. Free from the domestic bustle of the administrative capital at Vatapi, this river sanctuary was designed as a sacred exhibition of royal glory and divine sanction.',
      'What astonishes architects visiting Pattadakal is the intentional coexistence of the two premier temple traditions of the Indian subcontinent. Stand in the center of the complex: to your left rises the northern Rekha-Nagara curvilinear tower of Kadasiddheshwara, while to your right stands the tiered southern Dravida Vimana of Sangameshwara.',
      'The jewel of the site is the Virupaksha Temple, commissioned around 740 CE by Queen Lokamahadevi. Its scale, precision of interlocking dry-stone masonry, and animated narrative friezes of the Ramayana and Mahabharata set the direct architectural blueprint for the rock-cut Kailash temple at Ellora.',
      'Inscribed on the temple gateway is a royal title bestowed upon the chief architect, Gundan Anivaritachari: "Tribhuvanacharya" — the maker of the three worlds.'
    ],
    keyTakeaway: 'Pattadakal is proof that unity in diversity is not a modern slogan in Karnataka, but an 8th-century architectural reality etched into stone.'
  },
  {
    id: 'journey-to-kudalasangama',
    title: 'A Journey to Kudalasangama: Where Sacred Rivers Flow and Sharana Philosophy Thrives',
    kannadaTitle: 'ಕೂಡಲಸಂಗಮ ಯಾತ್ರೆ: ನದಿಗಳ ಸಂಗಮ ಮತ್ತು ಶರಣ ತತ್ವದ ನೆಲೆ',
    subtitle: 'Finding solace at the confluence of Krishna and Malaprabha under the shelter of Sri Basaveshwara',
    author: 'Pilgrim & Culture Dispatch',
    readTime: '6 min read',
    date: 'Monsoon / Winter 2026',
    category: 'Spiritual',
    coverImage: '/images/waterfalls/kudalasangama-confluence.jpg',
    summary: 'The holy meeting ground of North Karnataka’s mighty rivers and the eternal resting place of the revolutionary 12th-century philosopher Sri Basaveshwara.',
    paragraphs: [
      'There is a quiet majesty to the place where two great rivers embrace. At Kudalasangama, the Malaprabha, which flows past the ancient stone temples of Badami and Pattadakal, completes its journey by emptying into the wide, sacred waters of the Krishna.',
      'It was here that Sri Basaveshwara, the 12th-century statesman, poet, and philosopher, spent his formative years meditating and studying under Guru Jatavedamuni at the ancient Sangameshwara temple. Here he rejected orthodox rituals, established the Anubhava Mantapa (the world’s first socio-spiritual parliament), and composed his immortal Vachanas in the spoken Kannada of the common people.',
      'Today, pilgrims descend the stone steps of the magnificent cylindrical Aikya Mantapa, engineered into the riverbed to protect Sri Basaveshwara’s samadhi while allowing the sacred river waters to lap gently against the outer perimeter.',
      'Sitting by the river ghats as the evening breeze rustles the neem trees, one is reminded of Basavanna’s timeless words: "The rich may build temples for Shiva; what shall I, a poor man, do? My legs are pillars, the body the shrine, the head a cupola of gold."'
    ],
    keyTakeaway: 'Kudalasangama is an oasis of calm that touches the spiritual conscience, reminding visitors of equality, compassion, and the dignity of labor.'
  },
  {
    id: 'hidden-gems-bagalkot',
    title: 'Hidden Gems of Bagalkot: The Sacred Springs of Mahakuta and Weaving Looms of Ilkal',
    kannadaTitle: 'ಬಾಗಲಕೋಟೆಯ ಗುಪ್ತ ರತ್ನಗಳು: ಮಹಾಕೂಟದ ಬುಗ್ಗೆಗಳು ಮತ್ತು ಇಲಕಲ್ಲ ಕೈಮಗ್ಗ',
    subtitle: 'Stepping off the beaten path into tranquil forest ravines and living artisan quarters',
    author: 'North Karnataka Chronicle',
    readTime: '5 min read',
    date: 'Winter 2026',
    category: 'Craft & Culture',
    coverImage: '/images/monuments/banashankari.jpg',
    summary: 'Discover the secluded natural springs of Mahakuta where natural fountains feed ancient Shiva pools, and visit Ilkal where centuries-old pit looms weave Karnataka’s most iconic saree.',
    paragraphs: [
      'While Badami and Pattadakal rightfully draw international acclaim, the true magic of Bagalkot often reveals itself when you take the narrow country roads into its lesser-known taluks.',
      'Just fourteen kilometers from Badami lies Mahakuta, a secluded forested ravine shaded by towering banyans and mango groves. Here, natural groundwater springs bubble up through sandstone fissures into the crystal-clear Vishnu Pushkarini. Bathing in these rejuvenating perennial waters surrounded by 7th-century shrines feels like stepping centuries back in time.',
      'Travel east into Hungund taluk and you will hear the rhythmic clatter-clack of wooden shuttles long before you see the pit looms. This is Ilkal, home to the Geographical Indication (GI) certified Ilkal Saree. In traditional weaver homes, multi-generational families weave the signature "tope-tenge" red silk pallu, joining cotton warp to silk weft with the ancient "Kondi" looped knot.',
      'Pair this with a stop at Guledgudda for hand-spun Khana blouse fabrics and a box of delicious Ilkal Karadantu sweets, and you have experienced the soul of North Karnataka.'
    ],
    keyTakeaway: 'The living traditions of Bagalkot’s artisans and sacred groves are just as awe-inspiring as its ancient stone monuments.'
  }
];
