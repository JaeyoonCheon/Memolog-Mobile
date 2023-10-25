import {createSlice} from '@reduxjs/toolkit';
import {User} from 'user';

const name = 'user';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: name,
  initialState,
  reducers: {
    setUserState: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
  },
});

export const {setUserState} = userSlice.actions;
export default userSlice.reducer;
