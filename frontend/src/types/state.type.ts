import { AuthorizationStatus } from '../constants/const.ts';
import { store } from '../store';
import { TTypeAs } from '../utils/helpers.ts';
import { UserDataType } from './user.type.ts';
import { ProductResponse } from './product-responce.type.ts';
import { SortValue } from './sort.type.ts';
import { ProductFilter } from './product-filter.type.ts';

export type StateType = ReturnType<typeof store.getState>;

export type UserStateType = {
  userData: UserDataType | null;
  authorizationStatus: TTypeAs<typeof AuthorizationStatus>;
};

export type ProductState = {
  items: ProductResponse[];
  totalPages: number;
  isLoading: boolean;
  currentPage: number;
  sort: SortValue;
  filters: ProductFilter;
  currentProduct: ProductResponse | null;
  isProductLoading: boolean;
};
