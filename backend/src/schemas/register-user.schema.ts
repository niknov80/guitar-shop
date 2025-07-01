import { z } from 'zod';

/**
 * Схема валидации тела запроса на регистрацию пользователя.
 */
export const registerUserSchema = z.object({
  name: z.string().min(1).max(15),
  email: z.string().email(),
  password: z.string().min(5).max(12),
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;
