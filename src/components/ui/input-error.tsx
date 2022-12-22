import { FC } from 'react';

type Props = { msg: string; className?: string };

export const InputError: FC<Props> = ({ msg, className }) => {
  return <p className={`input-err-msg self-end ${className}`}>{msg}</p>;
};
