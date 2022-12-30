import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useAppSelector } from 'app/hooks';
import { ImageFigure } from './image-figure';
import { authSelector } from 'features/slices/auth';

import { Button } from 'components/ui/button';
import { DisplayImageStatus } from 'components/users/image-status';
import { CloseIcon, SpinnerIcon, UploadIcon, WarningIcon } from 'assets/icons';

type ActionModalProps = {
  image?: any;
  msg?: string;
  icon?: JSX.Element;
  showWarning?: boolean;
  actionType?: 'transition' | 'upload';
  closeModal?: () => void;
  extraAction?: () => void;
  confirmAction?: () => void;
};

export const ActionModal: FC<ActionModalProps> = ({
  msg,
  icon,
  image,
  actionType,
  closeModal,
  extraAction,
  showWarning = true,
  confirmAction,
}) => {
  const actionModalRef = useRef<HTMLDivElement>(null);
  const { status } = useAppSelector(authSelector);

  let content = (
    <div className="flex w-full flex-col gap-4 text-center">
      <span className="mb-4 self-center">{icon ? icon : <WarningIcon />}</span>
      <h3 className="px-2 text-2xl xs:text-3xl">{msg}</h3>
      {showWarning && <p className="text-xl xs:text-2xl">This action can not be undone.</p>}
      <div className="mt-6 flex w-full justify-center gap-12">
        <Button
          label="Confirm"
          onClick={confirmAction}
          className="max-xs:bg-red-500 xs:ring-1 xs:ring-rose-500 xs:hover:bg-red-500"
        />
        <Button
          label="Cancel"
          onClick={closeModal}
          className="max-xs:bg-sky-500 xs:ring-1 xs:ring-sky-500 xs:hover:bg-sky-500"
        />
      </div>
    </div>
  );

  if (actionType === 'transition')
    content = (
      <div className="flex items-center gap-8">
        <SpinnerIcon className="text-sky h-12 w-12" />
        <h3 className="text-3xl uppercase">{msg}</h3>
      </div>
    );

  const showImgUploadBtns = (
    <div className="relative w-full">
      <div className="mt-10 flex w-full justify-center gap-12">
        <Button
          label="Upload"
          icon={<UploadIcon />}
          onClick={confirmAction}
          isDisabled={status === 'loading'}
          className={`${
            status === 'loading' ? 'cursor-not-allowed' : ''
          } ring-1 ring-teal-500 max-xs:bg-teal-500 xs:hover:bg-teal-500`}
        />
        <Button
          label="Close"
          icon={<CloseIcon />}
          onClick={closeModal}
          className="ring-1 ring-sky-500 max-xs:bg-sky-500 xs:hover:bg-sky-500"
        />
      </div>
      <DisplayImageStatus status={status} />
    </div>
  );

  if (actionType === 'upload')
    content = (
      <div className="flex w-full flex-col items-center gap-4 text-center">
        {image ? (
          <>
            <ImageFigure
              src={image}
              onClick={extraAction}
              className="h-44 w-44 bg-white !ring-white"
            />
            {showImgUploadBtns}
          </>
        ) : (
          <>
            <Button
              onClick={extraAction}
              aria-label="upload-image-button"
              className="w-2/3 flex-col border-2 border-dashed border-sky-500 !py-8">
              <UploadIcon className="h-14 w-14 stroke-sky-400 " />
              <p className="text-2xl sm:text-3xl">Select your image</p>
            </Button>
            <Button
              label="Cancel"
              onClick={closeModal}
              className="mt-8 ring-1 ring-sky-500  max-xs:bg-sky-500 xs:hover:bg-sky-500"
            />
          </>
        )}
      </div>
    );

  useEffect(() => {
    if (actionModalRef.current) actionModalRef.current.querySelectorAll('button')[1]?.focus();
  }, [actionModalRef.current]);

  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

  const modalElement = (
    <section
      ref={actionModalRef}
      aria-label="modal"
      className="flex-center fixed top-1/2 left-1/2 z-40 mx-auto w-10/12 max-w-3xl -translate-y-1/2 -translate-x-1/2 rounded-lg bg-neutral-800 pt-20 pb-24 text-color-base shadow-md">
      {content}
    </section>
  );

  return <>{createPortal(modalElement, modalRoot)}</>;
};
