import React from 'react';
import type { DecisionNode, DecisionOption } from '../../types/decision';
import { CheckCircle2, AlertOctagon, HelpCircle, PhoneCall, ShieldCheck, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuestionCardProps {
  node: DecisionNode;
  selectedOption: DecisionOption | null;
  onSelectOption: (option: DecisionOption) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  node,
  selectedOption,
  onSelectOption,
}) => {
  const navigate = useNavigate();

  // If an option with advice is active, show the verified guidance card
  if (selectedOption?.advice) {
    const { advice } = selectedOption;
    return (
      <div className="card-box advice-box" role="region" aria-live="polite">
        <div className="advice-header">
          <div className="advice-badge">
            <ShieldCheck size={18} />
            <span>{advice.actionBadge || 'Guidance'}</span>
          </div>
          <h2 className="advice-title">{advice.title}</h2>
          <p className="advice-desc">{advice.description}</p>
        </div>

        <div className="advice-checklist">
          <h3>Recommended Actions:</h3>
          <ul>
            {advice.points.map((pt, idx) => (
              <li key={idx}>
                <CheckCircle2 size={18} className="advice-icon text-emerald-600 flex-shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="advice-emergency-fallback">
          <div className="fallback-note">
            <Heart size={18} className="text-rose-600 flex-shrink-0" />
            <p>
              If their condition changes and they become unresponsive or stop breathing, start CPR immediately.
            </p>
          </div>
          <div className="fallback-actions">
            <a href="tel:112" className="btn-call-112 btn-advice-call">
              <PhoneCall size={18} />
              <span>Call 112 Dispatcher</span>
            </a>
            <button
              type="button"
              onClick={() => navigate('/cpr')}
              className="btn-secondary-cpr"
            >
              Go to CPR Guide If Needed
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Question Node render
  return (
    <div className="card-box question-box">
      <div className="question-header">
        <span className="step-badge">Assessment {node.stepNumber} of {node.totalSteps}</span>
        <h1 className="question-title">{node.question}</h1>
        <p className="question-hint">
          <HelpCircle size={16} className="hint-icon" />
          <span>{node.hint}</span>
        </p>
      </div>

      <div className="options-stack" role="group" aria-label={node.question}>
        {node.options.map((option) => {
          let btnClass = 'option-button';
          let icon = <CheckCircle2 size={24} className="opt-icon" />;

          if (option.id.includes('yes') || option.id.includes('normal')) {
            btnClass += ' btn-option-yes';
            icon = <CheckCircle2 size={24} className="opt-icon text-emerald-600" />;
          } else if (option.id.includes('no') || option.id.includes('abnormal')) {
            btnClass += ' btn-option-no';
            icon = <AlertOctagon size={24} className="opt-icon text-rose-600" />;
          } else {
            btnClass += ' btn-option-unsure';
            icon = <HelpCircle size={24} className="opt-icon text-amber-600" />;
          }

          return (
            <button
              key={option.id}
              type="button"
              className={btnClass}
              onClick={() => onSelectOption(option)}
            >
              <div className="option-icon-box">{icon}</div>
              <div className="option-text-group">
                <span className="option-primary-label">{option.label}</span>
                {option.description && (
                  <span className="option-sub-desc">{option.description}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
