import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HeartPulse, Compass, Activity, BookOpen, Shield } from 'lucide-react';

export const WebNavbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="web-navbar">
      <div className="navbar-content">
        <Link to="/" className="brand-logo">
          <div className="logo-icon">
            <HeartPulse size={22} className="text-white" />
          </div>
          <span className="brand-name">Equal<span>Rescue</span></span>
        </Link>

        <nav className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Home
          </Link>
          <Link to="/decide" className={`nav-link ${isActive('/decide') ? 'active' : ''}`}>
            <Compass size={16} />
            <span>Decide</span>
          </Link>
          <Link to="/cpr" className={`nav-link nav-link-cpr ${isActive('/cpr') ? 'active' : ''}`}>
            <Activity size={16} />
            <span>CPR Guide</span>
          </Link>
          <Link to="/learn" className={`nav-link ${isActive('/learn') ? 'active' : ''}`}>
            <BookOpen size={16} />
            <span>Learn</span>
          </Link>
          <Link to="/sources" className={`nav-link ${isActive('/sources') ? 'active' : ''}`}>
            <Shield size={16} />
            <span>Sources</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
