import React from 'react';

export default function HomeGateways({ onNavigate }) {
  const gateways = [
    {
      id: 'events',
      page: 'events',
      title: 'Competitions & Arenas',
      tag: '50+ Events • ₹5L+ Prize Pool',
      desc: 'Battle of the bands, 36h hackathon, choreonite, fine arts, and gaming showdowns across 4 stages.',
      icon: '🎭',
      flower: '🌸',
      accentColor: '#FF6B8B',
      buttonText: 'Explore Events'
    },
    {
      id: 'schedule',
      page: 'schedule',
      title: 'Festival Itinerary',
      tag: 'Nov 6 – 9, 2026 • 4 Days',
      desc: 'Follow the blossoming branch timeline from morning inaugural lamps to star twilight pronites.',
      icon: '📅',
      flower: '✨',
      accentColor: '#F0C28A',
      buttonText: 'View Schedule'
    },
    {
      id: 'gallery',
      page: 'gallery',
      title: 'Memory Wall',
      tag: 'Visual Chronicles',
      desc: 'Atmospheric snapshots of Himalayan twilight, paper lantern walks, and past celebrations.',
      icon: '📸',
      flower: '🏮',
      accentColor: '#A29BFE',
      buttonText: 'Open Gallery'
    },
    {
      id: 'sponsors',
      page: 'sponsors',
      title: 'Patrons & Partners',
      tag: 'Academic & Industry Allies',
      desc: 'Meet the premier institutions, tech innovators, and media allies supporting our annual bloom.',
      icon: '🤝',
      flower: '🏛️',
      accentColor: '#A8D19F',
      buttonText: 'Our Sponsors'
    }
  ];

  return (
    <section id="gateways" className="section home-gateways-section">
      <div className="container">
        {/* Section Floral Header */}
        <div className="section-floral-header reveal-on-scroll">
          <div className="branch-divider">
            <svg viewBox="0 0 280 30" width="240" height="26" fill="none">
              <path d="M10 15 Q70 25 140 15 T270 15" stroke="#A8D19F" strokeWidth="2" strokeLinecap="round" />
              <circle cx="140" cy="15" r="5" fill="#FF6B8B" stroke="#FFF0F5" strokeWidth="1" />
            </svg>
          </div>
          <span className="section-tag">Explore Udgam 2026</span>
          <h2 className="section-title">The Festival Experience</h2>
          <p className="section-subtitle">
            Dive into dedicated arenas, track schedule timelines, browse visual chronicles, and connect with our patrons.
          </p>
        </div>

        {/* 4 Clean Interactive Portal Cards */}
        <div className="gateways-grid reveal-on-scroll">
          {gateways.map((gw) => (
            <div
              key={gw.id}
              className="gateway-card card-bloom"
              onClick={() => onNavigate && onNavigate(gw.page)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (onNavigate) onNavigate(gw.page);
                }
              }}
            >
              <div className="gateway-top-row">
                <span className="gateway-icon-circle">{gw.icon}</span>
                <span className="gateway-pill">{gw.tag}</span>
              </div>

              <h3 className="gateway-title">
                {gw.title} <span className="gateway-flower">{gw.flower}</span>
              </h3>

              <p className="gateway-desc">{gw.desc}</p>

              <div className="gateway-action-row">
                <span className="gateway-action-text">{gw.buttonText}</span>
                <span className="gateway-action-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
