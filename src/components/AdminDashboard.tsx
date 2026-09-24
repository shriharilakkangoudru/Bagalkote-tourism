import React, { useState } from 'react';
import { ShieldCheck, BarChart3, Database, MessageSquare, PlusCircle, Sparkles, Check, Trash2, Edit3, Eye, FileText, TrendingUp, Users } from 'lucide-react';
import { Monument, Language } from '../types';
import { MONUMENTS } from '../data/monumentsData';
import { TOURIST_SERVICES } from '../data/tourismServices';
import { VERIFIED_IMAGES } from '../data/verifiedImages';

interface AdminDashboardProps {
  language: Language;
  onSelectMonument: (monument: Monument) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  language,
  onSelectMonument,
}) => {
  const [monumentsList, setMonumentsList] = useState<Monument[]>(MONUMENTS);
  const [newMonumentName, setNewMonumentName] = useState('');
  const [newMonumentCluster, setNewMonumentCluster] = useState<'Badami' | 'Pattadakal' | 'Aihole'>('Badami');
  const [newMonumentLocation, setNewMonumentLocation] = useState('');
  const [newMonumentStyle, setNewMonumentStyle] = useState('Chalukyan Architecture');
  const [newMonumentImage, setNewMonumentImage] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Simulated live telemetry logs
  const [recentQueries] = useState([
    { time: '2 mins ago', query: 'What is the history of Cave 1 in Badami?', status: 'Answered • Gemini Flash' },
    { time: '7 mins ago', query: 'Can I visit Pattadakal with a wheelchair?', status: 'Answered • Local RAG' },
    { time: '14 mins ago', query: 'Best place for Jolada Rotti lunch near Aihole?', status: 'Answered • Services DB' },
    { time: '25 mins ago', query: 'Image identified: Virupaksha Temple (96% conf)', status: 'Classified • Vision AI' },
    { time: '41 mins ago', query: '1-Day Itinerary from Hubballi for 4 people', status: 'Generated • Trip Planner' },
  ]);

  const handleAddMonument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMonumentName || !newMonumentLocation) return;

    const newEntry: Monument = {
      id: `custom-${Date.now()}`,
      name: newMonumentName,
      kannadaName: newMonumentName,
      hindiName: newMonumentName,
      cluster: newMonumentCluster,
      location: newMonumentLocation,
      subLocation: `${newMonumentLocation}, Bagalkote`,
      district: 'Bagalkote',
      coordinates: { lat: 15.92, lng: 75.69 },
      category: 'Temples',
      period: '6th–8th Century CE',
      dynasty: 'Badami Chalukyas',
      architectureStyle: newMonumentStyle,
      image: newMonumentImage || VERIFIED_IMAGES.virupaksha,
      shortDescription: {
        en: `Heritage monument situated in ${newMonumentLocation}, showcasing ${newMonumentStyle}.`,
        kn: `${newMonumentLocation} ನಲ್ಲಿರುವ ಐತಿಹಾಸಿಕ ಸ್ಮಾರಕ.`,
        hi: `${newMonumentLocation} में स्थित ऐतिहासिक स्मारक।`,
      },
      history: {
        en: `Constructed during the peak of Early Chalukya sovereignty in the Malaprabha valley.`,
        kn: `ಚಾಲುಕ್ಯ ರಾಜಮನೆತನದ ಕಾಲದಲ್ಲಿ ನಿರ್ಮಿತವಾದ ಪವಿತ್ರ ತಾಣ.`,
        hi: `चालुक्य राजवंश के काल में निर्मित ऐतिहासिक स्थल।`,
      },
      architecture: {
        en: `Hand-carved red sandstone block masonry reflecting classical Deccan idioms.`,
        kn: `ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಶಿಲ್ಪಕಲಾ ರಚನೆ.`,
        hi: `लाल बलुआ पत्थर की शास्त्रीय नक्काशी।`,
      },
      historicalSignificance: 'Protected under Karnataka State Archaeology & Heritage Department.',
      interestingFacts: ['Maintained as an active heritage preserve.', 'Features ancient masons guild marks.'],
      whyVisit: {
        en: 'Offers authentic historical insight into the regional rock masonry techniques.',
        kn: 'ಪ್ರಾದೇಶಿಕ ಶಿಲ್ಪಕಲೆಯ ಸೊಬಗನ್ನು ವೀಕ್ಷಿಸಲು ಸೂಕ್ತ.',
        hi: 'पारंपरिक शिल्प कौशल का अनुपम उदाहरण।',
      },
      distanceFromBadamiKm: 12,
      approxTravelTime: '20 mins',
      entryFee: { indian: '₹25', foreign: '₹300' },
      timings: '08:00 AM - 06:00 PM',
      suggestedVisitingTime: '1 - 2 hours',
      photographyTips: 'Best morning lighting for the front portico.',
      familyFriendly: true,
      familyFriendlyNote: 'Gentle flat approach with minimal steps.',
      accessibility: 'Paved stone access ramp up to inner mantapa.',
      nearbyAttractions: ['Badami Caves', 'Agastya Lake'],
    };

    setMonumentsList([newEntry, ...monumentsList]);
    setNewMonumentName('');
    setNewMonumentLocation('');
    setNewMonumentImage('');
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  const handleDeleteMonument = (id: string) => {
    setMonumentsList(monumentsList.filter((m) => m.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 text-white">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>System Administration & Competition Telemetry</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
          Tourism Platform Control Center
        </h2>
        <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto">
          Monitor real-time AI recognition performance, manage the monument registry, and review visitor inquiries.
        </p>
      </div>

      {/* Analytics Metric Cards as mandated in Section 11 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-[#151c2a] border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Monuments Identified</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-300 font-serif">142</p>
          <span className="text-[11px] text-emerald-400 font-semibold">↑ 18% during demo</span>
        </div>

        <div className="bg-[#151c2a] border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Questions Answered</span>
            <MessageSquare className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-purple-300 font-serif">428</p>
          <span className="text-[11px] text-emerald-400 font-semibold">99.4% accuracy rate</span>
        </div>

        <div className="bg-[#151c2a] border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Trips Generated</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-300 font-serif">89</p>
          <span className="text-[11px] text-emerald-400 font-semibold">₹1500 avg budget</span>
        </div>

        <div className="bg-[#151c2a] border border-amber-500/30 rounded-2xl p-5 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Most Asked Monument</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-sm font-extrabold text-white font-serif mt-1 truncate">
            Virupaksha Temple
          </p>
          <span className="text-[11px] text-amber-300 font-semibold">Pattadakal (42% share)</span>
        </div>
      </div>

      {/* Grid: Add Monument Form & Live Query Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 6 cols: Add Monument Form */}
        <div className="lg:col-span-6 bg-[#141b28] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <h3 className="text-lg font-bold font-serif text-white flex items-center space-x-2">
              <PlusCircle className="w-5 h-5 text-amber-400" />
              <span>Add / Edit Monument Listing</span>
            </h3>
            <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded">
              Total: {monumentsList.length}
            </span>
          </div>

          <form onSubmit={handleAddMonument} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Monument Name</label>
              <input
                type="text"
                value={newMonumentName}
                onChange={(e) => setNewMonumentName(e.target.value)}
                placeholder="e.g. Mahakuteshwara Temple, Mahakuta"
                className="w-full bg-[#1b2333] border border-gray-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Cluster</label>
                <select
                  value={newMonumentCluster}
                  onChange={(e) => setNewMonumentCluster(e.target.value as any)}
                  className="w-full bg-[#1b2333] border border-gray-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Badami">Badami</option>
                  <option value="Pattadakal">Pattadakal</option>
                  <option value="Aihole">Aihole</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Location</label>
                <input
                  type="text"
                  value={newMonumentLocation}
                  onChange={(e) => setNewMonumentLocation(e.target.value)}
                  placeholder="e.g. Mahakuta Valley"
                  className="w-full bg-[#1b2333] border border-gray-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Architecture Style</label>
              <input
                type="text"
                value={newMonumentStyle}
                onChange={(e) => setNewMonumentStyle(e.target.value)}
                className="w-full bg-[#1b2333] border border-gray-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Image URL (Optional)</label>
              <input
                type="url"
                value={newMonumentImage}
                onChange={(e) => setNewMonumentImage(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#1b2333] border border-gray-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Save Monument into Registry</span>
            </button>

            {addedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Monument successfully registered to local database!</span>
              </div>
            )}
          </form>
        </div>

        {/* Right 6 cols: Live Query Telemetry & Audit Logs */}
        <div className="lg:col-span-6 bg-[#141b28] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <h3 className="text-lg font-bold font-serif text-white flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <span>Simulated Tourist AI Query Logs</span>
            </h3>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Live Stream</span>
            </span>
          </div>

          <div className="space-y-3">
            {recentQueries.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#1b2333] border border-gray-800 flex flex-col space-y-1"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">{item.time}</span>
                  <span className="text-amber-300 font-mono text-[10px] bg-amber-500/10 px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-200">"{item.query}"</p>
              </div>
            ))}
          </div>

          {/* Quick Registry Table Snippet */}
          <div className="pt-4 border-t border-gray-800 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Recent Monument Records ({monumentsList.length})
            </h4>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {monumentsList.slice(0, 6).map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 rounded-xl bg-[#101622] border border-gray-800/80 flex items-center justify-between text-xs"
                >
                  <div className="truncate mr-2">
                    <p className="font-semibold text-white truncate">{m.name}</p>
                    <p className="text-[10px] text-gray-400">{m.cluster} • {m.category}</p>
                  </div>
                  <div className="flex items-center space-x-1.5 flex-shrink-0">
                    <button
                      onClick={() => onSelectMonument(m)}
                      className="p-1 rounded bg-white/10 hover:bg-white/20 text-gray-300"
                      title="Inspect"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMonument(m.id)}
                      className="p-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
