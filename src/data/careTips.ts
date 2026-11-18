export interface CareTipItem {
  id: string;
  number: string;
  slug: string;
  category: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  readTime: string;
  body: string[];
  takeaway: string;
}

export const CARE_TIPS: CareTipItem[] = [
  {
    id: 'tip-01',
    number: '01',
    slug: 'safe-two-bucket-washing',
    category: 'Washing',
    title: 'Washing Safely at Home Without Swirling Clear Coat',
    summary:
      'Most fine wash swirls start in the driveway. A quick rinse and two dedicated buckets dramatically cut grit drag.',
    image: '/images/detail-hand-wash-mitt.jpg',
    imageAlt: 'Blue microfiber wash mitt gliding over soapy dark paint',
    readTime: '2 min read',
    body: [
      'Most fine circular marks in automotive clear coat do not come from the road—they happen when dirt already sitting on the paint gets dragged across panels by a sponge or dirty wash mitt. Starting with a thorough rinse knocks loose dust, sand, and pollen off the surface before you touch it.',
      'Using two buckets helps keep that grit away from clean panels. Fill one bucket with dedicated car wash soap and water, and fill the second bucket with plain rinse water. Wash one section from the roof downward, rinse the mitt out thoroughly in the plain water bucket, then reload fresh soap before moving to the next panel. Keeping wheels on a separate brush and bucket prevents brake dust from ever reaching body paint.',
    ],
    takeaway: 'Wash top-to-bottom in straight lines, and rinse your mitt often in clean water.',
  },
  {
    id: 'tip-02',
    number: '02',
    slug: 'why-dish-soap-hurts-finish',
    category: 'Chemistry',
    title: 'Why Dish Soap Is a Bad Idea on Automotive Paint',
    summary:
      'Kitchen degreasers are formulated to strip oils and grease—which means they also strip away protective wax and dry out trim.',
    image: '/images/detail-foam-cannon.jpg',
    imageAlt: 'Thick pH-neutral snow foam coating a dark sedan',
    readTime: '2 min read',
    body: [
      'It is tempting to grab dish detergent from the kitchen sink when you run out of car wash soap, because it cuts through bugs and road grease quickly. The problem is that household dish soaps are strong alkaline degreasers built for glass and ceramic cookware, not automotive clear coat, rubber seals, or wax.',
      'Repeatedly washing a vehicle with dish soap strips away wax and paint sealants, leaving clear coat bare against sun exposure and road grime. Over time, harsh detergents can also dry out black plastic trim and rubber window moldings. A dedicated pH-neutral car shampoo adds slick lubrication so your wash mitt glides smoothly while leaving existing wax protection intact.',
    ],
    takeaway: 'Keep a pH-neutral automotive shampoo on hand so you clean dirt without stripping wax.',
  },
  {
    id: 'tip-03',
    number: '03',
    slug: 'microfiber-towel-care',
    category: 'Tools',
    title: 'How to Care for Microfiber Towels So They Stay Soft',
    summary:
      'A good microfiber towel traps dust safely—until fabric softener or high dryer heat melts its fine split fibers.',
    image: '/images/detail-microfiber-buff.jpg',
    imageAlt: 'Gloved hands buffing dark hood with folded blue microfiber towels',
    readTime: '2 min read',
    body: [
      'Microfiber works well on paint and glass because each synthetic strand is split into tiny hooks that lift dirt and wax residue away from the surface rather than pushing it across clear coat. That structure stays effective for years if the towels are washed carefully—and gets ruined quickly if treated like normal laundry.',
      'Wash detailing towels separately from cotton clothes, which shed lint that embeds deep into microfiber loops. Use a mild liquid detergent with zero fabric softener and zero dryer sheets; softeners coat the fibers in waxy residue that causes streaking on glass and paint. Tumble dry on low heat or air dry, and never reuse a towel on paint once it has touched the ground.',
    ],
    takeaway: 'Liquid detergent only, zero fabric softener, low or no heat, and separate towels by task.',
  },
  {
    id: 'tip-04',
    number: '04',
    slug: 'how-often-to-wax',
    category: 'Protection',
    title: 'How Often to Wax and Spot When Protection Wears Thin',
    summary:
      'Instead of guessing on a rigid calendar, let water behavior on clean paint tell you when your finish is ready for a fresh coat.',
    image: '/images/detail-wax-application.jpg',
    imageAlt: 'Foam applicator spreading thin protective wax on dark hood',
    readTime: '2 min read',
    body: [
      'There is no single schedule that fits every vehicle because parking outdoors, daily mileage, sun intensity, and wash habits all affect how long a protective layer lasts. A car parked inside a garage stays beaded longer than a truck commuting in bright sun and winter road spray.',
      'The easiest gauge is how clean water behaves right after a wash. Fresh wax or sealant pulls water into tight, tall droplets that roll off quickly while driving. When water starts sheeting lazily in flat puddles across the hood and roof, the barrier is wearing thin and ready for a fresh application—typically every few months for traditional waxes.',
    ],
    takeaway: 'Watch water beading on the hood and roof after rinsing; flat sheeting signals it is time to re-wax.',
  },
  {
    id: 'tip-05',
    number: '05',
    slug: 'keeping-interiors-fresh',
    category: 'Interior',
    title: 'Keeping Leather, Consoles, and Glass Fresh Between Details',
    summary:
      'Simple habits—like skipping shiny dressings and keeping a dry towel in the door pocket—keep cabins clean year-round.',
    image: '/images/detail-dashboard-trim.jpg',
    imageAlt: 'Clean matte black interior steering wheel and center console',
    readTime: '2 min read',
    body: [
      'Interiors wear fastest from everyday friction: dust settling into screen bezels, hand oils on the steering wheel, and coffee splashes around shifter trim. Heavy silicone-based dressings make plastics look shiny for a day, then attract twice as much dust and reflect glare straight onto the windshield.',
      'Keep a clean, dry microfiber cloth in the glovebox for quick dust wipe-downs on screens and piano-black trim. Use mild interior cleaners that dry to a natural factory matte finish, and shake out floor mats regularly so grit does not grind into carpet fibers. For interior glass, wipe once with a lightly dampened glass towel and immediately buff dry with a second clean towel to stop haze.',
    ],
    takeaway: 'Stick to dry dusting and matte-finish cleaners to prevent dashboard glare and dust buildup.',
  },
  {
    id: 'tip-06',
    number: '06',
    slug: 'seasonal-sun-and-winter-care',
    category: 'Seasonal',
    title: 'Protecting Paint in Intense Summer Sun and Winter Road Film',
    summary:
      'Bright sun bakes bug splatter and bird droppings into clear coat, while winter slush locks road salt around rocker panels and wheels.',
    image: '/images/detail-sun-reflection.jpg',
    imageAlt: 'Glossy dark rear quarter panel reflecting overhead lighting',
    readTime: '2 min read',
    body: [
      'Extreme seasons challenge paint from opposite directions. In warm sunny months, bug splatter, tree sap, and bird droppings are acidic; baking under direct sunlight lets them etch into unprotected clear coat within days. Washing in the shade when panels are cool to the touch also prevents soap and hard water minerals from drying into stubborn spots.',
      'In colder months, winter de-icers and gritty road film cling to lower doors, wheel arches, and rear bumpers. Giving the undercarriage, wheel wells, and lower rockers a thorough rinse when temperatures rise keeps buildup from sitting against trim and painted edges—and having a solid wax layer underneath makes that winter grime release far faster.',
    ],
    takeaway: 'Wash in the shade on cool panels in summer, and rinse lower rockers and wheel wells thoroughly in winter.',
  },
];
