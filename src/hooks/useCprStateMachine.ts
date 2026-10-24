import { useState, useRef, useEffect, useCallback } from 'react';
import type { CyclePhase } from '../types/emergency';

interface UseCprStateMachineOptions {
  initialBpm?: number;
}

export function useCprStateMachine({ initialBpm = 110 }: UseCprStateMachineOptions = {}) {
  const [phase, setPhase] = useState<CyclePhase>('placement');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [compressionCount, setCompressionCount] = useState<number>(0); // 1..30
  const [breathStep, setBreathStep] = useState<1 | 2>(1); // 1 for breath 1/2, 2 for breath 2/2
  const [cycleNumber, setCycleNumber] = useState<number>(1);
  const [bpm, setBpm] = useState<number>(initialBpm);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [pulseActive, setPulseActive] = useState<boolean>(false);

  // Stopwatch state
  const [elapsedMs, setElapsedMs] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedMsRef = useRef<number>(0);
  const stopwatchIntervalRef = useRef<number | null>(null);

  // Audio Context
  const audioContextRef = useRef<AudioContext | null>(null);

  // Active timers
  const compressionTimeoutRef = useRef<number | null>(null);
  const breathTimeoutRef = useRef<number | null>(null);
  const pulseTimeoutRef = useRef<number | null>(null);

  // Live mutable refs to eliminate stale closure bugs
  const bpmRef = useRef<number>(bpm);
  const isMutedRef = useRef<boolean>(isMuted);
  const isPausedRef = useRef<boolean>(isPaused);
  const phaseRef = useRef<CyclePhase>(phase);
  const countRef = useRef<number>(compressionCount);
  const breathStepRef = useRef<1 | 2>(breathStep);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    countRef.current = compressionCount;
  }, [compressionCount]);

  useEffect(() => {
    breathStepRef.current = breathStep;
  }, [breathStep]);

  // Initialize AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().catch(() => {});
    }
    return audioContextRef.current;
  }, []);

  // Play crisp metronome audio click
  const playClick = useCallback(() => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(1.0, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio fallback handling
    }
  }, [getAudioContext]);

  // Stopwatch controls
  const startStopwatch = useCallback(() => {
    startTimeRef.current = Date.now();
    if (stopwatchIntervalRef.current !== null) {
      window.clearInterval(stopwatchIntervalRef.current);
    }
    stopwatchIntervalRef.current = window.setInterval(() => {
      if (startTimeRef.current !== null) {
        const delta = Date.now() - startTimeRef.current;
        setElapsedMs(accumulatedMsRef.current + delta);
      }
    }, 200);
  }, []);

  const pauseStopwatch = useCallback(() => {
    if (startTimeRef.current !== null) {
      accumulatedMsRef.current += Date.now() - startTimeRef.current;
      startTimeRef.current = null;
    }
    if (stopwatchIntervalRef.current !== null) {
      window.clearInterval(stopwatchIntervalRef.current);
      stopwatchIntervalRef.current = null;
    }
  }, []);

  const resumeStopwatch = useCallback(() => {
    startTimeRef.current = Date.now();
    if (stopwatchIntervalRef.current !== null) {
      window.clearInterval(stopwatchIntervalRef.current);
    }
    stopwatchIntervalRef.current = window.setInterval(() => {
      if (startTimeRef.current !== null) {
        const delta = Date.now() - startTimeRef.current;
        setElapsedMs(accumulatedMsRef.current + delta);
      }
    }, 200);
  }, []);

  const resetStopwatch = useCallback(() => {
    if (stopwatchIntervalRef.current !== null) {
      window.clearInterval(stopwatchIntervalRef.current);
      stopwatchIntervalRef.current = null;
    }
    startTimeRef.current = null;
    accumulatedMsRef.current = 0;
    setElapsedMs(0);
  }, []);

  // Forward declaration refs for recursive scheduling
  const scheduleNextCompressionRef = useRef<() => void>(() => {});
  const transitionToBreathsRef = useRef<() => void>(() => {});
  const transitionToCompressionsRef = useRef<() => void>(() => {});

  // Compressions recursive tick
  const scheduleNextCompression = useCallback(() => {
    if (isPausedRef.current || phaseRef.current !== 'compressions') return;

    const intervalMs = (60 / bpmRef.current) * 1000;

    if (compressionTimeoutRef.current !== null) {
      window.clearTimeout(compressionTimeoutRef.current);
    }

    compressionTimeoutRef.current = window.setTimeout(() => {
      if (isPausedRef.current || phaseRef.current !== 'compressions') return;

      const nextCount = countRef.current + 1;
      setCompressionCount(nextCount);
      countRef.current = nextCount;

      // Play audio click & pulse
      playClick();
      setPulseActive(true);
      if (pulseTimeoutRef.current !== null) clearTimeout(pulseTimeoutRef.current);
      pulseTimeoutRef.current = window.setTimeout(() => setPulseActive(false), 90);

      if (nextCount >= 30) {
        // 30 compressions reached: automatically transition to rescue breaths
        transitionToBreathsRef.current();
      } else {
        // Continue to next compression
        scheduleNextCompressionRef.current();
      }
    }, intervalMs);
  }, [playClick]);

  // Transition from 30 compressions to rescue breaths (1/2 -> 2/2)
  const transitionToBreaths = useCallback(() => {
    if (compressionTimeoutRef.current !== null) {
      window.clearTimeout(compressionTimeoutRef.current);
      compressionTimeoutRef.current = null;
    }

    setPhase('breaths');
    phaseRef.current = 'breaths';
    setBreathStep(1);
    breathStepRef.current = 1;

    // Breath 1 lasts 2000ms
    if (breathTimeoutRef.current !== null) {
      window.clearTimeout(breathTimeoutRef.current);
    }

    breathTimeoutRef.current = window.setTimeout(() => {
      if (isPausedRef.current || phaseRef.current !== 'breaths') return;

      // Advance to Breath 2 (2/2)
      setBreathStep(2);
      breathStepRef.current = 2;

      // Breath 2 lasts 2000ms
      breathTimeoutRef.current = window.setTimeout(() => {
        if (isPausedRef.current || phaseRef.current !== 'breaths') return;

        // Both breaths complete! Immediately start next compression set
        transitionToCompressionsRef.current();
      }, 2000);
    }, 2000);
  }, []);

  // Transition from rescue breaths back to compressions set
  const transitionToCompressions = useCallback(() => {
    if (breathTimeoutRef.current !== null) {
      window.clearTimeout(breathTimeoutRef.current);
      breathTimeoutRef.current = null;
    }

    setCycleNumber(prev => prev + 1);
    setPhase('compressions');
    phaseRef.current = 'compressions';

    // Start next set at compression 1 immediately with audio & visual pulse
    setCompressionCount(1);
    countRef.current = 1;

    playClick();
    setPulseActive(true);
    if (pulseTimeoutRef.current !== null) clearTimeout(pulseTimeoutRef.current);
    pulseTimeoutRef.current = window.setTimeout(() => setPulseActive(false), 90);

    // Schedule compressions 2..30
    scheduleNextCompressionRef.current();
  }, [playClick]);

  useEffect(() => {
    scheduleNextCompressionRef.current = scheduleNextCompression;
    transitionToBreathsRef.current = transitionToBreaths;
    transitionToCompressionsRef.current = transitionToCompressions;
  }, [scheduleNextCompression, transitionToBreaths, transitionToCompressions]);

  // Begin CPR Practice from hand-placement step
  const beginCpr = useCallback(() => {
    // Clear any previous stray timers
    if (compressionTimeoutRef.current !== null) clearTimeout(compressionTimeoutRef.current);
    if (breathTimeoutRef.current !== null) clearTimeout(breathTimeoutRef.current);

    setIsActive(true);
    setIsPaused(false);
    isPausedRef.current = false;

    setCycleNumber(1);
    setPhase('compressions');
    phaseRef.current = 'compressions';

    setCompressionCount(1);
    countRef.current = 1;

    // Start continuous stopwatch
    startStopwatch();

    // Play first compression beat immediately
    playClick();
    setPulseActive(true);
    if (pulseTimeoutRef.current !== null) clearTimeout(pulseTimeoutRef.current);
    pulseTimeoutRef.current = window.setTimeout(() => setPulseActive(false), 90);

    // Schedule compressions 2..30
    scheduleNextCompressionRef.current();
  }, [playClick, startStopwatch]);

  // Pause CPR
  const pauseCpr = useCallback(() => {
    setIsPaused(true);
    isPausedRef.current = true;

    if (compressionTimeoutRef.current !== null) {
      window.clearTimeout(compressionTimeoutRef.current);
      compressionTimeoutRef.current = null;
    }
    if (breathTimeoutRef.current !== null) {
      window.clearTimeout(breathTimeoutRef.current);
      breathTimeoutRef.current = null;
    }

    pauseStopwatch();
    setPulseActive(false);
  }, [pauseStopwatch]);

  // Resume CPR
  const resumeCpr = useCallback(() => {
    setIsPaused(false);
    isPausedRef.current = false;

    resumeStopwatch();

    if (phaseRef.current === 'compressions') {
      scheduleNextCompressionRef.current();
    } else if (phaseRef.current === 'breaths') {
      // Resume breath sequence
      if (breathStepRef.current === 1) {
        breathTimeoutRef.current = window.setTimeout(() => {
          if (isPausedRef.current || phaseRef.current !== 'breaths') return;
          setBreathStep(2);
          breathStepRef.current = 2;
          breathTimeoutRef.current = window.setTimeout(() => {
            if (isPausedRef.current || phaseRef.current !== 'breaths') return;
            transitionToCompressionsRef.current();
          }, 2000);
        }, 1500);
      } else {
        breathTimeoutRef.current = window.setTimeout(() => {
          if (isPausedRef.current || phaseRef.current !== 'breaths') return;
          transitionToCompressionsRef.current();
        }, 1500);
      }
    }
  }, [resumeStopwatch]);

  // Master Toggle Play/Pause
  const togglePlay = useCallback(() => {
    if (phase === 'placement') {
      beginCpr();
    } else if (isPaused) {
      resumeCpr();
    } else {
      pauseCpr();
    }
  }, [phase, isPaused, beginCpr, resumeCpr, pauseCpr]);

  // Stop & Reset CPR Session
  const stopAndReset = useCallback(() => {
    if (compressionTimeoutRef.current !== null) {
      window.clearTimeout(compressionTimeoutRef.current);
      compressionTimeoutRef.current = null;
    }
    if (breathTimeoutRef.current !== null) {
      window.clearTimeout(breathTimeoutRef.current);
      breathTimeoutRef.current = null;
    }

    resetStopwatch();
    setIsActive(false);
    setIsPaused(false);
    isPausedRef.current = false;
    setPhase('placement');
    phaseRef.current = 'placement';
    setCompressionCount(0);
    countRef.current = 0;
    setBreathStep(1);
    breathStepRef.current = 1;
    setCycleNumber(1);
    setPulseActive(false);
  }, [resetStopwatch]);

  // Toggle audio mute
  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  // Change target BPM
  const setBpmRate = useCallback((newBpm: number) => {
    const clamped = Math.min(130, Math.max(90, newBpm));
    setBpm(clamped);
    bpmRef.current = clamped;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (compressionTimeoutRef.current !== null) clearTimeout(compressionTimeoutRef.current);
      if (breathTimeoutRef.current !== null) clearTimeout(breathTimeoutRef.current);
      if (pulseTimeoutRef.current !== null) clearTimeout(pulseTimeoutRef.current);
      if (stopwatchIntervalRef.current !== null) clearInterval(stopwatchIntervalRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Formatted elapsed time
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return {
    phase,
    isActive,
    isPaused,
    isRunning: isActive && !isPaused,
    compressionCount,
    breathStep,
    cycleNumber,
    bpm,
    isMuted,
    pulseActive,
    formattedTime,
    totalSeconds,
    beginCpr,
    pauseCpr,
    resumeCpr,
    togglePlay,
    stopAndReset,
    toggleMute,
    setBpm: setBpmRate,
  };
}
