import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Minus, Phone, Plus, UserCheck } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { ServiceIcon } from '../components/ui/ServiceIcon';
import { SmartImage } from '../components/ui/SmartImage';
import { SparkleStar } from '../components/ui/SparkleStar';
import { TransitionLink } from '../components/ui/TransitionLink';
import { SERVICES, getServiceBySlug } from '../data/services';
import { SITE } from '../data/site';
import { gsap } from '../lib/gsap';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);
  const contentRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    setOpenFaq(0);
    const root = contentRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const checklistItems = root.querySelectorAll('[data-included-item]');
      const processSteps = root.querySelectorAll('[data-process-step]');
      const galleryCards = root.querySelectorAll('[data-mini-shot]');

      gsap.fromTo(
        checklistItems,
        { x: -16, opacity: 0.2 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        processSteps,
        { y: 22, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: processSteps[0] || root,
            start: 'top 84%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        galleryCards,
        { y: 20, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryCards[0] || root,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      const els = root.querySelectorAll(
        '[data-included-item], [data-process-step], [data-mini-shot]'
      );
      gsap.set(els, { x: 0, y: 0, opacity: 1 });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, [slug]);

  if (!service) {
    return (
      <section className="min-h-[75svh] pt-36 pb-20 bg-[#05060A] flex items-center">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
            Service Not Found
          </span>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold uppercase text-white">
            Explore Our Services
          </h1>
          <p className="mt-4 text-[#A9B0B8] max-w-md mx-auto">
            That service link does not match an active detailing service. View all four services below.
          </p>
          <TransitionLink
            to="/services"
            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-[#1F6BFF] text-white text-xs font-semibold uppercase tracking-[0.14em]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </TransitionLink>
        </div>
      </section>
    );
  }

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        sectionNumber={service.number}
        title={service.title}
        subtitle={service.tagline}
        image={service.image}
        imageAlt={service.imageAlt}
        breadcrumb={[{ label: 'Services', to: '/services' }, { label: service.shortLabel }]}
      />

      <div ref={contentRef} className="bg-[#05060A]">
        {/* 1. Overview (2 Paragraphs) & What's Included Split */}
        <section className="py-16 sm:py-24 border-b border-white/10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 min-w-0">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#4D9BFF] mb-4">
                <ServiceIcon name={service.iconName} className="w-4 h-4" />
                <span>Service Overview · {SITE.city}</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                What To Expect
              </h2>

              <div className="mt-4 space-y-4 text-base text-[#D0D5DD] leading-relaxed">
                {service.overviewParagraphs.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>

              <div className="mt-8 border border-white/12 bg-[#0B0D14] overflow-hidden">
                <SmartImage
                  src={service.image}
                  alt={service.imageAlt}
                  aspect="4/3"
                  refreshOnLoad
                />
              </div>
            </div>

            <div className="lg:col-span-7 min-w-0">
              <div className="p-6 sm:p-10 border border-white/12 bg-[#0B0D14]">
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
                    What&apos;s Included
                  </h3>
                  <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                    {service.included.length} Points
                  </span>
                </div>

                <ul className="divide-y divide-white/10">
                  {service.included.map((item, idx) => (
                    <li
                      key={item}
                      data-included-item
                      className="py-4 flex items-start gap-4 text-sm sm:text-base text-[#E5E7EB]"
                    >
                      <span className="w-6 h-6 flex items-center justify-center border border-[#1F6BFF]/40 bg-[#1F6BFF]/10 text-[#4D9BFF] shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span className="flex-1">{item}</span>
                      <span className="font-mono text-xs text-[#6B727A] tabular-nums shrink-0">
                        0{idx + 1}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <TransitionLink
                    to={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="btn-slide-fill inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#1F6BFF] border border-[#1F6BFF] text-white text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap"
                  >
                    <span>Request Free Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </TransitionLink>

                  <a
                    href={SITE.phoneHref}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-4 border border-white/20 bg-[#05060A] hover:border-[#4D9BFF] text-white text-xs font-mono tracking-wider transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#4D9BFF]" />
                    <span>{SITE.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Sticky Split 4-Step Process for This Service */}
        <section className="py-16 sm:py-24 bg-[#080A10] border-b border-white/10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28 min-w-0">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                Workflow
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-silver-static">
                Our Process For This Service
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#A9B0B8] leading-relaxed">
                Each stage follows a clear order so clean surfaces are never contaminated by dirty tools or rushed steps.
              </p>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-6 min-w-0">
              {service.process.map((step, idx) => (
                <article
                  key={step.step}
                  data-process-step
                  className="border border-white/12 bg-[#0B0D14] grid grid-cols-1 md:grid-cols-12 overflow-hidden"
                >
                  <div className="md:col-span-6 p-6 sm:p-7 flex flex-col justify-between gap-4">
                    <span className="font-mono text-sm text-[#4D9BFF] tabular-nums">
                      Step 0{idx + 1} / 04
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold uppercase text-white">
                        {step.step}
                      </h3>
                      <p className="mt-2.5 text-sm text-[#A9B0B8] leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-6 relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-full">
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Who It's For + Good To Know / How To Prepare */}
        <section className="py-16 sm:py-24 border-b border-white/10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-6 p-6 sm:p-9 border border-white/12 bg-[#0B0D14] min-w-0">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.18em] text-[#4D9BFF] mb-4">
                <UserCheck className="w-4 h-4" />
                <span>Ideal Fit</span>
              </div>
              <h2 className="font-display text-2xl font-extrabold uppercase text-white mb-6">
                Who It&apos;s For
              </h2>
              <ul className="space-y-4">
                {service.whoItIsFor.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm sm:text-base text-[#D0D5DD]">
                    <SparkleStar size={12} variant="blue" twinkle={false} className="mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-9 border border-white/12 bg-[#0B0D14] min-w-0">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.18em] text-[#4D9BFF] mb-4">
                <span>Preparation</span>
              </div>
              <h2 className="font-display text-2xl font-extrabold uppercase text-white mb-6">
                Good To Know / How To Prepare
              </h2>
              <ul className="space-y-4">
                {service.howToPrepare.map((note, idx) => (
                  <li key={note} className="flex items-start gap-3.5 text-sm sm:text-base text-[#A9B0B8]">
                    <span className="font-mono text-xs text-[#4D9BFF] tabular-nums mt-1 shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Mini Gallery of Relevant Images */}
        <section className="py-16 sm:py-24 bg-[#080A10] border-b border-white/10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                Visual Focus
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
                Inside The {service.shortLabel}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.miniGallery.map((shot) => (
                <div
                  key={shot.caption}
                  data-mini-shot
                  className="border border-white/12 bg-[#0B0D14] overflow-hidden"
                >
                  <SmartImage src={shot.src} alt={shot.alt} aspect="4/3" refreshOnLoad />
                  <div className="p-4 border-t border-white/10 text-xs font-mono uppercase tracking-[0.15em] text-[#D0D5DD]">
                    {shot.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Service FAQ + Related Services */}
        <section className="py-16 sm:py-24 border-b border-white/10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 min-w-0">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                Service Questions
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold uppercase text-white mb-6">
                Quick Answers
              </h2>

              <div className="divide-y divide-white/10 border-y border-white/10">
                {service.faqs.map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={item.question} className="py-1">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full py-4 flex items-start justify-between gap-4 text-left"
                      >
                        <span className="font-display text-base sm:text-lg font-bold text-white">
                          {item.question}
                        </span>
                        <span className="w-7 h-7 flex items-center justify-center border border-white/15 bg-[#0B0D14] shrink-0">
                          {isOpen ? (
                            <Minus className="w-3.5 h-3.5 text-[#4D9BFF]" />
                          ) : (
                            <Plus className="w-3.5 h-3.5" />
                          )}
                        </span>
                      </button>
                      {isOpen && (
                        <p className="pb-4 text-sm text-[#A9B0B8] leading-relaxed">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6 min-w-0">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                Related Services
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold uppercase text-white mb-6">
                Pair With Another Service
              </h2>

              <div className="flex flex-col gap-3">
                {otherServices.map((other) => (
                  <TransitionLink
                    key={other.slug}
                    to={`/services/${other.slug}`}
                    className="group p-5 border border-white/10 bg-[#0B0D14] hover:border-[#1F6BFF]/60 transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-mono text-xs text-[#4D9BFF] tabular-nums shrink-0">
                        {other.number}
                      </span>
                      <div className="min-w-0">
                        <div className="font-display text-base font-bold text-white group-hover:text-[#4D9BFF] transition-colors truncate">
                          {other.title}
                        </div>
                        <div className="text-xs text-[#A9B0B8] truncate">
                          {other.tagline}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#A9B0B8] group-hover:text-white shrink-0" />
                  </TransitionLink>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <CtaBand />
    </>
  );
}
