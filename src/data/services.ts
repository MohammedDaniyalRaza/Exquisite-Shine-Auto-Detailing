export interface ServiceItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  shortLabel: string;
  tagline: string;
  summary: string;
  overviewParagraphs: string[];
  image: string;
  imageAlt: string;
  iconName: 'droplets' | 'armchair' | 'disc' | 'shield';
  included: string[];
  process: {
    step: string;
    detail: string;
    image: string;
    imageAlt: string;
  }[];
  whoItIsFor: string[];
  howToPrepare: string[];
  miniGallery: {
    src: string;
    alt: string;
    caption: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'exterior',
    number: '01',
    slug: 'exterior-wash-detail',
    title: 'Exterior Wash & Detail',
    shortLabel: 'Exterior Wash',
    tagline: 'Pressure wash, hand wash, and spotless hand dry.',
    summary:
      'Thorough exterior cleaning from wheels and trim up through every painted panel using gentle hand-wash methods.',
    overviewParagraphs: [
      'Every exterior detail starts with a careful pressure rinse and rich foam pre-soak to lift loose grit before a wash mitt ever touches your paint. Automatic tunnel brushes grind road sand into clear coat; our hand-wash workflow clears dirt gently from top to bottom using dedicated microfiber mitts and clean rinse water.',
      'Beyond the painted panels, we spend real time on the details that frame the vehicle: wheel faces and barrels, tires, fender arches, grille slats, emblems, exterior glass, and door jambs. Everything is blown and hand-dried with plush microfiber towels to prevent stubborn water spots.',
    ],
    image: '/images/service-wash.jpg',
    imageAlt: 'High-pressure water and thick foam rinsing a dark metallic vehicle fender in a detailing bay',
    iconName: 'droplets',
    included: [
      'High-pressure pre-rinse to clear loose road grime and debris',
      'Foam bath and two-bucket hand wash across all exterior panels',
      'Wheel faces, barrels, tires, and wheel well cleaning',
      'Bug, tar, and lower rocker panel decontamination wash',
      'Door jamb wipe-down and streak-free exterior glass cleaning',
      'Plush microfiber hand dry and clean satin tire dressing',
    ],
    process: [
      {
        step: 'Pressure Rinse & Foam Soak',
        detail:
          'High-pressure water clears loose dust and winter grime, followed by thick foam dwell time to soften bugs and traffic film.',
        image: '/images/detail-foam-cannon.jpg',
        imageAlt: 'Foam cannon blanketing a dark sedan in white snow foam',
      },
      {
        step: 'Wheels, Barrels & Trim',
        detail:
          'Soft detailing brushes clean lug recesses, spokes, brake calipers, and tire sidewalls before body mitts ever touch paint.',
        image: '/images/detail-wheel-brush.jpg',
        imageAlt: 'Soft boar-hair brush cleaning a gloss black performance wheel',
      },
      {
        step: 'Two-Bucket Hand Wash',
        detail:
          'Plush microfiber wash mitts glide in straight passes from roof down to lower rockers using fresh soap and dedicated rinse buckets.',
        image: '/images/detail-hand-wash-mitt.jpg',
        imageAlt: 'Microfiber wash mitt gliding over soapy dark car door paint',
      },
      {
        step: 'Hand Dry & Jamb Wipe',
        detail:
          'Every door jamb, sill plate, mirror housing, and glass edge is towel-dried clean so no drip lines spoil the finish.',
        image: '/images/detail-door-jamb.jpg',
        imageAlt: 'Clean gloss black door jamb and brushed metal sill plate',
      },
    ],
    whoItIsFor: [
      'Daily drivers collecting road film, pollen, and bug splatter',
      'Owners who want to avoid stiff automatic brush car washes',
      'Vehicles preparing for weekend meets or clean seasonal upkeep',
      'Cars and trucks needing wheels, jambs, and glass dialed back in',
    ],
    howToPrepare: [
      'Fold in power mirrors if your vehicle locks them automatically, and let us know if any exterior trim is loose.',
      'Point out heavy bug splatter, tree sap, or tar spots at drop-off so they get targeted pre-treatment.',
      'If you want lasting gloss added right after the wash, ask about pairing Wax & Protection.',
    ],
    miniGallery: [
      {
        src: '/images/detail-foam-cannon.jpg',
        alt: 'Foam cannon pre-soak on dark sedan',
        caption: 'Snow foam dwell & lift',
      },
      {
        src: '/images/detail-wheel-brush.jpg',
        alt: 'Detailing brush cleaning black alloy spokes',
        caption: 'Wheel & caliper brush work',
      },
      {
        src: '/images/detail-door-jamb.jpg',
        alt: 'Wiped clean door jamb and sill plate',
        caption: 'Crisp door jamb wipe-down',
      },
    ],
    faqs: [
      {
        question: 'Do you wash the entire exterior by hand?',
        answer:
          'Yes. After a pressure rinse and snow foam pre-soak, every painted panel is washed and dried by hand using clean microfiber mitts and towels.',
      },
      {
        question: 'Are wheels, tires, and door jambs included?',
        answer:
          'Yes. Wheel faces, accessible barrels, tires, and door jambs are cleaned and wiped dry as part of the exterior detail.',
      },
      {
        question: 'Does Exterior Wash & Detail remove deep scratches?',
        answer:
          'Washing safely clears surface dirt and road film. If you have swirl marks or clear coat haze, Machine Polishing is the right service to refine the paint.',
      },
      {
        question: 'Can I add wax right after an exterior wash?',
        answer:
          'Yes. Wax & Protection pairs directly onto a freshly washed and dried exterior.',
      },
    ],
  },
  {
    id: 'interior',
    number: '02',
    slug: 'interior-detail',
    title: 'Interior Detail',
    shortLabel: 'Interior Detail',
    tagline: 'Deep vacuum, detailed wipe-down, clean towels and sprays.',
    summary:
      'Cabin reset covering carpets, upholstery, leather surfaces, console controls, vents, and interior glass.',
    overviewParagraphs: [
      'A clean cabin changes how every drive feels. Over weeks of commuting, fine dust settles into air vents, shifter trim, and touchscreen borders while grit works deep into floor mats and seat rails. We start by removing loose debris thoroughly before wiping down every touchpoint.',
      'Using fresh microfiber towels, soft interior brushes, and surface-safe sprays, we clean dashboards, door cards, steering wheels, cupholders, and leather or cloth seating to a crisp, natural satin finish—never leaving sticky or greasy dressings behind. Interior windows and mirrors are finished last for glare-free visibility.',
    ],
    image: '/images/studio-interior.jpg',
    imageAlt: 'Clean black leather car cabin with blue contrast stitching in dark studio light',
    iconName: 'armchair',
    included: [
      'Full interior vacuum of seats, carpets, floor mats, and trunk space',
      'Detailed brush agitation around vents, switches, and console seams',
      'Microfiber towel wipe-down of dashboard, door panels, and trim',
      'Gentle cleaning for leather or fabric seating surfaces',
      'Cupholders, steering wheel, and shifter sanitization wipe',
      'Streak-free interior windshield, mirror, and window cleaning',
    ],
    process: [
      {
        step: 'Air Purge & Deep Vacuum',
        detail:
          'Seat tracks, carpet seams, under-seat channels, and trunk liners are vacuumed thoroughly to clear trapped sand and dust.',
        image: '/images/detail-interior-vacuum.jpg',
        imageAlt: 'Vacuuming dark charcoal floor mats and carpet inside an SUV',
      },
      {
        step: 'Brushes, Vents & Controls',
        detail:
          'Soft detailing brushes lift dust from climate vents, steering wheel buttons, gauge bezels, and tight console seams.',
        image: '/images/detail-dashboard-trim.jpg',
        imageAlt: 'Spotless matte leather steering wheel and digital dashboard',
      },
      {
        step: 'Upholstery & Panel Wipe',
        detail:
          'Dedicated surface sprays and folded microfiber towels clean door cards, center armrests, leather bolsters, and cupholders.',
        image: '/images/studio-interior.jpg',
        imageAlt: 'Detailed black leather seats with blue contrast stitching',
      },
      {
        step: 'Glare-Free Interior Glass',
        detail:
          'Windshield, rear glass, and mirrors are cleaned with fresh glass towels to leave crisp visibility day and night.',
        image: '/images/detail-door-jamb.jpg',
        imageAlt: 'Clean entry sill and interior door trim edge',
      },
    ],
    whoItIsFor: [
      'Commuters wanting a fresh, dust-free dashboard and spotless glass',
      'Family SUVs and trucks with sand, crumbs, and pet hair in floor mats',
      'New-to-you used cars needing a complete cabin reset',
      'Drivers who dislike glossy, slippery armor-all style dressings',
    ],
    howToPrepare: [
      'Clear out personal belongings, paperwork, loose change, and items from gloveboxes, door pockets, and trunk.',
      'Remove child car seats ahead of time if you want the seat cushions underneath vacuumed and wiped thoroughly.',
      'Mention any delicate aftermarket screens or specific spills when requesting your quote.',
    ],
    miniGallery: [
      {
        src: '/images/detail-interior-vacuum.jpg',
        alt: 'Vacuuming dark SUV floor mat and carpet',
        caption: 'Thorough mat & carpet extraction',
      },
      {
        src: '/images/detail-dashboard-trim.jpg',
        alt: 'Clean matte dashboard and steering wheel',
        caption: 'Natural matte trim & console finish',
      },
      {
        src: '/images/studio-interior.jpg',
        alt: 'Clean black leather interior seats',
        caption: 'Conditioned, non-greasy seating',
      },
    ],
    faqs: [
      {
        question: 'What should I take out of the vehicle before an interior detail?',
        answer:
          'Please remove personal items, valuables, paperwork, and loose items from seats, consoles, door pockets, and the cargo area.',
      },
      {
        question: 'Will my dashboard look shiny or feel greasy afterwards?',
        answer:
          'No. Dashboards, door panels, and trim are cleaned to a clean, natural matte factory finish without slick silicone residue.',
      },
      {
        question: 'Do you clean trunk and cargo areas too?',
        answer:
          'Yes. Accessible trunk and cargo floors are vacuumed and wiped down alongside the main passenger cabin.',
      },
      {
        question: 'Can I book Interior Detail by itself without an exterior wash?',
        answer:
          'Yes. You can book Interior Detail standalone or pair it with Exterior Wash & Detail.',
      },
    ],
  },
  {
    id: 'polishing',
    number: '03',
    slug: 'machine-polishing',
    title: 'Machine Polishing',
    shortLabel: 'Machine Polishing',
    tagline: 'Dual-action polisher paint refinement for deeper clarity.',
    summary:
      'Controlled dual-action machine polishing designed to reduce light haze and bring back crisp reflections.',
    overviewParagraphs: [
      'Wash mitts, snow brushes, and daily driving gradually leave fine swirl marks and hazy micro-marring across clear coat—especially visible on black, dark blue, and metallic finishes under bright sun or overhead lights. Machine polishing safely levels those microscopic clear coat defects rather than temporarily hiding them.',
      'After a thorough prep wash and careful light inspection, we mask sensitive rubber and matte trim, then run calibrated passes with a dual-action polisher, matched foam pads, and clean compounds. Oils are wiped away so you see genuine paint clarity and depth before sealing the finish.',
    ],
    image: '/images/service-polish.jpg',
    imageAlt: 'Dual-action machine polisher refining gloss black hood paint under studio inspection lighting',
    iconName: 'disc',
    included: [
      'Thorough exterior prep wash prior to machine work',
      'Panel inspection under focused detailing lighting',
      'Masking of sensitive matte trim and rubber edges',
      'Dual-action machine polishing to refine clarity and gloss',
      'Panel wipe-down with microfiber towels to inspect true finish',
      'Clean finish ready for wax or sealant protection',
    ],
    process: [
      {
        step: 'Prep Wash & Surface Clean',
        detail:
          'All painted panels are washed and dried completely so no loose grit sits on the clear coat before polishing pads touch the car.',
        image: '/images/detail-hand-wash-mitt.jpg',
        imageAlt: 'Gentle hand wash preparing dark paint for polishing',
      },
      {
        step: 'LED Swirl Inspection',
        detail:
          'Dedicated inspection lights read swirl density, water spotting, and haze across hoods, fenders, and doors.',
        image: '/images/detail-paint-inspection.jpg',
        imageAlt: 'Handheld inspection light revealing paint clarity on dark hood',
      },
      {
        step: 'Dual-Action Machine Passes',
        detail:
          'Controlled dual-action polisher movement refines haze smoothly with safe pad temperatures and matched foam pads.',
        image: '/images/service-polish.jpg',
        imageAlt: 'Dual-action polisher refining gloss black hood',
      },
      {
        step: 'Microfiber Wipe & Gloss Check',
        detail:
          'Polishing oils are removed with plush microfiber towels to verify crisp, distortion-free reflections under studio light.',
        image: '/images/detail-microfiber-buff.jpg',
        imageAlt: 'Plush blue microfiber towels buffing black hood',
      },
    ],
    whoItIsFor: [
      'Dark-colored vehicles showing cobweb swirls under direct sunlight',
      'Paintwork looking dull or hazy from years of automatic washes',
      'Enthusiast coupes, sedans, and trucks preparing for protection',
      'Owners wanting true reflection clarity before waxing',
    ],
    howToPrepare: [
      'Schedule a quick call or walkaround with Travi G so we can look at your paint condition before finalizing your quote.',
      'Let us know if any panels have been recently repainted or have aftermarket paint protection film.',
      'Pair Machine Polishing with Wax & Protection afterwards to lock in the freshly refined finish.',
    ],
    miniGallery: [
      {
        src: '/images/detail-paint-inspection.jpg',
        alt: 'LED light checking black hood clear coat',
        caption: 'Direct light paint inspection',
      },
      {
        src: '/images/service-polish.jpg',
        alt: 'Dual-action machine polisher on black hood',
        caption: 'Dual-action refinement pass',
      },
      {
        src: '/images/detail-headlight-clarity.jpg',
        alt: 'Crystal clear sports car headlight and glossy fender',
        caption: 'Crisp specular clarity',
      },
    ],
    faqs: [
      {
        question: 'Why use a dual-action polisher instead of an aggressive rotary?',
        answer:
          'A dual-action polisher oscillates as it spins, delivering smooth, controlled paint refinement with lower heat buildup and minimal risk of buffer trails.',
      },
      {
        question: 'Can you inspect my paint before quoting machine polishing?',
        answer:
          'Yes. Reach out by phone or request a quote so Travi G can inspect your paint condition and recommend the right level of polishing.',
      },
      {
        question: 'Does polishing remove deep rock chips down to bare metal?',
        answer:
          'No. Polishing refines defects within the top clear coat layer. Deep chips or scratches through the paint require touch-up or body work, and we will always be honest about what polishing can improve.',
      },
      {
        question: 'Should I add wax after machine polishing?',
        answer:
          'Yes. Machine polishing leaves bare, ultra-clean clear coat, making Wax & Protection the ideal final step to seal the finish.',
      },
    ],
  },
  {
    id: 'wax',
    number: '04',
    slug: 'wax-protection',
    title: 'Wax & Protection',
    shortLabel: 'Wax & Protection',
    tagline: 'Rich gloss and hydrophobic protection across painted surfaces.',
    summary:
      'Protective wax finish applied by hand to boost depth, repel water, and make routine washing easier.',
    overviewParagraphs: [
      'Once your exterior is spotless, bare clear coat still faces sun UV rays, bird droppings, bug splatter, and road film every time you drive. Adding a dedicated protective wax layer gives your paint a sacrificial shield while bringing out rich, warm depth across curved fenders and flat hoods alike.',
      'We prep painted surfaces thoroughly so wax bonds evenly, apply thin uniform coats by hand, allow proper cure time, and buff everything off with clean royal-blue microfiber towels. The result is a slick, glossy finish that beads water tightly and makes your next wash noticeably faster.',
    ],
    image: '/images/service-wax.jpg',
    imageAlt: 'Tight water beads resting on glossy dark car paint under studio lighting',
    iconName: 'shield',
    included: [
      'Clean surface preparation before product application',
      'Even hand application of protective wax across painted panels',
      'Careful cure timing for clean bonding to the clear coat',
      'Plush microfiber hand buffing for streak-free depth',
      'Water-beading finish that helps shield against road film',
      'Final walkaround inspection under bright light',
    ],
    process: [
      {
        step: 'Clean Surface Prep',
        detail:
          'Painted panels are washed and dried cleanly so wax bonds directly to spotless clear coat rather than trapped road dust.',
        image: '/images/service-wash.jpg',
        imageAlt: 'Clean rinsed metallic car fender ready for protection',
      },
      {
        step: 'Thin Uniform Application',
        detail:
          'Quality protective wax is worked across each body panel in thin, even strokes with a clean foam applicator.',
        image: '/images/detail-wax-application.jpg',
        imageAlt: 'Applying thin wax coat with foam applicator pad',
      },
      {
        step: 'Microfiber Hand Buffing',
        detail:
          'After curing, plush microfiber towels buff away haze to reveal deep liquid gloss across every body line.',
        image: '/images/detail-microfiber-buff.jpg',
        imageAlt: 'Buffing dark car hood with folded blue microfiber towels',
      },
      {
        step: 'Hydrophobic Bead Check',
        detail:
          'Final inspection verifies crisp reflections, slick paint feel, and uniform protection across hood, roof, and doors.',
        image: '/images/detail-sun-reflection.jpg',
        imageAlt: 'Liquid gloss reflection on waxed rear quarter panel',
      },
    ],
    whoItIsFor: [
      'Vehicles parked outdoors needing extra defense against sun and road film',
      'Owners wanting deep wet-look gloss and tight water beading',
      'Freshly polished cars ready to seal in clean clear coat clarity',
      'Drivers who want easier, faster maintenance washes at home',
    ],
    howToPrepare: [
      'Wax & Protection requires a freshly washed exterior—pair it with Exterior Wash & Detail or Machine Polishing.',
      'Avoid using dish soap on future home washes so your new wax layer lasts as long as possible.',
      'Ask Travi G when calling if you have questions about maintaining the finish between seasonal coats.',
    ],
    miniGallery: [
      {
        src: '/images/detail-wax-application.jpg',
        alt: 'Foam pad applying protective wax to black hood',
        caption: 'Even hand wax application',
      },
      {
        src: '/images/service-wax.jpg',
        alt: 'Tight crystal-clear water beads on dark metallic paint',
        caption: 'Hydrophobic water beading',
      },
      {
        src: '/images/detail-sun-reflection.jpg',
        alt: 'Deep reflection on freshly waxed quarter panel',
        caption: 'Liquid-gloss studio reflection',
      },
    ],
    faqs: [
      {
        question: 'Can Wax & Protection be added right after an Exterior Wash or Polish?',
        answer:
          'Yes. It pairs naturally after both Exterior Wash & Detail and Machine Polishing.',
      },
      {
        question: 'How do I maintain a waxed finish at home?',
        answer:
          'Wash with pH-neutral car shampoo, a soft microfiber mitt, and clean drying towels—avoid dish soap and automatic brush tunnels.',
      },
      {
        question: 'How can I tell when my car is ready for a fresh coat of wax?',
        answer:
          'Watch clean water after rinsing: when tight beads flatten into slow sheets on the hood and roof, it is a great time for a fresh coat.',
      },
      {
        question: 'Does wax work on light colors as well as black paint?',
        answer:
          'Yes. While dark paint shows deep mirror reflections, white, silver, and grey vehicles also gain noticeable slickness, UV defense, and crisp gloss.',
      },
    ],
  },
];

export function getServiceBySlug(slug?: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export const SERVICE_MATCHER = [
  {
    situation: 'Road dust, bugs & dirty wheels',
    recommended: 'Exterior Wash & Detail',
    slug: 'exterior-wash-detail',
  },
  {
    situation: 'Dusty dash, stained mats & cloudy glass',
    recommended: 'Interior Detail',
    slug: 'interior-detail',
  },
  {
    situation: 'Fine wash swirls & dull clear coat haze',
    recommended: 'Machine Polishing',
    slug: 'machine-polishing',
  },
  {
    situation: 'Bare paint needing gloss & water beading',
    recommended: 'Wax & Protection',
    slug: 'wax-protection',
  },
];
