import { PropsWithChildren, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { toggleSideMenu, uiSelector } from '@features/slices/ui';
import { Backdrop } from './backdrop';

interface SideMenuProps extends PropsWithChildren {
  className?: string;
}

export const Menu = ({ children, className }: SideMenuProps) => {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const { menuIsVisible } = useAppSelector(uiSelector);

  const animateMenu = menuIsVisible
    ? 'translate-y-0 opacity-100 visible'
    : '-translate-y-full opacity-0 invisible';

  useEffect(() => {
    menuRef.current?.focus();
    if (menuIsVisible === false) menuRef.current?.blur();
  }, [menuIsVisible]);

  return (
    <>
      <aside
        ref={menuRef}
        tabIndex={-1}
        onKeyDown={e => (e.key === 'Escape' ? dispatch(toggleSideMenu()) : null)}
        className={`${className} ${animateMenu} fixed top-0 left-1/2 z-20 flex min-h-screen w-full origin-top -translate-x-1/2 flex-col bg-color-card shadow-md transition-all duration-700 md:w-2/3 lg:w-4/12 lg:min-w-[50rem]`}>
        <button
          type={'button'}
          className="btn-circle absolute top-14 right-0 text-xl font-bold text-color-base"
          onClick={() => dispatch(toggleSideMenu())}>
          <span className="center-absolute">Esc</span>
        </button>
        {children}
      </aside>
      {menuIsVisible ? <Backdrop onClick={() => dispatch(toggleSideMenu())} /> : null}
    </>
  );
};
