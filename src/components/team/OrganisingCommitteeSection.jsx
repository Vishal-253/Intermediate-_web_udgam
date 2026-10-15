import React from 'react';
import HallOfFameRow from '../HallOfFameRow';

/** The 15 operational wings in the pinned hall-of-fame row. */
export default function OrganisingCommitteeSection({ decks, renderDeck }) {
  return (
    <section className="team-tier-section tier-organising-committee" aria-label="Organising Committee">
      <HallOfFameRow
        label="Organising Committee"
        heading={
          <div className="organising-committee-header">
            <h2 className="organising-committee-title">Organising Committee</h2>
          </div>
        }
      >
        {decks.map(renderDeck)}
      </HallOfFameRow>
    </section>
  );
}
