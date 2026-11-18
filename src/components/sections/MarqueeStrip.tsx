import { useEffect, useRef } from 'react';
import { SITE } from '../../data/site';
import { gsap } from '../../lib/gsap';
import { SparkleStar } from '../ui/SparkleStar';

export function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      tweenRef.current = gsap.to(track, {
        xPercent: -50,
        duration: 24,
        ease: 'none',
        repeat: -1,
      });

      return () => {
        tweenRef.current?.kill();
        tweenRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  const renderGroup = (prefix: string) =>
    SITE.marqueeItems.map((item, idx) => (
      <div
        key={`${prefix}-${idx}`}
        className="inline-flex items-center gap-6 sm:gap-10 px-3 sm:px-5 shrink-0"
      >
        <span className="font-display text-lg sm:text-2xl font-extrabold uppercase tracking-[0.14em] text-[#F4F6F8] whitespace-nowrap">
          {item}
        </span>
        <SparkleStar
          size={16}
          variant={idx % 2 === 0 ? 'blue' : 'silver'}
          twinkle={false}
        />
      </div>
    ));

  return (
    <section
      aria-label="Core detailing capabilities"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
      className="relative bg-[#0B0D14] border-y border-white/10 py-5 sm:py-6 overflow-hidden select-none"
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div className="flex items-center shrink-0">{renderGroup('a')}</div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {renderGroup('b')}
        </div>
      </div>
    </section>
  );
}
