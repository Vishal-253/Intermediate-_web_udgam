import React, { useState, useMemo } from 'react';
import { galleryData } from '../data/galleryData';

export default function GalleryPage({
  gallery = galleryData,
  onSelectImage,
  onNavigateHome
}) {
  const [activeTag, setActiveTag] = useState('all');

  // Extract unique tags for filtering
  const tags = useMemo(() => {
    const set = new Set();
    gallery.forEach(item => {
      if (item.tag) set.add(item.tag);
    });
    return ['all', ...Array.from(set)];
  }, [gallery]);

  const filteredItems = useMemo(() => {
    if (activeTag === 'all') return gallery;
    return gallery.filter(item => item.tag === activeTag);
  }, [gallery, activeTag]);

  return (
    <div className="subpage-root gallery-page-root">
      {/* 1. Hero & Breadcrumb Banner */}
      <section className="subpage-hero-section">
        <div className="subpage-hero-bg-glow"></div>
        <div className="container subpage-hero-container">
          {/* Breadcrumb Bar */}
          <div className="subpage-breadcrumb">
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
            <span className="breadcrumb-current">Visual Chronicles &amp; Memory Wall</span>
          </div>

          <div className="subpage-hero-content">
            <div className="fest-pill-badge">
              <span className="badge-flower">📸</span>
              <span>VISUAL CHRONICLES • MEMORY WALL</span>
            </div>

            <h1 className="subpage-hero-title">
              Memories in <span className="text-glow-blush">Full Bloom</span>
            </h1>

            <p className="subpage-hero-subtitle">
              Relive the magic of past editions—from lantern-lit mountain twilight and soulful acoustic notes 
              under the pines to electrifying rock spectacles and traditional Sikkimese hospitality.
            </p>

            {/* Quick Metrics */}
            <div className="subpage-metrics-row">
              <div className="subpage-metric-card">
                <span className="metric-icon">🏮</span>
                <div className="metric-info">
                  <strong>Night Lanterns</strong>
                  <span>Himalayan Twilight Vibe</span>
                </div>
              </div>
              <div className="subpage-metric-card">
                <span className="metric-icon">🌸</span>
                <div className="metric-info">
                  <strong>Cherry Blossoms</strong>
                  <span>Ravangla Campus in Spring</span>
                </div>
              </div>
              <div className="subpage-metric-card">
                <span className="metric-icon">✨</span>
                <div className="metric-info">
                  <strong>Unforgettable Echoes</strong>
                  <span>15,000+ Memories Created</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Filter Tags */}
      <section className="gallery-filter-section">
        <div className="container">
          <div className="events-filter-bar subpage-filter-bar">
            {tags.map(tag => (
              <button
                key={tag}
                type="button"
                className={`filter-tab ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                <span className="tab-flower">
                  {tag === 'all' ? '🌸' : tag.includes('Night') ? '🏮' : tag.includes('Stage') ? '⛩️' : '✨'}
                </span>
                {tag === 'all' ? 'All Memories' : tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Photo Grid Section */}
      <section className="section gallery-page-grid-section">
        <div className="container">
          <div className="gallery-grid" id="gallery-grid">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className={`gallery-item ${item.className || ''}`}
                onClick={() => onSelectImage && onSelectImage(item)}
                tabIndex={0}
                role="button"
                aria-label={`View full photo: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (onSelectImage) onSelectImage(item);
                  }
                }}
              >
                <div className="gallery-frame">
                  <img src={item.src} alt={item.caption} loading="lazy" />
                  <div className="gallery-overlay">
                    <div className="overlay-petal">{item.petal}</div>
                    <h3 className="overlay-title">{item.title}</h3>
                    <span className="overlay-tag">{item.tag}</span>
                    <span className="overlay-zoom-hint">🔍 Click to enlarge</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Instagram / Student Photography Callout Banner */}
          <div className="subpage-callout-banner card-bloom gallery-insta-banner">
            <div className="callout-banner-content">
              <span className="callout-badge">📷 CAPTURE THE MOMENTS</span>
              <h3 className="callout-title">Have You Captured a Luminous Fest Memory?</h3>
              <p className="callout-desc">
                Tag <strong>@udgam.nitsikkim</strong> on Instagram or use the hashtag <strong>#ChaseTheBloom2026</strong> 
                during fest days to have your shots featured live on our official festival displays and social walls!
              </p>
            </div>
            <div className="callout-banner-actions">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-bloom"
              >
                <span className="btn-text">Follow on Instagram</span>
                <span className="btn-petal">🌸</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
