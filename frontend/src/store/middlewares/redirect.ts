import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { browserHistory } from '../../services/browser-history.ts';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'app/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
