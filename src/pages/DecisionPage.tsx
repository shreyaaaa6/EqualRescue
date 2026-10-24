import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const DecisionPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header-nav">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="card-box">
        <span className="step-indicator">Question 1 of 2</span>
        <h1 className="question-title">
          Does the person respond when you firmly tap their shoulders and shout?
        </h1>
        <p className="question-hint">
          Shout loudly: "Are you okay?" and tap both shoulders firmly.
        </p>

        <div className="options-stack">
          <button className="option-button btn-yes">
            <CheckCircle2 size={20} />
            <span>Yes, they respond or move</span>
          </button>
          
          <button className="option-button btn-no">
            <span>No, they are completely unresponsive</span>
          </button>

          <button className="option-button btn-unsure">
            <span>Not sure</span>
          </button>
        </div>
      </div>
    </div>
  );
};
