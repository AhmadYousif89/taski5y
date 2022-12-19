import { usePersist } from 'hooks/use-persist';

export const TrustDevice = () => {
  const [persist, setPersist] = usePersist();

  return (
    <label htmlFor="persist" className="flex-center w-full gap-2 text-xl text-color-base">
      <input
        type="checkbox"
        name="persist"
        id="persist"
        onChange={() => setPersist((p: boolean) => !p)}
        checked={persist}
        className="w-max accent-indigo-400"
      />
      Trust me bro
    </label>
  );
};
