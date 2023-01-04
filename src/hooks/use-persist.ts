import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LSKeys, modifyLocalStorage } from 'helpers/modify-local-storage';

export const usePersist = <I>(
  item: string,
  initialValue: I,
  key: LSKeys = 'persist',
): [I, Dispatch<SetStateAction<I>>] => {
  const [persist, setPersist] = useState<I>(JSON.parse(item) || initialValue);

  useEffect(() => {
    modifyLocalStorage({ action: 'set', key, value: JSON.stringify(persist) });
  }, [key, persist]);

  return [persist, setPersist];
};
