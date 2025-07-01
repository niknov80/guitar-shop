import dotenv from 'dotenv';
import { z } from 'zod';
import { JwtExpiresIn } from '../types/jwt.type';

// Загружаем переменные окружения из .env файла
dotenv.config();

/**
 * Значение порта по умолчанию (используется, если PORT не задан в .env).
 */
export const DEFAULT_PORT = 3000;

/**
 * Значение срока жизни JWT по умолчанию.
 * Формат: `${number}${'s' | 'm' | 'h' | 'd'}` — например, '1d', '30m', '60s'.
 */
export const DEFAULT_JWT_EXPIRES_IN: JwtExpiresIn = '1d';

/**
 * URL клиентского приложения по умолчанию.
 * Используется для настройки CORS, если переменная окружения FRONTEND_URL не задана.
 */
export const DEFAULT_FRONTEND_URL = 'http://localhost:5173';

/**
 * Схема валидации переменных окружения с помощью Zod.
 * Проверяет наличие обязательных значений и приводит типы.
 */
const envSchema = z.object({
  PORT: z.coerce.number().default(DEFAULT_PORT),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_EXPIRES_IN: z.string().default(DEFAULT_JWT_EXPIRES_IN),
  FRONTEND_URL: z.string().url().default(DEFAULT_FRONTEND_URL),
});

/**
 * Результат парсинга и валидации переменных окружения.
 */
const parsed = envSchema.parse(process.env);

/**
 * Типизированный объект переменных окружения, безопасный для использования в проекте.
 */
const env: {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: JwtExpiresIn;
  FRONTEND_URL: string;
} = {
  ...parsed,
  JWT_EXPIRES_IN: parsed.JWT_EXPIRES_IN as JwtExpiresIn,
};

export default env;
