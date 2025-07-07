import { ProductDocument } from '../models/product.model';
import { ProductResponse } from '../types/product-responce.type';

/**
 * DTO (Response Data Object) для возврата товара в API-ответе.
 * Преобразует Mongo-документ в формат, подходящий для клиента.
 */
export class ProductRdo implements ProductResponse {
  /** Уникальный идентификатор */
  id: string;

  /** Название товара */
  name: string;

  /** Описание товара */
  description: string;

  /** Путь к изображению */
  image: string;

  /** Тип гитары (электро, акустика, укулеле) */
  type: string;

  /** Уникальный артикул */
  article: string;

  /** Количество струн */
  stringCount: number;

  /** Цена в рублях */
  price: number;

  /** Дата создания (в ISO формате) */
  createdAt: string;

  /** Дата обновления (в ISO формате) */
  updatedAt: string;

  constructor(product: ProductDocument) {
    this.id = product._id.toString();
    this.name = product.name;
    this.description = product.description;
    this.image = product.image;
    this.type = product.type;
    this.article = product.article;
    this.stringCount = product.stringCount;
    this.price = product.price;
    this.createdAt = product.createdAt.toISOString();
    this.updatedAt = product.updatedAt.toISOString();
  }
}
