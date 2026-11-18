import { useEffect, useRef } from 'react';
import { CheckCircle2, Eye, MessageSquare, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import { SITE } from '../../data/site';
import { gsap } from '../../lib/gsap';

const REASONS = [
  {
    number: '01',
    title: 'Attention to Every Detail',
    copy: 'Door jambs, lug nut pockets, mirror housings, and trim edges receive the same careful focus as the hood. Nothing gets rushed past so the entire vehicle reads clean from two feet away.',
    image: '/images/detail-door-jamb.jpg',
    imageAlt: 'Spotless gloss black door jamb and brushed metal sill plate',
    icon: Eye,
  },
  {
    number: '02',
    title: 'Right Products for Each Surface',
    copy: 'Clear coat, matte interior vinyl, leather bolsters, glass, and wheel barrels each need dedicated chemistry. Matching the right sprays and microfiber towels keeps materials looking factory-fresh.',
    image: '/images/detail-microfiber-buff.jpg',
    imageAlt: 'Folded blue microfiber towels buffing dark automotive hood',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Careful, Hand-Finished Handling',
    copy: 'From pre-rinse snow foam to two-bucket mitts and plush drying towels, every step minimizes friction against your paint. We treat daily drivers and collector coupes with equal respect.',
    image: '/images/detail-hand-wash-mitt.jpg',
    imageAlt: 'Soft microfiber wash mitt gliding over soapy dark paint',
    icon: Wrench,
  },
  {
    number: '04',
    title: 'Clear, Direct Communication',
    copy: 'When you call or request a quote, you talk directly with Travi G. Appointment timing, drop-off details, and service scope are laid out clearly before work ever begins.',
    image: '/images/detail-coupe-garage.jpg',
    imageAlt: 'Deep midnight blue coupe parked inside concrete detailing studio',
    icon: MessageSquare,
  },
  {
    number: '05',
    title: 'Honest Recommendations',
    copy: 'We tell you plainly what a simple wash and wax will achieve versus where dual-action machine polishing makes a real difference—never pushing services your vehicle does not need.',
    image: '/images/detail-paint-inspection.jpg',
    imageAlt: 'LED swirl-finder inspection light checking dark hood paint',
    icon: CheckCircle2,
  },
  {
    number: '06',
    title: 'Finish Checked Before Handover',
    copy: 'Before you get the keys back in Loveland, we walk every panel under studio and natural light to verify glass clarity, streak-free wax buffing, and tidy interior details.',
    image: '/images/detail-headlight-clarity.jpg',
    imageAlt: 'Crystal clear sports car LED headlight and glossy blue fender',
    icon: ShieldCheck,
  },
];

export function WhyExquisiteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const mm = gsap.matchMedia();

    // Desktop stacked cards: pin each card cleanly while next card slides up over it
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length < 2) return;

      cards.forEach((card, idx) => {
        const isLast = idx === cards.length - 1;
        if (isLast) return;
        const inner = card.querySelector('[data-stack-inner]') as HTMLElement | null;

        gsap.to(inner || card, {
          scale: 0.94,
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 108px',
            endTrigger: cards[cards.length - 1],
            end: 'top 108px',
            pin: true,
            pinSpacing: false,
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => {
        cards.forEach((card) => {
          const inner = card.querySelector('[data-stack-inner]') as HTMLElement | null;
          gsap.set([card, inner], { clearProps: 'transform,opacity' });
        });
      };
    });

    // Mobile & tablet: normal stacked cards with simple reveal
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap.fromTo(
        cards,
        { y: 24, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stack,
            start: 'top 82%',
            once: true,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const inner = card.querySelector('[data-stack-inner]');
        gsap.set([card, inner], { opacity: 1, y: 0, scale: 1 });
      });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#05060A] py-20 sm:py-28 border-b border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">03</span>
            <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
              6 Standards · {SITE.city}
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-silver-static">
            Why Exquisite Shine
          </h2>
          <p className="mt-4 text-base text-[#A9B0B8] leading-relaxed">
            Consistent detailing is not magic—it comes from clean equipment, honest advice, and taking the time to finish every panel properly.
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div ref={stackRef} className="flex flex-col gap-6 lg:gap-8">
          {REASONS.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.number}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={{ zIndex: idx + 1 }}
                className="relative w-full"
              >
                <div
                  data-stack-inner
                  className="w-full border border-white/15 bg-[#0B0D14] grid grid-cols-1 lg:grid-cols-12 lg:h-[460px] overflow-hidden shadow-[0_-12px_40px_rgba(0,0,0,0.75)] will-change-transform"
                >
                  {/* Text Column */}
                  <div className="lg:col-span-6 relative z-10 min-w-0 p-6 sm:p-8 lg:p-12 flex flex-col justify-between gap-6 bg-[#0B0D14]">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-sm text-[#4D9BFF] tabular-nums">
                        {reason.number} / 06
                      </span>
                      <span className="w-10 h-10 flex items-center justify-center border border-white/12 bg-[#05060A] text-[#4D9BFF]">
                        <Icon className="w-4 h-4" />
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                        {reason.title}
                      </h3>
                      <p className="mt-4 text-sm sm:text-base text-[#A9B0B8] leading-relaxed max-w-lg">
                        {reason.copy}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B727A]">
                      {SITE.company} · {SITE.city}
                    </div>
                  </div>

                  {/* Image Column (strictly separated, clipped inside wrapper) */}
                  <div className="lg:col-span-6 relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full bg-[#05060A]">
                    <img
                      src={reason.image}
                      alt={reason.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
