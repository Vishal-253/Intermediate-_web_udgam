import React, { useState, useMemo } from 'react';
import { teamMembers, committeeCategories, committeeMembers } from '../data/teamData';
import TeamPassCard from './TeamPassCard';
import TeamCardDeck from './TeamCardDeck';

export default function TeamPage({ onNavigateHome }) {
  // Track open/collapsed state independently for each committee deck
  const [openDecks, setOpenDecks] = useState({});

  const toggleDeck = (deckId) => {
    setOpenDecks((prev) => ({
      ...prev,
      [deckId]: !prev[deckId]
    }));
  };

  // 1. President (Single Standalone Card)
  const president = useMemo(() => {
    return teamMembers.find((m) => m.role === 'President' || m.badgeType === 'president') || teamMembers[0];
  }, []);

  // 2. Vice Presidents (Two separate cards side by side)
  const vicePresidents = useMemo(() => {
    return teamMembers.filter((m) => m.role === 'Vice President' || m.badgeType === 'vp');
  }, []);

  // 3. Treasurer (Single Standalone Card)
  const treasurer = useMemo(() => {
    return teamMembers.find((m) => m.role === 'Treasurer' || m.badgeType === 'treasurer') || teamMembers[3];
  }, []);

  // 4. Organising Committee: Individual card deck for every committee
  const committeeDecks = useMemo(() => {
    // Conveners
    const convenerMembers = teamMembers.filter(
      (m) => m.role === 'Convener' || m.badgeType === 'convener'
    );
    // General Secretary
    const gensecMembers = teamMembers.filter(
      (m) => m.role?.toLowerCase().includes('secretary') || m.badgeType === 'gensec'
    );

    // 15 Operational Wings
    const operationalDecks = committeeCategories
      .filter((c) => c.id !== 'all')
      .map((cat) => {
        const members = committeeMembers.filter((m) => m.committeeId === cat.id);
        let title = cat.label;
        if (cat.id === 'web-dev') title = 'Web Development';
        if (cat.id === 'publicity') title = 'Public Relations';

        return {
          id: cat.id,
          title: title,
          subtitle: cat.fullName || `${title} Committee`,
          roleText: `${members.length} PASSES IN DECK`,
          icon: cat.icon || '🎴',
          members: members
        };
      });

    return [
      {
        id: 'conveners',
        title: 'Conveners',
        subtitle: 'Core Operations & Orchestration',
        roleText: `${convenerMembers.length} PASSES IN DECK`,
        icon: '⚖️',
        members: convenerMembers
      },
      {
        id: 'gensec',
        title: 'General Secretary',
        subtitle: 'Executive Secretariat',
        roleText: `${gensecMembers.length} PASSES IN DECK`,
        icon: '📜',
        members: gensecMembers
      },
      ...operationalDecks
    ];
  }, []);

  return (
    <div className="team-page-root">
      {/* Upper Ambient Atmosphere Glow */}
      <div className="team-ambient-glow" aria-hidden="true" />

      <main className="team-hierarchical-layout">
        {/* ==================================================================
            1. PRESIDENT (Single Standalone Card with Title Above)
            ================================================================== */}
        <section className="team-tier-section tier-president" aria-label="President">
          <div className="leadership-card-col">
            <h2 className="leadership-role-title">President</h2>
            {president && <TeamPassCard member={president} hideRoleInside={true} />}
          </div>
        </section>

        {/* ==================================================================
            2. VICE PRESIDENTS (Two separate cards side by side with Title Above)
            ================================================================== */}
        <section className="team-tier-section tier-vice-presidents" aria-label="Vice Presidents">
          <div className="tier-content tier-pair">
            {vicePresidents.map((vp) => (
              <div key={vp.id} className="leadership-card-col">
                <h2 className="leadership-role-title">Vice President</h2>
                <TeamPassCard member={vp} hideRoleInside={true} />
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================================
            3. TREASURER (Single Standalone Card with Title Above)
            ================================================================== */}
        <section className="team-tier-section tier-treasurer" aria-label="Treasurer">
          <div className="leadership-card-col">
            <h2 className="leadership-role-title">Treasurer</h2>
            {treasurer && <TeamPassCard member={treasurer} hideRoleInside={true} />}
          </div>
        </section>

        {/* ==================================================================
            4. ORGANISING COMMITTEE (Separate Card Deck for Every Committee)
            ================================================================== */}
        <section className="team-tier-section tier-organising-committee" aria-label="Organising Committee">
          <div className="organising-committee-header">
            <h2 className="organising-committee-title">Organising Committee</h2>
          </div>

          <div className="committee-decks-grid">
            {committeeDecks.map((deck) => (
              <TeamCardDeck
                key={deck.id}
                id={deck.id}
                title={deck.title}
                subtitle={deck.subtitle}
                deckRoleText={deck.roleText}
                coverEmblem={deck.icon}
                members={deck.members}
                isOpen={Boolean(openDecks[deck.id])}
                onToggle={() => toggleDeck(deck.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
