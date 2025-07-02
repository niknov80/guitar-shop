import { ProductResponse } from '../../../shared/types/product-responce.type';
import { ProductDocument } from '../models/product.model';

/**
 * DTO для возврата товара в API-ответе.
 */
export class ProductRdo implements ProductResponse {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  article: string;
  stringCount: number;
  price: number;
  createdAt: string;
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
