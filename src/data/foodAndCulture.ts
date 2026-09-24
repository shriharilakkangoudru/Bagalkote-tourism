export interface FoodItem {
  id: string;
  name: string;
  kannadaName: string;
  category: 'Main Dish' | 'Curry / Side' | 'Condiment' | 'Sweets & Snacks';
  description: string;
  keyIngredients: string[];
  culturalContext: string;
  healthBenefits: string;
  mustTryWith: string;
  image: string;
}

export interface CulturalTradition {
  id: string;
  name: string;
  kannadaName: string;
  category: 'Handloom & Textile' | 'Folk Dance & Music' | 'Folk Craft & Art' | 'Rural Festival';
  description: string;
  historicalOrigins: string;
  significance: string;
  whereToExperience: string;
  image: string;
}

export const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'jolada-rotti',
    name: 'Jolada Rotti (Jowar Bhakri)',
    kannadaName: 'ಜೋಳದ ರೊಟ್ಟಿ',
    category: 'Main Dish',
    description: 'The indisputable staple of North Karnataka cuisine: unleavened flatbread skillfully hand-patted and baked on a hot clay/iron griddle from nutrient-dense sorghum (jowar) flour and boiling water, without any oil.',
    keyIngredients: ['Sorghum (Jowar) Flour', 'Hot Water', 'Salt'],
    culturalContext: 'Forming the backbone of rural agrarian life in Bagalkot, Jolada Rotti represents centuries of self-sufficient dryland farming traditions. It is served with multiple sides at traditional "Khanavalis" (eateries).',
    healthBenefits: 'Naturally gluten-free, rich in dietary fiber, high in complex carbohydrates, and helps regulate blood sugar.',
    mustTryWith: 'Badanekayi Yennegai, Shenga Pudi, dollop of white butter, and chilled churned buttermilk.',
    image: '/images/monuments/badami-caves-exterior.jpg'
  },
  {
    id: 'ennegayi',
    name: 'Badanekayi Ennegayi (Stuffed Brinjal Curry)',
    kannadaName: 'ಬದನೆಕಾಯಿ ಎಣ್ಣೆಗಾಯಿ',
    category: 'Curry / Side',
    description: 'Tender baby brinjals slit and stuffed with a rich roasted mixture of peanuts, white sesame seeds, roasted gram, dry coconut, jaggery, tamarind, and aromatic Malnad-style spices, then slowly simmered until luscious.',
    keyIngredients: ['Small purple brinjals', 'Roasted peanuts', 'Sesame seeds', 'Tamarind', 'Jaggery', 'Byadagi chili'],
    culturalContext: 'No authentic North Karnataka meal or wedding feast is complete without the signature dark, rich, nutty Ennegayi gravy.',
    healthBenefits: 'Packed with healthy monounsaturated fats from roasted seeds, antioxidants from brinjal skin, and iron from jaggery.',
    mustTryWith: 'Piping hot Jolada Rotti or Sajje (Pearl Millet) Rotti.',
    image: '/images/monuments/bhutanatha.jpg'
  },
  {
    id: 'shenga-chutney-pudi',
    name: 'Shenga Chutney Pudi (Spiced Peanut Powder)',
    kannadaName: 'ಶೇಂಗಾ ಚಟ್ನಿ ಪುಡಿ',
    category: 'Condiment',
    description: 'A coarse, fragrant, and slightly piquant dry powder prepared by roasting premium local groundnuts with dry red chilies, garlic cloves, cumin seeds, tamarind, and salt.',
    keyIngredients: ['Roasted groundnuts', 'Byadagi red chilies', 'Garlic', 'Cumin', 'Tamarind', 'Salt'],
    culturalContext: 'Kept in every household kitchen across Bagalkot, this shelf-stable condiment is mixed with fragrant cold-pressed groundnut oil, ghee, or curd to accompany rotis.',
    healthBenefits: 'Excellent plant-based protein booster, rich in vitamin E and heart-healthy lipids.',
    mustTryWith: 'Mixed with fresh curd or cold-pressed groundnut oil as a dip for Rotti.',
    image: '/images/monuments/lad-khan.jpg'
  },
  {
    id: 'karadantu',
    name: 'Karadantu (Nutritional Energy Sweet)',
    kannadaName: 'ಕರದಂಟು',
    category: 'Sweets & Snacks',
    description: 'A famous centuries-old confection made of edible acacia gum (Antu), pure organic jaggery, grated dry copra, and an abundance of roasted almonds, cashews, pistachios, and nutmeg, known for its chewy, crunchy texture.',
    keyIngredients: ['Edible gum (Dantu/Gond)', 'Organic jaggery', 'Almonds', 'Cashews', 'Dry coconut', 'Cardamom'],
    culturalContext: 'Originally crafted in the neighboring region and widely produced in Ilkal and Bagalkot, it was historically consumed by wrestlers in traditional "Garadi Mane" for supreme vitality and endurance.',
    healthBenefits: 'Exceptional natural source of calcium, healthy fats, and sustained stamina; excellent for joint health.',
    mustTryWith: 'Enjoyed fresh after meals or as a nourishing travel snack.',
    image: '/images/monuments/virupaksha.jpg'
  },
  {
    id: 'shenga-holige',
    name: 'Shenga Holige (Peanut Puran Poli)',
    kannadaName: 'ಶೇಂಗಾ ಹೋಳಿಗೆ',
    category: 'Sweets & Snacks',
    description: 'A thin, melt-in-the-mouth sweet flatbread filled with a delectable crumbly paste of roasted peanuts, powdered organic jaggery, and green cardamom, rolled ultra-thin and roasted lightly.',
    keyIngredients: ['Wheat/Maida casing', 'Roasted peanut powder', 'Jaggery powder', 'Cardamom powder', 'Ghee'],
    culturalContext: 'Prepared as a celebratory delicacy during Ugadi, Deepavali, and the annual Banashankari Jathre festival.',
    healthBenefits: 'Natural iron from jaggery paired with plant protein from peanuts, made without artificial preservatives.',
    mustTryWith: 'Drizzled generously with hot melted pure desi ghee and warm milk.',
    image: '/images/monuments/durga-temple.jpg'
  },
  {
    id: 'north-karnataka-thali',
    name: 'North Karnataka Meals (Complete Khanavali Oota)',
    kannadaName: 'ಉತ್ತರ ಕರ್ನಾಟಕ ಖಾನಾವಳಿ ಊಟ',
    category: 'Main Dish',
    description: 'A magnificent banana-leaf or stainless-steel platter comprising two fresh Jolada Rottis, Ennegayi, Jhunka (savory chickpea flour mash), Kaalu Palya (sprouted pulses curry), Bele Saaru (lentil rasam), Shenga Pudi, Ranjaka (red chili relish), cucumber slices, curd, and a sweet.',
    keyIngredients: ['Sorghum Rotti', 'Sprouted pulses', 'Gram flour', 'Buttermilk', 'Fresh green chilies'],
    culturalContext: 'Khanavalis are democratic community dining institutions where travelers and locals dine side-by-side on fresh, affordable home-cooked regional meals.',
    healthBenefits: 'Completely balanced nutritional profile containing slow-digesting millets, legumes, probiotics, and fresh vegetables.',
    mustTryWith: 'A chilled glass of churned spiced Majjige (buttermilk) to conclude.',
    image: '/images/monuments/aihole-complex.jpg'
  }
];

export const CULTURAL_TRADITIONS: CulturalTradition[] = [
  {
    id: 'ilkal-saree',
    name: 'Ilkal Handloom Saree Weaving (GI Tag)',
    kannadaName: 'ಇಲಕಲ್ಲ ಸೀರೆ ಕೈಮಗ್ಗ (ಭೌಗೋಳಿಕ ಮಾನ್ಯತೆ)',
    category: 'Handloom & Textile',
    description: 'An ancient handloom weaving heritage flourishing in Ilkal town since the 8th century CE. The saree is distinguished by its unique "Tope-Tenge" (temple spire pattern) red silk pallu, connected to the body through an ancient interlocking looped joint called "Kondi".',
    historicalOrigins: 'Originated under the patronage of the Chalukya and Rashtrakuta royal courts. In 2006, it earned India’s prestigious Geographical Indication (GI) status.',
    significance: 'Preserved by thousands of traditional weaver families who operate wooden pit looms in their ancestral homes, representing living craft heritage.',
    whereToExperience: 'Ilkal Weaver Colonies & Co-operative Societies (60 km from Bagalkot / 55 km from Badami).',
    image: '/images/monuments/carvings-pattadakal.jpg'
  },
  {
    id: 'guledgudda-khana',
    name: 'Guledgudda Khana (Traditional Choli Fabric)',
    kannadaName: 'ಗುಳೇದಗುಡ್ಡ ಖಣ (ಪಾರಂಪರಿಕ ರವಿಕೆ ಬಟ್ಟೆ)',
    category: 'Handloom & Textile',
    description: 'Exquisite hand-woven cotton-and-silk patterned fabric designed exclusively for traditional women’s blouses (cholis). Characterized by intricate geometric motifs like Siddeswara chariot, peacock, and floral jacquard borders.',
    historicalOrigins: 'Centuries-old artisanal craft practiced exclusively in the hillside town of Guledgudda.',
    significance: 'Regarded as auspicious ceremonial attire gifted during weddings and housewarmings throughout North Karnataka and Maharashtra.',
    whereToExperience: 'Guledgudda Handloom Cluster & Heritage Markets (22 km from Badami).',
    image: '/images/monuments/badami-fort.jpg'
  },
  {
    id: 'lambani-embroidery',
    name: 'Lambani Mirrorwork & Needle Embroidery',
    kannadaName: 'ಲಂಬಾಣಿ ಕಸೂತಿ ಮತ್ತು ಕನ್ನಡಿ ಕಲೆ',
    category: 'Folk Craft & Art',
    description: 'Vibrant, geometric textile embroidery created by the semi-nomadic Banjara/Lambani community residing in settlements (Thandas) around Bagalkot. Features a rich patchwork of cowrie shells, coins, glass mirrors, and 14 distinct traditional needle stitches.',
    historicalOrigins: 'Centuries of tribal nomad artistry adapted into clothing, wall hangings, and bags.',
    significance: 'Empowers rural women artisans and keeps unique indigenous textile ornamentation alive.',
    whereToExperience: 'Lambani Thandas around Badami, Kerur, and Bagalkot artisan exhibitions.',
    image: '/images/monuments/badami-caves.jpg'
  },
  {
    id: 'dollu-kunitha',
    name: 'Dollu Kunitha & Karadi Majalu Folk Arts',
    kannadaName: 'ಡೊಳ್ಳು ಕುಣಿತ ಮತ್ತು ಕರಡಿ ಮಜಲು',
    category: 'Folk Dance & Music',
    description: 'Dynamic, high-energy North Karnataka folk performance featuring heavy hollow-wood cylindrical drums (Dollu) slung around the necks of vigorous performers who leap and drum in rhythmic synchronization, accompanied by Karadi Majalu cymbals and clarinets.',
    historicalOrigins: 'Rooted in the devotional worship of Lord Beereshwara (Kuruba community tradition) and village festival rituals.',
    significance: 'Expresses raw martial energy, collective village solidarity, and acoustic reverence during temple car festivals.',
    whereToExperience: 'Chalukya Utsav (Badami), Banashankari Jathre, and local village car festivals (Rathotsava).',
    image: '/images/monuments/virupaksha-view2.jpg'
  }
];
