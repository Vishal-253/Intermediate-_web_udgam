import React, { useState } from 'react';
import { playChimeNote, chimeFrequencies } from '../utils/audio';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      playChimeNote(chimeFrequencies[4]);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const handleNavClick = (e, page, sectionId) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page, sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    playChimeNote(chimeFrequencies[5]);
  };

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-top-row">
          {/* Brand & Motto */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <span className="footer-flower">🌸</span>
              <span className="footer-title">UDGAM 2026</span>
            </div>
            <p className="footer-motto-tag">Chase the Bloom</p>
            <p className="footer-bio">
              The annual socio-cultural and technical festival of the National Institute of Technology Sikkim. 
              Held every Himalayan spring amidst blossoms, peaks, and music.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon-btn" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="YouTube" title="YouTube">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="LinkedIn" title="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="#" className="social-icon-btn" aria-label="X Twitter" title="X Twitter">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l16 16M4 20L20 4" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-link-list">
              <li><a href="#hero" onClick={(e) => handleNavClick(e, 'home', 'hero')}>Home</a></li>
              <li><a href="#about" onClick={(e) => handleNavClick(e, 'home', 'about')}>About Fest</a></li>
              <li><a href="#events" onClick={(e) => handleNavClick(e, 'home', 'events')}>Competitions</a></li>
              <li><a href="#schedule" onClick={(e) => handleNavClick(e, 'home', 'schedule')}>Day Itinerary</a></li>
              <li><a href="#gallery" onClick={(e) => handleNavClick(e, 'home', 'gallery')}>Memory Wall</a></li>
              <li><a href="#sponsors" onClick={(e) => handleNavClick(e, 'home', 'sponsors')}>Our Sponsors</a></li>
              <li><a href="/team" onClick={(e) => handleNavClick(e, 'team')}>Organizing Team</a></li>
              <li>
                <a href="/merch" className="footer-merch-link" onClick={(e) => handleNavClick(e, 'merch')}>
                  Official Merch 🌸
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Venue */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Get in Touch</h4>
            <div className="footer-contact-item">
              <span className="contact-icon">📍</span>
              <span>
                National Institute of Technology Sikkim,<br />
                Ravangla Campus, South Sikkim – 737139
              </span>
            </div>
            <div className="footer-contact-item">
              <span className="contact-icon">✉️</span>
              <span>udgam@nitsikkim.ac.in</span>
            </div>
            <div className="footer-contact-item">
              <span className="contact-icon">📞</span>
              <span>+91 98765 43210 (Student Convenor)</span>
            </div>
            <div className="footer-contact-item">
              <span className="contact-icon">🌐</span>
              <span>www.nitsikkim.ac.in</span>
            </div>
          </div>

          {/* Newsletter */}
          <div className="footer-sub-col">
            <h4 className="footer-col-title">Blossom Gazette</h4>
            <p className="newsletter-desc">
              Subscribe to receive early artist announcements and schedule updates directly in your inbox.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your college email..."
                required
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="newsletter-btn">
                {subscribed ? 'Joined! 🌸' : 'Join'}
              </button>
            </form>
          </div>
        </div>

        {/* Small Tree & Petal Footer Illustration */}
        <div className="footer-divider-art">
          <svg viewBox="0 0 600 40" width="100%" height="32" fill="none" preserveAspectRatio="none">
            <path d="M0 20 Q150 5 300 20 T600 20" stroke="#FF6B8B" strokeWidth="1.5" strokeOpacity="0.5" />
            <circle cx="300" cy="20" r="5" fill="#FF6B8B" opacity="0.8" />
            <circle cx="285" cy="18" r="3" fill="#FFD9E8" opacity="0.7" />
            <circle cx="315" cy="18" r="3" fill="#FFD9E8" opacity="0.7" />
          </svg>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="footer-bottom-row">
          <p className="copyright-text">
            © 2026 <strong>Udgam</strong>, NIT Sikkim. Crafted with passion &amp; petals. All rights reserved.
          </p>
          <p className="tagline-soft">
            <em>Chase the Bloom • 春に花咲く</em>
          </p>
          <button
            type="button"
            id="back-to-top"
            className="back-to-top-btn"
            aria-label="Back to Top"
            onClick={scrollToTop}
          >
            <span className="top-flower">🌸</span>
            <span className="top-text">Bloom to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
