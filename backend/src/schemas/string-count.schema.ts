import { z } from 'zod';

/**
 * Схема валидации количества струн.
 * Поддерживает строковое или числовое представление.
 */
export const stringCountSchema = z.preprocess(
  val => (typeof val === 'string' ? Number(val) : val),
  z.union([z.literal(4), z.literal(6), z.literal(7), z.literal(12)])
);
