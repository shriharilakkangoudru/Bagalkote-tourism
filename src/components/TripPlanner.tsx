import React, { useState } from 'react';
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

  const handleGenerateTrip = async () => {
    setIsGenerating(true);

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
      }
    } catch (e) {
      console.warn('Backend trip plan API fallback:', e);
    }

    // Short simulated delay for UX feedback
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
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
