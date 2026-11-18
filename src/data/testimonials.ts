// PLACEHOLDER REVIEWS — replace with real customer reviews from the client's Facebook page before launch.

export interface TestimonialItem {
  id: string;
  name: string;
  vehicle: string;
  service: string;
  quote: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'rev-01',
    name: 'Marcus T.',
    vehicle: 'Pickup truck',
    service: 'Exterior Wash & Detail',
    quote:
      'Travi G took his time around every wheel lug, tailgate seam, and running board. Communication was straightforward from the first call, and the truck came back cleaner than the day I picked it up.',
  },
  {
    id: 'rev-02',
    name: 'Rachel K.',
    vehicle: 'Midsize SUV',
    service: 'Interior Detail',
    quote:
      'No greasy shine on the dash and zero missed crumbs in the seat tracks. Everything inside felt fresh, dry, and cleanly wiped down without heavy perfume smells.',
  },
  {
    id: 'rev-03',
    name: 'Devon H.',
    vehicle: 'Dark coupe',
    service: 'Machine Polishing',
    quote:
      'Black paint shows every single swirl in sunlight, and the hood haze was bothering me for months. After machine polishing, the reflections under street lights looked sharp and deep again.',
  },
  {
    id: 'rev-04',
    name: 'Hannah B.',
    vehicle: 'Daily sedan',
    service: 'Wax & Protection',
    quote:
      'Booked a wash and wax right before a weekend drive. Water beaded straight off the hood the next morning and road dust rinsed away effortlessly afterwards.',
  },
  {
    id: 'rev-05',
    name: 'Carlos M.',
    vehicle: 'Crew cab truck',
    service: 'Exterior & Interior Detail',
    quote:
      'Easy to reach by phone, fair free quote up front, and zero surprises when I picked up the keys. You can tell he checks his own work closely before handing the vehicle back.',
  },
  {
    id: 'rev-06',
    name: 'Megan W.',
    vehicle: 'Compact SUV',
    service: 'Interior Detail',
    quote:
      'Every vent slat, door pocket, and windshield corner was spotless. I appreciated the honest advice on how to keep the leather seats looking right between visits.',
  },
];
