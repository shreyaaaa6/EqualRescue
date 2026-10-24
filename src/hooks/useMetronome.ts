import { useState, useRef, useEffect, useCallback } from 'react';

interface UseMetronomeOptions {
  initialBpm?: number;
  initialPlaying?: boolean;
}

export function useMetronome({ initialBpm = 110, initialPlaying = false }: UseMetronomeOptions = {}) {
  const [bpm, setBpm] = useState<number>(initialBpm);
  const [isPlaying, setIsPlaying] = useState<boolean>(initialPlaying);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [beatCount, setBeatCount] = useState<number>(0);
  const [pulseActive, setPulseActive] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const timerWorkerRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(isPlaying);
  const isMutedRef = useRef<boolean>(isMuted);
  const bpmRef = useRef<number>(bpm);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  // Initialize or get the AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Play a crisp percussive metronome click using Web Audio synthesis
  const playClick = useCallback((time: number) => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      // Pleasant punchy emergency metronome frequency (880 Hz with quick drop)
      osc.frequency.setValueAtTime(880, time);
      osc.frequency.exponentialRampToValueAtTime(110, time + 0.04);

      gain.gain.setValueAtTime(1.0, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.05);
    } catch {
      // Audio fallback handling
    }
  }, [getAudioContext]);

  // Look-ahead scheduler parameters
  const lookAheadMs = 25.0; // Interval to check next note (ms)
  const scheduleAheadTime = 0.1; // Window to schedule ahead (100ms)

  // Scheduling loop
  const scheduleTick = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    while (nextNoteTimeRef.current < ctx.currentTime + scheduleAheadTime) {
      const scheduledTime = nextNoteTimeRef.current;
      playClick(scheduledTime);

      // Trigger UI visual pulse slightly ahead or aligned with audio time
      const delayMs = Math.max(0, (scheduledTime - ctx.currentTime) * 1000);
      window.setTimeout(() => {
        if (!isPlayingRef.current) return;
        setBeatCount(prev => prev + 1);
        setPulseActive(true);
        window.setTimeout(() => setPulseActive(false), 80);
      }, delayMs);

      // Advance by 60 / BPM seconds
      const secondsPerBeat = 60.0 / bpmRef.current;
      nextNoteTimeRef.current += secondsPerBeat;
    }
  }, [getAudioContext, playClick]);

  const start = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    nextNoteTimeRef.current = ctx.currentTime + 0.05;
    setIsPlaying(true);
    isPlayingRef.current = true;

    if (timerWorkerRef.current !== null) {
      window.clearInterval(timerWorkerRef.current);
    }
    timerWorkerRef.current = window.setInterval(scheduleTick, lookAheadMs);
  }, [getAudioContext, scheduleTick]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (timerWorkerRef.current !== null) {
      window.clearInterval(timerWorkerRef.current);
      timerWorkerRef.current = null;
    }
    setPulseActive(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      start();
    }
  }, [isPlaying, pause, start]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const setBpmSpeed = useCallback((newBpm: number) => {
    const clamped = Math.min(130, Math.max(90, newBpm));
    setBpm(clamped);
  }, []);

  useEffect(() => {
    return () => {
      if (timerWorkerRef.current !== null) {
        window.clearInterval(timerWorkerRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const resetBeatCount = useCallback(() => {
    setBeatCount(0);
  }, []);

  return {
    bpm,
    setBpm: setBpmSpeed,
    isPlaying,
    isMuted,
    beatCount,
    pulseActive,
    start,
    pause,
    toggle,
    toggleMute,
    resetBeatCount,
  };
}
