import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginWithGoogle } from '@features/services/auth';
import { useAppDispatch } from '@app/hooks';
import { addTimer } from 'helpers/timeout';
import { SpinnerIcon } from 'assets/icons';

export const GoogleSuccess = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // addTimer(() =>
    //   dispatch(loginWithGoogle()).then(() => navigate('/tasks', { replace: true })),
    // );
  }, []);

  return (
    <div className="flex-center center-absolute h-full w-full flex-col gap-8 px-4 text-center text-color-base">
      <h1 className="text-5xl leading-tight">Thank you for using Taskify</h1>
      <p className="text-3xl">Redirecting, please wait</p>
      <SpinnerIcon className="h-12 w-12" />
    </div>
  );
};
