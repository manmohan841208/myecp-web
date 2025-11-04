import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isFlutterApp: boolean | undefined;
}

const initialState: AppState = {
  isFlutterApp: false, // Default value
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFlutterAppStatus: (state, action: PayloadAction<boolean>) => {
      state.isFlutterApp = action.payload;
    },
  },
});

export const { setFlutterAppStatus } = appSlice.actions;

export default appSlice.reducer;
