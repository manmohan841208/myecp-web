import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
// import promotionReducer from './slices/promotionSlice';
import { authApi } from './services/authApi';
import { promotionApi } from './services/promotionsApi';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    // promotion: promotionReducer,
    [authApi.reducerPath]: authApi.reducer,
    [promotionApi.reducerPath]: promotionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
