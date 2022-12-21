import { Dispatch, SetStateAction } from 'react';

import { toggleSideMenu, uiSelector } from '@features/slices/ui';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { MenuIcon, CloseIcon } from 'assets/icons';

type Props = { setShowProfile: Dispatch<SetStateAction<boolean>> };

export const MenuButton = ({ setShowProfile }: Props) => {
  const dispatch = useAppDispatch();
  const { menuIsVisible } = useAppSelector(uiSelector);

  const onClickHandler = () => {
    dispatch(toggleSideMenu());
    setShowProfile(false);
  };

  return (
    <button
      type={'button'}
      title="menu button"
      onClick={onClickHandler}
      className="btn-circle absolute top-1/2 right-[3%] z-10 flex h-full w-full -translate-y-1/2 items-center text-color-base transition-all xs:right-[6%] lg:right-[9%]">
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
  );
};
