import { Dispatch, SetStateAction, useRef, useState } from 'react';

import { Card } from '@ui/card';
import { useAppDispatch } from '@app/hooks';
import { resetTasks } from '@features/slices/task';
import { toggleSideMenu } from '@features/slices/ui';
import { deleteUser } from '@features/services/auth';
import { useClickOutside } from 'hooks/use-click-outside';
import { SettingsIcon } from 'assets/icons';
import { ActionModal } from '@ui/action-modal';

type Props = { showUserProfile: Dispatch<SetStateAction<boolean>> };

export const UserMenu = ({ showUserProfile }: Props) => {
  const dispatch = useAppDispatch();
  const settingRef = useRef<HTMLButtonElement>(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };
  const closeMenuHandler = () => {
    setToggleMenu(false);
  };
  useClickOutside(settingRef, closeMenuHandler);

  const deleteAccountHandler = () => {
    dispatch(toggleSideMenu());
    dispatch(resetTasks());
    dispatch(deleteUser());
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
          onClick={() => setIsDeleting(true)}>
          <span className="text-red-500">Delete account</span>
        </li>
      </ul>
    </Card>
  );

  return (
    <>
      <button
        onClick={openMenuHandler}
        ref={settingRef}
        className="btn-circle relative flex items-center justify-center">
        <SettingsIcon />
        {toggleMenu && <>{settingList}</>}
      </button>
    </>
  );
};
