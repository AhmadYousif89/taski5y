import { modifyLocalStorage } from 'helpers/modify-local-storage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const usePersist = <T>(initValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [persist, setPersist] = useState(initValue);

  useEffect(() => {
    modifyLocalStorage({ action: 'set', key: 'persist', value: `${persist}` });
  }, [persist]);

  return [persist, setPersist];
};
