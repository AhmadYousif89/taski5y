import { RootState } from 'app/store';
import { createSlice } from '@reduxjs/toolkit';

import { AppTheme, UIState } from 'features/types';
import { modifyLocalStorage } from 'helpers/modify-local-storage';

const storedTheme = modifyLocalStorage({ action: 'get', key: 'mode' }) as AppTheme;

const initialState: UIState = {
  mode: storedTheme ? storedTheme : 'dark-theme',
  menuIsVisible: false,
  profileIsVisible: false,
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
    setProfile(state, { payload }: { payload: boolean }) {
      state.profileIsVisible = payload;
    },
  },
});

export const { toggleSideMenu, toggleAppTheme, setProfile } = uiSlice.actions;
export const uiSelector = (state: RootState) => state.ui;
export default uiSlice.reducer;
