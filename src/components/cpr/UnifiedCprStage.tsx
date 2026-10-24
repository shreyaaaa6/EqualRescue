import React, { useState } from 'react';
import { Play, Eye, ShieldAlert, XCircle, Wind, Check, AlertCircle } from 'lucide-react';
import type { CyclePhase } from '../../types/emergency';

interface UnifiedCprStageProps {
  phase: CyclePhase;
  isRunning: boolean;
  isPaused: boolean;
  pulseActive: boolean;
  bpm: number;
  compressionCount: number;
  breathStep: 1 | 2;
  cycleNumber: number;
  onBeginCpr: () => void;
}

export const UnifiedCprStage: React.FC<UnifiedCprStageProps> = ({
  phase,
  isRunning,
  isPaused,
  pulseActive,
  bpm,
  compressionCount,
  breathStep,
  cycleNumber,
  onBeginCpr,
}) => {
  const [placementAngle, setPlacementAngle] = useState<'overhead' | 'side'>('overhead');

  // Exact dynamic instruction heading per requirements
  let dynamicHeading = 'First, position your hands correctly';
  let dynamicSubheading = 'Kneel beside the chest and locate the lower half of the breastbone over ordinary clothing before pushing.';

  if (phase === 'compressions') {
    dynamicHeading = 'Perform 30 chest compressions';
    dynamicSubheading = `Cycle #${cycleNumber} — Push hard and fast (5–6 cm deep) at ${bpm} BPM in the centre of the breastbone. Allow full recoil.`;
  } else if (phase === 'breaths') {
    dynamicHeading = 'Now give 2 rescue breaths';
    dynamicSubheading = '30 compressions complete. Tilt head back, lift chin, pinch nose, and deliver 2 gentle breaths (1 sec each).';
  }

  const countDisplay = `${String(compressionCount).padStart(2, '0')}/30`;

  return (
    <div className="unified-cpr-stage">
      {/* 1. Large Dynamic Instruction Heading */}
      <header className="dynamic-heading-container">
        <h1 className="dynamic-instruction-title" id="dynamic-cpr-title">
          {dynamicHeading}
        </h1>
        <p className="dynamic-instruction-sub">
          {dynamicSubheading}
        </p>
      </header>

      {/* 2. Main Animation & Interaction Area */}
      <div className="main-animation-viewport" aria-live="polite">
        {/* ================= STAGE A: HAND PLACEMENT (BEFORE COMPRESSIONS) ================= */}
        {phase === 'placement' && (
          <div className="stage-content placement-stage-content">
            {/* View perspective toggle */}
            <div className="placement-angle-selector">
              <span className="selector-label">View:</span>
              <button
                type="button"
                className={`btn-subview-toggle ${placementAngle === 'overhead' ? 'active' : ''}`}
                onClick={() => setPlacementAngle('overhead')}
              >
                <Eye size={14} />
                <span>Sternum Center (Overhead)</span>
              </button>
              <button
                type="button"
                className={`btn-subview-toggle ${placementAngle === 'side' ? 'active' : ''}`}
                onClick={() => setPlacementAngle('side')}
              >
                <Eye size={14} />
                <span>Posture & Arms (Side)</span>
              </button>
            </div>

            {placementAngle === 'overhead' ? (
              /* Overhead Sternum SVG */
              <div className="animation-graphic-wrapper">
                <svg
                  viewBox="0 0 640 280"
                  className="cpr-anatomical-svg"
                  aria-label="Hand placement diagram showing hands placed in the center of the chest on the lower half of the breastbone over ordinary clothing"
                >
                  {/* Clothed Torso Outline (Everyday casual shirt) */}
                  <path
                    d="M 180 280 C 180 180, 200 65, 250 50 C 280 40, 360 40, 390 50 C 440 65, 460 180, 460 280 Z"
                    fill="#f8fafc"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                  />
                  {/* Modest everyday shirt */}
                  <path
                    d="M 190 280 C 190 190, 210 80, 260 65 C 275 60, 365 60, 380 65 C 430 80, 450 190, 450 280 Z"
                    fill="#e0f2fe"
                    stroke="#7dd3fc"
                    strokeWidth="1.5"
                  />
                  {/* Crewneck Collar */}
                  <path d="M 285 64 Q 320 80 355 64" fill="none" stroke="#0284c7" strokeWidth="2.5" />

                  {/* Natural breast boundaries */}
                  <path d="M 240 160 Q 280 175, 290 140" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M 400 160 Q 360 175, 350 140" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />

                  {/* Sternum Bone outline */}
                  <rect x="306" y="90" width="28" height="22" rx="5" fill="#f87171" opacity="0.3" />
                  <rect x="308" y="115" width="24" height="55" rx="4" fill="#ef4444" opacity="0.25" />

                  {/* INCORRECT AREA: Soft Abdomen (Epigastrium) */}
                  <g transform="translate(260, 210)">
                    <rect x="0" y="0" width="120" height="30" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="60" y="15" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">
                      ❌ NEVER ABDOMEN
                    </text>
                    <text x="60" y="25" textAnchor="middle" fill="#7f1d1d" fontSize="8.5">
                      (Below ribcage / stomach)
                    </text>
                  </g>

                  {/* INCORRECT AREA: Side Ribs */}
                  <g transform="translate(205, 125)">
                    <circle cx="14" cy="14" r="14" fill="#fee2e2" stroke="#fca5a5" />
                    <XCircle size={18} className="text-rose-600" x="5" y="5" />
                    <text x="14" y="42" fill="#991b1b" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                      NO: Ribs
                    </text>
                  </g>
                  <g transform="translate(390, 125)">
                    <circle cx="14" cy="14" r="14" fill="#fee2e2" stroke="#fca5a5" />
                    <XCircle size={18} className="text-rose-600" x="5" y="5" />
                    <text x="14" y="42" fill="#991b1b" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                      NO: Ribs
                    </text>
                  </g>

                  {/* CORRECT TARGET: Lower Half of Sternum */}
                  <g transform="translate(275, 120)">
                    <circle cx="45" cy="30" r="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" className="animate-pulse" />
                    <ellipse cx="45" cy="30" rx="18" ry="12" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
                    <text x="45" y="27" textAnchor="middle" fill="#15803d" fontSize="9.5" fontWeight="800">
                      HEEL OF HAND
                    </text>
                    <text x="45" y="38" textAnchor="middle" fill="#166534" fontSize="8.5" fontWeight="700">
                      ON STERNUM
                    </text>

                    <rect x="-25" y="65" width="140" height="24" rx="5" fill="#15803d" />
                    <text x="45" y="81" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold">
                      ✅ EXACT TARGET AREA
                    </text>
                  </g>

                  {/* Over-clothing reminder */}
                  <g transform="translate(40, 15)">
                    <rect x="0" y="0" width="210" height="38" rx="6" fill="#ffffff" stroke="#cbd5e1" />
                    <text x="12" y="16" fill="#0f172a" fontSize="10.5" fontWeight="bold">
                      Push Over Ordinary Clothes
                    </text>
                    <text x="12" y="29" fill="#475569" fontSize="9.5">
                      Do not delay CPR to remove shirt or bra.
                    </text>
                  </g>
                </svg>
              </div>
            ) : (
              /* Side Biomechanics SVG */
              <div className="animation-graphic-wrapper">
                <svg
                  viewBox="0 0 640 280"
                  className="cpr-anatomical-svg"
                  aria-label="Side biomechanics: Rescuer kneeling beside woman on firm floor with locked elbows and shoulders over hands"
                >
                  {/* Floor */}
                  <rect x="0" y="230" width="640" height="50" fill="#334155" />
                  <line x1="0" y1="230" x2="640" y2="230" stroke="#64748b" strokeWidth="2" />
                  <text x="30" y="258" fill="#cbd5e1" fontSize="11" fontWeight="600">
                    FIRM FLAT SURFACE (Floor — never on a soft bed)
                  </text>

                  {/* Victim on Back */}
                  <circle cx="110" cy="205" r="20" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1.5" />
                  <path d="M 88 200 C 86 185, 115 180, 130 190 C 132 205, 125 220, 96 222 Z" fill="#475569" />
                  <rect x="130" y="200" width="22" height="15" rx="4" fill="#fbcfe8" />
                  <path d="M 360 215 L 520 220 L 530 228 L 360 228 Z" fill="#475569" />
                  <ellipse cx="535" cy="226" rx="12" ry="6" fill="#1e293b" />
                  <ellipse cx="330" cy="218" rx="34" ry="14" fill="#475569" />

                  {/* Clothed chest */}
                  <path d="M 152 218 C 155 185, 230 175, 280 186 C 305 192, 330 206, 335 218 Z" fill="#0284c7" />
                  <rect x="228" y="178" width="36" height="8" rx="4" fill="#f43f5e" />

                  {/* Rescuer Posture */}
                  <line x1="246" y1="25" x2="246" y2="178" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4 3" />
                  <rect x="180" y="15" width="132" height="20" rx="4" fill="#fff1f2" stroke="#fecdd3" />
                  <text x="246" y="29" textAnchor="middle" fill="#9f1239" fontSize="9.5" fontWeight="bold">
                    SHOULDERS OVER HANDS
                  </text>

                  {/* Rescuer Head & Torso */}
                  <circle cx="246" cy="55" r="15" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                  <path d="M 230 70 L 262 70 L 290 140 L 260 145 Z" fill="#475569" />
                  <path d="M 260 145 L 305 180 L 315 230 L 290 230 L 275 190 L 245 150 Z" fill="#1e293b" />

                  {/* Rescuer Straight Arms */}
                  <line x1="242" y1="74" x2="244" y2="178" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
                  <line x1="250" y1="74" x2="248" y2="178" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="245" cy="120" r="4" fill="#e11d48" />
                  <text x="258" y="124" fill="#0f172a" fontSize="9.5" fontWeight="700">Lock Elbows Straight</text>

                  {/* Hands on Sternum */}
                  <circle cx="246" cy="178" r="11" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
                  <text x="246" y="182" textAnchor="middle" fill="#78350f" fontSize="7.5" fontWeight="bold">HEEL</text>
                </svg>
              </div>
            )}

            {/* 1. Horizontal Responsive Hand-Placement Instruction Boxes */}
            <div className="horizontal-instructions-grid" role="list" aria-label="Hand Placement Steps">
              <div className="instruction-card-horizontal" role="listitem">
                <span className="step-num-bubble">1</span>
                <span className="instruction-text">
                  <strong>Kneel beside chest</strong> on a firm, flat surface.
                </span>
              </div>
              <div className="instruction-card-horizontal" role="listitem">
                <span className="step-num-bubble">2</span>
                <span className="instruction-text">
                  <strong>Heel of one hand</strong> on the lower half of breastbone (sternum).
                </span>
              </div>
              <div className="instruction-card-horizontal" role="listitem">
                <span className="step-num-bubble">3</span>
                <span className="instruction-text">
                  <strong>Interlock fingers</strong> with other hand on top, keeping fingers off ribs.
                </span>
              </div>
              <div className="instruction-card-horizontal" role="listitem">
                <span className="step-num-bubble">4</span>
                <span className="instruction-text">
                  <strong>Keep arms straight</strong> with shoulders directly above your hands.
                </span>
              </div>
              <div className="instruction-card-horizontal" role="listitem">
                <span className="step-num-bubble">5</span>
                <span className="instruction-text">
                  <strong>Push over ordinary clothes</strong> — do not delay to remove clothing or bra.
                </span>
              </div>
            </div>

            {/* Compact Sternum Reminder Banner */}
            <div className="compact-sternum-banner">
              <AlertCircle size={18} className="text-amber-700 flex-shrink-0" />
              <span>
                <strong>Reminder:</strong> Press in the centre of the chest, on the lower half of the breastbone — not on the ribs or the abdomen.
              </span>
            </div>

            {/* Primary Action Button: "I understand — Begin CPR" */}
            <div className="placement-action-row">
              <button
                type="button"
                onClick={onBeginCpr}
                className="btn-begin-cpr-primary"
                id="begin-cpr-main-btn"
              >
                <Play size={20} className="fill-current" />
                <span>I understand — Begin CPR</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STAGE B: ACTIVE CHEST COMPRESSIONS (1 to 30) ================= */}
        {phase === 'compressions' && (
          <div className="stage-content compressions-stage-content">
            <div className="animation-graphic-wrapper compression-live-wrapper">
              <svg
                viewBox="0 0 640 280"
                className={`cpr-anatomical-svg ${isRunning ? 'compressing' : 'at-rest'} ${pulseActive && isRunning ? 'beat-strike' : ''}`}
                aria-label={`Chest compression animation. Current compression ${compressionCount} of 30.`}
              >
                {/* Floor */}
                <rect x="0" y="230" width="640" height="50" fill="#334155" />
                <line x1="0" y1="230" x2="640" y2="230" stroke="#64748b" strokeWidth="2" />

                {/* Victim on Back */}
                <circle cx="110" cy="205" r="20" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1.5" />
                <path d="M 88 200 C 86 185, 115 180, 130 190 C 132 205, 125 220, 96 222 Z" fill="#475569" />
                <rect x="130" y="200" width="22" height="15" rx="4" fill="#fbcfe8" />
                <path d="M 360 215 L 520 220 L 530 228 L 360 228 Z" fill="#475569" />
                <ellipse cx="535" cy="226" rx="12" ry="6" fill="#1e293b" />
                <ellipse cx="330" cy="218" rx="34" ry="14" fill="#475569" />

                {/* Chest compression displacement */}
                <g className="victim-chest-group">
                  <path d="M 152 218 C 155 185, 230 175, 280 186 C 305 192, 330 206, 335 218 Z" fill="#0284c7" />
                  <rect x="228" y="178" width="36" height="8" rx="4" fill="#f43f5e" />

                  {/* 5-6 cm Depth and recoil markers */}
                  <g transform="translate(150, 105)">
                    <line x1="0" y1="75" x2="45" y2="75" stroke="#059669" strokeWidth="2" strokeDasharray="3 2" />
                    <text x="-5" y="73" textAnchor="end" fill="#059669" fontSize="10" fontWeight="bold">Full Recoil</text>

                    <line x1="0" y1="96" x2="45" y2="96" stroke="#dc2626" strokeWidth="2" />
                    <text x="-5" y="100" textAnchor="end" fill="#dc2626" fontSize="10" fontWeight="bold">5–6 cm Depth</text>

                    <line x1="45" y1="75" x2="45" y2="96" stroke="#0f172a" strokeWidth="1.5" />
                    <polygon points="41,80 49,80 45,74" fill="#0f172a" />
                    <polygon points="41,91 49,91 45,97" fill="#0f172a" />
                  </g>
                </g>

                {/* Rescuer with straight arms & shoulders over hands */}
                <g className="rescuer-figure-group">
                  <line x1="246" y1="25" x2="246" y2="178" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="246" cy="55" r="15" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
                  <path d="M 230 70 L 262 70 L 290 140 L 260 145 Z" fill="#475569" />
                  <path d="M 260 145 L 305 180 L 315 230 L 290 230 L 275 190 L 245 150 Z" fill="#1e293b" />

                  {/* Animated Arms thrusting downward */}
                  <g className="rescuer-arms">
                    <line x1="242" y1="74" x2="244" y2="178" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
                    <line x1="250" y1="74" x2="248" y2="178" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="246" cy="178" r="11" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
                    <text x="246" y="182" textAnchor="middle" fill="#78350f" fontSize="7.5" fontWeight="bold">HEEL</text>
                  </g>
                </g>

                {/* Live Count overlay on SVG */}
                <g transform="translate(460, 25)">
                  <rect x="0" y="0" width="155" height="54" rx="8" fill="#ffffff" stroke="#e2e8f0" />
                  <text x="77" y="22" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">
                    Compressions {countDisplay}
                  </text>
                  <text x="77" y="40" textAnchor="middle" fill="#059669" fontSize="10.5" fontWeight="700">
                    Target: {bpm} BPM (100–120)
                  </text>
                </g>
              </svg>

              {/* Rhythmic Visual Beat Pulse Indicator */}
              <div className="rhythm-pulse-strip">
                <div className={`visual-pulse-dot ${pulseActive && isRunning ? 'pulse-hit' : ''}`} />
                <span className="rhythm-status-text">
                  {isPaused
                    ? 'CPR PAUSED — TAP RESUME TO CONTINUE'
                    : `PUSH ON EACH BEAT (${compressionCount}/30 COMPLETED)`}
                </span>
              </div>
            </div>

            {/* CPR Technique Quick Chips */}
            <div className="active-cpr-tips-row">
              <div className="cpr-tip-chip">
                <Check size={15} className="text-emerald-600" />
                <span>5–6 cm depth for adult woman</span>
              </div>
              <div className="cpr-tip-chip">
                <Check size={15} className="text-emerald-600" />
                <span>Allow 100% full chest recoil</span>
              </div>
              <div className="cpr-tip-chip">
                <Check size={15} className="text-emerald-600" />
                <span>Keep elbows locked straight</span>
              </div>
            </div>
          </div>
        )}

        {/* ================= STAGE C: RESCUE BREATHS (BREATH 1/2 and 2/2) ================= */}
        {phase === 'breaths' && (
          <div className="stage-content breaths-stage-content">
            <div className="breaths-graphic-box">
              <svg
                viewBox="0 0 640 280"
                className="cpr-anatomical-svg"
                aria-label={`Rescue breath animation. Currently showing rescue breath ${breathStep} of 2.`}
              >
                {/* Surface */}
                <rect x="0" y="240" width="640" height="40" fill="#334155" />

                {/* Head Tilt & Chin Lift demonstration */}
                <g transform="translate(160, 40)">
                  <circle cx="80" cy="80" r="42" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
                  {/* Airway open passage */}
                  <path d="M 60 90 Q 90 70 115 85" fill="none" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
                  <text x="80" y="145" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="bold">
                    Airway Open (Head Tilt, Chin Lift)
                  </text>
                </g>

                {/* Animated Chest Rise on Active Breath */}
                <g transform="translate(290, 85)">
                  <ellipse
                    cx="45"
                    cy="40"
                    rx={breathStep === 1 || breathStep === 2 ? 38 : 30}
                    ry={breathStep === 1 || breathStep === 2 ? 24 : 16}
                    fill="#e0f2fe"
                    stroke="#0284c7"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <text x="45" y="44" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">
                    Chest Rising
                  </text>
                </g>

                {/* Current Breath Step Indicator Box */}
                <g transform="translate(420, 45)">
                  <rect x="0" y="0" width="195" height="150" rx="10" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
                  <rect x="0" y="0" width="195" height="34" rx="10" fill="#0284c7" />
                  <text x="97" y="22" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="800">
                    RESCUE BREATHS {breathStep}/2
                  </text>
                  <text x="97" y="58" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="800">
                    {breathStep === 1 ? 'Delivering Breath 1 of 2' : 'Delivering Breath 2 of 2'}
                  </text>
                  <text x="97" y="82" textAnchor="middle" fill="#0f172a" fontSize="11">
                    1. Pinch nose shut
                  </text>
                  <text x="97" y="100" textAnchor="middle" fill="#0f172a" fontSize="11">
                    2. Seal mouth over hers
                  </text>
                  <text x="97" y="118" textAnchor="middle" fill="#0f172a" fontSize="11">
                    3. Blow 1 sec until chest rises
                  </text>
                  <text x="97" y="136" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">
                    {breathStep === 1 ? 'Preparing breath 2...' : 'Returning to compressions...'}
                  </text>
                </g>
              </svg>
            </div>

            {/* Clear 1/2 and 2/2 Progress Banner */}
            <div className="breaths-progress-strip">
              <div className="breath-step-badge-group">
                <span className={`breath-pill ${breathStep === 1 ? 'active' : 'completed'}`}>
                  {breathStep === 2 ? '✓' : '1'} Breath 1 of 2
                </span>
                <span className={`breath-pill ${breathStep === 2 ? 'active' : 'pending'}`}>
                  2 Breath 2 of 2
                </span>
              </div>
              <div className="breath-status-note">
                <Wind size={18} className="text-sky-600 animate-pulse" />
                <span>
                  {breathStep === 1
                    ? 'Giving first rescue breath (1 second). Watch chest rise.'
                    : 'Giving second rescue breath. Compressions will resume immediately.'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Educational Disclaimer */}
      <footer className="visual-disclaimer-strip">
        <ShieldAlert size={16} className="text-amber-600 flex-shrink-0" />
        <p className="disclaimer-note-text">
          <strong>Visual Tutorial Guide:</strong> This animation demonstrates correct 30:2 technique and rhythm. It is a visual guide and does not detect or measure physical compressions.
        </p>
      </footer>
    </div>
  );
};
