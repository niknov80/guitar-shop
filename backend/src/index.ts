import dotenv from 'dotenv';
import path from 'path';
import pino from 'pino';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { createApp } from './app';
import env from './config/env.config';
import { connectToDatabase } from './config/mongodb.config';

// Загрузка .env
dotenv.config();

// Логгер
const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});

// Переменные окружения
const port: number = Number(env.PORT);
const mongoUri: string = env.MONGO_URI;
const openapiDocument = YAML.load(path.resolve(__dirname, '../../specification/openapi.yaml'));

// Проверка обязательных переменных
if (!mongoUri) {
  logger.error('MONGO_URI must be defined in .env');
  process.exit(1);
}

// Запуск сервера
async function bootstrap() {
  try {
    await connectToDatabase(mongoUri);
    const app = createApp();

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

    app.listen(port, () => {
      logger.info(`Server started at http://localhost:${port}`);
      logger.info(`Swagger UI available at http://localhost:${port}/docs`);
    });
  } catch (error) {
    logger.error(error, 'Failed to start server');
    process.exit(1);
  }
}

bootstrap();
