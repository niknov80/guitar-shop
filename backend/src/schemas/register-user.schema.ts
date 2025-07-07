import { z } from 'zod';

const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 15;
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 12;

/**
 * Схема валидации тела запроса на регистрацию пользователя.
 */
export const registerUserSchema = z.object({
  name: z.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH),
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
});

/**
 * DTO для регистрации пользователя.
 */
export type RegisterUserDto = z.infer<typeof registerUserSchema>;
