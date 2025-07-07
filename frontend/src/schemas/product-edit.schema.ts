import { z } from 'zod';
import { ProductLimits } from '../constants/const.ts';
import { GuitarType } from '../types/product.type.ts';
import { isStringCount } from '../utils/helpers.ts';

export const editProductSchema = z.object({
  name: z
    .string()
    .min(ProductLimits.Name.Min)
    .max(ProductLimits.Name.Max)
    .optional(),
  description: z
    .string()
    .min(ProductLimits.Description.Min)
    .max(ProductLimits.Description.Max)
    .optional(),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Файл обязателен')
    .optional(),
  type: z.enum(Object.values(GuitarType) as [string, ...string[]]).optional(),
  article: z
    .string()
    .min(ProductLimits.Article.Min)
    .max(ProductLimits.Article.Max)
    .optional(),
  stringCount: z
    .preprocess(
      (val) => (typeof val === 'string' ? Number(val) : val),
      z.number().refine(isStringCount, {
        message: 'Неверное количество струн',
      }),
    )
    .optional(),
  price: z
    .string()
    .nonempty()
    .transform((val) => parseInt(val, 10))
    .refine(
      (val) =>
        !isNaN(val) &&
        val >= ProductLimits.Price.Min &&
        val <= ProductLimits.Price.Max,
      {
        message: `Цена должна быть от ${ProductLimits.Price.Min} до ${ProductLimits.Price.Max}`,
      },
    )
    .optional(),
});

export type EditProductFormData = z.output<typeof editProductSchema>;
export type EditProductFormRaw = z.input<typeof editProductSchema>;
