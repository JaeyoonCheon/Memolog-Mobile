import {configureStore} from '@reduxjs/toolkit';

import ModalSlice from './modalSlice';
import UserSlice from './userSlice';

const store = configureStore({
  reducer: {modal: ModalSlice, user: UserSlice},
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
