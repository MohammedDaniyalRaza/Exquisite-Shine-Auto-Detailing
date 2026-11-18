import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { MORE_LINKS, NAV_LINKS, SITE } from '../../data/site';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { gsap } from '../../lib/gsap';
import { lockScroll, prefersReducedMotion, unlockScroll } from '../../lib/lenis';
import { ServiceIcon } from '../ui/ServiceIcon';
import { TransitionLink } from '../ui/TransitionLink';

export function Navbar() {
  const location = useLocation();
  const { isScrolled, direction } = useScrollDirection(40);
  const [openDropdown, setOpenDropdown] = useState<'services' | 'more' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const servicesWrapRef = useRef<HTMLDivElement>(null);
  const moreWrapRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  // Close menus on route change and guarantee scroll lock release
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
    unlockScroll('mobile-menu');
  }, [location.pathname]);

  // Lock body scroll only while mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      lockScroll('mobile-menu');
    } else {
      unlockScroll('mobile-menu');
    }
    return () => {
      unlockScroll('mobile-menu');
    };
  }, [mobileOpen]);

  // Escape & outside click handling for desktop dropdowns and mobile menu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };

    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (openDropdown === 'services' && servicesWrapRef.current && !servicesWrapRef.current.contains(target)) {
        setOpenDropdown(null);
      }
      if (openDropdown === 'more' && moreWrapRef.current && !moreWrapRef.current.contains(target)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [openDropdown]);

  // GSAP hide on scroll down, show on scroll up (never hide when mobile menu or dropdown open)
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const shouldHide =
      isScrolled && direction === 'down' && !mobileOpen && openDropdown === null;

    if (prefersReducedMotion()) {
      gsap.set(el, { yPercent: shouldHide ? -100 : 0 });
      return;
    }

    gsap.to(el, {
      yPercent: shouldHide ? -100 : 0,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: true,
    });
  }, [isScrolled, direction, mobileOpen, openDropdown]);

  const clearHoverTimers = () => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleMouseEnter = (type: 'services' | 'more') => {
    clearHoverTimers();
    openTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(type);
    }, 110);
  };

  const handleMouseLeave = () => {
    clearHoverTimers();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
    }, 130);
  };

  const isRouteActive = (to: string, dropdownType?: 'services' | 'more') => {
    if (dropdownType === 'more') {
      return MORE_LINKS.some((m) => location.pathname === m.to);
    }
    if (to === '/') return location.pathname === '/';
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[800] transition-colors duration-300 ${
          isScrolled || mobileOpen
            ? 'bg-[#05060A]/95 backdrop-blur-md border-b border-white/10'
            : 'bg-gradient-to-b from-[#05060A]/85 via-[#05060A]/40 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Logo + Brand Wordmark */}
          <TransitionLink
            to="/"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6BFF]"
            aria-label={SITE.company}
          >
            <img
              src={SITE.logo}
              alt="Exquisite Shine Auto Detailing logo"
              width={44}
              height={44}
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain shrink-0"
            />
            <span className="font-display text-sm sm:text-base font-extrabold tracking-wider uppercase text-white whitespace-nowrap shrink-0">
              Exquisite Shine
            </span>
          </TransitionLink>

          {/* Zone 2: Desktop Nav Links (lg and up) */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-7"
          >
            {NAV_LINKS.map((item) => {
              const active = isRouteActive(item.to, item.dropdownType);

              if (item.dropdownType === 'services') {
                const isOpen = openDropdown === 'services';
                return (
                  <div
                    key={item.label}
                    ref={servicesWrapRef}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter('services')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center gap-1">
                      <TransitionLink
                        to={item.to}
                        data-active={active ? 'true' : 'false'}
                        className={`link-underline text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                          active ? 'text-white' : 'text-[#A9B0B8] hover:text-white'
                        }`}
                      >
                        {item.label}
                      </TransitionLink>
                      <button
                        type="button"
                        aria-label="Toggle services menu"
                        aria-expanded={isOpen}
                        onClick={() => setOpenDropdown(isOpen ? null : 'services')}
                        onFocus={() => setOpenDropdown('services')}
                        className="p-1 text-[#A9B0B8] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6BFF]"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#4D9BFF]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {isOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[520px] max-w-[90vw] z-[820]">
                        <div
                          aria-hidden="true"
                          className="absolute -top-3 left-0 right-0 h-6 bg-transparent"
                        />
                        <div className="bg-[#0B0D14] border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.85)] p-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {SERVICES.map((service) => (
                              <TransitionLink
                                key={service.slug}
                                to={`/services/${service.slug}`}
                                onAfterClick={() => setOpenDropdown(null)}
                                className="group flex items-start gap-3 p-3 border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-colors"
                              >
                                <span className="w-8 h-8 flex items-center justify-center border border-white/10 bg-[#05060A] text-[#4D9BFF] shrink-0 group-hover:border-[#1F6BFF]">
                                  <ServiceIcon name={service.iconName} className="w-4 h-4" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block font-display text-sm font-bold text-white group-hover:text-[#4D9BFF] transition-colors truncate">
                                    {service.title}
                                  </span>
                                  <span className="block text-xs text-[#A9B0B8] line-clamp-1 mt-0.5">
                                    {service.tagline}
                                  </span>
                                </span>
                              </TransitionLink>
                            ))}
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-4">
                            <TransitionLink
                              to="/services"
                              onAfterClick={() => setOpenDropdown(null)}
                              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.16em] text-white hover:text-[#4D9BFF] transition-colors whitespace-nowrap"
                            >
                              <span>View All Services</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </TransitionLink>
                            <a
                              href={SITE.phoneHref}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1F6BFF] hover:bg-[#4D9BFF] text-white text-xs font-medium transition-colors whitespace-nowrap"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call {SITE.phoneDisplay}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if (item.dropdownType === 'more') {
                const isOpen = openDropdown === 'more';
                return (
                  <div
                    key={item.label}
                    ref={moreWrapRef}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter('more')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenDropdown(isOpen ? null : 'more')}
                      onFocus={() => setOpenDropdown('more')}
                      className={`inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6BFF] ${
                        active ? 'text-white' : 'text-[#A9B0B8] hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#4D9BFF]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="absolute right-0 top-full pt-4 w-[320px] max-w-[90vw] z-[820]">
                        <div
                          aria-hidden="true"
                          className="absolute -top-3 left-0 right-0 h-6 bg-transparent"
                        />
                        <div className="bg-[#0B0D14] border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.85)] p-3 flex flex-col gap-1">
                          {MORE_LINKS.map((extra) => (
                            <TransitionLink
                              key={extra.to}
                              to={extra.to}
                              onAfterClick={() => setOpenDropdown(null)}
                              className="group p-3 border border-transparent hover:border-white/10 hover:bg-white/[0.03] transition-colors flex items-start justify-between gap-3"
                            >
                              <div className="min-w-0">
                                <div className="font-display text-sm font-bold text-white group-hover:text-[#4D9BFF] transition-colors">
                                  {extra.label}
                                </div>
                                <div className="text-xs text-[#A9B0B8] mt-0.5">
                                  {extra.description}
                                </div>
                              </div>
                              <ArrowUpRight className="w-3.5 h-3.5 text-[#6B727A] group-hover:text-[#4D9BFF] shrink-0 mt-1" />
                            </TransitionLink>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <TransitionLink
                  key={item.to}
                  to={item.to}
                  data-active={active ? 'true' : 'false'}
                  className={`link-underline text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    active ? 'text-white' : 'text-[#A9B0B8] hover:text-white'
                  }`}
                >
                  {item.label}
                </TransitionLink>
              );
            })}
          </nav>

          {/* Zone 3: Desktop CTAs (lg+) OR Mobile Hamburger (< lg) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={SITE.phoneHref}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-[0.12em] text-[#F4F6F8] border border-white/15 hover:border-[#4D9BFF] hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[#4D9BFF]" />
              <span>Call</span>
            </a>
            <TransitionLink
              to="/contact"
              className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] bg-[#1F6BFF] hover:bg-[#4D9BFF] text-white transition-colors whitespace-nowrap shrink-0"
            >
              Get Quote
            </TransitionLink>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="lg:hidden w-11 h-11 flex items-center justify-center border border-white/15 bg-[#0B0D14] text-white hover:border-[#1F6BFF] transition-colors shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Solid Mobile Menu (< lg) */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[900] lg:hidden bg-[#05060A] text-white flex flex-col overflow-y-auto"
        >
          <div className="px-5 h-20 flex items-center justify-between border-b border-white/10 shrink-0">
            <TransitionLink
              to="/"
              onAfterClick={() => setMobileOpen(false)}
              className="flex items-center gap-3"
            >
              <img
                src={SITE.logo}
                alt={SITE.company}
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <span className="font-display text-sm font-extrabold uppercase tracking-wider text-white whitespace-nowrap">
                Exquisite Shine
              </span>
            </TransitionLink>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="w-11 h-11 flex items-center justify-center border border-white/15 bg-[#0B0D14] text-white hover:border-[#1F6BFF]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-5 py-6 flex flex-col gap-2">
            {[
              { label: 'Home', to: '/' },
              { label: 'Services', to: '/services', isServices: true },
              { label: 'Our Work', to: '/work' },
              { label: 'How We Detail', to: '/process' },
              { label: 'Reviews', to: '/reviews' },
              { label: 'Care Tips', to: '/care-tips' },
              { label: 'About', to: '/about' },
              { label: 'FAQ', to: '/faq' },
              { label: 'Contact', to: '/contact' },
            ].map((item, idx) => {
              const active = isRouteActive(item.to);
              return (
                <div key={item.to} className="border-b border-white/10 pb-2">
                  <TransitionLink
                    to={item.to}
                    onAfterClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between py-2 font-display text-xl font-bold uppercase tracking-tight ${
                      active ? 'text-[#4D9BFF]' : 'text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-[#6B727A] tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </TransitionLink>

                  {item.isServices && (
                    <div className="grid grid-cols-1 gap-1 pl-3 pb-2 pt-1">
                      {SERVICES.map((service) => (
                        <TransitionLink
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          onAfterClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 py-1 text-sm text-[#A9B0B8] hover:text-white"
                        >
                          <span className="font-mono text-[11px] text-[#4D9BFF] tabular-nums">
                            {service.number}
                          </span>
                          <span>{service.title}</span>
                        </TransitionLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="px-5 py-6 pb-20 border-t border-white/10 bg-[#0B0D14] flex flex-col gap-3 shrink-0">
            <TransitionLink
              to="/contact"
              onAfterClick={() => setMobileOpen(false)}
              className="w-full py-3.5 text-center font-semibold uppercase tracking-[0.14em] text-sm bg-[#1F6BFF] text-white"
            >
              Request a Free Quote
            </TransitionLink>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#A9B0B8] pt-1">
              <a href={SITE.phoneHref} className="hover:text-white">
                {SITE.phoneDisplay}
              </a>
              <a href={SITE.emailHref} className="hover:text-white">
                {SITE.email}
              </a>
              <span>{SITE.city}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
