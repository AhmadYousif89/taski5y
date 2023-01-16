import { MutableRefObject, useState } from 'react';

import { useAppDispatch } from 'app/hooks';
import { LogoutIcon, SettingsIcon } from 'assets/icons';
import { Card, ActionModal, Backdrop } from 'components/ui';

import { useEventListener } from 'hooks';
import { resetTasks } from 'features/slices/task';
import { setAuthActionType } from 'features/slices/auth';
import { signOut, deleteUser } from 'features/services/auth';
import { toggleProfile, toggleSideMenu } from 'features/slices/ui';

export const UserSettings = () => {
  const dispatch = useAppDispatch();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [modal, setModal] = useState(false);

  const settingRef = useEventListener({
    insideElement: () => setToggleMenu(true),
    outsideElement: () => setToggleMenu(false)
  });

  const logoutHandler = () => {
    dispatch(signOut());
    dispatch(resetTasks());
    dispatch(setAuthActionType('sign_out'));
  };

  const deleteAccountHandler = () => {
    dispatch(setAuthActionType('delete_account'));
    dispatch(resetTasks());
    dispatch(deleteUser());
    setModal(false);
  };

  const settingList = (
    <Card className="absolute top-full -translate-x-1/2 translate-y-3 ring-1 ring-color-base transition-all">
      <ul
        aria-label="account-setting-menu"
        className="grid auto-cols-[minmax(max-content,1fr)] gap-6 py-2 text-xl text-color-base">
        <li
          onClick={() => {
            dispatch(toggleProfile(true));
            dispatch(toggleSideMenu());
          }}
          className="li-item">
          <span>Manage account</span>
        </li>
        <li className="li-item" onClick={() => setModal(true)}>
          <span className="text-red-500">Delete account</span>
        </li>
        <li className="li-item flex-center gap-4" onClick={() => logoutHandler()}>
          <LogoutIcon />
          <span>Logout</span>
        </li>
      </ul>
    </Card>
  );

  return (
    <section
      aria-label="user-setting-menu"
      className="absolute top-1/2 right-[15%] z-10 -translate-y-1/2">
      {modal ? (
        <>
          <ActionModal
            msg="Delete this account with all related tasks ?"
            confirmAction={deleteAccountHandler}
            closeModal={() => setModal(false)}
          />
          <Backdrop className="!z-30" onClick={() => setModal(false)} />
        </>
      ) : null}
      <button
        type={'button'}
        title="settings"
        ref={settingRef as MutableRefObject<HTMLButtonElement>}
        onClick={() => setToggleMenu(p => !p)}
        className="btn-circle flex-center relative">
        <SettingsIcon />
        {toggleMenu && <>{settingList}</>}
      </button>
    </section>
  );
};
