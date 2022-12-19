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
      } absolute -top-10 left-1/2 flex -translate-y-full -translate-x-1/2 items-center justify-between rounded-md bg-slate-800 py-4 px-8`}>
      {status === 'rejected' ? (
        <div className={`text-right text-2xl tracking-wider text-color-invalid`}>
          <p>{errorMsg}</p>
        </div>
      ) : null}

      {status === 'loading' ? (
        <p className={`flex items-center gap-4 text-center text-2xl text-color-valid`}>
          <SpinnerIcon className="ml-auto h-10 w-10" />
          Loading . . .
        </p>
      ) : null}
    </div>
  );
};
