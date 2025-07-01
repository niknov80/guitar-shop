import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import env from './config/env.config';
import { errorHandler } from './middlewares/error.middleware';
import userRoutes from './routes/user.route';

/**
 * Создаёт и настраивает экземпляр Express-приложения.
 *
 * Включает:
 * - JSON-парсер
 * - CORS
 * - Защитные заголовки (helmet)
 * - Логирование (morgan)
 * - Системный маршрут /health
 * - Роуты пользователей
 * - Централизованную обработку ошибок
 *
 * @returns Настроенный экземпляр Express
 */
export const createApp = (): Express => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(morgan('dev'));

  // Системный маршрут для мониторинга
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Основные маршруты
  app.use('/users', userRoutes);

  // Глобальная обработка ошибок
  app.use(errorHandler);

  return app;
};
