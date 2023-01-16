import { RootState } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppTheme, UIState } from 'features/types';
import { modifyLocalStorage } from 'helpers';

const storedTheme = modifyLocalStorage({ action: 'get', key: 'mode' }) as AppTheme;

const initialState: UIState = {
  mode: storedTheme ? storedTheme : 'dark-theme',
  menuIsVisible: false,
  profileIsVisible: false,
  notificationIsVisible: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleAppTheme(state) {
      state.mode = state.mode === 'dark-theme' ? 'light-theme' : 'dark-theme';
      modifyLocalStorage({ action: 'set', key: 'mode', value: state.mode });
    },
    toggleSideMenu(state) {
      state.menuIsVisible = !state.menuIsVisible;
    },
    toggleProfile(state, { payload }: PayloadAction<boolean>) {
      state.profileIsVisible = payload;
    },
    toggleNotification(state, { payload }: PayloadAction<boolean>) {
      state.notificationIsVisible = payload;
    }
  }
});

export const { toggleSideMenu, toggleAppTheme, toggleProfile, toggleNotification } =
  uiSlice.actions;
export const uiSelector = (state: RootState) => state.ui;
export default uiSlice.reducer;
