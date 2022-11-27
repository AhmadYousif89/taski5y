import { Dispatch, SetStateAction, useRef, useState } from 'react';

import { Card } from '@ui/card';
import { useAppDispatch } from '@app/hooks';
import { signOut } from '@features/services/auth';
import { resetUser } from '@features/slices/user';
import { resetTasks } from '@features/slices/task';
import { toggleSideMenu } from '@features/slices/ui';
import { deleteUser } from '@features/services/user';
import { useClickOutside } from 'hooks/use-click-outside';
import { SettingsIcon } from 'assets/icons';

export const UserMenu = ({
  showUserProfile,
}: {
  showUserProfile: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  const settingRef = useRef<HTMLButtonElement>(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  const openMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };
  const closeMenuHandler = () => {
    setToggleMenu(false);
  };
  useClickOutside(settingRef, closeMenuHandler);

  const deleteAccountHandler = () => {
    const confirm = window.confirm(
      'You are about to delete your account and all related tasks, Are you sure about this action?',
    );
    if (!confirm) return;
    dispatch(toggleSideMenu());
    dispatch(resetTasks());
    dispatch(signOut());
    dispatch(deleteUser()).then(() => dispatch(resetUser()));
  };

  const settingList = (
    <Card className="absolute top-1/2 z-10 translate-x-1/2 transition-all">
      <ul className="grid auto-cols-[minmax(max-content,1fr)] gap-6 text-2xl text-color-base">
        <li
          onClick={() => showUserProfile(true)}
          className="rounded-md p-2 ring-color-base hover:ring-2 hover:ring-color-highlight">
          <span>Manage account</span>
        </li>
        <li
          className="rounded-md p-2 ring-color-base hover:ring-2 hover:ring-color-highlight"
          onClick={deleteAccountHandler}>
          <span className="text-red-500">Delete account</span>
        </li>
      </ul>
    </Card>
  );

  return (
    <button
      onClick={openMenuHandler}
      ref={settingRef}
      className="btn-circle relative flex items-center justify-center">
      <SettingsIcon />
      {toggleMenu && <>{settingList}</>}
    </button>
  );
};
