import React, { useEffect } from 'react';

export default function LightboxModal({ image, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="modal-backdrop open"
      id="lightbox-modal"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="lightbox-dialog">
        <button
          type="button"
          className="lightbox-close-btn"
          id="lightbox-close"
          aria-label="Close Lightbox"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="lightbox-image-wrap">
          <img src={image.src} alt={image.caption} id="lightbox-img" />
          <p className="lightbox-caption" id="lightbox-caption">
            {image.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
