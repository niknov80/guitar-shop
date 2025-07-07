import { JSX } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { AppRoute } from '../../constants/const.ts';

function Breadcrumbs(): JSX.Element {
  const isAddPage = useMatch('/add');
  const isEditPage = useMatch('/products/:id/edit');
  const isProductPage = useMatch('/products/:id');

  const showProduct = isAddPage || isEditPage || isProductPage;
  const showCatalogLink = showProduct;

  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Index}>
          Главная
        </Link>
      </li>

      <li className="breadcrumbs__item">
        {showCatalogLink ? (
          <Link className="link" to={AppRoute.Products}>
            Каталог
          </Link>
        ) : (
          <span className="link">Каталог</span>
        )}
      </li>

      {showProduct && (
        <li className="breadcrumbs__item">
          <span className="link">Товар</span>
        </li>
      )}
    </ul>
  );
}

export default Breadcrumbs;
