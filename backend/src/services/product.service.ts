import { DEFAULT_SORT, PAGE_SIZE, PRICE_RANGE } from '../constants/product.constant';
import { ProductModel } from '../models/product.model';
import { CreateProductDto, GetProductsQuery, UpdateProductDto } from '../schemas/product.schema';

/**
 * Сервис для работы с товарами.
 */
export class ProductService {
  /**
   * Создаёт новый товар.
   * @param dto - Данные для создания товара.
   * @returns Созданный товар.
   */
  static async create(dto: CreateProductDto) {
    return await ProductModel.create(dto);
  }

  /**
   * Возвращает список товаров с учётом фильтрации, сортировки и пагинации.
   * @param query - Параметры запроса (фильтры, сортировка, страница).
   * @returns Массив товаров.
   */
  static async findAll(query: GetProductsQuery) {
    const {
      page = 1,
      type,
      stringCount,
      minPrice = PRICE_RANGE.MIN,
      maxPrice = PRICE_RANGE.MAX,
      sort = DEFAULT_SORT,
    } = query;

    const filter: Record<string, unknown> = {
      price: { $gte: minPrice, $lte: maxPrice },
    };

    if (type) filter.type = type;
    if (stringCount) filter.stringCount = stringCount;

    const sortOptions: Record<string, Record<string, 1 | -1>> = {
      priceAsc: { price: 1 },
      priceDesc: { price: -1 },
      dateAsc: { createdAt: 1 },
      dateDesc: { createdAt: -1 },
    };

    const sortBy = sortOptions[sort] ?? sortOptions[DEFAULT_SORT];
    const skip = (page - 1) * PAGE_SIZE;

    return await ProductModel.find(filter).sort(sortBy).skip(skip).limit(PAGE_SIZE).exec();
  }

  /**
   * Возвращает товар по его ID.
   * @param id - Идентификатор товара.
   * @returns Найденный товар или null.
   */
  static async findById(id: string) {
    return await ProductModel.findById(id).exec();
  }

  /**
   * Обновляет товар по ID.
   * @param id - Идентификатор товара.
   * @param dto - Данные для обновления.
   * @returns Обновлённый товар или null.
   */
  static async updateById(id: string, dto: UpdateProductDto) {
    return await ProductModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  /**
   * Удаляет товар по ID.
   * @param id - Идентификатор товара.
   * @returns Удалённый товар или null.
   */
  static async deleteById(id: string) {
    return await ProductModel.findByIdAndDelete(id).exec();
  }
}
