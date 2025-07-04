import { NameSpace } from '../../constants/const.ts';
import { StateType } from '../../types/state.type.ts';

export const selectProducts = (state: StateType) =>
  state[NameSpace.Product].items;

export const selectIsProductsLoading = (state: StateType) =>
  state[NameSpace.Product].isLoading;

export const selectTotalPages = (state: StateType) =>
  state[NameSpace.Product].totalPages;

export const selectCurrentPage = (state: StateType) =>
  state[NameSpace.Product].currentPage;

export const selectSort = (state: StateType) => state[NameSpace.Product].sort;

export const selectFilters = (state: StateType) =>
  state[NameSpace.Product].filters;
