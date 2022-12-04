import { RefObject, useEffect } from 'react';

type Events = MouseEvent | TouchEvent;

export const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (e: Events) => void
) => {
  useEffect(() => {
    const listener = (event: Events) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Element) || null) return;
      handler(event);
    };

    document.addEventListener('click', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('click', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};
