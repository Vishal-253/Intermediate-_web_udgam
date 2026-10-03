'use client';

import React, { useState, useMemo } from 'react';
import TeamPassCard from './TeamPassCard';

/**
 * TeamCardDeck
 * A physical playing-card deck component for festival roles.
 * Features:
 * - Stacked 3-layer card deck appearance in collapsed state
 * - Subtle card fanning animation on hover
 * - Smooth expansion into an organized member pass grid on click
 * - Intuitive, accessible collapse controls
 * - Built-in committee filter support for the "All Committees" deck
 */
export default function TeamCardDeck({
  id,
  title,
  subtitle,
  deckRoleText,
  coverEmblem = '🎴',
  members = [],
  isOpen = false,
  onToggle,
  isCommitteesDeck = false,
  committeeCategories = []
}) {
  const [selectedCommittee, setSelectedCommittee] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered members for the committees deck
  const displayedMembers = useMemo(() => {
    if (!isCommitteesDeck) return members;

    return members.filter(m => {
      const matchesCat = selectedCommittee === 'all' || m.committeeId === selectedCommittee;
      const matchesSearch = !searchQuery.trim() ||
        m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.committeeName?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [members, isCommitteesDeck, selectedCommittee, searchQuery]);

  return (
    <div className={`team-deck-container ${isOpen ? 'deck-open' : 'deck-collapsed'}`} id={`deck-${id}`}>
      {!isOpen ? (
        /* ====================================================================
           COLLAPSED DECK: Stacked Playing Cards Appearance
           ==================================================================== */
        <div
          className="team-deck-stack"
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

          {/* Layer 3: Front Cover Pass Card */}
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
                <span className="deck-hint-text">Click to Open Deck</span>
                <span className="deck-hint-arrow">▾</span>
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
        </div>
      ) : (
        /* ====================================================================
           EXPANDED DECK: Clean, Well-Organized Member Pass Grid
           ==================================================================== */
        <div className="team-deck-expanded-box">
          {/* Deck Header Bar with Title, Count & Prominent Collapse Button */}
          <div className="deck-expanded-header">
            <div className="deck-header-left">
              <span className="deck-opened-pill">
                <span className="deck-opened-icon">{coverEmblem}</span>
                <span className="deck-opened-title">{title}</span>
                <span className="deck-opened-count">({members.length} Passes)</span>
              </span>
              {subtitle && <span className="deck-opened-subtitle">{subtitle}</span>}
            </div>

            <button
              type="button"
              className="deck-collapse-btn"
              onClick={onToggle}
              title={`Collapse ${title} deck`}
              aria-label={`Collapse ${title} deck`}
            >
              <span>Collapse Deck</span>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Optional Committee Wing Filter Bar (For All Committees Deck) */}
          {isCommitteesDeck && (
            <div className="deck-committees-subfilter">
              <div className="team-category-pills" role="tablist">
                <button
                  type="button"
                  className={`team-cat-pill ${selectedCommittee === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCommittee('all')}
                >
                  <span>All Wings ({members.length})</span>
                </button>
                {committeeCategories
                  .filter(c => c.id !== 'all')
                  .map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`team-cat-pill ${selectedCommittee === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedCommittee(cat.id)}
                    >
                      <span>{cat.label} ({cat.count})</span>
                    </button>
                  ))}
              </div>

              {/* Quick Search */}
              <div className="team-pass-search deck-search-box">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Filter wing or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="team-pass-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="team-search-clear-btn"
                    onClick={() => setSearchQuery('')}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Revealed Passes Grid */}
          <div className="deck-passes-grid">
            {displayedMembers.map((member, index) => (
              <div
                key={member.id}
                className="deck-revealed-card-slot"
                style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
              >
                <TeamPassCard member={member} />
              </div>
            ))}
          </div>

          {/* Bottom Collapse Button for ease of navigation */}
          {displayedMembers.length > 4 && (
            <div className="deck-bottom-collapse-row">
              <button
                type="button"
                className="deck-collapse-btn-bottom"
                onClick={onToggle}
              >
                <span>Collapse {title} Deck ▲</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
