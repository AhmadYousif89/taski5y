import { ResponseStatus } from '@features/types';
import { SpinnerIcon } from 'assets/icons';

type Props = {
  extraMsg?: string;
  successMsg?: string;
  status: ResponseStatus;
  errorMsg: string | string[] | JSX.Element;
};

export const AuthErrorMsg = ({ status, errorMsg, successMsg, extraMsg }: Props) => {
  return (
    <div
      className={`${
        status === 'idle' ? 'invisible -top-24 opacity-0' : ''
      } flex-center absolute -top-10 left-1/2 w-full -translate-y-full -translate-x-1/2 rounded-md bg-slate-800 py-6 text-2xl transition-all duration-200`}>
      {status === 'rejected' ? (
        <div className={`tracking-wider text-color-invalid`}>
          <p>{errorMsg}</p>
        </div>
      ) : null}

      {status === 'fulfilled' ? (
        <div className="xs:flex-center text-center text-color-valid">
          <p>{extraMsg},</p>
          <p className="flex items-center gap-4">
            <span>{successMsg}</span>
            <SpinnerIcon className="h-8 w-8" />
          </p>
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
