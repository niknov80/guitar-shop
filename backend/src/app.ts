import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { errorHandler } from './middlewares/error.middleware';
import productRoutes from './routes/product.route';
import userRoutes from './routes/user.route';
import logger from './shared/logger/logger';

const APP_CONSTANTS = {
  STATIC: {
    ROUTE: '/static',
    FOLDER: path.resolve(__dirname, '..', 'static'),
  },
  HEALTH: {
    ROUTE: '/health',
    RESPONSE: { status: 'ok' },
  },
  CORS: {
    HEADER: 'Access-Control-Allow-Origin',
    VALUE: '*',
  },
};

/**
 * Создаёт и настраивает экземпляр Express-приложения.
 *
 * Включает:
 * - JSON-парсер
 * - CORS
 * - Защитные заголовки (helmet)
 * - Логирование (morgan и pino)
 * - Системный маршрут /health
 * - Стаическую раздачу файлов
 * - Основные маршруты /users, /products
 * - Централизованную обработку ошибок
 *
 * @returns Настроенный экземпляр Express
 */
export const createApp = (): Express => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use((req, _res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}, origin: ${req.headers.origin}`);
    next();
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(morgan('dev'));

  app.get(APP_CONSTANTS.HEALTH.ROUTE, (_req, res) => {
    res.status(200).json(APP_CONSTANTS.HEALTH.RESPONSE);
  });

  app.use(
    APP_CONSTANTS.STATIC.ROUTE,
    express.static(APP_CONSTANTS.STATIC.FOLDER, {
      setHeaders: res => {
        res.setHeader(APP_CONSTANTS.CORS.HEADER, APP_CONSTANTS.CORS.VALUE);
      },
    })
  );

  app.use('/users', userRoutes);
  app.use('/products', productRoutes);

  app.use(errorHandler);

  return app;
};
