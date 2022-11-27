import { PropsWithChildren } from 'react';
interface TaskButtonProps extends PropsWithChildren {
  title?: string;
  onClick: () => void;
}
export const TaskButton = ({ title, onClick, children }: TaskButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-btn-color-base p-4 text-lg capitalize tracking-wide text-color-base transition-colors hover:bg-btn-color-highlight active:translate-y-1 md:text-xl
      ">
      <span>{title}</span>
      {children}
    </button>
  );
};
