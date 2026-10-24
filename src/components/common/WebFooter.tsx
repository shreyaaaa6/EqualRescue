import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export const WebFooter: React.FC = () => {
  return (
    <footer className="web-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <p className="brand-statement">
            <strong>EqualRescue</strong> — Women-Centred, CPR-First Emergency Guidance.
          </p>
          <p className="footer-note">
            Built with <Heart size={14} className="inline text-rose-500 fill-rose-500" /> to eliminate bystander hesitation and close the CPR gender gap.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/decide">Help Me Decide</Link>
          <Link to="/cpr">CPR Screen</Link>
          <Link to="/learn">Learn</Link>
          <Link to="/sources">Clinical Sources & Safety</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 EqualRescue Prototype. Aligned with AHA Adult BLS guidelines & India 112.</p>
      </div>
    </footer>
  );
};
