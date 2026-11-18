import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;
const activeLocks = new Set<string>();

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;

  destroyLenis();

  if (prefersReducedMotion()) {
    return null;
  }

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;

  if (activeLocks.size > 0) {
    lenis.stop();
  }

  return lenis;
}

export function destroyLenis(): void {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function lockScroll(reason: string): void {
  activeLocks.add(reason);
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
  if (lenisInstance) {
    lenisInstance.stop();
  }
}

export function unlockScroll(reason: string): void {
  activeLocks.delete(reason);
  if (activeLocks.size === 0) {
    if (typeof document !== 'undefined') {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    if (lenisInstance) {
      lenisInstance.start();
    }
  }
}

export function releaseAllScrollLocks(): void {
  activeLocks.clear();
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
  if (lenisInstance) {
    lenisInstance.start();
  }
}

export function scrollToTopInstant(): void {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true, force: true });
  }
}
