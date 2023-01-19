import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import appLogo from 'assets/logo.png';
import { TaskForm } from 'components/tasks';
import { UserSettings, UserInfo, UserProfile } from 'components/users';
import { ThemeSwitcher, MenuButton, Menu, Button } from 'components/ui';

import { useAuth } from 'hooks';
import { useAppSelector } from 'app/hooks';
import { toggleProfile, uiSelector } from 'features/slices/ui';

export const AppLayout = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { mode, profileIsVisible } = useAppSelector(uiSelector);

  return (
    <>
      <main
        aria-label="main-container"
        className={`${mode} flex min-h-[inherit] flex-col bg-color-base`}>
        <header className="relative bg-color-card py-8 shadow-md">
          {user ? <ThemeSwitcher /> : null}
          <h1 className="mx-auto flex w-fit items-center gap-2 text-3xl capitalize text-color-base md:text-4xl">
            <span>Taskify</span>
            <img src={appLogo} alt="logo" width={30} />
          </h1>
          {user ? <UserSettings /> : null}
          {user ? <MenuButton /> : null}
        </header>

        <Menu aria-label="task-menu" className="[&>*]:mx-12">
          <UserInfo user={user} />
          {profileIsVisible ? <UserProfile /> : <TaskForm />}
          {!profileIsVisible && (
            <Button
              label="Manage account"
              title="go to user settings"
              className="mt-24 self-center"
              onClick={() => dispatch(toggleProfile(true))}
            />
          )}
        </Menu>

        <Outlet />
      </main>
    </>
  );
};
