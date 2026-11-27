import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  Shirt, 
  Sparkles, 
  Tv2, 
  Menu, 
  X,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar({ 
  activeSection, 
  highlightVerbs, 
  setHighlightVerbs, 
  isProjectorMode,
  setIsProjectorMode,
  onOpenCurrentSlides
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(current > 20);
      if (total > 0) {
        setScrollProgress((current / total) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'house', label: 'My House', icon: Home },
    { id: 'freetime', label: 'Free Time', icon: Calendar },
    { id: 'event', label: 'My Event', icon: Shirt },
  ];

  const scrollTo = (id) => {
    setMobileOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      const offset = 80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-lg shadow-black/40 py-2.5' : 'bg-transparent py-4'}`}>
      {/* Scroll indicator bar */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-emerald-400 to-amber-400 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo / Presenter Brand */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <span className="font-bold text-lg font-mono">K</span>
          </div>
          <div>
            <div className="font-bold text-white text-base tracking-tight group-hover:text-indigo-300 transition-colors">
              Khaled's Presentation
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              A1 Present Simple
            </div>
          </div>
        </button>

        {/* Desktop Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-2xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Projector Light / Dark Mode Toggle */}
          <button
            onClick={() => setIsProjectorMode(!isProjectorMode)}
            title="Switch between Dark Mode and High-Contrast Projector Mode"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isProjectorMode
                ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-sm'
                : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {isProjectorMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isProjectorMode ? 'Dark' : 'Projector'}</span>
          </button>

          {/* Verb Highlight Toggle */}
          <button
            onClick={() => setHighlightVerbs(!highlightVerbs)}
            title="Toggle Present Simple verb highlighting"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              highlightVerbs 
                ? 'bg-amber-500/15 border-amber-400/40 text-amber-300 shadow-sm shadow-amber-500/20' 
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verbs</span>
          </button>

          {/* Slide Deck Presenter Mode */}
          <button
            onClick={onOpenCurrentSlides}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Tv2 className="w-3.5 h-3.5" />
            <span>Present Section Slides</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenCurrentSlides}
            className="p-2 rounded-xl bg-indigo-600 text-white text-xs font-medium"
            title="Present Current Section Slides"
          >
            <Tv2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="sm:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-5 py-4 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              onClick={() => setHighlightVerbs(!highlightVerbs)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border ${
                highlightVerbs ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'border-slate-700 text-slate-400'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{highlightVerbs ? 'Verbs Highlighted' : 'Highlight Verbs'}</span>
            </button>

            <button
              onClick={() => setIsProjectorMode(!isProjectorMode)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border ${
                isProjectorMode
                  ? 'bg-amber-500 border-amber-400 text-slate-950'
                  : 'border-slate-700 text-slate-300'
              }`}
            >
              {isProjectorMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>{isProjectorMode ? 'Dark' : 'Projector'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
