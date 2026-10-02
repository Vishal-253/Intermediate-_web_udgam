import React, { useState } from 'react';
import { scheduleDays, scheduleItems } from '../data/scheduleData';

export default function SchedulePage({ onNavigateHome, onExploreEvents }) {
  const [activeDay, setActiveDay] = useState('day1');

  const currentDayMeta = scheduleDays.find(d => d.id === activeDay) || scheduleDays[0];
  const currentEvents = scheduleItems[activeDay] || [];

  return (
    <div className="subpage-root schedule-page-root">
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
            <span className="breadcrumb-current">Festival Itinerary &amp; Timeline</span>
          </div>

          <div className="subpage-hero-content">
            <div className="fest-pill-badge">
              <span className="badge-flower">📅</span>
              <span>FOUR-DAY FESTIVAL SCHEDULE • NOV 6 – 9, 2026</span>
            </div>

            <h1 className="subpage-hero-title">
              The Blossoming <span className="text-glow-blush">Branch Timeline</span>
            </h1>

            <p className="subpage-hero-subtitle">
              Follow the day-by-day sequence of pronites, competitions, hackathons, and exhibitions 
              across our misty Ravangla campus. Plan your festival journey and ensure your team never misses a stage call.
            </p>

            {/* Quick Metrics */}
            <div className="subpage-metrics-row">
              <div className="subpage-metric-card">
                <span className="metric-icon">⏰</span>
                <div className="metric-info">
                  <strong>4 Dynamic Days</strong>
                  <span>Morning to Twilight</span>
                </div>
              </div>
              <div className="subpage-metric-card">
                <span className="metric-icon">📍</span>
                <div className="metric-info">
                  <strong>4 Primary Arenas</strong>
                  <span>Auditorium, OAT &amp; Grounds</span>
                </div>
              </div>
              <div className="subpage-metric-card">
                <span className="metric-icon">🎵</span>
                <div className="metric-info">
                  <strong>Star Pronites</strong>
                  <span>Every Evening at 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Day Navigation Tabs */}
      <section className="schedule-tabs-section">
        <div className="container">
          <div className="timeline-day-nav subpage-day-nav">
            {scheduleDays.map(day => (
              <button
                key={day.id}
                type="button"
                className={`day-nav-btn ${activeDay === day.id ? 'active' : ''}`}
                onClick={() => setActiveDay(day.id)}
              >
                <span className="day-num">{day.num}</span>
                <span className="day-title">{day.title}</span>
                <span className="day-date">{day.date}</span>
              </button>
            ))}
          </div>

          {/* Active Day Header Banner */}
          <div className="schedule-day-summary-banner card-bloom">
            <div className="day-summary-info">
              <span className="day-summary-badge">{currentDayMeta.num} • {currentDayMeta.date}</span>
              <h2 className="day-summary-title">{currentDayMeta.title}</h2>
            </div>
            <div className="day-summary-count">
              <span>{currentEvents.length} Programmed Milestones</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Timeline Sequence */}
      <section className="section schedule-timeline-section">
        <div className="container">
          <div className="timeline-wrapper">
            <div className="branch-spine-line" aria-hidden="true"></div>

            <div className="timeline-day-content active">
              {currentEvents.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="flower-node">
                    <span className="node-petal">🌸</span>
                  </div>
                  <div className="timeline-card card-bloom">
                    <div className="timeline-time-badge">
                      <span className="time-icon">⏱️</span>
                      <span>{item.time}</span>
                    </div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                    <div className="timeline-venue-badge">
                      <span className="venue-icon">📍</span>
                      <span>{item.venue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Tips & Stage Call Guidelines */}
          <div className="schedule-guidelines-grid">
            <div className="guideline-card card-bloom">
              <span className="guideline-icon">📢</span>
              <h4>Stage Call &amp; Line Check</h4>
              <p>
                All competing bands, solo artists, and dance crews must report to backstage managers 
                45 minutes prior to the scheduled start time for sound checks and prop positioning.
              </p>
            </div>
            <div className="guideline-card card-bloom">
              <span className="guideline-icon">🏮</span>
              <h4>Evening Wayfinding</h4>
              <p>
                Illuminated paper lantern walkways and volunteer guides connect the Main Auditorium 
                to the Open Air Amphitheatre and Dining Halls after dusk.
              </p>
            </div>
            <div className="guideline-card card-bloom">
              <span className="guideline-icon">✨</span>
              <h4>Live Broadcast &amp; Scores</h4>
              <p>
                Real-time round results, hackathon leaderboards, and schedule updates are broadcasted 
                across the festival digital display boards and official channels.
              </p>
            </div>
          </div>

          {/* 5. Subpage Footer Callout Banner */}
          <div className="subpage-callout-banner card-bloom">
            <div className="callout-banner-content">
              <span className="callout-badge">🎯 READY TO PARTICIPATE?</span>
              <h3 className="callout-title">Check Out Guidelines for All Competitions</h3>
              <p className="callout-desc">
                Review eligibility rules, registration windows, and prize distributions across all 50+ spectacles.
              </p>
            </div>
            <div className="callout-banner-actions">
              {onExploreEvents && (
                <button
                  type="button"
                  className="btn btn-primary btn-bloom"
                  onClick={onExploreEvents}
                >
                  <span className="btn-text">Browse Events &amp; Arenas</span>
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
