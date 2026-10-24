import { useState, useRef, useEffect, useCallback } from 'react';

export function useStopwatch(autoStart: boolean = false) {
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const [elapsedMs, setElapsedMs] = useState<number>(0);

  const startTimeRef = useRef<number | null>(null);
  const accumulatedMsRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);

  const updateTimer = useCallback(() => {
    if (startTimeRef.current !== null) {
      const now = Date.now();
      const currentDelta = now - startTimeRef.current;
      setElapsedMs(accumulatedMsRef.current + currentDelta);
    }
  }, []);

  const start = useCallback(() => {
    if (isRunning) return;
    startTimeRef.current = Date.now();
    setIsRunning(true);

    if (timerIntervalRef.current !== null) {
      window.clearInterval(timerIntervalRef.current);
    }
    timerIntervalRef.current = window.setInterval(updateTimer, 200);
  }, [isRunning, updateTimer]);

  const pause = useCallback(() => {
    if (!isRunning) return;
    if (startTimeRef.current !== null) {
      accumulatedMsRef.current += Date.now() - startTimeRef.current;
      startTimeRef.current = null;
    }
    setIsRunning(false);
    if (timerIntervalRef.current !== null) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, [isRunning]);

  const reset = useCallback(() => {
    if (timerIntervalRef.current !== null) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    startTimeRef.current = null;
    accumulatedMsRef.current = 0;
    setElapsedMs(0);
    setIsRunning(false);
  }, []);

  const toggle = useCallback(() => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  }, [isRunning, pause, start]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return () => {
      if (timerIntervalRef.current !== null) {
        window.clearInterval(timerIntervalRef.current);
      }
    };
  }, [autoStart, start]);

  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return {
    elapsedMs,
    totalSeconds,
    minutes,
    seconds,
    formattedTime,
    isRunning,
    start,
    pause,
    reset,
    toggle,
  };
}
