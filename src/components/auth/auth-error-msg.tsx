import { ResponseStatus } from '@features/types';
import { SpinnerIcon } from 'assets/icons';

type Props = {
  status: ResponseStatus;
  errorMsg: string | JSX.Element;
};

export const AuthErrorMsg = ({ status, errorMsg }: Props) => {
  return (
    <div
      className={`${
        status === 'idle' ? 'invisible opacity-0' : ''
      } absolute -top-10 left-1/2 flex w-full -translate-y-full -translate-x-1/2 justify-center rounded-md bg-slate-800 py-6 text-center text-2xl`}>
      {status === 'rejected' ? (
        <div className={`tracking-wider text-color-invalid`}>
          <p>{errorMsg}</p>
        </div>
      ) : null}

      {status === 'loading' ? (
        <p className={`flex items-center gap-4 text-color-valid`}>
          <SpinnerIcon className="ml-auto h-8 w-8" />
          Loading
        </p>
      ) : null}
    </div>
  );
};
