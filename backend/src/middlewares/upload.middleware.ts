import { Request } from 'express';
import multer from 'multer';
import path from 'path';

const UPLOAD_PATH = 'static/img';
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];
const UNSUPPORTED_FILE_TYPE_ERROR = 'Only JPEG and PNG images are allowed';
const IMAGE_FIELD_NAME = 'image';

const uploadDir = path.resolve(UPLOAD_PATH);

/**
 * Конфигурация хранилища для Multer.
 * Генерирует уникальные имена файлов на основе timestamp и оригинального имени.
 */
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req: Request, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

/**
 * Фильтр файлов: принимает только изображения JPEG и PNG.
 */
const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(UNSUPPORTED_FILE_TYPE_ERROR));
  }
};

/**
 * Middleware для загрузки одного изображения.
 * Принимает файл в поле "image" с ограничением до 5MB.
 */
export const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
}).single(IMAGE_FIELD_NAME);
