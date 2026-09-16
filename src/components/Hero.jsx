import React, { useState, useEffect } from 'react';
import { playChimeNote, chimeFrequencies } from '../utils/audio';

// Festival Start Date: November 6, 2026 at 09:30 AM IST
const FESTIVAL_START_DATE = new Date('2026-11-06T09:30:00+05:30').getTime();

const calculateTimeLeft = () => {
  const now = Date.now();
  const distance = FESTIVAL_START_DATE - now;

  if (distance <= 0) {
    return { days: '00', hours: '00', mins: '00', secs: '00', isLive: true };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    mins: String(mins).padStart(2, '0'),
    secs: String(secs).padStart(2, '0'),
    isLive: false
  };
};

export default function Hero({ onTeamClick }) {
  // Dynamic Live Countdown to November 6, 2026
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const [birds, setBirds] = useState([0, 1, 2]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Periodic Flying Cranes cycle
  useEffect(() => {
    const birdInterval = setInterval(() => {
      setBirds([]);
      setTimeout(() => setBirds([0, 1, 2]), 100);
    }, 19000);
    return () => clearInterval(birdInterval);
  }, []);

  const ringLantern = (idx) => {
    const note = chimeFrequencies[idx % chimeFrequencies.length];
    playChimeNote(note);
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background Starlit Landscape Artwork */}
      <div className="hero-bg-art">
        <div className="hero-mountains-overlay"></div>
        <div className="hero-fog-layer"></div>
      </div>

      {/* Flying Cranes periodic container */}
      <div className="hero-birds-container" id="hero-birds" aria-hidden="true">
        {birds.map((b, i) => (
          <div
            key={i}
            className="flying-crane"
            style={{
              animationDelay: `${i * 1.8}s`,
              top: `${15 + i * 12}%`
            }}
          >
            <svg viewBox="0 0 48 36" width="40" height="30" fill="none">
              <g
                stroke="#FFF0F5"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
                filter="drop-shadow(0 0 6px rgba(255, 183, 197, 0.8))"
              >
                <path d="M12 20 C18 18 28 17 38 14" />
                <path d="M38 14 C42 13 45 11 47 10" />
                <path className="crane-wing" d="M22 18 C26 8 32 3 36 2 C28 9 24 15 22 18" fill="rgba(255, 183, 197, 0.5)" />
                <path className="crane-wing" d="M20 19 C15 11 8 6 4 4 C11 11 16 16 20 19" fill="rgba(255, 183, 197, 0.4)" />
                <path d="M12 20 C6 22 3 25 1 27" />
              </g>
            </svg>
          </div>
        ))}
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-pill-badge">
            <span className="badge-flower">🌸</span>
            <span>Annual Fest • NIT Sikkim</span>
            <span className="badge-dot">•</span>
            <span className="badge-date">November 6 – 9, 2026</span>
          </div>

          <h1 className="hero-title">
            <span className="title-main">UDGAM</span>
            <span className="title-year">2026</span>
          </h1>

          <div className="hero-motto-wrapper">
            <p className="hero-motto">Chase the Bloom</p>
          </div>

          <p className="hero-desc">
            Where the starlit Himalayan peaks meet the luminous whisper of night blossoms. 
            Immerse yourself in four unforgettable days of music, engineering marvels, 
            fine arts, and cosmic wonder under the Himalayan moon.
          </p>

          {/* Countdown Timer */}
          <div className="hero-countdown" id="hero-countdown">
            <div className="countdown-unit">
              <span className="countdown-val" id="count-days">{timeLeft.days}</span>
              <span className="countdown-lbl">Days</span>
            </div>
            <div className="countdown-sep">🌸</div>
            <div className="countdown-unit">
              <span className="countdown-val" id="count-hours">{timeLeft.hours}</span>
              <span className="countdown-lbl">Hours</span>
            </div>
            <div className="countdown-sep">🌸</div>
            <div className="countdown-unit">
              <span className="countdown-val" id="count-mins">{timeLeft.mins}</span>
              <span className="countdown-lbl">Minutes</span>
            </div>
            <div className="countdown-sep">🌸</div>
            <div className="countdown-unit">
              <span className="countdown-val" id="count-secs">{timeLeft.secs}</span>
              <span className="countdown-lbl">Seconds</span>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="hero-actions">
            <a
              href="/team"
              className="btn btn-primary btn-bloom"
              onClick={(e) => {
                if (onTeamClick) {
                  e.preventDefault();
                  onTeamClick();
                }
              }}
            >
              <span className="btn-text">Meet The Team</span>
              <svg className="btn-arrow" viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#events" className="btn btn-outline">
              <span>Explore Events</span>
            </a>
          </div>
        </div>

        {/* Smooth Slow-Moving Sakura Tree (Two Animated States) */}
        <div
          className="hero-moving-tree-scene"
          id="hero-tree-scene"
          onClick={() => ringLantern(3)}
          title="Tap tree to ring temple chimes"
        >
          <div className="moving-tree-stage">
            {/* State 1: Tree on Cliff with Glowing Lanterns */}
            <img
              src="./assets/images/home/sakura-tree-cliff.png"
              alt="Swaying Sakura Tree on Cliff with Lanterns"
              className="tree-state-layer state-cliff"
            />

            {/* State 2: Tree on Cliff (Alternate Posture / Bare) */}
            <img
              src="./assets/images/home/sakura-tree-bare.png"
              alt="Swaying Sakura Tree Breathing"
              className="tree-state-layer state-bare"
            />

            {/* Ambient Bioluminescent Root Glow */}
            <div className="tree-cliff-ambient-glow" aria-hidden="true"></div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Curve Wave */}
      <div className="hero-bottom-curve">
        <svg viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none">
          <path d="M0,45 C280,90 480,10 720,50 C960,90 1200,20 1440,60 L1440,90 L0,90 Z" fill="#0D060C" />
        </svg>
      </div>
    </section>
  );
}
