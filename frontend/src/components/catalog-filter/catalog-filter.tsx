import { JSX, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setFilters,
  resetFilters,
  setCurrentPage,
} from '../../store/product/product.slice.ts';
import { selectFilters } from '../../store/product/product.selectors.ts';
import { GuitarType, StringCount } from '../../types/product-filter.type.ts';
import { parseCommaSeparated } from '../../utils/helpers.ts';

const GUITAR_TYPES: GuitarType[] = ['аккустика', 'электро', 'укулеле'];
const STRING_COUNTS: StringCount[] = [4, 6, 7, 12];

function CatalogFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const updateFilter = (updatedFilters: Record<string, unknown>) => {
    dispatch(setFilters({ ...filters, ...updatedFilters }));
    dispatch(setCurrentPage(1));
  };

  const handleGuitarTypeChange = (type: GuitarType) => {
    const current = parseCommaSeparated<GuitarType>(filters.type);
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    updateFilter({ type: updated.length > 0 ? updated.join(',') : undefined });
  };

  const handleStringCountChange = (count: StringCount) => {
    const current = parseCommaSeparated(filters.stringCount).map(Number);
    const updated = current.includes(count)
      ? current.filter((c) => c !== count)
      : [...current, count];
    updateFilter({
      stringCount: updated.length > 0 ? updated.join(',') : undefined,
    });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value ? parseInt(value, 10) : undefined;
    updateFilter({ [name]: numericValue });
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(setCurrentPage(1));
  };

  const selectedTypes = parseCommaSeparated<GuitarType>(filters.type);
  const selectedStrings = parseCommaSeparated(filters.stringCount).map(Number);

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {GUITAR_TYPES.map((type) => (
          <div key={type} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={type}
              checked={selectedTypes.includes(type)}
              onChange={() => handleGuitarTypeChange(type)}
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </fieldset>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
          Количество струн
        </legend>
        {STRING_COUNTS.map((count) => (
          <div key={count} className="form-checkbox catalog-filter__block-item">
            <input
              className="visually-hidden"
              type="checkbox"
              id={`string-${count}`}
              checked={selectedStrings.includes(count)}
              disabled={count === 12}
              onChange={() => handleStringCountChange(count)}
            />
            <label htmlFor={`string-${count}`}>{count}</label>
          </div>
        ))}
      </fieldset>

      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <input
            type="number"
            name="minPrice"
            placeholder="от"
            value={filters.minPrice ?? ''}
            onChange={handlePriceChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="до"
            value={filters.maxPrice ?? ''}
            onChange={handlePriceChange}
          />
        </div>
      </fieldset>

      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="button"
        onClick={handleReset}
      >
        Очистить
      </button>
    </form>
  );
}

export default CatalogFilter;
