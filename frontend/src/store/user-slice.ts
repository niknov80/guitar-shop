import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  isAuthorized: boolean;
  email: string | null;
};

const initialState: UserState = {
  isAuthorized: true,
  email: 'admin@guitar-shop.ru',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthorized = true;
      state.email = action.payload;
    },
    logout(state) {
      state.isAuthorized = false;
      state.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
