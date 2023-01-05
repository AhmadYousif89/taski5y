import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LSKeys, modifyLocalStorage } from 'helpers/modify-local-storage';

/**
 * A hook that reads and updates a value in local storage.
 * @template I - The type of the value to be persisted.
 * @param {string} item - The item in the local storage to be persisted.
 * @param {I} initialValue - The initial value of the item.
 * @param {LSKeys} [key='persist'] - The key to use in local storage.
 * @returns {[I, Dispatch<SetStateAction<I>]} An array containing the current value of the item and a setter function to update the value.
 * @example
 * const [persist, setPersist] = usePersist('mode', 'dark');
 * if(persist === 'dark') setPersist('light')
 * console.log(`value: ${persist}`);
 */
export const usePersist = <I>(
  item: string,
  initialValue: I,
  key: LSKeys = 'persist'
): [I, Dispatch<SetStateAction<I>>] => {
  const [persist, setPersist] = useState<I>(JSON.parse(item) || initialValue);

  useEffect(() => {
    modifyLocalStorage({ action: 'set', key, value: JSON.stringify(persist) });
  }, [key, persist]);

  return [persist, setPersist];
};
