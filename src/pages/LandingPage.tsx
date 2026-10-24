import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Activity, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="page-container">
      <section className="hero-section">
        <div className="badge-pill">
          <Heart size={14} className="text-rose-500 fill-rose-500" />
          <span>Women-Centred CPR Guidance</span>
        </div>
        <h1 className="hero-title">
          Clear steps. Faster action.<br />
          <span className="hero-accent">CPR guidance with women in mind.</span>
        </h1>
        <p className="hero-subtitle">
          When an adult collapses, every second counts. Don't hesitate—standard CPR technique on a woman is the same as on a man.
        </p>
      </section>

      {/* Two Front Doors */}
      <section className="doors-grid">
        <Link to="/decide" className="action-card card-decide">
          <div className="card-header">
            <div className="icon-wrapper bg-amber-100 text-amber-700">
              <HelpCircle size={28} />
            </div>
            <span className="urgency-tag">Unsure what to do?</span>
          </div>
          <h2 className="card-title">Help me decide</h2>
          <p className="card-description">
            Quick 2-question guide to check if the person is responsive and breathing normally before taking action.
          </p>
          <div className="card-action-link">
            <span>Start decision flow</span>
            <ArrowRight size={18} />
          </div>
        </Link>

        <Link to="/cpr" className="action-card card-cpr">
          <div className="card-header">
            <div className="icon-wrapper bg-rose-100 text-rose-700">
              <Activity size={28} />
            </div>
            <span className="urgency-tag tag-emergency">Immediate Action</span>
          </div>
          <h2 className="card-title">I know CPR is needed</h2>
          <p className="card-description">
            Person is unresponsive and not breathing normally. Go straight to the 110 bpm metronome, timer & compressions guide.
          </p>
          <div className="card-action-link">
            <span>Start CPR guidance</span>
            <ArrowRight size={18} />
          </div>
        </Link>
      </section>

      {/* Quick reassurance strip */}
      <section className="reassurance-strip">
        <div className="reassurance-item">
          <ShieldCheck size={20} className="text-rose-600" />
          <div>
            <strong>Same Technique</strong>
            <p>Push hard and fast in the center of the chest. Technique is identical for women and men.</p>
          </div>
        </div>
        <div className="reassurance-item">
          <ShieldCheck size={20} className="text-rose-600" />
          <div>
            <strong>Good Samaritan Protection</strong>
            <p>You are legally protected when providing emergency assistance to save a life.</p>
          </div>
        </div>
        <div className="reassurance-item">
          <ShieldCheck size={20} className="text-rose-600" />
          <div>
            <strong>Zero Login Required</strong>
            <p>No downloads, accounts, or friction. Immediate web browser access anywhere via QR code.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
