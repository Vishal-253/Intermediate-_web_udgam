import React, { useState, useEffect } from 'react';

export default function Navbar({ currentPage = 'home', onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  // Subpage auto-hide & top edge hover reveal states
  const [subpageHidden, setSubpageHidden] = useState(false);
  const [isTopHovered, setIsTopHovered] = useState(false);

  const isSubpage = currentPage !== 'home';

  // Home page scroll observer (Preserved exactly as it was)
  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveSection(currentPage);
      return;
    }

    const handleHomeScroll = () => {
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

    window.addEventListener('scroll', handleHomeScroll);
    return () => window.removeEventListener('scroll', handleHomeScroll);
  }, [currentPage]);

  // Subpage auto-hide on scroll & reveal on top-edge cursor hover
  useEffect(() => {
    if (!isSubpage) {
      setSubpageHidden(false);
      setIsTopHovered(false);
      return;
    }

    const handleSubpageScroll = () => {
      const scrollY = window.pageYOffset;
      if (scrollY > 50) {
        setSubpageHidden(true);
      } else {
        setSubpageHidden(false);
      }
    };

    const handleMouseMove = (e) => {
      // Reveal navbar when cursor is within top 65px of viewport
      if (e.clientY <= 65) {
        setIsTopHovered(true);
      } else if (e.clientY > 95) {
        setIsTopHovered(false);
      }
    };

    window.addEventListener('scroll', handleSubpageScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleSubpageScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isSubpage]);

  const handleLinkClick = (e, targetPage, sectionId) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      e.preventDefault();
      onNavigate(targetPage, sectionId);
    }
  };

  // Determine navbar visibility class
  const isNavHiddenOnSubpage = isSubpage && subpageHidden && !isTopHovered && !isMenuOpen;

  return (
    <>
      {/* Invisible top hover trigger strip on subpages */}
      {isSubpage && (
        <div
          className="nav-top-hover-strip"
          onMouseEnter={() => setIsTopHovered(true)}
          aria-hidden="true"
        />
      )}

      <header
        className={`navbar-transparent-header ${isScrolled || isSubpage ? 'scrolled' : ''} ${isSubpage ? 'subpage-autohide' : ''} ${isNavHiddenOnSubpage ? 'nav-hidden' : 'nav-visible'}`}
        id="main-header"
        onMouseEnter={() => {
          if (isSubpage) setIsTopHovered(true);
        }}
        onMouseLeave={(e) => {
          if (isSubpage && e.clientY > 70) setIsTopHovered(false);
        }}
      >
        <div className="nav-container-fluid">
          {/* Left: Typographic logo */}
          <a
            href="/"
            className="nav-brand-clean"
            onClick={(e) => handleLinkClick(e, 'home', 'hero')}
          >
            <span className="brand-wordmark">UDGAM</span>
          </a>

          {/* Center: Menu links */}
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

            {/* Mobile-Only Admin Portal Link */}
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

          {/* Right: Search & Desktop Admin & Hamburger */}
          <div className="nav-right-actions">
            <button
              type="button"
              className="nav-icon-btn"
              aria-label="Search Events"
              title="Explore & Search Events"
              onClick={() => {
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

            {/* Hamburger Menu */}
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
    </>
  );
}
