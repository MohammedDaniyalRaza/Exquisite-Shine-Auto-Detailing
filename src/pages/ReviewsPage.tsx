import { useEffect, useRef } from 'react';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { SmartImage } from '../components/ui/SmartImage';
import { SparkleStar } from '../components/ui/SparkleStar';
import { TransitionLink } from '../components/ui/TransitionLink';
import { SERVICES } from '../data/services';
import { SITE } from '../data/site';
import { TESTIMONIALS } from '../data/testimonials';
import { gsap } from '../lib/gsap';

export function ReviewsPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const featured = TESTIMONIALS[0];

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = grid.querySelectorAll('[data-review-card]');
      gsap.fromTo(
        cards,
        { y: 24, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
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
      const cards = grid.querySelectorAll('[data-review-card]');
      gsap.set(cards, { y: 0, opacity: 1 });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, []);

  return (
    <>
      <PageHero
        sectionNumber="07"
        title="Client Reviews"
        subtitle={`What drivers in ${SITE.city} notice when they pick up their vehicle from ${SITE.company}.`}
        image="/images/detail-sun-reflection.jpg"
        imageAlt="Mirror reflection across dark metallic car quarter panel"
        breadcrumb={[{ label: 'Reviews' }]}
      />

      {/* Band 2: Featured Editorial Quote */}
      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="border border-white/15 bg-[#0B0D14] p-7 sm:p-12 lg:p-14">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-1.5" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#4D9BFF] fill-[#4D9BFF]" />
                ))}
              </div>
              <SparkleStar size={18} variant="blue" delay={0.15} />
            </div>

            <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-white max-w-4xl">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-display font-bold text-white">{featured.name}</span>
              <span className="text-[#6B727A]" aria-hidden="true">
                ·
              </span>
              <span className="text-[#A9B0B8]">{featured.vehicle}</span>
              <span className="text-[#6B727A]" aria-hidden="true">
                ·
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#4D9BFF]">
                {featured.service}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Band 3: Equal-Height Review Cards Grid */}
      <section className="bg-[#080A10] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                Feedback
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
                All Reviews
              </h2>
            </div>

            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-white/20 bg-[#0B0D14] hover:border-[#1F6BFF] text-xs font-mono uppercase tracking-[0.16em] text-white transition-colors shrink-0"
            >
              <span>More on Facebook</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#4D9BFF]" />
            </a>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((item) => (
              <article
                key={item.id}
                data-review-card
                className="p-6 sm:p-8 border border-white/12 bg-[#0B0D14] flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-1 mb-5" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-[#4D9BFF] fill-[#4D9BFF]"
                      />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-[#D0D5DD] leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="font-display text-base font-bold text-white">
                    {item.name}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-[#A9B0B8]">
                    <span>{item.vehicle}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#4D9BFF]">{item.service}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Band 4: Services Behind The Reviews */}
      <section className="bg-[#05060A] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                Core Services
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
                Explore Each Specialty
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <TransitionLink
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group border border-white/12 bg-[#0B0D14] hover:border-[#1F6BFF]/70 transition-colors overflow-hidden flex flex-col"
              >
                <SmartImage
                  src={service.image}
                  alt={service.imageAlt}
                  aspect="4/3"
                  refreshOnLoad
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-5 flex-1 flex flex-col justify-between gap-2">
                  <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                    {service.number}
                  </span>
                  <h3 className="font-display text-lg font-bold uppercase text-white group-hover:text-[#4D9BFF] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A9B0B8]">{service.tagline}</p>
                </div>
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>

      {/* Band 5: Studio Trust Standards */}
      <section className="bg-[#080A10] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SITE.trustPoints.map((point, idx) => (
            <div
              key={point}
              className="p-6 border border-white/10 bg-[#0B0D14] flex flex-col justify-between gap-4"
            >
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                0{idx + 1}
              </span>
              <div className="font-display text-lg font-bold uppercase text-white">
                {point}
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 mt-10 flex justify-center">
          <TransitionLink
            to="/contact"
            className="btn-slide-fill inline-flex items-center gap-2.5 px-7 py-4 bg-[#1F6BFF] border border-[#1F6BFF] text-white text-xs font-semibold uppercase tracking-[0.14em]"
          >
            <span>Request Your Free Quote</span>
          </TransitionLink>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
