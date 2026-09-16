import React from 'react';
import { teamMembers } from '../data/teamData';

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

        {/* Executive Showcase Row (Preview of 4 leaders) */}
        <div className="team-grid team-preview-grid">
          {previewMembers.map((member) => (
            <article key={member.id} className="team-card card-bloom" id={`member-preview-${member.id}`}>
              <div className="team-avatar-wrapper">
                <div className="team-avatar-halo"></div>
                <div
                  className="team-avatar-circle"
                  style={{ background: member.avatarGradient }}
                >
                  <div className="avatar-placeholder-art">
                    <svg
                      viewBox="0 0 64 64"
                      width="52"
                      height="52"
                      fill="none"
                      className="avatar-user-silhouette"
                    >
                      <circle cx="32" cy="22" r="12" fill="rgba(255, 255, 255, 0.88)" />
                      <path
                        d="M12 54 C12 40, 20 36, 32 36 C44 36, 52 40, 52 54 Z"
                        fill="rgba(255, 255, 255, 0.88)"
                      />
                    </svg>
                    <span className="avatar-initials-tag">{member.initials}</span>
                  </div>
                </div>

                <div className={`team-role-pill badge-${member.badgeType}`}>
                  {member.badgeText}
                </div>
              </div>

              <div className="team-card-info">
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <p className="team-member-dept">{member.department}</p>
              </div>
            </article>
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
