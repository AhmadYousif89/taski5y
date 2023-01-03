import { LSKeys, modifyLocalStorage } from 'helpers/modify-local-storage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const usePersist = <T>(key: LSKeys, initValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [persist, setPersist] = useState(initValue);

  useEffect(() => {
    modifyLocalStorage({ action: 'set', key, value: `${persist}` });
  }, [persist]);

  return [persist, setPersist];
};
