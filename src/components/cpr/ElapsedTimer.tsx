import React from 'react';
import { Play, Pause, RotateCcw, Clock, RefreshCw } from 'lucide-react';

interface ElapsedTimerProps {
  formattedTime: string;
  totalSeconds: number;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export const ElapsedTimer: React.FC<ElapsedTimerProps> = ({
  formattedTime,
  totalSeconds,
  isRunning,
  onToggle,
  onReset,
}) => {
  // AHA CPR Guidelines recommend rotating rescuers every 2 minutes (120 seconds) to prevent fatigue
  const cycleCount = Math.floor(totalSeconds / 120);
  const secondsIntoCycle = totalSeconds % 120;
  const isSwitchRescuerTime = totalSeconds > 0 && secondsIntoCycle >= 110 && secondsIntoCycle < 120;

  return (
    <div className="elapsed-timer-container">
      <div className="timer-header">
        <div className="timer-badge">
          <Clock size={14} />
          <span>Continuous CPR Timer</span>
        </div>
        {totalSeconds >= 120 && (
          <span className="cycle-badge">
            <RefreshCw size={12} />
            Cycle {cycleCount + 1} ({Math.floor(secondsIntoCycle)}s / 120s)
          </span>
        )}
      </div>

      <div className="timer-display-main" aria-label={`Elapsed time: ${formattedTime}`}>
        <span className="timer-digits-text">{formattedTime}</span>
        <span className="timer-sublabel">mm:ss</span>
      </div>

      {isSwitchRescuerTime && (
        <div className="switch-rescuer-alert" role="alert">
          <RefreshCw size={16} className="animate-spin" />
          <strong>2-Minute Rescuer Switch Alert:</strong> Switch rescuers now if someone is available to maintain compression depth!
        </div>
      )}

      <div className="timer-button-row">
        <button
          type="button"
          onClick={onToggle}
          className={`btn-timer-toggle ${isRunning ? 'is-active' : ''}`}
          aria-label={isRunning ? 'Pause Timer' : 'Start Timer'}
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
          <span>{isRunning ? 'Pause Timer' : 'Start Timer'}</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="btn-timer-reset"
          title="Reset timer to 00:00"
          aria-label="Reset Timer"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
