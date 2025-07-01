import dotenv from 'dotenv';
import { z } from 'zod';

const DEFAULT_PORT = 3000;

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(DEFAULT_PORT),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
});

const env = envSchema.parse(process.env);

export default env;
