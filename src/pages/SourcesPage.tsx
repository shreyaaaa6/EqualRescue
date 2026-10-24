import React from 'react';
import { ExternalLink, ShieldAlert, BookOpen } from 'lucide-react';

export const SourcesPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="section-heading">
        <h1 className="page-title">Clinical Sources & Safety</h1>
        <p className="page-subtitle">
          EqualRescue is built upon reviewed guidelines from international and national resuscitation authorities.
        </p>
      </div>

      <div className="notice-box">
        <ShieldAlert size={22} className="text-amber-600 flex-shrink-0" />
        <div>
          <strong>Medical Prototype Notice</strong>
          <p>
            EqualRescue is an educational guidance prototype and does not replace emergency dispatchers, clinical diagnosis, or certified BLS training. Always follow dispatcher instructions over phone.
          </p>
        </div>
      </div>

      <div className="sources-list">
        <h2>Key Guidelines & Research</h2>

        <div className="source-card">
          <BookOpen size={20} className="text-rose-600 flex-shrink-0" />
          <div className="source-details">
            <h3>American Heart Association (AHA) CPR & ECC Guidelines</h3>
            <p>Adult Basic Life Support and CPR Quality guidelines.</p>
            <a href="https://cpr.heart.org" target="_blank" rel="noreferrer" className="source-link">
              <span>cpr.heart.org</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div className="source-card">
          <BookOpen size={20} className="text-rose-600 flex-shrink-0" />
          <div className="source-details">
            <h3>Government of India — ERSS 112</h3>
            <p>Unified emergency response number across all states and union territories in India.</p>
            <a href="https://112.gov.in" target="_blank" rel="noreferrer" className="source-link">
              <span>112.gov.in</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
