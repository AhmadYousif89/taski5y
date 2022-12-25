import { FC } from 'react';
import { ResponseStatus } from 'features/types';

interface Props {
  title: string;
  status: ResponseStatus;
  formIsValid: boolean;
  className?: string;
}

export const AuthButton: FC<Props> = ({ title, className = '', status, formIsValid }) => {
  return (
    <button
      type={'submit'}
      disabled={!formIsValid || status === 'loading'}
      className={`${
        formIsValid ? 'cursor-pointer' : 'cursor-not-allowed'
      } ${className} flex-center w-full gap-4 rounded-md bg-transparent px-6 py-4 text-2xl capitalize tracking-wider text-color-base shadow-md ring-1 ring-color-base active:translate-y-1`}>
      <>{title}</>
    </button>
  );
};
