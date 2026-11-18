import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { PageHero } from '../components/layout/PageHero';
import { SparkleStar } from '../components/ui/SparkleStar';
import { TransitionLink } from '../components/ui/TransitionLink';
import { FAQ_ITEMS } from '../data/faq';
import { BEFORE_YOU_BOOK } from '../data/process';
import { SERVICE_MATCHER } from '../data/services';
import { SITE } from '../data/site';
import { gsap } from '../lib/gsap';
import { buildMailtoQuoteHref } from '../lib/smartMedia';

const SERVICE_OPTIONS = [
  'Exterior Wash & Detail',
  'Interior Detail',
  'Machine Polishing',
  'Wax & Protection',
  'Not sure',
] as const;

interface FormValues {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  preferredDate: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get('service') || '';

  const [values, setValues] = useState<FormValues>({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    service: SERVICE_OPTIONS.includes(preselected as (typeof SERVICE_OPTIONS)[number])
      ? preselected
      : '',
    preferredDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };

    document.addEventListener('mousedown', onOutside);
    window.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      window.removeEventListener('keydown', onEscape);
    };
  }, []);

  useEffect(() => {
    const root = layoutRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cols = root.querySelectorAll('[data-contact-col]');
      gsap.fromTo(
        cols,
        { y: 24, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    const failsafe = window.setTimeout(() => {
      const cols = root.querySelectorAll('[data-contact-col]');
      gsap.set(cols, { y: 0, opacity: 1 });
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      mm.revert();
    };
  }, []);

  const updateField = (field: keyof FormValues, val: string) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) {
      next.name = 'Please enter your name.';
    }
    if (!values.phone.trim() || values.phone.replace(/\D/g, '').length < 7) {
      next.phone = 'Please enter a valid phone number.';
    }
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!values.vehicle.trim()) {
      next.vehicle = 'Please include your vehicle year, make, and model.';
    }
    if (!values.service) {
      next.service = 'Please select a service option.';
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const mailtoHref = buildMailtoQuoteHref({
    email: SITE.email,
    name: values.name,
    phone: values.phone,
    vehicle: values.vehicle,
    service: values.service,
    preferredDate: values.preferredDate,
    message: values.message,
  });

  return (
    <>
      <PageHero
        sectionNumber="05"
        title="Contact & Free Quotes"
        subtitle={`Reach out to ${SITE.owner} in ${SITE.city} by phone, email, or the quote form below.`}
        image="/images/service-wax.jpg"
        imageAlt="Water beading on glossy dark automotive paint"
        breadcrumb={[{ label: 'Contact' }]}
      />

      <section className="bg-[#05060A] py-16 sm:py-24 border-b border-white/10">
        <div
          ref={layoutRef}
          className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          {/* Left Column: Direct Info */}
          <div data-contact-col className="lg:col-span-5 min-w-0 flex flex-col gap-6">
            <div className="p-6 sm:p-8 border border-white/12 bg-[#0B0D14]">
              <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <img
                    src={SITE.logo}
                    alt={SITE.company}
                    width={52}
                    height={52}
                    className="w-13 h-13 object-contain shrink-0"
                  />
                  <div>
                    <div className="font-display text-base font-extrabold uppercase text-white">
                      {SITE.company}
                    </div>
                    <div className="font-mono text-xs text-[#4D9BFF]">
                      Owner: {SITE.owner}
                    </div>
                  </div>
                </div>
                <SparkleStar size={18} variant="blue" delay={0.2} />
              </div>

              <div className="py-6 space-y-5 border-b border-white/10">
                <a
                  href={SITE.phoneHref}
                  className="group flex items-start gap-4 text-white hover:text-[#4D9BFF] transition-colors"
                >
                  <span className="w-10 h-10 flex items-center justify-center border border-white/15 bg-[#05060A] text-[#4D9BFF] shrink-0 group-hover:border-[#1F6BFF]">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B727A]">
                      Phone / Text
                    </div>
                    <div className="text-lg font-semibold mt-0.5">{SITE.phoneDisplay}</div>
                  </div>
                </a>

                <a
                  href={SITE.emailHref}
                  className="group flex items-start gap-4 text-white hover:text-[#4D9BFF] transition-colors"
                >
                  <span className="w-10 h-10 flex items-center justify-center border border-white/15 bg-[#05060A] text-[#4D9BFF] shrink-0 group-hover:border-[#1F6BFF]">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B727A]">
                      Email
                    </div>
                    <div className="text-base font-medium mt-0.5 break-all">{SITE.email}</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 text-white">
                  <span className="w-10 h-10 flex items-center justify-center border border-white/15 bg-[#05060A] text-[#4D9BFF] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6B727A]">
                      Location
                    </div>
                    <div className="text-base font-medium mt-0.5">{SITE.city}</div>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-col gap-4">
                <div className="p-4 border border-[#1F6BFF]/30 bg-[#1F6BFF]/[0.07]">
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-[#4D9BFF]">
                    Free Quotes
                  </div>
                  <p className="mt-1 text-sm text-[#D0D5DD]">
                    Every quote is free with zero obligation. Share your vehicle details and what kind of finish you are looking for.
                  </p>
                </div>

                <a
                  href={SITE.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 border border-white/20 bg-[#05060A] hover:border-[#1F6BFF] text-white text-xs font-mono uppercase tracking-[0.16em] transition-colors"
                >
                  <span>Visit Facebook Page</span>
                  <ExternalLink className="w-4 h-4 text-[#4D9BFF]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div id="quote-form" data-contact-col className="lg:col-span-7 min-w-0">
            <div className="p-6 sm:p-10 border border-white/12 bg-[#0B0D14]">
              <div className="mb-8 pb-5 border-b border-white/10">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                  Request A Free Quote
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold uppercase text-white">
                  Tell Us About Your Vehicle
                </h2>
              </div>

              {submitted ? (
                <div className="py-10 px-6 border border-[#1F6BFF]/50 bg-[#05060A] text-center flex flex-col items-center gap-4">
                  <CheckCircle2 className="w-12 h-12 text-[#4D9BFF]" />
                  <h3 className="font-display text-2xl font-bold uppercase text-white">
                    Quote Request Prepared
                  </h3>
                  <p className="text-sm sm:text-base text-[#A9B0B8] max-w-md leading-relaxed">
                    Thank you, {values.name}. Your details for your{' '}
                    <span className="text-white font-medium">{values.vehicle}</span> ({values.service}) are ready. You can also send this directly via your email app or call {SITE.phoneDisplay} right away.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1F6BFF] hover:bg-[#4D9BFF] text-white text-xs font-semibold uppercase tracking-[0.14em] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open In Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3.5 border border-white/20 text-xs font-mono uppercase tracking-[0.14em] text-[#A9B0B8] hover:text-white transition-colors"
                    >
                      Edit Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="q-name"
                        className="block font-mono text-xs uppercase tracking-[0.16em] text-[#A9B0B8] mb-2"
                      >
                        Name *
                      </label>
                      <input
                        id="q-name"
                        type="text"
                        value={values.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Your full name"
                        className={`w-full h-12 px-4 bg-[#05060A] border text-white placeholder:text-[#6B727A] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6BFF] ${
                          errors.name ? 'border-red-400' : 'border-white/15'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="q-phone"
                        className="block font-mono text-xs uppercase tracking-[0.16em] text-[#A9B0B8] mb-2"
                      >
                        Phone *
                      </label>
                      <input
                        id="q-phone"
                        type="tel"
                        value={values.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="(970) 000-0000"
                        className={`w-full h-12 px-4 bg-[#05060A] border text-white placeholder:text-[#6B727A] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6BFF] ${
                          errors.phone ? 'border-red-400' : 'border-white/15'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="q-email"
                        className="block font-mono text-xs uppercase tracking-[0.16em] text-[#A9B0B8] mb-2"
                      >
                        Email *
                      </label>
                      <input
                        id="q-email"
                        type="email"
                        value={values.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="you@example.com"
                        className={`w-full h-12 px-4 bg-[#05060A] border text-white placeholder:text-[#6B727A] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6BFF] ${
                          errors.email ? 'border-red-400' : 'border-white/15'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Vehicle */}
                    <div>
                      <label
                        htmlFor="q-vehicle"
                        className="block font-mono text-xs uppercase tracking-[0.16em] text-[#A9B0B8] mb-2"
                      >
                        Vehicle (Year / Make / Model) *
                      </label>
                      <input
                        id="q-vehicle"
                        type="text"
                        value={values.vehicle}
                        onChange={(e) => updateField('vehicle', e.target.value)}
                        placeholder="e.g. 2024 Dodge Charger"
                        className={`w-full h-12 px-4 bg-[#05060A] border text-white placeholder:text-[#6B727A] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6BFF] ${
                          errors.vehicle ? 'border-red-400' : 'border-white/15'
                        }`}
                      />
                      {errors.vehicle && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.vehicle}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Custom Styled Service Dropdown (NOT native select) */}
                    <div ref={dropdownRef} className="relative">
                      <span
                        id="q-service-label"
                        className="block font-mono text-xs uppercase tracking-[0.16em] text-[#A9B0B8] mb-2"
                      >
                        Service *
                      </span>
                      <button
                        type="button"
                        aria-labelledby="q-service-label"
                        aria-expanded={dropdownOpen}
                        aria-haspopup="listbox"
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className={`w-full h-12 px-4 bg-[#05060A] border text-left text-sm flex items-center justify-between gap-2 focus:outline-none focus:ring-2 focus:ring-[#1F6BFF] ${
                          errors.service ? 'border-red-400' : 'border-white/15'
                        }`}
                      >
                        <span className={values.service ? 'text-white' : 'text-[#6B727A]'}>
                          {values.service || 'Select a service'}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#A9B0B8] transition-transform ${
                            dropdownOpen ? 'rotate-180 text-[#4D9BFF]' : ''
                          }`}
                        />
                      </button>

                      {dropdownOpen && (
                        <ul
                          role="listbox"
                          aria-labelledby="q-service-label"
                          className="absolute left-0 right-0 top-full mt-1 z-30 bg-[#05060A] border border-white/20 shadow-[0_18px_40px_rgba(0,0,0,0.85)] divide-y divide-white/10"
                        >
                          {SERVICE_OPTIONS.map((option) => {
                            const selected = values.service === option;
                            return (
                              <li key={option} role="option" aria-selected={selected}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    updateField('service', option);
                                    setDropdownOpen(false);
                                  }}
                                  className={`w-full px-4 py-3 text-left text-sm flex items-center justify-between gap-2 transition-colors ${
                                    selected
                                      ? 'bg-[#1F6BFF]/20 text-white'
                                      : 'text-[#D0D5DD] hover:bg-white/[0.05] hover:text-white'
                                  }`}
                                >
                                  <span>{option}</span>
                                  {selected && <Check className="w-4 h-4 text-[#4D9BFF]" />}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {errors.service && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.service}</span>
                        </p>
                      )}
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label
                        htmlFor="q-date"
                        className="block font-mono text-xs uppercase tracking-[0.16em] text-[#A9B0B8] mb-2"
                      >
                        Preferred Date
                      </label>
                      <input
                        id="q-date"
                        type="date"
                        value={values.preferredDate}
                        onChange={(e) => updateField('preferredDate', e.target.value)}
                        className="w-full h-12 px-4 bg-[#05060A] border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6BFF] [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="q-message"
                      className="block font-mono text-xs uppercase tracking-[0.16em] text-[#A9B0B8] mb-2"
                    >
                      Message / Vehicle Condition Notes
                    </label>
                    <textarea
                      id="q-message"
                      rows={4}
                      value={values.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder="Let us know what areas you want focused on (exterior wash, cabin refresh, swirls, wax, etc.)."
                      className="w-full p-4 bg-[#05060A] border border-white/15 text-white placeholder:text-[#6B727A] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6BFF] resize-y"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                    <button
                      type="submit"
                      className="btn-slide-fill inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#1F6BFF] border border-[#1F6BFF] text-white text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Quote Request</span>
                    </button>

                    <a
                      href={mailtoHref}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/20 bg-[#05060A] hover:border-[#4D9BFF] text-white text-xs font-mono uppercase tracking-[0.14em] transition-colors whitespace-nowrap"
                    >
                      <Mail className="w-4 h-4 text-[#4D9BFF]" />
                      <span>Send by email instead</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Band 3: Quick Service Matcher (Pre-selects Service in Form) */}
      <section className="bg-[#080A10] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                02 · Pick A Starting Point
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
                Not Sure What To Select?
              </h2>
            </div>
            <TransitionLink
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white hover:text-[#4D9BFF] transition-colors"
            >
              <span>Compare All Services</span>
              <ArrowRight className="w-4 h-4 text-[#4D9BFF]" />
            </TransitionLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICE_MATCHER.map((item) => (
              <div
                key={item.slug}
                className="p-6 border border-white/12 bg-[#0B0D14] flex flex-col justify-between gap-4"
              >
                <div>
                  <p className="text-sm text-[#A9B0B8] leading-relaxed">{item.situation}</p>
                  <div className="mt-3 font-display text-base font-bold text-white">
                    {item.recommended}
                  </div>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      updateField('service', item.recommended);
                      setSubmitted(false);
                      document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="text-xs font-mono uppercase tracking-[0.14em] text-[#4D9BFF] hover:text-white transition-colors"
                  >
                    Select In Form
                  </button>
                  <TransitionLink
                    to={`/services/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-[0.14em] text-[#A9B0B8] hover:text-white transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </TransitionLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 4: Before You Drop Off Checklist */}
      <section className="bg-[#05060A] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 min-w-0">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
              03 · Prep Checklist
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
              Before Your Visit
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#A9B0B8] leading-relaxed">
              A few quick notes that help make drop-off and pickup easy once your appointment is confirmed.
            </p>
          </div>

          <div className="lg:col-span-7 divide-y divide-white/10 border-y border-white/10 min-w-0">
            {BEFORE_YOU_BOOK.map((item, idx) => (
              <div key={item} className="py-4 flex items-start gap-4">
                <span className="w-6 h-6 flex items-center justify-center border border-[#1F6BFF]/40 bg-[#1F6BFF]/10 text-[#4D9BFF] shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="flex-1 text-sm sm:text-base text-[#D0D5DD]">{item}</span>
                <span className="font-mono text-xs text-[#6B727A] tabular-nums shrink-0">
                  0{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 5: Common Booking & Quote Answers */}
      <section className="bg-[#080A10] py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#4D9BFF]">
                04 · Common Questions
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold uppercase text-silver-static">
                Quote &amp; Booking Answers
              </h2>
            </div>
            <TransitionLink
              to="/faq"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-white hover:text-[#4D9BFF] transition-colors"
            >
              <span>View All 10 FAQs</span>
              <ArrowRight className="w-4 h-4 text-[#4D9BFF]" />
            </TransitionLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FAQ_ITEMS.slice(0, 3).map((faq) => (
              <div
                key={faq.id}
                className="p-6 sm:p-7 border border-white/12 bg-[#0B0D14] flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#4D9BFF]">
                    {faq.group}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm text-[#A9B0B8] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 6: Studio Trust Pillars */}
      <section className="bg-[#05060A] py-14 sm:py-16 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SITE.trustPoints.map((point, idx) => (
            <div
              key={point}
              className="p-6 border border-white/10 bg-[#0B0D14] flex flex-col justify-between gap-3"
            >
              <span className="font-mono text-xs text-[#4D9BFF] tabular-nums">0{idx + 1}</span>
              <div className="font-display text-lg font-bold uppercase text-white">{point}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
