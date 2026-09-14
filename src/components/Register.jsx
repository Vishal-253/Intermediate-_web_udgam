import React from 'react';

export default function Register({ onClaimPassClick }) {
  return (
    <section id="register" className="section register-section">
      <div className="container">
        <div className="cta-banner card-bloom reveal-on-scroll">
          <div className="cta-floating-petal p1">🌸</div>
          <div className="cta-floating-petal p2">🌸</div>
          <div className="cta-floating-petal p3">🌸</div>

          <span className="cta-tag">The Gates Await You</span>
          <h2 className="cta-headline">Chase the Bloom</h2>
          <p className="cta-desc">
            Spring only blossoms once a year. Secure your delegate pass now to compete in 50+ 
            events, experience mesmerizing Pronites, and leave your mark at Udgam 2026.
          </p>

          {/* Ticket Passes Tiers */}
          <div className="ticket-tiers-grid">
            {/* Tier 1 */}
            <div className="ticket-card">
              <div className="ticket-top">
                <span className="ticket-badge">Standard</span>
                <h4 className="ticket-name">Petal Pass</h4>
                <div className="ticket-price">Free <span>/ Student</span></div>
              </div>
              <ul className="ticket-perks">
                <li>✓ Campus Entry all 3 Days</li>
                <li>✓ Daytime Exhibitions & Fairs</li>
                <li>✓ Access to Public Stages</li>
                <li>✗ Pronites Front-Row Lounge</li>
              </ul>
              <button
                type="button"
                className="btn btn-outline btn-claim-ticket"
                onClick={() => onClaimPassClick('Petal Pass')}
              >
                Register Free
              </button>
            </div>

            {/* Tier 2 (Featured) */}
            <div className="ticket-card featured">
              <div className="featured-ribbon">Most Popular 🌸</div>
              <div className="ticket-top">
                <span className="ticket-badge gold">Full Access</span>
                <h4 className="ticket-name">Blossom Pass</h4>
                <div className="ticket-price">₹299 <span>/ Person</span></div>
              </div>
              <ul className="ticket-perks">
                <li>✓ All 3 Days Campus Access</li>
                <li>✓ Entry to all 50+ Contests</li>
                <li>✓ Hackathon & Tech Arenas</li>
                <li>✓ Evening Musical Pronites</li>
                <li>✓ Official Udgam Digital Certificate</li>
              </ul>
              <button
                type="button"
                className="btn btn-primary btn-bloom btn-claim-ticket"
                onClick={() => onClaimPassClick('Blossom Pass')}
              >
                Get Blossom Pass
              </button>
            </div>

            {/* Tier 3 */}
            <div className="ticket-card">
              <div className="ticket-top">
                <span className="ticket-badge">VIP Patron</span>
                <h4 className="ticket-name">Sakura VIP</h4>
                <div className="ticket-price">₹699 <span>/ Person</span></div>
              </div>
              <ul className="ticket-perks">
                <li>✓ Everything in Blossom Pass</li>
                <li>✓ Front-Row Star Pronite Enclosure</li>
                <li>✓ Artist Meet & Greet Access</li>
                <li>✓ Deluxe Udgam Festival Kit & Hoodie</li>
                <li>✓ Priority Check-in & Dining</li>
              </ul>
              <button
                type="button"
                className="btn btn-outline btn-claim-ticket"
                onClick={() => onClaimPassClick('Sakura VIP Pass')}
              >
                Get VIP Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
