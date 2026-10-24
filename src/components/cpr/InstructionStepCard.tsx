import React, { useState } from 'react';
import cprContentRaw from '../../data/cpr-content.json';
import type { CprInstructionStep } from '../../types/emergency';
import { Heart, ChevronDown, ChevronUp, Layers, ArrowDownCircle, CheckCircle } from 'lucide-react';

const cprContent = cprContentRaw as {
  general: {
    targetBpm: number;
    bpmRange: string;
    compressionDepth: string;
    recoilAdvice: string;
    ratioHandsOnly: string;
  };
  steps: CprInstructionStep[];
};

export const InstructionStepCard: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <section className="cpr-instructions-section" aria-label="Hands-Only CPR Instructions">
      <div className="instructions-header" onClick={() => setExpanded(!expanded)}>
        <div className="instructions-title-row">
          <Layers size={20} className="text-rose-600" />
          <h2 className="instructions-heading">Hands-Only CPR Steps (Women-Centered)</h2>
        </div>
        <button 
          type="button" 
          className="btn-toggle-instructions"
          aria-expanded={expanded}
          aria-label="Toggle instructions details"
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {expanded && (
        <div className="instructions-body">
          {/* Step Selector Tabs */}
          <div className="step-tabs-row" role="tablist">
            {cprContent.steps.map((st) => (
              <button
                key={st.step}
                type="button"
                role="tab"
                aria-selected={activeStep === st.step}
                className={`step-tab-btn ${activeStep === st.step ? 'active' : ''}`}
                onClick={() => setActiveStep(st.step)}
              >
                <span className="step-num-circle">{st.step}</span>
                <span className="step-tab-text">Step {st.step}</span>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          {cprContent.steps.map((st) => {
            if (st.step !== activeStep) return null;

            return (
              <article key={st.step} className="active-step-card" role="tabpanel">
                <div className="step-card-header">
                  <div className="step-badge-pill">Step {st.step} of 3</div>
                  <h3 className="step-card-title">{st.title}</h3>
                  <div className="key-action-banner">
                    <ArrowDownCircle size={18} className="text-rose-600 flex-shrink-0" />
                    <strong>Key Action: {st.keyAction}</strong>
                  </div>
                </div>

                {/* Visual Diagram per Step */}
                <div className="step-diagram-box">
                  {st.step === 1 && (
                    <div className="diagram-illustration hand-placement-diagram">
                      <svg viewBox="0 0 320 160" className="cpr-svg-diagram" aria-label="Hand placement diagram between breasts">
                        {/* Upper torso outline */}
                        <path d="M 40 150 C 40 90, 70 50, 110 40 C 130 35, 160 30, 160 30 C 160 30, 190 35, 210 40 C 250 50, 280 90, 280 150" fill="#fee2e2" stroke="#fda4af" strokeWidth="2.5" />
                        {/* Clavicle bones */}
                        <path d="M 110 45 Q 160 55 210 45" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
                        {/* Sternum target area */}
                        <rect x="142" y="55" width="36" height="60" rx="10" fill="#9f1239" opacity="0.9" />
                        {/* Interlocked Hands icon */}
                        <circle cx="160" cy="85" r="16" fill="#ffffff" />
                        <text x="160" y="89" textAnchor="middle" fill="#9f1239" fontSize="12" fontWeight="bold">HEEL</text>
                        {/* Breast boundary curves */}
                        <path d="M 90 90 Q 125 105 138 85" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
                        <path d="M 230 90 Q 195 105 182 85" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
                        {/* Marker text */}
                        <text x="160" y="135" textAnchor="middle" fill="#881337" fontSize="11" fontWeight="700">Exact Center: Between Breasts on Sternum</text>
                      </svg>
                    </div>
                  )}

                  {st.step === 2 && (
                    <div className="diagram-illustration push-depth-diagram">
                      <svg viewBox="0 0 320 160" className="cpr-svg-diagram" aria-label="Compression depth diagram: 2 inches">
                        <line x1="60" y1="40" x2="260" y2="40" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
                        <text x="70" y="32" fill="#64748b" fontSize="10">Chest at rest</text>
                        
                        <line x1="60" y1="105" x2="260" y2="105" stroke="#dc2626" strokeWidth="2" />
                        <text x="70" y="122" fill="#dc2626" fontSize="10" fontWeight="bold">Compressed depth (At least 2 inches / 5 cm)</text>

                        {/* Compression arrow */}
                        <line x1="160" y1="35" x2="160" y2="98" stroke="#dc2626" strokeWidth="4" />
                        <polygon points="152,98 168,98 160,112" fill="#dc2626" />

                        <rect x="180" y="55" width="100" height="30" rx="6" fill="#fef2f2" stroke="#fecdd3" />
                        <text x="230" y="74" textAnchor="middle" fill="#9f1239" fontSize="11" fontWeight="bold">2 in / 5 cm</text>
                      </svg>
                    </div>
                  )}

                  {st.step === 3 && (
                    <div className="diagram-illustration continuous-diagram">
                      <svg viewBox="0 0 320 160" className="cpr-svg-diagram" aria-label="Continuous cycle and AED arrival">
                        <circle cx="100" cy="80" r="42" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
                        <text x="100" y="75" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">110 BPM</text>
                        <text x="100" y="93" textAnchor="middle" fill="#64748b" fontSize="10">Don't Stop</text>

                        <path d="M 150 80 L 180 80" stroke="#9f1239" strokeWidth="3" markerEnd="url(#arrow)" />
                        
                        <rect x="195" y="45" width="85" height="70" rx="8" fill="#fef3c7" stroke="#fde68a" strokeWidth="2" />
                        <text x="237" y="75" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">AED Unit</text>
                        <text x="237" y="92" textAnchor="middle" fill="#b45309" fontSize="10">Turn ON</text>
                      </svg>
                    </div>
                  )}
                </div>

                <p className="step-main-desc">{st.description}</p>

                <div className="step-points-list">
                  {st.detailPoints.map((pt, idx) => (
                    <div key={idx} className="step-point-item">
                      <CheckCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}

          {/* Women-Centred Reassurance Callout */}
          <div className="women-reassurance-box">
            <Heart size={20} className="text-rose-600 flex-shrink-0" />
            <div>
              <strong>Why Women-Centered Guidance Matters:</strong>
              <p>
                Studies show women are up to 27% less likely than men to receive bystander CPR in public due to rescuer fears of touching the chest, false fears of causing injury, or modesty hesitation. Remember: <strong>The technique is identical. Hands on the sternum. Push hard and fast. You have Good Samaritan legal protection.</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
