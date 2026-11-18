import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { GALLERY_PHOTOS } from '../../data/gallery';
import { gsap } from '../../lib/gsap';
import { Lightbox } from '../ui/Lightbox';
import { SmartImage } from '../ui/SmartImage';
import { TransitionLink } from '../ui/TransitionLink';

export function GalleryStripSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const featuredPhotos = GALLERY_PHOTOS.slice(0, 6);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tiles = grid.querySelectorAll('[data-gallery-tile]');
      gsap.fromTo(
        tiles,
        { y: 24, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      const tiles = grid.querySelectorAll('[data-gallery-tile]');
      gsap.set(tiles, { y: 0, opacity: 1 });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, []);

  return (
    <section className="relative bg-[#05060A] py-20 sm:py-28 border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">05</span>
              <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                Recent Vehicles · Loveland
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-silver-static">
              Gallery
            </h2>
          </div>

          <TransitionLink
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#F4F6F8] hover:text-[#4D9BFF] transition-colors shrink-0"
          >
            <span>Explore Our Work</span>
            <ArrowRight className="w-4 h-4" />
          </TransitionLink>
        </div>

        {/* Equal-size 4:3 tiles */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {featuredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              data-gallery-tile
              data-cursor="view"
              onClick={() => setLightboxIndex(index)}
              className="group relative text-left border border-white/10 bg-[#0B0D14] hover:border-[#1F6BFF]/60 transition-colors overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6BFF]"
            >
              <SmartImage
                src={photo.src}
                alt={photo.alt}
                aspect="4/3"
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
                <span className="font-mono text-xs text-white/70 tabular-nums shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Lightbox
        photos={featuredPhotos}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </section>
  );
}
