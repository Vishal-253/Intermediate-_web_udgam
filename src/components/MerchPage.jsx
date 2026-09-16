import React, { useState } from 'react';
import { merchData, merchCategories } from '../data/merchData';
import MerchModal from './MerchModal';
import LightboxModal from './LightboxModal';
import { playChimeNote, chimeFrequencies } from '../utils/audio';

export default function MerchPage({ onNavigateHome }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  // State for active image index per product { cap: 0, tshirt: 0, hoodie: 0 }
  const [activeImageIndexes, setActiveImageIndexes] = useState({
    cap: 0,
    tshirt: 0,
    hoodie: 0
  });
  // State for selected size per product
  const [selectedSizes, setSelectedSizes] = useState({
    cap: 'Free Size',
    tshirt: 'L',
    hoodie: 'L'
  });
  // State for quantity per product
  const [quantities, setQuantities] = useState({
    cap: 1,
    tshirt: 1,
    hoodie: 1
  });

  // Modal states
  const [modalItem, setModalItem] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Filter items
  const filteredItems = selectedCategory === 'all'
    ? merchData
    : merchData.filter(item => item.categorySlug === selectedCategory);

  // Cycle to previous image for a product
  const handlePrevImage = (itemId, totalImages) => {
    setActiveImageIndexes(prev => {
      const current = prev[itemId] || 0;
      const nextIdx = (current - 1 + totalImages) % totalImages;
      return { ...prev, [itemId]: nextIdx };
    });
    playChimeNote(chimeFrequencies[1]);
  };

  // Cycle to next image for a product
  const handleNextImage = (itemId, totalImages) => {
    setActiveImageIndexes(prev => {
      const current = prev[itemId] || 0;
      const nextIdx = (current + 1) % totalImages;
      return { ...prev, [itemId]: nextIdx };
    });
    playChimeNote(chimeFrequencies[3]);
  };

  // Select a specific thumbnail image in order
  const handleSelectImageIndex = (itemId, index) => {
    setActiveImageIndexes(prev => ({ ...prev, [itemId]: index }));
    playChimeNote(chimeFrequencies[2]);
  };

  // Change selected size
  const handleSizeChange = (itemId, size) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  // Change quantity
  const handleQtyChange = (itemId, delta) => {
    setQuantities(prev => {
      const current = prev[itemId] || 1;
      const updated = Math.max(1, Math.min(10, current + delta));
      return { ...prev, [itemId]: updated };
    });
  };

  // Open reservation modal
  const handleOpenReserve = (item) => {
    setModalItem(item);
    playChimeNote(chimeFrequencies[4]);
  };

  return (
    <div className="merch-page-root">
      {/* 1. Header & Hero Banner */}
      <section className="merch-hero-section">
        <div className="merch-hero-bg-glow"></div>
        <div className="container merch-hero-container">
          {/* Breadcrumb & Navigation */}
          <div className="merch-breadcrumb">
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
            <span className="breadcrumb-current">Official Festival Drops</span>
          </div>

          <div className="merch-hero-content">
            <div className="fest-pill-badge">
              <span className="badge-flower">🌸</span>
              <span>UDGAM 2026 OFFICIAL MERCHANDISE</span>
            </div>

            <h1 className="merch-hero-title">
              Wear the <span className="text-glow-blush">Bloom</span>
            </h1>

            <p className="merch-hero-subtitle">
              Take home a piece of the starlit Himalayan festival. Limited edition drops crafted exclusively
              for Udgam 2026 with premium fabrics, authentic college insignias, and vibrant embroidered crests.
            </p>

            {/* Quick Feature Pillars */}
            <div className="merch-perks-row">
              <div className="merch-perk-item">
                <span className="perk-icon">🏷️</span>
                <div className="perk-info">
                  <strong>Official Drops</strong>
                  <span>NIT Sikkim Commemorative</span>
                </div>
              </div>
              <div className="merch-perk-item">
                <span className="perk-icon">✨</span>
                <div className="perk-info">
                  <strong>High GSM Quality</strong>
                  <span>Heavyweight Cotton & Fleece</span>
                </div>
              </div>
              <div className="merch-perk-item">
                <span className="perk-icon">📍</span>
                <div className="perk-info">
                  <strong>Campus Pickup</strong>
                  <span>Central Merch Booth Ravangla</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Products Showcase Section */}
      <section className="merch-catalog-section" id="catalog">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="merch-filter-bar">
            <div className="filter-pill-group">
              {merchCategories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    playChimeNote(chimeFrequencies[0]);
                  }}
                >
                  <span className="filter-icon">{cat.icon}</span>
                  <span className="filter-text">{cat.label}</span>
                  <span className="filter-count">({cat.count})</span>
                </button>
              ))}
            </div>

            <div className="merch-count-indicator">
              Showing <strong>{filteredItems.length}</strong> official fest items
            </div>
          </div>

          {/* Product Grid */}
          <div className="merch-grid">
            {filteredItems.map(item => {
              const activeIdx = activeImageIndexes[item.id] || 0;
              const currentImg = item.images[activeIdx] || item.images[0];
              const totalImgs = item.images.length;
              const selectedSize = selectedSizes[item.id] || item.sizes[0];
              const qty = quantities[item.id] || 1;
              const subtotal = item.price * qty;

              return (
                <article key={item.id} className="merch-card card-bloom" id={`merch-card-${item.id}`}>
                  {/* Top Badge Row */}
                  <div className="merch-card-header">
                    <span className="merch-cat-tag">
                      <span className="tag-petal">{item.petal}</span>
                      {item.category}
                    </span>
                    <span className="merch-badge-pill">{item.badge}</span>
                  </div>

                  {/* Multi-Image Angle Gallery Viewer */}
                  <div className="merch-gallery-viewer">
                    {/* Active Angle Badge */}
                    <div className="merch-angle-pill">
                      <span className="angle-order-num">Angle {activeIdx + 1}/{totalImgs}:</span>
                      <span className="angle-label-text">{currentImg.label}</span>
                    </div>

                    {/* Main Image Display */}
                    <div className="merch-main-img-wrap">
                      <img
                        src={currentImg.src}
                        alt={`${item.name} - ${currentImg.label}`}
                        className="merch-main-img"
                        key={`${item.id}-${activeIdx}`}
                      />

                      {/* Fullscreen / Inspect Overlay Button */}
                      <button
                        type="button"
                        className="merch-inspect-btn"
                        title="View Full High-Res Image"
                        aria-label="Inspect Full Image"
                        onClick={() => setLightboxImage({
                          src: currentImg.src,
                          caption: `${item.name} (${currentImg.label} - Angle ${activeIdx + 1} of ${totalImgs}) • ${currentImg.angle}`
                        })}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                      </button>

                      {/* Previous / Next Arrow Controls */}
                      {totalImgs > 1 && (
                        <>
                          <button
                            type="button"
                            className="gallery-nav-arrow arrow-left"
                            aria-label={`Previous angle for ${item.name}`}
                            onClick={() => handlePrevImage(item.id, totalImgs)}
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            className="gallery-nav-arrow arrow-right"
                            aria-label={`Next angle for ${item.name}`}
                            onClick={() => handleNextImage(item.id, totalImgs)}
                          >
                            ›
                          </button>
                        </>
                      )}
                    </div>

                    {/* Ordered Thumbnail Angle Strip */}
                    <div className="merch-thumbnail-strip">
                      {item.images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`merch-thumb-btn ${activeIdx === idx ? 'active' : ''}`}
                          onClick={() => handleSelectImageIndex(item.id, idx)}
                          title={`View ${img.label} (${idx + 1}/${totalImgs})`}
                        >
                          <img src={img.src} alt={img.label} className="merch-thumb-img" />
                          <span className="thumb-index-num">0{idx + 1}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Information Body */}
                  <div className="merch-info-body">
                    <div className="merch-title-price-row">
                      <h3 className="merch-item-name">{item.name}</h3>
                      <div className="merch-price-tag">
                        <span className="currency">₹</span>
                        <span className="amount">{item.price}</span>
                      </div>
                    </div>

                    <p className="merch-short-desc">{item.shortDesc}</p>

                    {/* Key Specs Chips */}
                    <div className="merch-specs-list">
                      {item.specs.slice(0, 3).map((spec, i) => (
                        <div key={i} className="spec-chip">
                          <span className="spec-name">{spec.label}:</span>
                          <span className="spec-val">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Size Selector */}
                    <div className="merch-control-group">
                      <div className="control-label-row">
                        <span className="control-label">Size:</span>
                        <span className="selected-size-display">{selectedSize}</span>
                      </div>
                      <div className="merch-size-chips">
                        {item.sizes.map(size => (
                          <button
                            key={size}
                            type="button"
                            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                            onClick={() => handleSizeChange(item.id, size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity & Pre-Order Action Row */}
                    <div className="merch-action-bar">
                      <div className="qty-control-inline">
                        <button
                          type="button"
                          className="qty-inline-btn"
                          onClick={() => handleQtyChange(item.id, -1)}
                          disabled={qty <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="qty-inline-val">{qty}</span>
                        <button
                          type="button"
                          className="qty-inline-btn"
                          onClick={() => handleQtyChange(item.id, 1)}
                          disabled={qty >= 10}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="btn-gold-glow merch-reserve-btn"
                        onClick={() => handleOpenReserve(item)}
                      >
                        <span>Pre-Order • ₹{subtotal}</span>
                        <span className="reserve-petal">🌸</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Festival Stall & Pickup Guarantee Section */}
      <section className="merch-pickup-section">
        <div className="container">
          <div className="merch-pickup-card card-bloom">
            <div className="pickup-grid">
              <div className="pickup-info-col">
                <span className="pickup-subheading">COLLECTION DESK INFO</span>
                <h3 className="pickup-heading">How to Collect Your Merch</h3>
                <p className="pickup-text">
                  Pre-ordering guarantees your size and quantity are held exclusively under your name.
                  Pick up your reserved items anytime during the 3 days of Udgam 2026.
                </p>

                <ul className="pickup-check-list">
                  <li>
                    <span className="check-bullet">🌸</span>
                    <span><strong>Location:</strong> Official Merch Counter, Central Amphitheatre Lawn, NIT Sikkim Ravangla Campus.</span>
                  </li>
                  <li>
                    <span className="check-bullet">🕒</span>
                    <span><strong>Operating Hours:</strong> 9:00 AM – 8:00 PM daily (November 6 – 9, 2026).</span>
                  </li>
                  <li>
                    <span className="check-bullet">💳</span>
                    <span><strong>Payment Modes:</strong> UPI (GPay, PhonePe, Paytm), Cash on Collection, or Net Banking.</span>
                  </li>
                  <li>
                    <span className="check-bullet">🔄</span>
                    <span><strong>Size Guarantee:</strong> Free fitting and size exchange available on-spot if required.</span>
                  </li>
                </ul>
              </div>

              <div className="pickup-action-col">
                <div className="stall-highlight-box">
                  <div className="stall-icon">⛺</div>
                  <h4 className="stall-box-title">Visiting From Another College?</h4>
                  <p className="stall-box-text">
                    Outstation delegates can reserve online and show their student ID card at the registration desk upon campus arrival.
                  </p>
                  <button
                    type="button"
                    className="btn-outline-bloom stall-return-btn"
                    onClick={onNavigateHome}
                  >
                    <span>Explore Fest Events & Passes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Merch Reservation Modal */}
      <MerchModal
        isOpen={!!modalItem}
        item={modalItem}
        initialSize={modalItem ? (selectedSizes[modalItem.id] || modalItem.sizes[0]) : ''}
        onClose={() => setModalItem(null)}
      />

      {/* 5. Lightbox Modal for High-Res Inspection */}
      <LightboxModal
        image={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
}
