import { usePersist } from 'hooks';

export const TrustDevice = () => {
  const [persist, setPersist] = usePersist(false);

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
