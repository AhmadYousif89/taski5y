import { toggleAppTheme, uiSelector } from '@features/slices/ui';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { SunIcon, MoonIcon } from 'assets/icons';

export const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(uiSelector);

  const animateDarkIcon = mode === 'dark-theme' ? '-translate-x-1/2' : '-translate-x-20';
  const animateLightIcon = mode === 'light-theme' ? 'translate-x-1/2' : 'translate-x-20';

  const isTouchDevice = 'ontouchstart' in document.documentElement;

  return (
    <button
      type={'button'}
      className="btn-circle absolute top-1/2 left-[3%] h-full w-full -translate-y-1/2 overflow-hidden transition-all xs:left-[6%] lg:left-[9%]"
      title={`switch to ${mode === 'dark-theme' ? 'light' : 'dark'} mode`}
      onClick={() => {
        if (!isTouchDevice) dispatch(toggleAppTheme());
      }}
      onTouchStart={() => {
        if (isTouchDevice) dispatch(toggleAppTheme());
      }}>
      <SunIcon
        className={`icon absolute top-1/2 left-1/2 -translate-y-1/2 stroke-color-base transition-transform duration-500 ${animateDarkIcon}`}
      />
      <MoonIcon
        className={`icon absolute top-1/2 right-1/2 -translate-y-1/2 stroke-color-base transition-transform duration-500 ${animateLightIcon}`}
      />
    </button>
  );
};
