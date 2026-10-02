import React from 'react';
import { sponsorTiers } from '../data/sponsorsData';

export default function SponsorsPage({ onNavigateHome, onContactTeam }) {
  return (
    <div className="subpage-root sponsors-page-root">
      {/* 1. Hero & Breadcrumb Banner */}
      <section className="subpage-hero-section">
        <div className="subpage-hero-bg-glow"></div>
        <div className="container subpage-hero-container">
          {/* Breadcrumb Bar */}
          <div className="subpage-breadcrumb">
            <button
              type="button"
              className="breadcrumb-back-btn"
              onClick={onNavigateHome}
              title="Return to festival homepage"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Fest Home</span>
            </button>
            <span className="breadcrumb-sep">•</span>
            <span className="breadcrumb-current">Patrons of Creativity &amp; Sponsors</span>
          </div>

          <div className="subpage-hero-content">
            <div className="fest-pill-badge">
              <span className="badge-flower">🤝</span>
              <span>PATRONS &amp; BRAND ALLIES • UDGAM 2026</span>
            </div>

            <h1 className="subpage-hero-title">
              Our Blossoming <span className="text-glow-blush">Partners</span>
            </h1>

            <p className="subpage-hero-subtitle">
              We extend our heartfelt gratitude to the institutions, tech innovators, and media allies 
              powering our annual celebration at NIT Sikkim. Their vision and support make this Himalayan 
              spring confluence possible for thousands of aspiring minds.
            </p>

            {/* Quick Metrics */}
            <div className="subpage-metrics-row">
              <div className="subpage-metric-card">
                <span className="metric-icon">🏮</span>
                <div className="metric-info">
                  <strong>15,000+</strong>
                  <span>Footfall &amp; Attendees</span>
                </div>
              </div>
              <div className="subpage-metric-card">
                <span className="metric-icon">🏛️</span>
                <div className="metric-info">
                  <strong>40+ Colleges</strong>
                  <span>Pan-India Presence</span>
                </div>
              </div>
              <div className="subpage-metric-card">
                <span className="metric-icon">🌐</span>
                <div className="metric-info">
                  <strong>1,00,000+</strong>
                  <span>Digital Impressions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Structured Sponsor Tiers Section */}
      <section className="section sponsors-page-tiers-section">
        <div className="container">
          <div className="sponsors-wrapper">
            {sponsorTiers.map((tier, idx) => (
              <div key={idx} className="sponsor-tier-group subpage-tier-group">
                <div className="tier-header-row">
                  <span className="tier-label">{tier.title}</span>
                  <div className="tier-line"></div>
                </div>

                <div className={`sponsor-logos-row ${tier.className}`}>
                  {tier.sponsors.map((sponsor, sIdx) => (
                    <div key={sIdx} className="sponsor-card card-bloom">
                      <div className="sponsor-inner">
                        <div className="sponsor-symbol">{sponsor.symbol}</div>
                        <h3 className="sponsor-name">{sponsor.name}</h3>
                        <p className="sponsor-desc">{sponsor.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 3. Partner With Us / Sponsorship Callout Banner */}
          <div className="subpage-callout-banner card-bloom sponsors-partnership-banner">
            <div className="callout-banner-content">
              <span className="callout-badge">🌟 PARTNER WITH UDGAM 2026</span>
              <h3 className="callout-title">Elevate Your Brand in the Heart of the Eastern Himalayas</h3>
              <p className="callout-desc">
                Udgam offers tailored sponsorship decks featuring main-stage naming rights, interactive 
                hackathon problem tracks, exclusive stall spaces, campus engagement booths, and extensive 
                digital outreach across high-tier engineering colleges.
              </p>
              <div className="sponsors-contact-quick">
                <span className="sponsors-contact-email">✉️ udgam.sponsors@nitsikkim.ac.in</span>
                <span className="sponsors-contact-phone">📞 +91 98765 43210</span>
              </div>
            </div>
            <div className="callout-banner-actions">
              {onContactTeam && (
                <button
                  type="button"
                  className="btn btn-primary btn-bloom"
                  onClick={onContactTeam}
                >
                  <span className="btn-text">Connect with Sponsorship Leads</span>
                  <span className="btn-arrow">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
