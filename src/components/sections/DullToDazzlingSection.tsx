import { useEffect, useRef, useState } from 'react';
import { SITE } from '../../data/site';
import { gsap } from '../../lib/gsap';
import { SparkleStar } from '../ui/SparkleStar';

const STAGES = [
  {
    index: '01',
    heading: 'Road film & dull haze cleared away.',
    detail:
      'Pressure rinsing and thick foam lift grit gently before a single towel ever touches the clear coat.',
  },
  {
    index: '02',
    heading: 'Refined panel by panel under studio light.',
    detail:
      'Dual-action machine polishing and careful hand work bring back sharp reflections across every body line.',
  },
  {
    index: '03',
    heading: 'Sealed with deep gloss & crisp clarity.',
    detail:
      'Hand-buffed wax protection locks in depth and helps water bead cleanly off painted panels.',
  },
];

export function DullToDazzlingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const revealLayer = revealLayerRef.current;
    const beam = beamRef.current;
    if (!section || !revealLayer) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned scrub with diagonal clip-path light wipe
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const proxy = { progress: 0 };

      const updateClip = (p: number) => {
        const topX = Math.min(125, p * 125);
        const bottomX = Math.min(125, Math.max(0, p * 125 - 18));
        revealLayer.style.clipPath = `polygon(0% 0%, ${topX}% 0%, ${bottomX}% 100%, 0% 100%)`;

        if (beam) {
          beam.style.left = `${Math.min(100, p * 108)}%`;
          beam.style.opacity = p > 0.02 && p < 0.98 ? '1' : '0';
        }

        if (p < 0.34) {
          setActiveStage(0);
        } else if (p < 0.68) {
          setActiveStage(1);
        } else {
          setActiveStage(2);
        }
      };

      updateClip(0.08);

      gsap.to(proxy, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateClip(self.progress),
        },
      });
    });

    // Mobile/tablet or reduced motion: gentle static/auto reveal
    mm.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
      revealLayer.style.clipPath = 'polygon(0% 0%, 100% 0%, 86% 100%, 0% 100%)';
      if (beam) beam.style.opacity = '0';
      setActiveStage(2);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#05060A] py-16 sm:py-24 lg:py-0 lg:min-h-[100svh] flex items-center border-b border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-4 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Copy Column */}
          <div className="lg:col-span-5 min-w-0 order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">01</span>
              <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                Studio Light Reveal
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-silver-static leading-[0.98]">
              Dull to Dazzling
            </h2>

            <div className="mt-8 space-y-5">
              {STAGES.map((stage, idx) => {
                const isActive = idx === activeStage;
                return (
                  <button
                    key={stage.index}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className={`w-full text-left p-4 sm:p-5 border transition-all duration-300 ${
                      isActive
                        ? 'border-[#1F6BFF]/70 bg-[#0B0D14]'
                        : 'border-white/10 bg-transparent opacity-55 hover:opacity-85'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                        {stage.index}
                      </span>
                      {isActive && <SparkleStar size={14} variant="blue" twinkle={false} />}
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white">
                      {stage.heading}
                    </h3>
                    <p className="mt-1 text-sm text-[#A9B0B8] leading-relaxed">
                      {stage.detail}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Visual Reveal Frame */}
          <div className="lg:col-span-7 min-w-0 order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden border border-white/15 bg-[#0B0D14]">
              {/* Base Desaturated Darker Layer */}
              <img
                src={SITE.dullToDazzlingImage}
                alt="Luxury SUV in dark studio lighting"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.38] contrast-95"
              />

              {/* Full Color & Specular Brightness Layer clipped diagonally */}
              <div
                ref={revealLayerRef}
                className="absolute inset-0 will-change-[clip-path]"
                style={{
                  clipPath: 'polygon(0% 0%, 60% 0%, 42% 100%, 0% 100%)',
                }}
              >
                <img
                  src={SITE.dullToDazzlingImage}
                  alt="Studio-lit white SUV finish with crisp blue light reflections"
                  loading="lazy"
                  className="w-full h-full object-cover brightness-105 contrast-105 saturate-110"
                />
              </div>

              {/* Specular Light Wipe Beam */}
              <div
                ref={beamRef}
                aria-hidden="true"
                className="hidden lg:block absolute top-0 bottom-0 w-1 -skew-x-12 bg-gradient-to-b from-white via-[#4D9BFF] to-white shadow-[0_0_24px_6px_rgba(31,107,255,0.65)] pointer-events-none"
                style={{ left: '50%', opacity: 0 }}
              />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-white/80 pointer-events-none">
                <span>Scroll Light Sweep</span>
                <span className="text-[#4D9BFF]">Exquisite Shine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
