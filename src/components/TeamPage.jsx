import React, { useState, useMemo } from 'react';
import { teamMembers, committeeCategories, committeeMembers } from '../data/teamData';
import { playChimeNote, chimeFrequencies } from '../utils/audio';

export default function TeamPage({ onNavigateHome }) {
  const [selectedCommittee, setSelectedCommittee] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all'); // 'all', 'lead', 'assoc-lead'
  const [searchQuery, setSearchQuery] = useState('');

  // Active committee metadata
  const activeCommitteeMeta = useMemo(() => {
    return committeeCategories.find(c => c.id === selectedCommittee) || committeeCategories[0];
  }, [selectedCommittee]);

  // Filter committee members based on category, role, and search
  const filteredMembers = useMemo(() => {
    return committeeMembers.filter(member => {
      const matchesCommittee = selectedCommittee === 'all' || member.committeeId === selectedCommittee;
      const matchesRole = roleFilter === 'all' || member.badgeType === roleFilter;
      const matchesSearch = searchQuery.trim() === '' ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.committeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCommittee && matchesRole && matchesSearch;
    });
  }, [selectedCommittee, roleFilter, searchQuery]);

  const handleCommitteeChange = (catId) => {
    setSelectedCommittee(catId);
    playChimeNote(chimeFrequencies[0]);
  };

  const handleRoleChange = (role) => {
    setRoleFilter(role);
    playChimeNote(chimeFrequencies[2]);
  };

  return (
    <div className="team-page-root">
      {/* 1. Hero & Breadcrumb Banner */}
      <section className="team-hero-section">
        <div className="team-hero-bg-glow"></div>
        <div className="container team-hero-container">
          {/* Breadcrumb Bar */}
          <div className="team-breadcrumb">
            <button
              type="button"
              className="breadcrumb-back-btn"
              onClick={onNavigateHome}
              title="Return to festival homepage"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Fest Home</span>
            </button>
            <span className="breadcrumb-sep">•</span>
            <span className="breadcrumb-current">Organizing Committee &amp; Festival Leads</span>
          </div>

          <div className="team-hero-content">
            <div className="fest-pill-badge">
              <span className="badge-flower">🌸</span>
              <span>UDGAM 2026 ORGANIZING TEAM &amp; COMMITTEES</span>
            </div>

            <h1 className="team-hero-title">
              The Architects of the <span className="text-glow-blush">Bloom</span>
            </h1>

            <p className="team-hero-subtitle">
              Meet the student visionaries, executive conveners, committee leads, and associate leads 
              orchestrating Udgam 2026 at NIT Sikkim. Reach out directly to our teams for coordination,
              partnerships, or festival queries.
            </p>

            {/* Quick Team Pillars / Metric Badges */}
            <div className="team-perks-row">
              <div className="team-perk-item">
                <span className="perk-icon">👑</span>
                <div className="perk-info">
                  <strong>12 Core Conveners</strong>
                  <span>President &amp; Secretariat</span>
                </div>
              </div>
              <div className="team-perk-item">
                <span className="perk-icon">🏛️</span>
                <div className="perk-info">
                  <strong>15 Dedicated Wings</strong>
                  <span>Operational Committees</span>
                </div>
              </div>
              <div className="team-perk-item">
                <span className="perk-icon">🌟</span>
                <div className="perk-info">
                  <strong>68 Leads &amp; Associates</strong>
                  <span>Fueling Every Detail</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Section: Current Organizing Committee (Preserved as it is) */}
      <section className="section team-core-section" id="core-team">
        <div className="container">
          <div className="section-header team-section-header">
            <span className="section-tag team-tag">
              <span className="tag-flower">🌸</span>
              <span>Executive Leadership • 幹部</span>
            </span>
            <h2 className="section-title team-main-title">
              <span className="team-title-flower">🌸</span>
              Udgam 2026 Organizing Committee
            </h2>
            <p className="section-subtitle team-main-subtitle">
              The leaders, conveners, and secretaries steering Udgam 2026 at NIT Sikkim.
              Reach out to our core executive team for event queries, coordination, or assistance.
            </p>
          </div>

          {/* 4-Column Responsive Grid for Core Members */}
          <div className="team-grid">
            {teamMembers.map((member) => (
              <article key={member.id} className="team-card card-bloom" id={`member-${member.id}`}>
                {/* Top Avatar Area with Halo & Role Badge */}
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

                {/* Member Details */}
                <div className="team-card-info">
                  <h3 className="team-member-name">{member.name}</h3>
                  <p className="team-member-role">{member.role}</p>
                  <p className="team-member-dept">{member.department}</p>

                  <div className="team-card-divider"></div>

                  <div className="team-contact-list">
                    <a
                      href={`mailto:${member.email}`}
                      className="team-contact-item contact-email"
                      title={`Email ${member.name}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="contact-icon email-icon"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span className="contact-text">{member.email}</span>
                    </a>

                    <a
                      href={`tel:${member.phone.replace(/\s+/g, '')}`}
                      className="team-contact-item contact-phone"
                      title={`Call ${member.name}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="contact-icon phone-icon"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span className="contact-text">{member.phone}</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Section Below: Committees with Leads & Associate Leads (Merch-style Switcher) */}
      <section className="section team-committees-section" id="committees-catalog">
        <div className="container">
          <div className="section-header team-section-header">
            <span className="section-tag team-tag">
              <span className="tag-flower">🌸</span>
              <span>Committee Wings • 委員会</span>
            </span>
            <h2 className="section-title team-main-title">
              <span className="team-title-flower">🌸</span>
              Committee Leads &amp; Associate Leads
            </h2>
            <p className="section-subtitle team-main-subtitle">
              Explore the 15 committees powering every dimension of Udgam 2026.
              Select any committee below to view its designated Leads and Associate Leads.
            </p>
          </div>

          {/* Filter Bar (Merch-style) */}
          <div className="merch-filter-bar team-committee-filter-bar">
            <div className="filter-pill-group team-filter-pill-group">
              {committeeCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`filter-btn ${selectedCommittee === cat.id ? 'active' : ''}`}
                  onClick={() => handleCommitteeChange(cat.id)}
                >
                  <span className="filter-icon">{cat.icon}</span>
                  <span className="filter-text">{cat.label}</span>
                  <span className="filter-count">({cat.count})</span>
                </button>
              ))}
            </div>

            <div className="merch-count-indicator">
              Showing <strong>{filteredMembers.length}</strong> committee members
            </div>
          </div>

          {/* Sub-Filter Controls: Role Selector & Real-Time Search */}
          <div className="team-subfilter-bar">
            <div className="team-role-toggle-group">
              <button
                type="button"
                className={`team-subfilter-btn ${roleFilter === 'all' ? 'active' : ''}`}
                onClick={() => handleRoleChange('all')}
              >
                All Roles ({selectedCommittee === 'all' ? 68 : (activeCommitteeMeta.count || 0)})
              </button>
              <button
                type="button"
                className={`team-subfilter-btn ${roleFilter === 'lead' ? 'active' : ''}`}
                onClick={() => handleRoleChange('lead')}
              >
                👑 Leads Only
              </button>
              <button
                type="button"
                className={`team-subfilter-btn ${roleFilter === 'assoc-lead' ? 'active' : ''}`}
                onClick={() => handleRoleChange('assoc-lead')}
              >
                ✨ Associate Leads Only
              </button>
            </div>

            <div className="team-search-box">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or committee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="team-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="team-search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Active Committee Info Banner (when a specific committee is picked) */}
          {selectedCommittee !== 'all' && activeCommitteeMeta && (
            <div className="committee-info-banner card-bloom">
              <div className="banner-left">
                <span className="committee-banner-icon">{activeCommitteeMeta.icon}</span>
                <div className="committee-banner-text">
                  <h3 className="committee-banner-title">{activeCommitteeMeta.fullName}</h3>
                  <p className="committee-banner-desc">{activeCommitteeMeta.description}</p>
                </div>
              </div>
              <div className="banner-right">
                <div className="banner-stat-pill">
                  <span className="stat-label">Leads:</span>
                  <span className="stat-val">{activeCommitteeMeta.leadCount}</span>
                </div>
                <div className="banner-stat-pill">
                  <span className="stat-label">Assoc. Leads:</span>
                  <span className="stat-val">{activeCommitteeMeta.assocCount}</span>
                </div>
              </div>
            </div>
          )}

          {/* Committee Members Grid */}
          {filteredMembers.length > 0 ? (
            <div className="team-grid committee-members-grid">
              {filteredMembers.map((member) => (
                <article key={member.id} className="team-card card-bloom" id={`member-${member.id}`}>
                  {/* Top Avatar Area with Halo & Role Badge */}
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

                  {/* Member Details */}
                  <div className="team-card-info">
                    <h3 className="team-member-name">{member.name}</h3>
                    <p className={`team-member-role role-${member.badgeType}`}>
                      {member.role}
                    </p>
                    <p className="team-member-dept">{member.committeeName}</p>

                    <div className="team-card-divider"></div>

                    <div className="team-contact-list">
                      <a
                        href={`mailto:${member.email}`}
                        className="team-contact-item contact-email"
                        title={`Email ${member.name}`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="contact-icon email-icon"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                        <span className="contact-text">{member.email}</span>
                      </a>

                      <a
                        href={`tel:${member.phone.replace(/\s+/g, '')}`}
                        className="team-contact-item contact-phone"
                        title={`Call ${member.name}`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="contact-icon phone-icon"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span className="contact-text">{member.phone}</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="team-empty-state card-bloom">
              <span className="empty-flower">🌸</span>
              <h3>No members match your criteria</h3>
              <p>Try resetting the search query or changing the role filter.</p>
              <button
                type="button"
                className="btn-outline-bloom"
                onClick={() => {
                  setSelectedCommittee('all');
                  setRoleFilter('all');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 4. Contact & Collaboration Banner at Bottom */}
      <section className="team-contact-banner-section">
        <div className="container">
          <div className="team-cta-box card-bloom">
            <div className="cta-sparkle">✨</div>
            <h3 className="cta-heading">Want to Collaborate or Have Questions?</h3>
            <p className="cta-desc">
              Whether you are an artist seeking stage coordination, a college delegation planning travel to Ravangla,
              or a brand looking for sponsorship opportunities — our student leads are here to help.
            </p>
            <div className="cta-actions-row">
              <button
                type="button"
                className="btn-gold-glow"
                onClick={onNavigateHome}
              >
                <span>Return to Festival Homepage</span>
                <span className="btn-petal">🌸</span>
              </button>
              <a
                href="mailto:udgam@nitsikkim.ac.in"
                className="btn-outline-bloom"
              >
                <span>Email Central Secretariat</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
