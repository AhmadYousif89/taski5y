import { createPortal } from 'react-dom';
import { useCallback, useEffect } from 'react';

import { useAddTimer, useSessionError } from 'hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authSelector, resetAuthStatus, setAuthActionType } from 'features/slices/auth';
import { resetTaskStatus, setTaskActionType, taskSelector } from 'features/slices/task';

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
  const { tasks, status: taskStatus, actionType: taskActionType } = useAppSelector(taskSelector);
  const { sessionError, setSessionError } = useSessionError();
  const { addTimer } = useAddTimer();

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
    if (taskActionType === 'create_success') {
      notification = (
        <Success>
          <p>Task created</p>
        </Success>
      );
    }
    if (taskActionType === 'update_success') {
      notification = (
        <Success>
          <p>Task updated</p>
        </Success>
      );
    }
    if (taskActionType === 'delete_success') {
      notification = (
        <Success>
          <p>Task deleted</p>
        </Success>
      );
    }
  }
  if (taskStatus === 'rejected' && tasks.length > 0) {
    notification = <Error errorMsg={<p>Internal server error</p>} />;
  }

  const resetActions = useCallback(() => {
    if (authActionType) dispatch(setAuthActionType(''));
    if (authStatus !== 'idle') dispatch(resetAuthStatus());
    if (taskStatus !== 'idle') dispatch(resetTaskStatus());
    if (taskActionType) dispatch(setTaskActionType(''));
  }, [dispatch, authStatus, taskStatus, authActionType, taskActionType]);

  useEffect(() => {
    if (notification && !sessionError) addTimer(() => resetActions(), 3); // 3 seconds
  }, [notification, sessionError, resetActions, addTimer]);

  const closeNotificationHandler = () => {
    if (notification && sessionError) {
      setSessionError('');
      modifyLocalStorage({ action: 'remove', key: 'server_error' });
    }
  };

  const content = (
    <div
      aria-label="notification-section"
      className={`${
        notification && !sessionError ? `animate-slide` : 'translate-y-32'
      } fixed top-0 left-1/2 z-50 flex w-11/12 -translate-x-1/2 items-center gap-4 overflow-hidden rounded-md bg-slate-800 px-4 py-8 text-center text-2xl shadow-md after:absolute ${
        notification && !sessionError
          ? `after:animate-loading` /* 3 seconds same as timer */
          : 'after:bg-slate-300'
      } after:left-0 after:bottom-0 after:h-1 after:w-full xs:max-w-3xl`}>
      {sessionError && (
        <button
          className="rounded-md p-1 ring-2 ring-slate-500 hover:ring-red-500"
          onClick={closeNotificationHandler}>
          <CloseIcon className="h-5 w-5" />
        </button>
      )}
      <div aria-label="notification-content" className={`flex-center w-full gap-4 pr-11`}>
        {notification}
      </div>
    </div>
  );

  const notificationEl = document.getElementById('notification-root') as HTMLDivElement;
  return notification || sessionError ? createPortal(content, notificationEl) : null;
};
