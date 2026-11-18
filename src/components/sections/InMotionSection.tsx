import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { VIDEOS, VideoItem } from '../../data/videos';
import { gsap } from '../../lib/gsap';
import { VideoCard, VideoModal } from '../ui/SmartVideo';
import { TransitionLink } from '../ui/TransitionLink';

export function InMotionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = grid.querySelectorAll('[data-video-item]');
      gsap.fromTo(
        items,
        { y: 26, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
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
      const items = grid.querySelectorAll('[data-video-item]');
      gsap.set(items, { y: 0, opacity: 1 });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080A10] py-20 sm:py-28 border-b border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">04</span>
              <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                Video Showcase
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-silver-static">
              In Motion
            </h2>
          </div>

          <TransitionLink
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#F4F6F8] hover:text-[#4D9BFF] transition-colors shrink-0"
          >
            <span>See Full Showcase</span>
            <ArrowRight className="w-4 h-4" />
          </TransitionLink>
        </div>

        {/* Equal 3-col row on desktop, smooth scroll-snap swipe carousel on mobile */}
        <div
          ref={gridRef}
          className="flex lg:grid lg:grid-cols-3 gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 lg:pb-0"
        >
          {VIDEOS.map((video) => (
            <div
              key={video.id}
              data-video-item
              className="w-[82vw] sm:w-[58vw] lg:w-auto shrink-0 snap-center flex"
            >
              <VideoCard
                video={video}
                onOpen={setActiveVideo}
                pausedByModal={activeVideo !== null}
                className="w-full"
              />
            </div>
          ))}
        </div>

        <p className="lg:hidden mt-4 text-xs font-mono uppercase tracking-[0.16em] text-[#6B727A]">
          Swipe clips · Tap to play with sound
        </p>
      </div>

      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
