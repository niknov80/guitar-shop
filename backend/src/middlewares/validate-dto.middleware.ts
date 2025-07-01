import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

/**
 * Middleware для валидации тела запроса с помощью Zod-схемы.
 *
 * @param schema Zod-схема для валидации
 * @returns middleware-функция
 */
export const validateDto =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: 'Validation error',
        errors: result.error.format(),
      });
      return; // 🟢 обязательно укажи return
    }

    req.body = result.data;
    next();
  };
