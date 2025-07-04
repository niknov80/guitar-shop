import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../constants/const.ts';
import { userSlice } from './user/user.slice';
import { productSlice } from './product/product.slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.User]: userSlice.reducer,
  [NameSpace.Product]: productSlice.reducer,
});
