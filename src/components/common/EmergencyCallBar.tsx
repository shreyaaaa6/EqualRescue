import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, HeartPulse, Copy, Check } from 'lucide-react';

export const EmergencyCallBar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = () => {
    // If not on mobile device with dialer capability, provide copy option
    if (navigator.clipboard) {
      navigator.clipboard.writeText('112');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <aside className="emergency-call-bar" aria-label="EqualRescue Header">
      <div className="emergency-call-content">
        <Link to="/" className="emergency-call-brand" title="EqualRescue Home">
          <div className="logo-badge">
            <HeartPulse size={18} strokeWidth={2.5} />
          </div>
          <span className="brand-text">Equal<span>Rescue</span></span>
        </Link>

        <div className="emergency-call-actions">
          <a href="tel:112" className="btn-call-112-urgent" id="call-112-btn">
            <PhoneCall size={16} strokeWidth={2.5} />
            <span>Call 112</span>
          </a>

          <button 
            type="button" 
            onClick={handleCopyNumber} 
            className="btn-copy-112"
            title="Copy emergency number (112)"
            aria-label="Copy emergency number 112"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : '112'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
