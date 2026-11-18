export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-01',
    src: '/images/gallery-01.webp',
    alt: 'Black coupe detailed to a mirror finish at sunset in Loveland',
    title: 'Black Coupe Sunset Gloss',
    category: 'Exterior & Wax',
  },
  {
    id: 'photo-02',
    src: '/images/gallery-02.webp',
    alt: 'Black SUV and coupe parked side by side after detailing at dusk',
    title: 'Two-Vehicle Evening Finish',
    category: 'Full Exterior',
  },
  {
    id: 'photo-03',
    src: '/images/gallery-03.webp',
    alt: 'Sharp cloud and sky reflection across freshly polished black hood',
    title: 'Hood Reflection Clarity',
    category: 'Machine Polishing',
  },
  {
    id: 'photo-04',
    src: '/images/gallery-04.webp',
    alt: 'Microfiber towel and mirror paint reflection on side panel',
    title: 'Hand-Finished Paint Depth',
    category: 'Paint Refinement',
  },
  {
    id: 'photo-05',
    src: '/images/gallery-05.webp',
    alt: 'Detailed black coupe profile under dramatic mountain twilight',
    title: 'Twilight Profile Shine',
    category: 'Exterior & Protection',
  },
  {
    id: 'photo-06',
    src: '/images/gallery-06.webp',
    alt: 'Black full-size SUV cleaned and finished inside a garage bay',
    title: 'Garage Bay SUV Detail',
    category: 'Exterior Wash & Detail',
  },
  {
    id: 'photo-07',
    src: '/images/gallery-07.webp',
    alt: 'Grey SUV finished outdoors with clean trim and clear glass',
    title: 'Grey SUV Clean Finish',
    category: 'Wash & Protection',
  },
  {
    id: 'photo-08',
    src: '/images/gallery-08.webp',
    alt: 'Front three-quarter view of black coupe with crisp sky reflections',
    title: 'Front End Clarity',
    category: 'Wax & Protection',
  },
];
