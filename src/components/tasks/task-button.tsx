import { PropsWithChildren } from 'react';
interface TaskButtonProps extends PropsWithChildren {
  title?: string;
  onClick: () => void;
}
export const TaskButton = ({ title, onClick, children }: TaskButtonProps) => {
  return (
    <button
      type={'button'}
      onClick={() => onClick()}
      className="rounded-md bg-btn-color-base p-4 text-lg capitalize tracking-wide text-color-base transition-all duration-200 hover:bg-btn-color-highlight active:translate-y-1 md:text-xl
      ">
      <span>{title}</span>
      {children}
    </button>
  );
};
