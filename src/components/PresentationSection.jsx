import React from 'react';
import { Sparkles, Tv2 } from 'lucide-react';
import AnalogRoutineClock from './AnalogRoutineClock';
import HouseSplitCards from './HouseSplitCards';
import EventSection from './EventSection';

export default function PresentationSection({ 
  section, 
  highlightVerbs,
  onOpenSlides
}) {
  const themeColors = {
    indigo: {
      badge: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
      bgGlow: 'bg-indigo-600/10'
    },
    emerald: {
      badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      bgGlow: 'bg-emerald-600/10'
    },
    amber: {
      badge: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      bgGlow: 'bg-amber-600/10'
    }
  };

  const colors = themeColors[section.themeColor] || themeColors.indigo;

  return (
    <section id={section.id} className="py-16 md:py-24 border-t border-slate-800/80 relative">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${colors.bgGlow} blur-[120px] rounded-full pointer-events-none`} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-800/60">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${colors.badge} mb-3`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{section.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
              {section.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
              {section.description}
            </p>
          </div>

          {/* Section Slides Trigger Button */}
          <button
            onClick={() => onOpenSlides(section)}
            className={`self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${colors.badge} hover:scale-[1.02] active:scale-[0.98] shadow-md`}
          >
            <Tv2 className="w-4 h-4" />
            <span>{section.navLabel} Slides ({section.cards.length})</span>
          </button>
        </div>

        {/* Section 1: Interactive Split Square */}
        {section.id === 'house' && (
          <HouseSplitCards highlightVerbs={highlightVerbs} />
        )}

        {/* Section 2: Interactive 24H Analog Routine Clock */}
        {section.id === 'freetime' && (
          <AnalogRoutineClock highlightVerbs={highlightVerbs} />
        )}

        {/* Section 3: Polaroid Photo Stack + Floating Outfit */}
        {section.id === 'event' && (
          <EventSection highlightVerbs={highlightVerbs} />
        )}
      </div>
    </section>
  );
}
