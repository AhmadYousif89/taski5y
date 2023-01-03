import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { modifyLocalStorage } from 'helpers/modify-local-storage';

export const usePersist = <I>(initialValue: I): [I, Dispatch<SetStateAction<I>>] => {
  const persistKey = JSON.parse(modifyLocalStorage({ action: 'get', key: 'persist' }));
  const [persist, setPersist] = useState<I>(persistKey || initialValue);

  useEffect(() => {
    modifyLocalStorage({ action: 'set', key: 'persist', value: JSON.stringify(persist) });
  }, [persist]);

  return [persist, setPersist];
};
