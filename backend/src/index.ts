import dotenv from 'dotenv';
import pino from 'pino';
import { createApp } from './app';
import env from './config/env.config';
import { connectToDatabase } from './config/mongodb.config';

dotenv.config();

const logger = pino();
const port = env.PORT;
const mongoUri = env.MONGO_URI;

if (!mongoUri) {
  logger.error('MONGO_URI must be defined in .env');
  process.exit(1);
}

const app = createApp();

connectToDatabase(mongoUri).then(() => {
  app.listen(port, () => {
    logger.info(`Server started at http://localhost:${port}`);
  });
});
