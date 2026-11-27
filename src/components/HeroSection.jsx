import React from 'react';
import { motion } from 'framer-motion';
import { Tv2, Sparkles } from 'lucide-react';

export default function HeroSection({ 
  data, 
  sections,
  onOpenSlides 
}) {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Presenter Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-700/50 text-indigo-300 text-xs sm:text-sm font-semibold mb-6 shadow-inner backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{data.level}</span>
          <span className="w-1 h-1 rounded-full bg-slate-500" />
          <span className="text-slate-300">Speaker: {data.presenter}</span>
        </motion.div>

        {/* Exact Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight font-['Outfit']"
        >
          {data.title}
        </motion.h1>

        {/* Exact Hero Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-medium mb-10 leading-relaxed"
        >
          "{data.subtitle}"
        </motion.p>

        {/* Interactive Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
        >
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onOpenSlides(sec)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-indigo-500/50 text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Tv2 className="w-4 h-4 text-indigo-400" />
              <span>{sec.navLabel} ({sec.cards.length})</span>
            </button>
          ))}
        </motion.div>

        {/* 3 Quick Navigation Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto text-left"
        >
          <a
            href="#house"
            className="group p-4 rounded-2xl bg-slate-900/60 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/50 transition-all"
          >
            <div className="text-xs font-mono text-indigo-400 font-semibold mb-1">SECTION 1</div>
            <div className="font-bold text-white text-base group-hover:text-indigo-300 transition-colors">My House</div>
            <div className="text-xs text-slate-400 mt-1">4 Cards • Home & Chores</div>
          </a>

          <a
            href="#freetime"
            className="group p-4 rounded-2xl bg-slate-900/60 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/50 transition-all"
          >
            <div className="text-xs font-mono text-emerald-400 font-semibold mb-1">SECTION 2</div>
            <div className="font-bold text-white text-base group-hover:text-emerald-300 transition-colors">Free Time</div>
            <div className="text-xs text-slate-400 mt-1">3 Cards • Daily & Friends</div>
          </a>

          <a
            href="#event"
            className="group p-4 rounded-2xl bg-slate-900/60 hover:bg-amber-950/40 border border-slate-800 hover:border-amber-500/50 transition-all"
          >
            <div className="text-xs font-mono text-amber-400 font-semibold mb-1">SECTION 3</div>
            <div className="font-bold text-white text-base group-hover:text-amber-300 transition-colors">My Event</div>
            <div className="text-xs text-slate-400 mt-1">3 Cards • Weekly Gathering</div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
