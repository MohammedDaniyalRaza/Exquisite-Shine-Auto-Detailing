import { useEffect, useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { SITE } from '../../data/site';
import { usePreloaderReady } from '../../hooks/usePreloaderReady';
import { gsap, splitWordsAndChars } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/lenis';
import { MagneticButton } from '../ui/MagneticButton';
import { SparkleStar } from '../ui/SparkleStar';
import { TransitionLink } from '../ui/TransitionLink';

export function HeroSection() {
  const preloaderReady = usePreloaderReady();
  const sectionRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!preloaderReady) return;

    const root = sectionRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    if (!root || !line1 || !line2) return;

    const split1 = splitWordsAndChars(line1);
    const split2 = splitWordsAndChars(line2);
    const reduced = prefersReducedMotion();

    split1.chars.forEach((ch) => {
      ch.classList.add('text-silver-metallic');
    });
    split2.chars.forEach((ch) => {
      ch.classList.add('text-[#2D77FF]');
    });

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([...split1.chars, ...split2.chars], { yPercent: 0, opacity: 1 });
        gsap.set([eyebrowRef.current, copyRef.current, trustRef.current], {
          y: 0,
          opacity: 1,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      if (bgImgRef.current) {
        tl.fromTo(
          bgImgRef.current,
          { scale: 1.09 },
          { scale: 1.0, duration: 2.2, ease: 'power2.out' },
          0
        );
      }

      tl.fromTo(
        eyebrowRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65 },
        0.1
      )
        .fromTo(
          split1.chars,
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.028 },
          0.16
        )
        .fromTo(
          split2.chars,
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.032 },
          0.32
        )
        .fromTo(
          copyRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.48
        )
        .fromTo(
          trustRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          0.62
        );
    }, root);

    const failsafe = window.setTimeout(() => {
      gsap.set([...split1.chars, ...split2.chars], { yPercent: 0, opacity: 1 });
      gsap.set([eyebrowRef.current, copyRef.current, trustRef.current], {
        y: 0,
        opacity: 1,
      });
    }, 2800);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
      split1.revert();
      split2.revert();
    };
  }, [preloaderReady]);

  useEffect(() => {
    const root = sectionRef.current;
    const glare = glareRef.current;
    const img = bgImgRef.current;
    if (!root || !glare || !img) return;

    const mm = gsap.matchMedia();
    mm.add(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const xImg = gsap.quickTo(img, 'x', { duration: 1.1, ease: 'power3.out' });
        const yImg = gsap.quickTo(img, 'y', { duration: 1.1, ease: 'power3.out' });

        const onMove = (e: MouseEvent) => {
          const rect = root.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width;
          const relY = (e.clientY - rect.top) / rect.height;

          glare.style.background = `radial-gradient(640px circle at ${relX * 100}% ${relY * 100}%, rgba(31, 107, 255, 0.16), transparent 65%)`;
          xImg((relX - 0.5) * -16);
          yImg((relY - 0.5) * -10);
        };

        root.addEventListener('mousemove', onMove, { passive: true });
        return () => {
          root.removeEventListener('mousemove', onMove);
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 overflow-hidden bg-[#05060A]"
    >
      {/* Background Showroom Photograph */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          ref={bgImgRef}
          src={SITE.heroImage}
          alt="Obsidian black sports coupe inside a dark detailing studio"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="w-full h-full object-cover object-center will-change-transform"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#05060A] via-[#05060A]/55 to-[#05060A]/60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#05060A]/90 via-[#05060A]/45 to-transparent"
        />
        <div
          ref={glareRef}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-500"
        />
      </div>

      {/* Decorative Logo-Echo Sparkles */}
      <div
        aria-hidden="true"
        className="absolute inset-0 max-w-[1440px] mx-auto pointer-events-none"
      >
        <SparkleStar
          size={26}
          variant="silver"
          delay={0.2}
          className="hidden sm:block absolute top-32 right-12 lg:right-20"
        />
        <SparkleStar
          size={16}
          variant="blue"
          delay={0.9}
          className="hidden sm:block absolute top-44 right-24 lg:right-36"
        />
        <SparkleStar
          size={14}
          variant="blue"
          delay={0.5}
          className="block sm:hidden absolute top-24 right-6"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 my-auto pt-6 sm:pt-10">
        <div
          ref={eyebrowRef}
          className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
        >
          <span className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-[#1F6BFF]" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#F4F6F8]">
            Auto Detailing · {SITE.city}
          </span>
          <span className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-[#1F6BFF]" />
        </div>

        <h1 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[0.88] select-none">
          <span
            ref={line1Ref}
            className="block text-[clamp(1.85rem,8.4vw,7.25rem)] text-silver-metallic"
          >
            EXQUISITE
          </span>
          <span
            ref={line2Ref}
            className="block text-[clamp(2.35rem,9.8vw,8rem)] text-[#2D77FF] mt-1 sm:mt-2"
          >
            SHINE
          </span>
        </h1>

        <div ref={copyRef} className="mt-6 sm:mt-8 max-w-2xl">
          <p className="text-base sm:text-xl text-[#E5E7EB] leading-relaxed font-normal">
            Hand-finished automotive care after dark and in full sun. Exterior washing, cabin detailing, dual-action machine polishing, and protective wax finishes in {SITE.city}.
          </p>
          <p className="mt-2.5 text-sm sm:text-base text-[#A9B0B8] leading-relaxed">
            Every coupe, sedan, SUV, and pickup truck is worked panel by panel with clean towels, calibrated tools, and zero shortcuts.
          </p>

          {/* 3 Honest Trust Chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {SITE.trustChips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 bg-[#0B0D14]/85 font-mono text-[11px] uppercase tracking-[0.15em] text-[#F4F6F8]"
              >
                <SparkleStar size={10} variant="blue" twinkle={false} />
                <span>{chip}</span>
              </span>
            ))}
          </div>

          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <MagneticButton className="w-full sm:w-auto">
              <TransitionLink
                to="/contact"
                className="btn-slide-fill w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#1F6BFF] border border-[#1F6BFF] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] whitespace-nowrap"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </TransitionLink>
            </MagneticButton>

            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-white/25 bg-[#05060A]/75 hover:border-[#4D9BFF] hover:bg-[#0B0D14] text-white text-xs sm:text-sm font-mono tracking-wider transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#4D9BFF]" />
              <span>Call {SITE.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Trust Strip inside Hero */}
      <div
        ref={trustRef}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-10"
      >
        <div className="border-t border-white/15 pt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-[#A9B0B8]">
            <span className="text-white font-medium">{SITE.trustPoints[0]}</span>
            <span aria-hidden="true" className="text-[#1F6BFF]">
              ·
            </span>
            <span>{SITE.trustPoints[1]}</span>
            <span aria-hidden="true" className="hidden sm:inline text-[#1F6BFF]">
              ·
            </span>
            <span className="hidden sm:inline">{SITE.trustPoints[2]}</span>
            <span aria-hidden="true" className="text-[#1F6BFF]">
              ·
            </span>
            <span>{SITE.trustPoints[3]}</span>
          </div>

          <span className="hidden md:inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-[#6B727A]">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
