import { FC } from 'react';
import { createPortal } from 'react-dom';

type Props = { className?: string; onClick?: () => void };

export const Backdrop: FC<Props> = ({ onClick, className = '' }) => {
  const element = (
    <div
      onClick={onClick}
      className={`${className} fixed top-0 left-0 z-20 min-h-screen w-full bg-black bg-opacity-10`}
    />
  );
  const root = document.getElementById('backdrop-root') as HTMLDivElement;

  return <>{createPortal(element, root)}</>;
};
