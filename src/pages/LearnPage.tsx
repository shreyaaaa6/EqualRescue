import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  PhoneCall,
  Activity,
  Heart,
  Zap,
  Eye,
  ExternalLink,
  Volume2,
  VolumeX,
  Layers,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const LearnPage: React.FC = () => {
  // Navigation: Step 1 to 6, or 'all'
  const [activeStep, setActiveStep] = useState<number>(1);
  const [viewAll, setViewAll] = useState<boolean>(false);

  // Audio metronome test state for Section 3
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const metronomeTimerRef = useRef<number | null>(null);

  // Stop audio on unmount or tab change
  useEffect(() => {
    return () => {
      if (metronomeTimerRef.current) {
        window.clearInterval(metronomeTimerRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleMetronomeSample = () => {
    if (isPlayingAudio) {
      if (metronomeTimerRef.current) {
        window.clearInterval(metronomeTimerRef.current);
        metronomeTimerRef.current = null;
      }
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const playBeep = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + 0.08);
      };

      playBeep();
      // 110 BPM = 60,000 / 110 = 545.45 ms
      metronomeTimerRef.current = window.setInterval(playBeep, 545);
      setIsPlayingAudio(true);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const stepsMeta = [
    { id: 1, title: 'Introduction', short: 'Overview' },
    { id: 2, title: 'Hand Placement', short: 'Placement' },
    { id: 3, title: 'Chest Compressions', short: 'Compressions' },
    { id: 4, title: 'Rescue Breaths & 30:2', short: '30:2 & Breaths' },
    { id: 5, title: 'Clothing, Modesty & AED', short: 'Modesty & AED' },
    { id: 6, title: 'Video Demonstration', short: 'Watch Video' },
  ];

  const handleNext = () => {
    if (activeStep < 6) {
      setActiveStep(activeStep + 1);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  return (
    <div className="learn-page-container">
      {/* Top Urgent Emergency Alert Banner */}
      <aside className="learn-emergency-banner" role="alert" aria-label="Emergency warning">
        <div className="learn-emergency-content">
          <div className="emergency-icon-tag">
            <ShieldAlert size={20} className="text-amber-warning" />
            <span>
              <strong>Educational Practice Tutorial:</strong> This guide prepares you in advance. If someone has collapsed right now and is unresponsive, call <strong>112</strong> immediately and switch to the live emergency tools.
            </span>
          </div>
          <div className="learn-emergency-actions">
            <Link to="/cpr" className="btn-learn-emergency-primary" id="learn-go-cpr-btn">
              <Activity size={16} />
              <span>Start CPR Screen</span>
            </Link>
            <Link to="/decide" className="btn-learn-emergency-secondary" id="learn-go-decide-btn">
              <span>Help Me Decide</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Page Editorial Header */}
      <header className="learn-header">
        <div className="learn-header-pill">
          <Heart size={14} className="fill-brand-plum text-brand-plum" />
          <span>PulseHer Educational Masterclass</span>
        </div>
        <h1 className="learn-title">How to Perform CPR on a Woman</h1>
        <p className="learn-lead">
          Medically grounded guidance, anatomical hand placement, and hesitation-free techniques to save lives with confidence.
        </p>

        {/* View Mode Toggle & Quick Step Navigation */}
        <div className="learn-nav-toolbar">
          <div className="learn-stepper-tabs" role="tablist" aria-label="Tutorial Sections">
            {stepsMeta.map((step) => (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={!viewAll && activeStep === step.id}
                className={`learn-step-btn ${!viewAll && activeStep === step.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveStep(step.id);
                  if (viewAll) {
                    const el = document.getElementById(`learn-section-${step.id}`);
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="step-btn-num">{step.id}</span>
                <span className="step-btn-title">{step.short}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn-mode-toggle"
            onClick={() => setViewAll(!viewAll)}
            aria-pressed={viewAll}
          >
            <Layers size={15} />
            <span>{viewAll ? 'Switch to Step-by-Step' : 'View All on One Page'}</span>
          </button>
        </div>
      </header>

      {/* Main Educational Sections */}
      <main className="learn-sections-stack">
        {/* =========================================================================
            SECTION 1: INTRODUCTION & WHEN TO ACT
            ========================================================================= */}
        {(viewAll || activeStep === 1) && (
          <section
            id="learn-section-1"
            className="learn-card-section"
            aria-label="Section 1: Introduction and when to act"
          >
            <div className="section-header-row">
              <span className="section-badge">Section 1 of 6</span>
              <h2 className="section-heading">Introduction: Overcoming Hesitation & When to Act</h2>
            </div>

            <div className="learn-grid-2col">
              <div className="section-text-col">
                <p className="section-prose-lead">
                  Standard adult CPR technique is <strong>identical for women and men</strong>. Resuscitation guidelines do not alter compression mechanics because of a person’s biological sex.
                </p>

                <div className="reassurance-quote-box">
                  <ShieldCheck size={24} className="reassurance-quote-icon" />
                  <div>
                    <h3 className="quote-box-title">Touching the chest should never delay action</h3>
                    <p className="quote-box-text">
                      Fear of touching a woman’s chest, fear of causing legal accusations, or modesty worries cause life-threatening delays. Cardiac arrest is 100% fatal without bystander CPR. Every minute CPR is delayed decreases survival by 7% to 10%.
                    </p>
                  </div>
                </div>

                <div className="checklist-stack">
                  <h3 className="checklist-title">When is CPR required?</h3>
                  <div className="check-item">
                    <CheckCircle2 size={18} className="text-success-green flex-shrink-0" />
                    <p>
                      <strong>Unresponsive:</strong> The person does not respond when you tap their shoulders firmly and shout loudly (&quot;Are you okay?&quot;).
                    </p>
                  </div>
                  <div className="check-item">
                    <CheckCircle2 size={18} className="text-success-green flex-shrink-0" />
                    <p>
                      <strong>Not breathing normally:</strong> The person is not breathing, or is only gasping / making occasional gurgling sounds (agonal breathing). Gasping is a sign of cardiac arrest, not normal breathing.
                    </p>
                  </div>
                </div>

                <div className="emergency-protocol-callout">
                  <div className="callout-header">
                    <PhoneCall size={18} className="text-rose-600" />
                    <h4>Emergency Protocol in India</h4>
                  </div>
                  <ol className="emergency-steps-list">
                    <li>Call <strong>112</strong> immediately (Emergency Response Support System).</li>
                    <li>Put your phone on <strong>speakerphone</strong> next to you so your hands stay free.</li>
                    <li>Tell a bystander: <em>&quot;You, call 112 and bring an AED (defibrillator) if one is nearby.&quot;</em></li>
                    <li>Follow the emergency dispatcher’s guidance without leaving the person.</li>
                  </ol>
                </div>
              </div>

              {/* Visual Demonstration: Chain of Survival */}
              <div className="section-visual-col">
                <div className="learn-svg-wrapper">
                  <svg
                    viewBox="0 0 420 380"
                    className="learn-diagram-svg"
                    role="img"
                    aria-label="Chain of Survival Diagram: Check, Call 112, Center of Chest, AED"
                  >
                    <rect width="420" height="380" rx="16" fill="var(--bg-subtle)" />
                    
                    {/* Step 1 Node */}
                    <g transform="translate(30, 30)">
                      <rect width="360" height="65" rx="10" fill="#ffffff" stroke="var(--border-subtle)" strokeWidth="1.5" />
                      <circle cx="36" cy="32" r="18" fill="var(--brand-plum-subtle)" stroke="var(--brand-plum-border)" />
                      <text x="36" y="38" textAnchor="middle" fill="var(--brand-plum)" fontWeight="800" fontSize="15">1</text>
                      <text x="70" y="27" fill="var(--text-primary)" fontWeight="700" fontSize="14">Check Responsiveness & Breathing</text>
                      <text x="70" y="48" fill="var(--text-secondary)" fontSize="12">Tap shoulders firmly. Look for chest rise (&lt;10s).</text>
                    </g>

                    {/* Step 2 Node */}
                    <g transform="translate(30, 110)">
                      <rect width="360" height="65" rx="10" fill="#ffffff" stroke="var(--border-subtle)" strokeWidth="1.5" />
                      <circle cx="36" cy="32" r="18" fill="var(--urgent-red-subtle)" stroke="var(--urgent-red-border)" />
                      <text x="36" y="38" textAnchor="middle" fill="var(--urgent-red)" fontWeight="800" fontSize="15">2</text>
                      <text x="70" y="27" fill="var(--text-primary)" fontWeight="700" fontSize="14">Call 112 on Speakerphone</text>
                      <text x="70" y="48" fill="var(--text-secondary)" fontSize="12">Get dispatcher support. Send someone for an AED.</text>
                    </g>

                    {/* Step 3 Node */}
                    <g transform="translate(30, 190)">
                      <rect width="360" height="75" rx="10" fill="#fcf2f4" stroke="var(--brand-plum-border)" strokeWidth="2" />
                      <circle cx="36" cy="37" r="18" fill="var(--brand-plum)" />
                      <text x="36" y="43" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="15">3</text>
                      <text x="70" y="28" fill="var(--brand-plum)" fontWeight="800" fontSize="14">Push Hard & Fast on Sternum</text>
                      <text x="70" y="47" fill="var(--text-secondary)" fontSize="12">Centre of chest on breastbone (lower half).</text>
                      <text x="70" y="63" fill="var(--text-secondary)" fontSize="12">100–120 BPM, 5–6 cm depth.</text>
                    </g>

                    {/* Step 4 Node */}
                    <g transform="translate(30, 280)">
                      <rect width="360" height="65" rx="10" fill="#ffffff" stroke="var(--border-subtle)" strokeWidth="1.5" />
                      <circle cx="36" cy="32" r="18" fill="var(--success-subtle)" stroke="var(--success-border)" />
                      <text x="36" y="38" textAnchor="middle" fill="var(--success-green)" fontWeight="800" fontSize="15">4</text>
                      <text x="70" y="27" fill="var(--text-primary)" fontWeight="700" fontSize="14">Deploy AED as Soon as Available</text>
                      <text x="70" y="48" fill="var(--text-secondary)" fontSize="12">Turn on AED and follow spoken verbal prompts.</text>
                    </g>
                  </svg>
                  <p className="svg-caption">Universal adult cardiac arrest chain of survival.</p>
                </div>
              </div>
            </div>

            {!viewAll && (
              <div className="section-pager-footer">
                <div />
                <button type="button" className="btn-pager-next" onClick={handleNext}>
                  <span>Next: Correct Hand Placement</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </section>
        )}

        {/* =========================================================================
            SECTION 2: CORRECT HAND PLACEMENT
            ========================================================================= */}
        {(viewAll || activeStep === 2) && (
          <section
            id="learn-section-2"
            className="learn-card-section"
            aria-label="Section 2: Correct hand placement"
          >
            <div className="section-header-row">
              <span className="section-badge">Section 2 of 6</span>
              <h2 className="section-heading">Correct Hand Placement on a Woman</h2>
            </div>

            <div className="learn-grid-2col">
              <div className="section-text-col">
                <p className="section-prose-lead">
                  Hand placement on a woman is on the <strong>centre of the chest, on the lower half of the breastbone (sternum)</strong>. This is the exact same anatomical landmark used for men.
                </p>

                <div className="action-steps-callout">
                  <div className="instruction-step-item">
                    <span className="step-circle-badge">A</span>
                    <div>
                      <h4 className="instruction-title">Kneel beside the chest on a firm, flat surface</h4>
                      <p className="instruction-desc">
                        Ensure the person is lying flat on their back on the floor or ground (never on a soft mattress or couch). Kneel close to their chest with your knees hip-width apart.
                      </p>
                    </div>
                  </div>

                  <div className="instruction-step-item">
                    <span className="step-circle-badge">B</span>
                    <div>
                      <h4 className="instruction-title">Place the heel of one hand in the centre of the chest</h4>
                      <p className="instruction-desc">
                        Position the heel of your primary hand on the lower half of the breastbone (the flat bone in the centre of the ribcage, midway between breasts).
                      </p>
                    </div>
                  </div>

                  <div className="instruction-step-item">
                    <span className="step-circle-badge">C</span>
                    <div>
                      <h4 className="instruction-title">Interlock fingers and lift them off the ribs</h4>
                      <p className="instruction-desc">
                        Place the heel of your other hand directly on top. Interlock your fingers and curl them upwards so only the heel rests on the breastbone. Do not press onto the ribs.
                      </p>
                    </div>
                  </div>

                  <div className="instruction-step-item">
                    <span className="step-circle-badge">D</span>
                    <div>
                      <h4 className="instruction-title">Lock elbows straight and position shoulders above hands</h4>
                      <p className="instruction-desc">
                        Lean forward so your shoulders are directly over your hands. Keep your arms locked completely straight so compressions come from your upper body weight, not tired arm muscles.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="warning-reminder-box">
                  <AlertCircle size={20} className="text-brand-plum flex-shrink-0" />
                  <p>
                    <strong>Key Medical Reminder:</strong> &quot;Press in the centre of the chest, on the lower half of the breastbone — not on the ribs or abdomen.&quot;
                  </p>
                </div>

                {/* DOs and DONTs */}
                <div className="dos-donts-grid">
                  <div className="do-card">
                    <div className="do-card-header">
                      <CheckCircle2 size={16} className="text-success-green" />
                      <span>DO</span>
                    </div>
                    <ul>
                      <li>Press on the hard breastbone in the centre.</li>
                      <li>Push straight through everyday clothing.</li>
                      <li>Lift your fingers off the ribcage.</li>
                    </ul>
                  </div>
                  <div className="dont-card">
                    <div className="dont-card-header">
                      <XCircle size={16} className="text-rose-600" />
                      <span>DO NOT</span>
                    </div>
                    <ul>
                      <li>Do not press on breast tissue or sides.</li>
                      <li>Do not press on the ribs or soft stomach/abdomen.</li>
                      <li>Do not bend your elbows during compressions.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Medically Accurate Overhead SVG Illustration */}
              <div className="section-visual-col">
                <div className="learn-svg-wrapper">
                  <svg
                    viewBox="0 0 460 480"
                    className="learn-diagram-svg"
                    role="img"
                    aria-label="Illustration showing adult woman lying on firm flat surface with target on lower half of sternum and interlocked hands"
                  >
                    {/* Background Surface */}
                    <rect width="460" height="480" rx="16" fill="var(--bg-subtle)" />
                    
                    {/* Floor Texture Line */}
                    <line x1="20" y1="460" x2="440" y2="460" stroke="var(--border-strong)" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="230" y="474" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontWeight="600">
                      FIRM, FLAT SURFACE (FLOOR / GROUND)
                    </text>

                    {/* Adult Woman Torso in Everyday Casual Attire (Overhead View) */}
                    <g transform="translate(30, 20)">
                      {/* Head / Profile resting back */}
                      <circle cx="200" cy="45" r="32" fill="#fed7aa" stroke="#fb923c" strokeWidth="1.5" />
                      {/* Hair framing face */}
                      <path d="M 168 45 C 165 20, 235 20, 232 45 C 235 70, 215 80, 200 78 C 185 80, 165 70, 168 45 Z" fill="#334155" />
                      {/* Face features (eyes closed, calm) */}
                      <line x1="188" y1="45" x2="195" y2="45" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="205" y1="45" x2="212" y2="45" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M 197 58 Q 200 62 203 58" stroke="#7c2d12" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                      {/* Neck */}
                      <rect x="188" y="75" width="24" height="20" fill="#fed7aa" />

                      {/* Shoulders & Casual Crewneck Top (Teal/Slate) */}
                      <path
                        d="M 120 120 C 130 95, 175 95, 200 95 C 225 95, 270 95, 280 120 L 295 240 C 295 270, 105 270, 105 240 Z"
                        fill="#0e7490"
                        stroke="#0891b2"
                        strokeWidth="2"
                      />
                      {/* Crewneck collar */}
                      <path d="M 180 96 C 185 110, 215 110, 220 96" fill="none" stroke="#fed7aa" strokeWidth="3" />

                      {/* Gentle Anatomical Female Chest Contours (under clothing) */}
                      <ellipse cx="160" cy="175" rx="28" ry="32" fill="#0891b2" opacity="0.35" />
                      <ellipse cx="240" cy="175" rx="28" ry="32" fill="#0891b2" opacity="0.35" />

                      {/* Ribcage Outline (Ghosted reference - DO NOT PRESS) */}
                      <path
                        d="M 140 150 C 130 180, 130 210, 145 230"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                        opacity="0.6"
                      />
                      <path
                        d="M 260 150 C 270 180, 270 210, 255 230"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                        opacity="0.6"
                      />

                      {/* Breastbone / Sternum Lower Half - High Visibility Target Zone */}
                      <rect x="190" y="145" width="20" height="70" rx="8" fill="#ffffff" opacity="0.8" />
                      
                      {/* Concentric Glow Target Ring in Centre of Sternum */}
                      <circle cx="200" cy="180" r="32" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="4 2" />
                      <circle cx="200" cy="180" r="22" fill="#e11d48" opacity="0.2" />
                      <circle cx="200" cy="180" r="10" fill="#e11d48" />

                      {/* Hand Placement Overlaid Illustration */}
                      {/* Bottom Hand (Heel on Target) */}
                      <g transform="translate(165, 140)">
                        {/* Palm heel */}
                        <path
                          d="M 25 35 C 20 50, 45 50, 45 35 L 50 15 C 50 5, 20 5, 20 15 Z"
                          fill="#fde047"
                          stroke="#ca8a04"
                          strokeWidth="2"
                        />
                        {/* Top Hand Interlocking Fingers Curved UP */}
                        <path
                          d="M 15 25 C 10 40, 55 40, 55 25 L 60 5 C 60 -5, 10 -5, 15 5 Z"
                          fill="#fef08a"
                          stroke="#a16207"
                          strokeWidth="2"
                        />
                        {/* Interlocked finger ridges lifted away from ribs */}
                        <path d="M 20 5 C 22 -8, 28 -8, 30 5" fill="none" stroke="#854d0e" strokeWidth="2" />
                        <path d="M 30 5 C 32 -8, 38 -8, 40 5" fill="none" stroke="#854d0e" strokeWidth="2" />
                        <path d="M 40 5 C 42 -8, 48 -8, 50 5" fill="none" stroke="#854d0e" strokeWidth="2" />
                      </g>

                      {/* Anatomical Pointer Callouts */}
                      {/* Target Pointer */}
                      <line x1="200" y1="180" x2="330" y2="155" stroke="#be123c" strokeWidth="2" />
                      <circle cx="330" cy="155" r="4" fill="#be123c" />
                      <rect x="330" y="140" width="105" height="42" rx="6" fill="#ffffff" stroke="#be123c" strokeWidth="1.5" />
                      <text x="382" y="156" textAnchor="middle" fill="#be123c" fontSize="11" fontWeight="800">TARGET ZONE</text>
                      <text x="382" y="172" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Lower half sternum</text>

                      {/* Ribs pointer (avoid) */}
                      <line x1="140" y1="210" x2="40" y2="230" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="40" cy="230" r="3" fill="#64748b" />
                      <rect x="-10" y="215" width="85" height="30" rx="4" fill="#ffffff" stroke="var(--border-strong)" />
                      <text x="32" y="234" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10" fontWeight="600">Ribs (Off-limits)</text>
                    </g>
                  </svg>
                  <p className="svg-caption">
                    Overhead hand placement: heel on lower sternum between breasts, fingers interlocked and lifted off ribs.
                  </p>
                </div>
              </div>
            </div>

            {!viewAll && (
              <div className="section-pager-footer">
                <button type="button" className="btn-pager-prev" onClick={handlePrev}>
                  <ArrowLeft size={18} />
                  <span>Previous</span>
                </button>
                <button type="button" className="btn-pager-next" onClick={handleNext}>
                  <span>Next: Compression Technique</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </section>
        )}

        {/* =========================================================================
            SECTION 3: CHEST COMPRESSIONS TECHNIQUE & DEPTH
            ========================================================================= */}
        {(viewAll || activeStep === 3) && (
          <section
            id="learn-section-3"
            className="learn-card-section"
            aria-label="Section 3: Chest compressions technique"
          >
            <div className="section-header-row">
              <span className="section-badge">Section 3 of 6</span>
              <h2 className="section-heading">Chest Compressions: Rate, Depth & Biomechanics</h2>
            </div>

            <div className="learn-grid-2col">
              <div className="section-text-col">
                <p className="section-prose-lead">
                  Effective chest compressions act as an artificial heart, pumping oxygenated blood to the brain and vital organs. The technique <strong>does not change because the person is a woman</strong>.
                </p>

                {/* 4 Core Clinical Metrics */}
                <div className="metrics-specs-grid">
                  <div className="metric-spec-card">
                    <span className="metric-spec-num">100–120</span>
                    <span className="metric-spec-unit">BPM</span>
                    <h4 className="metric-spec-label">Rate (Pushes Per Minute)</h4>
                    <p className="metric-spec-desc">Rhythm matches the beat of songs like &quot;Stayin&apos; Alive&quot;.</p>
                  </div>

                  <div className="metric-spec-card">
                    <span className="metric-spec-num">5–6 cm</span>
                    <span className="metric-spec-unit">(~2 inches)</span>
                    <h4 className="metric-spec-label">Adult Depth</h4>
                    <p className="metric-spec-desc">Compress at least 5 cm deep to circulate blood effectively.</p>
                  </div>

                  <div className="metric-spec-card">
                    <span className="metric-spec-num">100%</span>
                    <span className="metric-spec-unit">Recoil</span>
                    <h4 className="metric-spec-label">Allow Full Chest Recoil</h4>
                    <p className="metric-spec-desc">Lift weight off chest between pushes so heart can refill.</p>
                  </div>

                  <div className="metric-spec-card">
                    <span className="metric-spec-num">90°</span>
                    <span className="metric-spec-unit">Straight</span>
                    <h4 className="metric-spec-label">Shoulders Over Hands</h4>
                    <p className="metric-spec-desc">Elbows strictly locked. Pivot from hips to prevent fatigue.</p>
                  </div>
                </div>

                {/* Interactive 110 BPM Metronome Audio Test Widget */}
                <div className="metronome-sample-card">
                  <div className="metronome-sample-info">
                    <Activity size={20} className="text-brand-plum animate-pulse" />
                    <div>
                      <h4 className="metronome-sample-title">Experience the 110 BPM Compression Tempo</h4>
                      <p className="metronome-sample-desc">Click below to hear the exact rhythm recommended by AHA guidelines.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleMetronomeSample}
                    className={`btn-sample-metronome ${isPlayingAudio ? 'active' : ''}`}
                    aria-label={isPlayingAudio ? 'Stop metronome audio' : 'Play metronome audio'}
                  >
                    {isPlayingAudio ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    <span>{isPlayingAudio ? 'Stop 110 BPM Click' : 'Hear 110 BPM Beat'}</span>
                  </button>
                </div>

                <div className="prose-sub-block">
                  <h3 className="sub-block-title">Why Firm Compressions Are Safe</h3>
                  <p>
                    A common fear is that pressing hard might break ribs or hurt a woman. In cardiac arrest, the person is clinically deceased without intervention. Fractured ribs heal; lack of blood flow causes irreversible brain death within 4 to 6 minutes. <strong>Push firmly and do not hold back.</strong>
                  </p>
                </div>
              </div>

              {/* Medically Accurate Biomechanics Side View SVG */}
              <div className="section-visual-col">
                <div className="learn-svg-wrapper">
                  <svg
                    viewBox="0 0 540 380"
                    className="learn-diagram-svg"
                    role="img"
                    aria-label="Biomechanics Side View: Rescuer kneeling on floor with locked straight arms and shoulders directly over chest, pushing 5 to 6 cm"
                  >
                    <rect width="540" height="380" rx="16" fill="var(--bg-subtle)" />
                    
                    {/* Firm Floor */}
                    <rect x="0" y="310" width="540" height="70" fill="#334155" />
                    <line x1="0" y1="310" x2="540" y2="310" stroke="#64748b" strokeWidth="2" />
                    <text x="270" y="348" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="700">
                      FIRM, FLAT SURFACE (FLOOR — NEVER ON A BED)
                    </text>

                    {/* Victim (Adult Woman Lying Supine on Floor) */}
                    {/* Head */}
                    <circle cx="80" cy="285" r="24" fill="#fed7aa" stroke="#fb923c" strokeWidth="1.5" />
                    <path d="M 60 280 C 58 260, 95 255, 100 270 C 105 285, 95 305, 68 305 Z" fill="#475569" />
                    {/* Neck */}
                    <rect x="100" y="280" width="22" height="15" fill="#fed7aa" />

                    {/* Torso in casual clothing */}
                    <path d="M 120 285 L 260 285 C 280 285, 290 305, 260 308 L 120 308 Z" fill="#0284c7" />
                    {/* Gentle chest rise profile */}
                    <path d="M 140 285 Q 175 260 220 285" fill="#0284c7" />

                    {/* Legs / Pants */}
                    <path d="M 260 290 L 440 295 L 450 308 L 260 308 Z" fill="#475569" />
                    <ellipse cx="455" cy="305" rx="12" ry="6" fill="#1e293b" />

                    {/* Rescuer Figure (Kneeling, Straight Vertical Arms, Shoulders Over Hands) */}
                    {/* Knees on Floor */}
                    <ellipse cx="330" cy="308" rx="20" ry="10" fill="#1e293b" />
                    {/* Legs bent / thighs */}
                    <path d="M 330 308 L 310 240 L 290 240 L 310 308 Z" fill="#334155" />
                    
                    {/* Rescuer Torso hinged forward at hips */}
                    <path d="M 300 245 L 205 130 L 175 145 L 280 250 Z" fill="#701a35" />
                    
                    {/* Rescuer Head */}
                    <circle cx="185" cy="95" r="22" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                    <path d="M 170 90 C 168 75, 205 75, 202 90 C 205 105, 185 110, 172 108 Z" fill="#1e293b" />

                    {/* Straight Locked Arms (90 Degree Vertical Line) */}
                    <g>
                      {/* Shoulders */}
                      <circle cx="185" cy="135" r="8" fill="#541327" />
                      {/* Both Arms Locked Straight Down directly into Sternum */}
                      <rect x="180" y="135" width="12" height="135" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
                      
                      {/* Hands placed on sternum */}
                      <ellipse cx="186" cy="272" rx="14" ry="8" fill="#ca8a04" />
                    </g>

                    {/* Alignment Guide Lines */}
                    {/* Vertical Shoulders Alignment line */}
                    <line x1="186" y1="70" x2="186" y2="280" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
                    <rect x="120" y="45" width="130" height="26" rx="4" fill="#ffffff" stroke="#dc2626" strokeWidth="1" />
                    <text x="185" y="62" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="700">
                      SHOULDERS OVER HANDS
                    </text>

                    {/* 5-6 cm Depth Indicator Bracket */}
                    <line x1="210" y1="265" x2="210" y2="295" stroke="#0284c7" strokeWidth="2.5" />
                    <line x1="205" y1="265" x2="215" y2="265" stroke="#0284c7" strokeWidth="2.5" />
                    <line x1="205" y1="295" x2="215" y2="295" stroke="#0284c7" strokeWidth="2.5" />
                    <rect x="220" y="265" width="95" height="34" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
                    <text x="267" y="280" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="800">5 TO 6 CM</text>
                    <text x="267" y="293" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">Depth (~2 inches)</text>

                    {/* Locked Elbows Callout */}
                    <rect x="70" y="170" width="100" height="24" rx="4" fill="#ffffff" stroke="var(--border-strong)" />
                    <text x="120" y="186" textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="700">Lock Elbows Straight</text>
                    <line x1="170" y1="182" x2="180" y2="182" stroke="var(--border-strong)" strokeWidth="1.5" />
                  </svg>
                  <p className="svg-caption">
                    Biomechanics: Rescuer uses body weight hinged from the hips with locked elbows to compress 5–6 cm.
                  </p>
                </div>
              </div>
            </div>

            {!viewAll && (
              <div className="section-pager-footer">
                <button type="button" className="btn-pager-prev" onClick={handlePrev}>
                  <ArrowLeft size={18} />
                  <span>Previous</span>
                </button>
                <button type="button" className="btn-pager-next" onClick={handleNext}>
                  <span>Next: 30:2 & Rescue Breaths</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </section>
        )}

        {/* =========================================================================
            SECTION 4: RESCUE BREATHS & THE 30:2 SEQUENCE
            ========================================================================= */}
        {(viewAll || activeStep === 4) && (
          <section
            id="learn-section-4"
            className="learn-card-section"
            aria-label="Section 4: Rescue breaths and the 30:2 sequence"
          >
            <div className="section-header-row">
              <span className="section-badge">Section 4 of 6</span>
              <h2 className="section-heading">Rescue Breaths & the 30:2 Sequence</h2>
            </div>

            <div className="learn-grid-2col">
              <div className="section-text-col">
                <p className="section-prose-lead">
                  Resuscitation science provides two recognized pathways for adult CPR depending on your training and willingness:
                </p>

                {/* Trained vs Untrained Comparison */}
                <div className="protocol-compare-stack">
                  <div className="protocol-card protocol-card-primary">
                    <div className="protocol-badge">Trained Rescuers</div>
                    <h3 className="protocol-title">30 Compressions : 2 Rescue Breaths</h3>
                    <p className="protocol-desc">
                      Rescuers trained and willing to provide rescue breaths perform <strong>30 chest compressions</strong> followed immediately by <strong>2 rescue breaths</strong>, then repeat the 30:2 cycle continuously.
                    </p>
                    <div className="protocol-steps-mini">
                      <span><strong>1.</strong> Give 30 hard and fast compressions.</span>
                      <span><strong>2.</strong> Tilt head back, lift chin to open airway.</span>
                      <span><strong>3.</strong> Pinch nose and blow for 1 second until chest rises.</span>
                      <span><strong>4.</strong> Deliver 2nd breath, then return to compressions in under 10 seconds.</span>
                    </div>
                  </div>

                  <div className="protocol-card protocol-card-secondary">
                    <div className="protocol-badge protocol-badge-neutral">Untrained Bystanders</div>
                    <h3 className="protocol-title">Hands-Only CPR</h3>
                    <p className="protocol-desc">
                      For untrained bystanders responding to sudden adult collapse, <strong>Hands-Only CPR (continuous chest compressions at 100–120 BPM without mouth-to-mouth)</strong> is effective and endorsed by the AHA and emergency dispatchers.
                    </p>
                    <p className="protocol-note">
                      <em>If you are untrained or unable to give breaths, do not stop! Continuous chest compressions without pauses keep oxygenated blood circulating until the ambulance arrives.</em>
                    </p>
                  </div>
                </div>

                <div className="clarification-box">
                  <Heart size={20} className="text-brand-plum flex-shrink-0" />
                  <p>
                    <strong>Note:</strong> PulseHer features both this advance educational tutorial and a live, synchronized 30:2 guided emergency screen with an interactive metronome.
                  </p>
                </div>
              </div>

              {/* Medically Accurate Rescue Breath Diagram (Head-Tilt Chin-Lift) */}
              <div className="section-visual-col">
                <div className="learn-svg-wrapper">
                  <svg
                    viewBox="0 0 460 380"
                    className="learn-diagram-svg"
                    role="img"
                    aria-label="Illustration showing Head-Tilt Chin-Lift technique opening airway and gentle chest rise"
                  >
                    <rect width="460" height="380" rx="16" fill="var(--bg-subtle)" />

                    {/* Step 1: 30:2 Cycle Graphic Banner */}
                    <g transform="translate(30, 20)">
                      <rect width="400" height="55" rx="8" fill="#ffffff" stroke="var(--border-subtle)" />
                      <circle cx="35" cy="28" r="16" fill="var(--brand-plum)" />
                      <text x="35" y="33" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="13">30</text>
                      <text x="60" y="24" fill="var(--text-primary)" fontWeight="700" fontSize="13">Compressions</text>
                      <text x="60" y="40" fill="var(--text-secondary)" fontSize="11">100–120 BPM</text>

                      {/* Arrow */}
                      <path d="M 160 28 L 190 28 M 185 23 L 190 28 L 185 33" stroke="var(--brand-plum)" strokeWidth="2" strokeLinecap="round" />

                      <circle cx="225" cy="28" r="16" fill="#0284c7" />
                      <text x="225" y="33" textAnchor="middle" fill="#ffffff" fontWeight="800" fontSize="13">2</text>
                      <text x="250" y="24" fill="var(--text-primary)" fontWeight="700" fontSize="13">Rescue Breaths</text>
                      <text x="250" y="40" fill="var(--text-secondary)" fontSize="11">1 second each (watch chest rise)</text>

                      {/* Loop back arrow */}
                      <path d="M 370 20 C 390 20, 390 45, 370 45" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="3 2" />
                    </g>

                    {/* Visual: Head Tilt & Chin Lift demonstration */}
                    <g transform="translate(50, 100)">
                      {/* Head tilted backwards on floor */}
                      {/* Airway curve indicator */}
                      <path d="M 120 160 C 130 110, 180 100, 200 130" fill="none" stroke="#38bdf8" strokeWidth="6" strokeDasharray="4 2" opacity="0.6" />
                      
                      {/* Victim Head Profile in Head-Tilt Position */}
                      <circle cx="160" cy="90" r="38" fill="#fed7aa" stroke="#fb923c" strokeWidth="1.5" />
                      {/* Hair */}
                      <path d="M 125 80 C 120 40, 185 40, 195 80 C 200 110, 180 135, 145 130 Z" fill="#334155" />
                      
                      {/* Open Mouth Profile tilted back */}
                      <ellipse cx="195" cy="105" rx="8" ry="6" fill="#be123c" />
                      
                      {/* Rescuer Hand 1: On Forehead (Tilting Head Back) */}
                      <g transform="translate(130, 40)">
                        <ellipse cx="20" cy="15" rx="16" ry="8" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                        <line x1="20" y1="15" x2="40" y2="15" stroke="#ca8a04" strokeWidth="2" />
                        <text x="20" y="-4" textAnchor="middle" fill="var(--brand-plum)" fontSize="10" fontWeight="700">
                          Hand on Forehead (Tilt Back)
                        </text>
                      </g>

                      {/* Rescuer Hand 2: Fingers Under Bony Chin (Lifting Chin Up) */}
                      <g transform="translate(180, 130)">
                        <ellipse cx="15" cy="15" rx="12" ry="7" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                        <text x="50" y="30" fill="var(--brand-plum)" fontSize="10" fontWeight="700">
                          2 Fingers Lift Chin Up
                        </text>
                      </g>

                      {/* Torso & Gentle Chest Rise Profile */}
                      <path d="M 190 145 L 320 180 L 320 220 L 170 220 Z" fill="#0284c7" />
                      {/* Rising chest arc */}
                      <path d="M 210 155 Q 260 135 295 170" fill="none" stroke="#ffffff" strokeWidth="2.5" />
                      <g transform="translate(240, 120)">
                        <rect width="90" height="22" rx="4" fill="#ffffff" stroke="#0284c7" />
                        <text x="45" y="15" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="700">
                          Chest Rises (~1s)
                        </text>
                      </g>
                    </g>
                  </svg>
                  <p className="svg-caption">
                    Airway opening: Head-tilt chin-lift ensures breath enters the lungs, not the stomach.
                  </p>
                </div>
              </div>
            </div>

            {!viewAll && (
              <div className="section-pager-footer">
                <button type="button" className="btn-pager-prev" onClick={handlePrev}>
                  <ArrowLeft size={18} />
                  <span>Previous</span>
                </button>
                <button type="button" className="btn-pager-next" onClick={handleNext}>
                  <span>Next: Clothing, Modesty & AED</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </section>
        )}

        {/* =========================================================================
            SECTION 5: CLOTHING, MODESTY & AED GUIDANCE
            ========================================================================= */}
        {(viewAll || activeStep === 5) && (
          <section
            id="learn-section-5"
            className="learn-card-section"
            aria-label="Section 5: Clothing, modesty and AED guidance"
          >
            <div className="section-header-row">
              <span className="section-badge">Section 5 of 6</span>
              <h2 className="section-heading">Clothing, Modesty & AED Guidance</h2>
            </div>

            <div className="learn-grid-2col">
              <div className="section-text-col">
                <p className="section-prose-lead">
                  Addressing bystander uncertainty around a woman&apos;s clothing and privacy is critical to closing the survival gap.
                </p>

                <div className="hesitation-qa-stack">
                  <div className="qa-card">
                    <div className="qa-q-row">
                      <ShieldCheck size={18} className="text-brand-plum flex-shrink-0" />
                      <h3 className="qa-question">Do I need to remove clothing or a bra before compressions?</h3>
                    </div>
                    <p className="qa-answer">
                      Don&apos;t delay CPR because of clothing. Begin chest compressions promptly. You can start over clothing if necessary, but expose the chest when needed to locate the correct hand position and perform effective compressions.
                    </p>
                  </div>

                  <div className="qa-card">
                    <div className="qa-q-row">
                      <Zap size={18} className="text-amber-warning flex-shrink-0" />
                      <h3 className="qa-question">What happens when an AED arrives?</h3>
                    </div>
                    <p className="qa-answer">
                      An Automated External Defibrillator (AED) requires electrode pads to adhere directly to bare skin:
                    </p>
                    <ul className="qa-bullets">
                      <li>Open, unbutton, or cut clothing <strong>only when the AED is on-scene and ready</strong>.</li>
                      <li>Remove or pull away underwire bras if the wire touches where a pad needs to stick.</li>
                      <li>Dry the skin quickly if damp or sweaty so pads stick firmly.</li>
                    </ul>
                  </div>

                  <div className="qa-card">
                    <div className="qa-q-row">
                      <Eye size={18} className="text-brand-plum flex-shrink-0" />
                      <h3 className="qa-question">How to preserve privacy and dignity without delaying CPR</h3>
                    </div>
                    <p className="qa-answer">
                      Direct other bystanders to assist respectfully: <em>&quot;Please hold up jackets or umbrellas to give her privacy from crowds.&quot;</em> Expose only what is strictly necessary to apply the pads, and follow the AED&apos;s audio prompts.
                    </p>
                  </div>

                  <div className="qa-card">
                    <div className="qa-q-row">
                      <CheckCircle2 size={18} className="text-success-green flex-shrink-0" />
                      <h3 className="qa-question">Full Good Samaritan Legal Protection</h3>
                    </div>
                    <p className="qa-answer">
                      In India (under Section 134A of the Motor Vehicles Act and landmark Supreme Court rulings), bystanders who assist in an emergency are protected by law from civil, criminal, and police harassment. You cannot be penalized for attempting to save a life in good faith.
                    </p>
                  </div>
                </div>
              </div>

              {/* Medically Accurate AED Pad Placement SVG Diagram */}
              <div className="section-visual-col">
                <div className="learn-svg-wrapper">
                  <svg
                    viewBox="0 0 460 420"
                    className="learn-diagram-svg"
                    role="img"
                    aria-label="Illustration showing AED electrode pad placement on woman: upper right chest below collarbone, and lower left side below breast"
                  >
                    <rect width="460" height="420" rx="16" fill="var(--bg-subtle)" />

                    {/* Torso Outline */}
                    <g transform="translate(60, 30)">
                      {/* Neck and Head Silhouette */}
                      <circle cx="170" cy="40" r="30" fill="#fed7aa" stroke="#fb923c" strokeWidth="1.5" />
                      <rect x="158" y="68" width="24" height="20" fill="#fed7aa" />

                      {/* Torso Silhouette */}
                      <path
                        d="M 90 100 C 105 85, 235 85, 250 100 L 265 240 C 265 270, 75 270, 75 240 Z"
                        fill="#f1f5f9"
                        stroke="var(--border-strong)"
                        strokeWidth="2"
                      />
                      {/* Clavicle / Collarbones */}
                      <path d="M 120 105 Q 170 115 220 105" fill="none" stroke="#94a3b8" strokeWidth="2" />
                      {/* Breast contours (anatomy landmark) */}
                      <ellipse cx="135" cy="170" rx="26" ry="30" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                      <ellipse cx="205" cy="170" rx="26" ry="30" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

                      {/* Sternum (Centre of Chest) */}
                      <line x1="170" y1="120" x2="170" y2="200" stroke="#cbd5e1" strokeWidth="3" />

                      {/* ================= AED PAD 1: UPPER RIGHT CHEST ================= */}
                      {/* (Patient's right = diagram viewer's left) */}
                      <g transform="translate(95, 115)">
                        <rect width="52" height="40" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                        <circle cx="26" cy="20" r="8" fill="#ca8a04" />
                        <line x1="26" y1="20" x2="-20" y2="-10" stroke="#ca8a04" strokeWidth="2" />
                      </g>
                      <rect x="-35" y="80" width="125" height="40" rx="6" fill="#ffffff" stroke="#ca8a04" strokeWidth="1.5" />
                      <text x="27" y="96" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="800">PAD 1: UPPER RIGHT</text>
                      <text x="27" y="112" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Below collarbone</text>

                      {/* ================= AED PAD 2: LOWER LEFT SIDE ================= */}
                      {/* (Patient's left = diagram viewer's right, below breast along ribs) */}
                      <g transform="translate(210, 195)">
                        <rect width="52" height="40" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                        <circle cx="26" cy="20" r="8" fill="#ca8a04" />
                        <line x1="26" y1="20" x2="70" y2="40" stroke="#ca8a04" strokeWidth="2" />
                      </g>
                      <rect x="235" y="240" width="125" height="40" rx="6" fill="#ffffff" stroke="#ca8a04" strokeWidth="1.5" />
                      <text x="297" y="256" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="800">PAD 2: LOWER LEFT</text>
                      <text x="297" y="272" textAnchor="middle" fill="var(--text-secondary)" fontSize="10">Under breast / ribcage</text>
                    </g>
                  </svg>
                  <p className="svg-caption">
                    AED Pad Placement: Pad 1 on upper right chest below collarbone; Pad 2 on lower left ribs below the breast.
                  </p>
                </div>
              </div>
            </div>

            {!viewAll && (
              <div className="section-pager-footer">
                <button type="button" className="btn-pager-prev" onClick={handlePrev}>
                  <ArrowLeft size={18} />
                  <span>Previous</span>
                </button>
                <button type="button" className="btn-pager-next" onClick={handleNext}>
                  <span>Next: Watch Video Demonstration</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </section>
        )}

        {/* =========================================================================
            SECTION 6: WATCH A CPR DEMONSTRATION (YOUTUBE SHORTS EMBED)
            ========================================================================= */}
        {(viewAll || activeStep === 6) && (
          <section
            id="learn-section-6"
            className="learn-card-section"
            aria-label="Section 6: Watch a CPR demonstration"
          >
            <div className="section-header-row">
              <span className="section-badge">Section 6 of 6</span>
              <h2 className="section-heading">Watch a CPR Demonstration</h2>
            </div>
            <p className="section-prose-lead">
              Watch this video to see a practical demonstration of CPR technique.
            </p>

            <div className="video-section-layout">
              {/* Vertical 9:16 Responsive YouTube Shorts Embed Container */}
              <div className="youtube-shorts-card" aria-label="YouTube Shorts CPR Demonstration Container">
                <div className="shorts-aspect-ratio-box">
                  <iframe
                    src="https://www.youtube.com/embed/0p_2SnhA4Fo"
                    title="CPR demonstration video"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="shorts-iframe"
                  />
                </div>

                <div className="shorts-action-bar">
                  <a
                    href="https://www.youtube.com/shorts/0p_2SnhA4Fo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-watch-youtube-fallback"
                    id="youtube-fallback-link"
                    title="Open CPR demonstration video on YouTube"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>

              {/* Accompanying Educational Context Notes */}
              <div className="video-context-box">
                <div className="supplementary-disclaimer">
                  <ShieldAlert size={18} className="text-amber-warning flex-shrink-0" />
                  <p>
                    <strong>Supplementary Learning Reference:</strong> This embedded demonstration video provides supplemental visual familiarity. It does not replace PulseHer&apos;s clinically reviewed instructions or emergency dispatcher directives.
                  </p>
                </div>

                <div className="video-key-points">
                  <h4 className="key-points-title">Key Elements to Observe in the Video</h4>
                  <ul className="key-points-list">
                    <li>
                      <strong>Firm hand positioning:</strong> Observe the heel of the hand positioned directly on the centre of the breastbone.
                    </li>
                    <li>
                      <strong>Body alignment:</strong> Notice how the rescuer leans forward with shoulders vertically over the victim&apos;s chest.
                    </li>
                    <li>
                      <strong>Rhythmic pace:</strong> Pay attention to the steady 100–120 compressions per minute cadence without stopping.
                    </li>
                    <li>
                      <strong>Complete chest recoil:</strong> Notice the rescuer letting the chest rise fully after each compression.
                    </li>
                  </ul>
                </div>

                <div className="ready-practice-box">
                  <h4 className="ready-title">Ready to Practice with Live Audio?</h4>
                  <p className="ready-desc">
                    Test your timing with PulseHer&apos;s interactive 110 BPM metronome and elapsed timer.
                  </p>
                  <div className="ready-buttons-row">
                    <Link to="/cpr" className="btn-call-112-urgent" style={{ textDecoration: 'none', backgroundColor: 'var(--brand-plum)' }}>
                      <Activity size={16} />
                      <span>Launch Emergency CPR Tool</span>
                    </Link>
                    <Link to="/decide" className="btn-learn-emergency-secondary" style={{ textDecoration: 'none' }}>
                      <span>Help Me Decide Flow</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {!viewAll && (
              <div className="section-pager-footer">
                <button type="button" className="btn-pager-prev" onClick={handlePrev}>
                  <ArrowLeft size={18} />
                  <span>Previous</span>
                </button>
                <div className="tutorial-complete-tag">
                  <CheckCircle2 size={16} className="text-success-green" />
                  <span>Tutorial Complete</span>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default LearnPage;
