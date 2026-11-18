import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Minus, Phone, Plus } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { SmartImage } from '../components/ui/SmartImage';
import { TransitionLink } from '../components/ui/TransitionLink';
import { CARE_TIPS } from '../data/careTips';
import { FAQ_ITEMS, FaqItem } from '../data/faq';
import { BEFORE_YOU_BOOK } from '../data/process';
import { SERVICE_MATCHER } from '../data/services';
import { SITE } from '../data/site';
import { gsap } from '../lib/gsap';

type FilterGroup = 'All' | FaqItem['group'];
const GROUPS: FilterGroup[] = ['All', 'Booking & Quotes', 'Before Your Detail', 'Process & Care'];

export function FaqPage() {
  const [activeGroup, setActiveGroup] = useState<FilterGroup>('All');
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const listRef = useRef<HTMLDivElement>(null);

  const visibleItems =
    activeGroup === 'All'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.group === activeGroup);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = el.querySelectorAll('[data-faq-row]');
      gsap.fromTo(
        items,
        { y: 18, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      const items = el.querySelectorAll('[data-faq-row]');
      gsap.set(items, { y: 0, opacity: 1 });
    }, 2500);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, [activeGroup]);

  return (
    <>
      <PageHero
        sectionNumber="04"
        title="Frequently Asked Questions"
        subtitle={`Clear answers on booking, vehicle prep, weather adjustments, and detailing care in ${SITE.city}.`}
        image="/images/studio-interior.jpg"
        imageAlt="Clean dark automotive cabin interior"
        breadcrumb={[{ label: 'FAQ' }]}
      />

      {/* Band 2: Filter + Accordion + Direct Help Aside */}
      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          {/* Interactive Group Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-6 border-b border-white/10">
            {GROUPS.map((group) => {
              const active = activeGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setActiveGroup(group)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] border transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-[#1F6BFF] border-[#1F6BFF] text-white'
                      : 'bg-[#0B0D14] border-white/15 text-[#A9B0B8] hover:text-white hover:border-white/30'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Accordion List */}
            <div
              ref={listRef}
              className="lg:col-span-8 divide-y divide-white/10 border-y border-white/10 min-w-0"
            >
              {visibleItems.map((item, idx) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} data-faq-row className="py-1">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="w-full py-5 flex items-start justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6BFF]"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.16em] text-[#4D9BFF] mb-1.5">
                          <span className="tabular-nums">0{idx + 1}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.group}</span>
                        </div>
                        <span className="block font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#4D9BFF] transition-colors">
                          {item.question}
                        </span>
                      </div>

                      <span className="w-9 h-9 flex items-center justify-center border border-white/15 bg-[#0B0D14] text-white shrink-0 mt-1">
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-[#4D9BFF]" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="pb-6 pr-6 text-sm sm:text-base text-[#A9B0B8] leading-relaxed">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Side Contact Callout */}
            <aside className="lg:col-span-4 p-6 sm:p-8 border border-white/12 bg-[#0B0D14] min-w-0 lg:sticky lg:top-28">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                Direct Help
              </span>
              <h2 className="mt-2 font-display text-2xl font-extrabold uppercase text-white">
                Ask {SITE.owner} Directly
              </h2>
              <p className="mt-3 text-sm text-[#A9B0B8] leading-relaxed">
                Have a question about a specific paint mark, interior material, or scheduling window in {SITE.city}? Call directly or send a quote request.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#1F6BFF] hover:bg-[#4D9BFF] text-white text-xs font-mono uppercase tracking-[0.14em] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {SITE.phoneDisplay}</span>
                </a>
                <TransitionLink
                  to="/contact"
                  className="inline-flex items-center justify-center px-5 py-3.5 border border-white/20 bg-[#05060A] hover:border-[#4D9BFF] text-white text-xs font-mono uppercase tracking-[0.14em] transition-colors"
                >
                  Request a Free Quote
                </TransitionLink>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Band 3: Before You Drop Off Prep Checklist */}
      <section className="bg-[#080A10] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 min-w-0">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
              02 · Appointment Prep
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
              Before You Drop Off
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A9B0B8] leading-relaxed">
              Clearing loose cabin clutter and sharing any paint concerns ahead of time helps your appointment run smoothly.
            </p>
            <TransitionLink
              to="/process"
              className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white hover:text-[#4D9BFF] transition-colors"
            >
              <span>See Full Studio Process</span>
              <ArrowRight className="w-4 h-4 text-[#4D9BFF]" />
            </TransitionLink>
          </div>

          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10 min-w-0">
            {BEFORE_YOU_BOOK.map((item, idx) => (
              <div key={item} className="py-4 flex items-start gap-4">
                <span className="w-6 h-6 flex items-center justify-center border border-[#1F6BFF]/40 bg-[#1F6BFF]/10 text-[#4D9BFF] shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="flex-1 text-sm sm:text-base text-[#D0D5DD]">{item}</span>
                <span className="font-mono text-xs text-[#6B727A] tabular-nums shrink-0">
                  0{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 4: Quick Service Matcher */}
      <section className="bg-[#05060A] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
              03 · Service Guide
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
              Not Sure What To Book?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICE_MATCHER.map((item) => (
              <TransitionLink
                key={item.slug}
                to={`/services/${item.slug}`}
                className="group p-6 border border-white/12 bg-[#0B0D14] hover:border-[#1F6BFF]/70 transition-colors flex flex-col justify-between gap-4"
              >
                <p className="text-sm text-[#A9B0B8] leading-relaxed">{item.situation}</p>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="font-display text-base font-bold text-white group-hover:text-[#4D9BFF] transition-colors">
                    {item.recommended}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#4D9BFF] shrink-0" />
                </div>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>

      {/* Band 5: Helpful Care Guides Teaser */}
      <section className="bg-[#080A10] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                04 · Guides
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
                Helpful Care Tips
              </h2>
            </div>
            <TransitionLink
              to="/care-tips"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white hover:text-[#4D9BFF] transition-colors"
            >
              <span>All Care Tips</span>
              <ArrowRight className="w-4 h-4 text-[#4D9BFF]" />
            </TransitionLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CARE_TIPS.slice(0, 3).map((tip) => (
              <TransitionLink
                key={tip.id}
                to="/care-tips"
                className="group border border-white/12 bg-[#0B0D14] hover:border-[#1F6BFF]/70 transition-colors overflow-hidden flex flex-col"
              >
                <SmartImage src={tip.image} alt={tip.imageAlt} aspect="4/3" refreshOnLoad />
                <div className="p-6 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs text-[#4D9BFF]">
                      {tip.number} · {tip.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold uppercase text-white group-hover:text-[#4D9BFF] transition-colors">
                      {tip.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#A9B0B8] line-clamp-2">{tip.summary}</p>
                </div>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
