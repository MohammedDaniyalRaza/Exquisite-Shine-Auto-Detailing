import { useEffect, useRef } from 'react';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { ServiceIcon } from '../components/ui/ServiceIcon';
import { SmartImage } from '../components/ui/SmartImage';
import { SparkleStar } from '../components/ui/SparkleStar';
import { TransitionLink } from '../components/ui/TransitionLink';
import { VEHICLE_TYPES } from '../data/process';
import { SERVICE_MATCHER, SERVICES } from '../data/services';
import { SITE } from '../data/site';
import { gsap, splitWordsOnly } from '../lib/gsap';

export function ServicesPage() {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statementEl = statementRef.current;
    const listEl = listRef.current;
    const trustEl = trustRef.current;
    if (!listEl || !trustEl) return;

    const splitter = statementEl ? splitWordsOnly(statementEl) : null;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      if (statementEl && splitter) {
        gsap.set(splitter.words, { color: 'rgba(255,255,255,0.22)' });
        gsap.to(splitter.words, {
          color: '#FFFFFF',
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: statementEl,
            start: 'top 82%',
            end: 'bottom 45%',
            scrub: 0.4,
          },
        });
      }

      const rows = listEl.querySelectorAll('[data-service-row]');
      rows.forEach((row) => {
        const content = row.querySelector('[data-service-content]');
        if (content) {
          gsap.fromTo(
            content,
            { y: 24, opacity: 0.2 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 82%',
                once: true,
              },
            }
          );
        }
      });

      const pillars = trustEl.querySelectorAll('[data-trust-pillar]');
      gsap.fromTo(
        pillars,
        { y: 20, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trustEl,
            start: 'top 86%',
            once: true,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      if (splitter) gsap.set(splitter.words, { color: '#FFFFFF' });
      const all = document.querySelectorAll('[data-service-content], [data-trust-pillar]');
      gsap.set(all, { opacity: 1, y: 0 });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
      splitter?.revert();
    };
  }, []);

  return (
    <>
      <PageHero
        sectionNumber="01"
        title="Detailing Services"
        subtitle={`Four focused automotive care services in ${SITE.city} — from pressure-washed exteriors and refreshed interiors to dual-action machine polishing and wax protection.`}
        image="/images/service-wash.jpg"
        imageAlt="Snow foam and pressure rinse on a dark vehicle fender"
        breadcrumb={[{ label: 'Services' }]}
      />

      {/* Band 2: Scrubbed Scope Statement */}
      <section className="bg-[#080A10] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">01</span>
            <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
              Clear Scope · {SITE.city}
            </span>
          </div>
          <p
            ref={statementRef}
            className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.12] max-w-5xl text-white"
          >
            Four focused services designed around what your vehicle actually needs—no confusing tiers, no rushed steps, and free quotes before any work starts.
          </p>
        </div>
      </section>

      {/* Band 3: Alternating Service Showcase Rows */}
      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div
          ref={listRef}
          className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col gap-16 sm:gap-24"
        >
          {SERVICES.map((service, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <article
                key={service.slug}
                data-service-row
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-16 sm:pb-20 border-b border-white/10 last:border-b-0 last:pb-0"
              >
                <div
                  className={`lg:col-span-6 min-w-0 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative border border-white/12 bg-[#0B0D14] overflow-hidden">
                    <SmartImage
                      src={service.image}
                      alt={service.imageAlt}
                      aspect="4/3"
                      refreshOnLoad
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#05060A]/90 border border-white/15 font-mono text-xs text-[#4D9BFF] tabular-nums">
                      {service.number}
                    </div>
                  </div>
                </div>

                <div
                  data-service-content
                  className={`lg:col-span-6 min-w-0 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <ServiceIcon
                      name={service.iconName}
                      className="w-4 h-4 text-[#4D9BFF]"
                    />
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                      Service {service.number}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-silver-static">
                    {service.title}
                  </h2>

                  <p className="mt-4 text-base text-[#D0D5DD] leading-relaxed">
                    {service.overviewParagraphs[0]}
                  </p>

                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/10 pt-5">
                    {service.included.slice(0, 4).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-[#A9B0B8]"
                      >
                        <Check className="w-4 h-4 text-[#4D9BFF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <TransitionLink
                      to={`/services/${service.slug}`}
                      className="btn-slide-fill inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1F6BFF] border border-[#1F6BFF] text-white text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap"
                    >
                      <span>View Service Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </TransitionLink>

                    <TransitionLink
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center gap-2 px-5 py-3.5 border border-white/20 bg-[#0B0D14] hover:border-[#4D9BFF] text-white text-xs font-mono uppercase tracking-[0.14em] transition-colors whitespace-nowrap"
                    >
                      <span>Request Quote</span>
                    </TransitionLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Band 4: Quick Service Matcher */}
      <section className="bg-[#080A10] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                03 · Quick Matcher
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
                Which Service Fits Best?
              </h2>
            </div>
            <TransitionLink
              to="/process"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#A9B0B8] hover:text-white transition-colors"
            >
              <span>See How We Detail</span>
              <ArrowRight className="w-4 h-4 text-[#4D9BFF]" />
            </TransitionLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICE_MATCHER.map((item) => (
              <TransitionLink
                key={item.slug}
                to={`/services/${item.slug}`}
                className="group p-6 border border-white/12 bg-[#0B0D14] hover:border-[#1F6BFF]/70 transition-colors flex flex-col justify-between gap-4"
              >
                <p className="text-sm text-[#A9B0B8] leading-relaxed">{item.situation}</p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
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

      {/* Band 5: Vehicle Types Coverage */}
      <section className="bg-[#05060A] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
              04 · Vehicle Coverage
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
              Built For Every Body Style
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VEHICLE_TYPES.map((vehicle) => (
              <TransitionLink
                key={vehicle.id}
                to={`/services/${vehicle.recommendedSlug}`}
                className="group border border-white/12 bg-[#0B0D14] hover:border-[#1F6BFF]/70 transition-colors overflow-hidden flex flex-col"
              >
                <SmartImage
                  src={vehicle.image}
                  alt={vehicle.imageAlt}
                  aspect="4/3"
                  refreshOnLoad
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                      {vehicle.number}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold uppercase text-white group-hover:text-[#4D9BFF] transition-colors">
                      {vehicle.type}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#A9B0B8] leading-relaxed">
                      {vehicle.oneLiner}
                    </p>
                  </div>
                </div>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>

      {/* Band 6: Honest Studio Pillars + Direct Call */}
      <section className="bg-[#080A10] py-16 sm:py-20 border-b border-white/10">
        <div
          ref={trustRef}
          className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SITE.trustPoints.map((point, idx) => (
              <div
                key={point}
                data-trust-pillar
                className="p-6 border border-white/10 bg-[#0B0D14] flex flex-col justify-between gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                    0{idx + 1}
                  </span>
                  <SparkleStar size={14} variant="silver" twinkle={false} />
                </div>
                <div className="font-display text-lg font-bold uppercase tracking-tight text-white">
                  {point}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 sm:p-8 border border-white/12 bg-[#0B0D14] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-white">
                Not sure which service your vehicle needs?
              </h3>
              <p className="mt-1 text-sm text-[#A9B0B8]">
                Call {SITE.owner} directly or request a free quote with your vehicle details.
              </p>
            </div>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1F6BFF] hover:bg-[#4D9BFF] text-white text-xs font-mono uppercase tracking-[0.14em] transition-colors shrink-0 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>Call {SITE.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
