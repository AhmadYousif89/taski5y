import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { toggleSideMenu } from '@features/slices/ui';

import { Card } from '@ui/card';
import { resetTasks } from '@features/slices/task';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { setAuthActionType } from '@features/slices/auth';
import { useClickOutside } from 'hooks/use-click-outside';
import { deleteUser } from '@features/services/auth';
import { SettingsIcon } from 'assets/icons';
import { ActionModal } from '@ui/action-modal';
import { Backdrop } from '@ui/backdrop';

type Props = { showUserProfile: Dispatch<SetStateAction<boolean>> };

export const UserSettings = ({ showUserProfile }: Props) => {
  const dispatch = useAppDispatch();
  const settingRef = useRef<HTMLButtonElement>(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [modal, setModal] = useState(false);

  useClickOutside(settingRef, () => setToggleMenu(false));

  const deleteAccountHandler = () => {
    dispatch(setAuthActionType('delete'));
    dispatch(toggleSideMenu());
    setModal(false);
    dispatch(resetTasks());
    dispatch(deleteUser());
  };

  const settingList = (
    <Card className="absolute top-1/2 z-20 translate-x-1/2 transition-all">
      <ul className="grid auto-cols-[minmax(max-content,1fr)] gap-6 text-2xl text-color-base">
        <li
          onClick={() => showUserProfile(true)}
          className="rounded-md p-2 ring-color-base hover:ring-2 hover:ring-color-highlight">
          <span>Manage account</span>
        </li>
        <li
          className="rounded-md p-2 ring-color-base hover:ring-2 hover:ring-color-highlight"
          onClick={() => setModal(true)}>
          <span className="text-red-500">Delete account</span>
        </li>
      </ul>
    </Card>
  );

  return (
    <section aria-label="user-setting-menu" className="absolute top-14 left-5">
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
        onClick={() => setToggleMenu(p => !p)}
        ref={settingRef}
        className="btn-circle relative flex items-center justify-center">
        <SettingsIcon />
        {toggleMenu && <>{settingList}</>}
      </button>
    </section>
  );
};
