import { useState, useEffect, useCallback, useRef } from 'react';

export function useWakeLock(enabled: boolean = true) {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isSupported] = useState<boolean>(() => typeof navigator !== 'undefined' && 'wakeLock' in navigator);
  const wakeLockSentinelRef = useRef<WakeLockSentinel | null>(null);

  const requestLock = useCallback(async () => {
    if (!('wakeLock' in navigator)) return;
    try {
      wakeLockSentinelRef.current = await navigator.wakeLock.request('screen');
      setIsLocked(true);

      wakeLockSentinelRef.current.addEventListener('release', () => {
        setIsLocked(false);
      });
    } catch {
      setIsLocked(false);
    }
  }, []);

  const releaseLock = useCallback(async () => {
    if (wakeLockSentinelRef.current) {
      try {
        await wakeLockSentinelRef.current.release();
      } catch {
        // Ignore
      }
      wakeLockSentinelRef.current = null;
      setIsLocked(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      requestLock();
    } else {
      releaseLock();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && enabled) {
        requestLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      releaseLock();
    };
  }, [enabled, requestLock, releaseLock]);

  return { isLocked, isSupported, requestLock, releaseLock };
}
