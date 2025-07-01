import { z } from 'zod';

/**
 * Схема валидации тела запроса на вход пользователя.
 */
export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(12),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
