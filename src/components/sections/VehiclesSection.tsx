import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { VEHICLE_TYPES } from '../../data/process';
import { gsap } from '../../lib/gsap';
import { TransitionLink } from '../ui/TransitionLink';

export function VehiclesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileOpenIdx, setMobileOpenIdx] = useState<number>(0);

  useEffect(() => {
    const root = containerRef.current;
    const preview = previewRef.current;
    if (!root || !preview) return;

    const mm = gsap.matchMedia();
    mm.add(
      '(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const xTo = gsap.quickTo(preview, 'x', { duration: 0.35, ease: 'power3.out' });
        const yTo = gsap.quickTo(preview, 'y', { duration: 0.35, ease: 'power3.out' });

        const onMove = (e: MouseEvent) => {
          const rect = root.getBoundingClientRect();
          const x = Math.min(Math.max(0, e.clientX - rect.left - 160), rect.width - 340);
          const y = Math.min(Math.max(0, e.clientY - rect.top - 120), rect.height - 250);
          xTo(x);
          yTo(y);
        };

        root.addEventListener('mousemove', onMove, { passive: true });
        return () => root.removeEventListener('mousemove', onMove);
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#080A10] py-20 sm:py-28 border-b border-white/10 overflow-hidden"
    >
      {/* Desktop Cursor-Following Preview Frame */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className={`hidden lg:block pointer-events-none absolute top-0 left-0 z-20 w-[320px] aspect-[4/3] border border-[#1F6BFF]/70 bg-[#05060A] shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden transition-opacity duration-250 ${
          hoveredIdx !== null ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {hoveredIdx !== null && VEHICLE_TYPES[hoveredIdx] && (
          <img
            src={VEHICLE_TYPES[hoveredIdx].image}
            alt={VEHICLE_TYPES[hoveredIdx].imageAlt}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">05</span>
              <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                Every Body Style
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-silver-static">
              Vehicles We Detail
            </h2>
          </div>

          <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#A9B0B8]">
            Hover on desktop · Tap on mobile
          </p>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {VEHICLE_TYPES.map((vehicle, idx) => {
            const isHovered = hoveredIdx === idx;
            const isMobileOpen = mobileOpenIdx === idx;
            return (
              <div
                key={vehicle.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group transition-colors hover:bg-white/[0.02]"
              >
                <div className="py-6 sm:py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setMobileOpenIdx(idx)}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 text-left min-w-0 flex-1"
                  >
                    <span className="font-mono text-xs text-[#4D9BFF] tabular-nums shrink-0">
                      {vehicle.number}
                    </span>
                    <span
                      className={`font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight transition-colors ${
                        isHovered ? 'text-[#4D9BFF]' : 'text-white'
                      }`}
                    >
                      {vehicle.type}
                    </span>
                  </button>

                  <div className="flex items-center justify-between lg:justify-end gap-6 min-w-0 lg:max-w-md">
                    <p className="text-sm text-[#A9B0B8] leading-snug">
                      {vehicle.oneLiner}
                    </p>
                    <TransitionLink
                      to={`/services/${vehicle.recommendedSlug}`}
                      aria-label={`View recommended service for ${vehicle.type}`}
                      className="w-10 h-10 flex items-center justify-center border border-white/15 bg-[#0B0D14] group-hover:border-[#1F6BFF] group-hover:bg-[#1F6BFF] text-white transition-colors shrink-0"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </TransitionLink>
                  </div>
                </div>

                {/* Mobile Tap Inline Photo */}
                {isMobileOpen && (
                  <div className="lg:hidden pb-6">
                    <div className="aspect-[4/3] w-full overflow-hidden border border-white/12 bg-[#0B0D14]">
                      <img
                        src={vehicle.image}
                        alt={vehicle.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
