import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Activity, Heart, ShieldCheck, ArrowRight, Zap, Scale, HandHeart } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="page-container landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="badge-pill">
          <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
          <span>Women-Centred CPR Emergency Guidance</span>
        </div>
        <h1 className="hero-title">
          Clear steps. Faster action.<br />
          <span className="hero-accent">CPR guidance with women in mind.</span>
        </h1>
        <p className="hero-subtitle">
          When an adult collapses, every second counts. CPR on a woman is performed the same way as on a man. Act immediately without hesitation.
        </p>
      </section>

      {/* The Two Front Doors */}
      <section className="doors-grid" aria-label="Emergency Action Pathways">
        {/* Card A: Help Me Decide */}
        <Link to="/decide" className="action-card card-decide" id="door-decide-btn">
          <div className="card-header">
            <div className="icon-wrapper icon-decide">
              <HelpCircle size={32} />
            </div>
            <span className="urgency-tag tag-decide">For Hesitant Rescuers</span>
          </div>
          <h2 className="card-title">Help me decide</h2>
          <p className="card-description">
            Not sure if the person is responsive or breathing? We will guide you through simple observable checks to take the safest next step.
          </p>
          <div className="card-action-link link-decide">
            <span>Start simple checks</span>
            <ArrowRight size={20} className="arrow-icon" />
          </div>
        </Link>

        {/* Card B: I Know CPR is Needed */}
        <Link to="/cpr" className="action-card card-cpr" id="door-cpr-btn">
          <div className="card-header">
            <div className="icon-wrapper icon-cpr">
              <Activity size={32} />
            </div>
            <span className="urgency-tag tag-emergency">Immediate Action</span>
          </div>
          <h2 className="card-title">I know CPR is needed</h2>
          <p className="card-description">
            Person is unresponsive and not breathing normally. Go straight to the 110 BPM metronome, live session timer, and Hands-Only CPR steps.
          </p>
          <div className="card-action-link link-cpr">
            <span>Launch CPR metronome & timer</span>
            <ArrowRight size={20} className="arrow-icon" />
          </div>
        </Link>
      </section>

      {/* Quick Awareness Strip (Phase 3 Requirement: 3 core insights why CPR is delayed for women) */}
      <section className="reassurance-strip" aria-label="Why Bystander CPR is Delayed for Women">
        <div className="reassurance-header-row">
          <Scale size={20} className="text-rose-600" />
          <h3>Why Bystander CPR is Delayed for Women — And Why You Should Act</h3>
        </div>

        <div className="awareness-cards-grid">
          {/* Item 1 */}
          <div className="reassurance-item">
            <div className="reassurance-icon-box">
              <HandHeart size={22} className="text-rose-600" />
            </div>
            <div>
              <strong>Fear of Touching Chest</strong>
              <p>
                Bystanders often hesitate due to modesty or fear of touching a woman's chest. Hand placement is on the center of the breastbone—the same as for men.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="reassurance-item">
            <div className="reassurance-icon-box">
              <Zap size={22} className="text-rose-600" />
            </div>
            <div>
              <strong>Fear of Causing Physical Harm</strong>
              <p>
                Cardiac arrest is always fatal without intervention. Broken ribs can heal, but lack of oxygen causes permanent brain death within 4 minutes.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="reassurance-item">
            <div className="reassurance-icon-box">
              <ShieldCheck size={22} className="text-rose-600" />
            </div>
            <div>
              <strong>Good Samaritan Legal Protection</strong>
              <p>
                In India and internationally, Good Samaritan laws grant full civil and criminal legal protection to anyone providing emergency life-saving CPR in good faith.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Footnote */}
      <div className="landing-quick-links">
        <Link to="/learn" className="quick-learn-card">
          <span>Want to learn before an emergency? Watch our AHA tutorial & myth-busters &rarr;</span>
        </Link>
      </div>
    </div>
  );
};
