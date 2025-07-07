import { JSX, useRef, useState } from 'react';
import { useAddProductForm } from '../../hooks/use-add-product-form.ts';
import { useNavigate } from 'react-router-dom';
import { AppRoute, STRING_COUNTS } from '../../constants/const.ts';

function AddNewProduct(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    onSubmit,
    setValue,
    formState: { errors },
  } = useAddProductForm();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState('guitar-default.jpg');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  return (
    <form className="add-item__form" onSubmit={onSubmit}>
      <div className="add-item__form-left">
        <div className="edit-item-image add-item__form-image">
          <div className="edit-item-image__image-wrap">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Превью изображения"
                style={{ maxWidth: '100%', maxHeight: 200, marginTop: '10px' }}
              />
            )}
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
              Добавить
            </button>

            {fileName !== '' && fileName !== 'guitar-default.jpg' && (
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

        <div className="input-radio add-item__form-radio">
          <span>Выберите тип товара</span>

          <input
            type="radio"
            id="guitar"
            value="акустика"
            {...register('type')}
          />
          <label htmlFor="guitar">Акустическая гитара</label>

          <input
            type="radio"
            id="el-guitar"
            value="электро"
            {...register('type')}
          />
          <label htmlFor="el-guitar">Электрогитара</label>

          <input
            type="radio"
            id="ukulele"
            value="укулеле"
            {...register('type')}
          />
          <label htmlFor="ukulele">Укулеле</label>

          {errors.type && <p>{errors.type.message}</p>}
        </div>

        <div className="input-radio add-item__form-radio">
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

      <div className="add-item__form-right">
        <div className="custom-input add-item__form-input">
          <label>
            <span>Введите наименование товара</span>
            <input
              type="text"
              placeholder="Наименование"
              {...register('name')}
            />
          </label>
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="custom-input add-item__form-input">
          <label>
            <span>Введите цену товара</span>
            <input
              type="text"
              placeholder="Цена в формате 00 000"
              {...register('price')}
            />
          </label>
          {errors.price && <p>{errors.price.message}</p>}
        </div>

        <div className="custom-input add-item__form-input">
          <label>
            <span>Введите артикул товара</span>
            <input
              type="text"
              placeholder="Артикул товара"
              {...register('article')}
            />
          </label>
          {errors.article && <p>{errors.article.message}</p>}
        </div>

        <div className="custom-textarea add-item__form-textarea">
          <label>
            <span>Введите описание товара</span>
            <textarea placeholder="Описание" {...register('description')} />
          </label>
          {errors.description && <p>{errors.description.message}</p>}
        </div>
      </div>

      <div className="add-item__form-buttons-wrap">
        <button
          className="button button--small add-item__form-button"
          type="submit"
        >
          Сохранить изменения
        </button>
        <button
          className="button button--small add-item__form-button"
          type="button"
          onClick={() => navigate(AppRoute.Products)}
        >
          Вернуться к списку товаров
        </button>
      </div>
    </form>
  );
}

export default AddNewProduct;
