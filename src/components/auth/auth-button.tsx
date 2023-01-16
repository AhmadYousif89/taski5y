import { FC } from 'react';
import { useAppDispatch } from 'app/hooks';
import { ResponseStatus } from 'features/types';
import { toggleNotification } from 'features/slices/ui';
import { Loading } from 'components/ui';

type AuthButtonProps = {
  title: string;
  status: ResponseStatus;
  formIsValid: boolean;
  className?: string;
};

export const AuthButton: FC<AuthButtonProps> = ({ title, className = '', status, formIsValid }) => {
  const dispatch = useAppDispatch();
  return (
    <button
      type={'submit'}
      onClick={() => dispatch(toggleNotification(true))}
      disabled={!formIsValid || status === 'loading'}
      className={`${
        formIsValid ? 'cursor-pointer' : 'cursor-not-allowed'
      } ${className} flex-center w-full gap-4 rounded-md bg-transparent px-6 py-4 text-2xl capitalize tracking-wider text-color-base shadow-md ring-1 ring-color-base active:translate-y-1`}>
      {status === 'loading' ? <Loading /> : title}
    </button>
  );
};
