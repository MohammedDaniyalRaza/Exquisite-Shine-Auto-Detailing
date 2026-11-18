import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../lib/gsap';
import {
  destroyLenis,
  initLenis,
  prefersReducedMotion,
  releaseAllScrollLocks,
  scrollToTopInstant,
} from '../lib/lenis';

interface TransitionContextValue {
  navigateTo: (to: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
  isTransitioning: false,
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const curtainContainerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const isManualNavRef = useRef(false);
  const isFirstRenderRef = useRef(true);
  const activeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const failsafeTimerRef = useRef<number | null>(null);

  const resetCurtainHard = useCallback(() => {
    if (failsafeTimerRef.current) {
      window.clearTimeout(failsafeTimerRef.current);
      failsafeTimerRef.current = null;
    }
    if (activeTimelineRef.current) {
      activeTimelineRef.current.kill();
      activeTimelineRef.current = null;
    }
    const container = curtainContainerRef.current;
    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
    if (container) {
      container.style.pointerEvents = 'none';
      container.style.visibility = 'hidden';
    }
    gsap.set(panels, { yPercent: 100, opacity: 1 });
    setIsTransitioning(false);
    releaseAllScrollLocks();
  }, []);

  // Initialize / re-initialize Lenis & ScrollTrigger on route changes (including back/forward)
  useEffect(() => {
    releaseAllScrollLocks();

    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      const timer = window.setTimeout(() => {
        initLenis();
        ScrollTrigger.refresh();
      }, 60);
      return () => window.clearTimeout(timer);
    }

    // Handle browser back/forward navigation smoothly
    if (!isManualNavRef.current) {
      scrollToTopInstant();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      destroyLenis();
      initLenis();
      window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }

    isManualNavRef.current = false;
  }, [location.pathname]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      resetCurtainHard();
      destroyLenis();
    };
  }, [resetCurtainHard]);

  const navigateTo = useCallback(
    (to: string) => {
      const targetPath = to.split('#')[0] || '/';
      if (targetPath === location.pathname && !to.includes('#')) {
        scrollToTopInstant();
        return;
      }

      if (isTransitioning) return;

      const reduced = prefersReducedMotion();
      const container = curtainContainerRef.current;
      const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];

      isManualNavRef.current = true;
      setIsTransitioning(true);

      // Failsafe: never leave curtain stuck
      failsafeTimerRef.current = window.setTimeout(() => {
        resetCurtainHard();
      }, 1600);

      if (reduced || !container || panels.length === 0) {
        navigate(to);
        scrollToTopInstant();
        ScrollTrigger.getAll().forEach((st) => st.kill());
        destroyLenis();
        initLenis();
        window.setTimeout(() => {
          ScrollTrigger.refresh();
          resetCurtainHard();
        }, 120);
        return;
      }

      container.style.visibility = 'visible';
      container.style.pointerEvents = 'auto';

      const tl = gsap.timeline({
        onComplete: () => {
          resetCurtainHard();
        },
      });
      activeTimelineRef.current = tl;

      gsap.set(panels, { yPercent: 100, opacity: 1 });

      // Curtain cover (~0.38s)
      tl.to(panels, {
        yPercent: 0,
        duration: 0.38,
        stagger: 0.045,
        ease: 'power3.inOut',
      });

      // Swap route while covered
      tl.add(() => {
        navigate(to);
        scrollToTopInstant();
        ScrollTrigger.getAll().forEach((st) => st.kill());
        destroyLenis();
        initLenis();
      });

      // Brief settle frame then reveal (~0.48s)
      tl.to(panels, {
        yPercent: -100,
        duration: 0.48,
        stagger: 0.04,
        delay: 0.06,
        ease: 'power3.inOut',
        onStart: () => {
          ScrollTrigger.refresh();
        },
      });
    },
    [isTransitioning, location.pathname, navigate, resetCurtainHard]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo, isTransitioning }}>
      {children}
      {/* GSAP Multi-Panel Curtain */}
      <div
        ref={curtainContainerRef}
        aria-hidden="true"
        className="fixed inset-0 z-[990] pointer-events-none grid grid-cols-3"
        style={{ visibility: 'hidden' }}
      >
        <div
          ref={(el) => {
            panelsRef.current[0] = el;
          }}
          className="h-full w-full bg-[#05060A] border-r border-white/10"
        />
        <div
          ref={(el) => {
            panelsRef.current[1] = el;
          }}
          className="h-full w-full bg-[#0C101B] border-r border-[#1F6BFF]/30 flex items-center justify-center"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#1F6BFF] to-transparent opacity-70" />
        </div>
        <div
          ref={(el) => {
            panelsRef.current[2] = el;
          }}
          className="h-full w-full bg-[#05060A]"
        />
      </div>
    </TransitionContext.Provider>
  );
}
