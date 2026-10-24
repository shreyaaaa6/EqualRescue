import React from 'react';
import { Volume2, VolumeX, Play, Pause, Activity, Wind, Zap } from 'lucide-react';
import type { CprTutorialMode, CyclePhase } from '../../types/emergency';

interface MetronomePulseProps {
  bpm: number;
  isPlaying: boolean;
  isMuted: boolean;
  pulseActive: boolean;
  beatCount: number;
  mode?: CprTutorialMode;
  cycleNumber?: number;
  cyclePhase?: CyclePhase;
  breathSecondsLeft?: number;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onBpmChange: (bpm: number) => void;
  onModeChange?: (mode: CprTutorialMode) => void;
  onResumeAfterBreaths?: () => void;
}

export const MetronomePulse: React.FC<MetronomePulseProps> = ({
  bpm,
  isPlaying,
  isMuted,
  pulseActive,
  beatCount,
  mode = 'hands-only',
  cycleNumber = 1,
  cyclePhase = 'compressions',
  breathSecondsLeft = 4,
  onTogglePlay,
  onToggleMute,
  onBpmChange,
  onModeChange,
  onResumeAfterBreaths,
}) => {
  const currentInCycle = beatCount > 0 ? ((beatCount - 1) % 30) + 1 : 0;
  const cycleProgressPct = Math.round((currentInCycle / 30) * 100);

  return (
    <div className="metronome-card">
      {/* Tutorial Mode Selector */}
      {onModeChange && (
        <div className="tutorial-mode-tabs" role="tablist" aria-label="CPR Protocol Mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'hands-only'}
            className={`mode-tab-btn ${mode === 'hands-only' ? 'active' : ''}`}
            onClick={() => onModeChange('hands-only')}
          >
            <Zap size={15} />
            <span>Hands-Only Adult CPR (Recommended)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'cycle-30-2'}
            className={`mode-tab-btn ${mode === 'cycle-30-2' ? 'active' : ''}`}
            onClick={() => onModeChange('cycle-30-2')}
          >
            <Wind size={15} />
            <span>30:2 Cycle (Trained Rescuers)</span>
          </button>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="metronome-top-bar">
        <div className="metronome-title-group">
          <Activity size={18} className="text-rose-600" />
          <span className="metronome-title">AHA 100–120 BPM Target</span>
        </div>

        <button
          type="button"
          onClick={onToggleMute}
          className={`btn-mute-toggle ${isMuted ? 'muted' : 'unmuted'}`}
          title={isMuted ? 'Unmute Audio Beeps' : 'Mute Sound (Visual Pulse Only)'}
          aria-label={isMuted ? 'Unmute Metronome Sound' : 'Mute Metronome Sound'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          <span>{isMuted ? 'Sound Muted' : 'Sound ON'}</span>
        </button>
      </div>

      {/* 30:2 Cycle Phase Alert Banner */}
      {mode === 'cycle-30-2' && cyclePhase === 'breaths' ? (
        <div className="breath-prompt-banner animate-fade-in" role="alert">
          <div className="breath-header">
            <Wind size={24} className="text-sky-400 animate-pulse" />
            <div>
              <h3 className="breath-title">GIVE 2 RESCUE BREATHS NOW</h3>
              <p className="breath-desc">
                Tilt head back, lift chin, pinch nose. Give 2 gentle breaths (1 sec each) until chest rises.
              </p>
            </div>
          </div>
          <div className="breath-countdown-row">
            <span className="breath-timer-pill">Resuming compressions in: <strong>{breathSecondsLeft}s</strong></span>
            {onResumeAfterBreaths && (
              <button
                type="button"
                onClick={onResumeAfterBreaths}
                className="btn-resume-compressions"
              >
                Breaths Done — Resume Now &rarr;
              </button>
            )}
          </div>
        </div>
      ) : null}

      {/* 30:2 Progress Bar */}
      {mode === 'cycle-30-2' && (
        <div className="cycle-progress-strip">
          <div className="cycle-meta-row">
            <span className="cycle-num-tag">Cycle #{cycleNumber}</span>
            <span className="cycle-count-tag">Compression <strong>{currentInCycle}</strong> of 30</span>
          </div>
          <div className="progress-track" role="progressbar" aria-valuenow={currentInCycle} aria-valuemin={0} aria-valuemax={30}>
            <div className="progress-bar-fill" style={{ width: `${cycleProgressPct}%` }} />
          </div>
        </div>
      )}

      {/* Visual Beat Ring Container */}
      <div className="pulse-visual-stage">
        <div className={`pulse-ring-outer ${pulseActive && isPlaying ? 'ring-radiate' : ''}`} />
        <div className={`pulse-ring-mid ${pulseActive && isPlaying ? 'ring-radiate-delayed' : ''}`} />

        <button
          type="button"
          onClick={onTogglePlay}
          className={`beat-center-circle ${isPlaying ? 'running' : 'idle'} ${pulseActive && isPlaying ? 'beat-flash' : ''}`}
          aria-label={isPlaying ? 'Pause CPR Metronome' : 'Start CPR Metronome'}
        >
          <span className="bpm-number">{bpm}</span>
          <span className="bpm-sub">BEATS / MIN</span>
          <div className="bpm-status-indicator">
            {isPlaying ? (
              <span className="live-beat-pill">
                <span className="live-dot" /> PUSH NOW
              </span>
            ) : (
              <span className="tap-start-pill">
                <Play size={12} className="inline mr-1" /> TAP TO START
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Quick Tempo Selector & Counter */}
      <div className="tempo-controls-row">
        <div className="tempo-buttons" role="group" aria-label="BPM Adjustment">
          <span className="tempo-label">Rate:</span>
          {[100, 110, 120].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => onBpmChange(rate)}
              className={`btn-tempo ${bpm === rate ? 'active' : ''}`}
            >
              {rate} BPM {rate === 110 ? '(Sweet Spot)' : ''}
            </button>
          ))}
        </div>

        {isPlaying && (
          <div className="compression-counter-pill">
            <span>
              {mode === 'cycle-30-2' ? `Cycle ${cycleNumber}: ` : 'Total: '}
              <strong>{beatCount}</strong> compressions
            </span>
          </div>
        )}
      </div>

      {/* Big Master Toggle Button */}
      <div className="metronome-action-bar">
        <button
          type="button"
          onClick={onTogglePlay}
          className={`btn-primary-rhythm ${isPlaying ? 'btn-stop-mode' : 'btn-start-mode'}`}
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
          <span>{isPlaying ? 'Pause Metronome & Visual Beat' : 'Start 110 BPM Compression Beat'}</span>
        </button>
      </div>
    </div>
  );
};
