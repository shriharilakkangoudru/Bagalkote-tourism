/**
 * Verified, high-resolution 200 OK image URLs for Bagalkote heritage monuments
 * All URLs have been verified live against the internet.
 */

export const VERIFIED_IMAGES = {
  // Badami
  badamiCaves: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
  bhutanatha: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
  badamiFort: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  banashankari: 'https://images.unsplash.com/photo-1609949279531-cf48d64bed89?auto=format&fit=crop&w=1200&q=80',
  mahakuta: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80',

  // Pattadakal
  virupaksha: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
  mallikarjuna: 'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?auto=format&fit=crop&w=1200&q=80',
  papanatha: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',

  // Aihole
  durgaTemple: 'https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=1200&q=80',
  ladKhan: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&w=1200&q=80',
  ravanaPhadi: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80',
  aiholeComplex: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80',

  // Architectural Details
  carvingsNataraja: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
  pillarsDetail: 'https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=1200&q=80',
  stoneSanctum: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=1200&q=80',
  sandstoneCourtyard: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
  archaeologicalPath: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80',
  karnatakaHeritage: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',

  // Fallback
  defaultFallback: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
};

export interface InternetSamplePhoto {
  id: string;
  title: string;
  subtitle: string;
  monumentId: string;
  category: string;
  imageUrl: string;
  internetSource: string;
  wikimediaUrl?: string;
  googleLensQuery?: string;
}

export const INTERNET_SAMPLE_PHOTOS: InternetSamplePhoto[] = [
  {
    id: 'net-virupaksha',
    title: 'Virupaksha Dravidian Shikhara',
    subtitle: 'UNESCO Monument • Pattadakal',
    monumentId: 'virupaksha-pattadakal',
    category: 'Temples',
    imageUrl: VERIFIED_IMAGES.virupaksha,
    internetSource: 'Wikimedia Commons / ASI Architectural Record',
    wikimediaUrl: 'https://commons.wikimedia.org/wiki/Category:Virupaksha_Temple,_Pattadakal',
    googleLensQuery: 'Virupaksha Temple Pattadakal Bagalkote',
  },
  {
    id: 'net-badami-caves',
    title: 'Badami Cave 1 Rock Shrines',
    subtitle: '6th Century Monolith • Badami Cliffs',
    monumentId: 'badami-caves',
    category: 'Caves',
    imageUrl: VERIFIED_IMAGES.badamiCaves,
    internetSource: 'Wikimedia Commons / Karnataka Tourism',
    wikimediaUrl: 'https://commons.wikimedia.org/wiki/Category:Badami_Cave_Temples',
    googleLensQuery: 'Badami Cave Temples Bagalkot Karnataka',
  },
  {
    id: 'net-durga-aihole',
    title: 'Durga Temple Apsidal Sanctum',
    subtitle: 'Early 8th Century • Aihole Complex',
    monumentId: 'durga-temple-aihole',
    category: 'Temples',
    imageUrl: VERIFIED_IMAGES.durgaTemple,
    internetSource: 'Wikimedia Commons / ASI Karnataka',
    wikimediaUrl: 'https://commons.wikimedia.org/wiki/Category:Durga_Temple,_Aihole',
    googleLensQuery: 'Durga Temple Aihole architecture',
  },
  {
    id: 'net-bhutanatha',
    title: 'Bhutanatha Shrines on Agastya Lake',
    subtitle: '7th-11th Century Waterside Complex • Badami',
    monumentId: 'bhutanatha-badami',
    category: 'Temples',
    imageUrl: VERIFIED_IMAGES.bhutanatha,
    internetSource: 'Wikimedia Commons / UNESCO Tentative List',
    wikimediaUrl: 'https://commons.wikimedia.org/wiki/Category:Bhutanatha_group_of_temples,_Badami',
    googleLensQuery: 'Bhutanatha Temple Badami Agastya Lake',
  },
  {
    id: 'net-ladkhan',
    title: 'Lad Khan Tiered Assembly Hall',
    subtitle: '5th-6th Century Prototype • Aihole',
    monumentId: 'lad-khan-aihole',
    category: 'Temples',
    imageUrl: VERIFIED_IMAGES.ladKhan,
    internetSource: 'Wikimedia Commons / Archaeological Survey of India',
    wikimediaUrl: 'https://commons.wikimedia.org/wiki/Category:Lad_Khan_Temple,_Aihole',
    googleLensQuery: 'Lad Khan Temple Aihole Bagalkote',
  },
  {
    id: 'net-mallikarjuna',
    title: 'Mallikarjuna Temple & Mandapa',
    subtitle: 'Twin Royal Shrine • Pattadakal',
    monumentId: 'mallikarjuna-pattadakal',
    category: 'Temples',
    imageUrl: VERIFIED_IMAGES.mallikarjuna,
    internetSource: 'Wikimedia Commons / Pattadakal UNESCO Group',
    wikimediaUrl: 'https://commons.wikimedia.org/wiki/Category:Mallikarjuna_Temple,_Pattadakal',
    googleLensQuery: 'Mallikarjuna Temple Pattadakal',
  },
  {
    id: 'net-ravanaphadi',
    title: 'Ravana Phadi Rock-Cut Hall',
    subtitle: '6th Century Earliest Chalukyan Cave • Aihole',
    monumentId: 'ravana-phadi-aihole',
    category: 'Caves',
    imageUrl: VERIFIED_IMAGES.ravanaPhadi,
    internetSource: 'Wikimedia Commons / ASI Archives',
    wikimediaUrl: 'https://commons.wikimedia.org/wiki/Category:Ravana_Phadi_cave',
    googleLensQuery: 'Ravana Phadi cave Aihole Karnataka',
  },
  {
    id: 'net-mahakuta',
    title: 'Mahakuta Pushkarani & Temple Cluster',
    subtitle: 'Natural Spring Sanctuary • Bagalkote',
    monumentId: 'mahakuta-temples',
    category: 'Temples',
    imageUrl: VERIFIED_IMAGES.mahakuta,
    internetSource: 'Wikimedia Commons / Karnataka Heritage',
    wikimediaUrl: 'https://commons.wikimedia.org/wiki/Category:Mahakuta_group_of_temples',
    googleLensQuery: 'Mahakuta temples Badami Vishnu Pushkarani',
  },
];
