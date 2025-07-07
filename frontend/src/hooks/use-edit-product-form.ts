import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './index.ts';
import { fetchProductById, updateProductAction } from '../store/api-actions.ts';
import { useSelector } from 'react-redux';
import { selectProduct } from '../store/product/product.selectors.ts';
import {
  EditProductFormRaw,
  editProductSchema,
} from '../schemas/product-edit.schema.ts';
import { AppRoute } from '../constants/const.ts';

export const useEditProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product = useSelector(selectProduct);

  const { register, handleSubmit, formState, setValue, reset, ...rest } =
    useForm<EditProductFormRaw>({
      resolver: zodResolver(editProductSchema) as Resolver<EditProductFormRaw>,
    });

  // Загружаем товар по ID
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  // Инициализируем форму, когда товар загружен
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        type: product.type,
        article: product.article,
        stringCount: String(product.stringCount),
        price: String(product.price),
        image: undefined, // пользователь сам решает, менять ли файл
      });
    }
  }, [product, reset]);

  // Обработчик отправки формы
  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();

    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.type) formData.append('type', data.type);
    if (data.article) formData.append('article', data.article);
    if (typeof data.stringCount === 'number') {
      formData.append('stringCount', String(data.stringCount));
    }
    if (typeof data.price === 'number') {
      formData.append('price', String(data.price));
    }

    if (data.image instanceof File && data.image.size > 0) {
      formData.append('image', data.image);
    }

    if (!product) {
      console.warn('Нет продукта для обновления');
      return;
    }

    dispatch(updateProductAction({ id: product.id, formData }))
      .unwrap()
      .then(() => {
        navigate(AppRoute.Products);
      })
      .catch((error) => {
        console.error('PATCH error:', error.response?.data || error.message);
      });
  });

  return {
    register,
    formState,
    setValue,
    onSubmit,
    ...rest,
  };
};
