import React, { useState, useEffect } from 'react';
import CursorInsects from './components/CursorInsects';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HomeGateways from './components/HomeGateways';
import Team from './components/Team';
import EventsPage from './components/EventsPage';
import SchedulePage from './components/SchedulePage';
import GalleryPage from './components/GalleryPage';
import SponsorsPage from './components/SponsorsPage';
import TeamPage from './components/TeamPage';
import Footer from './components/Footer';
import EventModal from './components/EventModal';
import LightboxModal from './components/LightboxModal';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { getStoredMerch, getStoredEvents, checkAdminAuth } from './utils/festivalStore';

const getInitialPage = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (path.includes('/admin') || hash === '#admin' || hash === '#/admin') return 'admin';
    if (path.includes('/team') || hash === '#team' || hash === '#/team') return 'team';
    if (path.includes('/events') || hash === '#events' || hash === '#/events') return 'events';
    if (path.includes('/schedule') || hash === '#schedule' || hash === '#/schedule') return 'schedule';
    if (path.includes('/gallery') || hash === '#gallery' || hash === '#/gallery') return 'gallery';
    if (path.includes('/sponsors') || hash === '#sponsors' || hash === '#/sponsors') return 'sponsors';
  }
  return 'home';
};

const getPageTitle = (page) => {
  switch (page) {
    case 'admin':
      return 'Control Portal | Udgam 2026 Admin — NIT Sikkim';
    case 'team':
      return 'Organizing Committee & Leads | Udgam 2026 — Chase the Bloom';
    case 'events':
      return 'Competitions & Arenas | Udgam 2026 — NIT Sikkim';
    case 'schedule':
      return 'Festival Itinerary & Schedule | Udgam 2026 — NIT Sikkim';
    case 'gallery':
      return 'Visual Chronicles & Memory Wall | Udgam 2026 — NIT Sikkim';
    case 'sponsors':
      return 'Patrons & Sponsors | Udgam 2026 — NIT Sikkim';
    default:
      return 'Udgam 2026 — Chase the Bloom | Annual Fest of NIT Sikkim';
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [merchList, setMerchList] = useState(getStoredMerch);
  const [eventsList, setEventsList] = useState(getStoredEvents);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(checkAdminAuth);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Sync route with browser history (back/forward) & hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
      document.title = getPageTitle(page);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Sync state if festival data updates from other sources
  useEffect(() => {
    const handleDataUpdate = (e) => {
      if (e.detail?.type === 'events') {
        setEventsList(getStoredEvents());
      }
    };
    window.addEventListener('udgam:data_update', handleDataUpdate);
    return () => window.removeEventListener('udgam:data_update', handleDataUpdate);
  }, []);

  // Update document title on page change
  useEffect(() => {
    document.title = getPageTitle(currentPage);
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
    const targetUrl = page === 'home' ? (sectionId ? `/#${sectionId}` : '/') : `/${page}`;
    const wasDifferentPage = currentPage !== page;

    setCurrentPage(page);

    try {
      window.history.pushState({ page }, '', targetUrl);
    } catch (err) {
      if (page === 'home') {
        window.location.hash = sectionId ? `#${sectionId}` : '';
      } else {
        window.location.hash = `#${page}`;
      }
    }

    if (page === 'home' && sectionId) {
      const delay = wasDifferentPage ? 120 : 0;
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
  };

  return (
    <div className="udgam-app">
      {/* Bioluminescent Cursor-Following Butterfly & Bee */}
      <CursorInsects />

      {/* Header & Navbar - Hidden on Admin Page for clean dashboard workspace */}
      {currentPage !== 'admin' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}

      <main>
        {currentPage === 'admin' ? (
          /* Admin Control Portal */
          isAdminLoggedIn ? (
            <AdminDashboard
              merchList={merchList}
              onUpdateMerchList={setMerchList}
              eventsList={eventsList}
              onUpdateEventsList={setEventsList}
              onNavigateHome={() => handleNavigate('home')}
              onLogout={() => setIsAdminLoggedIn(false)}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={() => setIsAdminLoggedIn(true)}
              onNavigateHome={() => handleNavigate('home')}
            />
          )
        ) : currentPage === 'team' ? (
          /* Dedicated Team & Committees Page */
          <TeamPage onNavigateHome={() => handleNavigate('home')} />
        ) : currentPage === 'events' ? (
          /* Dedicated Events & Competitions Page */
          <EventsPage
            events={eventsList}
            onSelectEvent={(event) => setSelectedEvent(event)}
            onNavigateHome={() => handleNavigate('home')}
            onContactTeam={() => handleNavigate('team')}
          />
        ) : currentPage === 'schedule' ? (
          /* Dedicated Festival Itinerary & Schedule Page */
          <SchedulePage
            onNavigateHome={() => handleNavigate('home')}
            onExploreEvents={() => handleNavigate('events')}
          />
        ) : currentPage === 'gallery' ? (
          /* Dedicated Memory Wall & Gallery Page */
          <GalleryPage
            onSelectImage={(img) => setSelectedImage(img)}
            onNavigateHome={() => handleNavigate('home')}
          />
        ) : currentPage === 'sponsors' ? (
          /* Dedicated Sponsors & Partners Page */
          <SponsorsPage
            onNavigateHome={() => handleNavigate('home')}
            onContactTeam={() => handleNavigate('team')}
          />
        ) : (
          /* Simplified, Concise Main Festival Landing Page */
          <>
            {/* 1. Hero Section */}
            <Hero
              onTeamClick={() => handleNavigate('team')}
              onExploreEvents={() => handleNavigate('events')}
            />

            {/* 2. About Section */}
            <About />

            {/* 3. Festival Gateways Hub (Direct gateways to Events, Schedule, Gallery, Sponsors) */}
            <HomeGateways onNavigate={handleNavigate} />

            {/* 4. Organizing Committee Teaser Section */}
            <Team onExploreTeam={() => handleNavigate('team')} />
          </>
        )}
      </main>

      {/* Footer Section - Hidden on Admin Page */}
      {currentPage !== 'admin' && (
        <Footer onNavigate={handleNavigate} />
      )}

      {/* MODALS */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onContactTeam={() => {
          setSelectedEvent(null);
          handleNavigate('team');
        }}
      />

      <LightboxModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
