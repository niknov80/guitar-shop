import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterFormData, registerSchema } from '../schemas/register-schema';
import { registerAction } from '../store/api-actions.ts';
import { useAppDispatch } from './index';

/**
 * Хук для регистрации пользователя.
 */
export function useRegister() {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register: formRegister,
    handleSubmit: rhfHandleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      await dispatch(registerAction(data)).unwrap();
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
