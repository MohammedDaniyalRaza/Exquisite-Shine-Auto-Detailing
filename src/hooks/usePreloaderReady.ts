import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __esPreloaderDone?: boolean;
  }
}

export function usePreloaderReady(): boolean {
  const [ready, setReady] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return Boolean(window.__esPreloaderDone);
  });

  useEffect(() => {
    if (ready) return;

    const handleDone = () => setReady(true);
    window.addEventListener('es:preloader-done', handleDone);

    // Hard failsafe so animations never stay blocked
    const fallbackTimer = window.setTimeout(() => {
      window.__esPreloaderDone = true;
      setReady(true);
    }, 2400);

    return () => {
      window.removeEventListener('es:preloader-done', handleDone);
      window.clearTimeout(fallbackTimer);
    };
  }, [ready]);

  return ready;
}
