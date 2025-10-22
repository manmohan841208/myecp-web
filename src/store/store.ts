import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import { authApi } from './services/authApi';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
