import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { CARE_TIPS } from '../../data/careTips';
import { gsap } from '../../lib/gsap';
import { SmartImage } from '../ui/SmartImage';
import { TransitionLink } from '../ui/TransitionLink';

export function CareTipsTeaserSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const featuredTips = CARE_TIPS.slice(0, 3);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = grid.querySelectorAll('[data-tip-card]');
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
            trigger: grid,
            start: 'top 84%',
            once: true,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      const cards = grid.querySelectorAll('[data-tip-card]');
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">10</span>
              <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                Care Guides
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-silver-static">
              Detailing Tips
            </h2>
          </div>

          <TransitionLink
            to="/care-tips"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#F4F6F8] hover:text-[#4D9BFF] transition-colors shrink-0"
          >
            <span>All 6 Care Guides</span>
            <ArrowRight className="w-4 h-4" />
          </TransitionLink>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {featuredTips.map((tip) => (
            <TransitionLink
              key={tip.id}
              to={`/care-tips#${tip.slug}`}
              data-tip-card
              className="group border border-white/12 bg-[#0B0D14] hover:border-[#1F6BFF]/65 transition-colors flex flex-col overflow-hidden"
            >
              <SmartImage
                src={tip.image}
                alt={tip.imageAlt}
                aspect="4/3"
                refreshOnLoad
                imgClassName="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 text-xs font-mono text-[#A9B0B8] mb-2">
                    <span className="text-[#4D9BFF] tabular-nums">{tip.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{tip.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{tip.readTime}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#4D9BFF] transition-colors leading-snug">
                    {tip.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#A9B0B8] leading-relaxed">
                    {tip.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#4D9BFF] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
