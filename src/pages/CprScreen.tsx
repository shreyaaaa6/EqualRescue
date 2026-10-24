import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, AlertTriangle } from 'lucide-react';

export const CprScreen: React.FC = () => {
  return (
    <div className="page-container cpr-page-container">
      <div className="page-header-nav">
        <Link to="/decide" className="back-link">
          <ArrowLeft size={18} />
          <span>Return to Guidance</span>
        </Link>
      </div>

      {/* AED Alert Banner */}
      <div className="aed-banner">
        <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
        <div>
          <strong>Send someone for an AED immediately.</strong>
          <p>When it arrives, turn it on and follow its spoken voice instructions.</p>
        </div>
      </div>

      <div className="cpr-main-panel">
        <div className="timer-display">
          <span className="timer-label">Elapsed Time</span>
          <span className="timer-digits">00:00</span>
        </div>

        {/* Metronome Beat Area */}
        <div className="beat-circle-wrapper">
          <div className="beat-circle">
            <span className="bpm-number">110</span>
            <span className="bpm-label">BPM</span>
          </div>
        </div>

        <div className="cpr-controls">
          <button className="btn-primary-action">
            <Play size={20} />
            <span>Start Metronome & Timer</span>
          </button>
        </div>

        <div className="cpr-instructions-summary">
          <h3>Hands-Only CPR Instructions</h3>
          <ol>
            <li><strong>Place hands:</strong> Center of chest, between the breasts.</li>
            <li><strong>Push hard and fast:</strong> 2 inches (5 cm) deep at 100–120 beats per minute.</li>
            <li><strong>Allow complete recoil:</strong> Let the chest rise completely between compressions.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
