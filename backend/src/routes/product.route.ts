import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { uploadImage } from '../middlewares/upload.middleware';

const router = Router();

/**
 * @route GET /products
 * @desc Получить список товаров
 * @access Protected
 */
router.get('/', authMiddleware, ProductController.findAll);

/**
 * @route GET /products/:id
 * @desc Получить товар по ID
 * @access Protected
 */
router.get('/:id', authMiddleware, ProductController.findById);

/**
 * @route POST /products
 * @desc Создать товар (multipart/form-data)
 * @access Protected
 */
router.post('/', authMiddleware, uploadImage, ProductController.create);

/**
 * @route PATCH /products/:id
 * @desc Обновить товар по ID (application/json)
 * @access Protected
 */
router.patch('/:id', authMiddleware, uploadImage, ProductController.updateById);

/**
 * @route DELETE /products/:id
 * @desc Удалить товар по ID
 * @access Protected
 */
router.delete('/:id', authMiddleware, ProductController.deleteById);

export default router;
