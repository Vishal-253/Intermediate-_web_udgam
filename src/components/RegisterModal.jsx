import React, { useState, useEffect } from 'react';
import { playSuccessChime } from '../utils/audio';

export default function RegisterModal({ isOpen, defaultPass, onClose }) {
  const [passType, setPassType] = useState('Blossom Pass (₹299)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    phone: ''
  });
  const [submittedPass, setSubmittedPass] = useState(null);

  useEffect(() => {
    if (defaultPass) {
      if (defaultPass.toLowerCase().includes('petal')) {
        setPassType('Petal Pass (Free)');
      } else if (defaultPass.toLowerCase().includes('vip')) {
        setPassType('Sakura VIP Pass (₹699)');
      } else {
        setPassType('Blossom Pass (₹299)');
      }
    }
    setSubmittedPass(null);
  }, [defaultPass, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = 'UDG-' + Math.floor(100000 + Math.random() * 900000);
    setSubmittedPass({
      tier: passType.split('(')[0].trim(),
      name: formData.name,
      college: formData.college,
      code
    });
    playSuccessChime();
  };

  return (
    <div
      className="modal-backdrop open"
      id="register-modal"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-dialog card-bloom register-dialog">
        <button
          type="button"
          className="modal-close-btn"
          id="register-modal-close"
          aria-label="Close Modal"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="register-modal-inner">
          <div className="modal-flower-header">
            <span className="modal-icon">🌸</span>
            <h3 className="modal-title">Secure Your Fest Delegate Pass</h3>
            <p className="modal-subtitle">Welcome to Udgam 2026. Fill your details to reserve your pass.</p>
          </div>

          {!submittedPass ? (
            <form id="pass-registration-form" className="registration-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label htmlFor="reg-pass-type">Pass Selected</label>
                  <select
                    id="reg-pass-type"
                    className="form-control"
                    value={passType}
                    onChange={(e) => setPassType(e.target.value)}
                    required
                  >
                    <option value="Blossom Pass (₹299)">Blossom Pass (All-Access) — ₹299</option>
                    <option value="Petal Pass (Free)">Petal Pass (Daytime Exhibition) — Free</option>
                    <option value="Sakura VIP Pass (₹699)">Sakura VIP Pass (Front-Row) — ₹699</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reg-name">Full Name</label>
                  <input
                    type="text"
                    id="reg-name"
                    className="form-control"
                    placeholder="Sakura Haruno"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-email">Email Address</label>
                  <input
                    type="email"
                    id="reg-email"
                    className="form-control"
                    placeholder="you@college.edu"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reg-college">College / University</label>
                  <input
                    type="text"
                    id="reg-college"
                    className="form-control"
                    placeholder="NIT Sikkim / Other College"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-phone">WhatsApp Contact</label>
                  <input
                    type="tel"
                    id="reg-phone"
                    className="form-control"
                    placeholder="+91 9876543210"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn btn-primary btn-bloom" style={{ width: '100%' }}>
                  <span>Confirm &amp; Generate Digital Badge</span>
                </button>
              </div>
            </form>
          ) : (
            <div id="ticket-success-view" className="ticket-success-view">
              <div className="success-icon">🎉🌸</div>
              <h4 className="success-title">Your Pass is Confirmed!</h4>
              <p className="success-text">Welcome aboard to Udgam 2026. Keep this digital pass handy.</p>
              
              <div className="digital-ticket-card">
                <div className="ticket-header-strip">
                  <span>UDGAM 2026 PASS</span>
                  <span id="ticket-tier-name">{submittedPass.tier}</span>
                </div>
                <div className="ticket-info-grid">
                  <div><strong>Delegate:</strong> <span>{submittedPass.name}</span></div>
                  <div><strong>Institute:</strong> <span>{submittedPass.college}</span></div>
                  <div><strong>Pass ID:</strong> <span>{submittedPass.code}</span></div>
                  <div><strong>Dates:</strong> <span>March 27 – 29, 2026</span></div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline"
                id="ticket-download-btn"
                onClick={() => window.print()}
              >
                Print / Save Badge
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
