import React, { useState } from 'react';
import { Video, Check, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MythItem {
  id: number;
  myth: string;
  fact: string;
  explanation: string;
  tag: string;
}

const myths: MythItem[] = [
  {
    id: 1,
    myth: "CPR on women requires different techniques or softer pushes.",
    fact: "Standard adult CPR is 100% identical for all sexes.",
    explanation: "Compressions must still reach 5 to 6 cm (at least 2 inches) deep at 100–120 BPM in the center of the breastbone. Do not press softer or alter hand placement.",
    tag: "Clinical Technique"
  },
  {
    id: 2,
    myth: "Touching a woman's chest in an emergency will lead to legal accusations or harassment charges.",
    fact: "Good Samaritan laws protect you from civil and criminal liability when saving a life.",
    explanation: "In India, Supreme Court guidelines and the Motor Vehicles Amendment explicitly protect Good Samaritans. You cannot be detained, sued, or questioned against your will for providing life-saving CPR in good faith.",
    tag: "Legal Protection"
  },
  {
    id: 3,
    myth: "Women are too fragile for firm chest compressions.",
    fact: "Firm compressions are strictly necessary to pump blood to the brain.",
    explanation: "A cardiac arrest victim is clinically dead without oxygenated blood circulating. While cracked ribs can happen in CPR regardless of gender, bone injuries heal. Untreated cardiac arrest is 100% fatal within minutes.",
    tag: "Physiology"
  },
  {
    id: 4,
    myth: "You must remove all undergarments and bras before starting chest compressions.",
    fact: "Do not delay compressions for clothing. Keep clothes on until an AED arrives.",
    explanation: "Push directly through ordinary clothing on the breastbone. Only when an AED arrives do you need to open or cut clothing so electrode pads make direct skin contact.",
    tag: "Practical Action"
  }
];

export const LearnPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'watch' | 'myths'>('watch');
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="learn-hub-container">
      {/* Editorial Header */}
      <header className="learn-header">
        <h1 className="learn-title">Hands-Only CPR for Women</h1>
        <p className="learn-lead">
          Official instructional guidance and myth-busting to eliminate hesitation and save lives.
        </p>
      </header>

      {/* Segmented Control */}
      <div className="segmented-control" role="tablist" aria-label="Learn Content Tabs">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'watch'}
          className={`segment-btn ${activeTab === 'watch' ? 'active' : ''}`}
          onClick={() => setActiveTab('watch')}
        >
          Watch Tutorial
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'myths'}
          className={`segment-btn ${activeTab === 'myths' ? 'active' : ''}`}
          onClick={() => setActiveTab('myths')}
        >
          Myths & Facts (4)
        </button>
      </div>

      {/* Tab 1: Watch (AHA video + Offline 3-Step Fallback) */}
      {activeTab === 'watch' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <section className="learn-video-card" aria-label="Hands-Only CPR Video">
            <div className="video-ratio-box">
              {!videoError ? (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/DUaxt8OlT3o?rel=0&modestbranding=1"
                  title="AHA Hands-Only CPR for Women"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => setVideoError(true)}
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', padding: '20px', textAlign: 'center' }}>
                  <Video size={40} style={{ marginBottom: '8px' }} />
                  <p style={{ fontWeight: 600 }}>Video Offline</p>
                  <p style={{ fontSize: 'var(--text-xs)' }}>See the 3-step illustrated instructions below.</p>
                </div>
              )}
            </div>
            <div className="video-caption-bar">
              American Heart Association official Hands-Only CPR demo. In an emergency: (1) Call 112, (2) Push hard and fast in the center of the chest.
            </div>
          </section>

          {/* 3 Essential Steps Fallback */}
          <section aria-label="3-Step CPR Technique">
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>
              The 3 Essential Steps
            </h2>
            <div className="offline-steps-group">
              <div className="offline-step-card">
                <span className="step-num-badge">1</span>
                <div>
                  <h4>Center of the Chest</h4>
                  <p>Place the heel of one hand on the breastbone (between breasts). Interlock your other hand on top. Keep shoulders directly above hands.</p>
                </div>
              </div>

              <div className="offline-step-card">
                <span className="step-num-badge">2</span>
                <div>
                  <h4>Push Hard & Fast (110 BPM)</h4>
                  <p>Compress straight down 5 to 6 cm at 100–120 beats per minute. Allow complete chest recoil after every push.</p>
                </div>
              </div>

              <div className="offline-step-card">
                <span className="step-num-badge">3</span>
                <div>
                  <h4>AED & Continuous Cycles</h4>
                  <p>Send a bystander for an automated external defibrillator (AED). Keep compressing until emergency responders take over.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab 2: Myths & Facts (Accordion/Cards) */}
      {activeTab === 'myths' && (
        <section className="myths-accordion-stack" aria-label="Debunking CPR Hesitations">
          {myths.map((item) => (
            <article key={item.id} className="myth-card-clean">
              <span className="myth-category-pill">{item.tag}</span>
              <h3 className="myth-quote">"{item.myth}"</h3>
              <div className="myth-truth">
                <Check size={16} strokeWidth={2.5} className="flex-shrink-0" />
                <span>{item.fact}</span>
              </div>
              <p className="myth-explanation">{item.explanation}</p>
            </article>
          ))}
        </section>
      )}

      {/* Practice Callout */}
      <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-5)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}>
        <div>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: '2px' }}>Practice with 110 BPM rhythm</h3>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>Familiarize yourself with CPR metronome audio and timing.</p>
        </div>
        <Link to="/cpr" className="btn-call-112-urgent" style={{ textDecoration: 'none', backgroundColor: 'var(--brand-plum)' }}>
          <Activity size={16} />
          <span>Try CPR</span>
        </Link>
      </div>
    </div>
  );
};

