import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PresentationSection from './components/PresentationSection';
import PresenterModal from './components/PresenterModal';
import Footer from './components/Footer';
import { presentationData } from './data/presentationData';

export default function App() {
  const [activeSection, setActiveSection] = useState('house');
  const [highlightVerbs, setHighlightVerbs] = useState(true);
  const [activeSlideSection, setActiveSlideSection] = useState(null);

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

  const handleOpenCurrentSlides = () => {
    const current = presentationData.sections.find((s) => s.id === activeSection) || presentationData.sections[0];
    setActiveSlideSection(current);
  };

  return (
    <div className="min-h-screen bg-[#090d1a] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar 
        activeSection={activeSection}
        highlightVerbs={highlightVerbs}
        setHighlightVerbs={setHighlightVerbs}
        onOpenCurrentSlides={handleOpenCurrentSlides}
      />

      {/* Main Content */}
      <main>
        {/* Hero Section with Section-Specific Slide Starters */}
        <HeroSection 
          data={presentationData.hero}
          sections={presentationData.sections}
          onOpenSlides={(sec) => setActiveSlideSection(sec)}
        />

        {/* 3 Main Presentation Sections with their Own Slide Starters */}
        {presentationData.sections.map((section) => (
          <PresentationSection
            key={section.id}
            section={section}
            highlightVerbs={highlightVerbs}
            onOpenSlides={(sec) => setActiveSlideSection(sec)}
          />
        ))}
      </main>

      {/* Section-Specific Slide Deck Presenter Modal */}
      <PresenterModal
        activeSection={activeSlideSection}
        allSections={presentationData.sections}
        onSelectSection={(sec) => setActiveSlideSection(sec)}
        onClose={() => setActiveSlideSection(null)}
      />

      {/* Clean Footer */}
      <Footer 
        onStartSlides={() => setActiveSlideSection(presentationData.sections[0])} 
      />
    </div>
  );
}
