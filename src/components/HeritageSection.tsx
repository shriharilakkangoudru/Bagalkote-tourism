import React, { useState } from 'react';
import { Landmark, Compass, Sparkles, Scroll, ShieldCheck, ChevronRight, Layers, ArrowRight } from 'lucide-react';
import { handleImageError } from '../utils/imageUtils';

interface HeritageSectionProps {
  onExploreDestinations?: () => void;
  onExploreRouteMap?: () => void;
}

export const HeritageSection: React.FC<HeritageSectionProps> = ({
  onExploreDestinations,
  onExploreRouteMap
}) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'caves' | 'sculptures' | 'inscriptions' | 'timeline'>('architecture');

  const timelineEvents = [
    {
      year: '540 CE',
      ruler: 'Pulakeshin I',
      title: 'Founding of Vatapi (Badami)',
      desc: 'King Pulakeshin I establishes Vatapi as the imperial capital between two rugged red sandstone cliffs and constructs the Agastya Lake reservoir.'
    },
    {
      year: '578 CE',
      ruler: 'Mangalesha',
      title: 'Dedication of Badami Cave 3',
      desc: 'Consecration of the grand monolithic Vaishnava Cave 3 with monumental carvings of Lord Vishnu seated on the serpent Adisesha.'
    },
    {
      year: '610 – 642 CE',
      ruler: 'Pulakeshin II',
      title: 'Deccan Hegemony & Harshavardhana Defeat',
      desc: 'The most illustrious Chalukya emperor defeats Emperor Harshavardhana on the banks of the Narmada and receives Persian ambassadors at Vatapi.'
    },
    {
      year: '634 CE',
      ruler: 'Ravikirti (Court Poet)',
      title: 'The Great Aihole Inscription',
      desc: 'Composed on the stone wall of the Meguti Temple, recording the Chalukya royal genealogy and explicitly naming classical poets Kalidasa and Bharavi.'
    },
    {
      year: '740 – 745 CE',
      ruler: 'Queen Lokamahadevi & Vikramaditya II',
      title: 'Virupaksha Temple at Pattadakal',
      desc: 'Queen Lokamahadevi commissions the crowning masterpiece of Pattadakal to commemorate the victory over the Pallavas of Kanchipuram, inspiring the Ellora Kailash Temple.'
    },
    {
      year: '757 CE',
      ruler: 'Kirtivarman II',
      title: 'Architectural Legacy Passes to Rashtrakutas',
      desc: 'The Chalukyan rock-carving traditions directly inspire the Rashtrakutas and later Hoysala temple styles across the Deccan plateau.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>The Chalukyan Golden Legacy</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
          Heritage of Bagalkot District
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Between 540 CE and 757 CE, the Badami Chalukyas pioneered a structural and artistic renaissance in the Malaprabha River valley that defined the trajectory of Indian temple art.
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'architecture'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Chalukyan Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('caves')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'caves'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Rock-Cut Caves</span>
        </button>

        <button
          onClick={() => setActiveTab('sculptures')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'sculptures'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Master Sculptures</span>
        </button>

        <button
          onClick={() => setActiveTab('inscriptions')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'inscriptions'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <Scroll className="w-4 h-4" />
          <span>Royal Inscriptions</span>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'timeline'
              ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/25'
              : 'bg-[#141b29] text-gray-300 hover:text-white border border-gray-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Historical Timeline</span>
        </button>
      </div>

      {/* Tab Panels */}
      {/* 1. CHALUKYAN ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131b29] border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              A Synthesis of Styles
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Karnataka Dravida, Nagara & Vesara Foundations
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              The Chalukyan architects solved the primary aesthetic challenge of classical Indian building: how to integrate northern curvilinear spires (Rekha-Nagara) with southern stepped pyramidal vimanas (Karnataka Dravida).
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#182234] border border-gray-750 space-y-1">
                <h4 className="text-sm font-bold text-amber-300">Southern Dravidian Vimana Style</h4>
                <p className="text-xs text-gray-300">
                  Exemplified by Virupaksha and Sangameshwara at Pattadakal. Characterized by square sanctums, multi-tiered receding storeys (talas) adorned with miniature kuta and sala pavilions, and crowned with a domical shikhara.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#182234] border border-gray-750 space-y-1">
                <h4 className="text-sm font-bold text-amber-300">Northern Rekha-Nagara Style</h4>
                <p className="text-xs text-gray-300">
                  Exemplified by Kadasiddheshwara, Jambulinga, and Galaganatha temples at Pattadakal. Features inward-curving vertical spires crowned by a ribbed circular amalakha stone disk.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#182234] border border-gray-750 space-y-1">
                <h4 className="text-sm font-bold text-amber-300">The Experimental Apsidal Plan</h4>
                <p className="text-xs text-gray-300">
                  Exemplified by the famed Durga Temple at Aihole. A horse-shoe semi-circular sanctum surrounded by a colonnade of carved pillars echoing early Buddhist chaitya halls adapted for Hindu shrines.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-xl bg-gray-900 h-96">
            <img
              src="/images/monuments/virupaksha.jpg"
              alt="Virupaksha Temple Architecture"
              className="w-full h-full object-cover"
              onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
              <span className="text-xs text-amber-400 font-bold">Pattadakal Virupaksha Complex (740 CE)</span>
              <p className="text-xs text-gray-200">The prototype for Ellora's rock-cut Kailash temple</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. ROCK-CUT CAVES */}
      {activeTab === 'caves' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#141b29] border border-gray-800 rounded-2xl overflow-hidden p-5 space-y-3">
            <div className="h-44 rounded-xl overflow-hidden bg-gray-900">
              <img
                src="/images/monuments/nataraja-cave1.jpg"
                alt="Badami Cave 1"
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, '/images/monuments/badami-caves.jpg')}
              />
            </div>
            <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">Cave 1 • Shaiva (578 CE)</span>
            <h4 className="text-base font-bold font-serif text-white">18-Armed Dancing Shiva</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Carved into the lowest tier, famous for the magnificent relief of Nataraja demonstrating 81 classical Bharatanatyam dance poses with Ganesha and Nandi.
            </p>
          </div>

          <div className="bg-[#141b29] border border-gray-800 rounded-2xl overflow-hidden p-5 space-y-3">
            <div className="h-44 rounded-xl overflow-hidden bg-gray-900">
              <img
                src="/images/monuments/badami-caves-exterior.jpg"
                alt="Badami Cave 2"
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, '/images/monuments/badami-caves.jpg')}
              />
            </div>
            <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">Cave 2 • Vaishnava</span>
            <h4 className="text-base font-bold font-serif text-white">Trivikrama & Varaha Avatars</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Dedicated to Lord Vishnu, featuring dramatic reliefs of cosmic Trivikrama stepping across the heavens and Varaha rescuing Mother Earth from the cosmic depths.
            </p>
          </div>

          <div className="bg-[#141b29] border border-gray-800 rounded-2xl overflow-hidden p-5 space-y-3">
            <div className="h-44 rounded-xl overflow-hidden bg-gray-900">
              <img
                src="/images/monuments/badami-caves.jpg"
                alt="Badami Cave 3"
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, '/images/monuments/badami-caves.jpg')}
              />
            </div>
            <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">Cave 3 • Imperial Monolith (578 CE)</span>
            <h4 className="text-base font-bold font-serif text-white">Seated Vishnu on Adisesha</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              The largest and most sumptuously sculpted cave in the complex, commissioned by Prince Mangalesha with preserved ceiling fresco pigment traces.
            </p>
          </div>

          <div className="bg-[#141b29] border border-gray-800 rounded-2xl overflow-hidden p-5 space-y-3">
            <div className="h-44 rounded-xl overflow-hidden bg-gray-900">
              <img
                src="/images/monuments/ravana-phadi.jpg"
                alt="Badami Cave 4 & Ravana Phadi"
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, '/images/monuments/ravana-phadi.jpg')}
              />
            </div>
            <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">Cave 4 & Ravana Phadi</span>
            <h4 className="text-base font-bold font-serif text-white">Jain Tirthankaras & Aihole Cave</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Cave 4 honors Mahavira and Parshvanatha, while Ravana Phadi at Aihole represents the earliest 6th-century rock-cut hall in the region.
            </p>
          </div>
        </div>
      )}

      {/* 3. SCULPTURES */}
      {activeTab === 'sculptures' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#131b29] border border-gray-800 p-6 rounded-2xl space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase">Cave 1, Badami</span>
            <h4 className="text-lg font-bold font-serif text-white">Cosmic Nataraja</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Carved with nine arms on either side holding cosmic weapons, damaru drum, and displaying mudras. The posture represents the rhythmic cycle of creation and dissolution.
            </p>
          </div>

          <div className="bg-[#131b29] border border-gray-800 p-6 rounded-2xl space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase">Durga Temple, Aihole</span>
            <h4 className="text-lg font-bold font-serif text-white">Mahishasuramardini</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Goddess Durga depicted with sublime composure as she effortlessly spears the demon buffalo Mahishasura. Regarded as one of the finest early Hindu feminine sculptures.
            </p>
          </div>

          <div className="bg-[#131b29] border border-gray-800 p-6 rounded-2xl space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase">Virupaksha & Mallikarjuna</span>
            <h4 className="text-lg font-bold font-serif text-white">Epic Narrative Friezes</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Intricately detailed episodes from the Ramayana (Abduction of Sita, Battle with Ravana) and the Mahabharata, carved with astonishing anatomical realism and kinetic energy.
            </p>
          </div>
        </div>
      )}

      {/* 4. INSCRIPTIONS */}
      {activeTab === 'inscriptions' && (
        <div className="bg-[#131b29] border border-gray-800 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Epigraphical Treasures
            </span>
            <h3 className="text-2xl font-bold font-serif text-white">
              Stone Epigraphs That Dated Ancient Indian History
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              The inscriptions of Bagalkot District are world-famous among historians for establishing definitive chronological benchmarks in ancient Indian literature and history.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-[#172133] border border-gray-750 space-y-2">
              <h4 className="text-sm font-bold text-amber-300">Aihole Meguti Inscription (634 CE)</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Composed by Jain court poet Ravikirti in classical Sanskrit using ancient Kannada script. Explicitly references 3,735 years having passed since the Mahabharata War, and is the earliest stone record mentioning both Kalidasa and Bharavi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#172133] border border-gray-750 space-y-2">
              <h4 className="text-sm font-bold text-amber-300">Badami Cliff Inscription (543 CE)</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Carved into the sheer sandstone rock cliff near Badami Fort, recording the founding of the hill fortress of Vatapi by Pulakeshin I and the performance of the royal Ashvamedha sacrifice.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#172133] border border-gray-750 space-y-2">
              <h4 className="text-sm font-bold text-amber-300">Mahakuta Pillar Inscription (595–602 CE)</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                A red sandstone monolithic pillar found at the Mahakuta temple grove recording royal land grants and confirming the genealogical lineage of early Chalukya kings.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-500/40">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative group">
              {/* Dot */}
              <div className="absolute -left-6 sm:-left-10 top-1.5 w-6 h-6 rounded-full bg-[#0e141f] border-2 border-amber-400 flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
              </div>

              <div className="bg-[#141b29] border border-gray-800 group-hover:border-amber-500/50 p-5 rounded-2xl transition-colors space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-xs font-extrabold">
                    {event.year}
                  </span>
                  <span className="text-xs text-gray-400 font-semibold">{event.ruler}</span>
                </div>
                <h4 className="text-base font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                  {event.title}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Heritage CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        {onExploreDestinations && (
          <button
            onClick={onExploreDestinations}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center space-x-2 transition-all"
          >
            <span>Explore Heritage Monuments</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {onExploreRouteMap && (
          <button
            onClick={onExploreRouteMap}
            className="px-6 py-3 rounded-xl bg-[#141b29] hover:bg-[#1a2336] text-white border border-gray-750 hover:border-amber-400/50 font-semibold text-xs flex items-center space-x-2 transition-colors"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>View Heritage Routes on Map</span>
          </button>
        )}
      </div>
    </div>
  );
};
