interface Props {
  title: string;
  msg: string;
  onClick: () => void;
}

export const SwitchFormButton = ({ title, msg, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full justify-between space-x-2 rounded-md bg-transparent px-6 py-4 text-left text-lg tracking-wider text-color-base shadow-md ring-1 ring-color-base active:translate-y-1 xs:text-xl`}>
      <span className="first-letter:capitalize">{msg}</span>
      <span className="text-xl text-color-link first-letter:capitalize">{title}</span>
    </button>
  );
};
