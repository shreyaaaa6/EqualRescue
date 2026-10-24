import React from 'react';
import { Info } from 'lucide-react';

export const SafetyBanner: React.FC = () => {
  return (
    <div className="safety-disclaimer-banner">
      <div className="safety-content">
        <Info size={14} className="flex-shrink-0" />
        <span>
          Educational prototype — not a clinical diagnostic tool. Call 112 immediately and follow dispatcher instructions.
        </span>
      </div>
    </div>
  );
};
