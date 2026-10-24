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
              /* Side Biomechanics SVG: True Anatomical CPR Posture */
              <div className="animation-graphic-wrapper">
                <svg
                  viewBox="0 0 640 280"
                  className="cpr-anatomical-svg cpr-posture-side-view"
                  aria-label="Side biomechanics: Rescuer kneeling beside woman on firm floor with locked elbows and shoulders over hands"
                >
                  <defs>
                    <linearGradient id="floorGradSide" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="shirtGradSide" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                  </defs>

                  {/* Surface: Firm Flat Floor */}
                  <rect x="0" y="222" width="640" height="58" fill="url(#floorGradSide)" />
                  <line x1="0" y1="222" x2="640" y2="222" stroke="#475569" strokeWidth="2" />
                  <text x="24" y="252" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="0.04em">
                    FIRM FLAT SURFACE (Floor — never on a soft mattress)
                  </text>

                  {/* Patient: Adult woman lying flat on her back (supine) */}
                  <g className="patient-supine-figure">
                    {/* Head tilted back gently to open airway */}
                    <path d="M 68 206 C 62 188, 84 178, 102 182 C 114 185, 120 216, 86 220 Z" fill="#475569" />
                    <circle cx="102" cy="198" r="18" fill="#fed7aa" stroke="#fb923c" strokeWidth="1.2" />
                    {/* Airway profile */}
                    <path d="M 114 193 Q 120 196 116 202 Q 120 206 114 210" fill="none" stroke="#ea580c" strokeWidth="1.2" strokeLinecap="round" />
                    {/* Neck */}
                    <rect x="116" y="196" width="20" height="16" rx="3" fill="#fed7aa" />

                    {/* Legs & Trousers lying flat along floor */}
                    <path d="M 276 208 L 475 214 L 485 222 L 270 222 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                    <ellipse cx="490" cy="220" rx="10" ry="4" fill="#0f172a" />

                    {/* Clothed Torso (Everyday shirt) with clear natural contours */}
                    <path d="M 132 218 C 136 186, 178 172, 225 174 C 255 175, 275 192, 280 218 Z" fill="url(#shirtGradSide)" stroke="#0369a1" strokeWidth="1.2" />
                    {/* Collar */}
                    <path d="M 134 198 Q 144 206 150 198" fill="none" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />

                    {/* Lower Sternum Target */}
                    <g transform="translate(225, 173)">
                      <ellipse cx="0" cy="0" rx="18" ry="7" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.8" />
                      <line x1="-12" y1="0" x2="12" y2="0" stroke="#dc2626" strokeWidth="1.5" />
                      <line x1="0" y1="-5" x2="0" y2="5" stroke="#dc2626" strokeWidth="1.5" />
                      <text x="0" y="24" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="800">
                        LOWER STERNUM
                      </text>
                    </g>
                  </g>

                  {/* Rescuer: Kneeling/Sitting on Floor beside patient in true CPR posture */}
                  <g className="rescuer-posture-figure">
                    {/* Vertical Alignment Line: Shoulders directly above hands */}
                    <line x1="225" y1="65" x2="225" y2="173" stroke="#e11d48" strokeWidth="1.8" strokeDasharray="4 3" />

                    {/* Both Knees and Lower Legs flat on floor beside chest */}
                    {/* Shins resting along floor */}
                    <path d="M 238 222 L 332 222 L 338 215 L 255 214 Z" fill="#334155" />
                    {/* Knees planted on floor */}
                    <ellipse cx="240" cy="218" rx="14" ry="7" fill="#1e293b" />
                    {/* Foot flat on floor */}
                    <ellipse cx="335" cy="219" rx="8" ry="4" fill="#0f172a" />

                    {/* Thighs: Angled sitting back toward heels/buttocks */}
                    <path d="M 232 216 L 248 221 L 302 176 L 286 168 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />

                    {/* Rescuer Upper Body (Hinged at hips, leaning forward over sternum) */}
                    {/* Torso */}
                    <path d="M 288 172 L 298 164 L 232 106 L 216 114 Z" fill="#475569" stroke="#334155" strokeWidth="1" />
                    
                    {/* Head: tilted looking down at patient's chest */}
                    <circle cx="228" cy="80" r="14" fill="#fde047" stroke="#ca8a04" strokeWidth="1.2" />
                    <path d="M 218 76 C 218 64, 242 66, 242 76 C 238 72, 226 72, 218 76 Z" fill="#1e293b" />

                    {/* Shoulder Joint at (225, 112) — directly over sternum (225, 173) */}
                    <circle cx="225" cy="112" r="9" fill="#334155" />

                    {/* Locked Straight Arms (Proportional length from shoulders to sternum) */}
                    <line x1="221" y1="112" x2="221" y2="172" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                    <line x1="229" y1="112" x2="229" y2="172" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />

                    {/* Elbow Lock Ring Marker */}
                    <circle cx="225" cy="142" r="4.5" fill="#ffffff" stroke="#e11d48" strokeWidth="1.8" />

                    {/* Hands on Sternum */}
                    <ellipse cx="225" cy="173" rx="14" ry="7" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
                    <text x="225" y="176" textAnchor="middle" fill="#78350f" fontSize="7.5" fontWeight="800">HEEL</text>
                  </g>

                  {/* Posture Callout Pills */}
                  <g transform="translate(130, 16)">
                    <rect x="0" y="0" width="185" height="26" rx="6" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1.5" />
                    <text x="92" y="17" textAnchor="middle" fill="#9f1239" fontSize="9.5" fontWeight="800">
                      SHOULDERS OVER HANDS
                    </text>
                  </g>
                  <g transform="translate(245, 128)">
                    <rect x="0" y="0" width="130" height="24" rx="5" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2" />
                    <text x="65" y="16" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="700">
                      ✓ Lock Elbows Straight
                    </text>
                  </g>
                  <g transform="translate(345, 198)">
                    <rect x="0" y="0" width="155" height="24" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
                    <text x="77" y="16" textAnchor="middle" fill="#334155" fontSize="9" fontWeight="700">
                      ✓ Kneeling Beside Chest
                    </text>
                  </g>
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
              <div className="instruction-card-horizontal card-span-full" role="listitem">
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
                aria-label={`Realistic chest compression demonstration. Current compression ${compressionCount} of 30.`}
              >
                <defs>
                  <linearGradient id="floorGradActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="shirtGradActive" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                </defs>

                {/* Surface: Firm Flat Floor */}
                <rect x="0" y="222" width="640" height="58" fill="url(#floorGradActive)" />
                <line x1="0" y1="222" x2="640" y2="222" stroke="#475569" strokeWidth="2" />
                <text x="24" y="252" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="0.04em">
                  FIRM FLAT SURFACE (Floor)
                </text>

                {/* Patient Supine Body */}
                <g className="patient-supine-figure">
                  {/* Head tilted back gently with open airway */}
                  <path d="M 68 206 C 62 188, 84 178, 102 182 C 114 185, 120 216, 86 220 Z" fill="#475569" />
                  <circle cx="102" cy="198" r="18" fill="#fed7aa" stroke="#fb923c" strokeWidth="1.2" />
                  <path d="M 114 193 Q 120 196 116 202 Q 120 206 114 210" fill="none" stroke="#ea580c" strokeWidth="1.2" strokeLinecap="round" />
                  <rect x="116" y="196" width="20" height="16" rx="3" fill="#fed7aa" />

                  {/* Legs & Trousers lying flat */}
                  <path d="M 276 208 L 430 214 L 438 222 L 270 222 Z" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                  <ellipse cx="442" cy="220" rx="9" ry="4" fill="#0f172a" />

                  {/* Chest Wall that deflects 5-6 cm (10px) smoothly on each compression */}
                  <g className="cpr-chest-compression-group">
                    <path d="M 132 218 C 136 186, 178 172, 225 174 C 255 175, 275 192, 280 218 Z" fill="url(#shirtGradActive)" stroke="#0369a1" strokeWidth="1.2" />
                    <path d="M 134 198 Q 144 206 150 198" fill="none" stroke="#bae6fd" strokeWidth="2" strokeLinecap="round" />
                    
                    {/* Sternum Target Crosshair */}
                    <g transform="translate(225, 173)">
                      <ellipse cx="0" cy="0" rx="16" ry="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
                      <line x1="-10" y1="0" x2="10" y2="0" stroke="#dc2626" strokeWidth="1.5" />
                      <line x1="0" y1="-4" x2="0" y2="4" stroke="#dc2626" strokeWidth="1.5" />
                    </g>
                  </g>
                </g>

                {/* Rescuer Figure: Kneeling and sitting on heels on floor beside patient */}
                <g className="rescuer-active-figure">
                  {/* Both Knees and Lower Legs grounded horizontally on floor */}
                  <path d="M 238 222 L 332 222 L 338 215 L 255 214 Z" fill="#334155" />
                  <ellipse cx="240" cy="218" rx="14" ry="7" fill="#1e293b" />
                  <ellipse cx="335" cy="219" rx="8" ry="4" fill="#0f172a" />

                  {/* Thighs: angled sitting back over heels/calves */}
                  <path d="M 232 216 L 248 221 L 302 176 L 286 168 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1" />

                  {/* Upper Torso + Locked Straight Arms (Pivots from hip hinge) */}
                  <g className="cpr-rescuer-thrust-group">
                    {/* Torso leaning forward from hips to shoulders */}
                    <path d="M 288 172 L 298 164 L 232 106 L 216 114 Z" fill="#475569" stroke="#334155" strokeWidth="1" />
                    
                    {/* Head looking down focused on sternum */}
                    <circle cx="228" cy="80" r="14" fill="#fde047" stroke="#ca8a04" strokeWidth="1.2" />
                    <path d="M 218 76 C 218 64, 242 66, 242 76 C 238 72, 226 72, 218 76 Z" fill="#1e293b" />

                    {/* Shoulder Joint at (225, 112) */}
                    <circle cx="225" cy="112" r="9" fill="#334155" />

                    {/* Locked Straight Arms extending down to sternum */}
                    <line x1="221" y1="112" x2="221" y2="172" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />
                    <line x1="229" y1="112" x2="229" y2="172" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />

                    {/* Hands clasped firmly on sternum (stay anchored) */}
                    <ellipse cx="225" cy="173" rx="14" ry="7" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
                    <text x="225" y="176" textAnchor="middle" fill="#78350f" fontSize="7.5" fontWeight="800">HEEL</text>
                  </g>
                </g>

                {/* Clinical CPR Telemetry Box on Right */}
                <g transform="translate(450, 18)">
                  <rect x="0" y="0" width="175" height="185" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
                  
                  {/* Header */}
                  <rect x="0" y="0" width="175" height="32" rx="10" fill="#0f172a" />
                  <text x="87" y="21" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800" letterSpacing="0.04em">
                    CPR DEPTH & RECOIL
                  </text>

                  {/* Big compression count */}
                  <text x="87" y="58" textAnchor="middle" fill="#e11d48" fontSize="22" fontWeight="800" fontFamily="monospace">
                    {countDisplay}
                  </text>
                  <text x="87" y="74" textAnchor="middle" fill="#64748b" fontSize="9.5" fontWeight="700">
                    COMPRESSIONS IN CYCLE
                  </text>

                  {/* Depth Target Visual Gauge */}
                  <g transform="translate(18, 88)">
                    {/* Gauge track */}
                    <rect x="0" y="0" width="138" height="34" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
                    {/* Target 5-6 cm green bar */}
                    <rect x="85" y="4" width="48" height="26" rx="4" fill="#dcfce7" stroke="#86efac" />
                    <text x="109" y="16" textAnchor="middle" fill="#15803d" fontSize="7.5" fontWeight="800">TARGET</text>
                    <text x="109" y="25" textAnchor="middle" fill="#166534" fontSize="7.5" fontWeight="700">5–6 cm</text>

                    {/* Dynamic Moving Needle / Plunger Indicator */}
                    <g className="depth-gauge-needle" transform="translate(15, 0)">
                      <circle cx="0" cy="17" r="8" fill="#e11d48" />
                      <line x1="0" y1="4" x2="0" y2="30" stroke="#ffffff" strokeWidth="2" />
                    </g>
                  </g>

                  {/* Recoil status */}
                  <g transform="translate(18, 132)">
                    <rect x="0" y="0" width="138" height="20" rx="4" fill="#f0fdf4" stroke="#bbf7d0" />
                    <text x="69" y="14" textAnchor="middle" fill="#166534" fontSize="8.5" fontWeight="700">
                      ✓ 100% Full Recoil Each Beat
                    </text>
                  </g>

                  {/* BPM badge */}
                  <text x="87" y="172" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="800">
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
