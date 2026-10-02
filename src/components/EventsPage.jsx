import React, { useState, useMemo } from 'react';
import { categories, eventsData } from '../data/eventsData';

export default function EventsPage({
  events = eventsData,
  onSelectEvent,
  onNavigateHome,
  onContactTeam
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentEvents = events || eventsData;

  // Filter events based on active category and search query
  const filteredEvents = useMemo(() => {
    return currentEvents.filter(event => {
      const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = q === '' ||
        event.title.toLowerCase().includes(q) ||
        event.desc.toLowerCase().includes(q) ||
        (event.categoryLabel && event.categoryLabel.toLowerCase().includes(q)) ||
        (event.venue && event.venue.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [currentEvents, activeCategory, searchQuery]);

  return (
    <div className="subpage-root events-page-root">
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
            <span className="breadcrumb-current">Competitions &amp; Arena Events</span>
          </div>

          <div className="subpage-hero-content">
            <div className="fest-pill-badge">
              <span className="badge-flower">🌸</span>
              <span>UDGAM 2026 COMPETITIONS &amp; ARENAS</span>
            </div>

            <h1 className="subpage-hero-title">
              Spectacles in <span className="text-glow-blush">Full Bloom</span>
            </h1>

            <p className="subpage-hero-subtitle">
              Choose your stage and unfold your brilliance across music, code, dance, fine arts, and literary challenges.
              Compete alongside the brightest talents from 40+ premier colleges for over ₹5,00,000 in grand prize pools and trophies.
            </p>

            {/* Metric Highlights */}
            <div className="subpage-metrics-row">
              <div className="subpage-metric-card">
                <span className="metric-icon">🏆</span>
                <div className="metric-info">
                  <strong>₹5,00,000+</strong>
                  <span>Cumulative Cash Pool</span>
                </div>
              </div>
              <div className="subpage-metric-card">
                <span className="metric-icon">🎭</span>
                <div className="metric-info">
                  <strong>50+ Events</strong>
                  <span>Cultural, Tech &amp; Arts</span>
                </div>
              </div>
              <div className="subpage-metric-card">
                <span className="metric-icon">📜</span>
                <div className="metric-info">
                  <strong>National Certificates</strong>
                  <span>Endorsed by NIT Sikkim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Search & Arena Filters */}
      <section className="events-controls-section">
        <div className="container">
          <div className="events-search-bar-wrap">
            <div className="events-search-input-box">
              <span className="search-box-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search events by title, domain, or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="events-search-input"
                aria-label="Search events"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="events-count-pill">
              <span>Showing <strong>{filteredEvents.length}</strong> events</span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="events-filter-bar subpage-filter-bar">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                className={`filter-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="tab-flower">{cat.flower}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Events Grid */}
      <section className="section events-page-grid-section">
        <div className="container">
          {filteredEvents.length === 0 ? (
            <div className="events-empty-state card-bloom">
              <span className="empty-flower">🌸</span>
              <h3>No events matched your search</h3>
              <p>Try searching for a different keyword or reset the category filters.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="events-grid" id="events-grid">
              {filteredEvents.map(event => (
                <article
                  key={event.id}
                  className="event-card card-bloom"
                  data-category={event.category}
                >
                  {/* Petal Corner Ornaments */}
                  <div className="card-petal-corner top-left">
                    <svg viewBox="0 0 30 30" width="24" height="24">
                      <path d="M0 0 C15 0 30 15 30 30 C15 30 0 15 0 0 Z" fill="#FF6B8B" opacity="0.8" />
                    </svg>
                  </div>
                  <div className="card-petal-corner bottom-right">
                    <svg viewBox="0 0 30 30" width="24" height="24">
                      <path d="M30 30 C15 30 0 15 0 0 C15 0 30 15 30 30 Z" fill="#FF6B8B" opacity="0.8" />
                    </svg>
                  </div>

                  <div className="event-badge-row">
                    <span className="event-cat-badge">{event.categoryLabel}</span>
                    <span className="event-prize-badge">{event.prize}</span>
                  </div>

                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-desc">{event.desc}</p>

                  <div className="event-meta-row">
                    <span className="meta-item"><span className="meta-icon">📅</span> {event.date}</span>
                    <span className="meta-item"><span className="meta-icon">📍</span> {event.venue}</span>
                  </div>

                  {event.teamSize && (
                    <div className="event-meta-subrow">
                      <span className="meta-teamsize">👥 {event.teamSize}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    className="btn-event-detail"
                    onClick={() => onSelectEvent(event)}
                  >
                    <span>View Guidelines &amp; Rules</span>
                    <span className="btn-mini-arrow">→</span>
                  </button>
                </article>
              ))}
            </div>
          )}

          {/* 4. Bottom Support / Coordinator Banner */}
          <div className="subpage-callout-banner card-bloom">
            <div className="callout-banner-content">
              <span className="callout-badge">🤝 EVENT COORDINATION &amp; QUERIES</span>
              <h3 className="callout-title">Need clarification on event rules or registrations?</h3>
              <p className="callout-desc">
                Our Student Technical, Cultural, and Literary Committee leads are available round the clock 
                to assist your college contingent with rules, travel, and schedule coordination.
              </p>
            </div>
            <div className="callout-banner-actions">
              {onContactTeam && (
                <button
                  type="button"
                  className="btn btn-primary btn-bloom"
                  onClick={onContactTeam}
                >
                  <span className="btn-text">Connect with Committee Leads</span>
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
