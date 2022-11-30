import { usePersist } from 'hooks/use-persist';

export const TrustDevice = () => {
  const [persist, setPersist] = usePersist();

  return (
    <label htmlFor="persist" className="flex items-center gap-4 text-2xl text-color-base">
      <input
        type="checkbox"
        name="persist"
        id="persist"
        onChange={() => setPersist((p: boolean) => !p)}
        checked={persist}
        className="accent-indigo-400"
      />
      Trust this device
    </label>
  );
};
