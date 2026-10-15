import React from 'react';
import TeamPassCard from '../TeamPassCard';

function LeaderCard({ title, member }) {
  return (
    <div className="leadership-card-col">
      <h2 className="leadership-role-title">{title}</h2>
      <TeamPassCard member={member} hideRoleInside={true} />
    </div>
  );
}

/** President, the two Vice Presidents and the Treasurer, each with its title above the card. */
export default function LeadershipSection({ president, vicePresidents, treasurer }) {
  return (
    <>
      <section className="team-tier-section tier-president" aria-label="President">
        {president && <LeaderCard title="President" member={president} />}
      </section>

      <section className="team-tier-section tier-vice-presidents" aria-label="Vice Presidents">
        <div className="tier-content tier-pair">
          {vicePresidents.map((vp) => (
            <LeaderCard key={vp.id} title="Vice President" member={vp} />
          ))}
        </div>
      </section>

      <section className="team-tier-section tier-treasurer" aria-label="Treasurer">
        {treasurer && <LeaderCard title="Treasurer" member={treasurer} />}
      </section>
    </>
  );
}
