import mongoose from 'mongoose';
import logger from '../shared/logger/logger';

/**
 * Код выхода из процесса при ошибке подключения к базе данных.
 */
const EXIT_CODE_FAILURE = 1;

/**
 * Подключается к MongoDB по переданному URI.
 * Завершает процесс, если подключение не удалось.
 *
 * @param {string} uri - Строка подключения к базе данных MongoDB.
 * @returns {Promise<void>}
 */
export const connectToDatabase = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri);
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Failed to connect to MongoDB', err);
    process.exit(EXIT_CODE_FAILURE);
  }
};
