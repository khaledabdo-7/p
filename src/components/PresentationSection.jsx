import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Sparkles,
  Tv2,
  Home,
  LayoutGrid,
  Armchair,
  Sun,
  Gamepad2,
  Users,
  HeartHandshake,
  Clock,
  Shirt
} from 'lucide-react';
import AnalogRoutineClock from './AnalogRoutineClock';
import HouseSplitCards from './HouseSplitCards';

const iconMap = {
  Home,
  LayoutGrid,
  Armchair,
  Sparkles,
  Sun,
  Gamepad2,
  Users,
  HeartHandshake,
  Clock,
  Shirt
};

export default function PresentationSection({ 
  section, 
  highlightVerbs,
  onOpenSlides
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [hiddenCards, setHiddenCards] = useState({});

  const handleCopy = (card) => {
    navigator.clipboard.writeText(`${card.title}: ${card.text}`);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleHide = (cardId) => {
    setHiddenCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const themeColors = {
    indigo: {
      badge: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
      border: 'hover:border-indigo-500/40',
      activeBorder: 'border-indigo-500/60 shadow-indigo-500/20',
      accent: 'text-indigo-400',
      bgGlow: 'bg-indigo-600/10',
      iconBg: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/50'
    },
    emerald: {
      badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      border: 'hover:border-emerald-500/40',
      activeBorder: 'border-emerald-500/60 shadow-emerald-500/20',
      accent: 'text-emerald-400',
      bgGlow: 'bg-emerald-600/10',
      iconBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50'
    },
    amber: {
      badge: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      border: 'hover:border-amber-500/40',
      activeBorder: 'border-amber-500/60 shadow-amber-500/20',
      accent: 'text-amber-400',
      bgGlow: 'bg-amber-600/10',
      iconBg: 'bg-amber-950/80 text-amber-300 border-amber-700/50'
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
            <span>Present {section.navLabel} Slides ({section.cards.length})</span>
          </button>
        </div>

        {/* Section 1: Interactive Split Cards */}
        {section.id === 'house' && (
          <HouseSplitCards highlightVerbs={highlightVerbs} />
        )}

        {/* Interactive Analog Routine Clock in Section 2 */}
        {section.id === 'freetime' && (
          <AnalogRoutineClock highlightVerbs={highlightVerbs} />
        )}

        {/* Cards Grid (only for Section 3: Event) */}
        {section.id !== 'house' && section.id !== 'freetime' && (
        <div className={`grid grid-cols-1 ${section.cards.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'} gap-5`}>
          {section.cards.map((card, idx) => {
            const Icon = iconMap[card.icon] || Home;
            const isHidden = hiddenCards[card.id];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative flex flex-col justify-between p-6 rounded-2xl bg-slate-900/70 backdrop-blur-md border border-slate-800 transition-all duration-300 ${colors.border}`}
              >
                {/* Card Top: Number & Icon & Action tools */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm ${colors.iconBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-semibold text-slate-400">
                        Card {card.cardNumber}
                      </span>
                    </div>

                    {/* Quick utility controls */}
                    <div className="flex items-center gap-1">
                      {/* Practice Reveal Toggle */}
                      <button
                        onClick={() => toggleHide(card.id)}
                        title={isHidden ? "Reveal text" : "Hide for speaking practice"}
                        className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        {isHidden ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                      </button>

                      {/* Copy Text */}
                      <button
                        onClick={() => handleCopy(card)}
                        title="Copy text"
                        className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/60 text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        {copiedId === card.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight font-['Outfit']">
                    {card.title}
                  </h3>

                  {/* Card Body Text with Optional Verb Highlights */}
                  {isHidden ? (
                    <div 
                      onClick={() => toggleHide(card.id)}
                      className="cursor-pointer p-4 rounded-xl bg-slate-950/60 border border-dashed border-slate-700 text-center text-slate-400 hover:text-amber-300 hover:border-amber-500/50 transition-colors"
                    >
                      <span className="text-xs font-medium">Text hidden for speaking practice. Click to reveal.</span>
                    </div>
                  ) : (
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      {highlightVerbs ? (
                        card.highlightTokens.map((token, i) => (
                          token.isVerb ? (
                            <span 
                              key={i}
                              title={token.note || "Present Simple verb"}
                              className="font-bold text-amber-300 underline decoration-amber-400/60 underline-offset-4 bg-amber-400/10 px-1 py-0.5 rounded cursor-help transition-colors hover:bg-amber-400/20"
                            >
                              {token.text}
                            </span>
                          ) : (
                            <span key={i}>{token.text}</span>
                          )
                        ))
                      ) : (
                        card.text
                      )}
                    </p>
                  )}
                </div>

                {/* Card Bottom: Key Vocabulary Tags */}
                <div className="pt-4 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                  {card.keywords.map((kw, i) => (
                    <span 
                      key={i} 
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/40"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </div>
        )}

      </div>
    </section>
  );
}
