import { useEffect, useState } from 'react';

export const useMatchMedia = (query: string) => {
  const mq = window.matchMedia(query);
  const [isMatch, setIsMatch] = useState(mq.matches);

  useEffect(() => {
    const handler = (e: any) => setIsMatch(e.matches);
    mq.addEventListener('change', handler);

    return () => mq.removeEventListener('change', handler);
  }, [mq]);

  return isMatch;
};
