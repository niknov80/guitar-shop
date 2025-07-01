import mongoose from 'mongoose';
import pino from 'pino';

const logger = pino();

export const connectToDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};
