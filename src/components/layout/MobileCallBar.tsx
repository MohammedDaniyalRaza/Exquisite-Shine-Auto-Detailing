import { Phone } from 'lucide-react';
import { SITE } from '../../data/site';
import { TransitionLink } from '../ui/TransitionLink';

export function MobileCallBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[780] lg:hidden bg-[#05060A]/95 backdrop-blur-md border-t border-white/15 px-4 py-2"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-2.5 max-w-lg mx-auto">
        <a
          href={SITE.phoneHref}
          className="flex-1 h-10 inline-flex items-center justify-center gap-2 bg-[#1F6BFF] active:bg-[#4D9BFF] text-white text-xs font-semibold uppercase tracking-[0.12em] whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 shrink-0" />
          <span>Call Now · {SITE.phoneDisplay}</span>
        </a>
        <TransitionLink
          to="/contact"
          className="h-10 px-4 inline-flex items-center justify-center border border-white/20 bg-[#0B0D14] text-white text-xs font-semibold uppercase tracking-[0.12em] whitespace-nowrap shrink-0"
        >
          Quote
        </TransitionLink>
      </div>
    </div>
  );
}
