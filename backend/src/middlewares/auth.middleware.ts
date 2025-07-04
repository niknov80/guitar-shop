import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env.config';

/**
 * Расширение типа Express-запроса для поддержки req.user
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

/**
 * Middleware аутентификации: извлекает JWT, проверяет подпись, добавляет req.user
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or invalid Authorization header' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
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
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
