import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface DecisionProgressProps {
  stepNumber: number;
  totalSteps: number;
  canGoBack: boolean;
  onBack: () => void;
  onStartOver: () => void;
}

export const DecisionProgress: React.FC<DecisionProgressProps> = ({
  stepNumber,
  totalSteps,
  canGoBack,
  onBack,
  onStartOver,
}) => {
  return (
    <div className="decision-progress-bar">
      <div className="decision-nav-actions">
        {canGoBack && (
          <button 
            type="button" 
            onClick={onBack} 
            className="btn-step-back"
            aria-label="Previous check"
          >
            <ArrowLeft size={16} />
            <span>Previous Check</span>
          </button>
        )}
        <button
          type="button"
          onClick={onStartOver}
          className="btn-step-restart"
          title="Restart from beginning"
        >
          <RotateCcw size={14} />
          <span>Start Over</span>
        </button>
      </div>

      <div className="progress-indicator-pill">
        <span>Step {stepNumber} of {totalSteps}</span>
      </div>
    </div>
  );
};
