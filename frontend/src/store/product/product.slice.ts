import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from '../../types/state.type.ts';
import { fetchProducts } from '../api-actions.ts';
import { ProductFilter } from '../../types/product-filter.type.ts';

const initialState: ProductState = {
  items: [],
  totalPages: 0,
  isLoading: false,
  currentPage: 1,
  sort: 'dateAsc',
  filters: {},
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
      });
  },
});

export const { setCurrentPage, setSort, setFilters, resetFilters } =
  productSlice.actions;
