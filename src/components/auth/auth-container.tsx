import { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

import { path } from 'components/app';
import { Card, ThemeSwitcher } from 'components/ui';

export const AuthContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="mx-4 translate-y-40" aria-label="auth-container">
      <Card className="relative mx-auto flex max-w-2xl flex-col items-center">
        <div className="relative flex w-10/12 items-center justify-between py-8 ">
          <NavLink
            to={path.register}
            className={({ isActive }) =>
              isActive
                ? 'border-b border-sky-500 pb-4 [&>*]:text-color-link'
                : 'border-b border-neutral-400 pb-4'
            }>
            <span className="text-2xl tracking-wide text-color-base hover:text-color-link">
              Sign Up
            </span>
          </NavLink>

          <span className="center-absolute z-10">
            <ThemeSwitcher />
          </span>

          <NavLink
            to={path.login}
            className={({ isActive }) =>
              isActive
                ? 'border-b border-sky-500 pb-4 [&>*]:text-color-link'
                : 'border-b border-neutral-400 pb-4'
            }>
            <span className="text-2xl tracking-wide text-color-base hover:text-color-link">
              Sign In
            </span>
          </NavLink>
        </div>
        {children}
      </Card>
    </section>
  );
};
