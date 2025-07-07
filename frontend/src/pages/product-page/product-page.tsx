import { JSX, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { fetchProductById } from '../../store/api-actions.ts';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs.tsx';
import { useAppDispatch } from '../../hooks';
import {
  selectIsProductLoading,
  selectProduct,
} from '../../store/product/product.selectors.ts';
function ProductPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useSelector(selectProduct);
  const isLoading = useSelector(selectIsProductLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  if (isLoading || !product) {
    return (
      <section className="product">
        <div className="container">
          <h1 className="page-content__title title title--bigger">
            Загрузка...
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="product">
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <Breadcrumbs />
        <div className="product-container">
          <img
            className="product-container__img"
            src={`\\${product.image}`}
            width="90"
            height="235"
            alt={product.name}
          />
          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">
              {product.name}
            </h2>
            <br />
            <br />
            <div className="tabs">
              <a
                className="button button--medium tabs__button"
                href="#characteristics"
              >
                Характеристики
              </a>
              <a
                className="button button--black-border button--medium tabs__button"
                href="#description"
              >
                Описание
              </a>
              <div className="tabs__content" id="characteristics">
                <table className="tabs__table">
                  <tbody>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Артикул:</td>
                      <td className="tabs__value">{product.article}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Тип:</td>
                      <td className="tabs__value">{product.type}</td>
                    </tr>
                    <tr className="tabs__table-row">
                      <td className="tabs__title">Количество струн:</td>
                      <td className="tabs__value">
                        {product.stringCount} струнная
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="tabs__product-description" id="description">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
