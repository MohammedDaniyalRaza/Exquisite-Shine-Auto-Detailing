import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink, Star } from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { CtaBand } from '../components/sections/CtaBand';
import { Lightbox } from '../components/ui/Lightbox';
import { SmartImage } from '../components/ui/SmartImage';
import { VideoCard, VideoModal } from '../components/ui/SmartVideo';
import { SparkleStar } from '../components/ui/SparkleStar';
import { TransitionLink } from '../components/ui/TransitionLink';
import { GALLERY_PHOTOS } from '../data/gallery';
import { SITE } from '../data/site';
import { TESTIMONIALS } from '../data/testimonials';
import { VIDEOS, VideoItem } from '../data/videos';
import { gsap, splitWordsOnly } from '../lib/gsap';

const FINISH_CHECKS = [
  {
    number: '01',
    title: 'Wheels & Barrels',
    copy: 'Lug nut pockets, spokes, calipers, and tires cleaned before paint mitts touch a single panel.',
  },
  {
    number: '02',
    title: 'Direct Sun Clarity',
    copy: 'Hoods, fenders, and doors inspected under natural daylight and handheld studio lamps.',
  },
  {
    number: '03',
    title: 'Trim & Door Jambs',
    copy: 'Sill plates, hinge edges, grille slats, and mirror housings hand-dried clean without drips.',
  },
  {
    number: '04',
    title: 'Glass & Cabin Touchpoints',
    copy: 'Interior windshields, screens, steering wheels, and leather finished dry and streak-free.',
  },
];

export function WorkPage() {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const videoGridRef = useRef<HTMLDivElement>(null);
  const photoGridRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const statementEl = statementRef.current;
    const vGrid = videoGridRef.current;
    const pGrid = photoGridRef.current;
    if (!vGrid || !pGrid) return;

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

      const vItems = vGrid.querySelectorAll('[data-work-video]');
      gsap.fromTo(
        vItems,
        { y: 26, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: vGrid,
            start: 'top 85%',
            once: true,
          },
        }
      );

      const pItems = pGrid.querySelectorAll('[data-work-photo]');
      gsap.fromTo(
        pItems,
        { y: 26, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pGrid,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      if (splitter) gsap.set(splitter.words, { color: '#FFFFFF' });
      const all = document.querySelectorAll('[data-work-video], [data-work-photo]');
      gsap.set(all, { y: 0, opacity: 1 });
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
        sectionNumber="02"
        title="Our Work"
        subtitle={`Real vehicles detailed in ${SITE.city} — walkaround clips and outdoor reflections from recent washes, paint refinements, and wax finishes.`}
        image="/images/gallery-05.webp"
        imageAlt="Detailed black coupe under dusk sky"
        breadcrumb={[{ label: 'Our Work' }]}
      />

      {/* Band 2: Real Finishes Statement */}
      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">01</span>
            <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
              Unfiltered Finishes · {SITE.city}
            </span>
          </div>
          <p
            ref={statementRef}
            className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-[1.12] max-w-5xl text-white"
          >
            Every photo and walkaround clip on this page is real work finished in {SITE.city}—checked in bright sky and dusk reflections alike.
          </p>
        </div>
      </section>

      {/* Band 3: Video Showcase */}
      <section className="bg-[#080A10] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">02</span>
                <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                  In Motion
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-silver-static">
                Walkaround Clips
              </h2>
            </div>
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#A9B0B8]">
              Click any clip to watch with sound
            </p>
          </div>

          <div
            ref={videoGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {VIDEOS.map((video) => (
              <div key={video.id} data-work-video className="flex">
                <VideoCard
                  video={video}
                  onOpen={setActiveVideo}
                  pausedByModal={activeVideo !== null}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 4: Client Photos Only + Facebook Tile */}
      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">03</span>
                <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                  Photo Gallery · {GALLERY_PHOTOS.length} Shots
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-silver-static">
                Finished Vehicles
              </h2>
            </div>
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#A9B0B8]">
              Click any photo to enlarge
            </p>
          </div>

          <div
            ref={photoGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {GALLERY_PHOTOS.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                data-work-photo
                data-cursor="view"
                onClick={() => setLightboxIndex(index)}
                className="group relative border border-white/12 bg-[#0B0D14] hover:border-[#1F6BFF]/70 transition-colors overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6BFF]"
              >
                <SmartImage
                  src={photo.src}
                  alt={photo.alt}
                  aspect="4/3"
                  refreshOnLoad
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#05060A]/85 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 pointer-events-none">
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#4D9BFF]">
                      {photo.category}
                    </div>
                    <div className="font-display text-base font-bold text-white truncate">
                      {photo.title}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-white/75 tabular-nums shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </button>
            ))}

            {/* Equal-size 9th tile: See more on Facebook */}
            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-work-photo
              className="group relative aspect-[4/3] border border-[#1F6BFF]/40 bg-gradient-to-br from-[#0B1224] via-[#0B0D14] to-[#05060A] hover:border-[#4D9BFF] transition-colors p-6 flex flex-col justify-between overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#4D9BFF]">
                  09 · More Photos
                </span>
                <SparkleStar size={18} variant="blue" delay={0.3} />
              </div>

              <div>
                <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white group-hover:text-[#4D9BFF] transition-colors">
                  See More On Facebook
                </h3>
                <p className="mt-2 text-sm text-[#A9B0B8]">
                  Follow recent vehicles, updates, and detailing clips directly on our Facebook page.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white">
                <span>Open Facebook Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#4D9BFF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Band 5: What Every Finished Vehicle Gets Checked For */}
      <section className="bg-[#080A10] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
              04 · Inspection Standards
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
              Checked Before Pickup
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FINISH_CHECKS.map((item) => (
              <div
                key={item.number}
                className="p-6 border border-white/12 bg-[#0B0D14] flex flex-col justify-between gap-4"
              >
                <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#A9B0B8] leading-relaxed">
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 6: Client Feedback Teaser */}
      <section className="bg-[#05060A] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                05 · Local Drivers
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
                Client Reviews
              </h2>
            </div>

            <TransitionLink
              to="/reviews"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white hover:text-[#4D9BFF] transition-colors"
            >
              <span>Read All Reviews</span>
              <ArrowRight className="w-4 h-4 text-[#4D9BFF]" />
            </TransitionLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((item) => (
              <article
                key={item.id}
                className="p-6 sm:p-7 border border-white/12 bg-[#0B0D14] flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4" aria-label="5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-[#4D9BFF] fill-[#4D9BFF]"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#D0D5DD] leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 text-xs text-[#A9B0B8]">
                  <span className="font-display font-bold text-white block text-sm">
                    {item.name}
                  </span>
                  <span>
                    {item.vehicle} · <span className="text-[#4D9BFF]">{item.service}</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      <Lightbox
        photos={GALLERY_PHOTOS}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />

      <CtaBand />
    </>
  );
}
