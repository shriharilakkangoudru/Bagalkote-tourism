import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, IndianRupee, Users, Sparkles, Navigation, Printer, CheckCircle2, ChevronRight, Utensils, Camera, Bus } from 'lucide-react';
import { Language, TripPlanResult, ItineraryStop } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface TripPlannerProps {
  language: Language;
  onNavigateToMonument?: (id: string) => void;
  presetMonumentName?: string;
}

export const TripPlanner: React.FC<TripPlannerProps> = ({
  language,
  presetMonumentName,
}) => {
  const t = TRANSLATIONS[language];

  const [startLocation, setStartLocation] = useState('Badami');
  const [days, setDays] = useState(1);
  const [people, setPeople] = useState(2);
  const [budget, setBudget] = useState('₹1500');
  const [travelPreference, setTravelPreference] = useState('Historical & Photography');
  const [interest, setInterest] = useState('Historical Places');
  const [isGenerating, setIsGenerating] = useState(false);

  // Pre-configured default plan matching user prompt requirements exactly
  const [activePlan, setActivePlan] = useState<TripPlanResult>({
    id: 'plan-default-1',
    title: 'Bagalkote Heritage Golden Circuit (1 Day)',
    summary: 'A curated 1-day exploration covering the greatest Early Chalukyan rock caves, scenic sacred waters, and UNESCO World Heritage temples.',
    startLocation: 'Badami',
    days: 1,
    people: 2,
    budget: '₹1500',
    travelPreference: 'Historical & Photography',
    timeline: [
      {
        time: '08:00 AM',
        monumentName: 'Badami Cave Temples',
        location: 'Badami Sandstone Cliffs',
        activity: 'Explore Caves 1 to 4 in cool morning air; photograph the 18-armed Nataraja and panoramic Agastya Lake views.',
        duration: '2.5 hours',
        insiderTip: 'Start early to beat the direct sunshine on the bare stone steps.',
      },
      {
        time: '10:30 AM',
        monumentName: 'Agastya Lake & Bhutanatha Temple',
        location: 'East Shore, Badami',
        activity: 'Stroll along the historic reservoir bund, visit the 7th-century water-edge shrines, and browse the ASI Archaeological Museum.',
        duration: '2 hours',
        insiderTip: 'The ASI Museum garden provides refreshing shade and drinking water.',
      },
      {
        time: '01:00 PM',
        monumentName: 'Traditional Jolada Rotti Lunch',
        location: 'Badami Town Khanavali',
        activity: 'Authentic North Karnataka vegetarian meal with hot sorghum rottis, brinjal ennegayi, shenga chutney, and fresh buttermilk.',
        duration: '1 hour',
        insiderTip: 'Ask for fresh butter (benne) with your hot rottis.',
      },
      {
        time: '02:30 PM',
        monumentName: 'Travel to Pattadakal',
        location: 'Badami to Pattadakal Highway (22 km)',
        activity: 'Scenic drive across fertile Malaprabha river plains past red sandstone hillocks.',
        duration: '30 mins',
        travelInfo: 'KSRTC bus or local auto/taxi available from Badami station.',
        insiderTip: 'Keep small cash handy for parking/toll.',
      },
      {
        time: '03:30 PM',
        monumentName: 'Virupaksha & Mallikarjuna Temples',
        location: 'Pattadakal UNESCO Enclosure',
        activity: 'Admire the 8th-century royal temples built by sister queens Lokamahadevi and Trailokyamahadevi. Examine Ramayana lithic comic panels.',
        duration: '2.5 hours',
        insiderTip: 'The golden hour lighting hits the Virupaksha western facade at 4:30 PM.',
      },
      {
        time: '06:00 PM',
        monumentName: 'Return & Sunset at Malaprabha Bank',
        location: 'Pattadakal River Ghats / Return to Badami',
        activity: 'Watch the dusk reflection across the ancient riverbed before returning to your hotel or transit hub.',
        duration: 'Evening conclusion',
        insiderTip: 'Pick up famous local Ilkal sarees or Guledgudda Khana fabrics on your way back.',
      },
    ],
    budgetBreakdown: [
      { category: 'ASI Entry Tickets (Badami + Pattadakal)', cost: '₹130', details: 'Combined entry for 2 Indian citizens' },
      { category: 'Local Transport (Auto/Shared Cab)', cost: '₹600', details: 'Badami to Pattadakal round trip + local drops' },
      { category: 'Food & Refreshments', cost: '₹480', details: 'Traditional Jolada Rotti lunch + evening tea/tender coconut' },
      { category: 'Guide / Audio / Buffer', cost: '₹290', details: 'Official ASI brochure & incidental expenses' },
    ],
    insiderAdvice: [
      'Carry a refillable water bottle and wide-brim hat.',
      'Wear slip-on shoes since footwear is removed when entering active sanctums.',
      'Mobile UPI is widely accepted at ticket booths and restaurants.',
    ],
  });

  const buildFallbackTripPlan = (
    startLoc: string,
    numDays: number,
    numPeople: number,
    budgetString: string,
    pref: string,
    _interest: string,
    lang: Language
  ): TripPlanResult => {
    const titles: Record<number, Record<Language, string>> = {
      1: {
        en: `Bagalkote Heritage Golden Circuit (1 Day from ${startLoc})`,
        kn: `ಬಾಗಲಕೋಟೆ ಹೆರಿಟೇಜ್ ಗೋಲ್ಡನ್ ಸರ್ಕ್ಯೂಟ್ (${startLoc} ನಿಂದ 1 ದಿನ)`,
        hi: `बागलकोट हेरिटेज गोल्डन सर्किट (${startLoc} से 1 दिन)`,
      },
      2: {
        en: `Badami, Pattadakal & Aihole Grand Heritage Tour (2 Days from ${startLoc})`,
        kn: `ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆ ಮಹಾ ಪರಂಪರೆ ಪ್ರವಾಸ (${startLoc} ನಿಂದ 2 ದಿನಗಳು)`,
        hi: `बादामी, पट्टदकल और ऐहोले भव्य विरासत यात्रा (${startLoc} से 2 दिन)`,
      },
      3: {
        en: `Bagalkote Complete Chalukyan & Sangama Odyssey (3 Days from ${startLoc})`,
        kn: `ಬಾಗಲಕೋಟೆ ಚಾಲುಕ್ಯ ಮತ್ತು ಸಂಗಮ ಸಂಪೂರ್ಣ ಯಾತ್ರೆ (${startLoc} ನಿಂದ 3 ದಿನಗಳು)`,
        hi: `बागलकोट संपूर्ण चालुक्य और संगम ओडिसी (${startLoc} से 3 दिन)`,
      },
    };

    const summaries: Record<number, Record<Language, string>> = {
      1: {
        en: `An optimized express day tour starting from ${startLoc}, taking you through the iconic Badami Rock-cut Caves, serene Agastya Lake, and UNESCO World Heritage temples at Pattadakal for ${numPeople} traveler(s).`,
        kn: `${startLoc} ನಿಂದ ಪ್ರಾರಂಭವಾಗುವ ಈ ಆಯ್ದ 1 ದಿನದ ಪ್ರವಾಸದಲ್ಲಿ ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು, ಅಗಸ್ತ್ಯ ತೀರ್ಥ ಮತ್ತು ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣಗಳನ್ನು ${numPeople} ಪ್ರವಾಸಿಗರಿಗೆ ಅತ್ಯುತ್ತಮವಾಗಿ ಸಂಯೋಜಿಸಲಾಗಿದೆ.`,
        hi: `${startLoc} से शुरू होने वाला यह 1-दिवसीय दौरा आपको बादामी की रॉक-कट गुफाओं, अगस्त्य झील और पट्टदकल के यूनेस्को विश्व धरोहर मंदिरों की यात्रा कराता है (${numPeople} यात्रियों के लिए)।`,
      },
      2: {
        en: `Comprehensive 2-day heritage journey covering the complete Chalukyan triad: Badami Cave temples & Mahakuta on Day 1, and the cradle of temple architecture at Pattadakal & Aihole on Day 2.`,
        kn: `2 ದಿನಗಳ ಸಮಗ್ರ ಪರಂಪರೆ ಪ್ರವಾಸ: ದಿನ 1 ರಂದು ಬಾದಾಮಿ ಗುಹೆಗಳು ಮತ್ತು ಮಹಾಕೂಟ, ದಿನ 2 ರಂದು ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆ ದೇವಸ್ಥಾನ ಸಮುಚ್ಚಯಗಳು.`,
        hi: `2-दिवसीय व्यापक विरासत यात्रा: दिन 1 पर बादामी गुफाएं और महाकूट, दिन 2 पर मंदिर वास्तुकला का पालना पट्टदकल और ऐहोले।`,
      },
      3: {
        en: `Ultimate 3-day deep exploration traversing Badami rock caves, Mahakuta springs, Pattadakal UNESCO marvels, Aihole temple laboratory, Basaveshwara Aikya Mantapa at Kudalasangama, and Almatti Dam gardens.`,
        kn: `3 ದಿನಗಳ ಸಮಗ್ರ ಅನುಭವ: ಬಾದಾಮಿ ಗುಹೆಗಳು, ಮಹಾಕೂಟ ತೀರ್ಥ, ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ತಾಣ, ಐಹೊಳೆ ವಾಸ್ತುಶಿಲ್ಪ ಪ್ರಯೋಗಶಾಲೆ, ಕೂಡಲಸಂಗಮ ಐಕ್ಯ ಮಂಟಪ ಮತ್ತು ಆಲಮಟ್ಟಿ ಉದ್ಯಾನವನಗಳು.`,
        hi: `3-दिवसीय गहन अन्वेषण: बादामी रॉक गुफाएं, महाकूट, पट्टदकल यूनेस्को मंदिर, ऐहोले मंदिर प्रयोगशाला, कूडलसंगम ऐक्य मंडप और अलमत्ती बांध उद्यान।`,
      },
    };

    let timeline: ItineraryStop[] = [];

    if (numDays === 1) {
      timeline = [
        {
          time: '08:00 AM',
          monumentName: lang === 'kn' ? 'ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು' : lang === 'hi' ? 'बादामी गुफा मंदिर' : 'Badami Cave Temples',
          location: 'Badami Sandstone Cliffs',
          activity: lang === 'kn'
            ? 'ಬೆಳಗಿನ ತಂಪಿನಲ್ಲಿ 1 ರಿಂದ 4 ನೇ ಗುಹೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ; 18-ಕೈಗಳ ನಟರಾಜ ಮತ್ತು ಅಗಸ್ತ್ಯ ಸರೋವರದ ಸುಂದರ ನೋಟವನ್ನು ಕಣ್ತುಂಬಿಕೊಳ್ಳಿ.'
            : lang === 'hi'
            ? 'सुबह की ठंडी हवा में गुफा 1 से 4 का अन्वेषण करें; 18-भुजाओं वाले नटराज और अगस्त्य झील के विहंगम दृश्य देखें।'
            : 'Explore Caves 1 to 4 in cool morning air; photograph the 18-armed Nataraja and panoramic Agastya Lake views.',
          duration: '2.5 hours',
          insiderTip: lang === 'kn' ? 'ಕಡಿದಾದ ಮೆಟ್ಟಿಲುಗಳ ಮೇಲೆ ನೇರ ಬಿಸಿಲು ಬೀಳುವ ಮುನ್ನ ಬೇಗ ಪ್ರಾರಂಭಿಸಿ.' : lang === 'hi' ? 'सीढ़ियों पर धूप तेज होने से पहले जल्दी शुरुआत करें।' : 'Start early to beat the direct sunshine on the bare stone steps.',
        },
        {
          time: '10:30 AM',
          monumentName: lang === 'kn' ? 'ಅಗಸ್ತ್ಯ ತೀರ್ಥ & ಭೂತನಾಥ ದೇವಾಲಯ' : lang === 'hi' ? 'अगस्त्य झील और भूतनाथ मंदिर' : 'Agastya Lake & Bhutanatha Temple',
          location: 'East Shore, Badami',
          activity: lang === 'kn'
            ? 'ಐತಿಹಾಸಿಕ ಜಲಾಶಯದ ದಂಡೆಯ ಮೇಲೆ ನಡೆದು, 7ನೇ ಶತಮಾನದ ಜಲ-ತೀರ ದೇವಾಲಯಗಳು ಮತ್ತು ಎಎಸ್ಐ ಪ್ರಾಚ್ಯವಸ್ತು ಸಂಗ್ರಹಾಲಯವನ್ನು ವೀಕ್ಷಿಸಿ.'
            : lang === 'hi'
            ? 'ऐतिहासिक जलाशय के तट पर घूमें, 7वीं सदी के जल-किनारे मंदिरों और एएसआई पुरातत्व संग्रहालय का दौरा करें।'
            : 'Stroll along the historic reservoir bund, visit the 7th-century water-edge shrines, and browse the ASI Archaeological Museum.',
          duration: '2 hours',
          insiderTip: lang === 'kn' ? 'ಎಎಸ್ಐ ಮ್ಯೂಸಿಯಂ ತೋಟದಲ್ಲಿ ತಂಪಾದ ನೆರಳು ಮತ್ತು ಕುಡಿಯುವ ನೀರು ಲಭ್ಯವಿದೆ.' : lang === 'hi' ? 'एएसआई संग्रहालय का बगीचा शीतल छाया और पेयजल प्रदान करता है।' : 'The ASI Museum garden provides refreshing shade and drinking water.',
        },
        {
          time: '01:00 PM',
          monumentName: lang === 'kn' ? 'ಸಾಂಪ್ರದಾಯಿಕ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ' : lang === 'hi' ? 'पारंपरिक जोलद रोट्टी भोजन' : 'Traditional Jolada Rotti Lunch',
          location: 'Badami Town Khanavali',
          activity: lang === 'kn'
            ? 'ಬಿಸಿ ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ ಬದನೆಕಾಯಿ, ಶೇಂಗಾ ಚಟ್ನಿ ಮತ್ತು ಮಜ್ಜಿಗೆಯೊಂದಿಗೆ ಉತ್ತರ ಕರ್ನಾಟಕದ ಅಪ್ಪಟ ಊಟ.'
            : lang === 'hi'
            ? 'गरमागरम ज्वार की रोटी, बैंगन एन्नेगायी, मूंगफली चटनी और छाछ के साथ प्रामाणिक उत्तर कर्नाटक भोजन।'
            : 'Authentic North Karnataka vegetarian meal with hot sorghum rottis, brinjal ennegayi, shenga chutney, and fresh buttermilk.',
          duration: '1 hour',
          insiderTip: lang === 'kn' ? 'ಬಿಸಿ ರೊಟ್ಟಿಯೊಂದಿಗೆ ತಾಜಾ ಬೆಣ್ಣೆಯನ್ನು ಕೇಳಿ ಆನಂದಿಸಿ.' : lang === 'hi' ? 'गर्म रोटियों के साथ ताजा मक्खन (बेन्ने) जरूर मांगें।' : 'Ask for fresh butter (benne) with your hot rottis.',
        },
        {
          time: '02:30 PM',
          monumentName: lang === 'kn' ? 'ಪಟ್ಟದಕಲ್ಲಿಗೆ ಪ್ರಯಾಣ (22 ಕಿ.ಮೀ)' : lang === 'hi' ? 'पट्टदकल की यात्रा (22 किमी)' : 'Travel to Pattadakal (22 km)',
          location: 'Badami to Pattadakal Highway',
          activity: lang === 'kn'
            ? 'ಮಲಪ್ರಭಾ ನದಿಯ ತೀರದ ಮೂಲಕ ಸುಂದರವಾದ ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಗುಡ್ಡಗಳ ನಡುವಿನ ರಮಣೀಯ ಪ್ರಯಾಣ.'
            : lang === 'hi'
            ? 'मलप्रभा नदी के मैदानों और लाल बलुआ पत्थर की पहाड़ियों के बीच सुंदर यात्रा।'
            : 'Scenic drive across fertile Malaprabha river plains past red sandstone hillocks.',
          duration: '35 mins',
          travelInfo: 'KSRTC bus or local auto/taxi available.',
          insiderTip: lang === 'kn' ? 'ಪಾರ್ಕಿಂಗ್‌ಗಾಗಿ ಸಣ್ಣ ನಗದು ಕೈಯಲ್ಲಿಡಿ.' : lang === 'hi' ? 'पार्किंग के लिए कुछ नकद पैसे पास रखें।' : 'Keep small cash handy for parking/toll.',
        },
        {
          time: '03:15 PM',
          monumentName: lang === 'kn' ? 'ವಿರೂಪಾಕ್ಷ ಮತ್ತು ಮಲ್ಲಿಕಾರ್ಜುನ ದೇವಾಲಯಗಳು' : lang === 'hi' ? 'विरूपाक्ष और मल्लिकार्जुन मंदिर' : 'Virupaksha & Mallikarjuna Temples',
          location: 'Pattadakal UNESCO Enclosure',
          activity: lang === 'kn'
            ? 'ಲೋಕಮಹಾದೇವಿ ಮತ್ತು ತ್ರೈಲೋಕ್ಯಮಹಾದೇವಿ ರಾಣಿಯರು ನಿರ್ಮಿಸಿದ 8ನೇ ಶತಮಾನದ ಭವ್ಯ ದೇವಾಲಯಗಳು ಮತ್ತು ರಾಮಾಯಣ ಕೆತ್ತನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ.'
            : lang === 'hi'
            ? 'रानी लोकमहादेवी और त्रैलोक्यमहादेवी द्वारा निर्मित 8वीं सदी के राजसी मंदिर और रामायण की नक्काशी देखें।'
            : 'Admire the 8th-century royal temples built by sister queens Lokamahadevi and Trailokyamahadevi. Examine Ramayana lithic panels.',
          duration: '2.5 hours',
          insiderTip: lang === 'kn' ? 'ಸಂಜೆ 4:30 ಕ್ಕೆ ಸೂರ್ಯನ ಸುವರ್ಣ ಕಿರಣಗಳು ವಿರೂಪಾಕ್ಷ ಗೋಪುರದ ಮೇಲೆ ಸುಂದರವಾಗಿ ಬೀಳುತ್ತವೆ.' : lang === 'hi' ? 'शाम 4:30 बजे विरूपाक्ष के पश्चिमी मुख पर सुनहरी धूप पड़ती है।' : 'The golden hour lighting hits the Virupaksha western facade at 4:30 PM.',
        },
        {
          time: '06:00 PM',
          monumentName: lang === 'kn' ? 'ಮಲಪ್ರಭಾ ನದಿಯ ದಂಡೆಯಲ್ಲಿ ಸೂರ್ಯಾಸ್ತ & ಮುಕ್ತಾಯ' : lang === 'hi' ? 'मलप्रभा तट पर सूर्यास्त और वापसी' : 'Return & Sunset at Malaprabha Bank',
          location: 'Pattadakal River Ghats / Return',
          activity: lang === 'kn'
            ? 'ನದಿಯ ಮೇಲಿನ ಸಂಜೆಯ ಪ್ರತಿಫಲನವನ್ನು ನೋಡಿ ಇಳಕಲ್ ಸೀರೆ ಅಥವಾ ಗುಳೇದಗುಡ್ಡ ಖಣ ಶಾಪಿಂಗ್ ಮಾಡಿ ಪ್ರಯಾಣ ಮುಕ್ತಾಯಗೊಳಿಸಿ.'
            : lang === 'hi'
            ? 'नदी पर शाम का प्रतिबिंब देखें और इलकल साड़ी या गुलेदगुड्डा खण की खरीदारी करते हुए वापसी करें।'
            : 'Watch the dusk reflection across the ancient riverbed before returning to your hotel or transit hub.',
          duration: 'Evening conclusion',
          insiderTip: lang === 'kn' ? 'ಇಳಕಲ್ ಸೀರೆ ಖರೀದಿಸಲು ಸ್ಥಳೀಯ ಕೈಮಗ್ಗ ಸೊಸೈಟಿಗಳಿಗೆ ಭೇಟಿ ನೀಡಿ.' : lang === 'hi' ? 'इलकल साड़ियों के लिए स्थानीय हथकरघा सोसायटी जाएं।' : 'Pick up authentic local Ilkal sarees from handloom weavers.',
        },
      ];
    } else if (numDays === 2) {
      timeline = [
        {
          time: 'Day 1 - 08:30 AM',
          monumentName: lang === 'kn' ? 'ದಿನ 1: ಬಾದಾಮಿ 4 ಗುಹಾ ದೇವಾಲಯಗಳು' : lang === 'hi' ? 'दिन 1: बादामी की 4 गुफाएं' : 'Day 1: Badami Cave Temples (1 to 4)',
          location: 'Badami Sandstone Cliffs',
          activity: lang === 'kn' ? 'ಶೈವ, ವೈಷ್ಣವ ಮತ್ತು ಜೈನ ಗುಹೆಗಳನ್ನು ಆಳವಾಗಿ ಅಧ್ಯಯನ ಮಾಡಿ, ವರಾಹ ಮತ್ತು ನರಸಿಂಹ ಶಿಲ್ಪಗಳನ್ನು ವೀಕ್ಷಿಸಿ.' : lang === 'hi' ? 'शैव, वैष्णव और जैन गुफाओं का अध्ययन करें, वराह और नरसिंह की मूर्तियां देखें।' : 'In-depth study of Caves 1-4, examining Shiva Tandava, Varaha, and Jain Tirthankara reliefs.',
          duration: '3 hours',
          insiderTip: 'Start early before rocks heat up.',
        },
        {
          time: 'Day 1 - 12:00 PM',
          monumentName: lang === 'kn' ? 'ದಿನ 1: ಅಗಸ್ತ್ಯ ತೀರ್ಥ & ಉತ್ತರ ಕೋಟೆ' : lang === 'hi' ? 'दिन 1: अगस्त्य झील और उत्तरी किला' : 'Day 1: Agastya Lake & North Fort Trek',
          location: 'North Fort & Lower Shivalaya',
          activity: lang === 'kn' ? 'ಮೇಗಣ ಶಿವಾಲಯ ಮತ್ತು ಟಿಪ್ಪು ಕೋಟೆಯ ಕೊತ್ತಲಗಳ ಸುಂದರ ಟ್ರೆಕ್ ಮಾಡಿ.' : lang === 'hi' ? 'उत्तरी किले और शिवालय तक ट्रेक करें, पूरे शहर का विहंगम दृश्य देखें।' : 'Trek up through sandstone clefts to Upper and Lower Shivalaya overlooking the entire valley.',
          duration: '2 hours',
          insiderTip: 'Wear sturdy grip shoes for rock climbing.',
        },
        {
          time: 'Day 1 - 02:00 PM',
          monumentName: lang === 'kn' ? 'ದಿನ 1: ಉತ್ತರ ಕರ್ನಾಟಕ ಖಾನಾವಳಿ ಊಟ' : lang === 'hi' ? 'दिन 1: खानवली भोजन और विश्राम' : 'Day 1: Traditional North Karnataka Lunch',
          location: 'Badami Station Road',
          activity: lang === 'kn' ? 'ಜೋಳದ ರೊಟ್ಟಿ, ಕಾಳು ಪಲ್ಯ, ರಂಜಕ ಚಟ್ನಿ ಮತ್ತು ಸಿಹಿ ಸಜ್ಜೆ ರೊಟ್ಟಿ ಆಸ್ವಾದಿಸಿ.' : lang === 'hi' ? 'ज्वार की रोटी, दाल, चटनी और स्थानीय मिठाइयों का आनंद लें।' : 'Relish authentic Jolada Rotti meal with kaalu palya, shenga chutney and spiced buttermilk.',
          duration: '1.5 hours',
          insiderTip: 'Relax during peak afternoon heat.',
        },
        {
          time: 'Day 1 - 04:00 PM',
          monumentName: lang === 'kn' ? 'ದಿನ 1: ಮಹಾಕೂಟ ದೇವಾಲಯ ಸಮುಚ್ಚಯ' : lang === 'hi' ? 'दिन 1: महाकूट मंदिर परिसर' : 'Day 1: Mahakuta Temple & Spring Complex',
          location: 'Mahakuta Sacred Forest (14 km)',
          activity: lang === 'kn' ? 'ದಟ್ಟ ಅರಣ್ಯದ ನಡುವೆ ನಿರಂತರ ಹರಿಯುವ ವಿಷ್ಣು ಪುಷ್ಕರಿಣಿ ಮತ್ತು ಮುಕುಟೇಶ್ವರ ಲಿಂಗ ದರ್ಶನ.' : lang === 'hi' ? 'हरे-भरे पेड़ों के बीच प्राकृतिक जल कुंड (विष्णु पुष्करिणी) और महाकूटेश्वर मंदिर के दर्शन।' : 'Visit peaceful 7th-century forest sanctum with natural perennial spring pool (Vishnu Pushkarini).',
          duration: '2 hours',
          insiderTip: 'A serene peaceful atmosphere away from crowds.',
        },
        {
          time: 'Day 2 - 08:30 AM',
          monumentName: lang === 'kn' ? 'ದಿನ 2: ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ಸ್ಮಾರಕಗಳು' : lang === 'hi' ? 'दिन 2: पट्टदकल यूनेस्को स्मारक' : 'Day 2: Pattadakal UNESCO World Heritage Complex',
          location: 'Pattadakal Enclosure',
          activity: lang === 'kn' ? 'ನಾಗರ ಮತ್ತು ದ್ರಾವಿಡ ಶೈಲಿಗಳ ಸಮ್ಮಿಲನ; ವಿರೂಪಾಕ್ಷ, ಸಂಗಮೇಶ್ವರ, ಕಾಶಿವಿಶ್ವನಾಥ ಮತ್ತು ಗಳಗನಾಥ ದೇವಾಲಯಗಳು.' : lang === 'hi' ? 'द्रविड़ और नागर शैलियों का अनूठा संगम; विरूपाक्ष, संगमेश्वर और काशीविश्वनाथ मंदिर।' : 'Marvel at crown jewels of Chalukyan art: Virupaksha, Sangameshwara, and Nagara-style Papanatha temples.',
          duration: '3 hours',
          insiderTip: 'Look for Old Kannada inscriptions honoring architect Gundan Anivaritachari.',
        },
        {
          time: 'Day 2 - 12:30 PM',
          monumentName: lang === 'kn' ? 'ದಿನ 2: ಐಹೊಳೆ ದುರ್ಗಾ ದೇವಸ್ಥಾನ ಸಮುಚ್ಚಯ' : lang === 'hi' ? 'दिन 2: ऐहोले दुर्गा मंदिर परिसर' : 'Day 2: Aihole Durga Temple & Museum',
          location: 'Aihole Village (13 km from Pattadakal)',
          activity: lang === 'kn' ? 'ಅಪರೂಪದ ಗಜಪೃಷ್ಠಾಕಾರದ (Apsidal) ದುರ್ಗಾ ದೇವಸ್ಥಾನ, ಅದ್ಭುತ ಗರುಡ ಮತ್ತು ನರಸಿಂಹ ಶಿಲ್ಪಗಳ ವೀಕ್ಷಣೆ.' : lang === 'hi' ? 'दुर्लभ गजपृष्ठाकार (Apsidal) दुर्गा मंदिर और शानदार मूर्तियों का अवलोकन।' : 'Examine the world-renowned apsidal sanctum, peripteral colonnade, and ASI Sculpture Gallery.',
          duration: '2.5 hours',
          insiderTip: 'Aihole has over 120 stone temples dating from 450 to 1200 CE.',
        },
        {
          time: 'Day 2 - 03:30 PM',
          monumentName: lang === 'kn' ? 'ದಿನ 2: ಲಾಡ್ ಖಾನ್, ರಾವಣಫಡಿ ಗುಹೆ & ಮೇಗುತಿ ಜೈನ ಮಂದಿರ' : lang === 'hi' ? 'दिन 2: लाड खान, रावणफडी और मेगुती मंदिर' : 'Day 2: Lad Khan, Ravanaphadi Cave & Meguti Hill',
          location: 'Aihole Village & Meguti Hilltop',
          activity: lang === 'kn' ? 'ಕ್ರಿ.ಶ. 634 ರ ಪ್ರಸಿದ್ಧ ರವಿಕೀರ್ತಿ ಐಹೊಳೆ ಪ್ರಶಸ್ತಿ ಶಿಲಾಶಾಸನ ವೀಕ್ಷಣೆ ಮತ್ತು ಇಡೀ ಕಣಿವೆಯ ಸೂರ್ಯಾಸ್ತ ದರ್ಶನ.' : lang === 'hi' ? '634 ईस्वी के प्रसिद्ध रविकीर्ति ऐहोले शिलालेख को देखें और पहाड़ी से सूर्यास्त का आनंद लें।' : 'Witness the 634 CE Pulakeshin II Aihole inscription by poet Ravikirti atop Meguti hill at sunset.',
          duration: '2.5 hours',
          insiderTip: 'The view from Meguti hill at sunset covers hundreds of ancient temple spires.',
        },
      ];
    } else {
      // 3 Days
      timeline = [
        {
          time: 'Day 1 - 08:30 AM',
          monumentName: lang === 'kn' ? 'ದಿನ 1: ಬಾದಾಮಿ ಗುಹೆಗಳು & ಬನಶಂಕರಿ ದೇವಾಲಯ' : lang === 'hi' ? 'दिन 1: बादामी गुफाएं और बनशंकरी अम्मा मंदिर' : 'Day 1: Badami Cave Temples & Banashankari',
          location: 'Badami & Cholachagudda',
          activity: lang === 'kn' ? 'ಬೆಳಿಗ್ಗೆ ಗುಹಾ ದೇವಾಲಯಗಳು, ನಂತರ ಹರಿದ್ರಾ ತೀರ್ಥವಿರುವ ಪ್ರಸಿದ್ಧ ಬನಶಂಕರಿ ಅಮ್ಮನವರ ದರ್ಶನ.' : lang === 'hi' ? 'सुबह बादामी गुफाएं और बाद में प्रसिद्ध बनशंकरी अम्मा मंदिर व हरिद्रा तीर्थ के दर्शन।' : 'Complete tour of 4 Rock Caves, Agastya Lake, and the revered Banashankari Devi temple at Cholachagudda.',
          duration: '4 hours',
          insiderTip: 'Banashankari has an ancient lamp tower (Deepastambha) and holy stepped pond.',
        },
        {
          time: 'Day 1 - 03:00 PM',
          monumentName: lang === 'kn' ? 'ದಿನ 1: ಭೂತನಾಥ ಗುಂಪು & ಮಹಾಕೂಟ ತೀರ್ಥ' : lang === 'hi' ? 'दिन 1: भूतनाथ मंदिर और महाकूट' : 'Day 1: Bhutanatha Lakeside & Mahakuta Springs',
          location: 'Badami East Shore & Mahakuta',
          activity: lang === 'kn' ? 'ಅಗಸ್ತ್ಯ ಸರೋವರದ ತೀರದ ಭೂತನಾಥ ದೇವಾಲಯ ಮತ್ತು ಮಹಾಕೂಟದ ಪವಿತ್ರ ಪುಷ್ಕರಿಣಿ ವೀಕ್ಷಣೆ.' : lang === 'hi' ? 'अगस्त्य झील के किनारे भूतनाथ मंदिर और महाकूट के पवित्र झरने में शांति का अनुभव।' : 'Sunset photography at Bhutanatha temples followed by natural mineral springs of Mahakuta.',
          duration: '3 hours',
          insiderTip: 'Try fresh sugarcane juice near the temple gate.',
        },
        {
          time: 'Day 2 - 08:30 AM',
          monumentName: lang === 'kn' ? 'ದಿನ 2: ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ರಾಜಸಿಂಹಾಸನ' : lang === 'hi' ? 'दिन 2: पट्टदकल यूनेस्को विरासत' : 'Day 2: Pattadakal UNESCO Coronation Complex',
          location: 'Pattadakal',
          activity: lang === 'kn' ? 'ಚಾಲುಕ್ಯ ರಾಜರ ಪಟ್ಟಾಭಿಷೇಕ ತಾಣ, ವಿರೂಪಾಕ್ಷ, ಮಲ್ಲಿಕಾರ್ಜುನ ಮತ್ತು ಪಾಪನಾಥ ದೇವಾಲಯಗಳ ವಿವರವಾದ ಪರಿವೀಕ್ಷಣೆ.' : lang === 'hi' ? 'चालुक्य राजाओं का राज्याभिषेक स्थल, विरूपाक्ष और पापनाथा मंदिरों की विस्तृत सैर।' : 'Complete guided walk through all 10 major temples where Early Chalukyan coronation ceremonies took place.',
          duration: '3.5 hours',
          insiderTip: 'Hire a local certified ASI guide to understand the intricate epic panels.',
        },
        {
          time: 'Day 2 - 01:30 PM',
          monumentName: lang === 'kn' ? 'ದಿನ 2: ಐಹೊಳೆ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು' : lang === 'hi' ? 'दिन 2: ऐहोले वास्तुकला प्रयोगशाला' : 'Day 2: Aihole Architecture Cradle & Museum',
          location: 'Aihole Village',
          activity: lang === 'kn' ? 'ದುರ್ಗಾ ಮಂದಿರ, ಲಾಡ್ ಖಾನ್, ಗೌಡರಗುಡಿ, ರಾವಣಫಡಿ ಗುಹೆ ಮತ್ತು ಮೇಗುತಿ ಬೆಟ್ಟದ ಶಿಲಾಶಾಸನ.' : lang === 'hi' ? 'दुर्गा मंदिर, लाड खान और मेगुती पहाड़ी पर 634 ईस्वी के शिलालेख का अध्ययन।' : 'Explore how Indian temple architecture evolved from flat-roof assembly halls to grand tiered shikharas.',
          duration: '4 hours',
          insiderTip: 'Sunset atop Meguti hill provides panoramic views across Aihole plain.',
        },
        {
          time: 'Day 3 - 09:00 AM',
          monumentName: lang === 'kn' ? 'ದಿನ 3: ಕೂಡಲಸಂಗಮ - ಬಸವಣ್ಣನವರ ಐಕ್ಯ ಮಂಟಪ' : lang === 'hi' ? 'दिन 3: कूडलसंगम - बासवेश्वर ऐक्य मंडप' : 'Day 3: Kudalasangama Confluence & Aikya Mantapa',
          location: 'Hungund Taluk, Bagalkote',
          activity: lang === 'kn' ? 'ಕೃಷ್ಣಾ ಮತ್ತು ಮಲಪ್ರಭಾ ನದಿಗಳ ಸಂಗಮ, ಜಗಜ್ಯೋತಿ ಬಸವೇಶ್ವರರ ಐಕ್ಯ ಮಂಟಪ ಮತ್ತು ಸಂಗಮೇಶ್ವರ ದೇವಾಲಯ ದರ್ಶನ.' : lang === 'hi' ? 'कृष्णा और मलप्रभा नदियों का पवित्र संगम, बसवेश्वर ऐक्य मंडप और संगमेश्वर मंदिर।' : 'Sacred confluence of Krishna and Malaprabha rivers, holy Aikya Mantapa inside circular cylindrical well, and Sangameshwara shrine.',
          duration: '3.5 hours',
          insiderTip: 'Free traditional Dasoha prasad meal is served daily to all visitors.',
        },
        {
          time: 'Day 3 - 02:30 PM',
          monumentName: lang === 'kn' ? 'ದಿನ 3: ಆಲಮಟ್ಟಿ ಅಣೆಕಟ್ಟು & ರಾಕ್ ಗಾರ್ಡನ್' : lang === 'hi' ? 'दिन 3: अलमत्ती बांध और रॉक गार्डन' : 'Day 3: Almatti Dam, Mughal Gardens & Musical Fountain',
          location: 'Nidagundi / Bilgi Border, Bagalkote',
          activity: lang === 'kn' ? 'ಲಾಲ್ ಬಹದ್ದೂರ್ ಶಾಸ್ತ್ರಿ ಜಲಾಶಯದ ಭವ್ಯ ನೋಟ, ಮೊಘಲ್ ಗಾರ್ಡನ್, ರಾಕ್ ಗಾರ್ಡನ್ ಮತ್ತು ಬೋಟಿಂಗ್.' : lang === 'hi' ? 'लाल बहादुर शास्त्री जलाशय, सुंदर मुगल गार्डन, रॉक गार्डन और शाम का म्यूजिकल फव्वारा।' : 'Walk across vast landscaped Mughal Gardens, Rock Garden reflecting rural North Karnataka life, and evening musical fountain.',
          duration: '3.5 hours',
          insiderTip: 'The evening musical fountain runs between 6:30 PM and 7:30 PM on dam garden grounds.',
        },
      ];
    }

    const perPersonTicket = 65 * numDays;
    const totalTicket = perPersonTicket * numPeople;
    const transportCost = Math.round(numDays * (numPeople <= 2 ? 750 : numPeople <= 4 ? 1200 : 2200));
    const foodCost = Math.round(numDays * numPeople * 380);
    const guideAndBuffer = Math.round(numDays * 300);

    const budgetBreakdown = [
      {
        category: lang === 'kn' ? 'ಎಎಸ್ಐ ಪ್ರವೇಶ ಟಿಕೆಟ್‌ಗಳು' : lang === 'hi' ? 'एएसआई प्रवेश टिकट' : `ASI Monument Tickets (${numPeople} pax, ${numDays} days)`,
        cost: `₹${totalTicket}`,
        details: lang === 'kn' ? 'ಬಾದಾಮಿ & ಪಟ್ಟದಕಲ್ಲು ಸಂಯೋಜಿತ ಟಿಕೆಟ್' : lang === 'hi' ? 'बादामी और पट्टदकल टिकट' : 'Badami, Pattadakal, Aihole & Museum combined entry',
      },
      {
        category: lang === 'kn' ? 'ಸ್ಥಳೀಯ ಸಾರಿಗೆ (ಆಟೋ / ಟ್ಯಾಕ್ಸಿ)' : lang === 'hi' ? 'स्थानीय परिवहन' : `Local Transport (${numPeople <= 2 ? 'Auto/Shared Cab' : 'Private SUV/Van'})`,
        cost: `₹${transportCost}`,
        details: lang === 'kn' ? `${startLoc} ನಿಂದ ಎಲ್ಲ ತಾಣಗಳ ಸಂಚಾರ` : lang === 'hi' ? `${startLoc} से सभी स्थलों की यात्रा` : `Inter-monument hops starting from ${startLoc}`,
      },
      {
        category: lang === 'kn' ? 'ಊಟ ಮತ್ತು ಉಪಾಹಾರ' : lang === 'hi' ? 'भोजन और खानपान' : 'Meals & Traditional Khanavali Dinners',
        cost: `₹${foodCost}`,
        details: lang === 'kn' ? 'ಜೋಳದ ರೊಟ್ಟಿ ಊಟ, ಎಳನೀರು & ಚಹಾ' : lang === 'hi' ? 'जोलद रोट्टी भोजन, नारियल पानी व चाय' : 'North Karnataka Jolada Rotti meals, snacks & tender coconut',
      },
      {
        category: lang === 'kn' ? 'ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಿ & ಇತರ ಖರ್ಚು' : lang === 'hi' ? 'गाइड व आकस्मिक व्यय' : 'Guide Fees & Incidental Buffer',
        cost: `₹${guideAndBuffer}`,
        details: lang === 'kn' ? 'ಎಎಸ್ಐ ಅಧಿಕೃತ ಮಾಹಿತಿ ಪುಸ್ತಕ & ಪಾರ್ಕಿಂಗ್' : lang === 'hi' ? 'एएसआई ब्रोशर और पार्किंग' : 'Official ASI guide assistance, parking & shoe counter fees',
      },
    ];

    const insiderAdvice = lang === 'kn'
      ? [
          'ಬಿಸಿಲು ಹೆಚ್ಚಾಗುವ ಮುನ್ನ ಬೆಳಿಗ್ಗೆ 8:00 ಗಂಟೆಗೆ ಮುಂಚಿತವಾಗಿ ಪ್ರವಾಸ ಪ್ರಾರಂಭಿಸಿ.',
          'ಗುಹಾ ದೇವಾಲಯಗಳ ಮೆಟ್ಟಿಲುಗಳನ್ನು ಹತ್ತಲು ಆರಾಮದಾಯಕ ಪಾದರಕ್ಷೆಗಳು ಮತ್ತು ನೀರಿನ ಬಾಟಲಿ ಕೊಂಡೊಯ್ಯಿರಿ.',
          'ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಯಲ್ಲಿ ಸ್ಥಳೀಯ ಕೈಮಗ್ಗ ಇಳಕಲ್ ಸೀರೆಗಳನ್ನು ಖರೀದಿಸಲು ಸಮಯ ಮೀಸಲಿಡಿ.',
          'ಎಲ್ಲ ಸ್ಥಳಗಳಲ್ಲಿ ಯುಪಿಐ (UPI) ಡಿಜಿಟಲ್ ಪಾವತಿ ವ್ಯಾಪಕವಾಗಿ ಸ್ವೀಕರಿಸಲ್ಪಡುತ್ತದೆ.',
        ]
      : lang === 'hi'
      ? [
          'सुबह 8:00 बजे से पहले अपनी यात्रा शुरू करें ताकि दोपहर की गर्मी से बचा जा सके।',
          'गुफाओं और मंदिरों में चलने के लिए आरामदायक जूते और पानी की बोतल साथ रखें।',
          'इलकल साड़ियों और स्थानीय हथकरघा उत्पादों की प्रामाणिक खरीदारी अवश्य करें।',
          'पूरे बागलकोट जिले में यूपीआई (UPI) डिजिटल भुगतान स्वीकार किया जाता है।',
        ]
      : [
          'Start journeys before 8:00 AM to enjoy tranquil morning light and pleasant temperatures.',
          'Wear slip-on shoes since footwear must be removed when stepping into active inner sanctums.',
          'Keep small currency notes handy for rural parking, local tender coconut, and handloom stalls.',
          'Digital UPI payments (GPay/PhonePe/Paytm) are widely accepted across Bagalkote district.',
        ];

    return {
      id: `plan-${Date.now()}`,
      title: titles[numDays]?.[lang] || titles[1].en,
      summary: summaries[numDays]?.[lang] || summaries[1].en,
      startLocation: startLoc,
      days: numDays,
      people: numPeople,
      budget: budgetString,
      travelPreference: pref,
      timeline,
      budgetBreakdown,
      insiderAdvice,
    };
  };

  // Automatically synchronize and re-localize default plan when app language changes
  useEffect(() => {
    setActivePlan((prev) => {
      if (prev.id.startsWith('plan-default')) {
        const localized = buildFallbackTripPlan(startLocation, days, people, budget, travelPreference, interest, language);
        return { ...localized, id: 'plan-default-1' };
      }
      return prev;
    });
  }, [language]);

  const handleGenerateTrip = async () => {
    setIsGenerating(true);
    let planSet = false;

    try {
      const response = await fetch('/api/gemini/trip-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startLocation,
          days,
          people,
          budget,
          travelPreference,
          interests: interest,
          language,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.isLiveAI && data.plan) {
          const p = data.plan;
          setActivePlan({
            id: `plan-${Date.now()}`,
            title: p.title || `${days}-Day Bagalkote Heritage Itinerary`,
            summary: p.summary || `Optimized route starting from ${startLocation} for ${people} travelers.`,
            startLocation,
            days,
            people,
            budget,
            travelPreference,
            timeline: (p.timeline || []).map((tItem: any) => ({
              time: tItem.time,
              monumentName: tItem.activity,
              location: tItem.location,
              activity: tItem.activity,
              duration: '1.5 - 2 hrs',
              insiderTip: tItem.tips || 'Follow local signage and photography rules.',
            })),
            budgetBreakdown: (p.budgetBreakdown || []).map((b: any) => ({
              category: b.category,
              cost: b.estimatedCost,
              details: 'Estimated allocation',
            })),
            insiderAdvice: p.proTips || [
              'Start journeys before 8 AM during summer months.',
              'Keep comfortable walking shoes for stone courtyards.',
            ],
          });
          planSet = true;
        }
      }
    } catch (e) {
      console.warn('Backend trip plan API fallback, activating local smart generator:', e);
    }

    if (!planSet) {
      const fallbackPlan = buildFallbackTripPlan(startLocation, days, people, budget, travelPreference, interest, language);
      setActivePlan(fallbackPlan);
    }

    // Short simulated delay for UX feedback
    setTimeout(() => {
      setIsGenerating(false);
    }, 700);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 text-white">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>AI-Powered Itinerary Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
          {t.plannerTitle}
        </h2>
        <p className="text-gray-300 text-sm max-w-xl mx-auto">
          {t.plannerSubtitle}
        </p>
      </div>

      {/* Inputs Form Box (As mandated in Section 7) */}
      <div className="bg-[#141b28] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <h3 className="text-lg font-bold text-amber-300 font-serif flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Customize Your Heritage Journey</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Starting Location */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.startLocation}</span>
            </label>
            <select
              id="plan-start-loc"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              className="w-full bg-[#1b2333] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Badami">Badami (Town Central / Station)</option>
              <option value="Bagalkote">Bagalkote Town (District HQ)</option>
              <option value="Hubballi">Hubballi Airport / Junction</option>
              <option value="Pattadakal">Pattadakal Complex</option>
              <option value="Aihole">Aihole Village</option>
            </select>
          </div>

          {/* Number of Days */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.daysLabel}</span>
            </label>
            <select
              id="plan-days"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full bg-[#1b2333] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value={1}>1 Day (Express Golden Circuit)</option>
              <option value={2}>2 Days (Badami + Pattadakal + Aihole)</option>
              <option value={3}>3 Days (Deep Exploration + Mahakuta & Banashankari)</option>
            </select>
          </div>

          {/* Number of People */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.peopleLabel}</span>
            </label>
            <select
              id="plan-people"
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full bg-[#1b2333] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value={1}>1 Solo Explorer</option>
              <option value={2}>2 People (Couples / Duo)</option>
              <option value={4}>4 People (Small Family / Friends)</option>
              <option value={8}>8+ People (Tour Group)</option>
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.budgetLabel}</span>
            </label>
            <input
              type="text"
              id="plan-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. ₹1500"
              className="w-full bg-[#1b2333] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Travel Preference */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
              <Navigation className="w-3.5 h-3.5 text-sky-400" />
              <span>{t.travelPrefLabel}</span>
            </label>
            <select
              id="plan-travel-pref"
              value={travelPreference}
              onChange={(e) => setTravelPreference(e.target.value)}
              className="w-full bg-[#1b2333] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Historical & Photography">Historical & Photography</option>
              <option value="Relaxed & Leisure">Relaxed & Leisure Pace</option>
              <option value="Family Friendly">Family Friendly with Kids/Elders</option>
              <option value="Spiritual & Sacred">Spiritual & Temple Rituals</option>
            </select>
          </div>

          {/* Interests */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.interestsLabel}</span>
            </label>
            <select
              id="plan-interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full bg-[#1b2333] border border-gray-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="Historical Places">Historical Places & Monolithic Caves</option>
              <option value="UNESCO Architecture">UNESCO Temple Architecture</option>
              <option value="Mythology & Carvings">Mythology, Inscriptions & Epigraphy</option>
              <option value="Local Culture & Food">Local Jolada Rotti, Handlooms & Folklore</option>
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2 flex justify-center sm:justify-start">
          <button
            id="plan-generate-btn"
            onClick={handleGenerateTrip}
            disabled={isGenerating}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-gray-950 font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center space-x-2"
          >
            <Sparkles className={`w-5 h-5 text-gray-950 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? t.generatingPlan : t.generateTrip}</span>
          </button>
        </div>
      </div>

      {/* Generated Itinerary & Timeline Output */}
      {activePlan && (
        <div className="space-y-8 print:text-black">
          {/* Header Card */}
          <div className="bg-[#151c2a] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase">
                {activePlan.days} Day Plan • {activePlan.people} Travelers • Budget: {activePlan.budget}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white mt-2">
                {activePlan.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
                {activePlan.summary}
              </p>
            </div>

            <button
              id="plan-print-btn"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 flex items-center space-x-2 transition-colors print:hidden"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print Itinerary</span>
            </button>
          </div>

          {/* Timeline Sequence */}
          <div className="bg-[#141b28] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
            <h4 className="text-lg font-bold text-amber-400 font-serif flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>{t.tripTimeline}</span>
            </h4>

            <div className="relative border-l-2 border-amber-500/40 ml-4 sm:ml-8 space-y-8 pb-4">
              {activePlan.timeline.map((stop, index) => (
                <div key={index} className="relative pl-6 sm:pl-8 group">
                  {/* Timeline Circle Node */}
                  <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#121824] border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-md group-hover:bg-amber-500 group-hover:text-gray-950 transition-colors">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>

                  <div className="bg-[#1a2232] border border-gray-800 hover:border-amber-500/40 rounded-2xl p-5 shadow-md transition-all space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
                          {stop.time}
                        </span>
                        <h5 className="text-base font-bold text-white font-serif">
                          {stop.monumentName}
                        </h5>
                      </div>
                      <span className="text-xs text-gray-400 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{stop.location}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                      {stop.activity}
                    </p>

                    {stop.travelInfo && (
                      <div className="text-xs text-sky-300 flex items-center space-x-1.5 pt-1">
                        <Bus className="w-3.5 h-3.5" />
                        <span>{stop.travelInfo}</span>
                      </div>
                    )}

                    <div className="pt-2 flex items-start space-x-2 text-[11px] text-amber-200/90 bg-amber-500/5 p-2 rounded-lg border border-amber-500/15">
                      <span className="font-bold text-amber-400">💡 Local Tip:</span>
                      <span>{stop.insiderTip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Breakdown Cards */}
          <div className="bg-[#141b28] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h4 className="text-lg font-bold text-emerald-400 font-serif flex items-center space-x-2">
              <IndianRupee className="w-5 h-5" />
              <span>{t.budgetBreakdown}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activePlan.budgetBreakdown.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-[#1a2232] border border-gray-800 hover:border-emerald-500/40 transition-colors space-y-2"
                >
                  <p className="text-xs font-medium text-gray-400">{item.category}</p>
                  <p className="text-xl font-extrabold text-emerald-300 font-serif">{item.cost}</p>
                  <p className="text-[11px] text-gray-400">{item.details}</p>
                </div>
              ))}
            </div>

            {/* Travel advice tips */}
            <div className="p-4 rounded-2xl bg-black/40 border border-gray-800 space-y-2 text-xs text-gray-300">
              <p className="font-bold text-amber-300 uppercase tracking-wider">Expert Advice for Bagalkote Tourists:</p>
              <ul className="space-y-1 list-disc list-inside text-gray-300">
                {activePlan.insiderAdvice.map((advice, idx) => (
                  <li key={idx}>{advice}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
