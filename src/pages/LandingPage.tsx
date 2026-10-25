import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Scale, HandHeart, Zap } from 'lucide-react';

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

        {/* Educational Door: Learn */}
        <Link to="/learn" className="door-card-learn" id="door-learn-btn" aria-label="Learn how to perform CPR on women with confidence">
          <div className="door-content">
            <div className="door-title-row">
              <span className="door-tag-badge">Advance Preparation</span>
              <h2>Learn</h2>
            </div>
            <p>Learn how to perform CPR on women with confidence.</p>
          </div>
          <div className="door-cta-badge">
            <span className="door-cta-label">Start Learning</span>
            <div className="door-arrow-circle" aria-hidden="true">
              <ArrowRight size={18} strokeWidth={2.5} />
            </div>
          </div>
        </Link>
      </section>

      {/* Why Bystander CPR is Delayed for Women Card Section */}
      <section className="bystander-delay-card" aria-label="Why Bystander CPR is Delayed for Women">
        <div className="bystander-delay-header">
          <Scale size={22} className="bystander-scale-icon" />
          <h2 className="bystander-delay-title">
            Why Bystander CPR is Delayed for Women — And Why You Should Act
          </h2>
        </div>

        <div className="bystander-reasons-grid">
          {/* Card 1: Fear of Touching Chest */}
          <div className="bystander-reason-card">
            <div className="reason-icon-wrapper">
              <HandHeart size={20} />
            </div>
            <h3 className="reason-card-title">Fear of Touching Chest</h3>
            <p className="reason-card-desc">
              Bystanders often hesitate due to modesty or fear of touching a woman's chest. Hand placement is on the center of the breastbone—the same as for men.
            </p>
          </div>

          {/* Card 2: Fear of Causing Physical Harm */}
          <div className="bystander-reason-card">
            <div className="reason-icon-wrapper">
              <Zap size={20} />
            </div>
            <h3 className="reason-card-title">Fear of Causing Physical Harm</h3>
            <p className="reason-card-desc">
              Cardiac arrest is always fatal without intervention. Broken ribs can heal, but lack of oxygen causes permanent brain death within 4 minutes.
            </p>
          </div>

          {/* Card 3: Good Samaritan Legal Protection */}
          <div className="bystander-reason-card">
            <div className="reason-icon-wrapper">
              <ShieldCheck size={20} />
            </div>
            <h3 className="reason-card-title">Good Samaritan Legal Protection</h3>
            <p className="reason-card-desc">
              In India and internationally, Good Samaritan laws grant full civil and criminal legal protection to anyone providing emergency life-saving CPR in good faith.
            </p>
          </div>
        </div>
      </section>

      {/* One single line of reassurance */}
      <div className="landing-reassurance-row">
        <ShieldCheck size={18} strokeWidth={2} className="flex-shrink-0" style={{ color: 'var(--brand-plum)' }} />
        <p>
          Push through clothing in the center of the breastbone. Good Samaritan laws provide full legal protection.
        </p>
      </div>
    </div>
  );
};

