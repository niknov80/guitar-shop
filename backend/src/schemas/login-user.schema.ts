import { z } from 'zod';

const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 12;

/**
 * Схема валидации тела запроса на вход пользователя.
 */
export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
});

/**
 * DTO для логина пользователя.
 * Используется как тип после валидации `loginUserSchema`.
 */
export type LoginUserDto = z.infer<typeof loginUserSchema>;
