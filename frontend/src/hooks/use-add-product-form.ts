import { useForm, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './index.ts';
import {
  CreateProductFormRaw,
  createProductSchema,
} from '../schemas/product.schema.ts';
import { createProductAction } from '../store/api-actions.ts';
import { AppRoute } from '../constants/const.ts';

export const useAddProductForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState, setValue, ...rest } =
    useForm<CreateProductFormRaw>({
      resolver: zodResolver(
        createProductSchema,
      ) as unknown as Resolver<CreateProductFormRaw>,
      defaultValues: {
        type: 'аккустика',
        stringCount: '6',
      },
    });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append('article', data.article);
    formData.append('stringCount', String(data.stringCount));
    formData.append('price', String(data.price));

    if (data.image) {
      formData.append('image', data.image);
    }

    dispatch(createProductAction(formData)).then(() => {
      navigate(AppRoute.Products);
    });
  });

  return {
    register,
    formState,
    onSubmit,
    setValue,
    ...rest,
  };
};
