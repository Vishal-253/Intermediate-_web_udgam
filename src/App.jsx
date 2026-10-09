import React, { useState, useEffect } from 'react';
import CursorInsects from './components/CursorInsects';
import Navbar from './components/Navbar';
import EventsPage from './components/EventsPage';
import TeamPage from './components/TeamPage';
import Footer from './components/Footer';
import EventModal from './components/EventModal';
import { getStoredEvents } from './utils/festivalStore';

const getInitialPage = () => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('/team') || hash === '#team' || hash === '#/team') return 'team';
  }
  return 'events';
};

const getPageTitle = (page) =>
  page === 'team'
    ? 'Organizing Committee & Leads | Udgam 2026 — Chase the Bloom'
    : 'Competitions & Arenas | Udgam 2026 — NIT Sikkim';

export default function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [eventsList, setEventsList] = useState(getStoredEvents);

  const [selectedEvent, setSelectedEvent] = useState(null);

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

  // Central page & section navigation handler
  const handleNavigate = (page) => {
    const target = page === 'team' ? 'team' : 'events';
    setCurrentPage(target);
    try {
      window.history.pushState({ page: target }, '', `/${target}`);
    } catch (err) {
      window.location.hash = `#${target}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="udgam-app">
      {/* Bioluminescent Cursor-Following Butterfly & Bee */}
      <CursorInsects />

      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main>
        {currentPage === 'team' ? (
          <TeamPage />
        ) : (
          <EventsPage
            events={eventsList}
            onSelectEvent={(event) => setSelectedEvent(event)}
            onContactTeam={() => handleNavigate('team')}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* MODALS */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onContactTeam={() => {
          setSelectedEvent(null);
          handleNavigate('team');
        }}
      />
    </div>
  );
}
