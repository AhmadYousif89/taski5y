import { FC } from 'react';

export const NoTaskMsg: FC<{ msg: string; className?: string }> = ({ msg, className = '' }) => {
  return <h2 className={`${className} text-center text-3xl text-color-base`}>{msg}</h2>;
};
