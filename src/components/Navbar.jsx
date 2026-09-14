import React, { useState, useEffect } from 'react';

export default function Navbar({ onClaimPassClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`navbar-transparent-header ${isScrolled ? 'scrolled' : ''}`} id="main-header">
      <div className="nav-container-fluid">
        {/* Left: Clean, elegant typographic logo exactly like refer_web.jpeg */}
        <a href="#hero" className="nav-brand-clean" onClick={handleLinkClick}>
          <span className="brand-wordmark">UDGAM</span>
        </a>

        {/* Center: Horizontal menu links */}
        <ul className={`nav-center-links ${isMenuOpen ? 'open' : ''}`} id="nav-links">
          <li>
            <a
              href="#hero"
              className={`nav-text-link ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`nav-text-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#events"
              className={`nav-text-link ${activeSection === 'events' ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Events
            </a>
          </li>
          <li>
            <a
              href="#schedule"
              className={`nav-text-link ${activeSection === 'schedule' ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Schedule
            </a>
          </li>
          <li>
            <a
              href="#gallery"
              className={`nav-text-link ${activeSection === 'gallery' ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#sponsors"
              className={`nav-text-link ${activeSection === 'sponsors' ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Sponsors
            </a>
          </li>
          <li>
            <a
              href="#register"
              className={`nav-text-link ${activeSection === 'register' ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              Passes
            </a>
          </li>
        </ul>

        {/* Right: Search & Hamburger Icon buttons matching refer_web.jpeg */}
        <div className="nav-right-actions">
          <button
            type="button"
            className="nav-icon-btn"
            aria-label="Search Events"
            title="Explore & Search Events"
            onClick={() => {
              const el = document.getElementById('events');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
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
