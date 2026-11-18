import { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { gsap, splitWordsAndChars } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/lenis';
import { SparkleStar } from '../ui/SparkleStar';
import { TransitionLink } from '../ui/TransitionLink';

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  breadcrumb: { label: string; to?: string }[];
  sectionNumber?: string;
}

export function PageHero({
  title,
  subtitle,
  image,
  imageAlt,
  breadcrumb,
  sectionNumber,
}: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const root = heroRef.current;
    const titleEl = titleRef.current;
    if (!root || !titleEl) return;

    const splitter = splitWordsAndChars(titleEl);
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(splitter.chars, { yPercent: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        splitter.chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.022,
          ease: 'power4.out',
          delay: 0.1,
        }
      );

      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.07 },
          { scale: 1, duration: 1.5, ease: 'power2.out' }
        );
      }
    }, root);

    // Failsafe ensure visibility
    const failsafe = window.setTimeout(() => {
      gsap.set(splitter.chars, { yPercent: 0, opacity: 1 });
    }, 2800);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
      splitter.revert();
    };
  }, [title]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[52svh] sm:min-h-[56svh] flex items-end pt-28 pb-14 sm:pt-36 sm:pb-20 overflow-hidden border-b border-white/10"
    >
      {/* Sharp Background Image + Gradient Overlay Only */}
      <div className="absolute inset-0 bg-[#05060A]">
        <img
          ref={imgRef}
          src={image}
          alt={imageAlt}
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#05060A] via-[#05060A]/75 to-[#05060A]/45"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#05060A]/90 via-[#05060A]/40 to-transparent"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#A9B0B8] mb-5"
        >
          <TransitionLink to="/" className="hover:text-white transition-colors">
            Home
          </TransitionLink>
          {breadcrumb.map((crumb, index) => (
            <span key={crumb.label} className="inline-flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-[#4D9BFF]" />
              {crumb.to && index < breadcrumb.length - 1 ? (
                <TransitionLink to={crumb.to} className="hover:text-white transition-colors">
                  {crumb.label}
                </TransitionLink>
              ) : (
                <span className="text-white">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="flex items-start justify-between gap-6">
          <div className="max-w-4xl min-w-0">
            {sectionNumber && (
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                  {sectionNumber}
                </span>
                <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                  Loveland
                </span>
              </div>
            )}

            <h1
              ref={titleRef}
              className="font-display font-extrabold uppercase tracking-tight text-silver-metallic leading-[0.95] text-[clamp(2.15rem,6vw,4.75rem)]"
            >
              {title}
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#D0D5DD] max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-3 shrink-0 pt-2">
            <SparkleStar size={24} variant="blue" delay={0.1} />
            <SparkleStar size={14} variant="silver" delay={0.7} className="mr-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
