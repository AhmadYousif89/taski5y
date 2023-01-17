import { useCallback, useEffect } from 'react';

import { useAddTimer, useSessionError } from 'hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authSelector, setAuthActionType } from 'features/slices/auth';
import { setTaskActionType, taskSelector } from 'features/slices/task';
import { toggleNotification, uiSelector } from 'features/slices/ui';

import { CloseIcon, SpinnerIcon } from 'assets/icons';
import { modifyLocalStorage } from 'helpers';
import { Success } from './success';
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
  const { tasks, status: taskStatus, actionType: taskActionType } = useAppSelector(taskSelector);
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
    if (authActionType === 'profile_update' || authActionType === 'upload_image') {
      notification = (
        <Success>
          <p>Profile updated</p>
        </Success>
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
    if (taskActionType && taskActionType !== 'fetching') {
      notification = (
        <Success>
          <p>
            Task
            {taskActionType === 'create_success'
              ? ' created'
              : taskActionType === 'update_success'
              ? ' updated'
              : taskActionType === 'delete_success'
              ? ' deleted'
              : ''}
          </p>
        </Success>
      );
    }
  }
  if (taskStatus === 'rejected' && tasks.length > 0) {
    notification = <Error errorMsg={<p>Internal server error</p>} />;
  }

  const resetActionType = useCallback(() => {
    if (authActionType) dispatch(setAuthActionType(''));
    if (taskActionType) dispatch(setTaskActionType(''));
  }, [dispatch, authActionType, taskActionType]);

  const duration = 5;

  useEffect(() => {
    if (notificationIsVisible && notification && !sessionError) {
      addTimer(() => {
        dispatch(toggleNotification(false));
        resetActionType();
      }, duration);
    }
  }, [dispatch, addTimer, sessionError, resetActionType, notification, notificationIsVisible]);

  useEffect(() => {
    if (
      (authStatus !== 'idle' || taskStatus !== 'idle') &&
      !notificationIsVisible &&
      notification
    ) {
      dispatch(toggleNotification(true));
    }
  }, [dispatch, authStatus, taskStatus, notificationIsVisible, notification]);

  const closeNotificationHandler = () => {
    if (sessionError) {
      modifyLocalStorage({ action: 'remove', key: 'server_error' });
      setSessionError('');
    }
    if (notificationIsVisible) {
      resetActionType();
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
