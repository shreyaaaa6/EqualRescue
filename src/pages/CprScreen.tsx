import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Smartphone, ShieldCheck, Info, AlertTriangle } from 'lucide-react';
import { useCprStateMachine } from '../hooks/useCprStateMachine';
import { useWakeLock } from '../hooks/useWakeLock';
import { AedReminderBanner } from '../components/cpr/AedReminderBanner';
import { PreTutorialNotice } from '../components/cpr/PreTutorialNotice';
import { UnifiedCprStage } from '../components/cpr/UnifiedCprStage';
import { CprSidebar } from '../components/cpr/CprSidebar';
import { WomenHesitationsPanel } from '../components/cpr/WomenHesitationsPanel';
import { InstructionStepCard } from '../components/cpr/InstructionStepCard';

export const CprScreen: React.FC = () => {
  // Wake lock keeps screen awake during CPR practice
  const { isLocked, isSupported } = useWakeLock(true);

  // Pre-tutorial safety notice state
  const [noticeDismissed, setNoticeDismissed] = useState<boolean>(false);

  // Stop Confirmation Modal
  const [showStopConfirm, setShowStopConfirm] = useState<boolean>(false);

  // Unified 30:2 CPR State Machine (handles repeating cycle, timer, and audio clicks)
  const {
    phase,
    isActive,
    isPaused,
    isRunning,
    compressionCount,
    breathStep,
    cycleNumber,
    bpm,
    isMuted,
    pulseActive,
    formattedTime,
    beginCpr,
    togglePlay,
    stopAndReset,
    toggleMute,
    setBpm,
  } = useCprStateMachine({ initialBpm: 110 });

  // Handle Stop Request
  const handleRequestStop = () => {
    if (isActive || compressionCount > 0) {
      setShowStopConfirm(true);
    } else {
      stopAndReset();
    }
  };

  const handleConfirmStop = () => {
    stopAndReset();
    setShowStopConfirm(false);
  };

  return (
    <div className="page-container cpr-unified-page-container">
      {/* Top Header & Wake Lock Status */}
      <div className="page-header-nav flex-between">
        <Link to="/decide" className="back-link">
          <ArrowLeft size={18} />
          <span>Return to Guidance</span>
        </Link>

        {isSupported && (
          <div className={`wake-lock-status-pill ${isLocked ? 'active' : ''}`} title="Screen will stay awake during CPR practice">
            <Smartphone size={14} />
            <span>{isLocked ? 'Screen Kept Awake' : 'WakeLock Ready'}</span>
          </div>
        )}
      </div>

      {/* Pre-Tutorial Notice Banner (Can be acknowledged or bypassed, never a barrier) */}
      {!noticeDismissed ? (
        <PreTutorialNotice
          onAcknowledge={() => setNoticeDismissed(true)}
          onEmergencyBypass={() => {
            setNoticeDismissed(true);
            beginCpr();
          }}
        />
      ) : (
        <aside className="notice-acknowledged-chip" aria-label="Pre-Tutorial Notice Status">
          <div className="chip-left">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span><strong>Notice Acknowledged:</strong> CPR basics are identical for women and men. Push through ordinary clothing.</span>
          </div>
          <button
            type="button"
            onClick={() => setNoticeDismissed(false)}
            className="btn-reopen-notice"
            title="Review full safety notice text"
          >
            <Info size={14} />
            <span>Review Notice</span>
          </button>
        </aside>
      )}

      {/* AED Quick Alert Strip */}
      <AedReminderBanner />

      {/* =========================================================================
          EXACT SCREEN LAYOUT: 75% MAIN AREA (LEFT) + 25% SIDEBAR (RIGHT)
          ========================================================================= */}
      <main className="cpr-unified-layout" role="region" aria-label="Unified CPR Tutorial Experience">
        {/* Main Content Area (~75% Width) */}
        <section className="cpr-main-stage-col" aria-label="CPR Instructional Video and Animation Area">
          <UnifiedCprStage
            phase={phase}
            isRunning={isRunning}
            isPaused={isPaused}
            pulseActive={pulseActive}
            bpm={bpm}
            compressionCount={compressionCount}
            breathStep={breathStep}
            cycleNumber={cycleNumber}
            onBeginCpr={beginCpr}
          />
        </section>

        {/* Right Sidebar (~25% Width) */}
        <section className="cpr-sidebar-col" aria-label="CPR Controls and Real-Time Telemetry">
          <CprSidebar
            phase={phase}
            isRunning={isRunning}
            isPaused={isPaused}
            formattedTime={formattedTime}
            compressionCount={compressionCount}
            breathStep={breathStep}
            cycleNumber={cycleNumber}
            bpm={bpm}
            isMuted={isMuted}
            onBeginCpr={beginCpr}
            onTogglePlay={togglePlay}
            onToggleMute={toggleMute}
            onBpmChange={setBpm}
            onRequestStop={handleRequestStop}
          />
        </section>
      </main>

      {/* Stop CPR Confirmation Modal Dialog */}
      {showStopConfirm && (
        <div className="cpr-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="stop-dialog-title">
          <div className="cpr-modal-card">
            <div className="modal-icon-header">
              <AlertTriangle size={32} className="text-amber-600" />
            </div>
            <h2 id="stop-dialog-title" className="modal-title">Stop CPR Practice Session?</h2>
            <p className="modal-desc">
              Are you sure you want to stop this CPR session? This will pause the timer and reset the compression count back to the initial hand-placement step.
            </p>
            <div className="modal-actions-row">
              <button
                type="button"
                onClick={handleConfirmStop}
                className="btn-modal-confirm-stop"
              >
                Yes, Stop & Reset
              </button>
              <button
                type="button"
                onClick={() => setShowStopConfirm(false)}
                className="btn-modal-cancel"
              >
                Cancel — Continue CPR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supporting Guidance Section: Common Hesitations Panel & Steps */}
      <section className="supporting-cpr-guidance-section">
        <WomenHesitationsPanel />
        <InstructionStepCard />
      </section>
    </div>
  );
};
