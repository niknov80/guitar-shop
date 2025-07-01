import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import pino from 'pino';

dotenv.config();

const logger = pino();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  logger.error('❌ MONGO_URI must be defined in .env');
  process.exit(1);
}

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      logger.info(`🚀 Server started at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    logger.error('❌ Failed to connect to MongoDB', err);
    process.exit(1);
  });
