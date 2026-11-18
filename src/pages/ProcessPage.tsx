import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { SmartImage } from '../components/ui/SmartImage';
import { SparkleStar } from '../components/ui/SparkleStar';
import { TransitionLink } from '../components/ui/TransitionLink';
import { BEFORE_YOU_BOOK, PROCESS_TIMELINE } from '../data/process';
import { SERVICES } from '../data/services';
import { SITE } from '../data/site';
import { gsap, splitWordsOnly } from '../lib/gsap';

export function ProcessPage() {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const timelineWrapRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [litStep, setLitStep] = useState(0);

  useEffect(() => {
    const statementEl = statementRef.current;
    const timelineWrap = timelineWrapRef.current;
    const lineEl = progressLineRef.current;
    if (!statementEl || !timelineWrap) return;

    const splitter = splitWordsOnly(statementEl);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
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

      if (lineEl) {
        gsap.fromTo(
          lineEl,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineWrap,
              start: 'top 55%',
              end: 'bottom 65%',
              scrub: 0.4,
            },
          }
        );
      }

      nodeRefs.current.forEach((el, idx) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 24, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 65%',
              onEnter: () => setLitStep((prev) => Math.max(prev, idx)),
              onEnterBack: () => setLitStep(idx),
            },
          }
        );
      });
    });

    const failsafe = window.setTimeout(() => {
      gsap.set(splitter.words, { color: '#FFFFFF' });
      if (lineEl) gsap.set(lineEl, { scaleY: 1 });
      nodeRefs.current.forEach((el) => {
        if (el) gsap.set(el, { y: 0, opacity: 1 });
      });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
      splitter.revert();
    };
  }, []);

  return (
    <>
      <PageHero
        sectionNumber="06"
        title="How We Detail"
        subtitle={`From your first quote call through final light inspection—every step inside the ${SITE.company} process in ${SITE.city}.`}
        image="/images/detail-coupe-garage.jpg"
        imageAlt="Deep midnight blue performance coupe in concrete detailing bay"
        breadcrumb={[{ label: 'How We Detail' }]}
      />

      {/* Scrubbed Intro Statement */}
      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">01</span>
            <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
              Studio Method
            </span>
          </div>
          <p
            ref={statementRef}
            className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.12] max-w-5xl text-white"
          >
            Clean results come from order, patience, and matching the right tool to every surface—never rushing a single panel.
          </p>
        </div>
      </section>

      {/* Vertical Scroll-Drawing Timeline */}
      <section className="bg-[#080A10] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
              6-Stage Workflow
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold uppercase text-silver-static">
              Step By Step
            </h2>
          </div>

          <div ref={timelineWrapRef} className="relative pl-8 sm:pl-14">
            {/* Background Track Line */}
            <div
              aria-hidden="true"
              className="absolute left-3 sm:left-5 top-2 bottom-2 w-px bg-white/12"
            />
            {/* Scroll-Drawing Vibrant Blue Line */}
            <div
              ref={progressLineRef}
              aria-hidden="true"
              className="absolute left-3 sm:left-5 top-2 bottom-2 w-[2px] -ml-[0.5px] bg-gradient-to-b from-[#1F6BFF] via-[#4D9BFF] to-[#F4F6F8] origin-top"
            />

            <div className="flex flex-col gap-12 sm:gap-16">
              {PROCESS_TIMELINE.map((step, idx) => {
                const isLit = idx <= litStep;
                return (
                  <article
                    key={step.number}
                    ref={(el) => {
                      nodeRefs.current[idx] = el as HTMLDivElement | null;
                    }}
                    className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center border border-white/12 bg-[#0B0D14] p-5 sm:p-8"
                  >
                    {/* Timeline Node Dot */}
                    <div
                      aria-hidden="true"
                      className={`absolute -left-[27px] sm:-left-[45px] top-8 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                        isLit
                          ? 'bg-[#1F6BFF] border-[#4D9BFF] shadow-[0_0_16px_rgba(31,107,255,0.75)]'
                          : 'bg-[#05060A] border-white/30'
                      }`}
                    />

                    <div className="lg:col-span-6 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                          {step.number}
                        </span>
                        <span className="text-white/20" aria-hidden="true">
                          /
                        </span>
                        <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#A9B0B8]">
                          {step.summary}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-sm sm:text-base text-[#A9B0B8] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>

                    <div className="lg:col-span-6 min-w-0">
                      <SmartImage
                        src={step.image}
                        alt={step.imageAlt}
                        aspect="4/3"
                        refreshOnLoad
                        className="border border-white/10"
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Before You Book Preparation Checklist */}
      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-5 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <SparkleStar size={14} variant="blue" twinkle={false} />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                Appointment Prep
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-silver-static">
              Before You Book
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#A9B0B8] leading-relaxed">
              A few simple steps ahead of drop-off help us focus every minute on your vehicle&apos;s paint, wheels, and cabin surfaces.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <TransitionLink
                to="/contact"
                className="btn-slide-fill inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1F6BFF] border border-[#1F6BFF] text-white text-xs font-semibold uppercase tracking-[0.14em]"
              >
                <span>Request Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </TransitionLink>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-white/20 bg-[#0B0D14] text-white text-xs font-mono tracking-wider"
              >
                <Phone className="w-4 h-4 text-[#4D9BFF]" />
                <span>{SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10 min-w-0">
            {BEFORE_YOU_BOOK.map((item, idx) => (
              <div key={item} className="py-5 flex items-start gap-4">
                <span className="w-7 h-7 flex items-center justify-center border border-[#1F6BFF]/40 bg-[#1F6BFF]/10 text-[#4D9BFF] shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </span>
                <div className="flex-1 text-sm sm:text-base text-[#D0D5DD] leading-relaxed">
                  {item}
                </div>
                <span className="font-mono text-xs text-[#6B727A] tabular-nums shrink-0">
                  0{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Matching Services */}
      <section className="bg-[#080A10] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                Services In Detail
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
                Choose Your Focus
              </h2>
            </div>
            <TransitionLink
              to="/care-tips"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#A9B0B8] hover:text-white transition-colors"
            >
              <span>Read Care Tips</span>
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
                  <p className="mt-2 text-sm text-[#A9B0B8] leading-relaxed">
                    {service.tagline}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-[#D0D5DD] pt-3 border-t border-white/10">
                  <span>View Service</span>
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
