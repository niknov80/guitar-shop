import { JSX } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/const.ts';
import { ProductResponse } from '../../types/product-responce.type.ts';
import { formatDate, formatPrice } from '../../utils/helpers.ts';

type CatalogCardProps = {
  product: ProductResponse;
};

function CatalogCard({ product }: CatalogCardProps): JSX.Element {
  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img
          src={product.image}
          width="36"
          height="93"
          alt={`Гитара ${product.name}`}
        />
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={`${AppRoute.Product}/${product.id}`}>
            <p className="catalog-item__data-title">{product.name}</p>
          </Link>
          <p className="catalog-item__data-date">
            Дата добавления: {formatDate(product.createdAt)}
          </p>
          <p className="catalog-item__data-price">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link
          className="button button--small button--black-border"
          to={`${AppRoute.EditProduct}/${product.id}`}
          aria-label="Редактировать товар"
        >
          Редактировать
        </Link>
        <button
          className="button button--small button--black-border"
          type="submit"
          aria-label="Удалить товар"
        >
          Удалить
        </button>
      </div>
    </li>
  );
}

export default CatalogCard;
