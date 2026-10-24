import React, { useState } from 'react';
import { Video, AlertCircle, PlayCircle, HelpCircle, Check, BookOpen } from 'lucide-react';
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
    explanation: "Compressions must still reach at least 2 inches (5 cm) deep at 100–120 BPM in the center of the breastbone. Do not press softer or alter hand placement.",
    tag: "Clinical Standard"
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
    fact: "Firm compressions (at least 2 inches deep) are strictly necessary to pump blood to the brain.",
    explanation: "A cardiac arrest victim is clinically dead without oxygenated blood circulating. While cracked ribs can happen in CPR regardless of gender, bone injuries heal. Cardiac arrest without compressions is 100% fatal.",
    tag: "Physiology"
  },
  {
    id: 4,
    myth: "You must remove all undergarments and bras before starting Hands-Only chest compressions.",
    fact: "Do not delay compressions for clothing. Keep clothes on until an AED arrives.",
    explanation: "You can push directly through normal clothing on the breastbone. Only when an AED arrives do you need to open or cut clothing/bra so the electrode pads make direct contact with skin.",
    tag: "Practical Action"
  }
];

export const LearnPage: React.FC = () => {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="page-container learn-container">
      {/* Page Header */}
      <div className="section-heading">
        <div className="badge-pill mb-2">
          <BookOpen size={14} className="text-rose-600" />
          <span>Educational Guide</span>
        </div>
        <h1 className="page-title">Hands-Only CPR for Women</h1>
        <p className="page-subtitle">
          Watch official instructional guidance and learn why closing the bystander CPR gender gap saves thousands of lives each year.
        </p>
      </div>

      {/* Video Container (Responsive 16:9 iframe with graceful offline/error fallback) */}
      <section className="video-section-card" aria-label="Hands-Only CPR Video Tutorial">
        <div className="video-card-header">
          <div className="video-label-group">
            <Video size={20} className="text-rose-600" />
            <h2 className="video-card-title">American Heart Association — Hands-Only CPR Demo</h2>
          </div>
          <span className="duration-tag">Official AHA BLS</span>
        </div>

        <div className="video-frame-wrapper">
          {!videoError ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/DUaxt8OlT3o?rel=0&modestbranding=1"
              title="AHA Hands-Only CPR for Women"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={() => setVideoError(true)}
              className="cpr-video-iframe"
            />
          ) : (
            <div className="video-offline-fallback">
              <PlayCircle size={48} className="text-rose-600 mb-2" />
              <p className="font-semibold text-slate-800">Video Player Offline / Blocked</p>
              <p className="text-sm text-slate-500 max-w-md">
                If YouTube is blocked or you are offline, see our complete step-by-step illustrated guide below.
              </p>
            </div>
          )}
        </div>

        <div className="video-caption-bar">
          <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
          <p>
            Hands-Only CPR has just 2 steps: <strong>(1) Call 112</strong>, and <strong>(2) Push hard and fast in the center of the chest</strong> to the beat of 100–120 BPM.
          </p>
        </div>
      </section>

      {/* Illustrated Offline Fallback Guide */}
      <section className="guide-steps-card">
        <h2 className="section-subheading">The 3 Essential Steps for Women</h2>
        <div className="guide-steps-grid">
          <div className="guide-step-col">
            <span className="step-counter">1</span>
            <h3>Hand Placement</h3>
            <p>
              Place the heel of your hand right between the breasts in the center of the chest (the breastbone). Interlock your other hand on top.
            </p>
          </div>
          <div className="guide-step-col">
            <span className="step-counter">2</span>
            <h3>Push Hard & Fast</h3>
            <p>
              Push straight down at least 2 inches (5 cm) at 110 beats per minute. Let the chest rise completely after every single compression.
            </p>
          </div>
          <div className="guide-step-col">
            <span className="step-counter">3</span>
            <h3>Use AED & Don't Stop</h3>
            <p>
              Send someone for an AED. When it arrives, turn it on and attach pads to bare skin following voice prompts. Continue compressions until medical personnel arrive.
            </p>
          </div>
        </div>
      </section>

      {/* Women's CPR Myth-Busting Section */}
      <section className="myths-section" aria-label="Myth-Busting and Facts">
        <div className="myths-header">
          <HelpCircle size={22} className="text-rose-600" />
          <h2 className="section-subheading">Debunking Rescuer Hesitation & Myths</h2>
        </div>

        <div className="myths-grid">
          {myths.map((item) => (
            <article key={item.id} className="myth-card">
              <div className="myth-tag-row">
                <span className="myth-badge">Myth #{item.id}</span>
                <span className="category-tag">{item.tag}</span>
              </div>
              <h3 className="myth-statement">"{item.myth}"</h3>
              <div className="fact-statement">
                <Check size={18} className="text-emerald-600 flex-shrink-0" />
                <span><strong>The Reality:</strong> {item.fact}</span>
              </div>
              <p className="fact-explanation">{item.explanation}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Interactive Try CPR Button */}
      <div className="practice-cta-card">
        <div>
          <h3>Ready to test the 110 BPM metronome rhythm?</h3>
          <p>Practice matching compressions with our synchronized audio and visual pulse tool.</p>
        </div>
        <Link to="/cpr" className="btn-primary-action">
          Open Emergency Metronome &rarr;
        </Link>
      </div>
    </div>
  );
};
