export interface FaqItem {
  id: string;
  group: 'Booking & Quotes' | 'Before Your Detail' | 'Process & Care';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-01',
    group: 'Booking & Quotes',
    question: 'How do I book an appointment or get a quote?',
    answer:
      'Call or text (970) 657-8129, or fill out the quote request form on the Contact page with your vehicle year, make, model, and the service you are looking for. Every quote is free.',
  },
  {
    id: 'faq-02',
    group: 'Booking & Quotes',
    question: 'Where are you located?',
    answer:
      'Exquisite Shine Auto Detailing is based in Loveland. Reach out directly when requesting a quote to coordinate drop-off or appointment timing.',
  },
  {
    id: 'faq-03',
    group: 'Booking & Quotes',
    question: 'Do you provide quotes over the phone or by email?',
    answer:
      'Yes. Share your vehicle type and what kind of care it needs by calling (970) 657-8129 or emailing Itstravig@gmail.com, and Travi G will give you a straightforward free quote.',
  },
  {
    id: 'faq-04',
    group: 'Before Your Detail',
    question: 'What should I do before dropping off my vehicle?',
    answer:
      'For interior work, please remove personal belongings, loose valuables, paperwork, and items from the center console or trunk so every surface can be reached cleanly.',
  },
  {
    id: 'faq-05',
    group: 'Before Your Detail',
    question: 'What if the weather turns rainy on my appointment day?',
    answer:
      'If rain or weather gets in the way of your schedule or exterior finish plans, simply call (970) 657-8129 and we can adjust timing with you directly.',
  },
  {
    id: 'faq-06',
    group: 'Process & Care',
    question: 'How long does a typical detail take?',
    answer:
      'Timing depends on vehicle size, current condition, and whether you are scheduling a standard wash, a full interior reset, or dual-action machine polishing. We will give you an honest time window when booking.',
  },
  {
    id: 'faq-07',
    group: 'Process & Care',
    question: 'Can I combine Exterior Wash, Interior Detail, and Wax?',
    answer:
      'Yes. You can book a single service or combine exterior washing, interior detailing, machine polishing, and wax protection based on what your vehicle needs.',
  },
  {
    id: 'faq-08',
    group: 'Process & Care',
    question: 'How should I wash my car after machine polishing or waxing?',
    answer:
      'Avoid stiff automatic car wash brushes and harsh dish soap. Use pH-neutral car shampoo, a soft wash mitt, and clean microfiber drying towels to preserve the gloss and wax protection.',
  },
  {
    id: 'faq-09',
    group: 'Process & Care',
    question: 'Do you detail trucks and large SUVs as well as coupes and sedans?',
    answer:
      'Yes. From sports coupes and daily sedans to full-size SUVs and pickup trucks, every vehicle receives the same careful hand-finished attention.',
  },
  {
    id: 'faq-10',
    group: 'Before Your Detail',
    question: 'How do I know whether I need Machine Polishing or just Wax & Protection?',
    answer:
      'If your paint looks clear in direct light and mainly needs gloss and water beading, Wax & Protection is a great fit. If you see fine circular swirls or hazy reflections in sun, Machine Polishing refines the clear coat first.',
  },
];
