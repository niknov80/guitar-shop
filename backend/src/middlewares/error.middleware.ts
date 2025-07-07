import { NextFunction, Request, Response } from 'express';

const DEFAULT_ERROR_STATUS = 500;
const DEFAULT_ERROR_MESSAGE = 'Internal server error';

/**
 * Централизованный обработчик ошибок.
 *
 * Возвращает статус 500 по умолчанию и JSON с сообщением.
 * Если ошибка является экземпляром Error — используется её сообщение.
 *
 * @param err - Перехваченная ошибка
 * @param _req - Запрос (не используется)
 * @param res - Ответ
 * @param _next - Следующий middleware (не используется)
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const message = err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE;
  res.status(DEFAULT_ERROR_STATUS).json({ message });
}
