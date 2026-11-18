import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<'PLAY' | 'VIEW' | ''>('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches || rm.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.34, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.34, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      if (!visible) setVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = e.target as HTMLElement | null;
      const cursorZone = target?.closest('[data-cursor]') as HTMLElement | null;
      const mode = cursorZone?.getAttribute('data-cursor');
      if (mode === 'play') {
        setLabel('PLAY');
      } else if (mode === 'view') {
        setLabel('VIEW');
      } else {
        setLabel('');
      }
    };

    const onLeave = () => {
      setVisible(false);
      setLabel('');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [visible]);

  const hasLabel = label !== '';

  return (
    <div
      aria-hidden="true"
      className={`es-custom-cursor pointer-events-none fixed inset-0 z-[950] transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4D9BFF] transition-transform duration-150 ${
          hasLabel ? 'w-1.5 h-1.5 scale-0' : 'w-2 h-2 scale-100'
        }`}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border flex items-center justify-center transition-[width,height,background-color,border-color] duration-200 ${
          hasLabel
            ? 'w-16 h-16 bg-[#1F6BFF]/90 border-[#4D9BFF] text-white shadow-[0_0_24px_rgba(31,107,255,0.45)]'
            : 'w-8 h-8 border-white/30 bg-transparent'
        }`}
      >
        {hasLabel && (
          <span className="font-mono text-[10px] font-bold tracking-[0.18em] text-white">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
