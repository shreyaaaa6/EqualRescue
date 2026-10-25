import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

export const WebNavbar: React.FC = () => {
  return (
    <header className="web-navbar">
      <div className="navbar-content">
        <Link to="/" className="brand-logo" aria-label="EqualRescue Home">
          <div className="logo-icon">
            <HeartPulse size={22} className="text-white" />
          </div>
          <span className="brand-name">Equal<span>Rescue</span></span>
        </Link>
      </div>
    </header>
  );
};
