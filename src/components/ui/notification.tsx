import { useEffect } from 'react';

import { useAddTimer, useSessionError } from 'hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authSelector } from 'features/slices/auth';
import { taskSelector } from 'features/slices/task';
import { toggleNotification, uiSelector } from 'features/slices/ui';

import { CheckMarkIcon, CloseIcon, SpinnerIcon } from 'assets/icons';
import { modifyLocalStorage } from 'helpers';
import { Error } from './error';

export const Notification = () => {
  const dispatch = useAppDispatch();
  const {
    message,
    error: authError,
    status: authStatus,
    actionType: authActionType
  } = useAppSelector(authSelector);
  const { notificationIsVisible } = useAppSelector(uiSelector);
  const { status: taskStatus, actionType: taskActionType } = useAppSelector(taskSelector);
  const { sessionError, setSessionError } = useSessionError();
  const { timers, addTimer } = useAddTimer();

  const authErrorMsg = Array.isArray(authError.message) ? (
    <ul className="flex flex-col gap-2">
      {authError.message.map((err, idx) => (
        <li key={idx}>{err}</li>
      ))}
    </ul>
  ) : (
    authError.message
  );

  let notification: string | JSX.Element | undefined;

  /* Default case */
  if (sessionError) {
    notification = <p className="text-slate-300">{sessionError}</p>;
  }
  /* Auth action cases */
  if (authStatus === 'fulfilled') {
    if (authActionType === 'password_reset') {
      notification = (
        <div className={'flex-center gap-2 text-green-500'}>
          <p>{message}password updated</p>
          <p className="flex-center gap-2">
            <span>redirecting to login</span>
            <SpinnerIcon className="h-8 w-8" />
          </p>
        </div>
      );
    }
  }
  if (authStatus === 'rejected') {
    notification = (
      <Error errorMsg={authErrorMsg} defaultMsg="Something went wrong! Try to login again" />
    );
  }
  /* Task action cases */
  if (taskStatus === 'fulfilled') {
    if (taskActionType === 'updating' || taskActionType === 'creating') {
      notification = (
        <div className="flex-center gap-4 text-slate-300">
          <p>Task {taskActionType === 'updating' ? 'updated' : 'created'}</p>
          <CheckMarkIcon className="h-9 w-9 text-green-500" />
        </div>
      );
    }
  }
  if (taskStatus === 'rejected') {
    notification = <Error errorMsg={authErrorMsg} defaultMsg="Something went wrong!" />;
  }

  const duration = 5;

  useEffect(() => {
    if (notificationIsVisible && notification && !sessionError) {
      addTimer(() => {
        dispatch(toggleNotification(false));
      }, duration);
    }
  }, [dispatch, addTimer, sessionError, notification, notificationIsVisible]);

  const closeNotificationHandler = () => {
    if (sessionError) {
      modifyLocalStorage({ action: 'remove', key: 'server_error' });
      setSessionError('');
    }
    if (notificationIsVisible) {
      dispatch(toggleNotification(false));
      clearTimeout(timers[0]);
    }
  };

  const content = (
    <div
      aria-label="notification-section"
      className={`${
        notificationIsVisible && !sessionError ? `animate-slide` : 'translate-y-32'
      } fixed top-0 left-1/2 z-50 flex w-11/12 -translate-x-1/2 items-center gap-4 overflow-hidden rounded-md bg-slate-800 px-4 py-8 text-center text-2xl shadow-md after:absolute ${
        notificationIsVisible && !sessionError
          ? `after:animate-loading` /* 5 seconds same as timer */
          : 'after:bg-slate-300'
      } after:left-0 after:bottom-0 after:h-1 after:w-full xs:max-w-3xl`}>
      <button
        className="rounded-md p-1 ring-2 ring-slate-500 hover:ring-red-500"
        onClick={closeNotificationHandler}>
        <CloseIcon className="h-5 w-5" />
      </button>
      <div aria-label="notification-content" className={`flex-center w-full gap-4 pr-11`}>
        {notification}
      </div>
    </div>
  );

  return (notificationIsVisible && notification) || sessionError ? content : null;
};