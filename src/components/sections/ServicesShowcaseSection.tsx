import { useEffect, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICE_MATCHER, SERVICES } from '../../data/services';
import { gsap } from '../../lib/gsap';
import { ServiceIcon } from '../ui/ServiceIcon';
import { TransitionLink } from '../ui/TransitionLink';

export function ServicesShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinContainer = pinContainerRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;
    if (!section || !pinContainer || !track) return;

    const mm = gsap.matchMedia();

    // Desktop lg+ horizontal pinned scroll with strict non-overlapping two-column panels
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportContainer = track.parentElement;
        const containerWidth = viewportContainer ? viewportContainer.clientWidth - 96 : pinContainer.clientWidth;
        const overflow = trackWidth - containerWidth + 32;
        return overflow > 0 ? overflow : 0;
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinContainer,
          start: 'top top',
          end: () => `+=${Math.max(getScrollAmount(), 1100)}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinSpacing: true,
          onUpdate: (self) => {
            if (progressBar) {
              progressBar.style.transform = `scaleX(${Math.max(0.06, self.progress)})`;
            }
          },
        },
      });

      return () => {
        tween.kill();
        gsap.set(track, { clearProps: 'transform' });
      };
    });

    // Tablet & Mobile (< 1024px): normal vertical stack, simple reveals, zero pinning
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = track.querySelectorAll('[data-service-panel]');
      gsap.fromTo(
        cards,
        { y: 26, opacity: 0.25 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      const cards = track.querySelectorAll('[data-service-panel]');
      gsap.set(cards, { y: 0, opacity: 1 });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#080A10] border-b border-white/10">
      {/* Pinned Horizontal Container on Desktop */}
      <div
        ref={pinContainerRef}
        className="w-full lg:h-[100svh] flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-10 lg:pb-8 overflow-hidden"
      >
        {/* Header Bar */}
        <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 mb-8 lg:mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">02</span>
              <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                Core Services · 4 Specialties
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-silver-static">
              Precision Care
            </h2>
          </div>

          <TransitionLink
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#F4F6F8] hover:text-[#4D9BFF] transition-colors shrink-0"
          >
            <span>All Services</span>
            <ArrowRight className="w-4 h-4" />
          </TransitionLink>
        </div>

        {/* Horizontal Track on Desktop / Vertical Stack on Mobile */}
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex-1 min-h-0 flex items-center">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-8 w-full lg:w-max will-change-transform"
          >
            {SERVICES.map((service, idx) => {
              const imageFirstOnDesktop = idx % 2 === 1;
              return (
                <article
                  key={service.slug}
                  data-service-panel
                  className="w-full lg:w-[clamp(320px,80vw,1060px)] lg:h-[clamp(390px,58svh,540px)] shrink-0 border border-white/12 bg-[#0B0D14] grid grid-cols-1 lg:grid-cols-12 overflow-hidden group"
                >
                  {/* TEXT COLUMN (5/12 on desktop, always strictly separate track, z-10 above everything) */}
                  <div
                    className={`lg:col-span-5 relative z-10 min-w-0 p-6 sm:p-8 lg:p-8 bg-[#0B0D14] flex flex-col justify-between gap-4 order-2 ${
                      imageFirstOnDesktop ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.18em] text-[#4D9BFF]">
                          <ServiceIcon name={service.iconName} className="w-4 h-4 shrink-0" />
                          <span className="tabular-nums">Service {service.number}</span>
                        </div>
                        <span className="font-mono text-xs text-[#6B727A] tabular-nums">
                          {service.number} / 04
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-[1.65rem] font-extrabold uppercase tracking-tight text-white leading-tight">
                        {service.title}
                      </h3>

                      <p className="mt-3 text-sm text-[#A9B0B8] leading-relaxed line-clamp-3">
                        {service.summary} {service.tagline}
                      </p>

                      <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                        {service.included.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className="text-xs sm:text-[13px] text-[#D0D5DD] flex items-start gap-2.5"
                          >
                            <Check className="w-3.5 h-3.5 text-[#4D9BFF] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <TransitionLink
                        to={`/services/${service.slug}`}
                        className="btn-slide-fill inline-flex items-center justify-between gap-3 w-full sm:w-auto px-5 py-3 bg-[#1F6BFF] border border-[#1F6BFF] text-white text-xs font-semibold uppercase tracking-[0.14em]"
                      >
                        <span>View Service</span>
                        <ArrowRight className="w-4 h-4 shrink-0" />
                      </TransitionLink>
                    </div>
                  </div>

                  {/* IMAGE COLUMN (7/12 on desktop, strictly contained inside overflow-hidden wrapper) */}
                  <div
                    className={`lg:col-span-7 relative overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full bg-[#05060A] order-1 ${
                      imageFirstOnDesktop ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Desktop Horizontal Progress Line */}
        <div className="hidden lg:block max-w-[1440px] w-full mx-auto px-12 pt-5 shrink-0">
          <div className="flex items-center justify-between gap-6 mb-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#6B727A]">
            <span>Scroll to move through services</span>
            <span>01 — 04</span>
          </div>
          <div className="w-full h-px bg-white/10 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-[#1F6BFF] to-[#F4F6F8] origin-left"
              style={{ transform: 'scaleX(0.06)' }}
            />
          </div>
        </div>
      </div>

      {/* Helper Strip: Which service is right for you? */}
      <div className="bg-[#05060A] border-t border-white/10 py-12 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
              Quick Matcher
            </span>
            <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-white">
              Which service is right for you?
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_MATCHER.map((row) => (
              <TransitionLink
                key={row.slug}
                to={`/services/${row.slug}`}
                className="group p-5 border border-white/10 bg-[#0B0D14] hover:border-[#1F6BFF]/70 transition-colors flex flex-col justify-between gap-3"
              >
                <p className="text-xs sm:text-sm text-[#A9B0B8]">{row.situation}</p>
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
                  <span className="font-display text-sm font-bold text-white group-hover:text-[#4D9BFF] transition-colors">
                    {row.recommended}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#4D9BFF] shrink-0 transition-transform group-hover:translate-x-0.5" />
                </div>
              </TransitionLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
