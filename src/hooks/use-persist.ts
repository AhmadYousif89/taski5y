import { modifyLocalStorage } from 'helpers/modify-local-storage';
import { useEffect, useState } from 'react';

const persistKey = modifyLocalStorage({ action: 'get', key: 'persist' });

export const usePersist = () => {
  const [persist, setPersist] = useState(JSON.parse(persistKey as string) || false);

  useEffect(() => {
    modifyLocalStorage({ action: 'set', key: 'persist', value: JSON.stringify(persist) });
  }, [persist]);

  return [persist, setPersist];
};
