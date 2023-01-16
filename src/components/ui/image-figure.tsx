import { FC, PropsWithChildren } from 'react';

import { CameraIcon } from 'assets/icons';
import { AuthActionType, ResponseStatus } from 'features/types';

type ImageFigureProps = {
  src?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
  status?: ResponseStatus;
  actionType?: AuthActionType;
};

export const ImageFigure: FC<PropsWithChildren<ImageFigureProps>> = ({
  src,
  alt,
  status,
  onClick,
  children,
  actionType,
  className = ''
}) => {
  const isUploading = status === 'loading' && actionType === 'upload_image';
  const animateBorder = isUploading
    ? 'before:absolute before:inset-0 before:z-10 before:h-full before:w-full before:rounded-full before:border-2 before:animate-spin before:border-x-amber-500 before:border-y-black'
    : 'border-2 border-neutral-50';

  return (
    <figure
      title="upload image"
      className={`${className} ${animateBorder} flex-center group relative z-10 cursor-pointer overflow-hidden rounded-full bg-neutral-900 transition-[filter] hover:brightness-90`}
      onClick={onClick}>
      {isUploading && (
        <p className="center-absolute flex-center z-20 h-full w-full bg-black bg-opacity-10 text-lg font-bold uppercase tracking-wider text-amber-600">
          updating
        </p>
      )}
      {status !== 'loading' && (
        <i className="absolute inset-0 z-10 h-full w-full translate-y-52 bg-slate-500 bg-opacity-50 transition-all duration-300 group-hover:translate-y-1/2">
          <CameraIcon className="absolute -top-6 left-1/2 h-12 w-12 -translate-x-1/2 stroke-neutral-100" />
        </i>
      )}
      <img
        src={src}
        alt={`${alt ? alt : 'profile-image'}`}
        className="center-absolute h-[95%] w-[95%] rounded-full object-cover"
      />
      {children}
    </figure>
  );
};
