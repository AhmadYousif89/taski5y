import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { useClickOutside } from 'hooks/use-click-outside';
import { toggleSideMenu } from '@features/slices/ui';
import { useAppDispatch } from '@app/hooks';

import { Card } from '@ui/card';
import { Backdrop } from '@ui/backdrop';
import { ActionModal } from '@ui/action-modal';
import { LogoutIcon, SettingsIcon } from 'assets/icons';

import { resetTasks } from '@features/slices/task';
import { setAuthActionType } from '@features/slices/auth';
import { deleteUser, signOut } from '@features/services/auth';

type Props = { showUserProfile: Dispatch<SetStateAction<boolean>> };

export const UserSettings: FC<Props> = ({ showUserProfile }) => {
  const dispatch = useAppDispatch();
  const settingRef = useRef<HTMLButtonElement>(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [modal, setModal] = useState(false);

  useClickOutside(settingRef, () => setToggleMenu(false));

  const logoutHandler = () => {
    dispatch(signOut());
    dispatch(resetTasks());
    dispatch(setAuthActionType('logout'));
  };

  const deleteAccountHandler = () => {
    dispatch(setAuthActionType('delete'));
    dispatch(toggleSideMenu());
    dispatch(resetTasks());
    dispatch(deleteUser());
    setModal(false);
  };

  const settingList = (
    <Card className="absolute top-full -translate-x-1/2 translate-y-1 transition-all">
      <ul className="grid auto-cols-[minmax(max-content,1fr)] gap-6 text-2xl text-color-base">
        <li
          onClick={() => showUserProfile(true)}
          className="rounded-md p-2 ring-color-base hover:ring-2 hover:ring-color-highlight">
          <span onClick={() => dispatch(toggleSideMenu())}>Manage account</span>
        </li>
        <li
          className="rounded-md p-2 ring-color-base hover:ring-2 hover:ring-color-highlight"
          onClick={() => setModal(true)}>
          <span className="text-red-500">Delete account</span>
        </li>
        <li
          className="flex-center gap-4 rounded-md p-2 ring-color-base hover:ring-2 hover:ring-color-highlight"
          onClick={() => logoutHandler()}>
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
        ref={settingRef}
        onClick={() => setToggleMenu(p => !p)}
        className="btn-circle flex-center relative">
        <SettingsIcon />
        {toggleMenu && <>{settingList}</>}
      </button>
    </section>
  );
};
