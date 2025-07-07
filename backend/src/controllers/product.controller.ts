import { NextFunction, Request, Response } from 'express';
import { ResponseMessages } from '../constants/response-message.constant';
import {
  createProductSchema,
  getProductsQuerySchema,
  updateProductSchema,
} from '../schemas/product.schema';
import { ProductService } from '../services/product.service';

const STATIC_IMG_PATH = 'static/img/';

/**
 * Контроллер для работы с товарами.
 */
export class ProductController {
  /**
   * Создаёт новый товар.
   *
   * Принимает `multipart/form-data`, где:
   * - изображение передаётся как файл (`image`)
   * - остальные поля (`name`, `price`, `type`, и т.д.) как текстовые поля
   *
   * Путь к файлу (`/static/img/...`) сохраняется в поле `image`.
   * Валидирует тело запроса через Zod.
   *
   * @route POST /products
   * @access Protected
   */
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'Image is required' });
        return;
      }

      req.body.image = `${STATIC_IMG_PATH}${req.file.filename}`;

      const parsed = createProductSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ errors: parsed.error.format() });
        return;
      }

      const created = await ProductService.create(parsed.data);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает список товаров с поддержкой фильтрации, сортировки и пагинации.
   *
   * Query-параметры:
   * - `page`: номер страницы
   * - `type`: тип гитары (`электро`, `аккустика`, `укулеле`)
   * - `stringCount`: количество струн
   * - `sort`: `priceAsc`, `priceDesc`, `dateAsc`, `dateDesc`
   *
   * @route GET /products
   * @access Protected
   */
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = getProductsQuerySchema.safeParse(req.query);
      if (!parsed.success) {
        res.status(400).json({ errors: parsed.error.format() });
        return;
      }

      const products = await ProductService.findAll(parsed.data);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает товар по ID.
   *
   * Если товар не найден — возвращает 404.
   *
   * @route GET /products/:id
   * @access Protected
   */
  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.findById(req.params.id);
      if (!product) {
        res.status(404).json({ message: ResponseMessages.ProductNotFound });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Обновляет данные товара по ID.
   *
   * Принимает только поля, указанные в теле запроса (`application/json`).
   * Все поля являются необязательными (partial).
   *
   * @route PATCH /products/:id
   * @access Protected
   */
  static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.file) {
        req.body.image = `${STATIC_IMG_PATH}${req.file.filename}`;
      }

      const parsed = updateProductSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ errors: parsed.error.format() });
        return;
      }

      const updated = await ProductService.updateById(req.params.id, parsed.data);
      if (!updated) {
        res.status(404).json({ message: ResponseMessages.ProductNotFound });
        return;
      }

      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Удаляет товар по ID.
   *
   * Если товар не найден — возвращает 404.
   * Успешное удаление — статус 204 (без тела).
   *
   * @route DELETE /products/:id
   * @access Protected
   */
  static async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await ProductService.deleteById(req.params.id);
      if (!deleted) {
        res.status(404).json({ message: ResponseMessages.ProductNotFound });
        return;
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
