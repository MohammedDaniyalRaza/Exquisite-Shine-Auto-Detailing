import { useState } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/faq';
import { TransitionLink } from '../ui/TransitionLink';

export function FaqTeaserSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const teaserItems = FAQ_ITEMS.slice(0, 5);

  return (
    <section className="relative bg-[#080A10] py-20 sm:py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Heading */}
          <div className="lg:col-span-5 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">11</span>
              <span className="w-8 h-px bg-[#1F6BFF]" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9B0B8]">
                Common Questions
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-silver-static leading-[0.98]">
              Before You Book
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#A9B0B8] leading-relaxed max-w-md">
              Quick answers about quoting, appointment prep, weather adjustments, and caring for your vehicle finish in Loveland.
            </p>

            <TransitionLink
              to="/faq"
              className="mt-7 inline-flex items-center gap-2.5 px-6 py-3.5 border border-white/20 bg-[#0B0D14] hover:border-[#1F6BFF] text-xs font-mono uppercase tracking-[0.16em] text-white transition-colors"
            >
              <span>View All 10 Questions</span>
              <ArrowRight className="w-4 h-4 text-[#4D9BFF]" />
            </TransitionLink>
          </div>

          {/* Right Accordion (5 questions) */}
          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10 min-w-0">
            {teaserItems.map((item, idx) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="py-1">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full py-5 flex items-start justify-between gap-4 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6BFF]"
                  >
                    <div className="flex items-baseline gap-4 min-w-0">
                      <span className="font-mono text-xs text-[#4D9BFF] tabular-nums shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#4D9BFF] transition-colors">
                        {item.question}
                      </span>
                    </div>
                    <span className="w-8 h-8 flex items-center justify-center border border-white/15 bg-[#0B0D14] text-white shrink-0 mt-0.5">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#4D9BFF]" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-5 pl-8 sm:pl-9 pr-4 text-sm sm:text-base text-[#A9B0B8] leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
