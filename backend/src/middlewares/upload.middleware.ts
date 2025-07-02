import { Request } from 'express';
import multer from 'multer';
import path from 'path';

// Папка, куда будут сохраняться изображения
const UPLOAD_PATH = 'static/img';
const uploadDir = path.resolve(UPLOAD_PATH);

// Настройка хранения файлов
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req: Request, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Фильтр — разрешены только изображения
const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG images are allowed'));
  }
};

// Экспортируем middleware
export const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // до 5 MB
  },
}).single('image'); // поле должно называться "image"
