import React, { useState } from 'react';
import { Eye, ShieldAlert, CheckCircle2, XCircle, Info, Activity } from 'lucide-react';

interface WomanCenteredCprVisualProps {
  isPlaying: boolean;
  pulseActive: boolean;
  bpm: number;
}

export const WomanCenteredCprVisual: React.FC<WomanCenteredCprVisualProps> = ({
  isPlaying,
  pulseActive,
  bpm,
}) => {
  const [activeAngle, setActiveAngle] = useState<'side' | 'overhead'>('side');

  return (
    <section className="cpr-visual-showcase-card" aria-label="Woman-Centred CPR Anatomical Visual Guide">
      <div className="visual-header-row">
        <div className="visual-title-badge">
          <Activity size={18} className="text-rose-600" />
          <h2 className="visual-title">Medically Accurate CPR Posture & Placement (Woman in Everyday Clothing)</h2>
        </div>

        {/* View Switcher Controls */}
        <div className="view-angle-toggle-group" role="group" aria-label="Perspective View Selection">
          <button
            type="button"
            className={`btn-angle-toggle ${activeAngle === 'side' ? 'active' : ''}`}
            onClick={() => setActiveAngle('side')}
          >
            <Eye size={15} />
            <span>Biomechanics & Depth (Side View)</span>
          </button>
          <button
            type="button"
            className={`btn-angle-toggle ${activeAngle === 'overhead' ? 'active' : ''}`}
            onClick={() => setActiveAngle('overhead')}
          >
            <Eye size={15} />
            <span>Sternum Target (Overhead View)</span>
          </button>
        </div>
      </div>

      {/* Main Visual Display Stage */}
      <div className="visual-stage-container">
        {activeAngle === 'side' ? (
          /* ================= SIDE BIOMECHANICS VIEW ================= */
          <div className="svg-stage-wrapper side-view-wrapper">
            <svg
              viewBox="0 0 640 340"
              className={`cpr-anatomical-svg ${isPlaying ? 'compressing' : 'at-rest'} ${pulseActive && isPlaying ? 'beat-strike' : ''}`}
              aria-label="Side biomechanics: Rescuer kneeling with straight arms and shoulders directly over victim on firm floor, compressing 5 to 6 cm"
            >
              <defs>
                {/* Surface shadow & gradients */}
                <linearGradient id="firmSurfaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>

                <linearGradient id="clothingTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>

                <linearGradient id="clothingPantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>

              {/* 1. Firm flat floor (Surface) */}
              <rect x="0" y="270" width="640" height="70" fill="url(#firmSurfaceGrad)" />
              <line x1="0" y1="270" x2="640" y2="270" stroke="#64748b" strokeWidth="2" />
              <text x="30" y="300" fill="#cbd5e1" fontSize="13" fontWeight="600">
                FIRM FLAT SURFACE (Floor — Never on a soft bed)
              </text>

              {/* ================= VICTIM (Adult Woman in Everyday Casual Attire) ================= */}
              {/* Head resting back flat on floor */}
              <circle cx="110" cy="240" r="24" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1.5" />
              {/* Everyday hair profile */}
              <path d="M 86 235 C 84 215, 115 210, 130 220 C 132 235, 125 255, 96 258 Z" fill="#475569" />
              {/* Neck & airway slight extension */}
              <rect x="130" y="235" width="25" height="18" rx="4" fill="#fbcfe8" />

              {/* Legs / Pants */}
              <path d="M 360 250 L 520 255 L 530 268 L 360 268 Z" fill="url(#clothingPantsGrad)" />
              {/* Shoes */}
              <ellipse cx="535" cy="265" rx="14" ry="7" fill="#1e293b" />

              {/* Hips & Pelvis */}
              <ellipse cx="330" cy="254" rx="36" ry="16" fill="url(#clothingPantsGrad)" />

              {/* Thorax / Chest with animated compression displacement */}
              <g className="victim-chest-group">
                {/* Everyday casual crewneck shirt (teal/blue) */}
                <path
                  d="M 152 254 C 155 215, 230 205, 280 216 C 305 222, 330 240, 335 254 Z"
                  fill="url(#clothingTopGrad)"
                  stroke="#0284c7"
                  strokeWidth="1.5"
                />

                {/* Sternum compression target zone marker */}
                <rect x="228" y="210" width="36" height="8" rx="4" fill="#f43f5e" opacity="0.9" />

                {/* Depth measurement scale lines */}
                <g className="depth-scale-indicator" transform="translate(160, 140)">
                  <line x1="0" y1="70" x2="45" y2="70" stroke="#059669" strokeWidth="2" strokeDasharray="3 2" />
                  <text x="-5" y="67" textAnchor="end" fill="#059669" fontSize="11" fontWeight="bold">Full Recoil</text>

                  <line x1="0" y1="92" x2="45" y2="92" stroke="#dc2626" strokeWidth="2" />
                  <text x="-5" y="96" textAnchor="end" fill="#dc2626" fontSize="11" fontWeight="bold">5–6 cm Depth</text>

                  {/* Vertical measurement bracket */}
                  <line x1="45" y1="70" x2="45" y2="92" stroke="#0f172a" strokeWidth="1.5" />
                  <polygon points="41,75 49,75 45,69" fill="#0f172a" />
                  <polygon points="41,87 49,87 45,93" fill="#0f172a" />
                </g>
              </g>

              {/* ================= RESCUER (Kneeling, Straight Arms, Shoulders Over Hands) ================= */}
              <g className="rescuer-figure-group">
                {/* Vertical alignment plumb line (Shoulders directly over hands) */}
                <line x1="246" y1="35" x2="246" y2="210" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4 3" />
                <rect x="180" y="24" width="132" height="22" rx="4" fill="#fff1f2" stroke="#fecdd3" />
                <text x="246" y="39" textAnchor="middle" fill="#9f1239" fontSize="10" fontWeight="bold">
                  SHOULDERS OVER HANDS
                </text>

                {/* Rescuer Head */}
                <circle cx="246" cy="70" r="18" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />

                {/* Rescuer Upper Body / Torso (Kneeling posture) */}
                <path d="M 230 88 L 262 88 L 290 170 L 260 175 Z" fill="#475569" />

                {/* Rescuer Knees & Legs bent on floor */}
                <path d="M 260 175 L 305 210 L 315 270 L 290 270 L 275 220 L 245 180 Z" fill="#1e293b" />

                {/* Rescuer Straight Arms (Elbows strictly locked, force transmitted from hips) */}
                <g className="rescuer-arms">
                  {/* Left Arm line */}
                  <line x1="242" y1="92" x2="244" y2="210" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round" />
                  {/* Right Arm line */}
                  <line x1="250" y1="92" x2="248" y2="210" stroke="#94a3b8" strokeWidth="10" strokeLinecap="round" />

                  {/* Elbow locked callout */}
                  <circle cx="245" cy="145" r="4" fill="#e11d48" />
                  <rect x="256" y="137" width="105" height="18" rx="4" fill="#f8fafc" stroke="#cbd5e1" />
                  <text x="262" y="150" fill="#0f172a" fontSize="10" fontWeight="700">Lock Elbows Straight</text>

                  {/* Interlocked Hands on Lower Sternum */}
                  <circle cx="246" cy="212" r="13" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
                  <text x="246" y="216" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="bold">HEEL</text>
                </g>
              </g>

              {/* Compression rate status watermark */}
              <g transform="translate(480, 45)">
                <rect x="0" y="0" width="140" height="48" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
                <text x="70" y="20" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">
                  {bpm} COMPRESSIONS/MIN
                </text>
                <text x="70" y="37" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="600">
                  Target: 100–120 BPM
                </text>
              </g>
            </svg>

            {/* Side View Descriptive Highlights */}
            <div className="view-highlights-grid">
              <div className="highlight-pill highlight-green">
                <CheckCircle2 size={16} />
                <span><strong>5–6 cm Depth:</strong> Press firmly downward to pump blood to brain.</span>
              </div>
              <div className="highlight-pill highlight-green">
                <CheckCircle2 size={16} />
                <span><strong>Full Recoil:</strong> Lift completely off sternum after every pump so heart refills.</span>
              </div>
              <div className="highlight-pill highlight-blue">
                <Info size={16} />
                <span><strong>Straight Arms:</strong> Use body weight through hips—do not bend elbows.</span>
              </div>
            </div>
          </div>
        ) : (
          /* ================= OVERHEAD ANATOMICAL STERNUM VIEW ================= */
          <div className="svg-stage-wrapper overhead-view-wrapper">
            <svg
              viewBox="0 0 640 340"
              className={`cpr-anatomical-svg ${pulseActive && isPlaying ? 'beat-strike' : ''}`}
              aria-label="Overhead anatomical diagram showing hands placed on lower half of breastbone between breasts over clothing, with soft abdomen and side ribs marked as incorrect"
            >
              {/* Torso background outline (Clothed in standard shirt) */}
              <path
                d="M 180 320 C 180 200, 200 80, 250 60 C 280 50, 360 50, 390 60 C 440 80, 460 200, 460 320 Z"
                fill="#f1f5f9"
                stroke="#cbd5e1"
                strokeWidth="2"
              />

              {/* Ordinary Everyday Shirt (respectful, realistic neckline & seams) */}
              <path
                d="M 190 320 C 190 210, 210 100, 260 80 C 275 75, 365 75, 380 80 C 430 100, 450 210, 450 320 Z"
                fill="#e0f2fe"
                stroke="#7dd3fc"
                strokeWidth="1.5"
              />

              {/* Modest Crewneck Collar */}
              <path d="M 285 76 Q 320 95 355 76" fill="none" stroke="#0284c7" strokeWidth="2.5" />

              {/* Natural breast contour boundaries (demonstrating exact center sternum placement between breasts) */}
              <path d="M 240 185 Q 280 200, 290 160" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M 400 185 Q 360 200, 350 160" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />

              {/* Sternum Bone Anatomical Representation */}
              {/* Manubrium (upper) */}
              <rect x="306" y="105" width="28" height="25" rx="5" fill="#f87171" opacity="0.3" />
              {/* Sternum Body (mid & lower half) */}
              <rect x="308" y="135" width="24" height="60" rx="4" fill="#ef4444" opacity="0.25" />

              {/* ================= INCORRECT AREA: LATERAL RIBS (LEFT & RIGHT) ================= */}
              <g className="incorrect-zone zone-left-ribs" transform="translate(210, 150)">
                <circle cx="16" cy="16" r="16" fill="#fee2e2" stroke="#fca5a5" />
                <XCircle size={22} className="text-rose-600" x="5" y="5" />
                <text x="20" y="48" fill="#991b1b" fontSize="10" fontWeight="bold" textAnchor="middle">
                  NO: Side Ribs
                </text>
              </g>

              <g className="incorrect-zone zone-right-ribs" transform="translate(385, 150)">
                <circle cx="16" cy="16" r="16" fill="#fee2e2" stroke="#fca5a5" />
                <XCircle size={22} className="text-rose-600" x="5" y="5" />
                <text x="20" y="48" fill="#991b1b" fontSize="10" fontWeight="bold" textAnchor="middle">
                  NO: Side Ribs
                </text>
              </g>

              {/* ================= INCORRECT AREA: SOFT ABDOMEN (EPIGASTRIUM) ================= */}
              <g className="incorrect-zone zone-abdomen" transform="translate(260, 245)">
                <rect x="0" y="0" width="120" height="34" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
                <text x="60" y="16" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">
                  ❌ NEVER PUSH ABDOMEN
                </text>
                <text x="60" y="28" textAnchor="middle" fill="#7f1d1d" fontSize="9">
                  (Below rib cage / stomach area)
                </text>
              </g>

              {/* ================= CORRECT TARGET: LOWER HALF OF STERNUM ================= */}
              <g className="correct-sternum-target" transform="translate(275, 145)">
                {/* Glowing target circle */}
                <circle
                  cx="45"
                  cy="35"
                  r="34"
                  fill="#dcfce7"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                  className={pulseActive ? 'animate-ping-once' : ''}
                />

                {/* Hand Placement Illustration (Heel of palm on sternum, interlocked fingers over ordinary clothes) */}
                <ellipse cx="45" cy="35" rx="20" ry="14" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
                <text x="45" y="32" textAnchor="middle" fill="#15803d" fontSize="10" fontWeight="800">
                  HEEL OF HAND
                </text>
                <text x="45" y="44" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="700">
                  HERE
                </text>

                {/* Verification Checkmark Banner */}
                <rect x="-25" y="75" width="140" height="26" rx="5" fill="#15803d" />
                <text x="45" y="92" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                  ✅ EXACT STERNUM TARGET
                </text>
              </g>

              {/* Direct Clothing Clarification Callout */}
              <g transform="translate(60, 25)">
                <rect x="0" y="0" width="220" height="45" rx="6" fill="#ffffff" stroke="#cbd5e1" />
                <text x="12" y="18" fill="#0f172a" fontSize="11" fontWeight="bold">
                  Press Directly Over Clothing
                </text>
                <text x="12" y="34" fill="#475569" fontSize="10">
                  Do not delay compressions to remove shirt or bra.
                </text>
              </g>
            </svg>

            {/* Overhead View Descriptive Highlights */}
            <div className="view-highlights-grid">
              <div className="highlight-pill highlight-green">
                <CheckCircle2 size={16} />
                <span><strong>Center of Chest:</strong> Lower half of breastbone, right between the breasts.</span>
              </div>
              <div className="highlight-pill highlight-red">
                <XCircle size={16} />
                <span><strong>Never on Abdomen:</strong> Pushing on the stomach or ribs is ineffective and hazardous.</span>
              </div>
              <div className="highlight-pill highlight-blue">
                <Info size={16} />
                <span><strong>Interlocked Hands:</strong> Place heel of first hand down, interlock top fingers to pull them up.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Calibration & Educational Clarification Disclaimer */}
      <div className="visual-disclaimer-strip">
        <ShieldAlert size={16} className="text-amber-600 flex-shrink-0" />
        <p className="disclaimer-note-text">
          <strong>Visual Guide Notice:</strong> This interactive illustration demonstrates correct anatomical posture and rhythm. It is a visual educational guide and does not detect, track, or measure your physical compressions.
        </p>
      </div>
    </section>
  );
};
