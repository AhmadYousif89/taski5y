import { createPortal } from 'react-dom';
import { Button } from '../ui/button';
import { useAppSelector } from '@app/hooks';
import { ImageFigure } from './image-figure';
import { authSelector } from '@features/slices/auth';
import {
  CheckMarkIcon,
  CloseIcon,
  SpinnerIcon,
  UploadIcon,
  WarningIcon,
} from 'assets/icons';

type ModalActionType = 'transition' | 'upload';
type Props = {
  image?: any;
  msg?: string;
  icon?: JSX.Element;
  showWarning?: boolean;
  actionType?: ModalActionType;
  closeModal?: () => void;
  extraAction?: () => void;
  confirmAction?: () => void;
};

export const ActionModal = ({
  msg,
  icon,
  image,
  actionType,
  closeModal,
  extraAction,
  showWarning = true,
  confirmAction,
}: Props) => {
  const { status } = useAppSelector(authSelector);

  let content = (
    <div className="flex w-full flex-col gap-4 text-center">
      <span className="mb-4 self-center">{icon ? icon : <WarningIcon />}</span>
      <h3 className="px-2 text-2xl xs:text-3xl">{msg}</h3>
      {showWarning && (
        <p className="text-xl xs:text-2xl">This action can not be undone.</p>
      )}
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
        <h3 className="text-3xl">{msg}</h3>
      </div>
    );

  const showActionButtons = (
    <div className="relative w-full">
      <div className="mt-10 flex w-full justify-center gap-12">
        <Button
          icon={<UploadIcon />}
          label="Upload"
          onClick={confirmAction}
          isDisabled={status === 'loading'}
          className={`${
            status === 'loading' ? 'cursor-not-allowed' : ''
          } ring-1 ring-teal-500 active:translate-y-1 max-xs:bg-teal-500 xs:hover:bg-teal-500`}
        />
        <Button
          label="Close"
          icon={<CloseIcon />}
          onClick={closeModal}
          className="ring-1 ring-sky-500 max-xs:bg-sky-500 xs:hover:bg-sky-500"
        />
      </div>
      {status === 'loading' ? (
        <p className="text-amber absolute top-full left-1/2 flex w-full translate-y-10 -translate-x-1/2 items-center justify-center gap-4 text-2xl tracking-wider">
          <SpinnerIcon className="h-10 w-10" />
          uploading . . .
        </p>
      ) : null}
      {status === 'fulfilled' ? (
        <p className="text-green absolute top-full left-1/2 flex w-full translate-y-10 -translate-x-1/2 justify-center gap-2 text-2xl tracking-wider">
          Image uploaded successfully <CheckMarkIcon />
        </p>
      ) : null}
      {status === 'rejected' ? (
        <p className="absolute top-full left-1/2 flex w-full translate-y-10 -translate-x-1/2 justify-center gap-2 text-2xl tracking-wider text-rose-500">
          Image upload failed <WarningIcon className="h-10 w-10" />
        </p>
      ) : null}
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
            {showActionButtons}
          </>
        ) : (
          <>
            <button
              aria-label="upload-image-button"
              onClick={extraAction}
              className="flex w-2/3 cursor-pointer flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-sky-500 px-4 py-8 transition-transform active:translate-y-2">
              <UploadIcon className="h-16 w-16 stroke-sky-400 " />
              <p className="text-2xl sm:text-3xl">Select your image</p>
            </button>
            <Button
              label="Cancel"
              onClick={closeModal}
              className="mt-8 ring-1 ring-sky-500 max-xs:bg-sky-500 xs:hover:bg-sky-500"
            />
          </>
        )}
      </div>
    );

  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;

  const modalElement = (
    <section
      aria-label="modal"
      className="fixed top-1/2 left-1/2 z-40 mx-auto flex min-h-[300px] w-10/12 max-w-3xl -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-lg bg-neutral-800 py-12 text-color-base">
      {content}
    </section>
  );

  return <>{createPortal(modalElement, modalRoot)}</>;
};
