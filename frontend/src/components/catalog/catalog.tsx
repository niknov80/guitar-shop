import { JSX, useEffect } from 'react';
import CatalogCards from '../catalog-cards/catalog-cards.tsx';
import CatalogSort from '../catalog-sort/catalog-sort.tsx';
import CatalogFilter from '../catalog-filter/catalog-filter.tsx';

import {
  selectCurrentPage,
  selectSort,
  selectFilters,
} from '../../store/product/product.selectors.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProducts } from '../../store/api-actions.ts';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentPage = useAppSelector(selectCurrentPage);
  const sort = useAppSelector(selectSort);
  const filters = useAppSelector(selectFilters);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage, sort, JSON.stringify(filters)]);

  return (
    <div className="catalog">
      <CatalogFilter />
      <CatalogSort />
      <CatalogCards />
    </div>
  );
}

export default Catalog;
