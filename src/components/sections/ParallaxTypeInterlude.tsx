import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

interface ParallaxTypeInterludeProps {
  topWord: string;
  bottomWord: string;
}

export function ParallaxTypeInterlude({
  topWord,
  bottomWord,
}: ParallaxTypeInterludeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const topEl = topRef.current;
    const bottomEl = bottomRef.current;
    if (!container || !topEl || !bottomEl) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        topEl,
        { xPercent: -6 },
        {
          xPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        bottomEl,
        { xPercent: 6 },
        {
          xPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative bg-[#05060A] border-b border-white/10 py-10 sm:py-14 overflow-hidden select-none"
    >
      <div className="flex flex-col gap-1 sm:gap-2 overflow-hidden">
        <div
          ref={topRef}
          className="font-display font-extrabold uppercase tracking-tight leading-none text-center whitespace-nowrap text-outlined-silver text-[clamp(2.5rem,10vw,7.5rem)] will-change-transform"
        >
          {topWord}
        </div>
        <div
          ref={bottomRef}
          className="font-display font-extrabold uppercase tracking-tight leading-none text-center whitespace-nowrap text-silver-static opacity-25 text-[clamp(2.5rem,10vw,7.5rem)] will-change-transform"
        >
          {bottomWord}
        </div>
      </div>
    </div>
  );
}
