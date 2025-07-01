import { model, Schema } from 'mongoose';
import { GuitarStringCounts, GuitarType } from '../constants/product.constant';

const productSchema = new Schema(
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
    photo: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(GuitarType),
    },
    vendorCode: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 40,
    },
    stringCount: {
      type: Number,
      required: true,
      enum: GuitarStringCounts,
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
