import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../constants/const.ts';
import { TTypeAs } from '../utils/helpers.ts';

export const redirectToRoute = createAction<TTypeAs<typeof AppRoute>>(
  'app/redirectToRoute',
);
