import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Copy, 
  Check, 
  Tv2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PresenterModal({ 
  isOpen, 
  onClose, 
  cards 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlightVerbs, setHighlightVerbs] = useState(true);
  const [copied, setCopied] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1 < cards.length ? prev + 1 : prev));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, cards.length, onClose]);

  if (!isOpen) return null;

  const currentCard = cards[currentIndex];
  const progressPercent = ((currentIndex + 1) / cards.length) * 100;

  const handleNext = () => {
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${currentCard.title}: ${currentCard.text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 md:p-10">
      
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-800">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 via-emerald-400 to-amber-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Tv2 className="w-3.5 h-3.5" />
              SLIDE {currentIndex + 1} OF {cards.length}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              {currentCard.sectionTitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Verb Toggle */}
            <button
              onClick={() => setHighlightVerbs(!highlightVerbs)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                highlightVerbs
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verbs</span>
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white"
              title="Copy slide text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-700/60 text-slate-400 hover:text-rose-300 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Body */}
        <div className="p-8 sm:p-12 md:p-16 flex-1 flex flex-col justify-center text-center overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 mb-2 font-mono">
                {currentCard.sectionTitle} • Card {currentCard.cardNumber}
              </div>

              {/* Slide Card Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-['Outfit']">
                {currentCard.title}
              </h2>

              {/* Big Slide Text */}
              <div className="max-w-2xl mx-auto py-4">
                <p className="text-xl sm:text-2xl md:text-3xl text-slate-100 font-medium leading-relaxed">
                  {highlightVerbs ? (
                    currentCard.highlightTokens.map((token, i) => (
                      token.isVerb ? (
                        <span 
                          key={i}
                          className="font-bold text-amber-300 underline decoration-amber-400/80 underline-offset-8 bg-amber-400/10 px-1.5 py-0.5 rounded"
                        >
                          {token.text}
                        </span>
                      ) : (
                        <span key={i}>{token.text}</span>
                      )
                    ))
                  ) : (
                    currentCard.text
                  )}
                </p>
              </div>

              {/* Vocabulary pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                {currentCard.keywords.map((kw, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-3 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700 font-mono"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Quick jump slide indicators */}
          <div className="hidden sm:flex items-center gap-1.5">
            {cards.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentIndex 
                    ? 'w-6 bg-indigo-500' 
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
                title={`Card: ${c.title}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white shadow-md shadow-indigo-600/30 transition-all"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
