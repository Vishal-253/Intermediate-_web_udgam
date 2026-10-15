import React, { useState } from 'react';
import TeamCardDeck from './TeamCardDeck';
import TeamDeckOverlay from './TeamDeckOverlay';
import TiltPrompt from './TiltPrompt';
import TeamBackdrop from './team/TeamBackdrop';
import LeadershipSection from './team/LeadershipSection';
import CoreTeamSection from './team/CoreTeamSection';
import OrganisingCommitteeSection from './team/OrganisingCommitteeSection';
import {
  president,
  vicePresidents,
  treasurer,
  conveners,
  generalSecretaries,
  operationalDecks,
} from './team/teamDecks';

export default function TeamPage() {
  // committee deck currently dealt out in the overlay
  const [activeDeck, setActiveDeck] = useState(null);

  const renderDeck = (deck) => (
    <TeamCardDeck
      key={deck.id}
      id={deck.id}
      title={deck.title}
      subtitle={deck.subtitle}
      deckRoleText={deck.roleText}
      coverEmblem={deck.icon}
      coverImage={deck.coverImage}
      members={deck.members}
      isOpen={activeDeck?.id === deck.id}
      onToggle={() => setActiveDeck(deck)}
    />
  );

  return (
    <div className={`team-page-root ${activeDeck ? 'team-page-has-deck-overlay' : ''}`}>
      <TeamBackdrop />

      <main className="team-hierarchical-layout">
        <LeadershipSection president={president} vicePresidents={vicePresidents} treasurer={treasurer} />
        <CoreTeamSection title="Conveners" members={conveners} />
        <CoreTeamSection title="General Secretary" label="General Secretaries" members={generalSecretaries} />
        <OrganisingCommitteeSection decks={operationalDecks} renderDeck={renderDeck} />
      </main>

      {/* Deals the chosen committee's cards over the translucent page */}
      {activeDeck && <TeamDeckOverlay deck={activeDeck} onClose={() => setActiveDeck(null)} />}

      <TiltPrompt />
    </div>
  );
}
