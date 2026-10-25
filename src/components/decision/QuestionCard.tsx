import React, { useState } from 'react';
import type { DecisionNode, DecisionOption } from '../../types/decision';
import {
  CheckCircle2,
  AlertOctagon,
  HelpCircle,
  PhoneCall,
  ShieldCheck,
  Heart,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Activity,
  Zap,
  Wind,
  Brain,
  AlertTriangle,
  Sparkles,
  ChevronDown
} from 'lucide-react';
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);

  // Trigger brief mobile haptic feedback if supported
  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(35);
    }
  };

  // Text-to-Speech function using Web Speech API
  const handleSpeak = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95; // slightly slower for emergency clarity
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyScript = (script: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(script);
      setScriptCopied(true);
      setTimeout(() => setScriptCopied(false), 2000);
    }
  };

  // Helper icon for condition types
  const getConditionIcon = (type?: string) => {
    switch (type) {
      case 'cardiac':
        return <Activity size={18} strokeWidth={2.5} />;
      case 'seizure':
        return <Zap size={18} strokeWidth={2.5} />;
      case 'choking':
        return <Wind size={18} strokeWidth={2.5} />;
      case 'stroke':
        return <Brain size={18} strokeWidth={2.5} />;
      case 'heart_attack':
        return <Heart size={18} strokeWidth={2.5} />;
      case 'fainting':
        return <HelpCircle size={18} strokeWidth={2.5} />;
      case 'allergy':
        return <AlertTriangle size={18} strokeWidth={2.5} />;
      default:
        return <ShieldCheck size={18} strokeWidth={2.5} />;
    }
  };

  // -------------------------------------------------------------
  // If an option with advice is active, show the Result Hierarchy
  // -------------------------------------------------------------
  if (selectedOption?.advice) {
    const { advice } = selectedOption;
    const spokenContent = `${advice.title}. ${advice.description}. Do now: ${advice.points.join('. ')}`;

    return (
      <div className="result-container" role="region" aria-live="polite">
        <div className="result-card-hierarchy">
          {/* (1) Condition Title with Icon */}
          <header className="result-condition-header">
            <div className="result-badge">
              {getConditionIcon(advice.conditionType)}
              <span>{advice.actionBadge || 'First-Aid Guidance'}</span>
            </div>
            <h1 className="result-condition-title">{advice.title}</h1>
            <p className="result-condition-desc">{advice.description}</p>
          </header>

          {/* (2) "Do now": Numbered Large Steps */}
          <section className="result-section-do" aria-label="Immediate Actions">
            <h2 className="section-label-bold">Do now</h2>
            <ol className="do-steps-list">
              {advice.points.map((pt, idx) => (
                <li key={idx} className="do-step-row">
                  <span className="step-num-badge">{idx + 1}</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* (3) "Don't": Compact Red-Tinted Box */}
          {advice.donts && advice.donts.length > 0 && (
            <section className="result-section-dont" aria-label="Critical Warnings">
              <div className="dont-header">
                <AlertOctagon size={16} strokeWidth={2.5} />
                <span>Don't</span>
              </div>
              <ul className="dont-items-list">
                {advice.donts.map((dont, idx) => (
                  <li key={idx} className="dont-item-row">
                    <span className="dont-cross">✕</span>
                    <span>{dont}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* (4) Women-specific / Pregnancy Note (Expandable Disclosure) */}
          {advice.womenSpecificNote && (
            <details className="result-disclosure-women">
              <summary>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} strokeWidth={2} />
                  Women & Pregnancy Considerations
                </span>
                <ChevronDown size={16} strokeWidth={2} />
              </summary>
              <div className="women-disclosure-content">
                {advice.womenSpecificNote}
              </div>
            </details>
          )}
        </div>

        {/* (5) Sticky Bottom Action Bar */}
        <div className="decide-sticky-action-bar" role="toolbar" aria-label="Action controls">
          {advice.requiresCprRedirect ? (
            <button
              type="button"
              onClick={() => {
                triggerHaptic();
                navigate('/cpr');
              }}
              className="btn-sticky-cpr"
            >
              <Activity size={18} strokeWidth={2.5} />
              <span>Start CPR Now</span>
            </button>
          ) : (
            <a href="tel:112" className="btn-sticky-cpr" style={{ textDecoration: 'none' }}>
              <PhoneCall size={18} strokeWidth={2.5} />
              <span>Call 112</span>
            </a>
          )}

          {advice.dispatcherScript && (
            <button
              type="button"
              onClick={() => handleCopyScript(advice.dispatcherScript!)}
              className="btn-action-tool"
              title={advice.dispatcherScript}
            >
              {scriptCopied ? <Check size={16} strokeWidth={2} /> : <Copy size={16} strokeWidth={2} />}
              <span>{scriptCopied ? 'Copied' : 'Dispatcher Script'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSpeak(spokenContent)}
            className="btn-action-tool"
            aria-label={isSpeaking ? 'Mute guidance' : 'Listen to guidance'}
          >
            {isSpeaking ? <VolumeX size={16} strokeWidth={2} /> : <Volume2 size={16} strokeWidth={2} />}
            <span>{isSpeaking ? 'Mute' : 'Listen'}</span>
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Question Assessment View (One question per full screen)
  // -------------------------------------------------------------
  const questionSpeech = `${node.question}. ${node.hint}`;

  return (
    <div className="question-presentation">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <h1 className="question-text-giant">{node.question}</h1>
        <button
          type="button"
          onClick={() => handleSpeak(questionSpeech)}
          className="btn-action-tool"
          style={{ minHeight: '36px', height: '36px', padding: '0 12px', flexShrink: 0 }}
          aria-label={isSpeaking ? 'Stop voice reading' : 'Read question aloud'}
        >
          {isSpeaking ? <VolumeX size={15} strokeWidth={2} /> : <Volume2 size={15} strokeWidth={2} />}
          <span>{isSpeaking ? 'Mute' : 'Listen'}</span>
        </button>
      </div>

      {node.hint && (
        <div className="question-hint-box">
          <HelpCircle size={18} strokeWidth={2} className="flex-shrink-0" style={{ marginTop: '2px', color: 'var(--brand-plum)' }} />
          <span>{node.hint}</span>
        </div>
      )}

      {/* Big Option Buttons */}
      <div className="options-vertical-group" role="group" aria-label={node.question}>
        {node.options.map((option) => {
          let variantClass = '';
          let icon = <CheckCircle2 size={24} strokeWidth={2} style={{ color: 'var(--success-green)' }} />;

          if (option.id === 'opt_conscious' || option.id.includes('normal')) {
            variantClass = 'opt-yes';
            icon = <CheckCircle2 size={24} strokeWidth={2} style={{ color: 'var(--success-green)' }} />;
          } else if (
            option.id === 'opt_unsure_conscious' ||
            option.id.includes('unsure') ||
            option.id.includes('diabetic') ||
            option.id.includes('heat') ||
            option.id.includes('head') ||
            option.id.includes('intoxication') ||
            option.id.includes('post_seizure')
          ) {
            variantClass = 'opt-unsure';
            icon = <HelpCircle size={24} strokeWidth={2} style={{ color: 'var(--amber-warning)' }} />;
          } else {
            variantClass = 'opt-no';
            icon = <AlertOctagon size={24} strokeWidth={2} style={{ color: 'var(--urgent-red)' }} />;
          }

          return (
            <button
              key={option.id}
              type="button"
              className={`btn-option-giant ${variantClass}`}
              onClick={() => {
                triggerHaptic();
                onSelectOption(option);
              }}
            >
              <div className="opt-icon-wrapper">{icon}</div>
              <div className="opt-text-block">
                <span className="opt-primary-title">{option.label}</span>
                {option.description && (
                  <span className="opt-secondary-desc">{option.description}</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

