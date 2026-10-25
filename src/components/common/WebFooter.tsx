import React from 'react';
import { Link } from 'react-router-dom';

export const WebFooter: React.FC = () => {
  return (
    <footer className="site-footer-calm" role="contentinfo">
      <div className="footer-inner">
        <p className="footer-meta-text">
          <strong>EqualRescue</strong> is an educational emergency guidance prototype designed to eliminate bystander hesitation and close the CPR gender survival gap. Always call 112 immediately in life-threatening emergencies and follow dispatcher instructions.
        </p>

        <nav className="footer-nav-row" aria-label="Footer Navigation">
          <Link to="/">Home</Link>
          <Link to="/decide">Help me decide</Link>
          <Link to="/cpr">CPR metronome</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/sources">Clinical sources</Link>
        </nav>

        <p className="footer-meta-text" style={{ color: 'var(--text-tertiary)' }}>
          © 2026 EqualRescue. Aligned with AHA 2020 Adult BLS standards & India Good Samaritan legal frameworks.
        </p>
      </div>
    </footer>
  );
};

