import { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Disc3, Droplets, Eye, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { SmartImage } from '../components/ui/SmartImage';
import { SparkleStar } from '../components/ui/SparkleStar';
import { TransitionLink } from '../components/ui/TransitionLink';
import { SITE } from '../data/site';
import { gsap, splitWordsOnly } from '../lib/gsap';

const VALUES = [
  {
    number: '01',
    title: 'Patience Over Speed',
    copy: 'Rushing past emblems, window borders, and seat tracks defeats the point of detailing. Each panel gets proper dwell and wipe time.',
    icon: Eye,
  },
  {
    number: '02',
    title: 'Honest Guidance',
    copy: 'Clear recommendations tailored to what your paint and interior actually need, with straightforward free quotes.',
    icon: CheckCircle2,
  },
  {
    number: '03',
    title: 'Clean Microfiber Discipline',
    copy: 'Separate wash mitts, wheel brushes, and folded royal-blue microfiber towels prevent cross-contamination between grit and gloss.',
    icon: Sparkles,
  },
  {
    number: '04',
    title: 'Direct Owner Accountability',
    copy: 'When you drop off your keys in Loveland, Travi G inspects the finished vehicle personally before handing it back.',
    icon: MessageSquare,
  },
];

const DETAIL_DAY = [
  {
    phase: 'Morning Arrival',
    title: 'Walkaround & Light Check',
    copy: 'We review your goals together, note stubborn road tar or cabin focus areas, and inspect clear coat under focused light.',
    image: '/images/detail-paint-inspection.jpg',
    imageAlt: 'LED detailing lamp inspecting gloss black paint',
  },
  {
    phase: 'Wet Bay',
    title: 'Foam Pre-Soak & Hand Wash',
    copy: 'Pressure rinsing and snow foam soften road film while brushes clean wheels and barrels safely before paint mitts touch the car.',
    image: '/images/detail-foam-cannon.jpg',
    imageAlt: 'Snow foam coating a dark sedan in a detailing bay',
  },
  {
    phase: 'Cabin & Polish',
    title: 'Interior Reset & Refinement',
    copy: 'Vents, tracks, leather, and glass are refreshed with clean towels, or dual-action polishers refine hazy clear coat panel by panel.',
    image: '/images/detail-interior-vacuum.jpg',
    imageAlt: 'Vacuuming dark SUV carpet and floor mats',
  },
  {
    phase: 'Final Buff',
    title: 'Protection & Handover',
    copy: 'Protective wax is buffed to liquid depth, jambs and tires are dressed, and every reflection is verified before pickup.',
    image: '/images/detail-microfiber-buff.jpg',
    imageAlt: 'Folded blue microfiber towels buffing dark hood',
  },
];

const STUDIO_TOOLS = [
  {
    number: '01',
    title: 'Pressure & Foam Prep',
    detail:
      'High-pressure rinsing and rich foam baths loosen grit and road film safely before any wash mitt touches your paint.',
    icon: Droplets,
  },
  {
    number: '02',
    title: 'Dual-Action Polisher',
    detail:
      'Calibrated dual-action machine polishing refines light haze and surface swirls for crisp, distortion-free reflections.',
    icon: Disc3,
  },
  {
    number: '03',
    title: 'Microfiber & Sprays',
    detail:
      'Clean folded microfiber towels and surface-safe sprays care for leather, vents, switches, glass, and delicate trim.',
    icon: Sparkles,
  },
  {
    number: '04',
    title: 'Protective Wax Finish',
    detail:
      'Hand-buffed wax protection seals in deep gloss and leaves a slick surface that beads water cleanly.',
    icon: ShieldCheck,
  },
];

export function AboutPage() {
  const storyImgRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imgWrap = storyImgRef.current;
    const statementEl = statementRef.current;
    const toolsEl = toolsRef.current;
    if (!imgWrap || !statementEl || !toolsEl) return;

    const splitter = splitWordsOnly(statementEl);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        imgWrap,
        { y: 20, opacity: 0.25 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imgWrap,
            start: 'top 82%',
            once: true,
          },
        }
      );

      gsap.set(splitter.words, { color: 'rgba(255,255,255,0.24)' });
      gsap.to(splitter.words, {
        color: '#FFFFFF',
        stagger: 0.07,
        ease: 'none',
        scrollTrigger: {
          trigger: statementEl,
          start: 'top 82%',
          end: 'bottom 48%',
          scrub: 0.4,
        },
      });

      const cards = toolsEl.querySelectorAll('[data-tool-card]');
      gsap.fromTo(
        cards,
        { y: 24, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: toolsEl,
            start: 'top 84%',
            once: true,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      gsap.set(imgWrap, { clipPath: 'inset(0 0 0% 0)', scale: 1, opacity: 1 });
      gsap.set(splitter.words, { color: '#FFFFFF' });
      const cards = toolsEl.querySelectorAll('[data-tool-card]');
      gsap.set(cards, { y: 0, opacity: 1 });
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
        sectionNumber="03"
        title="About The Studio"
        subtitle={`Detail-obsessed automotive care in ${SITE.city}, led by ${SITE.owner}. Honest hand-finished work with zero shortcuts.`}
        image="/images/service-polish.jpg"
        imageAlt="Dual-action machine polisher refining gloss black paint"
        breadcrumb={[{ label: 'About' }]}
      />

      {/* 1. Owner & Craft Story */}
      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 min-w-0">
            <div ref={storyImgRef} className="relative border border-white/15 bg-[#0B0D14]">
              <SmartImage
                src="/images/gallery-04.webp"
                alt="Travi G holding a microfiber towel beside a mirror-like reflection on black paint"
                aspect="4/3"
                refreshOnLoad
              />
              <div className="absolute bottom-4 left-4 px-3.5 py-1.5 bg-[#05060A]/90 border border-white/15 font-mono text-xs uppercase tracking-[0.16em] text-white">
                {SITE.owner} · {SITE.city}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">01</span>
              <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                Hand-Finished Craft
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-silver-static leading-[1.0]">
              Every Panel Matters
            </h2>

            <p className="mt-5 text-base text-[#D0D5DD] leading-relaxed">
              {SITE.company} was built around patience, clean tools, and the pride of stepping back to a true mirror reflection. Whether a daily commuter needs a deep interior reset or a dark sports coupe needs dual-action refinement, every vehicle receives careful hands-on attention.
            </p>
            <p className="mt-4 text-base text-[#A9B0B8] leading-relaxed">
              Led personally by {SITE.owner} in {SITE.city}, we check trim edges, door jambs, glass clarity, and clear coat reflections under direct light—making sure you drive away confident in the finish.
            </p>

            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
              {SITE.trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-2.5 text-sm text-white">
                  <SparkleStar size={12} variant="blue" twinkle={false} />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <TransitionLink
                to="/work"
                className="btn-slide-fill inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#1F6BFF] border border-[#1F6BFF] text-white text-xs font-semibold uppercase tracking-[0.14em]"
              >
                <span>See Recent Work</span>
                <ArrowRight className="w-4 h-4" />
              </TransitionLink>
              <TransitionLink
                to="/process"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-white/20 bg-[#0B0D14] hover:border-[#4D9BFF] text-white text-xs font-mono uppercase tracking-[0.14em] transition-colors"
              >
                <span>How We Detail</span>
              </TransitionLink>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Big-Type Scrubbed Statement */}
      <section className="bg-[#080A10] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
            Our Standard
          </span>
          <p
            ref={statementRef}
            className="mt-5 font-display text-2xl sm:text-4xl lg:text-[2.75rem] font-extrabold uppercase leading-[1.14] text-white max-w-5xl"
          >
            We never treat a vehicle like a number in a wash tunnel—good detailing takes clean water, fresh towels, and genuine care.
          </p>
        </div>
      </section>

      {/* 3. 4 Core Values */}
      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
              02 · Principles
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
              Four Studio Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.number}
                  className="p-6 sm:p-7 border border-white/12 bg-[#0B0D14] flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                      {val.number}
                    </span>
                    <Icon className="w-4 h-4 text-[#4D9BFF]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase text-white">
                      {val.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#A9B0B8] leading-relaxed">
                      {val.copy}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. How a Detail Day Works */}
      <section className="bg-[#080A10] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
              03 · Workflow
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
              How A Detail Day Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DETAIL_DAY.map((stage) => (
              <article
                key={stage.phase}
                className="border border-white/12 bg-[#0B0D14] overflow-hidden flex flex-col"
              >
                <SmartImage src={stage.image} alt={stage.imageAlt} aspect="4/3" refreshOnLoad />
                <div className="p-6 flex-1 flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#4D9BFF]">
                    {stage.phase}
                  </span>
                  <h3 className="font-display text-lg font-bold uppercase text-white">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-[#A9B0B8] leading-relaxed">{stage.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Equipment Built Into The Shield */}
      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">04</span>
              <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                Tools Of The Craft
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-silver-static">
              Built Into The Shield
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A9B0B8]">
              Every tool represented in the Exquisite Shine emblem plays a direct role in the finish left on your vehicle.
            </p>
          </div>

          <div
            ref={toolsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {STUDIO_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.number}
                  data-tool-card
                  className="p-6 sm:p-7 border border-white/12 bg-[#0B0D14] flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                        {tool.number}
                      </span>
                      <span className="w-9 h-9 flex items-center justify-center border border-white/12 bg-[#05060A] text-[#4D9BFF]">
                        <Icon className="w-4 h-4" />
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold uppercase text-white">
                      {tool.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#A9B0B8] leading-relaxed">
                      {tool.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
