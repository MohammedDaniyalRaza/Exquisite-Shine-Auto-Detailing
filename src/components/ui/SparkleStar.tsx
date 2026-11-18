import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

interface SparkleStarProps {
  className?: string;
  size?: number;
  variant?: 'blue' | 'silver';
  twinkle?: boolean;
  delay?: number;
}

export function SparkleStar({
  className = '',
  size = 20,
  variant = 'blue',
  twinkle = true,
  delay = 0,
}: SparkleStarProps) {
  const starRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!twinkle || !starRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(starRef.current, {
        scale: 0.72,
        opacity: 0.45,
        rotation: 12,
        duration: 1.5 + (delay % 0.8),
        delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => mm.revert();
  }, [twinkle, delay]);

  const fill = variant === 'blue' ? '#1F6BFF' : '#E8ECF2';

  return (
    <svg
      ref={starRef}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none shrink-0 ${className}`}
    >
      <path
        d="M12 1.5C12.55 7.4 16.6 11.45 22.5 12C16.6 12.55 12.55 16.6 12 22.5C11.45 16.6 7.4 12.55 1.5 12C7.4 11.45 11.45 7.4 12 1.5Z"
        fill={fill}
      />
    </svg>
  );
}
