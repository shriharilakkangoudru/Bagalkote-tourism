export interface GalleryItem {
  id: string;
  title: string;
  category: 'Badami' | 'Pattadakal' | 'Aihole' | 'Rivers & Confluence' | 'Culture & Handlooms';
  location: string;
  era: string;
  imageUrl: string;
  thumbnailUrl: string;
  aspect: 'landscape' | 'portrait' | 'square';
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-badami-caves-1',
    title: 'Monolithic Rock-Cut Cave Facade',
    category: 'Badami',
    location: 'Badami Cave 1 & 3',
    era: '6th Century CE',
    imageUrl: '/images/monuments/badami-caves.jpg',
    thumbnailUrl: '/images/monuments/badami-caves.jpg',
    aspect: 'landscape',
    caption: 'Monolithic columns and entrance veranda of Badami Cave 1 hewn directly into crimson sandstone cliffs.',
  },
  {
    id: 'gal-bhutanatha-lake',
    title: 'Bhutanatha Shrines on Agastya Lake',
    category: 'Badami',
    location: 'Agastya Lake Eastern Shore, Badami',
    era: '7th – 11th Century CE',
    imageUrl: '/images/monuments/bhutanatha.jpg',
    thumbnailUrl: '/images/monuments/bhutanatha.jpg',
    aspect: 'landscape',
    caption: 'Waterside stone shrines of Bhutanatha resting peacefully against the sandstone cliffs reflecting on Agastya Lake.',
  },
  {
    id: 'gal-akka-tangi-falls',
    title: 'Akka-Tangi Twin Falls over Red Cliffs',
    category: 'Badami',
    location: 'North Hill Gorge, Badami',
    era: 'Natural Geologic Wonder',
    imageUrl: '/images/waterfalls/akka-tangi-falls.jpg',
    thumbnailUrl: '/images/waterfalls/akka-tangi-falls.jpg',
    aspect: 'landscape',
    caption: 'Dramatic 70-meter twin waterfall cascading directly over the crimson sandstone bluffs into Agastya Lake.',
  },
  {
    id: 'gal-virupaksha-shikhara',
    title: 'Virupaksha Dravidian Vimana',
    category: 'Pattadakal',
    location: 'Pattadakal UNESCO World Heritage Site',
    era: '740 CE',
    imageUrl: '/images/monuments/virupaksha.jpg',
    thumbnailUrl: '/images/monuments/virupaksha.jpg',
    aspect: 'portrait',
    caption: 'The majestic multi-tiered southern Vimana of the Virupaksha Temple, commissioned by Queen Lokamahadevi.',
  },
  {
    id: 'gal-virupaksha-complex-view',
    title: 'UNESCO Coronation Sanctuary Panorama',
    category: 'Pattadakal',
    location: 'Pattadakal Malaprabha Riverbank',
    era: '8th Century CE',
    imageUrl: '/images/monuments/virupaksha-view2.jpg',
    thumbnailUrl: '/images/monuments/virupaksha-view2.jpg',
    aspect: 'landscape',
    caption: 'Sweeping panoramic view of the manicured UNESCO World Heritage temple grounds beside the Malaprabha River.',
  },
  {
    id: 'gal-durga-temple-apsidal',
    title: 'Apsidal Peripteral Gallery of Durga Temple',
    category: 'Aihole',
    location: 'Aihole Temple Complex',
    era: 'Early 8th Century CE',
    imageUrl: '/images/monuments/durga-temple.jpg',
    thumbnailUrl: '/images/monuments/durga-temple.jpg',
    aspect: 'landscape',
    caption: 'The unique horseshoe-shaped ambulatory corridor of the apsidal Durga Temple with relief-sculpted pillars.',
  },
  {
    id: 'gal-kudalasangama-confluence',
    title: 'Sacred Confluence at Kudalasangama',
    category: 'Rivers & Confluence',
    location: 'Krishna-Malaprabha River Junction, Hungund',
    era: '12th Century & Natural Landscape',
    imageUrl: '/images/waterfalls/kudalasangama-confluence.jpg',
    thumbnailUrl: '/images/waterfalls/kudalasangama-confluence.jpg',
    aspect: 'landscape',
    caption: 'The majestic meeting of Krishna and Malaprabha rivers sheltering Sri Basaveshwara’s Aikya Mantapa.',
  },
  {
    id: 'gal-banashankari-tank',
    title: 'Haridra Tirtha Stepped Water Tank',
    category: 'Rivers & Confluence',
    location: 'Banashankari Temple, Badami',
    era: '7th Century / 18th Century',
    imageUrl: '/images/monuments/banashankari.jpg',
    thumbnailUrl: '/images/monuments/banashankari.jpg',
    aspect: 'landscape',
    caption: 'The vast sacred stepped pushkarini surrounded by stone colonnades and historic tiered lamp towers.',
  },
  {
    id: 'gal-didaga-falls',
    title: 'Didaga Hidden Forest Waterfall',
    category: 'Culture & Handlooms',
    location: 'Guledgudda Hills',
    era: 'Hidden Deccan Landscape',
    imageUrl: '/images/waterfalls/didaga-falls.jpg',
    thumbnailUrl: '/images/waterfalls/didaga-falls.jpg',
    aspect: 'landscape',
    caption: 'Hidden green forest cascade near Guledgudda, famed for handloom weaving and scenic sandstone valleys.',
  },
];
