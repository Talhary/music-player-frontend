import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from '../types/user';

const initialState: UserState = {
  displayName: '',
  email: '',
  picture: '',
  lang: '',
  id: '',
  iat: 0,
  exp: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state:any) => {
      return { ...initialState }; // Reset to initial state
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
