import React from 'react';

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* Botanical Branch Divider & Section Header */}
        <div className="section-floral-header reveal-on-scroll">
          <div className="branch-divider">
            <svg viewBox="0 0 280 30" width="240" height="26" fill="none">
              <path d="M10 15 Q70 5 140 15 T270 15" stroke="#A8D19F" strokeWidth="2" strokeLinecap="round" />
              <circle cx="140" cy="15" r="5" fill="#FF6B8B" stroke="#FFF0F5" strokeWidth="1" />
              <path d="M140 10 C140 5 145 5 145 10 Z" fill="#A8D19F" />
              <circle cx="80" cy="11" r="3.5" fill="#FFD9E8" stroke="#FF6B8B" strokeWidth="0.8" />
              <circle cx="200" cy="17" r="3.5" fill="#FFD9E8" stroke="#FF6B8B" strokeWidth="0.8" />
            </svg>
          </div>
          <span className="section-tag">Genesis & Spirit</span>
          <h2 className="section-title">The Dawn of Expression</h2>
          <p className="section-subtitle">
            “Like the cherry blossoms that brave the frosty mountain air to burst into resplendent life, Udgam awakens the soul.”
          </p>
        </div>

        <div className="about-grid">
          {/* Story Card */}
          <div className="about-story-card card-bloom reveal-on-scroll">
            <div className="story-petal-accent">🌸</div>
            <h3 className="story-heading">Where Curiosity Meets Himalayan Bloom</h3>
            <p className="story-text">
              Born amidst the misty peaks and pine forests of Ravangla, Sikkim, <strong>Udgam</strong> 
              (meaning <em>“Origin”</em> or <em>“To Emerge”</em>) has blossomed into the premiere cultural 
              and technical confluence of the Eastern Himalayas.
            </p>
            <p className="story-text">
              This edition embraces the whimsical grace of the <strong>Cherry Blossom</strong>. 
              The ephemeral beauty of sakura reminds us that moments of youthful passion, breakthrough 
              ideas, and harmonious creativity are precious—inspiring every student to boldly 
              <strong>Chase the Bloom</strong>.
            </p>
            <div className="story-quote-box">
              <span className="quote-kanji">春の訪れ</span>
              <p className="quote-text">“Every petal tells a story of perseverance, every song a hymn to the spring.”</p>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="about-visual-card card-bloom reveal-on-scroll">
            <div className="visual-img-frame">
              <img
                src="./assets/images/temple-pagoda.jpg"
                alt="Pagoda & Torii Gate in Spring Bloom"
                className="about-feature-img"
              />
              <div className="visual-overlay-badge">
                <span className="badge-icon">⛩️</span>
                <span>Tradition & Innovation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metric / Stat Badges */}
        <div className="stats-row reveal-on-scroll">
          <div className="stat-card">
            <div className="stat-icon-bg">🌸</div>
            <div className="stat-number">3</div>
            <div className="stat-label">Days of Wonder</div>
            <div className="stat-sub">March 27 – 29, 2026</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg">🎋</div>
            <div className="stat-number">50+</div>
            <div className="stat-label">Grand Events</div>
            <div className="stat-sub">Cultural, Tech & Arts</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg">🏮</div>
            <div className="stat-number">15,000+</div>
            <div className="stat-label">Fest Footfall</div>
            <div className="stat-sub">From 40+ Colleges</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-bg">✨</div>
            <div className="stat-number">₹5,00,000+</div>
            <div className="stat-label">Prize Pool</div>
            <div className="stat-sub">Trophies & Grants</div>
          </div>
        </div>
      </div>
    </section>
  );
}
