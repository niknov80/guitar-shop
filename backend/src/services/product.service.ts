import {
  DEFAULT_PAGE,
  DEFAULT_SORT,
  PAGE_SIZE,
  PRODUCT_SORT_VALUES,
} from '../constants/product.constant';
import { ProductModel } from '../models/product.model';
import { ProductRdo } from '../rdo/product.rdo';
import { CreateProductDto, GetProductsQuery, UpdateProductDto } from '../schemas/product.schema';

/**
 * Сервис для работы с товарами.
 */
export class ProductService {
  /**
   * Создаёт новый товар.
   * @param dto - Данные для создания товара.
   * @returns DTO для ответа.
   */
  static async create(dto: CreateProductDto): Promise<ProductRdo> {
    const product = await ProductModel.create(dto);
    return new ProductRdo(product);
  }

  /**
   * Возвращает список товаров с учётом фильтрации, сортировки и пагинации.
   * @param query - Параметры запроса (фильтры, сортировка, страница).
   * @returns Массив DTO товаров.
   */
  static async findAll(query: GetProductsQuery): Promise<{
    items: ProductRdo[];
    totalPages: number;
    currentPage: number;
  }> {
    const {
      page = DEFAULT_PAGE,
      type,
      stringCount,
      sort = DEFAULT_SORT,
      minPrice,
      maxPrice,
    } = query;

    const filter: Record<string, unknown> = {};

    if (type) {
      const types = type.split(',').filter(Boolean);
      if (types.length > 0) {
        filter.type = { $in: types };
      }
    }

    if (stringCount) {
      const counts = stringCount
        .split(',')
        .map(c => parseInt(c, 10))
        .filter(c => !isNaN(c));
      if (counts.length > 0) {
        filter.stringCount = { $in: counts };
      }
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      const priceFilter: Record<string, number> = {};
      if (minPrice !== undefined) priceFilter.$gte = minPrice;
      if (maxPrice !== undefined) priceFilter.$lte = maxPrice;
      filter.price = priceFilter;
    }

    const sortOptions: Record<(typeof PRODUCT_SORT_VALUES)[number], Record<string, 1 | -1>> = {
      priceAsc: { price: 1 },
      priceDesc: { price: -1 },
      dateAsc: { createdAt: 1 },
      dateDesc: { createdAt: -1 },
    };

    const sortBy = sortOptions[sort] || { createdAt: 1 };
    const skip = (page - 1) * PAGE_SIZE;

    const [products, totalItems] = await Promise.all([
      ProductModel.find(filter).sort(sortBy).skip(skip).limit(PAGE_SIZE).exec(),
      ProductModel.countDocuments(filter),
    ]);

    const items = products.map(product => new ProductRdo(product));
    const totalPages = Math.ceil(totalItems / PAGE_SIZE);

    return {
      items,
      totalPages,
      currentPage: page,
    };
  }

  /**
   * Возвращает товар по его ID.
   * @param id - Идентификатор товара.
   * @returns DTO товара или null.
   */
  static async findById(id: string): Promise<ProductRdo | null> {
    const product = await ProductModel.findById(id).exec();
    return product ? new ProductRdo(product) : null;
  }

  /**
   * Обновляет товар по ID.
   * @param id - Идентификатор товара.
   * @param dto - Данные для обновления.
   * @returns DTO товара или null.
   */
  static async updateById(id: string, dto: UpdateProductDto): Promise<ProductRdo | null> {
    const updated = await ProductModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    return updated ? new ProductRdo(updated) : null;
  }

  /**
   * Удаляет товар по ID.
   * @param id - Идентификатор товара.
   * @returns DTO удалённого товара или null.
   */
  static async deleteById(id: string): Promise<ProductRdo | null> {
    const deleted = await ProductModel.findByIdAndDelete(id).exec();
    return deleted ? new ProductRdo(deleted) : null;
  }
}
