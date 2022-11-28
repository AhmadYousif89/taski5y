import { useEffect, useState } from 'react';

export const usePersist = () => {
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem('persist') as string) || '',
  );

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  return [persist, setPersist];
};
