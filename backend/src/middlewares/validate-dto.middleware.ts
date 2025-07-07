import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

const BAD_REQUEST_STATUS = 400;
const VALIDATION_ERROR_MESSAGE = 'Validation error';

/**
 * Middleware для валидации тела запроса с помощью Zod-схемы.
 *
 * @param schema - Zod-схема для валидации данных запроса
 * @returns Express middleware, проверяющий тело запроса и передающий управление дальше при успехе
 */
export const validateDto =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(BAD_REQUEST_STATUS).json({
        message: VALIDATION_ERROR_MESSAGE,
        errors: result.error.format(),
      });
      return;
    }

    req.body = result.data;
    next();
  };
