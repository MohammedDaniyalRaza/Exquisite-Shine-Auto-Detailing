import { useEffect, useRef, useState } from 'react';

export interface ScrollState {
  isScrolled: boolean;
  direction: 'up' | 'down';
  scrollY: number;
}

export function useScrollDirection(threshold = 36): ScrollState {
  const [state, setState] = useState<ScrollState>({
    isScrolled: false,
    direction: 'up',
    scrollY: 0,
  });

  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const currentY = Math.max(0, window.scrollY || window.pageYOffset || 0);
      const prevY = lastYRef.current;
      const delta = currentY - prevY;

      setState((prev) => {
        const isScrolled = currentY > threshold;
        let direction = prev.direction;

        if (currentY <= threshold) {
          direction = 'up';
        } else if (delta > 6) {
          direction = 'down';
        } else if (delta < -6) {
          direction = 'up';
        }

        if (
          prev.isScrolled === isScrolled &&
          prev.direction === direction &&
          Math.abs(prev.scrollY - currentY) < 4
        ) {
          return prev;
        }

        return { isScrolled, direction, scrollY: currentY };
      });

      lastYRef.current = currentY;
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return state;
}
