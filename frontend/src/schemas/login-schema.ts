import { z } from 'zod';
import {
  EMAIL_INVALID,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '../constants/form-errors.constants';

export const loginSchema = z.object({
  email: z.string().email(EMAIL_INVALID),
  password: z.string().min(5, PASSWORD_MIN_LENGTH).max(12, PASSWORD_MAX_LENGTH),
});

export type LoginFormData = z.infer<typeof loginSchema>;
