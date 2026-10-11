import React, { useState, useEffect } from 'react';
import CursorInsects from './components/CursorInsects';
import Navbar from './components/Navbar';
import EventsPage from './components/EventsPage';
import TeamPage from './components/TeamPage';
import Footer from './components/Footer';

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
    : 'Events | Udgam 2026 — Pick your stage';

export default function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);

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
          <EventsPage onContactTeam={() => handleNavigate('team')} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
