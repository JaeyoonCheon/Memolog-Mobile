import {createSlice} from '@reduxjs/toolkit';

const name = 'user';

export interface UserState {
  state: 'idle' | 'loading' | 'online';
  info: UserInfo;
  token: string;
}
export interface UserInfo {
  id?: number;
  name?: string;
  email?: string;
  nickname?: string;
  profile_image_url?: string;
}

const initialState: UserState = {
  state: 'idle',
  info: {},
  token: '',
};

const UserSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      const accessToken = action.payload;

      state.token = accessToken;
    },
    setUserInfo: (state, action) => {
      const userInfo = action.payload;

      state.info = userInfo;
    },
  },
});

export const {setAccessToken, setUserInfo} = UserSlice.actions;
export default UserSlice.reducer;
