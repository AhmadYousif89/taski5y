import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import appLogo from 'assets/logo.png';
import { TaskForm } from 'components/tasks';
import { UserSettings, UserInfo, UserProfile } from 'components/users';
import { ThemeSwitcher, Menu, Button } from 'components/ui';

import { useAuth } from 'hooks';
import { useAppSelector } from 'app/hooks';
import { toggleProfile, uiSelector } from 'features/slices/ui';

export const AppLayout = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { profileIsVisible } = useAppSelector(uiSelector);

  return (
    <>
      <main aria-label="main-container" className={`flex min-h-[inherit] flex-col bg-color-base`}>
        <header className="relative bg-color-card py-8 shadow-md">
          {user ? (
            <span className="absolute top-1/2 left-[3%] z-10 translate-x-5 -translate-y-1/2 xs:left-[6%] lg:left-[9%]">
              <ThemeSwitcher />
            </span>
          ) : null}
          <h1 className="mx-auto flex w-fit items-center gap-2 text-3xl capitalize text-color-base md:text-4xl">
            <span>Taskify</span>
            <img src={appLogo} alt="logo" width={30} />
          </h1>
          {user ? <UserSettings /> : null}
        </header>

        <Menu aria-label="task-menu" className="[&>*]:mx-16 max-xs:[&>*]:mx-4">
          <UserInfo user={user} />
          {profileIsVisible ? <UserProfile /> : <TaskForm />}
          {!profileIsVisible && (
            <Button
              label="Manage account"
              title="go to user settings"
              className="mt-12 self-center"
              onClick={() => dispatch(toggleProfile(true))}
            />
          )}
        </Menu>

        <Outlet />
      </main>
    </>
  );
};
