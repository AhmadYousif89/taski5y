import { createPortal } from 'react-dom';

type Props = { className?: string; onClick?: () => void };

export const Backdrop = ({ onClick, className = '' }: Props) => {
  const backdropElement = (
    <div
      onClick={onClick}
      className={`${className} fixed top-0 left-0 z-20 min-h-screen w-full bg-black bg-opacity-25`}
    />
  );
  const backdropRoot = document.getElementById('backdrop-root') as HTMLDivElement;

  return <>{createPortal(backdropElement, backdropRoot)}</>;
};
