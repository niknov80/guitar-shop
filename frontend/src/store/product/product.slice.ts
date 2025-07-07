import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from '../../types/state.type.ts';
import {
  deleteProductAction,
  fetchProductById,
  fetchProducts,
  updateProductAction,
} from '../api-actions.ts';
import { ProductFilter } from '../../types/product-filter.type.ts';

const initialState: ProductState = {
  items: [],
  totalPages: 0,
  isLoading: false,
  currentPage: 1,
  sort: 'dateAsc',
  filters: {},
  currentProduct: null,
  isProductLoading: false,
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setFilters(state, action: PayloadAction<ProductFilter>) {
      state.filters = action.payload;
    },
    resetFilters(state) {
      state.filters = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.isProductLoading = false;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.isProductLoading = false;
      })
      .addCase(updateProductAction.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(updateProductAction.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.currentProduct = action.payload;

        // если надо — обновим в списке
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateProductAction.rejected, (state) => {
        state.isProductLoading = false;
      })
      .addCase(deleteProductAction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      });
  },
});

export const { setCurrentPage, setSort, setFilters, resetFilters } =
  productSlice.actions;
