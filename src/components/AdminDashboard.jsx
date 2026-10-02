import React, { useState } from 'react';
import {
  saveMerchList,
  resetMerch,
  saveEventsList,
  resetEvents,
  setAdminAuth
} from '../utils/festivalStore';

export default function AdminDashboard({
  merchList,
  onUpdateMerchList,
  eventsList,
  onUpdateEventsList,
  onNavigateHome,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'merch'
  const [toastMessage, setToastMessage] = useState('');

  // Search & Filters
  const [merchSearch, setMerchSearch] = useState('');
  const [merchCategoryFilter, setMerchCategoryFilter] = useState('all');
  const [eventsSearch, setEventsSearch] = useState('');
  const [eventsCategoryFilter, setEventsCategoryFilter] = useState('all');

  // Modal state for Add/Edit
  const [merchModalOpen, setMerchModalOpen] = useState(false);
  const [editingMerchItem, setEditingMerchItem] = useState(null); // null = Add, object = Edit

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEventItem, setEditingEventItem] = useState(null); // null = Add, object = Edit

  // Form states for Merchandise
  const [merchFormData, setMerchFormData] = useState({
    id: '',
    name: '',
    category: 'Apparel',
    categorySlug: 'apparel',
    price: 499,
    badge: 'Limited Drop',
    petal: '🌸',
    shortDesc: '',
    longDesc: '',
    imageSrc: './assets/images/merch/Tshirt1.jpg',
    sizes: 'S, M, L, XL, XXL',
    specs: 'Material: 100% Cotton\nFit: Regular Unisex\nCare: Cold wash',
    highlights: 'Official Udgam 2026 insignia\nHigh-density embroidery\nBreathable combed cotton'
  });

  // Form states for Events
  const [eventFormData, setEventFormData] = useState({
    id: '',
    title: '',
    category: 'cultural',
    categoryLabel: 'Pronites & Music',
    prize: '₹50,000 Pool',
    desc: '',
    date: 'Day 2 • 5:00 PM',
    venue: 'Open Air Amphitheatre',
    teamSize: '3 to 6 Members',
    rules: 'Time limit: 15 minutes.\nOriginal compositions rewarded.\nJudged on synchronization and stage presence.'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure you want to sign out from the Admin Portal?')) {
      setAdminAuth(false);
      if (onLogout) onLogout();
    }
  };

  /* ---------------- MERCHANDISE HANDLERS ---------------- */
  const handleOpenAddMerch = () => {
    setEditingMerchItem(null);
    setMerchFormData({
      id: `merch_${Date.now()}`,
      name: '',
      category: 'Apparel',
      categorySlug: 'apparel',
      price: 399,
      badge: 'New Drop',
      petal: '🌸',
      shortDesc: '',
      longDesc: '',
      imageSrc: './assets/images/merch/Tshirt1.jpg',
      sizes: 'S, M, L, XL',
      specs: 'Material: Combed Cotton\nFit: Regular Unisex\nCare: Hand wash',
      highlights: 'Limited festival drop\nNIT Sikkim commemorative edition'
    });
    setMerchModalOpen(true);
  };

  const handleOpenEditMerch = (item) => {
    setEditingMerchItem(item);
    // Format specs and highlights to text
    const specsText = (item.specs || [])
      .map(s => `${s.label}: ${s.value}`)
      .join('\n');
    const highlightsText = (item.highlights || []).join('\n');
    const sizesText = (item.sizes || []).join(', ');

    setMerchFormData({
      id: item.id,
      name: item.name,
      category: item.category || 'Apparel',
      categorySlug: item.categorySlug || 'apparel',
      price: item.price || 0,
      badge: item.badge || '',
      petal: item.petal || '🌸',
      shortDesc: item.shortDesc || '',
      longDesc: item.longDesc || '',
      imageSrc: item.images?.[0]?.src || './assets/images/merch/Cap0.jpg',
      sizes: sizesText,
      specs: specsText,
      highlights: highlightsText
    });
    setMerchModalOpen(true);
  };

  const handleSaveMerch = (e) => {
    e.preventDefault();

    // Parse specs
    const specsArray = merchFormData.specs
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const parts = line.split(':');
        return {
          label: parts[0]?.trim() || 'Detail',
          value: parts.slice(1).join(':')?.trim() || ''
        };
      });

    // Parse highlights
    const highlightsArray = merchFormData.highlights
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);

    // Parse sizes
    const sizesArray = merchFormData.sizes
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const updatedItem = {
      id: merchFormData.id || `merch_${Date.now()}`,
      name: merchFormData.name,
      category: merchFormData.category,
      categorySlug: merchFormData.category.toLowerCase().replace(/\s+/g, '-'),
      price: Number(merchFormData.price) || 0,
      badge: merchFormData.badge,
      petal: merchFormData.petal || '🌸',
      shortDesc: merchFormData.shortDesc,
      longDesc: merchFormData.longDesc || merchFormData.shortDesc,
      images: [
        {
          src: merchFormData.imageSrc,
          label: 'Primary Elevation',
          angle: 'Front View',
          caption: `${merchFormData.name} showcase preview`
        }
      ],
      sizes: sizesArray.length > 0 ? sizesArray : ['Free Size'],
      specs: specsArray.length > 0 ? specsArray : [{ label: 'Origin', value: 'NIT Sikkim' }],
      highlights: highlightsArray.length > 0 ? highlightsArray : ['Official Udgam 2026 Merchandise']
    };

    let nextList;
    if (editingMerchItem) {
      nextList = merchList.map(item => item.id === editingMerchItem.id ? updatedItem : item);
      showToast(`Merchandise "${updatedItem.name}" updated successfully!`);
    } else {
      nextList = [updatedItem, ...merchList];
      showToast(`New merchandise "${updatedItem.name}" created!`);
    }

    onUpdateMerchList(nextList);
    saveMerchList(nextList);
    setMerchModalOpen(false);
  };

  const handleDeleteMerch = (item) => {
    if (window.confirm(`Are you sure you want to remove "${item.name}" from merchandise?`)) {
      const nextList = merchList.filter(m => m.id !== item.id);
      onUpdateMerchList(nextList);
      saveMerchList(nextList);
      showToast(`Removed "${item.name}" from merchandise.`);
    }
  };

  const handleResetMerch = () => {
    if (window.confirm('Reset all merchandise to official factory defaults? Any custom items will be overwritten.')) {
      const defaults = resetMerch();
      onUpdateMerchList(defaults);
      showToast('Merchandise reset to official fest catalog defaults.');
    }
  };

  /* ---------------- EVENTS HANDLERS ---------------- */
  const handleOpenAddEvent = () => {
    setEditingEventItem(null);
    setEventFormData({
      id: `event_${Date.now()}`,
      title: '',
      category: 'cultural',
      categoryLabel: 'Pronites & Music',
      prize: '₹40,000 Pool',
      desc: '',
      date: 'Day 2 • 3:00 PM',
      venue: 'Main Auditorium',
      teamSize: '2 to 5 Members',
      rules: 'Registration mandatory before Day 1 noon.\nJudging based on innovation and execution.'
    });
    setEventModalOpen(true);
  };

  const handleOpenEditEvent = (event) => {
    setEditingEventItem(event);
    const rulesText = (event.rules || []).join('\n');

    setEventFormData({
      id: event.id,
      title: event.title,
      category: event.category || 'cultural',
      categoryLabel: event.categoryLabel || 'Cultural',
      prize: event.prize || '',
      desc: event.desc || '',
      date: event.date || '',
      venue: event.venue || '',
      teamSize: event.teamSize || '',
      rules: rulesText
    });
    setEventModalOpen(true);
  };

  const handleCategoryChangeForEvent = (cat) => {
    const labelMap = {
      cultural: 'Pronites & Music',
      technical: 'Tech & Hackathon',
      dance: 'Dance & Drama',
      arts: 'Fine Arts & Fashion',
      literary: 'Literary & Quizzing'
    };
    setEventFormData(prev => ({
      ...prev,
      category: cat,
      categoryLabel: labelMap[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1))
    }));
  };

  const handleSaveEvent = (e) => {
    e.preventDefault();

    const rulesArray = eventFormData.rules
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);

    const updatedEvent = {
      id: eventFormData.id || `event_${Date.now()}`,
      title: eventFormData.title,
      category: eventFormData.category,
      categoryLabel: eventFormData.categoryLabel,
      prize: eventFormData.prize,
      desc: eventFormData.desc,
      date: eventFormData.date,
      venue: eventFormData.venue,
      teamSize: eventFormData.teamSize,
      rules: rulesArray.length > 0 ? rulesArray : ['Standard festival event guidelines apply.']
    };

    let nextList;
    if (editingEventItem) {
      nextList = eventsList.map(ev => ev.id === editingEventItem.id ? updatedEvent : ev);
      showToast(`Event "${updatedEvent.title}" updated successfully!`);
    } else {
      nextList = [updatedEvent, ...eventsList];
      showToast(`New event "${updatedEvent.title}" published!`);
    }

    onUpdateEventsList(nextList);
    saveEventsList(nextList);
    setEventModalOpen(false);
  };

  const handleDeleteEvent = (event) => {
    if (window.confirm(`Are you sure you want to delete event "${event.title}"?`)) {
      const nextList = eventsList.filter(e => e.id !== event.id);
      onUpdateEventsList(nextList);
      saveEventsList(nextList);
      showToast(`Removed event "${event.title}".`);
    }
  };

  const handleResetEvents = () => {
    if (window.confirm('Reset all events to official fest schedule defaults? Any custom added events will be reset.')) {
      const defaults = resetEvents();
      onUpdateEventsList(defaults);
      showToast('Events reset to official festival arenas.');
    }
  };

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredMerch = merchList.filter(item => {
    const matchesCategory = merchCategoryFilter === 'all' || item.categorySlug === merchCategoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(merchSearch.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(merchSearch.toLowerCase()) ||
      (item.badge || '').toLowerCase().includes(merchSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredEvents = eventsList.filter(event => {
    const matchesCategory = eventsCategoryFilter === 'all' || event.category === eventsCategoryFilter;
    const matchesSearch = event.title.toLowerCase().includes(eventsSearch.toLowerCase()) ||
      (event.venue || '').toLowerCase().includes(eventsSearch.toLowerCase()) ||
      (event.categoryLabel || '').toLowerCase().includes(eventsSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="admin-dashboard-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="admin-toast-banner" role="alert">
          <span className="toast-petal">🌸</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-brand">
          <a href="#hero" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="admin-brand-link">
            <span className="admin-brand-glow">UDGAM</span>
            <span className="admin-pill-tag">ADMIN PORTAL</span>
          </a>
        </div>

        <div className="admin-topbar-meta">
          <div className="admin-session-badge">
            <span className="online-indicator"></span>
            <span>Logged in as <strong>admin</strong></span>
          </div>

          <button
            type="button"
            className="btn-admin-preview"
            onClick={onNavigateHome}
            title="Return to Public Festival Website"
          >
            <span>🌐 View Public Site</span>
          </button>

          <button
            type="button"
            className="btn-admin-logout"
            onClick={handleLogoutClick}
            title="End Admin Session"
          >
            <span>🚪 Sign Out</span>
          </button>
        </div>
      </header>

      <main className="admin-main-content">
        {/* Metric Cards Banner */}
        <section className="admin-metrics-row">
          <div className="admin-metric-card card-bloom">
            <div className="metric-icon">🛍️</div>
            <div className="metric-data">
              <span className="metric-number">{merchList.length}</span>
              <span className="metric-label">Merchandise Items</span>
            </div>
            <span className="metric-sub">Active in Fest Catalog</span>
          </div>

          <div className="admin-metric-card card-bloom">
            <div className="metric-icon">🎭</div>
            <div className="metric-data">
              <span className="metric-number">{eventsList.length}</span>
              <span className="metric-label">Festival Events</span>
            </div>
            <span className="metric-sub">Across 5 Arenas</span>
          </div>

          <div className="admin-metric-card card-bloom">
            <div className="metric-icon">🏆</div>
            <div className="metric-data">
              <span className="metric-number">₹3.5L+</span>
              <span className="metric-label">Total Prize Pool</span>
            </div>
            <span className="metric-sub">NIT Sikkim 2026</span>
          </div>

          <div className="admin-metric-card card-bloom">
            <div className="metric-icon">⚡</div>
            <div className="metric-data">
              <span className="metric-number">Live</span>
              <span className="metric-label">Realtime LocalSync</span>
            </div>
            <span className="metric-sub">Auto-persisted to Storage</span>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="admin-tabs-nav">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'merch' ? 'active' : ''}`}
            onClick={() => setActiveTab('merch')}
          >
            <span className="tab-icon">🌸</span>
            <span>Merchandise Catalog ({merchList.length})</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <span className="tab-icon">🎭</span>
            <span>Festival Events ({eventsList.length})</span>
          </button>
        </div>

        {/* ---------------- TAB 1: MERCHANDISE MANAGEMENT ---------------- */}
        {activeTab === 'merch' && (
          <section className="admin-tab-panel">
            <div className="admin-controls-bar card-bloom">
              <div className="controls-left">
                <div className="admin-search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    value={merchSearch}
                    onChange={(e) => setMerchSearch(e.target.value)}
                    placeholder="Search merchandise by title or tag..."
                  />
                  {merchSearch && (
                    <button type="button" className="btn-clear-search" onClick={() => setMerchSearch('')}>&times;</button>
                  )}
                </div>

                <div className="admin-filter-group">
                  <label htmlFor="merch-filter">Category:</label>
                  <select
                    id="merch-filter"
                    value={merchCategoryFilter}
                    onChange={(e) => setMerchCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="apparel">Apparel</option>
                    <option value="headwear">Headwear</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="controls-right">
                <button
                  type="button"
                  className="btn-admin-reset"
                  onClick={handleResetMerch}
                  title="Restore Original Official Merch"
                >
                  ↺ Reset Catalog
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-bloom btn-admin-add"
                  onClick={handleOpenAddMerch}
                >
                  <span>➕ Add New Merch</span>
                </button>
              </div>
            </div>

            {/* Merchandise Items Grid */}
            <div className="admin-items-grid">
              {filteredMerch.length === 0 ? (
                <div className="admin-empty-state card-bloom">
                  <span className="empty-icon">👕</span>
                  <h3>No merchandise found</h3>
                  <p>Try adjusting your search query or click "Add New Merch" to add one.</p>
                </div>
              ) : (
                filteredMerch.map(item => (
                  <article key={item.id} className="admin-item-card card-bloom">
                    <div className="admin-card-image-wrap">
                      <img
                        src={item.images?.[0]?.src || './assets/images/merch/Cap0.jpg'}
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = './assets/images/merch/Cap0.jpg';
                        }}
                      />
                      <span className="admin-card-badge">{item.badge || 'Official'}</span>
                      <span className="admin-card-price">₹{item.price}</span>
                    </div>

                    <div className="admin-card-body">
                      <div className="admin-card-meta-row">
                        <span className="admin-cat-pill">{item.category}</span>
                        <span className="admin-petal-pill">{item.petal}</span>
                      </div>

                      <h3 className="admin-card-title">{item.name}</h3>
                      <p className="admin-card-desc">{item.shortDesc}</p>

                      <div className="admin-card-details">
                        <div className="detail-chip">
                          <strong>Sizes:</strong> {item.sizes?.join(', ')}
                        </div>
                        {item.specs?.length > 0 && (
                          <div className="detail-chip">
                            <strong>Specs:</strong> {item.specs[0]?.label}: {item.specs[0]?.value}
                          </div>
                        )}
                      </div>

                      <div className="admin-card-actions">
                        <button
                          type="button"
                          className="btn-admin-action-edit"
                          onClick={() => handleOpenEditMerch(item)}
                        >
                          ✏️ Edit Details
                        </button>
                        <button
                          type="button"
                          className="btn-admin-action-delete"
                          onClick={() => handleDeleteMerch(item)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        )}

        {/* ---------------- TAB 2: EVENTS MANAGEMENT ---------------- */}
        {activeTab === 'events' && (
          <section className="admin-tab-panel">
            <div className="admin-controls-bar card-bloom">
              <div className="controls-left">
                <div className="admin-search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    value={eventsSearch}
                    onChange={(e) => setEventsSearch(e.target.value)}
                    placeholder="Search events by name, stage, or venue..."
                  />
                  {eventsSearch && (
                    <button type="button" className="btn-clear-search" onClick={() => setEventsSearch('')}>&times;</button>
                  )}
                </div>

                <div className="admin-filter-group">
                  <label htmlFor="events-filter">Arena:</label>
                  <select
                    id="events-filter"
                    value={eventsCategoryFilter}
                    onChange={(e) => setEventsCategoryFilter(e.target.value)}
                  >
                    <option value="all">All Arenas</option>
                    <option value="cultural">Pronites & Music</option>
                    <option value="technical">Tech & Hackathon</option>
                    <option value="dance">Dance & Drama</option>
                    <option value="arts">Fine Arts & Fashion</option>
                    <option value="literary">Literary & Quizzing</option>
                  </select>
                </div>
              </div>

              <div className="controls-right">
                <button
                  type="button"
                  className="btn-admin-reset"
                  onClick={handleResetEvents}
                  title="Restore Original Festival Schedule"
                >
                  ↺ Reset Events
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-bloom btn-admin-add"
                  onClick={handleOpenAddEvent}
                >
                  <span>➕ Add New Event</span>
                </button>
              </div>
            </div>

            {/* Events Grid */}
            <div className="admin-items-grid">
              {filteredEvents.length === 0 ? (
                <div className="admin-empty-state card-bloom">
                  <span className="empty-icon">🎭</span>
                  <h3>No events match your criteria</h3>
                  <p>Try clearing filters or click "Add New Event" to introduce one.</p>
                </div>
              ) : (
                filteredEvents.map(event => (
                  <article key={event.id} className="admin-item-card card-bloom event-style">
                    <div className="admin-card-body">
                      <div className="admin-card-meta-row">
                        <span className="admin-cat-pill">{event.categoryLabel}</span>
                        <span className="admin-prize-pill">{event.prize}</span>
                      </div>

                      <h3 className="admin-card-title">{event.title}</h3>
                      <p className="admin-card-desc">{event.desc}</p>

                      <div className="admin-card-details">
                        <div className="detail-chip">
                          <strong>📅 Schedule:</strong> {event.date}
                        </div>
                        <div className="detail-chip">
                          <strong>📍 Stage:</strong> {event.venue}
                        </div>
                        <div className="detail-chip">
                          <strong>👥 Team:</strong> {event.teamSize}
                        </div>
                        <div className="detail-chip">
                          <strong>📜 Rules:</strong> {event.rules?.length || 0} guidelines specified
                        </div>
                      </div>

                      <div className="admin-card-actions">
                        <button
                          type="button"
                          className="btn-admin-action-edit"
                          onClick={() => handleOpenEditEvent(event)}
                        >
                          ✏️ Edit Details
                        </button>
                        <button
                          type="button"
                          className="btn-admin-action-delete"
                          onClick={() => handleDeleteEvent(event)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        )}
      </main>

      {/* ---------------- MODAL: ADD / EDIT MERCHANDISE ---------------- */}
      {merchModalOpen && (
        <div className="modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) setMerchModalOpen(false); }}>
          <div className="modal-dialog card-bloom admin-modal-dialog">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setMerchModalOpen(false)}
            >
              &times;
            </button>

            <div className="admin-modal-header">
              <span className="admin-modal-tag">🌸 MERCHANDISE CMS</span>
              <h3 className="admin-modal-title">
                {editingMerchItem ? `Edit "${editingMerchItem.name}"` : 'Add New Festival Merchandise'}
              </h3>
              <p className="admin-modal-subtitle">
                Specify all specifications, size matrices, pricing, and visual drop details.
              </p>
            </div>

            <form onSubmit={handleSaveMerch} className="admin-modal-form">
              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    required
                    value={merchFormData.name}
                    onChange={(e) => setMerchFormData({ ...merchFormData, name: e.target.value })}
                    placeholder="e.g. Udgam Signature Silk Scarf"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Category *</label>
                  <select
                    value={merchFormData.category}
                    onChange={(e) => setMerchFormData({ ...merchFormData, category: e.target.value })}
                  >
                    <option value="Apparel">Apparel</option>
                    <option value="Headwear">Headwear</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Souvenirs">Souvenirs</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-grid-3">
                <div className="admin-form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={merchFormData.price}
                    onChange={(e) => setMerchFormData({ ...merchFormData, price: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Badge Tag</label>
                  <input
                    type="text"
                    value={merchFormData.badge}
                    onChange={(e) => setMerchFormData({ ...merchFormData, badge: e.target.value })}
                    placeholder="e.g. Limited Drop / Bestseller"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Petal / Icon Emoji</label>
                  <input
                    type="text"
                    value={merchFormData.petal}
                    onChange={(e) => setMerchFormData({ ...merchFormData, petal: e.target.value })}
                    placeholder="🌸 / ✨ / 🏔️"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Primary Image URL or Asset Path *</label>
                <div className="admin-image-input-row">
                  <input
                    type="text"
                    required
                    value={merchFormData.imageSrc}
                    onChange={(e) => setMerchFormData({ ...merchFormData, imageSrc: e.target.value })}
                    placeholder="./assets/images/merch/Tshirt1.jpg or https://..."
                  />
                  {/* Preset quick picks */}
                  <select
                    className="admin-preset-select"
                    onChange={(e) => {
                      if (e.target.value) setMerchFormData({ ...merchFormData, imageSrc: e.target.value });
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Or Pick Asset</option>
                    <option value="./assets/images/merch/Cap0.jpg">Snapback Cap (Front)</option>
                    <option value="./assets/images/merch/Cap1.jpg">Snapback Cap (Side)</option>
                    <option value="./assets/images/merch/Tshirt1.jpg">Polo T-Shirt (Front)</option>
                    <option value="./assets/images/merch/Tshirt2.jpg">Polo T-Shirt (Back)</option>
                    <option value="./assets/images/merch/Hoodie1.jpg">Himalayan Hoodie</option>
                    <option value="./assets/images/merch/Hoodie2.jpg">Zipper Hoodie</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-group">
                <label>Short Description (Card Teaser) *</label>
                <textarea
                  rows="2"
                  required
                  value={merchFormData.shortDesc}
                  onChange={(e) => setMerchFormData({ ...merchFormData, shortDesc: e.target.value })}
                  placeholder="One sentence summary of fabric and festival branding..."
                />
              </div>

              <div className="admin-form-group">
                <label>Detailed Product Story & Description</label>
                <textarea
                  rows="3"
                  value={merchFormData.longDesc}
                  onChange={(e) => setMerchFormData({ ...merchFormData, longDesc: e.target.value })}
                  placeholder="Full description detailing craftsmanship, inspiration, and mountain aesthetics..."
                />
              </div>

              <div className="admin-form-group">
                <label>Available Sizes (Comma separated)</label>
                <input
                  type="text"
                  value={merchFormData.sizes}
                  onChange={(e) => setMerchFormData({ ...merchFormData, sizes: e.target.value })}
                  placeholder="S, M, L, XL, XXL or Free Size (Adjustable)"
                />
              </div>

              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label>Specifications (One per line as `Label: Value`)</label>
                  <textarea
                    rows="3"
                    value={merchFormData.specs}
                    onChange={(e) => setMerchFormData({ ...merchFormData, specs: e.target.value })}
                    placeholder="Material: 100% Cotton&#10;Fit: Regular&#10;Origin: NIT Sikkim"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Key Highlights (One per line)</label>
                  <textarea
                    rows="3"
                    value={merchFormData.highlights}
                    onChange={(e) => setMerchFormData({ ...merchFormData, highlights: e.target.value })}
                    placeholder="High-density embroidery&#10;Breathable fabric&#10;Official edition"
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn-admin-cancel"
                  onClick={() => setMerchModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-bloom"
                >
                  <span>{editingMerchItem ? 'Save Modifications' : 'Create Merchandise'}</span>
                  <span>🌸</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: ADD / EDIT EVENT ---------------- */}
      {eventModalOpen && (
        <div className="modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) setEventModalOpen(false); }}>
          <div className="modal-dialog card-bloom admin-modal-dialog">
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setEventModalOpen(false)}
            >
              &times;
            </button>

            <div className="admin-modal-header">
              <span className="admin-modal-tag">🎭 EVENT CMS</span>
              <h3 className="admin-modal-title">
                {editingEventItem ? `Edit "${editingEventItem.title}"` : 'Add New Festival Arena Event'}
              </h3>
              <p className="admin-modal-subtitle">
                Configure timing, stage venue, prize bounty, team limits, and official rules.
              </p>
            </div>

            <form onSubmit={handleSaveEvent} className="admin-modal-form">
              <div className="admin-form-grid-2">
                <div className="admin-form-group">
                  <label>Event Title *</label>
                  <input
                    type="text"
                    required
                    value={eventFormData.title}
                    onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                    placeholder="e.g. Battle of the Bands"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Arena Category *</label>
                  <select
                    value={eventFormData.category}
                    onChange={(e) => handleCategoryChangeForEvent(e.target.value)}
                  >
                    <option value="cultural">Pronites & Music (cultural)</option>
                    <option value="technical">Tech & Hackathon (technical)</option>
                    <option value="dance">Dance & Drama (dance)</option>
                    <option value="arts">Fine Arts & Fashion (arts)</option>
                    <option value="literary">Literary & Quizzing (literary)</option>
                  </select>
                </div>
              </div>

              <div className="admin-form-grid-3">
                <div className="admin-form-group">
                  <label>Prize Pool *</label>
                  <input
                    type="text"
                    required
                    value={eventFormData.prize}
                    onChange={(e) => setEventFormData({ ...eventFormData, prize: e.target.value })}
                    placeholder="e.g. ₹50,000 Pool"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Date & Time *</label>
                  <input
                    type="text"
                    required
                    value={eventFormData.date}
                    onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                    placeholder="e.g. Day 2 • 6:00 PM"
                  />
                </div>

                <div className="admin-form-group">
                  <label>Team Size *</label>
                  <input
                    type="text"
                    required
                    value={eventFormData.teamSize}
                    onChange={(e) => setEventFormData({ ...eventFormData, teamSize: e.target.value })}
                    placeholder="e.g. 3 to 8 Members / Solo"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Venue / Stage *</label>
                <input
                  type="text"
                  required
                  value={eventFormData.venue}
                  onChange={(e) => setEventFormData({ ...eventFormData, venue: e.target.value })}
                  placeholder="e.g. Open Air Amphitheatre / Computing Lab"
                />
              </div>

              <div className="admin-form-group">
                <label>Event Description *</label>
                <textarea
                  rows="3"
                  required
                  value={eventFormData.desc}
                  onChange={(e) => setEventFormData({ ...eventFormData, desc: e.target.value })}
                  placeholder="Captivating overview of the event theme, performance format, and energy..."
                />
              </div>

              <div className="admin-form-group">
                <label>Guidelines & Rules (One rule per line) *</label>
                <textarea
                  rows="4"
                  required
                  value={eventFormData.rules}
                  onChange={(e) => setEventFormData({ ...eventFormData, rules: e.target.value })}
                  placeholder="Time limit: 15 minutes.&#10;Tracks must be submitted 3 hours prior.&#10;Original compositions earn bonus points."
                />
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn-admin-cancel"
                  onClick={() => setEventModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-bloom"
                >
                  <span>{editingEventItem ? 'Save Event Details' : 'Publish Event'}</span>
                  <span>🌸</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
