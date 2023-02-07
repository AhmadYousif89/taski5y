import { MutableRefObject, useState } from 'react';

import { useEventListener } from 'hooks';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { toggleAppTheme, uiSelector } from 'features/slices/ui';
import { SunIcon, MoonIcon } from 'assets/icons';
import { Card } from './card';

export const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(uiSelector);
  const [toggleMenu, setToggleMenu] = useState(false);

  const themeRef = useEventListener({
    insideElement: () => setToggleMenu(!toggleMenu),
    outsideElement: () => setToggleMenu(false)
  });

  const animateDarkIcon = theme?.includes('dark') ? '-translate-x-1/2' : '-translate-x-20';
  const animateLightIcon = theme?.includes('light') ? 'translate-x-1/2' : 'translate-x-20';

  const themeList = (
    <Card className="absolute top-10 w-48 py-4 ring-1 ring-color-base">
      <ul
        aria-label="theme-switcher"
        className="grid auto-cols-[minmax(max-content,1fr)] gap-4 py-2 text-xl text-color-base">
        <li onClick={() => dispatch(toggleAppTheme('dark'))} className="li-item">
          <button className={`${theme === 'dark' ? 'text-indigo-500' : ''} w-full`}>dark</button>
        </li>
        <li onClick={() => dispatch(toggleAppTheme('light'))} className="li-item">
          <button className={`${theme === 'light' ? 'text-indigo-500' : ''} w-full`}>light</button>
        </li>
        <li
          onClick={() => {
            matchMedia('(prefers-color-scheme: dark)').matches
              ? dispatch(toggleAppTheme('system dark'))
              : dispatch(toggleAppTheme('system light'));
          }}
          className="li-item">
          <button className={`${theme?.includes('system') ? 'text-indigo-500' : ''} w-full`}>
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
        title={`let it be ${theme.includes('dark') ? 'light' : 'dark'}`}>
        <SunIcon
          className={`icon absolute top-1/2 left-1/2 -translate-y-1/2 stroke-color-base transition-transform duration-500 ${animateDarkIcon}`}
        />
        <MoonIcon
          className={`icon absolute top-1/2 right-1/2 -translate-y-1/2 stroke-color-base transition-transform duration-500 ${animateLightIcon}`}
        />
      </button>
      {toggleMenu && themeList}
    </>
  );
};
