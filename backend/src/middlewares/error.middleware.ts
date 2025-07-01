import { NextFunction, Request, Response } from 'express';

/**
 * Централизованный обработчик ошибок.
 * Отвечает статусом 500 по умолчанию и JSON с сообщением.
 */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  const message = err instanceof Error ? err.message : 'Internal server error';
  res.status(500).json({ message });
}
