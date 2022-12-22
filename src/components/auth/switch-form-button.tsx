import { FC } from 'react';

interface Props {
  title: string;
  msg: string;
  onClick: () => void;
}

export const SwitchFormButton: FC<Props> = ({ title, msg, onClick }) => {
  return (
    <button
      type={'button'}
      onClick={onClick}
      className={`flex w-full justify-between space-x-2 rounded-md bg-transparent px-6 py-4 text-left text-[12px] tracking-wider text-color-base shadow-md ring-1 ring-color-base active:translate-y-1`}>
      <span className="w-max first-letter:capitalize">{msg}</span>
      <span className="text-[12px] text-color-link first-letter:capitalize">{title}</span>
    </button>
  );
};
