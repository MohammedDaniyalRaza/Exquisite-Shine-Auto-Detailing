import { useEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { SparkleStar } from '../ui/SparkleStar';

const STEPS = [
  {
    number: '01',
    title: 'Inspect',
    detail:
      'Every appointment starts with a slow walkaround under overhead studio light and handheld LED inspection lamps. We check clear coat swirls, stubborn tar, wheel buildup, and interior materials so each panel gets the exact care it needs.',
    image: '/images/detail-paint-inspection.jpg',
    imageAlt: 'LED inspection light checking clear coat clarity on dark hood',
  },
  {
    number: '02',
    title: 'Wash',
    detail:
      'A high-pressure pre-rinse and thick snow foam bath loosen gritty road film before a wash mitt touches your paint. Wheels, barrels, calipers, and tires are brushed separately, followed by a gentle two-bucket hand wash and microfiber dry.',
    image: '/images/detail-foam-cannon.jpg',
    imageAlt: 'Snow foam blanketing a dark metallic sports sedan',
  },
  {
    number: '03',
    title: 'Refine',
    detail:
      'Inside the cabin, dust is cleared from vents, tracks, and consoles with clean brushes and surface-safe sprays. Outside, dual-action machine polishing refines light haze and wash swirls to bring back deep, sharp reflections.',
    image: '/images/service-polish.jpg',
    imageAlt: 'Dual-action machine polisher refining gloss black hood paint',
  },
  {
    number: '04',
    title: 'Protect',
    detail:
      'Once every panel is clean and inspected, quality protective wax is applied in thin, uniform strokes by hand. After curing, fresh royal-blue microfiber towels buff the finish to rich depth and tight water beading.',
    image: '/images/detail-wax-application.jpg',
    imageAlt: 'Foam applicator spreading protective wax on dark metallic paint',
  },
  {
    number: '05',
    title: 'Handover',
    detail:
      'Before handing back the keys in Loveland, we double-check door jambs, glass edges, mirrors, trim, and interior screens under bright light. You walk around the finished vehicle knowing every detail was verified.',
    image: '/images/detail-sun-reflection.jpg',
    imageAlt: 'Deep liquid-gloss reflection across freshly waxed rear quarter panel',
  },
];

export function ShineStandardSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const pinEl = pinRef.current;
    const progressEl = progressLineRef.current;
    if (!pinEl) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned Split Storytelling (step changes & image crossfades on scroll)
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const proxy = { p: 0 };

      gsap.to(proxy, {
        p: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: pinEl,
          start: 'top top',
          end: '+=220%',
          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (progressEl) {
              progressEl.style.transform = `scaleX(${Math.max(0.05, p)})`;
            }
            const nextIdx = Math.min(
              STEPS.length - 1,
              Math.floor(p * STEPS.length)
            );
            setActiveIndex(nextIdx);
          },
        },
      });
    });

    return () => mm.revert();
  }, []);

  const currentStep = STEPS[activeIndex] || STEPS[0];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#05060A] border-b border-white/10"
    >
      {/* Desktop Pinned Split Storytelling */}
      <div
        ref={pinRef}
        className="hidden lg:flex lg:min-h-[100svh] flex-col justify-center py-24"
      >
        <div className="max-w-[1440px] w-full mx-auto px-12">
          <div className="grid grid-cols-12 gap-14 items-center">
            {/* Left Pinned Copy & Step Switcher */}
            <div className="col-span-5 min-w-0 flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                    04
                  </span>
                  <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                    The Shine Standard
                  </span>
                </div>

                <h2 className="font-display text-4xl xl:text-5xl font-extrabold uppercase tracking-tight text-silver-static leading-[0.96]">
                  Five-Step Craft
                </h2>
              </div>

              {/* Active Step Card */}
              <div className="p-8 border border-[#1F6BFF]/50 bg-[#0B0D14] min-h-[245px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-sm text-[#4D9BFF] tabular-nums">
                      Step {currentStep.number} / 05
                    </span>
                    <SparkleStar size={16} variant="blue" twinkle={false} />
                  </div>
                  <h3 className="font-display text-3xl font-extrabold uppercase text-white">
                    {currentStep.title}
                  </h3>
                  <p className="mt-4 text-base text-[#D0D5DD] leading-relaxed">
                    {currentStep.detail}
                  </p>
                </div>
              </div>

              {/* Step Pills + Thin Blue Progress Line */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  {STEPS.map((step, idx) => (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`text-left font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                        idx === activeIndex
                          ? 'text-[#4D9BFF] font-bold'
                          : 'text-[#6B727A] hover:text-white'
                      }`}
                    >
                      {step.number}. {step.title}
                    </button>
                  ))}
                </div>
                <div className="w-full h-[2px] bg-white/10 overflow-hidden">
                  <div
                    ref={progressLineRef}
                    className="h-full bg-gradient-to-r from-[#1F6BFF] to-[#4D9BFF] origin-left"
                    style={{ transform: 'scaleX(0.1)' }}
                  />
                </div>
              </div>
            </div>

            {/* Right Pinned Image Frame with Crossfade */}
            <div className="col-span-7 min-w-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/15 bg-[#0B0D14]">
                {STEPS.map((step, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={step.number}
                      className={`absolute inset-0 transition-all duration-700 ease-out ${
                        isActive
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-[1.04] z-0 pointer-events-none'
                      }`}
                      style={{
                        clipPath: isActive
                          ? 'inset(0% 0% 0% 0%)'
                          : 'inset(0% 0% 10% 0%)',
                      }}
                    >
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#05060A]/80 via-transparent to-transparent"
                      />
                      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                          {step.number} · {step.title}
                        </span>
                        <span className="font-mono text-xs text-white/75">
                          Exquisite Shine Studio
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Clean Stacked Layout */}
      <div className="lg:hidden py-16 sm:py-24 max-w-[1440px] mx-auto px-5 sm:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">04</span>
            <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
              The Shine Standard
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-silver-static">
            Five-Step Craft
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {STEPS.map((step) => (
            <article
              key={step.number}
              className="border border-white/12 bg-[#0B0D14] overflow-hidden"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#05060A]">
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                    {step.number}
                  </span>
                  <h3 className="font-display text-xl font-extrabold uppercase text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-[#A9B0B8] leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
