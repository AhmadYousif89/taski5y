import { PropsWithChildren, useEffect, useRef } from 'react';

import { CloseIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { toggleSideMenu, uiSelector } from '@features/slices/ui';

interface SideMenuProps extends PropsWithChildren {
  className?: string;
}

export const Menu = ({ children, className }: SideMenuProps) => {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const { menuVisibility: sideMenuVisibility } = useAppSelector(uiSelector);

  const animateMenu = sideMenuVisibility
    ? 'translate-y-0 opacity-100'
    : '-translate-y-full opacity-0';

  useEffect(() => {
    if (sideMenuVisibility === false) {
      menuRef?.current?.blur();
      return;
    }
    menuRef?.current?.focus();
  }, [sideMenuVisibility]);

  return (
    <aside
      ref={menuRef}
      tabIndex={0}
      onKeyDown={e => (e.key === 'Escape' ? dispatch(toggleSideMenu()) : null)}
      className={`${className} ${animateMenu} fixed top-0 left-1/2 z-30 flex min-h-screen w-full origin-top -translate-x-1/2 flex-col bg-color-card bg-opacity-95 shadow-md transition-all duration-700 focus:outline-none md:w-2/3 lg:w-4/12 lg:min-w-[50rem]`}>
      <button
        type={'button'}
        className="btn-circle absolute top-14 right-0 flex items-center justify-center text-4xl text-color-base md:hidden"
        onClick={() => dispatch(toggleSideMenu())}>
        <CloseIcon />
      </button>
      {children}
    </aside>
  );
};
