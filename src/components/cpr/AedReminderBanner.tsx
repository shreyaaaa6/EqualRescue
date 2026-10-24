import React from 'react';
import { Zap, AlertCircle } from 'lucide-react';

export const AedReminderBanner: React.FC = () => {
  return (
    <section className="aed-reminder-card" aria-label="AED Instructions">
      <div className="aed-icon-col">
        <div className="aed-badge-icon">
          <Zap size={22} className="text-amber-500 fill-amber-500" />
        </div>
      </div>
      <div className="aed-text-col">
        <div className="aed-title-row">
          <strong className="aed-heading">Send someone for an AED immediately</strong>
          <span className="aed-tag">Defibrillator</span>
        </div>
        <p className="aed-body">
          Shout to any nearby person: <em>"You! Get the nearest AED right now!"</em>
        </p>
        <div className="aed-tip">
          <AlertCircle size={14} className="flex-shrink-0" />
          <span>As soon as the AED arrives, open the lid, turn it ON, and follow its spoken audio prompts. Do not interrupt compressions while fetching it.</span>
        </div>
      </div>
    </section>
  );
};
