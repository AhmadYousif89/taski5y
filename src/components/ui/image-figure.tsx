import { CameraIcon } from 'assets/icons';
import { PropsWithChildren } from 'react';

type ImageFigureProps = {
  src?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
} & PropsWithChildren;

export const ImageFigure = ({
  src,
  alt,
  onClick,
  children,
  className,
}: ImageFigureProps) => {
  return (
    <figure
      title="upload image"
      className={`${className} group relative z-10 h-40 w-40 cursor-pointer overflow-hidden rounded-full ring transition-[filter] hover:brightness-90`}
      onClick={onClick}>
      <i className="absolute inset-0 z-10 h-full w-full translate-y-48 bg-black bg-opacity-30 transition-all duration-300 group-hover:translate-y-1/2">
        <CameraIcon className="absolute -top-5 left-1/2 h-12 w-12 -translate-x-1/2 stroke-white" />
      </i>
      <img
        alt={`${alt ? alt : 'user-profile-image'}`}
        src={src}
        className="center-absolute h-full w-full rounded-full object-cover transition-transform"
      />
      {children}
    </figure>
  );
};
