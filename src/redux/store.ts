import {configureStore} from '@reduxjs/toolkit';
import {composeWithDevTools} from '@reduxjs/toolkit/dist/devtoolsExtension';

import ModalSlice from './modalSlice';

const store = configureStore({
  reducer: {modal: ModalSlice},
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
