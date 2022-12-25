import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginWithGoogle } from 'features/services/auth';
import { useAppDispatch, useAuth } from 'app/hooks';
import { addTimer } from 'helpers/timeout';
import { path } from 'components/app';

export const RedirectGoogleCheck = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate(path.dashboard);
    addTimer(
      () =>
        dispatch(loginWithGoogle()).then(() =>
          navigate(path.dashboard, { replace: true }),
        ),
      2,
    );
  }, [user]);

  return (
    <div className="flex h-screen w-full flex-col justify-center">
      <div className="mx-auto w-11/12 max-w-5xl space-y-6 rounded-md px-4 py-16 text-center text-color-base ring-2 ring-neutral-500 xs:py-24">
        <p className="text-2xl xs:text-3xl">Redirecting to Dashboard . .</p>
      </div>
    </div>
  );
};
