import { AxiosInstance } from 'axios';
import { store } from './index';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Тип параметров thunk для createAsyncThunk
export type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
};
