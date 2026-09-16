import React, { useState, useEffect } from 'react';
import { playSuccessChime } from '../utils/audio';

export default function MerchModal({ isOpen, item, initialSize, onClose }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    rollNo: '',
    notes: ''
  });
  const [submittedOrder, setSubmittedOrder] = useState(null);

  useEffect(() => {
    if (item) {
      setSelectedSize(initialSize || (item.sizes && item.sizes[0]) || 'Free Size');
      setQuantity(1);
      setSubmittedOrder(null);
    }
  }, [item, initialSize, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const totalPrice = item.price * quantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = 'UDG-MRCH-' + Math.floor(10000 + Math.random() * 90000);
    setSubmittedOrder({
      token,
      itemName: item.name,
      itemPrice: item.price,
      size: selectedSize,
      quantity,
      totalPrice,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      college: formData.college,
      rollNo: formData.rollNo,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    });
    playSuccessChime();
  };

  return (
    <div
      className="modal-backdrop open"
      id="merch-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog card-bloom merch-modal-dialog">
        <button
          type="button"
          className="modal-close-btn"
          id="merch-modal-close"
          aria-label="Close Modal"
          onClick={onClose}
        >
          &times;
        </button>

        {submittedOrder ? (
          /* Confirmation Receipt State */
          <div className="merch-order-success">
            <div className="success-icon-ring">🌸</div>
            <h3 className="modal-title">Merch Pre-Order Reserved!</h3>
            <p className="modal-subtitle">
              Your official Udgam festival drop has been locked under your name.
            </p>

            <div className="merch-ticket-card">
              <div className="ticket-header">
                <span className="ticket-brand">UDGAM 2026 • NIT SIKKIM</span>
                <span className="ticket-badge">FESTIVAL PASS DROP</span>
              </div>

              <div className="ticket-token-row">
                <div className="ticket-token-label">RESERVATION TOKEN</div>
                <div className="ticket-token-code">{submittedOrder.token}</div>
              </div>

              <div className="ticket-grid">
                <div className="ticket-field">
                  <span className="tf-label">ITEM</span>
                  <span className="tf-val">{submittedOrder.itemName}</span>
                </div>
                <div className="ticket-field">
                  <span className="tf-label">SIZE</span>
                  <span className="tf-val">{submittedOrder.size}</span>
                </div>
                <div className="ticket-field">
                  <span className="tf-label">QUANTITY</span>
                  <span className="tf-val">{submittedOrder.quantity} pc</span>
                </div>
                <div className="ticket-field">
                  <span className="tf-label">TOTAL AMOUNT</span>
                  <span className="tf-val ticket-gold">₹{submittedOrder.totalPrice}</span>
                </div>
                <div className="ticket-field">
                  <span className="tf-label">RESERVED FOR</span>
                  <span className="tf-val">{submittedOrder.name}</span>
                </div>
                <div className="ticket-field">
                  <span className="tf-label">INSTITUTE / ROLL</span>
                  <span className="tf-val">
                    {submittedOrder.college} {submittedOrder.rollNo ? `(${submittedOrder.rollNo})` : ''}
                  </span>
                </div>
              </div>

              <div className="ticket-footer-note">
                <span className="note-icon">📍</span>
                <span>
                  <strong>Collection Point:</strong> Central Merch Arena, Open Air Amphitheatre, NIT Sikkim Ravangla. Present this code or screenshot to collect during fest days (November 6 – 9, 2026).
                </span>
              </div>
            </div>

            <div className="merch-success-actions">
              <button
                type="button"
                className="btn-gold-glow"
                onClick={() => window.print()}
              >
                <span>Print / Save Receipt</span>
              </button>
              <button
                type="button"
                className="btn-outline-bloom"
                onClick={onClose}
              >
                <span>Back to Merch Store</span>
              </button>
            </div>
          </div>
        ) : (
          /* Pre-Order Form */
          <div className="merch-order-form-container">
            <div className="modal-flower-header">
              <span className="modal-icon">🌸</span>
              <h3 className="modal-title">Pre-Order Fest Merchandise</h3>
              <p className="modal-subtitle">
                Reserve your limited edition gear before sizes run out. Pay at collection desk or via UPI.
              </p>
            </div>

            {/* Selected Item Summary Header */}
            <div className="modal-item-preview-banner">
              <img
                src={item.images[0].src}
                alt={item.name}
                className="preview-thumb-img"
              />
              <div className="preview-details">
                <span className="preview-cat-badge">{item.category} • {item.badge}</span>
                <h4 className="preview-title">{item.name}</h4>
                <div className="preview-price-row">
                  <span className="preview-unit-price">₹{item.price} each</span>
                  <span className="preview-calc-total">
                    Total: <strong>₹{totalPrice}</strong>
                  </span>
                </div>
              </div>
            </div>

            <form className="merch-order-form" onSubmit={handleSubmit}>
              {/* Size & Quantity Bar */}
              <div className="form-row-dual">
                <div className="form-group">
                  <label htmlFor="merch-size-select" className="form-label">
                    Select Size:
                  </label>
                  <div className="size-selector-pills">
                    {item.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`size-chip ${selectedSize === s ? 'active' : ''}`}
                        onClick={() => setSelectedSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="merch-quantity" className="form-label">
                    Quantity:
                  </label>
                  <div className="qty-stepper-control">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-val">{quantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      disabled={quantity >= 10}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="form-row-dual">
                <div className="form-group">
                  <label htmlFor="merch-name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="merch-name"
                    required
                    placeholder="e.g. Aarav Sharma"
                    className="form-input-bloom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="merch-email" className="form-label">
                    College / Personal Email *
                  </label>
                  <input
                    type="email"
                    id="merch-email"
                    required
                    placeholder="e.g. aarav@nitsikkim.ac.in"
                    className="form-input-bloom"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row-dual">
                <div className="form-group">
                  <label htmlFor="merch-phone" className="form-label">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    id="merch-phone"
                    required
                    pattern="[0-9]{10}"
                    title="10 digit Indian mobile number"
                    placeholder="e.g. 9876543210"
                    className="form-input-bloom"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="merch-college" className="form-label">
                    College / University *
                  </label>
                  <input
                    type="text"
                    id="merch-college"
                    required
                    placeholder="e.g. NIT Sikkim / IIT Guwahati"
                    className="form-input-bloom"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="merch-roll" className="form-label">
                  Student Roll / ID Number (Optional)
                </label>
                <input
                  type="text"
                  id="merch-roll"
                  placeholder="e.g. B220042CS"
                  className="form-input-bloom"
                  value={formData.rollNo}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="merch-notes" className="form-label">
                  Special Notes / Fitting Request (Optional)
                </label>
                <input
                  type="text"
                  id="merch-notes"
                  placeholder="e.g. Pick up on Day 1 morning"
                  className="form-input-bloom"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="merch-submit-row">
                <div className="price-summary-box">
                  <span className="total-label">Payable on Collection:</span>
                  <span className="total-amount">₹{totalPrice}</span>
                </div>
                <button
                  type="submit"
                  className="btn-gold-glow modal-submit-btn"
                >
                  <span>Confirm Reservation</span>
                  <span className="btn-petal">🌸</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
