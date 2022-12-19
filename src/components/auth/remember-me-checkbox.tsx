import { usePersist } from 'hooks/use-persist';

export const TrustDevice = () => {
  const [persist, setPersist] = usePersist();

  return (
    <label
      htmlFor="persist"
      className="flex w-full items-center justify-center gap-2 text-2xl text-color-base">
      <input
        type="checkbox"
        name="persist"
        id="persist"
        onChange={() => setPersist((p: boolean) => !p)}
        checked={persist}
        className="w-max accent-indigo-400"
      />
      Trust device
    </label>
  );
};
