import React from 'react';
import { Info, X } from 'lucide-react';

interface SafetyBannerProps {
  onDismiss: () => void;
}

export const SafetyBanner: React.FC<SafetyBannerProps> = ({ onDismiss }) => {
  return (
    <div className="advisory-banner" role="region" aria-label="Educational notice">
      <div className="advisory-content">
        <div className="advisory-text">
          <Info size={15} className="flex-shrink-0" />
          <span>
            Educational prototype — not a clinical diagnostic tool. Call 112 immediately in any life-threatening emergency.
          </span>
        </div>
        <button 
          type="button" 
          onClick={onDismiss} 
          className="btn-dismiss-advisory"
          aria-label="Dismiss notice"
          title="Dismiss notice"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
};
