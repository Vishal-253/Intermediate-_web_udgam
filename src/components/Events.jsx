import React, { useState } from 'react';
import { categories, eventsData } from '../data/eventsData';

export default function Events({ onSelectEvent }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredEvents = activeCategory === 'all'
    ? eventsData
    : eventsData.filter(e => e.category === activeCategory);

  return (
    <section id="events" className="section events-section">
      <div className="container">
        <div className="section-floral-header reveal-on-scroll">
          <div className="branch-divider">
            <svg viewBox="0 0 280 30" width="240" height="26" fill="none">
              <path d="M10 15 Q70 25 140 15 T270 15" stroke="#A8D19F" strokeWidth="2" strokeLinecap="round" />
              <circle cx="140" cy="15" r="5" fill="#FF6B8B" stroke="#FFF0F5" strokeWidth="1" />
            </svg>
          </div>
          <span className="section-tag">Explore The Arena</span>
          <h2 className="section-title">Spectacles in Full Bloom</h2>
          <p className="section-subtitle">
            Choose your stage and unfold your brilliance across music, code, drama, and design.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="events-filter-bar reveal-on-scroll">
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

        {/* Events Grid */}
        <div className="events-grid" id="events-grid">
          {filteredEvents.map(event => (
            <article
              key={event.id}
              className="event-card card-bloom reveal-on-scroll"
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

              <button
                type="button"
                className="btn-event-detail"
                onClick={() => onSelectEvent(event)}
              >
                <span>View Guidelines</span>
                <span className="btn-mini-arrow">→</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
