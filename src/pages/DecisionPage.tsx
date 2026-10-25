import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      navigate('/cpr');
    }
  }, [isEmergencyRedirect, navigate]);

  const handleBack = () => {
    if (canGoBack) {
      goBack();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="decide-screen">
      {/* Slim Top Navigation */}
      <DecisionProgress
        stepNumber={currentNode.stepNumber}
        totalSteps={currentNode.totalSteps}
        canGoBack={canGoBack}
        onBack={handleBack}
        onStartOver={startOver}
      />

      {/* Decision Tree Active Question / Advice Card */}
      <QuestionCard
        node={currentNode}
        selectedOption={selectedOption}
        onSelectOption={selectOption}
      />
    </div>
  );
};

