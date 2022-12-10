import { toggleSideMenu, uiSelector } from '@features/slices/ui';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { MenuIcon, CloseIcon } from 'assets/icons';

export const MenuButton = () => {
  const dispatch = useAppDispatch();
  const { menuIsVisible } = useAppSelector(uiSelector);

  return (
    <div
      aria-label="menu-button"
      onClick={() => dispatch(toggleSideMenu())}
      className="btn-circle absolute top-6 right-4 z-10 flex scale-[.8] items-center transition-all xs:scale-100 md:right-16 md:top-8 lg:right-1/4">
      <button type={'button'} className="relative w-full text-color-base">
        {menuIsVisible ? (
          <span className="center-absolute">
            <CloseIcon />
          </span>
        ) : (
          <span className="center-absolute">
            <MenuIcon />
          </span>
        )}
      </button>
    </div>
  );
};
