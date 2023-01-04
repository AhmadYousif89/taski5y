import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { modifyLocalStorage } from 'helpers/modify-local-storage';

export const usePersist = <I>(key: string, initialValue: I): [I, Dispatch<SetStateAction<I>>] => {
  const [persist, setPersist] = useState<I>(JSON.parse(key) || initialValue);

  useEffect(() => {
    modifyLocalStorage({ action: 'set', key: 'persist', value: JSON.stringify(persist) });
  }, [persist]);

  return [persist, setPersist];
};
