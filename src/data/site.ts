export const SITE = {
  company: 'Exquisite Shine Auto Detailing',
  shortName: 'Exquisite Shine',
  owner: 'Travi G',
  phoneDisplay: '(970) 657-8129',
  phoneHref: 'tel:+19706578129',
  email: 'Itstravig@gmail.com',
  emailHref: 'mailto:Itstravig@gmail.com',
  city: 'Loveland',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100009056386673',
  logo: '/images/logo.png',
  heroImage: '/images/hero-showroom.jpg',
  dullToDazzlingImage: '/images/studio-suv.jpg',
  trustChips: ['Free quotes', 'Hand-finished', 'Based in Loveland'] as const,
  trustPoints: [
    'Detail-obsessed finishes',
    'Hand-finished',
    'Free quotes',
    'Based in Loveland',
  ],
  marqueeItems: ['EXTERIOR', 'INTERIOR', 'POLISH', 'WAX', 'PROTECTION'],
} as const;

export interface NavItem {
  label: string;
  to: string;
  dropdownType?: 'services' | 'more';
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services', dropdownType: 'services' },
  { label: 'Our Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'More', to: '/process', dropdownType: 'more' },
  { label: 'Contact', to: '/contact' },
];

export const MORE_LINKS = [
  {
    label: 'How We Detail',
    to: '/process',
    description: 'Step-by-step studio workflow & prep checklist',
  },
  {
    label: 'Reviews',
    to: '/reviews',
    description: 'Feedback from local vehicle owners',
  },
  {
    label: 'Care Tips',
    to: '/care-tips',
    description: 'Practical wash, towel, and wax care guides',
  },
  {
    label: 'FAQ',
    to: '/faq',
    description: 'Common answers before your appointment',
  },
];
