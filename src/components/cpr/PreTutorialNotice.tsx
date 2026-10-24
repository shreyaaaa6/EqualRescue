import React from 'react';
import { ShieldAlert, PhoneCall, CheckCircle2 } from 'lucide-react';

interface PreTutorialNoticeProps {
  onAcknowledge: () => void;
  onEmergencyBypass?: () => void;
}

export const PreTutorialNotice: React.FC<PreTutorialNoticeProps> = ({
  onAcknowledge,
}) => {
  return (
    <section className="pre-tutorial-notice-card" aria-label="Pre-Tutorial Safety Notice">
      <div className="notice-banner-header">
        <div className="notice-tag-badge">
          <ShieldAlert size={18} className="text-rose-600" />
          <span>MANDATORY PRE-TUTORIAL SAFETY NOTICE</span>
        </div>
        <div className="emergency-quick-phone">
          <a href="tel:112" className="btn-notice-phone" title="Call 112 immediately in India">
            <PhoneCall size={16} className="animate-shake" />
            <span>Call 112 Emergency</span>
          </a>
        </div>
      </div>

      <div className="notice-body-content">
        <blockquote className="official-notice-quote">
          “<strong>IMPORTANT:</strong> CPR basics are generally the same for adult men and women. Do not delay emergency care because of the person's sex, clothing, or concerns about touching their chest. If an adult is unresponsive and not breathing normally or is only gasping, call <strong>112</strong> in India, use speakerphone, and follow the emergency dispatcher's instructions. Get an AED if available.”
        </blockquote>

        <p className="notice-context-sub">
          This educational guide provides real-time rhythm and anatomical visual support. Acknowledging this safety notice ensures you are prepared to save a life calmly and correctly.
        </p>
      </div>

      <div className="notice-actions-group">
        <button
          type="button"
          onClick={onAcknowledge}
          className="btn-notice-confirm"
          id="acknowledge-tutorial-btn"
        >
          <CheckCircle2 size={20} />
          <span>I understand — Start Tutorial</span>
        </button>
      </div>
    </section>
  );
};
