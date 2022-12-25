import { FC } from 'react';
import { SpinnerIcon } from 'assets/icons';
import { ResponseStatus } from 'features/types';

type Props = {
  extraMsg?: string;
  successMsg?: string;
  status: ResponseStatus;
  errorMsg: string | string[] | JSX.Element;
};

export const AuthErrorMsg: FC<Props> = ({ status, errorMsg, successMsg, extraMsg }) => {
  const sessionExpired = JSON.parse(localStorage.getItem('error') as string);

  const sessionExpireMsg = (
    <p className="absolute -top-24 left-1/2 w-full max-w-md -translate-x-1/2 rounded-md bg-slate-800 py-6 text-center text-2xl text-sky-300">
      Your last session was expired
    </p>
  );

  return (
    <>
      {sessionExpired && sessionExpireMsg}
      <div
        className={`${
          status === 'idle' ? 'invisible -top-24 opacity-0' : ''
        } flex-center absolute -top-4 left-1/2 w-full -translate-y-full -translate-x-1/2 rounded-md bg-slate-800 py-6 text-center text-2xl transition-all duration-200`}>
        {status === 'rejected' ? (
          <div className={`tracking-wider text-color-invalid`}>
            <p>{errorMsg ? errorMsg : 'something went wrong, try to login again'}</p>
          </div>
        ) : null}

        {status === 'fulfilled' ? (
          <div className="xs:flex-center gap-4 text-center text-color-valid">
            <p>{extraMsg}</p>
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
    </>
  );
};
