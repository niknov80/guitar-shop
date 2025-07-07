import { z } from 'zod';
import { ProductLimits } from '../constants/const.ts';
import { GuitarType } from '../types/product.type.ts';
import { isStringCount } from '../utils/helpers.ts';

export const createProductSchema = z.object({
  name: z.string().min(ProductLimits.Name.Min).max(ProductLimits.Name.Max),
  description: z
    .string()
    .min(ProductLimits.Description.Min)
    .max(ProductLimits.Description.Max),
  image: z.union([
    z.instanceof(File).refine((file) => file.size > 0, 'Файл обязателен'),
    z.undefined(),
  ]),
  type: z.enum(Object.values(GuitarType) as [string, ...string[]]),
  article: z
    .string()
    .min(ProductLimits.Article.Min)
    .max(ProductLimits.Article.Max),
  stringCount: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z.number().refine(isStringCount, {
      message: 'Неверное количество струн',
    }),
  ),
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
    ),
});

export type CreateProductFormData = z.output<typeof createProductSchema>;
export type CreateProductFormRaw = z.input<typeof createProductSchema>;
