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
    <Card className="absolute top-full -translate-x-1/2 translate-y-3 py-4 ring-1 ring-color-base">
      <ul
        aria-label="user-settings"
        className="grid auto-cols-[minmax(max-content,1fr)] gap-4 py-2 text-xl text-color-base">
        <button
          onClick={() => {
            dispatch(toggleProfile(true));
            dispatch(toggleSideMenu());
          }}
          className="li-item">
          <span>Manage account</span>
        </button>
        <button className="li-item" onClick={() => setModal(true)}>
          <span className="text-red-500">Delete account</span>
        </button>
        <button className="li-item flex-center gap-4" onClick={() => logoutHandler()}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </ul>
    </Card>
  );

  const displayModal = modal ? (
    <>
      <ActionModal
        message="Delete this account with all related tasks ?"
        confirmAction={deleteAccountHandler}
        closeModal={() => setModal(false)}
      />
      <Backdrop className="!z-30" onClick={() => setModal(false)} />
    </>
  ) : null;

  return (
    <section
      aria-label="user-setting-menu"
      className="absolute top-1/2 right-[3%] z-10 -translate-y-1/2  xs:right-[6%] lg:right-[9%]">
      {displayModal}
      <div
        title="settings"
        ref={settingRef as MutableRefObject<HTMLDivElement>}
        onClick={() => setToggleMenu(p => !p)}
        className="btn-circle flex-center relative">
        <button className="rounded-full">
          <SettingsIcon />
        </button>
        {toggleMenu && <>{settingList}</>}
      </div>
    </section>
  );
};
