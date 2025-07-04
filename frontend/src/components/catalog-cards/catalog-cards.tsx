import { JSX } from 'react';
import CatalogCard from '../catalog-card/catalog-card.tsx';
import { useAppSelector } from '../../hooks';
import { selectProducts } from '../../store/product/product.selectors.ts';

function CatalogCards(): JSX.Element {
  const products = useAppSelector(selectProducts);

  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {products.map((product) => (
          <CatalogCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default CatalogCards;
