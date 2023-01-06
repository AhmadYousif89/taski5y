import { useEffect } from 'react';
import { usePersist } from 'hooks';
import { modifyLocalStorage } from 'helpers';

export const TrustDevice = () => {
  const keyItem = modifyLocalStorage({ action: 'get', key: 'persist' });
  const [persist, setPersist] = usePersist(keyItem, false);

  useEffect(() => {
    if (!keyItem) setPersist(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyItem]);

  return (
    <label htmlFor="persist" className="flex-center w-full gap-2 text-xl text-color-base">
      <input
        id="persist"
        name="persist"
        type="checkbox"
        checked={persist}
        onChange={e => setPersist(e.target.checked)}
        className="w-max accent-indigo-400"
      />
      <span>Trust device</span>
    </label>
  );
};
