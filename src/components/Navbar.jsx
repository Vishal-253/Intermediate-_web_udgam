import React, { useState, useEffect } from 'react';

export default function Navbar({ onClaimPassClick, currentPage = 'home', onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (currentPage === 'merch') {
      setActiveSection('merch');
      return;
    }
    if (currentPage === 'team') {
      setActiveSection('team');
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

  return (
    <header className={`navbar-transparent-header ${isScrolled || currentPage === 'merch' || currentPage === 'team' ? 'scrolled' : ''}`} id="main-header">
      <div className="nav-container-fluid">
        {/* Left: Clean, elegant typographic logo */}
        <a
          href="#hero"
          className="nav-brand-clean"
          onClick={(e) => handleLinkClick(e, 'home', 'hero')}
        >
          <span className="brand-wordmark">UDGAM</span>
        </a>

        {/* Center: Horizontal menu links */}
        <ul className={`nav-center-links ${isMenuOpen ? 'open' : ''}`} id="nav-links">
          <li>
            <a
              href="#hero"
              className={`nav-text-link ${currentPage === 'home' && activeSection === 'hero' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'home', 'hero')}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`nav-text-link ${currentPage === 'home' && activeSection === 'about' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'home', 'about')}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#events"
              className={`nav-text-link ${currentPage === 'home' && activeSection === 'events' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'home', 'events')}
            >
              Events
            </a>
          </li>
          <li>
            <a
              href="#schedule"
              className={`nav-text-link ${currentPage === 'home' && activeSection === 'schedule' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'home', 'schedule')}
            >
              Schedule
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className={`nav-text-link ${currentPage === 'home' && activeSection === 'gallery' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'home', 'gallery')}
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#sponsors"
              className={`nav-text-link ${currentPage === 'home' && activeSection === 'sponsors' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'home', 'sponsors')}
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
          {/* Merch Page Navigation Link */}
          <li className="nav-merch-item">
            <a
              href="/merch"
              className={`nav-text-link nav-merch-link ${currentPage === 'merch' ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, 'merch')}
            >
              <span className="merch-nav-petal">🌸</span>
              <span>Merch</span>
              <span className="merch-nav-badge">New</span>
            </a>
          </li>
        </ul>

        {/* Right: Search & Hamburger Icon buttons */}
        <div className="nav-right-actions">
          <button
            type="button"
            className="nav-icon-btn"
            aria-label="Search Events"
            title="Explore & Search Events"
            onClick={(e) => {
              if (currentPage !== 'home' && onNavigate) {
                onNavigate('home', 'events');
              } else {
                const el = document.getElementById('events');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

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
