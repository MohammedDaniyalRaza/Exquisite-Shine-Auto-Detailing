export interface TimelineStep {
  number: string;
  title: string;
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
}

export const PROCESS_TIMELINE: TimelineStep[] = [
  {
    number: '01',
    title: 'Booking & Quote',
    summary: 'Straightforward conversation before you drop off.',
    detail:
      'Every appointment starts with a quick call, text, or quote request sharing your vehicle type and what needs attention. We confirm what services fit best and give you a clear, free quote with no pressure.',
    image: '/images/detail-coupe-garage.jpg',
    imageAlt: 'Dark midnight blue coupe parked in clean concrete detailing bay',
  },
  {
    number: '02',
    title: 'Walkaround Inspection',
    summary: 'Checking paint, trim, wheels, and cabin condition under bright light.',
    detail:
      'Before water or tools touch the vehicle, we walk every panel with inspection lighting to note stubborn tar, bug splatter, swirl patterns, and interior wear areas so nothing gets overlooked.',
    image: '/images/detail-paint-inspection.jpg',
    imageAlt: 'LED detailing inspection light checking paint clarity on dark hood',
  },
  {
    number: '03',
    title: 'Pressure Rinse & Foam Wash',
    summary: 'Lifting loose grit before hand-washing every exterior surface.',
    detail:
      'A high-pressure rinse and thick snow foam blanket soften road film safely. Wheels, barrels, calipers, and tires are brushed first, followed by a gentle two-bucket hand wash across all body panels and door jambs.',
    image: '/images/detail-foam-cannon.jpg',
    imageAlt: 'Foam cannon covering a dark metallic sedan in white snow foam',
  },
  {
    number: '04',
    title: 'Decontamination & Refine',
    summary: 'Deep cabin wipe-down or dual-action paint refinement.',
    detail:
      'Depending on your service, we either thoroughly vacuum and wipe down every interior surface with clean towels and sprays, or run calibrated dual-action machine polishing passes to refine hazy clear coat.',
    image: '/images/service-polish.jpg',
    imageAlt: 'Dual-action machine polisher refining gloss black paint',
  },
  {
    number: '05',
    title: 'Protect & Seal',
    summary: 'Locking in depth, slickness, and water-beading protection.',
    detail:
      'Clean painted surfaces receive an even hand application of protective wax, cured and buffed off with plush royal-blue microfiber towels for warm gloss and cleaner future washes.',
    image: '/images/detail-wax-application.jpg',
    imageAlt: 'Hand applicator spreading protective wax on dark metallic paint',
  },
  {
    number: '06',
    title: 'Final Walkthrough',
    summary: 'Verified under bright light before handing back the keys.',
    detail:
      'We inspect glass clarity, jambs, emblems, tire dressing, and paint reflections one final time under studio and natural light before welcoming you back for pickup in Loveland.',
    image: '/images/detail-door-jamb.jpg',
    imageAlt: 'Spotless gloss black door jamb and brushed metal sill plate',
  },
];

export interface VehicleCategory {
  id: string;
  number: string;
  type: string;
  oneLiner: string;
  image: string;
  imageAlt: string;
  recommendedSlug: string;
}

export const VEHICLE_TYPES: VehicleCategory[] = [
  {
    id: 'veh-cars',
    number: '01',
    type: 'Sports Cars & Coupes',
    oneLiner: 'Low-slung body lines, deep clear coat clarity, and crisp wheel faces.',
    image: '/images/detail-coupe-garage.jpg',
    imageAlt: 'Deep midnight blue coupe parked inside concrete detailing studio',
    recommendedSlug: 'machine-polishing',
  },
  {
    id: 'veh-suvs',
    number: '02',
    type: 'SUVs & Crossovers',
    oneLiner: 'Full multi-row cabin resets, cargo areas, roof rails, and family-ready exteriors.',
    image: '/images/studio-suv.jpg',
    imageAlt: 'White luxury SUV under dark studio blue light bars',
    recommendedSlug: 'interior-detail',
  },
  {
    id: 'veh-trucks',
    number: '03',
    type: 'Pickup Trucks',
    oneLiner: 'Tall panels, grilles, bed rails, wheel wells, and rugged road-grime cleanups.',
    image: '/images/detail-pickup-truck.jpg',
    imageAlt: 'Black full-size pickup truck inside dark detailing bay',
    recommendedSlug: 'exterior-wash-detail',
  },
  {
    id: 'veh-sedans',
    number: '04',
    type: 'Daily Sedans',
    oneLiner: 'Consistent hand washes, commuter cabin care, and lasting wax protection.',
    image: '/images/detail-sedan-showroom.jpg',
    imageAlt: 'Dark charcoal sports sedan in minimalist studio lighting',
    recommendedSlug: 'wax-protection',
  },
];

export const BEFORE_YOU_BOOK = [
  'Remove personal items, loose change, paperwork, and items from cupholders, consoles, and trunk space prior to interior work.',
  'Let us know if you have aftermarket matte wraps, delicate decals, or specific spots on paint or upholstery you want evaluated.',
  'Have your vehicle year, make, and model handy when calling (970) 657-8129 or filling out the quote form.',
  'If heavy rain or severe weather hits on your scheduled day, reach out directly and we will coordinate an easy reschedule.',
];
