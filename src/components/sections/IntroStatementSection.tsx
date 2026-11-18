import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE } from '../../data/site';
import { gsap, splitWordsOnly } from '../../lib/gsap';
import { SmartImage } from '../ui/SmartImage';
import { TransitionLink } from '../ui/TransitionLink';

export function IntroStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statementEl = statementRef.current;
    const sideEl = sideRef.current;
    if (!statementEl || !sideEl) return;

    const splitter = splitWordsOnly(statementEl);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set(splitter.words, { color: 'rgba(255, 255, 255, 0.22)' });
      gsap.to(splitter.words, {
        color: '#FFFFFF',
        stagger: 0.08,
        ease: 'none',
        scrollTrigger: {
          trigger: statementEl,
          start: 'top 82%',
          end: 'bottom 45%',
          scrub: 0.45,
        },
      });

      gsap.fromTo(
        sideEl,
        { y: 24, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sideEl,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(splitter.words, { color: '#FFFFFF' });
      gsap.set(sideEl, { y: 0, opacity: 1 });
    });

    const failsafe = window.setTimeout(() => {
      gsap.set(splitter.words, { color: '#FFFFFF' });
      gsap.set(sideEl, { y: 0, opacity: 1 });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
      splitter.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#05060A] py-20 sm:py-28 lg:py-32 border-b border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">00</span>
          <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
            Detail-Obsessed Craft · {SITE.city}
          </span>
        </div>

        <p
          ref={statementRef}
          className="font-display text-2xl sm:text-4xl lg:text-[2.85rem] font-extrabold uppercase tracking-tight leading-[1.12] max-w-5xl text-white"
        >
          Real detailing shows up in the places most washes rush right past—clean emblems, crisp door jambs, swirl-free reflections, and dry matte cabins.
        </p>

        <div
          ref={sideRef}
          className="mt-12 pt-10 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="lg:col-span-5 min-w-0">
            <div className="border border-white/12 bg-[#0B0D14] overflow-hidden">
              <SmartImage
                src="/images/detail-microfiber-buff.jpg"
                alt="Plush blue microfiber towels buffing deep glossy black paint"
                aspect="4/3"
                refreshOnLoad
              />
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0 max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-silver-static">
              Built Around Patience &amp; Clean Tools
            </h2>
            <p className="mt-4 text-base text-[#A9B0B8] leading-relaxed">
              At {SITE.company}, {SITE.owner} approaches every vehicle by hand—matching wash mitts, brushes, polishes, and fresh microfiber towels to the surfaces in front of us. Whether it is a daily driver needing a thorough reset or dark paintwork ready for refinement, nothing leaves until it passes a direct light check.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <TransitionLink
                to="/process"
                className="btn-slide-fill inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1F6BFF] border border-[#1F6BFF] text-white text-xs font-semibold uppercase tracking-[0.14em]"
              >
                <span>See How We Detail</span>
                <ArrowRight className="w-4 h-4" />
              </TransitionLink>
              <TransitionLink
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 bg-[#0B0D14] hover:border-[#4D9BFF] text-white text-xs font-mono uppercase tracking-[0.14em] transition-colors"
              >
                <span>About {SITE.owner}</span>
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
