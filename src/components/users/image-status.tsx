import { ResponseStatus } from '@features/types';
import { SpinnerIcon, CheckMarkIcon, WarningIcon } from 'assets/icons';
import { FC } from 'react';

type ImageStatusProps = {
  status: ResponseStatus;
};

export const DisplayImageStatus: FC<ImageStatusProps> = ({ status }) => {
  return (
    <>
      {status === 'loading' ? (
        <p className="text-amber flex-center absolute top-full left-1/2 w-full translate-y-8 -translate-x-1/2 gap-4 text-2xl uppercase tracking-wider">
          <SpinnerIcon className="h-10 w-10" />
          uploading
        </p>
      ) : null}
      {status === 'fulfilled' ? (
        <p className="text-green absolute top-full left-1/2 flex w-full translate-y-8 -translate-x-1/2 justify-center gap-2 text-2xl tracking-wider">
          Image uploaded successfully <CheckMarkIcon />
        </p>
      ) : null}
      {status === 'rejected' ? (
        <p className="absolute top-full left-1/2 flex w-full translate-y-8 -translate-x-1/2 justify-center gap-2 text-2xl tracking-wider text-rose-500">
          Image upload failed <WarningIcon className="h-10 w-10" />
        </p>
      ) : null}
    </>
  );
};
