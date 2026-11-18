import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { SERVICES } from '../../data/services';
import { MORE_LINKS, SITE } from '../../data/site';
import { TransitionLink } from '../ui/TransitionLink';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#05060A] border-t border-white/10 pt-16 pb-24 lg:pb-12">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-5 min-w-0">
            <TransitionLink to="/" className="flex items-center gap-3.5 w-fit">
              <img
                src={SITE.logo}
                alt={SITE.company}
                width={56}
                height={56}
                className="w-14 h-14 object-contain shrink-0"
              />
              <div>
                <div className="font-display text-lg font-extrabold uppercase tracking-wider text-white">
                  Exquisite Shine
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A9B0B8]">
                  Auto Detailing
                </div>
              </div>
            </TransitionLink>

            <p className="text-sm text-[#A9B0B8] max-w-sm leading-relaxed">
              Detail-obsessed automotive care in {SITE.city}. Hand-finished exterior washes, deep cabin resets, machine polishing, and protective wax finishes by {SITE.owner}.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#A9B0B8]">
              <span>Hand-finished</span>
              <span aria-hidden="true">·</span>
              <span>Free quotes</span>
              <span aria-hidden="true">·</span>
              <span>Based in {SITE.city}</span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2 min-w-0">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#6B727A] mb-5">
              Explore
            </h2>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Services', to: '/services' },
                { label: 'Our Work', to: '/work' },
                { label: 'About', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <TransitionLink
                    to={link.to}
                    className="text-sm text-[#A9B0B8] hover:text-white transition-colors"
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides & Studio */}
          <div className="lg:col-span-2 min-w-0">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#6B727A] mb-5">
              Studio &amp; Guides
            </h2>
            <ul className="flex flex-col gap-3">
              {MORE_LINKS.map((link) => (
                <li key={link.to}>
                  <TransitionLink
                    to={link.to}
                    className="text-sm text-[#A9B0B8] hover:text-white transition-colors"
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 min-w-0">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#6B727A] mb-5">
              Services
            </h2>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <TransitionLink
                    to={`/services/${service.slug}`}
                    className="group flex items-center gap-2 text-sm text-[#A9B0B8] hover:text-white transition-colors"
                  >
                    <span className="font-mono text-[11px] text-[#4D9BFF] tabular-nums">
                      {service.number}
                    </span>
                    <span className="truncate">{service.shortLabel}</span>
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="lg:col-span-2 min-w-0">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#6B727A] mb-5">
              Contact
            </h2>
            <div className="flex flex-col gap-3.5 text-sm">
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2.5 text-white hover:text-[#4D9BFF] transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#4D9BFF] shrink-0" />
                <span>{SITE.phoneDisplay}</span>
              </a>
              <a
                href={SITE.emailHref}
                className="flex items-center gap-2.5 text-[#A9B0B8] hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#4D9BFF] shrink-0" />
                <span>{SITE.email}</span>
              </a>
              <div className="flex items-center gap-2.5 text-[#A9B0B8]">
                <MapPin className="w-4 h-4 text-[#4D9BFF] shrink-0" />
                <span>{SITE.city}</span>
              </div>
              <div className="pt-1">
                <a
                  href={SITE.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-white/15 bg-[#0B0D14] text-xs font-mono uppercase tracking-[0.14em] text-white hover:border-[#1F6BFF] hover:text-[#4D9BFF] transition-colors"
                >
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6B727A]">
          <p>
            © {year} {SITE.company}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.16em]">
            {SITE.city} · Owner: {SITE.owner}
          </p>
        </div>
      </div>
    </footer>
  );
}
