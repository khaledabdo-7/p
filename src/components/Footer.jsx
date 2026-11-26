import React from 'react';
import { Tv2, ArrowUp } from 'lucide-react';

export default function Footer({ onStartSlides }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950/80 text-slate-400 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Khaled's English Presentation</span>
            <span>•</span>
            <span>Designed for Clear Speaking & A1 Fluency</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onStartSlides}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
            >
              <Tv2 className="w-3.5 h-3.5" />
              <span>Present Deck</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
