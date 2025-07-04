import { z } from 'zod';
import {
  DEFAULT_PAGE,
  GuitarType,
  PRICE_RANGE,
  PRODUCT_ARTICLE_LIMITS,
  PRODUCT_DESCRIPTION_LIMITS,
  PRODUCT_NAME_LIMITS,
  PRODUCT_SORT_VALUES,
} from '../constants/product.constant';
import { stringCountSchema } from './string-count.schema';

/**
 * Схема валидации тела запроса для создания товара.
 */
export const createProductSchema = z.object({
  name: z.string().min(PRODUCT_NAME_LIMITS.MIN).max(PRODUCT_NAME_LIMITS.MAX),
  description: z.string().min(PRODUCT_DESCRIPTION_LIMITS.MIN).max(PRODUCT_DESCRIPTION_LIMITS.MAX),
  image: z.string(),
  type: z.enum(Object.values(GuitarType) as [string, ...string[]]),
  article: z.string().min(PRODUCT_ARTICLE_LIMITS.MIN).max(PRODUCT_ARTICLE_LIMITS.MAX),
  stringCount: stringCountSchema,
  price: z.preprocess(
    val => (typeof val === 'string' ? Number(val) : val),
    z.number().min(PRICE_RANGE.MIN).max(PRICE_RANGE.MAX)
  ),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;

/**
 * Схема для обновления товара (PATCH).
 */
export const updateProductSchema = createProductSchema.partial();
export type UpdateProductDto = z.infer<typeof updateProductSchema>;

/**
 * Схема валидации query-параметров для списка товаров.
 */
export const getProductsQuerySchema = z.object({
  page: z
    .preprocess(
      val => (typeof val === 'string' ? Number(val) : DEFAULT_PAGE),
      z.number().int().positive()
    )
    .optional(),

  sort: z.enum(PRODUCT_SORT_VALUES).optional(),

  type: z.string().optional(),

  stringCount: z.string().optional(),

  minPrice: z
    .preprocess(val => (typeof val === 'string' ? Number(val) : val), z.number().min(0))
    .optional(),

  maxPrice: z
    .preprocess(val => (typeof val === 'string' ? Number(val) : val), z.number().min(0))
    .optional(),
});

export type GetProductsQuery = z.infer<typeof getProductsQuerySchema>;
