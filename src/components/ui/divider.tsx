import { FC, PropsWithChildren } from 'react';

type Props = {
  className?: string;
} & PropsWithChildren;

export const Divider: FC<Props> = ({ children, className = '' }) => {
  return (
    <div
      aria-hidden={true}
      className={`${className} relative my-8 before:absolute before:right-0 before:top-0 before:h-px before:w-[40%] before:bg-neutral-500 after:absolute after:left-0 after:top-0 after:h-px after:w-[40%] after:bg-neutral-500`}>
      {children}
    </div>
  );
};
