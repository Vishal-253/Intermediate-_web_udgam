import React from 'react';
import { sponsorTiers } from '../data/sponsorsData';

export default function Sponsors() {
  return (
    <section id="sponsors" className="section sponsors-section">
      <div className="container">
        <div className="section-floral-header reveal-on-scroll">
          <div className="branch-divider">
            <svg viewBox="0 0 280 30" width="240" height="26" fill="none">
              <path d="M10 15 Q70 25 140 15 T270 15" stroke="#A8D19F" strokeWidth="2" strokeLinecap="round" />
              <circle cx="140" cy="15" r="5" fill="#FF6B8B" stroke="#FFF0F5" strokeWidth="1" />
            </svg>
          </div>
          <span className="section-tag">Patrons of Creativity</span>
          <h2 className="section-title">Our Blossoming Partners</h2>
          <p className="section-subtitle">
            We extend our heartfelt gratitude to the institutions powering our spring celebration.
          </p>
        </div>

        {/* Sponsor Tiers */}
        <div className="sponsors-wrapper reveal-on-scroll">
          {sponsorTiers.map((tier, idx) => (
            <div key={idx} className="sponsor-tier-group">
              <span className="tier-label">{tier.title}</span>
              <div className={`sponsor-logos-row ${tier.className}`}>
                {tier.sponsors.map((sponsor, sIdx) => (
                  <div key={sIdx} className="sponsor-card card-bloom">
                    <div className="sponsor-inner">
                      <div className="sponsor-symbol">{sponsor.symbol}</div>
                      <div className="sponsor-name">{sponsor.name}</div>
                      <div className="sponsor-desc">{sponsor.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
