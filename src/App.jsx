import React, { useState, useEffect } from 'react';
import PetalCanvas from './components/PetalCanvas';
import CursorInsects from './components/CursorInsects';
import SoundControl from './components/SoundControl';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Gallery from './components/Gallery';
import Sponsors from './components/Sponsors';
import Team from './components/Team';
import Footer from './components/Footer';
import MerchPage from './components/MerchPage';
import TeamPage from './components/TeamPage';
import EventModal from './components/EventModal';
import LightboxModal from './components/LightboxModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/merch') || hash === '#merch' || hash === '#/merch') {
        return 'merch';
      }
      if (path.includes('/team') || hash === '#team' || hash === '#/team') {
        return 'team';
      }
    }
    return 'home';
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Sync route with URL popstate / hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/merch') || hash === '#merch' || hash === '#/merch') {
        setCurrentPage('merch');
        document.title = 'Official Merchandise | Udgam 2026 — Chase the Bloom';
      } else if (path.includes('/team') || hash === '#team' || hash === '#/team') {
        setCurrentPage('team');
        document.title = 'Organizing Committee & Leads | Udgam 2026 — Chase the Bloom';
      } else {
        setCurrentPage('home');
        document.title = 'Udgam 2026 — Chase the Bloom | Annual Fest of NIT Sikkim';
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Update document title on page change
  useEffect(() => {
    if (currentPage === 'merch') {
      document.title = 'Official Merchandise | Udgam 2026 — Chase the Bloom';
    } else if (currentPage === 'team') {
      document.title = 'Organizing Committee & Leads | Udgam 2026 — Chase the Bloom';
    } else {
      document.title = 'Udgam 2026 — Chase the Bloom | Annual Fest of NIT Sikkim';
    }
  }, [currentPage]);

  // Scroll Reveal Observer for bloom animation on home sections
  useEffect(() => {
    if (currentPage !== 'home') return;

    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12
      }
    );

    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [currentPage]);

  // Central page & section navigation handler
  const handleNavigate = (page, sectionId) => {
    if (page === 'merch') {
      setCurrentPage('merch');
      try {
        window.history.pushState({ page: 'merch' }, '', '/merch');
      } catch (err) {
        window.location.hash = '#merch';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'team') {
      setCurrentPage('team');
      try {
        window.history.pushState({ page: 'team' }, '', '/team');
      } catch (err) {
        window.location.hash = '#team';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const wasSubpage = currentPage === 'merch' || currentPage === 'team';
      setCurrentPage('home');
      try {
        window.history.pushState({ page: 'home' }, '', '/');
      } catch (err) {
        window.location.hash = sectionId ? `#${sectionId}` : '';
      }

      if (sectionId) {
        // If switching from subpage, delay slightly to allow DOM mount
        const delay = wasSubpage ? 120 : 0;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, delay);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleScrollToTeam = () => {
    handleNavigate('team');
  };

  return (
    <div className="udgam-app">
      {/* Fullpage Falling Petals Canvas */}
      <PetalCanvas />

      {/* Bioluminescent Cursor-Following Butterfly & Bee */}
      <CursorInsects />

      {/* Ambient Chimes Audio Toggle */}
      <SoundControl />

      {/* Header & Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main>
        {currentPage === 'merch' ? (
          /* Dedicated Merchandise Page */
          <MerchPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'team' ? (
          /* Dedicated Team & Committees Page */
          <TeamPage onNavigateHome={() => handleNavigate('home')} />
        ) : (
          /* Main Festival Landing Page */
          <>
            {/* 1. Hero Section */}
            <Hero onTeamClick={handleScrollToTeam} />

            {/* 2. About Section */}
            <About />

            {/* 3. Events Section */}
            <Events onSelectEvent={(event) => setSelectedEvent(event)} />

            {/* 4. Schedule Section */}
            <Schedule />

            {/* 5. Gallery Section */}
            <Gallery onSelectImage={(img) => setSelectedImage(img)} />

            {/* 6. Sponsors Section */}
            <Sponsors />

            {/* 7. Organizing Committee Teaser Section */}
            <Team onExploreTeam={() => handleNavigate('team')} />
          </>
        )}
      </main>

      {/* 8. Footer Section */}
      <Footer onNavigate={handleNavigate} />

      {/* MODALS */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onContactTeam={() => {
          setSelectedEvent(null);
          handleScrollToTeam();
        }}
      />

      <LightboxModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
