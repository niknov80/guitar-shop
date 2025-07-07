import { ProductResponse } from './product-responce.type.ts';
import { STRING_COUNTS } from '../constants/const.ts';

export type ProductListResponse = {
  items: ProductResponse[];
  totalPages: number;
};

export enum GuitarType {
  Electro = 'электро',
  Acoustic = 'аккустика',
  Ukulele = 'укулеле',
}

export type StringCount = (typeof STRING_COUNTS)[number];
