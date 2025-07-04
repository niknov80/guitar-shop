export type GuitarType = 'аккустика' | 'электро' | 'укулеле';
export type StringCount = 4 | 6 | 7 | 12;

export type ProductFilter = {
  type?: string;
  stringCount?: string;
  minPrice?: number;
  maxPrice?: number;
};
