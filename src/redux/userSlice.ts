import {createSlice} from '@reduxjs/toolkit';

const name = 'user';

export interface UserType {
  authState: 'unauthorized' | 'authorizing' | 'authorized';
}

const initialState: UserType = {
  authState: 'unauthorized',
};

const userSlice = createSlice({
  name: name,
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      const {authState} = action.payload;
      state.authState = authState;
    },
  },
});

export const {setAuthState} = userSlice.actions;
export default userSlice.reducer;
