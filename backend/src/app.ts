import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error.middleware';
import productRoutes from './routes/product.route';
import userRoutes from './routes/user.route';
import logger from './shared/logger/logger';
import path from 'path';

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
      origin: true,
      credentials: true,
    })
  );

  app.use((req, _res, next) => {
    logger.info(`🌍 Incoming request: ${req.method} ${req.url}, origin: ${req.headers.origin}`);
    next();
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(morgan('dev'));

  // Системный маршрут для мониторинга
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use(
    '/static',
    express.static(path.resolve(__dirname, '..', 'static'), {
      setHeaders: res => {
        res.setHeader('Access-Control-Allow-Origin', '*');
      },
    })
  );

  // Основные маршруты
  app.use('/users', userRoutes);
  app.use('/products', productRoutes);

  // Глобальная обработка ошибок
  app.use(errorHandler);

  return app;
};
