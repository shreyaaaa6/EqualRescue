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
          <div className="logo-icon-sm">
            <HeartPulse size={18} className="text-white" />
          </div>
          <span className="brand-name-top">Equal<span>Rescue</span></span>
        </Link>

        <div className="emergency-call-actions">
          <a href="tel:112" className="btn-call-112" id="call-112-btn">
            <PhoneCall size={18} className="animate-shake" />
            <span>Call 112</span>
          </a>

          <button 
            type="button" 
            onClick={handleCopyNumber} 
            className="btn-copy-number"
            title="Copy emergency number (112)"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : '112'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
