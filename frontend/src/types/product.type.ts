import { ProductResponse } from './product-responce.type.ts';

export type ProductListResponse = {
  items: ProductResponse[];
  totalPages: number;
};
