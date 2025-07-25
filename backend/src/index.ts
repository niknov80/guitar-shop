import dotenv from 'dotenv';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { createApp } from './app';
import env from './config/env.config';
import { connectToDatabase } from './config/mongodb.config';
import logger from './shared/logger/logger';

// Загрузка .env
dotenv.config();

const APP_CONSTANTS = {
  EXIT_CODE: {
    FAILURE: 1,
  },
  DOCS: {
    ROUTE: '/docs',
    SPEC_PATH: path.resolve(__dirname, '../../specification/openapi.yaml'),
  },
};

// Переменные окружения
const port: number = Number(env.PORT);
const mongoUri: string = env.MONGO_URI;
const openapiDocument = YAML.load(APP_CONSTANTS.DOCS.SPEC_PATH);

// Проверка обязательных переменных
if (!mongoUri) {
  logger.error('MONGO_URI must be defined in .env');
  process.exit(APP_CONSTANTS.EXIT_CODE.FAILURE);
}

/**
 * Инициализирует подключение к БД и запускает HTTP-сервер.
 */
async function bootstrap() {
  try {
    await connectToDatabase(mongoUri);

    const app = createApp();

    logger.info(`App created. CORS allowed origin: ${env.FRONTEND_URL}`);

    app.use(APP_CONSTANTS.DOCS.ROUTE, swaggerUi.serve, swaggerUi.setup(openapiDocument));

    app.listen(port, () => {
      logger.info(`Server started at http://localhost:${port}`);
      logger.info(`Swagger UI available at http://localhost:${port}${APP_CONSTANTS.DOCS.ROUTE}`);
    });
  } catch (error) {
    logger.error(error, 'Failed to start server');
    process.exit(APP_CONSTANTS.EXIT_CODE.FAILURE);
  }
}

bootstrap();
