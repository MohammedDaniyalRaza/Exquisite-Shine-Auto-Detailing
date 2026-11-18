import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger };

/**
 * Custom text splitter that preserves word boundaries and real spaces.
 * Wraps each word in an inline-block nowrap container and each character
 * inside an overflow-hidden span so mask-rise reveals never break words mid-line
 * or glue adjacent words together.
 */
export function splitWordsAndChars(element: HTMLElement): {
  chars: HTMLElement[];
  words: HTMLElement[];
  revert: () => void;
} {
  const originalHTML = element.innerHTML;
  const text = (element.textContent || '').trim().replace(/\s+/g, ' ');

  if (!text) {
    return {
      chars: [],
      words: [],
      revert: () => {
        element.innerHTML = originalHTML;
      },
    };
  }

  const wordList = text.split(' ');
  const chars: HTMLElement[] = [];
  const words: HTMLElement[] = [];

  element.innerHTML = '';
  element.setAttribute('aria-label', text);

  wordList.forEach((word, wIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'inline-block whitespace-nowrap';
    wordSpan.setAttribute('aria-hidden', 'true');

    Array.from(word).forEach((char) => {
      const maskSpan = document.createElement('span');
      maskSpan.className = 'inline-block overflow-hidden align-bottom';

      const charSpan = document.createElement('span');
      charSpan.className = 'inline-block will-change-transform';
      charSpan.textContent = char;

      maskSpan.appendChild(charSpan);
      wordSpan.appendChild(maskSpan);
      chars.push(charSpan);
    });

    element.appendChild(wordSpan);
    words.push(wordSpan);

    if (wIndex < wordList.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
  });

  return {
    chars,
    words,
    revert: () => {
      element.innerHTML = originalHTML;
      element.removeAttribute('aria-label');
    },
  };
}

/**
 * Splits an element into word spans for scrubbed word-by-word reveals.
 */
export function splitWordsOnly(element: HTMLElement): {
  words: HTMLElement[];
  revert: () => void;
} {
  const originalHTML = element.innerHTML;
  const text = (element.textContent || '').trim().replace(/\s+/g, ' ');

  if (!text) {
    return {
      words: [],
      revert: () => {
        element.innerHTML = originalHTML;
      },
    };
  }

  const wordList = text.split(' ');
  const words: HTMLElement[] = [];

  element.innerHTML = '';

  wordList.forEach((word, wIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'inline-block transition-none';
    wordSpan.textContent = word;
    element.appendChild(wordSpan);
    words.push(wordSpan);

    if (wIndex < wordList.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
  });

  return {
    words,
    revert: () => {
      element.innerHTML = originalHTML;
    },
  };
}

let refreshTimer: number | null = null;
export function scheduleScrollTriggerRefresh(delay = 120): void {
  if (typeof window === 'undefined') return;
  if (refreshTimer !== null) {
    window.clearTimeout(refreshTimer);
  }
  refreshTimer = window.setTimeout(() => {
    ScrollTrigger.refresh();
    refreshTimer = null;
  }, delay);
}
