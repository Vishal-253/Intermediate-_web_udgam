import React from 'react';
import { galleryData } from '../data/galleryData';

export default function Gallery({ onSelectImage }) {
  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <div className="section-floral-header reveal-on-scroll">
          <div className="branch-divider">
            <svg viewBox="0 0 280 30" width="240" height="26" fill="none">
              <path d="M10 15 Q70 25 140 15 T270 15" stroke="#A8D19F" strokeWidth="2" strokeLinecap="round" />
              <circle cx="140" cy="15" r="5" fill="#FF6B8B" stroke="#FFF0F5" strokeWidth="1" />
            </svg>
          </div>
          <span className="section-tag">Visual Chronicles</span>
          <h2 className="section-title">Memories in Full Bloom</h2>
          <p className="section-subtitle">
            Catch glimpses of Himalayan twilight, glowing paper lanterns, and festival spirit.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid reveal-on-scroll">
          {galleryData.map(item => (
            <div
              key={item.id}
              className={`gallery-item ${item.className}`}
              onClick={() => onSelectImage(item)}
            >
              <div className="gallery-frame">
                <img src={item.src} alt={item.caption} loading="lazy" />
                <div className="gallery-overlay">
                  <div className="overlay-petal">{item.petal}</div>
                  <h4 className="overlay-title">{item.title}</h4>
                  <span className="overlay-tag">{item.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
