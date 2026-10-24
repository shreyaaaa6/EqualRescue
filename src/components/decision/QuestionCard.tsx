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
  XCircle,
  Copy,
  Check,
  Activity,
  Zap,
  Wind,
  Brain,
  MessageSquare,
  AlertTriangle,
  Sparkles
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
        return <Activity size={24} className="text-rose-600" />;
      case 'seizure':
        return <Zap size={24} className="text-amber-600" />;
      case 'choking':
        return <Wind size={24} className="text-cyan-600" />;
      case 'stroke':
        return <Brain size={24} className="text-purple-600" />;
      case 'heart_attack':
        return <Heart size={24} className="text-rose-600" />;
      case 'fainting':
        return <HelpCircle size={24} className="text-emerald-600" />;
      case 'allergy':
        return <AlertTriangle size={24} className="text-orange-600" />;
      default:
        return <ShieldCheck size={24} className="text-emerald-600" />;
    }
  };

  // -------------------------------------------------------------
  // If an option with advice is active, show the rich condition card
  // -------------------------------------------------------------
  if (selectedOption?.advice) {
    const { advice } = selectedOption;
    const spokenContent = `${advice.title}. ${advice.description}. First: ${advice.points.slice(0, 3).join('. ')}`;

    return (
      <div className="card-box advice-box" role="region" aria-live="polite">
        {/* Advice Header */}
        <div className="advice-header">
          <div className="advice-meta-row">
            <div className="advice-badge">
              {getConditionIcon(advice.conditionType)}
              <span>{advice.actionBadge || 'Emergency Guidance'}</span>
            </div>

            <button
              type="button"
              onClick={() => handleSpeak(spokenContent)}
              className="btn-tts-toggle"
              title={isSpeaking ? 'Stop voice reading' : 'Read guidance aloud'}
              aria-label="Read guidance aloud"
            >
              {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
              <span>{isSpeaking ? 'Mute' : 'Listen'}</span>
            </button>
          </div>

          <h2 className="advice-title">{advice.title}</h2>
          <p className="advice-desc">{advice.description}</p>
        </div>

        {/* Women-Centred Clinical & Legal Insight Card */}
        {advice.womenSpecificNote && (
          <aside className="advice-women-note-box" aria-label="Women's Health Insight">
            <div className="women-note-header">
              <Sparkles size={16} className="text-rose-600 flex-shrink-0" />
              <span className="women-note-title">Women's Health & Bystander Insight</span>
            </div>
            <p className="women-note-text">{advice.womenSpecificNote}</p>
          </aside>
        )}

        {/* Action Steps & Do's */}
        <div className="advice-checklist">
          <h3>
            <CheckCircle2 size={18} className="text-emerald-600" />
            <span>Immediate Actions to Take:</span>
          </h3>
          <ul className="advice-steps-list">
            {advice.points.map((pt, idx) => (
              <li key={idx} className="advice-step-item">
                <span className="step-num">{idx + 1}</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Warning / Don'ts Column */}
        {advice.donts && advice.donts.length > 0 && (
          <div className="advice-donts-box">
            <h4>
              <XCircle size={18} className="text-rose-600" />
              <span>Critical Warnings (What NOT to Do):</span>
            </h4>
            <ul className="donts-list">
              {advice.donts.map((dont, idx) => (
                <li key={idx} className="dont-item">
                  <span className="bullet-dont">✕</span>
                  <span>{dont}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 112 Dispatcher Script Helper */}
        {advice.dispatcherScript && (
          <div className="dispatcher-script-card">
            <div className="dispatcher-script-header">
              <div className="flex-row items-center gap-2">
                <MessageSquare size={16} className="text-rose-600" />
                <span className="font-semibold text-slate-800 text-sm">What to Tell the 112 Dispatcher:</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyScript(advice.dispatcherScript!)}
                className="btn-copy-script"
              >
                {scriptCopied ? <Check size={14} /> : <Copy size={14} />}
                <span>{scriptCopied ? 'Copied' : 'Copy Script'}</span>
              </button>
            </div>
            <p className="script-text">"{advice.dispatcherScript}"</p>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="advice-emergency-fallback">
          <div className="fallback-actions">
            <a href="tel:112" className="btn-call-112 btn-advice-call">
              <PhoneCall size={18} />
              <span>Call 112 Dispatcher</span>
            </a>

            {advice.requiresCprRedirect ? (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic();
                  navigate('/cpr');
                }}
                className="btn-primary-action btn-pulse-cpr"
              >
                <Activity size={18} />
                <span>Open CPR Metronome & Guide &rarr;</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  triggerHaptic();
                  navigate('/cpr');
                }}
                className="btn-secondary-cpr"
              >
                Go to CPR Metronome If Condition Deteriorates
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Question Node render (Assessment)
  // -------------------------------------------------------------
  const questionSpeech = `${node.question}. ${node.hint}`;

  return (
    <div className="card-box question-box">
      <div className="question-header">
        <div className="question-meta-row">
          <span className="step-badge">Assessment {node.stepNumber} of {node.totalSteps}</span>

          <button
            type="button"
            onClick={() => handleSpeak(questionSpeech)}
            className="btn-tts-toggle"
            title={isSpeaking ? 'Stop voice reading' : 'Read question aloud'}
            aria-label="Read question aloud"
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{isSpeaking ? 'Mute' : 'Listen'}</span>
          </button>
        </div>

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

          if (option.id === 'opt_conscious' || option.id.includes('normal')) {
            btnClass += ' btn-option-yes';
            icon = <CheckCircle2 size={24} className="opt-icon text-emerald-600" />;
          } else if (option.id === 'opt_unsure_conscious' || option.id.includes('unsure') || option.id.includes('diabetic') || option.id.includes('heat') || option.id.includes('head') || option.id.includes('intoxication') || option.id.includes('post_seizure')) {
            btnClass += ' btn-option-unsure';
            icon = <HelpCircle size={24} className="opt-icon text-amber-600" />;
          } else {
            btnClass += ' btn-option-no';
            icon = <AlertOctagon size={24} className="opt-icon text-rose-600" />;
          }

          return (
            <button
              key={option.id}
              type="button"
              className={btnClass}
              onClick={() => {
                triggerHaptic();
                onSelectOption(option);
              }}
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
