export interface TranslationDictionary {
  appName: string;
  appSubtitle: string;
  heroTagline: string;
  heroDescription: string;
  teamName: string;
  teamBadge: string;
  identifyButton: string;
  exploreButton: string;
  startDemoButton: string;
  statsMonuments: string;
  statsLanguages: string;
  statsAiPowered: string;
  statsAssistant: string;
  // Nav
  navHome: string;
  navIdentify: string;
  navExplore: string;
  navHeritage: string;
  navThingsToDo: string;
  navRouteMap: string;
  navFoodCulture: string;
  navEvents: string;
  navTravelGuide: string;
  navGallery: string;
  navPlanner: string;
  navAssistant: string;
  navMap: string;
  navServices: string;
  navAdmin: string;
  navAbout: string;
  startExploring: string;
  // AI Monument Recognition
  hdIntroButton: string;
  recTitle: string;
  recSubtitle: string;
  uploadPhoto: string;
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
    appName: 'Tech Yoddhas — AI Heritage Lens',
    appSubtitle: "Your Intelligent Gateway to Bagalkot's Heritage",
    heroTagline: "Discover Bagalkot's Heritage. Powered by AI.",
    heroDescription:
      'Identify historic monuments, explore their stories, plan your journey and experience Bagalkot through an intelligent tourism assistant.',
    teamName: 'Tech Yoddhas',
    teamBadge: 'Crafted by Team Tech Yoddhas',
    identifyButton: 'Identify a Monument',
    exploreButton: 'Explore Heritage',
    startDemoButton: '🎬 Start Demo',
    statsMonuments: '25+ Heritage Sites',
    statsLanguages: '3 Languages',
    statsAiPowered: 'AI Powered',
    statsAssistant: '24/7 Tourism Assistant',
    navHome: 'Home',
    navIdentify: 'AI Monument Lens',
    navExplore: 'Destinations',
    navHeritage: 'Heritage',
    navThingsToDo: 'Things to Do',
    navRouteMap: 'Route Map',
    navFoodCulture: 'Food & Culture',
    navEvents: 'Events',
    navTravelGuide: 'Travel Guide',
    navGallery: 'Gallery',
    navPlanner: 'Trip Planner',
    navAssistant: 'Voice AI Guide',
    navMap: 'Interactive Map',
    navServices: 'Tourist Services',
    navAdmin: 'Admin Dashboard',
    navAbout: 'About Bagalkot',
    startExploring: 'Start Exploring',
    hdIntroButton: '✨ HD Intro',
    recTitle: 'AI Monument Recognition',
    recSubtitle: 'Select any monument in Badami, Pattadakal, or Aihole for instant neural architectural and epigraphical analysis',
    uploadPhoto: 'AI Monument Analysis',
    chooseDemoPhoto: 'Try Demo Monuments',
    demoModeLabel: 'Demo Recognition Mode (Simulated AI)',
    analyzingStep1: 'Analyzing your monument photo...',
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
    inputPlaceholder: 'Ask anything about Bagalkot monuments (English, Kannada, Hindi)...',
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
    howItWorksTitle: 'How Tech Yoddhas AI Heritage Lens Works',
    step1Title: 'Select Monument',
    step1Desc: 'Choose any Badami Chalukyan monument to initiate instant multimodal neural analysis.',
    step2Title: 'Recognize',
    step2Desc: 'AI analyzes the architectural style, pillars, carvings, and contours in real-time.',
    step3Title: 'Explore',
    step3Desc: 'Learn in-depth historical facts, dynasty lore, and photography guides.',
    step4Title: 'Travel',
    step4Desc: 'Plan your route, check distances, and navigate smoothly.',
    servicesTitle: 'Tourist & Emergency Services',
    servicesSubtitle: 'Verified contacts, local emergency help, and traveler amenities in Bagalkot district',
    emergency: 'Emergency Help',
    hospitals: 'Hospitals & Medical',
    police: 'Police & Tourist Help',
    hotels: 'Hotels & Lodges',
    restaurants: 'Authentic Restaurants',
    transport: 'Transport & Auto Stands'
  },
  kn: {
    appName: 'ಟೆಕ್ ಯೋಧಾಸ್ — ಎಐ ಹೆರಿಟೇಜ್ ಲೆನ್ಸ್',
    appSubtitle: 'ಬಾಗಲಕೋಟೆಯ ಐತಿಹಾಸಿಕ ಪರಂಪರೆಗೆ ನಿಮ್ಮ ಜಾಣ ಗವಾಕ್ಷಿ',
    heroTagline: 'ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ. ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯೊಂದಿಗೆ.',
    heroDescription:
      'ಐತಿಹಾಸಿಕ ಸ್ಮಾರಕಗಳನ್ನು ಗುರುತಿಸಿ, ಅವುಗಳ ಭವ್ಯ ಕಥೆಗಳನ್ನು ತಿಳಿಯಿರಿ, ನಿಮ್ಮ ಪ್ರವಾಸವನ್ನು ಯೋಜಿಸಿ ಮತ್ತು ಜಾಣ ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿಯೊಂದಿಗೆ ಬಾಗಲಕೋಟೆಯನ್ನು ಅನುಭವಿಸಿ.',
    teamName: 'ಟೆಕ್ ಯೋಧಾಸ್',
    teamBadge: 'ಟೆಕ್ ಯೋಧಾಸ್ ತಂಡದ ಹೆಮ್ಮೆಯ ಕೊಡುಗೆ',
    identifyButton: 'ಸ್ಮಾರಕ ಗುರುತಿಸಿ',
    exploreButton: 'ಪರಂಪರೆ ಅನ್ವೇಷಿಸಿ',
    startDemoButton: '🎬 ಡೆಮೊ ಪ್ರಾರಂಭಿಸಿ',
    statsMonuments: '25+ ಐತಿಹಾಸಿಕ ತಾಣಗಳು',
    statsLanguages: '3 ಭಾಷೆಗಳು',
    statsAiPowered: 'ಎಐ ಆಧಾರಿತ ತಂತ್ರಜ್ಞಾನ',
    statsAssistant: '24/7 ಪ್ರವಾಸ ಸಹಾಯಕ',
    navHome: 'ಮುಖಪುಟ',
    navIdentify: 'ಎಐ ಸ್ಕ್ಯಾನರ್',
    navExplore: 'ಪ್ರವಾಸಿ ತಾಣಗಳು',
    navHeritage: 'ಚಾಲುಕ್ಯ ಪರಂಪರೆ',
    navThingsToDo: 'ಅನುಭವಗಳು',
    navRouteMap: 'ಮಾರ್ಗ ನಕ್ಷೆ',
    navFoodCulture: 'ಆಹಾರ & ಸಂಸ್ಕೃತಿ',
    navEvents: 'ಉತ್ಸವಗಳು',
    navTravelGuide: 'ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ',
    navGallery: 'ಚಿತ್ರಶಾಲೆ',
    navPlanner: 'ಪ್ರವಾಸ ಯೋಜನೆ',
    navAssistant: 'ಧ್ವನಿ ಎಐ ಸಹಾಯಕ',
    navMap: 'ಸಂವಾದಾತ್ಮಕ ನಕ್ಷೆ',
    navServices: 'ಪ್ರವಾಸಿ ಸೇವೆಗಳು',
    navAdmin: 'ಆಡಳಿತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navAbout: 'ಬಾಗಲಕೋಟೆ ಕುರಿತು',
    startExploring: 'ಅನ್ವೇಷಣೆ ಆರಂಭಿಸಿ',
    hdIntroButton: '✨ ಹೆಚ್‌ಡಿ ಮುಖಪುಟ',
    recTitle: 'ಎಐ ಸ್ಮಾರಕ ಗುರುತಿಸುವಿಕೆ',
    recSubtitle: 'ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು ಅಥವಾ ಐಹೊಳೆಯ ಯಾವುದೇ ಸ್ಮಾರಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ತಕ್ಷಣದ ವಾಸ್ತುಶಿಲ್ಪ ಹಾಗೂ ಶಾಸನ ವಿಶ್ಲೇಷಣೆ ಪಡೆಯಿರಿ',
    uploadPhoto: 'ಎಐ ಸ್ಮಾರಕ ವಿಶ್ಲೇಷಣೆ',
    chooseDemoPhoto: 'ಮಾದರಿ ಸ್ಮಾರಕಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    demoModeLabel: 'ಮಾದರಿ ಗುರುತಿಸುವಿಕೆ ವಿಧಾನ (ಸಿಮ್ಯುಲೇಟೆಡ್ ಎಐ)',
    analyzingStep1: 'ನಿಮ್ಮ ಸ್ಮಾರಕದ ಫೋಟೋ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    analyzingStep2: 'ವಾಸ್ತುಶಿಲ್ಪದ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
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
    visitingTimeLabel: 'ಭೇಟಿಗೆ ಸೂಕ್ತ ಸಮಯ',
    photographyTipsLabel: 'ಛಾಯಾಗ್ರಹಣ ಸಲಹೆಗಳು',
    familyFriendlyLabel: 'ಕುಟುಂಬಕ್ಕೆ ಸೂಕ್ತ',
    accessibilityLabel: 'ಪ್ರವೇಶಾವಕಾಶ ಮತ್ತು ಸೌಲಭ್ಯಗಳು',
    entryFeeLabel: 'ಪ್ರವೇಶ ಶುಲ್ಕ',
    getDirections: 'ಮಾರ್ಗಸೂಚಿ ಪಡೆಯಿರಿ',
    addToTrip: 'ಪ್ರವಾಸಕ್ಕೆ ಸೇರಿಸಿ',
    assistantTitle: 'ಟೆಕ್ ಯೋಧಾಸ್ ಎಐ ಸಹಾಯಕ',
    assistantSubtitle: 'ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲು ಮತ್ತು ಐಹೊಳೆಯ ಇತಿಹಾಸ, ಶಿಲ್ಪಕಲೆ ಮತ್ತು ಮಾರ್ಗಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ',
    suggestedQuestions: 'ಸಲಹಾ ಪ್ರಶ್ನೆಗಳು',
    inputPlaceholder: 'ಬಾಗಲಕೋಟೆಯ ಸ್ಮಾರಕಗಳ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ (ಕನ್ನಡ, ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ)...',
    sendButton: 'ಕೇಳಿ',
    voiceInput: 'ಧ್ವನಿ ಮೂಲಕ ಕೇಳಿ (ಇನ್‌ಪುಟ್)',
    readAloud: 'ಉತ್ತರವನ್ನು ಆಲಿಸಿ',
    stopAudio: 'ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ',
    thinkingMode: 'ಆಳವಾದ ವಾಸ್ತುಶಿಲ್ಪ ವಿಶ್ಲೇಷಣೆ',
    plannerTitle: 'ಸ್ಮಾರ್ಟ್ ಪ್ರವಾಸ ಯೋಜಕ',
    plannerSubtitle: 'ನಿಮ್ಮ ಐತಿಹಾಸಿಕ ಪ್ರವಾಸಕ್ಕಾಗಿ ವೈಯಕ್ತಿಕಗೊಳಿಸಿದ, ಸಮಯೋಚಿತ ಪ್ರವಾಸ ಯೋಜನೆಯನ್ನು ರೂಪಿಸಿ',
    startLocation: 'ಪ್ರಾರಂಭದ ಸ್ಥಳ',
    daysLabel: 'ದಿನಗಳ ಸಂಖ್ಯೆ',
    peopleLabel: 'ವ್ಯಕ್ತಿಗಳ ಸಂಖ್ಯೆ',
    budgetLabel: 'ಅಂದಾಜು ಬಜೆಟ್',
    travelPrefLabel: 'ಪ್ರವಾಸದ ಆದ್ಯತೆ',
    interestsLabel: 'ಮುಖ್ಯ ಆಸಕ್ತಿಗಳು',
    generateTrip: 'ಪ್ರವಾಸ ಯೋಜನೆ ರಚಿಸಿ',
    generatingPlan: 'ಅತ್ಯುತ್ತಮ ಪ್ರವಾಸ ಯೋಜನೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
    tripTimeline: 'ಪ್ರವಾಸದ ದಿನಚರಿ ಮತ್ತು ಸಮಯ ವಿವರ',
    budgetBreakdown: 'ಅಂದಾಜು ವೆಚ್ಚಗಳ ಪಟ್ಟಿ',
    howItWorksTitle: 'ಟೆಕ್ ಯೋಧಾಸ್ ಎಐ ಲೆನ್ಸ್ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?',
    step1Title: 'ಸ್ಮಾರಕ ಆಯ್ಕೆಮಾಡಿ',
    step1Desc: 'ಯಾವುದೇ ಬಾದಾಮಿ ಚಾಲುಕ್ಯ ಸ್ಮಾರಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ ತಕ್ಷಣದ ಎಐ ವಿಶ್ಲೇಷಣೆ ಆರಂಭಿಸಿ.',
    step2Title: 'ಗುರುತಿಸಿ',
    step2Desc: 'ಎಐ ತಂತ್ರಜ್ಞಾನವು ಕಂಬಗಳು, ಶಿಲ್ಪಕಲೆ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ ಶೈಲಿಯನ್ನು ತಕ್ಷಣ ಗುರುತಿಸುತ್ತದೆ.',
    step3Title: 'ಅನ್ವೇಷಿಸಿ',
    step3Desc: 'ಆಳವಾದ ಇತಿಹಾಸ, ರಾಜವಂಶದ ಮಾಹಿತಿ ಮತ್ತು ಛಾಯಾಗ್ರಹಣ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.',
    step4Title: 'ಪ್ರಯಾಣಿಸಿ',
    step4Desc: 'ನಿಮ್ಮ ಮಾರ್ಗವನ್ನು ಯೋಜಿಸಿ ಮತ್ತು ಸುಲಭವಾಗಿ ಸಂಚರಿಸಿ.',
    servicesTitle: 'ಪ್ರವಾಸಿ ಮತ್ತು ತುರ್ತು ಸೇವೆಗಳು',
    servicesSubtitle: 'ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆಯ ತುರ್ತು ಸಹಾಯವಾಣಿ, ಆಸ್ಪತ್ರೆಗಳು, ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ಸಾರಿಗೆ ಸಂಪರ್ಕ',
    emergency: 'ತುರ್ತು ಸೇವೆ',
    hospitals: 'ಆಸ್ಪತ್ರೆಗಳು',
    police: 'ಪೊಲೀಸ್ ಮತ್ತು ಪ್ರವಾಸಿ ಸಹಾಯ ಕೇಂದ್ರ',
    hotels: 'ವಸತಿ ಗೃಹಗಳು & ಹೋಟೆಲ್‌ಗಳು',
    restaurants: 'ಸಾಂಪ್ರದಾಯಿಕ ಖಾನಾವಳಿಗಳು (ಊಟ)',
    transport: 'ಸಾರಿಗೆ ಮತ್ತು ವಾಹನ ಸೇವೆಗಳು'
  },
  hi: {
    appName: 'टेक योद्धास — एआई हेरिटेज लेंस',
    appSubtitle: 'बागलकोट की ऐतिहासिक धरोहर का आपका बुद्धिमत्तापूर्ण प्रवेश द्वार',
    heroTagline: 'धरोहर की खोज करें। एआई तकनीक के साथ।',
    heroDescription:
      'ऐतिहासिक स्मारकों की पहचान करें, उनकी गाथाओं को जानें, अपनी यात्रा की योजना बनाएं और एक स्मार्ट पर्यटन सहायक के साथ बागलकोट का अनुभव लें।',
    teamName: 'टेक योद्धास',
    teamBadge: 'टीम टेक योद्धास द्वारा निर्मित',
    identifyButton: 'स्मारक पहचानें',
    exploreButton: 'धरोहर देखें',
    startDemoButton: '🎬 डेमो शुरू करें',
    statsMonuments: '25+ ऐतिहासिक स्थल',
    statsLanguages: '3 भाषाएँ',
    statsAiPowered: 'एआई संचालित',
    statsAssistant: '24/7 पर्यटन सहायक',
    navHome: 'होम',
    navIdentify: 'एआई स्मारक लेंस',
    navExplore: 'पर्यटन स्थल',
    navHeritage: 'चालुक्य धरोहर',
    navThingsToDo: 'गतिविधियां एवं अनुभव',
    navRouteMap: 'रूट मैप',
    navFoodCulture: 'खानपान एवं संस्कृति',
    navEvents: 'उत्सव एवं मेले',
    navTravelGuide: 'यात्रा गाइड',
    navGallery: 'गैलरी',
    navPlanner: 'यात्रा योजना',
    navAssistant: 'वॉइस एआई सहायक',
    navMap: 'मानचित्र',
    navServices: 'पर्यटक सेवाएं',
    navAdmin: 'एडमिन डैशबोर्ड',
    navAbout: 'बागलकोट परिचय',
    startExploring: 'शुरू करें',
    hdIntroButton: '✨ एचडी इंट्रो',
    recTitle: 'एआई स्मारक पहचान',
    recSubtitle: 'बादामी, पट्टदकल या ऐहोल के किसी भी स्मारक को चुनें और तुरंत स्थापत्य एवं अभिलेखीय विश्लेषण प्राप्त करें',
    uploadPhoto: 'एआई स्मारक विश्लेषण',
    chooseDemoPhoto: 'मॉडल / डेमो स्मारक चुनें',
    demoModeLabel: 'डेमो पहचान मोड (सिम्युलेटेड एआई)',
    analyzingStep1: 'स्मारक फोटो का विश्लेषण हो रहा है...',
    analyzingStep2: 'स्थापत्य विशेषताओं की तुलना की जा रही है...',
    analyzingStep3: 'धरोहर स्थल की पहचान की जा रही है...',
    identifiedMonument: 'पहचाना गया स्मारक',
    confidence: 'एआई विश्वसनीयता',
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
    visitingTimeLabel: 'भ्रमण का सर्वोत्तम समय',
    photographyTipsLabel: 'फोटोग्राफी टिप्स',
    familyFriendlyLabel: 'परिवार के लिए उपयुक्त',
    accessibilityLabel: 'सुलभता एवं प्रवेश सुविधाएं',
    entryFeeLabel: 'प्रवेश शुल्क',
    getDirections: 'दिशा-निर्देश प्राप्त करें',
    addToTrip: 'यात्रा में जोड़ें',
    assistantTitle: 'टेक योद्धास हेरिटेज एआई से पूछें',
    assistantSubtitle: 'बादामी, पट्टदकल और ऐहोले के इतिहास, मूर्तिकला और मार्गों के बारे में प्रश्न पूछें',
    suggestedQuestions: 'सुझाए गए प्रश्न',
    inputPlaceholder: 'बागलकोट स्मारकों के बारे में कुछ भी पूछें (हिंदी, कन्नड़, अंग्रेजी)...',
    sendButton: 'पूछें',
    voiceInput: 'वॉइस इनपुट (बोलकर पूछें)',
    readAloud: 'उत्तर बोलकर सुनें',
    stopAudio: 'ऑडियो रोकें',
    thinkingMode: 'गहन ऐतिहासिक एवं स्थापत्य विश्लेषण',
    plannerTitle: 'स्मार्ट ट्रिप प्लानर',
    plannerSubtitle: 'अपनी ऐतिहासिक यात्रा के लिए व्यक्तिगत और प्रामाणिक यात्रा कार्यक्रम बनाएं',
    startLocation: 'प्रस्थान स्थल',
    daysLabel: 'दिनों की संख्या',
    peopleLabel: 'व्यक्तियों की संख्या',
    budgetLabel: 'अनुमानित बजट',
    travelPrefLabel: 'यात्रा प्राथमिकता',
    interestsLabel: 'प्रमुख रुचियाँ',
    generateTrip: 'मेरा यात्रा कार्यक्रम तैयार करें',
    generatingPlan: 'सर्वोत्तम यात्रा कार्यक्रम तैयार हो रहा है...',
    tripTimeline: 'यात्रा कार्यसूची और समय-सारणी',
    budgetBreakdown: 'अनुमानित बजट विवरण',
    howItWorksTitle: 'टेक योद्धास एआई हेरिटेज लेंस कैसे कार्य करता है?',
    step1Title: 'स्मारक चुनें',
    step1Desc: 'चालुक्य राजवंश के किसी भी स्मारक को चुनकर तुरंत एआई विश्लेषण शुरू करें।',
    step2Title: 'पहचानें',
    step2Desc: 'एआई वास्तुकला शैली, नक्काशी और स्तंभों का रियल-टाइम विश्लेषण करता है।',
    step3Title: 'खोजें',
    step3Desc: 'विस्तृत इतिहास, राजवंश और फोटोग्राफी गाइड प्राप्त करें।',
    step4Title: 'यात्रा करें',
    step4Desc: 'मार्ग की योजना बनाएं और सुगमता से यात्रा का आनंद लें।',
    servicesTitle: 'पर्यटक और आपातकालीन सेवाएं',
    servicesSubtitle: 'बागलकोट जिले में सत्यापित संपर्क, आपातकालीन सहायता और पर्यटक सुविधाएं',
    emergency: 'आपातकालीन सहायता',
    hospitals: 'अस्पताल',
    police: 'पुलिस एवं पर्यटक सहायता',
    hotels: 'होटल एवं विश्राम गृह',
    restaurants: 'पारंपरिक भोजनालय एवं खानपान',
    transport: 'परिवहन एवं टैक्सी / बस सेवाएं'
  }
};
