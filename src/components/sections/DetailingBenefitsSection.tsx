import { useEffect, useRef } from 'react';
import { ShieldCheck, Sparkles, Sun } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import { SmartImage } from '../ui/SmartImage';

const BENEFITS = [
  {
    number: '01',
    title: 'Clear Coat & Interior Protection',
    copy: 'Road film, bug splatter, sun exposure, and tracked-in winter grit slowly wear down exposed paint and cabin trim. Routine hand washing, matte surface care, and protective wax help shield surfaces before buildup hardens.',
    image: '/images/detail-headlight-clarity.jpg',
    imageAlt: 'Crystal clear sports car LED headlight and glossy fender',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'Appearance & Long-Term Value',
    copy: 'Well-kept paintwork, spotless door jambs, and clean upholstery keep your vehicle looking sharp year after year. Whether you plan to keep your vehicle long-term or prepare it for resale, clean care shows immediately.',
    image: '/images/detail-sun-reflection.jpg',
    imageAlt: 'Deep liquid-gloss reflection on waxed rear quarter panel',
    icon: Sun,
  },
  {
    number: '03',
    title: 'Everyday Driving Enjoyment',
    copy: 'Stepping into a fresh cabin with glare-free glass, dust-free controls, and deep gloss on the hood makes every commute feel better. Clean vehicles are also noticeably faster and easier to maintain between details.',
    image: '/images/detail-dashboard-trim.jpg',
    imageAlt: 'Spotless matte leather steering wheel and digital gauge cluster',
    icon: Sparkles,
  },
];

export function DetailingBenefitsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = grid.querySelectorAll('[data-benefit-card]');
      gsap.fromTo(
        cards,
        { y: 26, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 84%',
            once: true,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      const cards = grid.querySelectorAll('[data-benefit-card]');
      gsap.set(cards, { y: 0, opacity: 1 });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, []);

  return (
    <section className="relative bg-[#05060A] py-20 sm:py-28 border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">06</span>
            <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
              Lasting Care
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-silver-static">
            What Detailing Does For Your Car
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.number}
                data-benefit-card
                className="border border-white/12 bg-[#0B0D14] flex flex-col overflow-hidden"
              >
                <div className="relative">
                  <SmartImage
                    src={item.image}
                    alt={item.imageAlt}
                    aspect="4/3"
                    refreshOnLoad
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#05060A]/90 border border-white/15 font-mono text-xs text-[#4D9BFF] tabular-nums">
                    {item.number}
                  </div>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 text-[#4D9BFF]">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#A9B0B8]">
                      Benefit {item.number}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#A9B0B8] leading-relaxed">
                    {item.copy}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
