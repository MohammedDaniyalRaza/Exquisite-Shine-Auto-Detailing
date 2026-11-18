import { ArrowLeft } from 'lucide-react';
import { SparkleStar } from '../components/ui/SparkleStar';
import { TransitionLink } from '../components/ui/TransitionLink';

export function NotFoundPage() {
  return (
    <section className="min-h-[82svh] bg-[#05060A] pt-32 pb-20 flex items-center justify-center relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(31,107,255,0.14),transparent_60%)]"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-5 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <SparkleStar size={18} variant="blue" delay={0.1} />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#A9B0B8]">
            Route Not Found
          </span>
          <SparkleStar size={18} variant="silver" delay={0.6} />
        </div>

        <div className="font-display font-extrabold text-[clamp(4.5rem,18vw,9rem)] leading-none text-outlined-silver select-none">
          404
        </div>

        <h1 className="mt-4 font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-silver-static">
          Wrong Bay
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#A9B0B8] max-w-md mx-auto">
          The page you are looking for is not parked here. Head back to the Exquisite Shine home page.
        </p>

        <TransitionLink
          to="/"
          className="mt-8 btn-slide-fill inline-flex items-center gap-2.5 px-7 py-4 bg-[#1F6BFF] border border-[#1F6BFF] text-white text-xs font-semibold uppercase tracking-[0.14em]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back To Home</span>
        </TransitionLink>
      </div>
    </section>
  );
}
