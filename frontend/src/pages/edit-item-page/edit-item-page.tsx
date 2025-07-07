import { JSX, useRef, useState } from 'react';
import { useEditProductForm } from '../../hooks/use-edit-product-form.ts'; // подключаем наш хук
import { useNavigate } from 'react-router-dom';
import { AppRoute, STRING_COUNTS } from '../../constants/const.ts';
import { useSelector } from 'react-redux';
import { selectProduct } from '../../store/product/product.selectors.ts';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs.tsx';

function EditProduct(): JSX.Element {
  const navigate = useNavigate();
  const product = useSelector(selectProduct);
  const {
    register,
    formState: { errors },
    onSubmit,
    setValue,
  } = useEditProductForm();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <section className="edit-item">
      <div className="container">
        <h1 className="edit-item__title">
          {product?.name ?? 'Редактирование'}
        </h1>
        <Breadcrumbs />
        <form className="edit-item__form" onSubmit={onSubmit}>
          <div className="edit-item__form-left">
            <div className="edit-item-image edit-item__form-image">
              <div className="edit-item-image__image-wrap">
                <img
                  className="edit-item-image__image"
                  src={imagePreview ?? `${product?.image}`}
                  width="133"
                  height="332"
                  alt={product?.name}
                />
              </div>

              <div className="edit-item-image__btn-wrap">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFileName(file.name);
                      setImagePreview(URL.createObjectURL(file));
                      setValue('image', file, { shouldValidate: true });
                    }
                  }}
                />

                <button
                  className="button button--small button--black-border edit-item-image__btn"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Заменить
                </button>

                {fileName && (
                  <button
                    className="button button--small button--black-border edit-item-image__btn"
                    type="button"
                    onClick={() => {
                      setFileName('');
                      setImagePreview(null);
                      setValue('image', undefined, { shouldValidate: true });
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                  >
                    Удалить
                  </button>
                )}
              </div>
            </div>

            <div className="input-radio edit-item__form-radio">
              <span>Тип товара</span>
              {['аккустика', 'электро', 'укулеле'].map((type) => (
                <div key={type}>
                  <input
                    type="radio"
                    id={`type-${type}`}
                    value={type}
                    {...register('type')}
                  />
                  <label htmlFor={`type-${type}`}>
                    {type === 'аккустика'
                      ? 'Акустическая гитара'
                      : type === 'электро'
                        ? 'Электрогитара'
                        : 'Укулеле'}
                  </label>
                </div>
              ))}
              {errors.type && <p>{errors.type.message}</p>}
            </div>

            <div className="input-radio edit-item__form-radio">
              <span>Количество струн</span>
              {STRING_COUNTS.map((count) => (
                <div key={count}>
                  <input
                    type="radio"
                    id={`string-qty-${count}`}
                    value={String(count)}
                    {...register('stringCount')}
                  />
                  <label htmlFor={`string-qty-${count}`}>{count}</label>
                </div>
              ))}
              {errors.stringCount && <p>{errors.stringCount.message}</p>}
            </div>
          </div>

          <div className="edit-item__form-right">
            <div className="custom-input edit-item__form-input">
              <label>
                <span>Наименование товара</span>
                <input
                  type="text"
                  placeholder="Наименование"
                  {...register('name')}
                />
              </label>
              {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div className="custom-input edit-item__form-input edit-item__form-input--price">
              <label>
                <span>Цена товара</span>
                <input
                  type="text"
                  placeholder="Цена в формате 00 000"
                  {...register('price')}
                />
              </label>
              {errors.price && <p>{errors.price.message}</p>}
            </div>

            <div className="custom-input edit-item__form-input">
              <label>
                <span>Артикул товара</span>
                <input
                  type="text"
                  placeholder="Артикул товара"
                  {...register('article')}
                />
              </label>
              {errors.article && <p>{errors.article.message}</p>}
            </div>

            <div className="custom-textarea edit-item__form-textarea">
              <label>
                <span>Описание товара</span>
                <textarea placeholder="Описание" {...register('description')} />
              </label>
              {errors.description && <p>{errors.description.message}</p>}
            </div>
          </div>

          <div className="edit-item__form-buttons-wrap">
            <button
              className="button button--small edit-item__form-button"
              type="submit"
            >
              Сохранить изменения
            </button>
            <button
              className="button button--small edit-item__form-button"
              type="button"
              onClick={() => navigate(AppRoute.Products)}
            >
              Вернуться к списку товаров
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditProduct;
