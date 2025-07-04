import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AuthorizationStatus, NameSpace } from '../../constants/const.ts';
import { UserStateType } from '../../types/state.type.ts';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  registerAction,
} from '../api-actions.ts';

const initialState: UserStateType = {
  userData: null,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        toast.error('Ошибка при авторизации');
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(registerAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        toast.error('Ошибка при регистрации');
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
      })
      .addCase(logoutAction.rejected, (_state) => {
        toast.error('Ошибка при выходе');
      });
  },
});
