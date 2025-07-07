import { JSX } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/const.ts';
import { ProductResponse } from '../../types/product-responce.type.ts';
import { formatDate, formatPrice } from '../../utils/helpers.ts';
import { useAppDispatch } from '../../hooks';
import { deleteProductAction, fetchProducts } from '../../store/api-actions.ts';

type CatalogCardProps = {
  product: ProductResponse;
};

function CatalogCard({ product }: CatalogCardProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (confirm(`Удалить товар «${product.name}»?`)) {
      await dispatch(deleteProductAction(product.id));
      dispatch(fetchProducts(1));
    }
  };
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
          <Link className="link" to={AppRoute.getProductPath(product.id)}>
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
          to={AppRoute.getEditProductPath(product.id)}
          aria-label="Редактировать товар"
        >
          Редактировать
        </Link>
        <button
          className="button button--small button--black-border"
          type="submit"
          aria-label="Удалить товар"
          onClick={handleDelete}
        >
          Удалить
        </button>
      </div>
    </li>
  );
}

export default CatalogCard;
