import { RootState } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppTheme, UIState } from 'features/types';
import { modifyLocalStorage } from 'helpers';

const storedTheme = modifyLocalStorage({ action: 'get', key: 'theme' });

const initialState: UIState = {
  theme: storedTheme ?? 'device',
  menuIsVisible: false,
  profileIsVisible: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleAppTheme(state, { payload }: PayloadAction<AppTheme>) {
      state.theme = payload;
      if (payload) modifyLocalStorage({ action: 'set', key: 'theme', value: state.theme });
    },
    toggleSideMenu(state) {
      state.menuIsVisible = !state.menuIsVisible;
    },
    toggleProfile(state, { payload }: PayloadAction<boolean>) {
      state.profileIsVisible = payload;
    }
  }
});

export const { toggleSideMenu, toggleAppTheme, toggleProfile } = uiSlice.actions;
export const uiSelector = (state: RootState) => state.ui;
export default uiSlice.reducer;
