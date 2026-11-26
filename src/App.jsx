import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PresentationSection from './components/PresentationSection';
import PresenterModal from './components/PresenterModal';
import Footer from './components/Footer';
import { presentationData, allCards } from './data/presentationData';

export default function App() {
  const [activeSection, setActiveSection] = useState('house');
  const [highlightVerbs, setHighlightVerbs] = useState(true);
  const [isSlideMode, setIsSlideMode] = useState(false);

  // Active section tracking using IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'house', 'freetime', 'event'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#090d1a] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar 
        activeSection={activeSection}
        highlightVerbs={highlightVerbs}
        setHighlightVerbs={setHighlightVerbs}
        setIsSlideMode={setIsSlideMode}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection 
          data={presentationData.hero}
          onStartSlides={() => setIsSlideMode(true)}
        />

        {/* 3 Main Sections */}
        {presentationData.sections.map((section) => (
          <PresentationSection
            key={section.id}
            section={section}
            highlightVerbs={highlightVerbs}
          />
        ))}
      </main>

      {/* Slide Deck Presenter Modal */}
      <PresenterModal
        isOpen={isSlideMode}
        onClose={() => setIsSlideMode(false)}
        cards={allCards}
      />

      {/* Clean Footer */}
      <Footer 
        onStartSlides={() => setIsSlideMode(true)} 
      />
    </div>
  );
}
