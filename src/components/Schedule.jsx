import React, { useState } from 'react';
import { scheduleDays, scheduleItems } from '../data/scheduleData';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('day1');

  return (
    <section id="schedule" className="section schedule-section">
      <div className="container">
        <div className="section-floral-header reveal-on-scroll">
          <div className="branch-divider">
            <svg viewBox="0 0 280 30" width="240" height="26" fill="none">
              <path d="M10 15 Q70 25 140 15 T270 15" stroke="#A8D19F" strokeWidth="2" strokeLinecap="round" />
              <circle cx="140" cy="15" r="5" fill="#FF6B8B" stroke="#FFF0F5" strokeWidth="1" />
            </svg>
          </div>
          <span className="section-tag">Festival Itinerary</span>
          <h2 className="section-title">The Blossoming Branch Timeline</h2>
          <p className="section-subtitle">
            Walk along the flowering branch of celebrations across four unforgettable days (November 6 – 9, 2026).
          </p>
        </div>

        {/* Day Navigation */}
        <div className="timeline-day-nav reveal-on-scroll">
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

        {/* Timeline Spine & Nodes */}
        <div className="timeline-wrapper reveal-on-scroll">
          <div className="branch-spine-line" aria-hidden="true"></div>

          <div className="timeline-day-content active">
            {(scheduleItems[activeDay] || []).map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="flower-node">
                  <span className="node-petal">🌸</span>
                </div>
                <div className="timeline-card card-bloom">
                  <div className="timeline-time">{item.time}</div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-desc">{item.desc}</p>
                  <div className="timeline-venue">📍 {item.venue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
