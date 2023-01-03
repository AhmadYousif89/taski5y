import { modifyLocalStorage } from 'helpers/modify-local-storage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UsePersistType = [boolean, Dispatch<SetStateAction<boolean>>];
const persistKey = modifyLocalStorage({ action: 'get', key: 'persist' });

export const usePersist = (): UsePersistType => {
  const [persist, setPersist] = useState<boolean>(Boolean(persistKey));

  useEffect(() => {
    modifyLocalStorage({ action: 'set', key: 'persist', value: `${persist}` });
  }, [persist]);

  return [persist, setPersist];
};
