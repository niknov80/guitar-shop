import { JSX } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectSort } from '../../store/product/product.selectors.ts';
import { setSort, setCurrentPage } from '../../store/product/product.slice.ts';
import { SortValue } from '../../types/sort.type.ts';

function CatalogSort(): JSX.Element {
  const dispatch = useAppDispatch();
  const sort = useAppSelector(selectSort);

  const isPrice = sort.startsWith('price');
  const isAsc = sort.endsWith('Asc');

  const handleTypeChange = (type: 'price' | 'date') => {
    const newSort: SortValue = `${type}${isAsc ? 'Asc' : 'Desc'}`;
    dispatch(setSort(newSort));
    dispatch(setCurrentPage(1));
  };

  const handleOrderChange = (order: 'asc' | 'desc') => {
    const base = isPrice ? 'price' : 'date';
    const newSort: SortValue = `${base}${order === 'asc' ? 'Asc' : 'Desc'}`;
    dispatch(setSort(newSort));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button${
            sort.startsWith('date') ? ' catalog-sort__type-button--active' : ''
          }`}
          onClick={() => handleTypeChange('date')}
          aria-label="по дате"
        >
          по дате
        </button>
        <button
          className={`catalog-sort__type-button${
            sort.startsWith('price') ? ' catalog-sort__type-button--active' : ''
          }`}
          onClick={() => handleTypeChange('price')}
          aria-label="по цене"
        >
          по цене
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up${
            isAsc ? ' catalog-sort__order-button--active' : ''
          }`}
          onClick={() => handleOrderChange('asc')}
          aria-label="По возрастанию"
        ></button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down${
            !isAsc ? ' catalog-sort__order-button--active' : ''
          }`}
          onClick={() => handleOrderChange('desc')}
          aria-label="По убыванию"
        ></button>
      </div>
    </div>
  );
}

export default CatalogSort;
