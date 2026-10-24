import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useDecisionTree } from '../hooks/useDecisionTree';
import { QuestionCard } from '../components/decision/QuestionCard';
import { DecisionProgress } from '../components/decision/DecisionProgress';

export const DecisionPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentNode,
    selectedOption,
    canGoBack,
    isEmergencyRedirect,
    selectOption,
    goBack,
    startOver,
  } = useDecisionTree();

  // Handle immediate emergency redirect to CPR screen
  useEffect(() => {
    if (isEmergencyRedirect) {
      // Immediate clean transfer to CPR screen
      navigate('/cpr');
    }
  }, [isEmergencyRedirect, navigate]);

  return (
    <div className="page-container decision-flow-page">
      {/* Top Header */}
      <div className="page-header-nav flex-between">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>

        <DecisionProgress
          stepNumber={currentNode.stepNumber}
          totalSteps={currentNode.totalSteps}
          canGoBack={canGoBack}
          onBack={goBack}
          onStartOver={startOver}
        />
      </div>

      {/* Decision Tree Active Question / Advice Card */}
      <main className="decision-main-area">
        <QuestionCard
          node={currentNode}
          selectedOption={selectedOption}
          onSelectOption={selectOption}
        />
      </main>

      {/* Emergency Immediate Action Escape Hatch */}
      <aside className="decision-direct-cpr-banner" aria-label="Direct CPR Shortcut">
        <div className="direct-cpr-info">
          <AlertTriangle size={20} className="text-rose-600 flex-shrink-0" />
          <div>
            <strong>Already certain the person needs CPR?</strong>
            <p>Do not wait for questions—start chest compressions immediately.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/cpr')}
          className="btn-shortcut-cpr"
        >
          Skip to CPR Guide & Metronome
        </button>
      </aside>

      {/* Reassurance Note */}
      <div className="decision-reassurance-footer">
        <ShieldCheck size={16} className="text-rose-600 flex-shrink-0" />
        <span>Standard CPR is safe. Starting compressions promptly when in doubt gives the person the best chance of survival.</span>
      </div>
    </div>
  );
};
