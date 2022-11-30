import { SpinnerIcon } from 'assets/icons';

interface Props {
  title: string;
  status: boolean;
  formIsValid: boolean;
}

export const AuthButton = ({ title, status, formIsValid }: Props) => {
  return (
    <button
      disabled={status}
      className={`${
        formIsValid ? 'cursor-pointer' : 'cursor-not-allowed'
      } flex items-center justify-center gap-4 rounded-md bg-transparent px-6 py-4 text-2xl capitalize tracking-wider text-color-base shadow-md ring-1 ring-color-base active:translate-y-1 xs:w-1/2`}>
      <>{title}</>
    </button>
  );
};
