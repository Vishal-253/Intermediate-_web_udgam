import React, { useState, useEffect } from 'react';

export default function Navbar({ currentPage = 'home', onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveSection(currentPage);
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.pageYOffset;
      setIsScrolled(scrollPos > 30);

      const sections = document.querySelectorAll('section[id]');
      sections.forEach(sec => {
        const secTop = sec.offsetTop - 160;
        const secHeight = sec.offsetHeight;
        if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
          setActiveSection(sec.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleLinkClick = (e, targetPage, sectionId) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      e.preventDefault();
      onNavigate(targetPage, sectionId);
    }
  };

  const isSubpage = currentPage !== 'home';

  return (
    <header className={`navbar-transparent-header ${isScrolled || isSubpage ? 'scrolled' : ''}`} id="main-header">
      <div className="nav-container-fluid">
        {/* Left: Clean, elegant typographic logo */}
        <a
          href="/"
          className="nav-brand-clean"
          onClick={(e) => handleLinkClick(e, 'home', 'hero')}
        >
          <span className="brand-wordmark">UDGAM</span>
        </a>

        {/* Center: Horizontal menu links */}
        <ul className={`nav-center-links ${isMenuOpen ? 'open' : ''}`} id="nav-links">
          <li>
            <a
              href="/"
              className={`nav-text-link ${currentPage === 'home' && (activeSection === 'hero' || activeSection === 'gateways') ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'home', 'hero')}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/#about"
              className={`nav-text-link ${currentPage === 'home' && activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'home', 'about')}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/events"
              className={`nav-text-link ${currentPage === 'events' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'events')}
            >
              Events
            </a>
          </li>
          <li>
            <a
              href="/schedule"
              className={`nav-text-link ${currentPage === 'schedule' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'schedule')}
            >
              Schedule
            </a>
          </li>
          <li>
            <a
              href="/gallery"
              className={`nav-text-link ${currentPage === 'gallery' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'gallery')}
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="/sponsors"
              className={`nav-text-link ${currentPage === 'sponsors' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'sponsors')}
            >
              Sponsors
            </a>
          </li>
          <li>
            <a
              href="/team"
              className={`nav-text-link ${currentPage === 'team' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'team')}
            >
              Team
            </a>
          </li>

          {/* Mobile-Only Admin Portal Link inside hamburger drawer */}
          <li className="nav-admin-mobile-item">
            <a
              href="/admin"
              className={`nav-text-link nav-admin-mobile-link ${currentPage === 'admin' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'admin')}
            >
              <span>🛡️ Admin Portal</span>
            </a>
          </li>
        </ul>

        {/* Right: Search & Desktop Admin & Mobile Hamburger */}
        <div className="nav-right-actions">
          <button
            type="button"
            className="nav-icon-btn"
            aria-label="Search Events"
            title="Explore & Search Events"
            onClick={(e) => {
              if (onNavigate) {
                onNavigate('events');
              }
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Desktop Admin Portal Button */}
          <button
            type="button"
            className={`nav-admin-btn ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e, 'admin')}
            title="Open Admin Control Panel"
            aria-label="Admin Portal"
          >
            <span className="nav-admin-icon-shield">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </span>
            <span className="nav-admin-btn-text">Admin</span>
          </button>

          {/* Hamburger Menu: Displayed only on mobile/tablet viewports */}
          <button
            type="button"
            className="nav-hamburger-minimal"
            id="nav-hamburger"
            aria-label="Toggle Menu"
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
