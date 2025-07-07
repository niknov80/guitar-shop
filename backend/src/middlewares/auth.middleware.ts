import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env.config';

/**
 * Расширение типа Express-запроса для поддержки req.user.
 */
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      email: string;
      name?: string;
    };
  }
}

const AUTH_HEADER_PREFIX = 'Bearer ';
const UNAUTHORIZED_STATUS = 401;
const ERROR_MISSING_AUTH = 'Missing or invalid Authorization header';
const ERROR_INVALID_TOKEN = 'Invalid or expired token';

/**
 * Middleware аутентификации.
 *
 * Извлекает токен из заголовка Authorization,
 * проверяет его подпись и добавляет пользователя в `req.user`.
 *
 * Возвращает 401 при отсутствии токена или ошибке валидации.
 *
 * @param req - HTTP-запрос
 * @param res - HTTP-ответ
 * @param next - функция перехода к следующему middleware
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith(AUTH_HEADER_PREFIX)) {
    res.status(UNAUTHORIZED_STATUS).json({ message: ERROR_MISSING_AUTH });
    return;
  }

  try {
    const token = authHeader.slice(AUTH_HEADER_PREFIX.length);
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      sub: string;
      email: string;
      name: string;
    };

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
    };

    next();
  } catch {
    res.status(UNAUTHORIZED_STATUS).json({ message: ERROR_INVALID_TOKEN });
  }
}
