import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { toggleSideMenu, uiSelector } from '@features/slices/ui';
import { useAppDispatch, useAppSelector, useAuth } from '@app/hooks';

import { ThemeSwitcher } from '@ui/theme-switcher';
import { MenuButton } from '@ui/menu-button';
import { Backdrop } from '@ui/backdrop';
import { Menu } from '@ui/menu';

import { Logout } from '@auth/logout';
import { TaskForm } from '@tasks/task-form';
import { UserInfo } from '@users/user-info';
import { UserSettings } from '@users/user-settings';
import { UserProfile } from '@users/user-profile';

export const AppLayout = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [showProfile, setShowProfile] = useState(false);
  const { mode, menuVisibility } = useAppSelector(uiSelector);
  const sessionExpired = JSON.parse(localStorage.getItem('error') as string);

  const sessionExpireMsg = (
    <p className="absolute top-full left-1/2 mx-auto mt-10 w-full max-w-md -translate-x-1/2 rounded-lg bg-slate-800 p-6 text-3xl text-sky-300">
      Your last session was expired
    </p>
  );

  return (
    <main className={`${mode} flex min-h-[inherit] flex-col bg-color-base`}>
      <header className="relative bg-color-card py-8 shadow-md">
        <ThemeSwitcher />
        <h1 className="mx-auto w-fit text-center text-3xl capitalize text-color-base md:text-5xl">
          📑 personal task manager
        </h1>
        {user ? <MenuButton /> : null}
        {sessionExpired && sessionExpireMsg}
      </header>

      <Menu aria-label="menu" className="fixed [&>*]:mx-12">
        <UserSettings showUserProfile={setShowProfile} />
        <UserInfo user={user} />
        {showProfile ? <UserProfile showUserProfile={setShowProfile} /> : <TaskForm />}
        <Logout />
        {menuVisibility ? <Backdrop onClick={() => dispatch(toggleSideMenu())} /> : null}
      </Menu>

      <Outlet />
    </main>
  );
};
