import { FC } from 'react';
import { createPortal } from 'react-dom';

import { useAppSelector } from 'app/hooks';
import { authSelector } from 'features/slices/auth';

import { Button, DisplayImageStatus, ImageFigure } from 'components/ui';
import { CloseIcon, SpinnerIcon, UploadIcon, WarningIcon } from 'assets/icons';

type ActionModalProps = {
  image?: string;
  title?: string | JSX.Element;
  message?: string | JSX.Element;
  figure?: JSX.Element;
  showWarning?: boolean;
  actionType?: 'transition' | 'upload';
  closeModal?: () => void;
  extraAction?: () => void;
  confirmAction?: () => void;
};

export const ActionModal: FC<ActionModalProps> = ({
  image,
  title,
  figure,
  message,
  actionType,
  closeModal,
  extraAction,
  showWarning = true,
  confirmAction
}) => {
  const { status } = useAppSelector(authSelector);
  let content;

  content = (
    <div className="flex w-full flex-col gap-4 text-center">
      {title ? (
        <h1 className="mb-8 cursor-default self-center rounded-md bg-neutral-900 py-4 px-8 text-2xl capitalize ring-2 ring-neutral-600">
          {title}
        </h1>
      ) : null}
      <div>{figure ? figure : <WarningIcon className="mx-auto h-16 w-16" />}</div>
      <h3 className="my-4 text-2xl">{message}</h3>
      {showWarning && <p className="text-xl xs:text-2xl">This action can not be undone.</p>}
      <div className="mt-6 flex w-full justify-center gap-12">
        <Button
          label="Confirm"
          onClick={confirmAction}
          isDisabled={status === 'loading'}
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

  if (actionType === 'transition') {
    content = (
      <div className="flex-center gap-8 text-center">
        <SpinnerIcon className="h-12 w-12 text-sky-500" />
        <h3 className="text-3xl uppercase">{message}</h3>
      </div>
    );
  }

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

  if (actionType === 'upload') {
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
  }

  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

  const modalElement = (
    <section
      aria-label="modal"
      className="flex-center fixed top-1/2 left-1/2 z-40 mx-auto w-11/12 max-w-4xl -translate-y-1/2 -translate-x-1/2 rounded-lg bg-neutral-800 px-4 py-24 text-slate-100 shadow-md">
      {content}
    </section>
  );

  return createPortal(modalElement, modalRoot);
};
