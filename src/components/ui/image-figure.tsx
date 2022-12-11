import { ResponseStatus } from '@features/types';
import { CameraIcon } from 'assets/icons';
import { PropsWithChildren } from 'react';

type ImageFigureProps = {
  src?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
  status?: ResponseStatus;
} & PropsWithChildren;

export const ImageFigure = ({
  src,
  alt,
  status,
  onClick,
  children,
  className = '',
}: ImageFigureProps) => {
  const animateBorder =
    status === 'loading'
      ? 'before:absolute before:inset-0 before:z-10 before:h-full before:w-full before:rounded-full before:border-4 before:animate-spin before:border-x-amber-500 before:border-y-neutral-900'
      : 'ring-4 ring-neutral-900';
  const loadingText = (
    <p className="center-absolute text-amber z-20 flex h-full w-full items-center justify-center bg-neutral-800 bg-opacity-50 text-lg font-bold uppercase tracking-wider">
      updating
    </p>
  );

  return (
    <figure
      title="upload image"
      className={`${className} ${animateBorder} group relative z-10 cursor-pointer overflow-hidden rounded-full transition-[filter] hover:brightness-90`}
      onClick={onClick}>
      {status === 'loading' && <>{loadingText}</>}
      <i className="absolute inset-0 z-10 h-full w-full translate-y-52 bg-slate-500 bg-opacity-50 transition-all duration-300 group-hover:translate-y-1/2">
        <CameraIcon className="absolute -top-6 left-1/2 h-12 w-12 -translate-x-1/2 stroke-neutral-100" />
      </i>
      <img
        src={src}
        alt={`${alt ? alt : 'user-profile-image'}`}
        className="center-absolute h-full w-full rounded-full object-cover transition-transform"
      />
      {children}
    </figure>
  );
};
