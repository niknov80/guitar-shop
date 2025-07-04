import { z } from 'zod';
import {
  EMAIL_INVALID,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_REQUIRED,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../constants/form-errors.constants';

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, NAME_MIN_LENGTH)
    .max(15, NAME_MAX_LENGTH)
    .nonempty(NAME_REQUIRED),
  email: z.string().email(EMAIL_INVALID),
  password: z.string().min(5, PASSWORD_MIN_LENGTH).max(12, PASSWORD_MAX_LENGTH),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
