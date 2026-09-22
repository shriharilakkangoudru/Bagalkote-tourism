export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  heroTagline: string;
  heroDescription: string;
  identifyButton: string;
  exploreButton: string;
  startDemoButton: string;
  statsMonuments: string;
  statsLanguages: string;
  statsAiPowered: string;
  statsAssistant: string;
  navHome: string;
  navIdentify: string;
  navExplore: string;
  navPlanner: string;
  navAssistant: string;
  navMap: string;
  navServices: string;
  navAdmin: string;
  navAbout: string;
  startExploring: string;
  // Recognition
  recTitle: string;
  recSubtitle: string;
  uploadPhoto: string;
  openCamera: string;
  closeCamera: string;
  capturePhoto: string;
  chooseDemoPhoto: string;
  demoModeLabel: string;
  analyzingStep1: string;
  analyzingStep2: string;
  analyzingStep3: string;
  identifiedMonument: string;
  confidence: string;
  category: string;
  period: string;
  dynasty: string;
  style: string;
  exploreHistory: string;
  viewOnMap: string;
  askAi: string;
  planMyVisit: string;
  // Monument Details
  historyTab: string;
  architectureTab: string;
  whyVisitTab: string;
  travelInfoTab: string;
  nearbyTab: string;
  locationLabel: string;
  visitingTimeLabel: string;
  photographyTipsLabel: string;
  familyFriendlyLabel: string;
  accessibilityLabel: string;
  entryFeeLabel: string;
  getDirections: string;
  addToTrip: string;
  // AI Assistant
  assistantTitle: string;
  assistantSubtitle: string;
  suggestedQuestions: string;
  inputPlaceholder: string;
  sendButton: string;
  voiceInput: string;
  readAloud: string;
  stopAudio: string;
  thinkingMode: string;
  // Trip planner
  plannerTitle: string;
  plannerSubtitle: string;
  startLocation: string;
  daysLabel: string;
  peopleLabel: string;
  budgetLabel: string;
  travelPrefLabel: string;
  interestsLabel: string;
  generateTrip: string;
  generatingPlan: string;
  tripTimeline: string;
  budgetBreakdown: string;
  // How it works
  howItWorksTitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  // Services
  servicesTitle: string;
  servicesSubtitle: string;
  emergency: string;
  hospitals: string;
  police: string;
  hotels: string;
  restaurants: string;
  transport: string;
}

export const TRANSLATIONS: Record<'en' | 'kn' | 'hi', TranslationDictionary> = {
  en: {
    appName: 'AI HERITAGE LENS',
    appSubtitle: "Your Intelligent Gateway to Bagalkote's Heritage",
    heroTagline: 'Discover Heritage. Powered by AI.',
    heroDescription:
      'Identify historic monuments, explore their stories, plan your journey and experience Bagalkote through an intelligent tourism assistant.',
    identifyButton: 'Identify a Monument',
    exploreButton: 'Explore Heritage',
    startDemoButton: '🎬 Start Demo',
    statsMonuments: '25+ Heritage Sites',
    statsLanguages: '3 Languages',
    statsAiPowered: 'AI Powered',
    statsAssistant: '24/7 Tourism Assistant',
    navHome: 'Home',
    navIdentify: 'Identify',
    navExplore: 'Explore',
    navPlanner: 'Trip Planner',
    navAssistant: 'AI Assistant',
    navMap: 'Interactive Map',
    navServices: 'Tourist Services',
    navAdmin: 'Admin Dashboard',
    navAbout: 'About',
    startExploring: 'Start Exploring',
    recTitle: 'AI Monument Recognition',
    recSubtitle: 'Upload or capture a photo of any monument in Badami, Pattadakal, or Aihole for instant neural identification',
    uploadPhoto: 'Upload Photo',
    openCamera: 'Open Camera',
    closeCamera: 'Close Camera',
    capturePhoto: 'Capture Photo',
    chooseDemoPhoto: 'Try Demo Monuments',
    demoModeLabel: 'Demo Recognition Mode (Simulated AI)',
    analyzingStep1: 'Analyzing your monument...',
    analyzingStep2: 'Comparing architectural features...',
    analyzingStep3: 'Identifying heritage site...',
    identifiedMonument: 'IDENTIFIED MONUMENT',
    confidence: 'AI Confidence',
    category: 'Category',
    period: 'Period',
    dynasty: 'Dynasty',
    style: 'Architecture Style',
    exploreHistory: 'Explore History',
    viewOnMap: 'View on Map',
    askAi: 'Ask AI',
    planMyVisit: 'Plan My Visit',
    historyTab: 'History',
    architectureTab: 'Architecture',
    whyVisitTab: 'Why Visit?',
    travelInfoTab: 'Travel Information',
    nearbyTab: 'Nearby Attractions',
    locationLabel: 'Location',
    visitingTimeLabel: 'Suggested Visiting Time',
    photographyTipsLabel: 'Photography Tips',
    familyFriendlyLabel: 'Family Friendly',
    accessibilityLabel: 'Accessibility Info',
    entryFeeLabel: 'Entry Fees',
    getDirections: 'Get Directions',
    addToTrip: 'Add to Trip',
    assistantTitle: 'Ask the Heritage AI',
    assistantSubtitle: 'Ask questions about Badami, Pattadakal, and Aihole history, architecture, routes & local culture',
    suggestedQuestions: 'Suggested Inquiries',
    inputPlaceholder: 'Ask anything about Bagalkote monuments (English, Kannada, Hindi)...',
    sendButton: 'Ask AI',
    voiceInput: 'Voice Input',
    readAloud: 'Read Answer Aloud',
    stopAudio: 'Stop Audio',
    thinkingMode: 'Deep Architectural Thinking',
    plannerTitle: 'Smart Trip Planner',
    plannerSubtitle: 'Generate personalized, culturally rich itineraries for your heritage journey',
    startLocation: 'Starting Location',
    daysLabel: 'Number of Days',
    peopleLabel: 'Number of People',
    budgetLabel: 'Estimated Budget',
    travelPrefLabel: 'Travel Preference',
    interestsLabel: 'Primary Interests',
    generateTrip: 'Generate My Trip',
    generatingPlan: 'Generating Optimized Itinerary...',
    tripTimeline: 'Trip Itinerary & Timeline',
    budgetBreakdown: 'Estimated Budget Breakdown',
    howItWorksTitle: 'How AI Heritage Lens Works',
    step1Title: 'Capture',
    step1Desc: 'Take or upload a monument photo with your smartphone or camera.',
    step2Title: 'Recognize',
    step2Desc: 'AI analyzes the architectural style, pillars, carvings, and contours.',
    step3Title: 'Explore',
    step3Desc: 'Learn in-depth historical facts, dynasty lore, and photography guides.',
    step4Title: 'Travel',
    step4Desc: 'Plan your route, check distances, and navigate smoothly.',
    servicesTitle: 'Tourist & Emergency Services',
    servicesSubtitle: 'Verified contacts, local emergency help, and traveler amenities in Bagalkote district',
    emergency: 'Emergency Help',
    hospitals: 'Hospitals & Medical',
    police: 'Police & Tourist Help',
    hotels: 'Hotels & Lodges',
    restaurants: 'Authentic Restaurants',
    transport: 'Transport & Auto Stands'
  },
  kn: {
    appName: 'ಎಐ ಹೆರಿಟೇಜ್ ಲೆನ್ಸ್',
    appSubtitle: 'ಬಾಗಲಕೋಟೆಯ ಐತಿಹಾಸಿಕ ಪರಂಪರೆಗೆ ನಿಮ್ಮ ಜಾಣ ಗವಾಕ್ಷಿ',
    heroTagline: 'ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ. ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯೊಂದಿಗೆ.',
    heroDescription:
      'ಐತಿಹಾಸಿಕ ಸ್ಮಾರಕಗಳನ್ನು ಗುರುತಿಸಿ, ಅವುಗಳ ಭವ್ಯ ಕಥೆಗಳನ್ನು ತಿಳಿಯಿರಿ, ನಿಮ್ಮ ಪ್ರವಾಸವನ್ನು ಯೋಜಿಸಿ ಮತ್ತು ಜಾಣ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿಯೊಂದಿಗೆ ಬಾಗಲಕೋಟೆಯನ್ನು ಅನುಭವಿಸಿ.',
    identifyButton: 'ಸ್ಮಾರಕ ಗುರುತಿಸಿ',
    exploreButton: 'ಪರಂಪರೆ ಅನ್ವೇಷಿಸಿ',
    startDemoButton: '🎬 ಡೆಮೊ ಪ್ರಾರಂಭಿಸಿ',
    statsMonuments: '25+ ಐತಿಹಾಸಿಕ ತಾಣಗಳು',
    statsLanguages: '3 ಭಾಷೆಗಳು',
    statsAiPowered: 'ಎಐ ಆಧಾರಿತ ತಂತ್ರಜ್ಞಾನ',
    statsAssistant: '24/7 ಪ್ರವಾಸ ಸಹಾಯಕ',
    navHome: 'ಮುಖಪುಟ',
    navIdentify: 'ಗುರುತಿಸಿ',
    navExplore: 'ಅನ್ವೇಷಿಸಿ',
    navPlanner: 'ಪ್ರವಾಸ ಯೋಜನೆ',
    navAssistant: 'ಎಐ ಸಹಾಯಕ',
    navMap: 'ನಕ್ಷೆ',
    navServices: 'ಪ್ರವಾಸಿ ಸೇವೆಗಳು',
    navAdmin: 'ಆಡಳಿತ ಮಂಡಳಿ',
    navAbout: 'ಕುರಿತು',
    startExploring: 'ಅನ್ವೇಷಣೆ ಆರಂಭಿಸಿ',
    recTitle: 'ಎಐ ಸ್ಮಾರಕ ಗುರುತಿಸುವಿಕೆ',
    recSubtitle: 'ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು ಅಥವಾ ಐಹೊಳೆಯ ಯಾವುದೇ ಸ್ಮಾರಕದ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಕ್ಯಾಮೆರಾದಿಂದ ಸೆರೆಹಿಡಿಯಿರಿ',
    uploadPhoto: 'ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    openCamera: 'ಕ್ಯಾಮೆರಾ ತೆರೆಯಿರಿ',
    closeCamera: 'ಕ್ಯಾಮೆರಾ ಮುಚ್ಚಿ',
    capturePhoto: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
    chooseDemoPhoto: 'ಡೆಮೊ ಸ್ಮಾರಕಗಳು',
    demoModeLabel: 'ಡೆಮೊ ಗುರುತಿಸುವಿಕೆ ಕ್ರಮ (ಸಿಮ್ಯುಲೇಟೆಡ್ ಎಐ)',
    analyzingStep1: 'ನಿಮ್ಮ ಸ್ಮಾರಕವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    analyzingStep2: 'ವಾಸ್ತುಶಿಲ್ಪದ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಹೋಲಿಸಲಾಗುತ್ತಿದೆ...',
    analyzingStep3: 'ಪರಂಪರೆಯ ತಾಣವನ್ನು ಗುರುತಿಸಲಾಗುತ್ತಿದೆ...',
    identifiedMonument: 'ಗುರುತಿಸಲಾದ ಸ್ಮಾರಕ',
    confidence: 'ಎಐ ನಿಖರತೆ',
    category: 'ವರ್ಗ',
    period: 'ಕಾಲಘಟ್ಟ',
    dynasty: 'ರಾಜವಂಶ',
    style: 'ವಾಸ್ತುಶಿಲ್ಪ ಶೈಲಿ',
    exploreHistory: 'ಇತಿಹಾಸ ತಿಳಿಯಿರಿ',
    viewOnMap: 'ನಕ್ಷೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ',
    askAi: 'ಎಐ ಪ್ರಶ್ನಿಸಿ',
    planMyVisit: 'ಪ್ರವಾಸ ಯೋಜಿಸಿ',
    historyTab: 'ಇತಿಹಾಸ',
    architectureTab: 'ವಾಸ್ತುಶಿಲ್ಪ',
    whyVisitTab: 'ಏಕೆ ಭೇಟಿ ನೀಡಬೇಕು?',
    travelInfoTab: 'ಪ್ರವಾಸಿ ಮಾಹಿತಿ',
    nearbyTab: 'ಹತ್ತಿರದ ಆಕರ್ಷಣೆಗಳು',
    locationLabel: 'ಸ್ಥಳ',
    visitingTimeLabel: 'ಸೂಕ್ತ ಭೇಟಿ ಸಮಯ',
    photographyTipsLabel: 'ಛಾಯಾಗ್ರಹಣ ಸಲಹೆಗಳು',
    familyFriendlyLabel: 'ಕುಟುಂಬ ಸ್ನೇಹಿ',
    accessibilityLabel: 'ಪ್ರವೇಶ ಸೌಲಭ್ಯ',
    entryFeeLabel: 'ಪ್ರವೇಶ ಶುಲ್ಕ',
    getDirections: 'ದಾರಿ ತೋರಿಸಿ',
    addToTrip: 'ಪ್ರವಾಸಕ್ಕೆ ಸೇರಿಸಿ',
    assistantTitle: 'ಹೆರಿಟೇಜ್ ಎಐ ಸಹಾಯಕನನ್ನು ಕೇಳಿ',
    assistantSubtitle: 'ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಯ ಇತಿಹಾಸ, ಶಿಲ್ಪಕಲೆ ಮತ್ತು ಮಾರ್ಗಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ',
    suggestedQuestions: 'ಸಲಹಾ ಪ್ರಶ್ನೆಗಳು',
    inputPlaceholder: 'ಬಾಗಲಕೋಟೆ ಸ್ಮಾರಕಗಳ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ (ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ)...',
    sendButton: 'ಕೇಳಿ',
    voiceInput: 'ಧ್ವನಿ ಇನ್ಪುಟ್',
    readAloud: 'ಉತ್ತರವನ್ನು ಆಲಿಸಿ',
    stopAudio: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
    thinkingMode: 'ಆಳವಾದ ವಾಸ್ತುಶಿಲ್ಪ ವಿಶ್ಲೇಷಣೆ',
    plannerTitle: 'ಜಾಣ ಪ್ರವಾಸ ಯೋಜಕ',
    plannerSubtitle: 'ನಿಮ್ಮ ಐತಿಹಾಸಿಕ ಪ್ರವಾಸಕ್ಕಾಗಿ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ, ಸಮಯೋಚಿತ ಪ್ರವಾಸ ಯೋಜನೆಯನ್ನು ರೂಪಿಸಿ',
    startLocation: 'ಪ್ರಾರಂಭದ ಸ್ಥಳ',
    daysLabel: 'ದಿನಗಳ ಸಂಖ್ಯೆ',
    peopleLabel: 'ವ್ಯಕ್ತಿಗಳ ಸಂಖ್ಯೆ',
    budgetLabel: 'ಅಂದಾಜು ಬಜೆಟ್',
    travelPrefLabel: 'ಪ್ರವಾಸದ ಆದ್ಯತೆ',
    interestsLabel: 'ಮುಖ್ಯ ಆಸಕ್ತಿಗಳು',
    generateTrip: 'ಪ್ರವಾಸ ಯೋಜನೆ ರಚಿಸಿ',
    generatingPlan: 'ಅತ್ಯುತ್ತಮ ಪ್ರವಾಸ ಯೋಜನೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
    tripTimeline: 'ದಿನಚರಿ ಮತ್ತು ಸಮಯ ವಿವರ',
    budgetBreakdown: 'ಅಂದಾಜು ವೆಚ್ಚಗಳ ಪಟ್ಟಿ',
    howItWorksTitle: 'ಎಐ ಹೆರಿಟೇಜ್ ಲೆನ್ಸ್ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?',
    step1Title: 'ಸೆರೆಹಿಡಿಯಿರಿ',
    step1Desc: 'ಸ್ಮಾರಕದ ಛಾಯಾಚಿತ್ರವನ್ನು ತೆಗೆಯಿರಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    step2Title: 'ಗುರುತಿಸಿ',
    step2Desc: 'ಎಐ ತಂತ್ರಜ್ಞಾನವು ಕಂಬಗಳು, ಶಿಲ್ಪಗಳು ಮತ್ತು ವಾಸ್ತು ಶೈಲಿಯನ್ನು ಗುರುತಿಸುತ್ತದೆ.',
    step3Title: 'ಅನ್ವೇಷಿಸಿ',
    step3Desc: 'ಆಳವಾದ ಇತಿಹಾಸ, ರಾಜವಂಶದ ಮಾಹಿತಿ ಮತ್ತು ಛಾಯಾಗ್ರಹಣ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.',
    step4Title: 'ಪ್ರಯಾಣಿಸಿ',
    step4Desc: 'ನಿಮ್ಮ ಮಾರ್ಗವನ್ನು ಯೋಜಿಸಿ ಮತ್ತು ಸುಲಭವಾಗಿ ಸಂಚರಿಸಿ.',
    servicesTitle: 'ಪ್ರವಾಸಿ ಮತ್ತು ತುರ್ತು ಸೇವೆಗಳು',
    servicesSubtitle: 'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ತುರ್ತು ಸಹಾಯವಾಣಿ, ಆಸ್ಪತ್ರೆಗಳು, ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ಸಾರಿಗೆ ಸಂಪರ್ಕ',
    emergency: 'ತುರ್ತು ಸೇವೆ',
    hospitals: 'ಆಸ್ಪತ್ರೆಗಳು',
    police: 'ಪೊಲೀಸ್ & ಪ್ರವಾಸಿ ಠಾಣೆ',
    hotels: 'ವಸತಿ ಗೃಹಗಳು',
    restaurants: 'ಸಾಂಪ್ರದಾಯಿಕ ಖಾನಾವಳಿಗಳು',
    transport: 'ಸಾರಿಗೆ & ವಾಹನ ನಿಲ್ದಾಣ'
  },
  hi: {
    appName: 'एआई हेरिटेज लेंस',
    appSubtitle: 'बागलकोट की ऐतिहासिक धरोहर का आपका बुद्धिमत्तापूर्ण प्रवेश द्वार',
    heroTagline: 'धरोहर की खोज करें। एआई के साथ।',
    heroDescription:
      'ऐतिहासिक स्मारकों की पहचान करें, उनकी गाथाओं को जानें, अपनी यात्रा की योजना बनाएं और एक बौद्धिक पर्यटन सहायक के साथ बागलकोट का अनुभव लें।',
    identifyButton: 'स्मारक पहचानें',
    exploreButton: 'धरोहर देखें',
    startDemoButton: '🎬 डेमो शुरू करें',
    statsMonuments: '25+ ऐतिहासिक स्थल',
    statsLanguages: '3 भाषाएँ',
    statsAiPowered: 'एआई संचालित',
    statsAssistant: '24/7 पर्यटन सहायक',
    navHome: 'होम',
    navIdentify: 'पहचानें',
    navExplore: 'खोजें',
    navPlanner: 'यात्रा योजना',
    navAssistant: 'एआई सहायक',
    navMap: 'मानचित्र',
    navServices: 'पर्यटन सेवाएं',
    navAdmin: 'एडमिन डैशबोर्ड',
    navAbout: 'परिचय',
    startExploring: 'शुरू करें',
    recTitle: 'एआई स्मारक पहचान',
    recSubtitle: 'बादामी, पट्टदकल या ऐहोले के किसी भी स्मारक का फोटो अपलोड करें या कैमरे से कैप्चर करें',
    uploadPhoto: 'फोटो अपलोड करें',
    openCamera: 'कैमरा खोलें',
    closeCamera: 'कैमरा बंद करें',
    capturePhoto: 'फोटो लें',
    chooseDemoPhoto: 'डेमो स्मारक चुनें',
    demoModeLabel: 'डेमो पहचान मोड (सिम्युलेटेड एआई)',
    analyzingStep1: 'आपके स्मारक का विश्लेषण हो रहा है...',
    analyzingStep2: 'स्थापत्य विशेषताओं की तुलना की जा रही है...',
    analyzingStep3: 'धरोहर स्थल की पहचान की जा रही है...',
    identifiedMonument: 'पहचाना गया स्मारक',
    confidence: 'एआई सटीकता',
    category: 'श्रेणी',
    period: 'कालखंड',
    dynasty: 'राजवंश',
    style: 'वास्तुकला शैली',
    exploreHistory: 'इतिहास जानें',
    viewOnMap: 'मानचित्र पर देखें',
    askAi: 'एआई से पूछें',
    planMyVisit: 'यात्रा की योजना बनाएं',
    historyTab: 'इतिहास',
    architectureTab: 'वास्तुकला',
    whyVisitTab: 'क्यों जाएं?',
    travelInfoTab: 'यात्रा जानकारी',
    nearbyTab: 'निकटवर्ती आकर्षण',
    locationLabel: 'स्थान',
    visitingTimeLabel: 'अनुशंसित समय',
    photographyTipsLabel: 'फोटोग्राफी टिप्स',
    familyFriendlyLabel: 'परिवार अनुकूल',
    accessibilityLabel: 'सुलभता जानकारी',
    entryFeeLabel: 'प्रवेश शुल्क',
    getDirections: 'दिशा-निर्देश प्राप्त करें',
    addToTrip: 'यात्रा में जोड़ें',
    assistantTitle: 'हेरिटेज एआई से पूछें',
    assistantSubtitle: 'बादामी, पट्टदकल और ऐहोले के इतिहास, मूर्तिकला और मार्गों के बारे में प्रश्न पूछें',
    suggestedQuestions: 'सुझाए गए प्रश्न',
    inputPlaceholder: 'बागलकोट स्मारकों के बारे में कुछ भी पूछें (हिंदी, कन्नड़, अंग्रेजी)...',
    sendButton: 'पूछें',
    voiceInput: 'ध्वनि इनपुट',
    readAloud: 'उत्तर सुनें',
    stopAudio: 'ध्वनि रोकें',
    thinkingMode: 'गहन स्थापत्य विचार',
    plannerTitle: 'स्मार्ट ट्रिप प्लानर',
    plannerSubtitle: 'अपनी ऐतिहासिक यात्रा के लिए व्यक्तिगत और प्रामाणिक यात्रा कार्यक्रम बनाएं',
    startLocation: 'प्रारंभिक स्थान',
    daysLabel: 'दिनों की संख्या',
    peopleLabel: 'व्यक्तियों की संख्या',
    budgetLabel: 'अनुमानित बजट',
    travelPrefLabel: 'यात्रा प्राथमिकता',
    interestsLabel: 'प्रमुख रुचियाँ',
    generateTrip: 'मेरी यात्रा बनाएं',
    generatingPlan: 'सर्वोत्तम यात्रा कार्यक्रम तैयार हो रहा है...',
    tripTimeline: 'यात्रा समय-सारणी',
    budgetBreakdown: 'अनुमानित बजट विवरण',
    howItWorksTitle: 'एआई हेरिटेज लेंस कैसे कार्य करता है?',
    step1Title: 'कैप्चर करें',
    step1Desc: 'अपने फोन या कैमरे से स्मारक का फोटो लें या अपलोड करें।',
    step2Title: 'पहचानें',
    step2Desc: 'एआई वास्तुकला शैली, नक्काशी और स्तंभों का विश्लेषण करता है।',
    step3Title: 'खोजें',
    step3Desc: 'विस्तृत इतिहास, राजवंश और फोटोग्राफी गाइड प्राप्त करें।',
    step4Title: 'यात्रा करें',
    step4Desc: 'मार्ग की योजना बनाएं और सुगमता से यात्रा का आनंद लें।',
    servicesTitle: 'पर्यटक और आपातकालीन सेवाएं',
    servicesSubtitle: 'बागलकोट जिले में सत्यापित संपर्क, आपातकालीन सहायता और पर्यटक सुविधाएं',
    emergency: 'आपातकालीन सहायता',
    hospitals: 'अस्पताल',
    police: 'पुलिस एवं पर्यटन सहायता',
    hotels: 'होटल एवं लॉज',
    restaurants: 'पारंपरिक भोजनालय',
    transport: 'परिवहन एवं ऑटो स्टैंड'
  }
};
