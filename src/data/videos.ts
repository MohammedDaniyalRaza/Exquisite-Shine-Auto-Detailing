export interface VideoItem {
  id: string;
  number: string;
  title: string;
  caption: string;
  src: string;
  poster: string;
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'video-01',
    number: '01',
    title: 'Wash & Shine 01',
    caption: 'Fresh exterior wash and hand-finished gloss in the sun.',
    src: '/videos/video-01.mp4',
    poster: '/images/video-poster-01.jpg',
  },
  {
    id: 'video-02',
    number: '02',
    title: 'Mirror Walkaround 02',
    caption: 'Full-body reflection check across deep black paintwork.',
    src: '/videos/video-02.mp4',
    poster: '/images/video-poster-02.jpg',
  },
  {
    id: 'video-03',
    number: '03',
    title: 'Light Inspection 03',
    caption: 'Direct light check verifying clean paint clarity.',
    src: '/videos/video-03.mp4',
    poster: '/images/video-poster-03.jpg',
  },
];
