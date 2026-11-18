import { useEffect, useRef } from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { SITE } from '../../data/site';
import { gsap } from '../../lib/gsap';
import { MagneticButton } from '../ui/MagneticButton';
import { SparkleStar } from '../ui/SparkleStar';
import { TransitionLink } from '../ui/TransitionLink';

export function CtaBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    const heading = headingRef.current;
    if (!root || !heading) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 82%',
            once: true,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      if (heading) gsap.set(heading, { y: 0, opacity: 1 });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 bg-[#05060A] border-t border-white/10 overflow-hidden"
    >
      {/* Radial Showroom Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(31,107,255,0.16),transparent_62%)]"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <SparkleStar size={18} variant="blue" delay={0} />
          <span className="font-mono text-xs uppercase tracking-[0.26em] text-[#A9B0B8]">
            Free Quotes · {SITE.city}
          </span>
          <SparkleStar size={18} variant="silver" delay={0.5} />
        </div>

        <div ref={headingRef} className="max-w-5xl mx-auto">
          <h2 className="font-display font-extrabold uppercase tracking-tight leading-[0.9] text-[clamp(2.5rem,9vw,7.25rem)]">
            <span className="block text-outlined-silver">BOOK YOUR</span>
            <span className="block text-silver-metallic mt-1">SHINE</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#A9B0B8] max-w-xl mx-auto">
            Reach out to {SITE.owner} for a straightforward quote on exterior detailing, interior care, machine polishing, or wax protection.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <TransitionLink
                to="/contact"
                className="btn-slide-fill inline-flex items-center justify-center gap-3 px-8 py-4 border border-[#1F6BFF] bg-[#1F6BFF] text-white font-semibold uppercase tracking-[0.14em] text-xs sm:text-sm whitespace-nowrap"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </TransitionLink>
            </MagneticButton>

            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-white/20 bg-[#0B0D14] hover:border-[#4D9BFF] text-white font-mono text-xs sm:text-sm tracking-wider transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#4D9BFF]" />
              <span>{SITE.phoneDisplay}</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-[#A9B0B8]">
            <a
              href={SITE.emailHref}
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#4D9BFF]" />
              <span>{SITE.email}</span>
            </a>
            <span aria-hidden="true" className="text-white/20">
              /
            </span>
            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
