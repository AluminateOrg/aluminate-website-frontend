import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from './paymentSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    payment: paymentReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
