import { Button } from '../ui/button';

type Props = {
  msg?: string;
  closeModal?: () => void;
  confirmAction?: () => void;
};

export const ActionModal = ({ msg, confirmAction, closeModal }: Props) => {
  return (
    <>
      <div
        onClick={closeModal}
        className="fixed top-1/2 left-1/2 z-30 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-20"></div>
      <div className="center-absolute z-40 flex h-1/4 w-2/3 max-w-5xl items-center justify-center rounded-lg bg-color-card p-6 text-color-base lg:h-1/3">
        <div className="flex flex-col gap-8">
          <h3 className="text-center text-2xl sm:text-3xl">{msg}</h3>
          <div className="flex w-full justify-evenly">
            <Button label="Delete" onClick={confirmAction} className="hover:bg-red-500" />
            <Button label="Cancel" onClick={closeModal} className="hover:bg-sky-500" />
          </div>
        </div>
      </div>
    </>
  );
};
