import React, { useEffect } from 'react';

export default function EventModal({ event, onClose, onRegisterEvent }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  return (
    <div className="modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-dialog card-bloom">
        <button
          type="button"
          className="modal-close-btn"
          id="modal-close"
          aria-label="Close Modal"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="modal-content-inner">
          <span className="modal-event-tag">{event.categoryLabel}</span>
          <h3 className="modal-event-title">{event.title}</h3>
          <p className="modal-event-desc">{event.desc}</p>

          <div className="modal-details-grid">
            <div className="modal-detail-box">
              <strong>Prize Bounty</strong>
              <span>{event.prize}</span>
            </div>
            <div className="modal-detail-box">
              <strong>Schedule</strong>
              <span>{event.date}</span>
            </div>
            <div className="modal-detail-box">
              <strong>Location</strong>
              <span>{event.venue}</span>
            </div>
            <div className="modal-detail-box">
              <strong>Team Size</strong>
              <span>{event.teamSize}</span>
            </div>
          </div>

          <h4 className="modal-rules-title">Guidelines & Rules</h4>
          <ul className="modal-rules-list">
            {(event.rules || []).map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>

          <div style={{ textAlign: 'right', marginTop: '24px' }}>
            <button
              type="button"
              className="btn btn-primary btn-bloom"
              onClick={() => {
                onClose();
                onRegisterEvent('Blossom Pass (₹299)');
              }}
            >
              <span>Register for this Event</span>
              <span>🌸</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
