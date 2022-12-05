import { SpinnerIcon } from 'assets/icons';
import { createPortal } from 'react-dom';

type Props = { actionMsg?: string };

export const Modal = ({ actionMsg = 'Loading ...' }: Props) => {
  const modalElement = (
    <section className="center-absolute z-40 flex h-1/4 w-2/3 max-w-5xl items-center justify-center rounded-lg bg-neutral-800 p-6 text-color-base lg:h-1/3">
      <div className="flex items-center gap-8">
        <SpinnerIcon className="h-12 w-12 sm:h-16 sm:w-16" />
        <h3 className="text-2xl sm:text-4xl">{actionMsg}</h3>
      </div>
    </section>
  );
  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

  return <>{createPortal(modalElement, modalRoot)}</>;
};
