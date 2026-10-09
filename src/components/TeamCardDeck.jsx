'use client';

import React from 'react';

/**
 * TeamCardDeck
 * A physical playing-card deck component for festival roles.
 * Features:
 * - Stacked 3-layer card deck appearance in collapsed state
 * - Subtle card fanning animation on hover
 * - Glow ring and deck indicators
 * - Triggers opening the full-screen / overlay card dealing view over the teams page
 */
export default function TeamCardDeck({
  id,
  title,
  subtitle,
  deckRoleText,
  coverEmblem = '🎴',
  coverImage,
  members = [],
  isOpen = false,
  onToggle
}) {
  return (
    <div className={`team-deck-container ${isOpen ? 'deck-active-open' : 'deck-collapsed'}`} id={`deck-${id}`}>
      <div
        className={`team-deck-stack ${isOpen ? 'deck-stack-active-state' : ''} ${coverImage ? 'has-cover-image' : ''}`}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        aria-label={`Open ${title} card deck with ${members.length} passes`}
        title={`Click to open ${title} deck (${members.length} passes)`}
      >
        {/* Ambient Glow behind the deck */}
        <div className="deck-behind-glow" aria-hidden="true" />

        {/* Layer 1: Back tilted card */}
        <div className="deck-card-layer layer-back" aria-hidden="true">
          <div className="deck-layer-card-inner">
            <div className="deck-layer-slot" />
            <div className="deck-layer-border-lines" />
          </div>
        </div>

        {/* Layer 2: Middle tilted card */}
        <div className="deck-card-layer layer-mid" aria-hidden="true">
          <div className="deck-layer-card-inner">
            <div className="deck-layer-slot" />
            <div className="deck-layer-border-lines" />
          </div>
        </div>

        {/* Layer 3: Front Cover: committee artwork when provided, else the pass-style cover */}
        {coverImage ? (
          <div className="deck-card-cover">
            <img
              className="deck-cover-image"
              src={coverImage}
              alt={`${title} committee deck`}
              loading="lazy"
              draggable="false"
            />
          </div>
        ) : (
        <div className="deck-card-cover">
          <div className="team-pass-card deck-cover-card-inner">
            {/* Lanyard Slot Cutout */}
            <div className="team-pass-slot" aria-hidden="true" />

            {/* Crew Tracked Tagline */}
            <div className="team-pass-crew-tag">CREW · UDGAM '26</div>

            {/* Glowing Deck Emblem Ring */}
            <div className="team-pass-avatar-ring deck-emblem-ring">
              <div className="team-pass-avatar-inner deck-emblem-inner">
                <span className="deck-emblem-icon">{coverEmblem}</span>
              </div>
            </div>

            {/* Deck Designation Name */}
            <h3 className="team-pass-name deck-cover-title">
              {title}
            </h3>

            {/* Yellow Role Tape Banner */}
            <div className="team-pass-role-ribbon deck-role-ribbon">
              <span className="team-pass-role-text">{deckRoleText || `${members.length} PASSES IN DECK`}</span>
            </div>

            {/* Click to open action hint */}
            <div className="deck-open-hint">
              <span className="deck-hint-text">{isOpen ? 'Deck Open Above' : 'Click to Deal Deck'}</span>
              <span className="deck-hint-arrow">{isOpen ? '▲' : '▾'}</span>
            </div>

            {/* Perforation Line with Ticket Notches */}
            <div className="team-pass-perforation" aria-hidden="true">
              <span className="team-pass-notch notch-left" />
              <span className="team-pass-perf-line" />
              <span className="team-pass-notch notch-right" />
            </div>

            {/* Bottom Stub */}
            <div className="team-pass-stub deck-stub">
              <div className="deck-stack-count-badge">
                <span className="deck-cards-icon">🂡</span>
                <span>{members.length} Passes</span>
              </div>
              <div className="team-pass-barcode-wrapper">
                <svg className="team-pass-barcode-svg" viewBox="0 0 52 20" width="44" height="17" fill="currentColor">
                  <rect x="0" y="0" width="1.8" height="20" />
                  <rect x="3.2" y="0" width="1" height="20" />
                  <rect x="5.8" y="0" width="2.6" height="20" />
                  <rect x="10.2" y="0" width="1.2" height="20" />
                  <rect x="12.8" y="0" width="2" height="20" />
                  <rect x="16.4" y="0" width="1" height="20" />
                  <rect x="19" y="0" width="3.2" height="20" />
                  <rect x="24" y="0" width="1" height="20" />
                  <rect x="26.6" y="0" width="1.8" height="20" />
                  <rect x="30" y="0" width="2.6" height="20" />
                  <rect x="34.4" y="0" width="1" height="20" />
                  <rect x="36.8" y="0" width="2" height="20" />
                  <rect x="40.4" y="0" width="1" height="20" />
                  <rect x="42.8" y="0" width="2.8" height="20" />
                  <rect x="47.2" y="0" width="1.4" height="20" />
                  <rect x="50" y="0" width="1.8" height="20" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
