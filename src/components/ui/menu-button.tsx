import { toggleSideMenu, uiSelector } from '@features/slices/ui';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { MenuIcon, CloseIcon } from 'assets/icons';
import { Dispatch, SetStateAction } from 'react';

type Props = { setShowProfile: Dispatch<SetStateAction<boolean>> };

export const MenuButton = ({ setShowProfile }: Props) => {
  const dispatch = useAppDispatch();
  const { menuIsVisible } = useAppSelector(uiSelector);

  const onClickHandler = () => {
    dispatch(toggleSideMenu());
    setShowProfile(false);
  };

  return (
    <div
      aria-label="menu-button"
      onClick={onClickHandler}
      className="btn-circle absolute top-1/2 right-[3%] z-10 flex -translate-y-1/2 items-center transition-all xs:right-[6%] lg:right-[9%]">
      <button type={'button'} className="relative h-full w-full text-color-base">
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
