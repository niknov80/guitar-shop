import { HydratedDocument, model, Schema } from 'mongoose';
import { GuitarStringCounts, GuitarType } from '../constants/product.constant';

// Ограничения валидации
const NAME_MIN_LENGTH = 10;
const NAME_MAX_LENGTH = 100;
const DESCRIPTION_MIN_LENGTH = 20;
const DESCRIPTION_MAX_LENGTH = 1024;
const ARTICLE_MIN_LENGTH = 5;
const ARTICLE_MAX_LENGTH = 40;
const PRICE_MIN = 100;
const PRICE_MAX = 1_000_000;

/**
 * Mongoose-сущность продукта.
 * Используется только на серверной стороне.
 */
export interface ProductEntity {
  name: string;
  description: string;
  image: string;
  type: string;
  article: string;
  stringCount: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ProductDocument = HydratedDocument<ProductEntity>;

/**
 * Схема продукта для MongoDB.
 * Включает автоматические метки времени и все ограничения, заданные ТЗ.
 */
const productSchema = new Schema<ProductEntity>(
  {
    name: {
      type: String,
      required: true,
      minlength: NAME_MIN_LENGTH,
      maxlength: NAME_MAX_LENGTH,
    },
    description: {
      type: String,
      required: true,
      minlength: DESCRIPTION_MIN_LENGTH,
      maxlength: DESCRIPTION_MAX_LENGTH,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(GuitarType),
    },
    article: {
      type: String,
      required: true,
      unique: true,
      minlength: ARTICLE_MIN_LENGTH,
      maxlength: ARTICLE_MAX_LENGTH,
    },
    stringCount: {
      type: Number,
      required: true,
      enum: Object.values(GuitarStringCounts),
    },
    price: {
      type: Number,
      required: true,
      min: PRICE_MIN,
      max: PRICE_MAX,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

/**
 * Модель продукта, используемая для взаимодействия с коллекцией в MongoDB.
 */
export const ProductModel = model('Product', productSchema);
