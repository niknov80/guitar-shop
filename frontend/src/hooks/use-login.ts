import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormData, loginSchema } from '../schemas/login-schema';
import { loginAction } from '../store/api-actions.ts';
import { useAppDispatch } from './index.ts';

/**
 * Хук для авторизации пользователя.
 */
export function useLogin() {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register: formRegister,
    handleSubmit: rhfHandleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      await dispatch(loginAction(data)).unwrap();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? 'Ошибка сервера';
      setError('email', { type: 'server', message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formRegister,
    handleSubmit: rhfHandleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}
