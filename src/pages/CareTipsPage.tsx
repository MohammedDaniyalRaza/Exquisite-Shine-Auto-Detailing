import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { SmartImage } from '../components/ui/SmartImage';
import { TransitionLink } from '../components/ui/TransitionLink';
import { CARE_TIPS } from '../data/careTips';
import { SERVICES } from '../data/services';
import { SITE } from '../data/site';
import { gsap } from '../lib/gsap';

const CATEGORIES = ['All', 'Washing', 'Chemistry', 'Tools', 'Protection', 'Interior', 'Seasonal'];

const RECOMMENDED_HABITS = [
  'Pre-rinse thoroughly before any wash mitt touches painted panels.',
  'Use dedicated pH-neutral automotive shampoo so existing wax stays intact.',
  'Wash microfiber towels separately with liquid detergent and zero fabric softener.',
  'Wash outdoors only in shade when clear coat is cool to the touch.',
];

const SKIP_HABITS = [
  'Avoid automatic tunnel brushes that trap sand from prior vehicles.',
  'Skip household dish soap that strips protective wax and dries out trim.',
  'Never reuse a microfiber towel on paint after dropping it on concrete.',
  'Avoid greasy silicone dashboard dressings that attract dust and glare.',
];

export function CareTipsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(CARE_TIPS[0]?.id ?? null);
  const gridRef = useRef<HTMLDivElement>(null);

  const visibleTips =
    selectedCategory === 'All'
      ? CARE_TIPS
      : CARE_TIPS.filter((tip) => tip.category === selectedCategory);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = grid.querySelectorAll('[data-guide-card]');
      gsap.fromTo(
        cards,
        { y: 20, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      const cards = grid.querySelectorAll('[data-guide-card]');
      gsap.set(cards, { y: 0, opacity: 1 });
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, [selectedCategory]);

  return (
    <>
      <PageHero
        sectionNumber="08"
        title="Detailing Care Tips"
        subtitle="Practical, straightforward advice on safe driveway washing, microfiber towel laundry, wax timing, and cabin upkeep."
        image="/images/detail-hand-wash-mitt.jpg"
        imageAlt="Plush microfiber wash mitt gliding over soapy dark paint"
        breadcrumb={[{ label: 'Care Tips' }]}
      />

      {/* Band 2: Between-Visits Philosophy */}
      <section className="bg-[#080A10] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 min-w-0">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
              01 · Between Details
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
              Good Maintenance Keeps Gloss Longer
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#A9B0B8] leading-relaxed">
              Most clear coat swirls and interior haze build up during quick routine washes between full details. Following a few honest habits with clean water, mild soap, and soft towels keeps your {SITE.city} vehicle looking sharp week after week.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 min-w-0">
            <div className="p-5 border border-white/12 bg-[#0B0D14]">
              <span className="font-mono text-xs text-[#4D9BFF]">06 Guides</span>
              <div className="mt-2 font-display text-lg font-bold uppercase text-white">
                Driveway Ready
              </div>
              <p className="mt-1 text-xs text-[#A9B0B8]">Step-by-step tips anyone can follow.</p>
            </div>
            <div className="p-5 border border-white/12 bg-[#0B0D14]">
              <span className="font-mono text-xs text-[#4D9BFF]">Zero Hype</span>
              <div className="mt-2 font-display text-lg font-bold uppercase text-white">
                Safe Materials
              </div>
              <p className="mt-1 text-xs text-[#A9B0B8]">Plain facts on clear coat & cabin trim.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Band 3: Category Filter & 6 Expandable Care Guides */}
      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-white/10">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] border transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#1F6BFF] border-[#1F6BFF] text-white'
                      : 'bg-[#0B0D14] border-white/15 text-[#A9B0B8] hover:text-white hover:border-white/30'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start"
          >
            {visibleTips.map((tip) => {
              const isOpen = expandedId === tip.id;
              return (
                <article
                  key={tip.id}
                  id={tip.slug}
                  data-guide-card
                  className="border border-white/12 bg-[#0B0D14] overflow-hidden flex flex-col"
                >
                  <SmartImage
                    src={tip.image}
                    alt={tip.imageAlt}
                    aspect="4/3"
                    refreshOnLoad
                  />

                  <div className="p-6 sm:p-8 flex flex-col gap-4">
                    <div className="flex items-center gap-2.5 text-xs font-mono text-[#A9B0B8]">
                      <span className="text-[#4D9BFF] tabular-nums">{tip.number}</span>
                      <span aria-hidden="true">·</span>
                      <span>{tip.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{tip.readTime}</span>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl font-extrabold uppercase text-white leading-snug">
                      {tip.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[#A9B0B8] leading-relaxed">
                      {tip.summary}
                    </p>

                    {isOpen && (
                      <div className="pt-4 border-t border-white/10 space-y-4 text-sm sm:text-base text-[#D0D5DD] leading-relaxed">
                        {tip.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        <div className="p-4 border border-[#1F6BFF]/35 bg-[#05060A]">
                          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#4D9BFF]">
                            Key Takeaway
                          </span>
                          <p className="mt-1 text-sm text-white font-medium">
                            {tip.takeaway}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpandedId(isOpen ? null : tip.id)}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#4D9BFF] hover:text-white transition-colors"
                      >
                        <span>{isOpen ? 'Close Article' : 'Read Full Guide'}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      <TransitionLink
                        to="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.14em] text-[#A9B0B8] hover:text-white transition-colors"
                      >
                        <span>Ask Travi G</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </TransitionLink>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Band 4: Quick Driveway Habits Comparison */}
      <section className="bg-[#080A10] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
              03 · Quick Reference
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
              Home Wash Do&apos;s &amp; Don&apos;ts
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 border border-white/12 bg-[#0B0D14]">
              <h3 className="font-display text-xl font-bold uppercase text-white mb-5">
                Recommended Habits
              </h3>
              <ul className="space-y-4">
                {RECOMMENDED_HABITS.map((habit) => (
                  <li key={habit} className="flex items-start gap-3 text-sm sm:text-base text-[#D0D5DD]">
                    <span className="w-6 h-6 flex items-center justify-center border border-[#1F6BFF]/40 bg-[#1F6BFF]/10 text-[#4D9BFF] shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{habit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8 border border-white/12 bg-[#0B0D14]">
              <h3 className="font-display text-xl font-bold uppercase text-white mb-5">
                Habits To Skip
              </h3>
              <ul className="space-y-4">
                {SKIP_HABITS.map((habit) => (
                  <li key={habit} className="flex items-start gap-3 text-sm sm:text-base text-[#A9B0B8]">
                    <span className="w-6 h-6 flex items-center justify-center border border-white/15 bg-[#05060A] text-[#A9B0B8] shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </span>
                    <span>{habit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Band 5: Need a Professional Reset? */}
      <section className="bg-[#05060A] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                04 · Ready For A Reset?
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
                Studio Services
              </h2>
            </div>
            <TransitionLink
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white hover:text-[#4D9BFF] transition-colors"
            >
              <span>All Services</span>
              <ArrowRight className="w-4 h-4 text-[#4D9BFF]" />
            </TransitionLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((service) => (
              <TransitionLink
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group p-6 border border-white/12 bg-[#0B0D14] hover:border-[#1F6BFF]/70 transition-colors flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                    {service.number}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold uppercase text-white group-hover:text-[#4D9BFF] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#A9B0B8]">{service.tagline}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.14em] text-[#D0D5DD]">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#4D9BFF]" />
                </span>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
