import { SpinnerIcon } from 'assets/icons';

interface Props {
  title: string;
  status: boolean | string;
  formIsValid: boolean;
  className?: string;
}

export const AuthButton = ({ title, className = '', status, formIsValid }: Props) => {
  return (
    <button
      disabled={status === 'loading'}
      className={`${
        formIsValid ? 'cursor-pointer' : 'cursor-not-allowed'
      } ${className} flex w-full items-center justify-center gap-4 rounded-md bg-transparent px-6 py-4 text-2xl capitalize tracking-wider text-color-base shadow-md ring-1 ring-color-base active:translate-y-1`}>
      <>{title}</>
    </button>
  );
};
