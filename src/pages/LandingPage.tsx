import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      {/* Short Editorial Hero */}
      <section className="hero-editorial">
        <h1 className="hero-headline">
          CPR guidance with women in mind.
        </h1>
        <p className="hero-support">
          When someone collapses, every second counts. CPR technique is identical for women and men — act immediately without hesitation.
        </p>
      </section>

      {/* The Two Clearly Different Doors */}
      <section className="doors-stack" aria-label="Emergency Action Pathways">
        {/* Dominant Primary Door: Start CPR now */}
        <Link to="/cpr" className="door-card-primary" id="door-cpr-btn">
          <div className="door-content">
            <h2>Start CPR now</h2>
            <p>Person is unresponsive and not breathing normally. 110 BPM metronome and timer.</p>
          </div>
          <div className="door-arrow" aria-hidden="true">
            <ArrowRight size={24} strokeWidth={2.5} />
          </div>
        </Link>

        {/* Calm Secondary Door: Help me decide */}
        <Link to="/decide" className="door-card-secondary" id="door-decide-btn">
          <div className="door-content">
            <h2>Help me decide</h2>
            <p>Not sure if CPR is needed? Simple checks to guide the right next step.</p>
          </div>
          <div className="door-arrow" aria-hidden="true">
            <ArrowRight size={20} strokeWidth={2} />
          </div>
        </Link>
      </section>

      {/* One single line of reassurance and quiet link to Learn */}
      <div className="landing-reassurance-row">
        <ShieldCheck size={18} strokeWidth={2} className="flex-shrink-0" style={{ color: 'var(--brand-plum)' }} />
        <p>
          Push through clothing in the center of the breastbone. Good Samaritan laws provide full legal protection.{' '}
          <Link to="/learn">Learn why hesitation happens &rarr;</Link>
        </p>
      </div>
    </div>
  );
};

