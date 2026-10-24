import React, { useState } from 'react';
import { PhoneCall, AlertCircle, Copy, Check } from 'lucide-react';

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
    <aside className="emergency-call-bar" aria-label="Emergency Call Bar">
      <div className="emergency-call-content">
        <div className="emergency-call-info">
          <AlertCircle size={20} className="pulse-alert-icon" />
          <span className="emergency-label">EMERGENCY (INDIA):</span>
        </div>

        <div className="emergency-call-actions">
          <a href="tel:112" className="btn-call-112" id="call-112-btn">
            <PhoneCall size={18} className="animate-shake" />
            <span>Call 112 Now</span>
          </a>

          <button 
            type="button" 
            onClick={handleCopyNumber} 
            className="btn-copy-number"
            title="Copy emergency number"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : '112'}</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
