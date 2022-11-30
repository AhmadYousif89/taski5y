import { useState } from 'react';
import { useAppSelector, useAuth } from '@app/hooks';
import { uiSelector } from '@features/slices/ui';

import { ThemeSwitcher } from '@ui/theme-switcher';
import { MenuButton } from '@ui/menu-button';
import { Backdrop } from '@ui/backdrop';
import { Menu } from '@ui/menu';

import { Logout } from '@auth/logout';
import { TaskForm } from '@tasks/task-form';
import { UserInfo } from '@users/user-info';
import { UserMenu } from '@users/user-menu';
import { UserProfile } from '@users/user-profile';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  const { user } = useAuth();
  const { mode } = useAppSelector(uiSelector);
  const { menuVisibility } = useAppSelector(uiSelector);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <main className={`${mode} flex min-h-[inherit] flex-col bg-color-base`}>
      <header className="relative bg-color-card py-8 shadow-md">
        {user ? <MenuButton /> : null}
        <ThemeSwitcher />
        <h1 className="mx-auto w-fit text-center text-3xl capitalize text-color-base md:text-5xl">
          personal task manager
        </h1>

        <div aria-label="menu" className="relative">
          <Menu className="[&>*]:mx-12">
            <div className="absolute top-14 left-5">
              <UserMenu showUserProfile={setShowProfile} />
            </div>
            <UserInfo user={user} />
            {showProfile ? (
              <UserProfile showUserProfile={setShowProfile} />
            ) : (
              <TaskForm />
            )}
            <div className="mt-16 flex justify-between" aria-label="profile">
              <Logout />
            </div>
          </Menu>
          {menuVisibility ? <Backdrop /> : null}
        </div>
      </header>

      <Outlet />
    </main>
  );
};
