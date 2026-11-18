import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
import { gsap } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/lenis';
import { SparkleStar } from '../ui/SparkleStar';
import { TransitionLink } from '../ui/TransitionLink';

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const quoteBoxRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const current = TESTIMONIALS[index] || TESTIMONIALS[0];

  const goNext = () => setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const goPrev = () =>
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  // Animate quote fade/slide on index change
  useEffect(() => {
    const box = quoteBoxRef.current;
    if (!box || prefersReducedMotion()) return;

    gsap.fromTo(
      box,
      { y: 14, opacity: 0.25 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
    );
  }, [index]);

  // GSAP animated auto-advance progress bar (pauses on hover & touch)
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    if (paused || prefersReducedMotion()) {
      gsap.killTweensOf(bar);
      return;
    }

    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 5.5,
        ease: 'none',
        onComplete: () => {
          setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [index, paused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = touchStartX.current;
    const endX = e.changedTouches[0]?.clientX ?? null;
    if (startX !== null && endX !== null) {
      const diff = startX - endX;
      if (diff > 45) goNext();
      if (diff < -45) goPrev();
    }
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative bg-[#05060A] py-20 sm:py-28 border-b border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">08</span>
              <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                Local Feedback
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-silver-static">
              Vehicle Owners Say
            </h2>
          </div>

          <TransitionLink
            to="/reviews"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-[#F4F6F8] hover:text-[#4D9BFF] transition-colors shrink-0"
          >
            <span>All Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </TransitionLink>
        </div>

        {/* Featured Quote Card */}
        <div className="border border-white/12 bg-[#0B0D14] p-7 sm:p-12 lg:p-14 relative overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-1.5" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-[#4D9BFF] fill-[#4D9BFF]"
                />
              ))}
            </div>
            <SparkleStar size={18} variant="silver" delay={0.2} />
          </div>

          <div ref={quoteBoxRef} className="min-h-[160px] flex flex-col justify-between">
            <blockquote className="font-display text-xl sm:text-3xl lg:text-4xl font-bold leading-snug text-white max-w-4xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-display font-bold text-white">{current.name}</span>
                <span className="text-[#6B727A]" aria-hidden="true">
                  ·
                </span>
                <span className="text-[#A9B0B8]">{current.vehicle}</span>
                <span className="text-[#6B727A]" aria-hidden="true">
                  ·
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#4D9BFF]">
                  {current.service}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#6B727A] tabular-nums mr-2">
                  {String(index + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous review"
                  className="w-10 h-10 flex items-center justify-center border border-white/15 bg-[#05060A] text-white hover:border-[#1F6BFF] hover:text-[#4D9BFF] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next review"
                  className="w-10 h-10 flex items-center justify-center border border-white/15 bg-[#05060A] text-white hover:border-[#1F6BFF] hover:text-[#4D9BFF] transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="mt-6 w-full h-[2px] bg-white/10 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-[#1F6BFF] to-[#4D9BFF] origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
