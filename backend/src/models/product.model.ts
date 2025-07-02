import { HydratedDocument, model, Schema } from 'mongoose';
import { GuitarStringCounts, GuitarType } from '../constants/product.constant';

/**
 * Локальный тип для схемы Mongoose
 * (используется только на бэке, без фронтовых DTO)
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

const productSchema = new Schema<ProductEntity>(
  {
    name: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
      maxlength: 1024,
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
      minlength: 5,
      maxlength: 40,
    },
    stringCount: {
      type: Number,
      required: true,
      enum: Object.values(GuitarStringCounts),
    },
    price: {
      type: Number,
      required: true,
      min: 100,
      max: 1000000,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export const ProductModel = model('Product', productSchema);
