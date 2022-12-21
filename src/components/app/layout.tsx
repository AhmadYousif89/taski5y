import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { uiSelector } from '@features/slices/ui';
import { useAppSelector, useAuth } from '@app/hooks';

import appLogo from '../../assets/logo.png';
import { ThemeSwitcher } from '@ui/theme-switcher';
import { MenuButton } from '@ui/menu-button';
import { Menu } from '@ui/menu';

import { Logout } from '@auth/logout';
import { TaskForm } from '@tasks/task-form';
import { UserInfo } from '@users/user-info';
import { UserSettings } from '@users/user-settings';
import { UserProfile } from '@users/user-profile';

export const AppLayout = () => {
  const { user } = useAuth();
  const { mode } = useAppSelector(uiSelector);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <main className={`${mode} flex min-h-[inherit] flex-col bg-color-base`}>
      <header className="relative bg-color-card py-8 shadow-md">
        {user ? <ThemeSwitcher /> : null}
        <h1 className="mx-auto flex w-fit items-center gap-2 text-3xl capitalize text-color-base md:text-4xl">
          <span>Taskify</span>
          <img src={appLogo} alt="logo" width={30} />
        </h1>
        {user ? <MenuButton /> : null}
      </header>

      <Menu aria-label="task-menu" className="[&>*]:mx-12">
        <UserSettings showUserProfile={setShowProfile} />
        <UserInfo user={user} />
        {showProfile ? <UserProfile showUserProfile={setShowProfile} /> : <TaskForm />}
        <Logout />
      </Menu>

      <Outlet />
    </main>
  );
};
