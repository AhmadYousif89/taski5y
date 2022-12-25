import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { TaskForm } from 'components/tasks';
import { ThemeSwitcher, MenuButton, Menu, Button } from 'components/ui';
import { UserSettings, UserInfo, UserProfile } from 'components/users';

import { useAuth, useAppSelector } from 'app/hooks';
import { uiSelector } from 'features/slices/ui';

import appLogo from 'assets/logo.png';

export const AppLayout = () => {
  const { user } = useAuth();
  const { mode } = useAppSelector(uiSelector);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <main
      aria-label="main-container"
      className={`${mode} flex min-h-[inherit] flex-col bg-color-base`}>
      <header className="relative bg-color-card py-8 shadow-md">
        {user ? <ThemeSwitcher /> : null}
        <h1 className="mx-auto flex w-fit items-center gap-2 text-3xl capitalize text-color-base md:text-4xl">
          <span>Taskify</span>
          <img src={appLogo} alt="logo" width={30} />
        </h1>
        {user ? <MenuButton setShowProfile={setShowProfile} /> : null}
        {user ? <UserSettings showUserProfile={setShowProfile} /> : null}
      </header>

      <Menu aria-label="task-menu" className="[&>*]:mx-12">
        <UserInfo user={user} />
        {showProfile ? <UserProfile showUserProfile={setShowProfile} /> : <TaskForm />}
        {!showProfile && (
          <Button
            label="Manage account"
            title="go to user settings"
            className="mt-24 self-center"
            onClick={() => setShowProfile(true)}
          />
        )}
      </Menu>

      <Outlet />
    </main>
  );
};
