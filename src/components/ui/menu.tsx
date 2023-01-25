import { FC, PropsWithChildren, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { toggleSideMenu, uiSelector } from 'features/slices/ui';
import { Backdrop } from './backdrop';

type SideMenuProps = {
  className?: string;
};

export const Menu: FC<PropsWithChildren<SideMenuProps>> = ({ children, className }) => {
  const dispatch = useAppDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const { menuIsVisible } = useAppSelector(uiSelector);

  const animateMenu = menuIsVisible
    ? 'translate-y-0 opacity-100 visible'
    : '-translate-y-full opacity-0 invisible';

  useEffect(() => {
    const ref = menuRef.current;
    const focusMenu = () => menuRef.current?.focus();
    ref?.addEventListener('transitionrun', focusMenu);

    const toggleMenu = (e: KeyboardEvent) =>
      e.key === 'Escape' ? dispatch(toggleSideMenu()) : null;
    if (document.activeElement === ref) {
      ref?.addEventListener('keydown', toggleMenu);
    }

    return () => {
      ref?.removeEventListener('transitionrun', focusMenu);
      ref?.removeEventListener('keydown', toggleMenu);
    };
  }, [dispatch]);

  return (
    <>
      <div
        ref={menuRef}
        tabIndex={0}
        className={`${className} ${animateMenu} fixed top-0 left-1/2 z-30 flex min-h-screen w-full max-w-5xl origin-top -translate-x-1/2 flex-col bg-color-card shadow-md transition-all duration-700`}>
        <button
          type={'button'}
          className="btn-circle absolute top-14 right-0 text-xl font-bold text-color-base"
          onClick={() => dispatch(toggleSideMenu())}>
          <span className="center-absolute" title="close menu">
            Esc
          </span>
        </button>
        {children}
      </div>
      {menuIsVisible ? <Backdrop onClick={() => dispatch(toggleSideMenu())} /> : null}
    </>
  );
};
