import React from 'react';
import { teamMembers } from '../data/teamData';
import TeamPassCard from './TeamPassCard';

export default function Team({ onExploreTeam }) {
  // Preview top 4 executive conveners on the landing page
  const previewMembers = teamMembers.slice(0, 4);

  return (
    <section id="team" className="section team-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header team-section-header">
          <span className="section-tag team-tag">
            <span className="tag-flower">🌸</span>
            <span>Meet Our Team • チーム</span>
          </span>
          <h2 className="section-title team-main-title">
            <span className="team-title-flower">🌸</span>
            Udgam 2026 Organizing Committee
          </h2>
          <p className="section-subtitle team-main-subtitle">
            Over 80 passionate student leaders across 15 dedicated committees, conveners, and secretaries
            bringing Northeast India's grandest festival to life at NIT Sikkim.
          </p>
        </div>

        {/* Executive Showcase Row (Preview of 4 leaders matching pass design) */}
        <div className="team-passes-grid team-preview-grid">
          {previewMembers.map((member) => (
            <TeamPassCard key={member.id} member={member} />
          ))}
        </div>

        {/* Dedicated Page Callout Banner with Glowing Button */}
        <div className="team-home-explore-box card-bloom">
          <div className="explore-box-content">
            <div className="explore-badge-pill">
              <span>🏛️ 15 COMMITTEES • 68 LEADS &amp; ASSOCIATES</span>
            </div>
            <h3 className="explore-box-title">Explore All Committees &amp; Student Leads</h3>
            <p className="explore-box-desc">
              From Web Dev, Sponsorship, and Technical hackathons to Cultural, Hospitality, and Graphics —
              view the full roster of Leads and Associate Leads powering Udgam 2026.
            </p>
          </div>
          <div className="explore-box-action">
            <button
              type="button"
              className="btn btn-primary btn-bloom team-explore-btn"
              onClick={onExploreTeam}
            >
              <span className="btn-text">View Full Team &amp; Committees</span>
              <span className="btn-petal">🌸</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
