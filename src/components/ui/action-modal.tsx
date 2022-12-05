import { WarningIcon } from 'assets/icons/warning';
import { createPortal } from 'react-dom';
import { Button } from '../ui/button';

type Props = {
  msg?: string;
  closeModal?: () => void;
  confirmAction?: () => void;
};

export const ActionModal = ({ msg, confirmAction, closeModal }: Props) => {
  const modalElement = (
    <section className="fixed top-1/2 left-1/2 z-40 mx-auto flex h-1/4 w-10/12 max-w-3xl -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-lg bg-neutral-800 p-6 text-color-base lg:h-1/3">
      <div className="flex w-full flex-col gap-6 text-center">
        <span className="self-center">
          <WarningIcon />
        </span>
        <h3 className="text-2xl sm:text-4xl">{msg}</h3>
        <p className="text-xl sm:text-2xl">This action can not be undone.</p>
        <div className="mt-6 flex w-full justify-center gap-12">
          <Button
            label="Confirm"
            onClick={confirmAction}
            className="ring hover:bg-red-500"
          />
          <Button label="Cancel" onClick={closeModal} className="ring hover:bg-sky-500" />
        </div>
      </div>
    </section>
  );
  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

  return <>{createPortal(modalElement, modalRoot)}</>;
};
