import {createSlice} from '@reduxjs/toolkit';
import {Token} from 'auth';

const name = 'auth';

export interface AuthState {
  token: Token | null;
  authState: 'unauthorized' | 'authorizing' | 'authorized';
}

const initialState: AuthState = {
  token: null,
  authState: 'authorizing',
};

const authSlice = createSlice({
  name: name,
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      const {authState} = action.payload;
      state.authState = authState;
    },
    setToken: (state, action) => {
      const {accessToken} = action.payload;
      state.token = {...state.token, accessToken};
      if (action.payload.refreshToken) {
        state.token = {
          ...state.token,
          refreshToken: action.payload.refreshToken,
        };
      }
    },
  },
});

export const {setAuthState, setToken} = authSlice.actions;
export default authSlice.reducer;
