import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, X, Sparkles } from 'lucide-react';
import { STORIES, TravelStory } from '../data/stories';
import { handleImageError } from '../utils/imageUtils';

export const StoriesSection: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<TravelStory | null>(null);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Editorial Journal</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
          Stories from Bagalkot
        </h2>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          Deep-dive historical essays, architecture dissections, and evocative travel stories exploring the heart of North Karnataka.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {STORIES.map((story) => (
          <article
            key={story.id}
            onClick={() => setSelectedStory(story)}
            className="group bg-[#121927] border border-gray-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
          >
            <div>
              {/* Cover Image */}
              <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden bg-gray-900">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  loading="lazy"
                  onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase backdrop-blur-md bg-black/70 text-amber-300 border border-amber-500/30">
                    {story.category}
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-5 sm:p-6 space-y-2.5 sm:space-y-3">
                <div className="flex items-center space-x-3 text-[11px] sm:text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {story.readTime}
                  </span>
                  <span>•</span>
                  <span>{story.date}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-serif text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {story.title}
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
                  {story.summary}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-gray-800/80 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>Read Full Article</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>

      {/* Story Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl my-2 sm:my-auto bg-[#101725] border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10 space-y-6 max-h-[94vh] sm:max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-gray-300 hover:text-white border border-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3 pr-8">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {selectedStory.category} • {selectedStory.readTime}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                {selectedStory.title}
              </h2>
              <p className="text-sm text-amber-400 font-medium">{selectedStory.kannadaTitle}</p>
              <p className="text-xs text-gray-400">
                By {selectedStory.author} • {selectedStory.date}
              </p>
            </div>

            <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
              <img
                src={selectedStory.coverImage}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, '/images/monuments/virupaksha.jpg')}
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
              {selectedStory.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="bg-[#172236] p-4 rounded-2xl border border-gray-750 text-xs text-amber-200">
              💡 <strong>Key Takeaway:</strong> {selectedStory.keyTakeaway}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
