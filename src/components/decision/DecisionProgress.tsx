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
    <div className="decide-top-nav" role="navigation" aria-label="Assessment Navigation">
      <button 
        type="button" 
        onClick={onBack} 
        className="btn-back-clean"
        aria-label={canGoBack ? "Previous check" : "Exit to home"}
      >
        <ArrowLeft size={16} strokeWidth={2} />
        <span>{canGoBack ? 'Previous check' : 'Exit to home'}</span>
      </button>

      <span className="step-indicator-pill">Step {stepNumber} of {totalSteps}</span>

      <button
        type="button"
        onClick={onStartOver}
        className="btn-back-clean"
        title="Restart assessment"
      >
        <RotateCcw size={14} strokeWidth={2} />
        <span>Restart</span>
      </button>
    </div>
  );
};

