import { MutableRefObject, useState } from 'react';

import { useEventListener } from 'hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { toggleAppTheme, uiSelector } from 'features/slices/ui';
import { SunIcon, MoonIcon, DeviceIcon } from 'assets/icons';
import { modifyLocalStorage } from 'helpers';
import { Card } from './card';

export const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(uiSelector);
  const [toggleMenu, setToggleMenu] = useState(false);

  const themeRef = useEventListener({
    insideElement: () => setToggleMenu(!toggleMenu),
    outsideElement: () => setToggleMenu(false)
  });

  const animateMoonIcon = theme === 'dark' ? 'translate-x-1/2' : '-translate-x-20';
  const animateSunIcon = theme === 'light' ? '-translate-x-1/2' : 'translate-x-20';
  const animateDeviceIcon = theme === 'device' ? '-translate-y-1/2' : 'translate-y-full';

  const onDark = () => {
    dispatch(toggleAppTheme('dark'));
    document.documentElement.className = 'dark';
  };
  const onLight = () => {
    dispatch(toggleAppTheme('light'));
    document.documentElement.classList.remove('dark');
  };
  const onDevice = () => {
    dispatch(toggleAppTheme('device'));
    modifyLocalStorage({ action: 'remove', key: 'theme' });
    matchMedia('(prefers-color-scheme: dark)').matches
      ? (document.documentElement.className = 'dark')
      : document.documentElement.classList.remove('dark');
  };

  const themeList = (
    <Card className="absolute top-10 w-52 py-4 ring-1 ring-color-base">
      <ul
        aria-label="theme-switcher"
        className="grid auto-cols-[minmax(max-content,1fr)] gap-4 py-2 text-xl text-color-base">
        <li onClick={onDark} className="li-item flex cursor-pointer">
          <MoonIcon className={`${theme === 'dark' ? 'stroke-indigo-400' : ''}`} />
          <button className={`${theme === 'dark' ? 'text-stroke-indigo-400' : ''} w-full`}>
            dark
          </button>
        </li>
        <li onClick={onLight} className="li-item flex cursor-pointer">
          <SunIcon className={`${theme === 'light' ? 'stroke-amber-500' : ''}`} />
          <button className={`${theme === 'light' ? 'text-amber-500' : ''} w-full`}>light</button>
        </li>
        <li onClick={onDevice} className="li-item flex cursor-pointer">
          <DeviceIcon
            className={`${
              theme === 'device'
                ? matchMedia('(prefers-color-scheme : dark)').matches
                  ? 'stroke-indigo-400'
                  : 'stroke-amber-500'
                : ''
            }`}
          />
          <button
            className={`w-full ${
              theme === 'device'
                ? matchMedia('(prefers-color-scheme : dark)').matches
                  ? 'text-stroke-indigo-400'
                  : 'text-amber-500'
                : ''
            }`}>
            device
          </button>
        </li>
      </ul>
    </Card>
  );

  return (
    <>
      <button
        ref={themeRef as MutableRefObject<HTMLButtonElement>}
        className="btn-circle center-absolute overflow-hidden transition-all"
        title={'switch app theme'}>
        <SunIcon
          className={`absolute top-1/2 left-1/2 -translate-y-1/2 stroke-amber-500 transition-transform duration-500 ${animateSunIcon}`}
        />
        <MoonIcon
          className={`absolute top-1/2 right-1/2 -translate-y-1/2 stroke-indigo-400 transition-transform duration-500 ${animateMoonIcon}`}
        />
        <DeviceIcon
          className={`absolute top-1/2 right-1/2 translate-x-1/2 ${
            matchMedia('(prefers-color-scheme : dark)').matches
              ? 'stroke-indigo-400'
              : 'stroke-amber-500'
          } transition-transform duration-500 ${animateDeviceIcon}`}
        />
      </button>
      {toggleMenu && themeList}
    </>
  );
};
