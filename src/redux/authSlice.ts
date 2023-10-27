import {createSlice} from '@reduxjs/toolkit';

const name = 'auth';

export interface AuthState {
  accessToken: string;
  refreshToken: string;
  authState: 'unauthorized' | 'authorizing' | 'authorized';
}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
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
    setAccessToken: (state, action) => {
      const {accessToken} = action.payload;
      state.accessToken = accessToken;
    },
    setRefreshToken: (state, action) => {
      const {refreshToken} = action.payload;
      state.refreshToken = refreshToken;
    },
    setToken: (state, action) => {
      const {accessToken, refreshToken} = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});

export const {setAuthState, setToken, setAccessToken, setRefreshToken} =
  authSlice.actions;
export default authSlice.reducer;
