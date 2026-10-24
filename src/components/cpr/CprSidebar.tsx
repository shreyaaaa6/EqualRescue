import React from 'react';
import { Play, Pause, Square, Volume2, VolumeX, PhoneCall, Clock, Activity, ShieldAlert } from 'lucide-react';
import type { CyclePhase } from '../../types/emergency';

interface CprSidebarProps {
  phase: CyclePhase;
  isRunning: boolean;
  isPaused: boolean;
  formattedTime: string;
  compressionCount: number;
  breathStep: 1 | 2;
  cycleNumber: number;
  bpm: number;
  isMuted: boolean;
  onBeginCpr: () => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onBpmChange: (bpm: number) => void;
  onRequestStop: () => void;
}

export const CprSidebar: React.FC<CprSidebarProps> = ({
  phase,
  isRunning,
  isPaused,
  formattedTime,
  compressionCount,
  breathStep,
  cycleNumber,
  bpm,
  isMuted,
  onBeginCpr,
  onTogglePlay,
  onToggleMute,
  onBpmChange,
  onRequestStop,
}) => {
  // Format current compression 01/30
  const formattedCount = String(compressionCount).padStart(2, '0');
  const compressionProgressPct = Math.min(100, Math.round((compressionCount / 30) * 100));

  return (
    <aside className="cpr-sidebar-panel" aria-label="CPR Session Sidebar Controls">
      {/* 1. Elapsed Timer Card */}
      <div className="sidebar-card timer-sidebar-card">
        <div className="card-top-row">
          <div className="metric-label-group">
            <Clock size={16} className="text-slate-500" />
            <span className="metric-label">ELAPSED TIMER</span>
          </div>
          <span className={`status-dot ${isRunning ? 'running' : 'idle'}`}>
            {isRunning ? 'ACTIVE' : isPaused ? 'PAUSED' : phase === 'placement' ? 'READY' : 'PAUSED'}
          </span>
        </div>
        <div className="big-time-display font-mono" id="cpr-elapsed-time">
          {formattedTime}
        </div>
        <div className="time-sub-note">
          {phase === 'placement'
            ? 'Timer starts when CPR begins'
            : `Continuous 30:2 cycle (Cycle #${cycleNumber})`}
        </div>
      </div>

      {/* 2. Dynamic Count Card (Compressions 07/30 during compressions, Rescue breaths 1/2 or 2/2 during breaths) */}
      <div className="sidebar-card counter-sidebar-card">
        <div className="card-top-row">
          <div className="metric-label-group counter-label-group">
            <Activity size={16} className="text-rose-600" style={{ flexShrink: 0 }} />
            <span className="metric-label metric-label-wrap">
              {phase === 'breaths' ? 'RESCUE BREATHS' : 'COMPRESSIONS'}
              <span className="metric-cycle-tag">CYCLE #{cycleNumber}</span>
            </span>
          </div>
        </div>

        {/* Dynamic Display — word label above, large numeric count below */}
        {phase === 'breaths' ? (
          <div className="counter-display-block" id="cpr-compression-count">
            <span className="counter-word-label text-sky-600">Rescue breaths</span>
            <span className="counter-num-large font-mono text-sky-600">{breathStep}/2</span>
          </div>
        ) : phase === 'compressions' ? (
          <div className="counter-display-block" id="cpr-compression-count">
            <span className="counter-word-label">Compressions done</span>
            <span className="counter-num-large font-mono">{formattedCount}/30</span>
          </div>
        ) : (
          <div className="counter-display-block" id="cpr-compression-count">
            <span className="counter-word-label text-slate-400">Compressions</span>
            <span className="counter-num-large font-mono text-slate-400">00/30</span>
          </div>
        )}

        {/* Progress Bar */}
        {phase === 'compressions' && (
          <div className="sidebar-cycle-progress">
            <div className="cycle-progress-track">
              <div className="cycle-progress-fill" style={{ width: `${compressionProgressPct}%` }} />
            </div>
            <div className="progress-labels">
              <span>01</span>
              <span>15</span>
              <span>30 / 30</span>
            </div>
          </div>
        )}

        {phase === 'breaths' && (
          <div className="sidebar-breath-step-indicators">
            <div className={`breath-indicator-step ${breathStep === 1 ? 'active' : 'completed'}`}>
              Breath 1/2 {breathStep === 2 ? '✓' : ''}
            </div>
            <div className={`breath-indicator-step ${breathStep === 2 ? 'active' : 'pending'}`}>
              Breath 2/2
            </div>
          </div>
        )}

        {phase === 'placement' && (
          <div className="time-sub-note">
            Will count from 01/30 to 30/30 when started
          </div>
        )}
      </div>

      {/* 3. Target Rate (100-120 BPM) & Sound Selector */}
      <div className="sidebar-card rate-sound-card">
        <div className="rate-selector-group">
          <span className="metric-label">TARGET COMPRESSION RATE</span>
          <div className="rate-buttons-row" role="group" aria-label="BPM Target Selection">
            {[100, 110, 120].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => onBpmChange(rate)}
                className={`btn-rate-choice ${bpm === rate ? 'active' : ''}`}
              >
                {rate} {rate === 110 ? '★' : ''}
              </button>
            ))}
          </div>
          <span className="rate-recommendation-text">100–120 per minute (110 recommended)</span>
        </div>

        <div className="sound-toggle-row">
          <button
            type="button"
            onClick={onToggleMute}
            className={`btn-sound-toggle ${isMuted ? 'muted' : 'unmuted'}`}
            title={isMuted ? 'Unmute Metronome Sound' : 'Mute Metronome Sound'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{isMuted ? 'Metronome Audio: Muted' : 'Metronome Audio: ON'}</span>
          </button>
        </div>
      </div>

      {/* 4. Controls Section (Begin CPR, Pause, Resume, Stop) */}
      <div className="sidebar-controls-section">
        {phase === 'placement' ? (
          <button
            type="button"
            onClick={onBeginCpr}
            className="btn-sidebar-primary btn-start-theme"
            id="sidebar-begin-cpr-btn"
          >
            <Play size={18} className="fill-current" />
            <span>Begin CPR Practice</span>
          </button>
        ) : (
          <div className="running-controls-stack">
            <button
              type="button"
              onClick={onTogglePlay}
              className={`btn-sidebar-primary ${isRunning ? 'btn-pause-theme' : 'btn-resume-theme'}`}
              id="sidebar-toggle-play-btn"
            >
              {isRunning ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
              <span>{isRunning ? 'Pause CPR Session' : 'Resume CPR Session'}</span>
            </button>

            <button
              type="button"
              onClick={onRequestStop}
              className="btn-sidebar-secondary btn-stop-theme"
              id="sidebar-stop-cpr-btn"
            >
              <Square size={16} />
              <span>Stop & Reset Session</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. Emergency 112 & AED Visible Reminder */}
      <div className="sidebar-emergency-box">
        <div className="emergency-header-row">
          <ShieldAlert size={18} className="text-rose-600 flex-shrink-0" />
          <strong>Call 112 in India & Get AED</strong>
        </div>
        <p className="emergency-sub-text">
          Use speakerphone so both hands stay free. If an AED is available, turn it on and follow its voice prompts immediately.
        </p>
        <a href="tel:112" className="btn-sidebar-call-112">
          <PhoneCall size={16} className="animate-shake" />
          <span>Call 112 Emergency</span>
        </a>
      </div>
    </aside>
  );
};
