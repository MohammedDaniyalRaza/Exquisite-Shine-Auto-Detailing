import React, { useEffect, useRef, useState } from 'react';
import { gsap, scheduleScrollTriggerRefresh } from '../../lib/gsap';
import { AspectRatioPreset, getAspectClass } from '../../lib/smartMedia';
import { SparkleStar } from './SparkleStar';

interface SmartImageProps {
  src: string;
  alt: string;
  aspect?: AspectRatioPreset | 'none';
  eager?: boolean;
  reveal?: boolean;
  className?: string;
  imgClassName?: string;
  refreshOnLoad?: boolean;
  fallbackTitle?: string;
  style?: React.CSSProperties;
}

export function SmartImage({
  src,
  alt,
  aspect = '4/3',
  eager = false,
  reveal = !eager,
  className = '',
  imgClassName = '',
  refreshOnLoad = false,
  fallbackTitle,
  style,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const aspectClass = aspect === 'none' ? '' : getAspectClass(aspect);

  useEffect(() => {
    if (!reveal || eager || failed) return;
    const container = containerRef.current;
    const inner = parallaxRef.current;
    if (!container || !inner) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        container,
        { clipPath: 'inset(0 0 12% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 86%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        inner,
        { scale: 1.07, yPercent: -2 },
        {
          scale: 1,
          yPercent: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      gsap.set(container, { clipPath: 'inset(0 0 0% 0)' });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, [reveal, eager, failed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#0B0D14] ${aspectClass} ${className}`}
      style={style}
    >
      {!failed ? (
        <div ref={parallaxRef} className="w-full h-full will-change-transform">
          <img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            decoding={eager ? 'sync' : 'async'}
            fetchPriority={eager ? 'high' : 'auto'}
            referrerPolicy="no-referrer"
            onLoad={() => {
              setLoaded(true);
              if (refreshOnLoad) {
                scheduleScrollTriggerRefresh(100);
              }
            }}
            onError={() => setFailed(true)}
            className={`w-full h-full object-cover max-w-full transition-opacity duration-500 ${
              loaded || eager ? 'opacity-100' : 'opacity-0'
            } ${imgClassName}`}
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0B0D14] via-[#0F172A] to-[#05060A] border border-white/10 p-6 text-center">
          <SparkleStar size={24} variant="blue" twinkle={false} />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A9B0B8]">
            {fallbackTitle || 'Exquisite Shine Studio'}
          </span>
        </div>
      )}
    </div>
  );
}
