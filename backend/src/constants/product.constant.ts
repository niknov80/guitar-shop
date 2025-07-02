export enum GuitarType {
  Electro = 'электро',
  Acoustic = 'аккустика',
  Ukulele = 'укулеле',
}

export const PRICE_RANGE = {
  MIN: 100,
  MAX: 1_000_000,
};

export const PRODUCT_NAME_LIMITS = { MIN: 10, MAX: 100 };
export const PRODUCT_DESCRIPTION_LIMITS = { MIN: 20, MAX: 1024 };
export const PRODUCT_ARTICLE_LIMITS = { MIN: 5, MAX: 40 };

export const PRODUCT_SORT_VALUES = ['priceAsc', 'priceDesc', 'dateAsc', 'dateDesc'] as const;

export const PAGE_SIZE = 7;
export const DEFAULT_PAGE = 1;
export const DEFAULT_SORT = 'dateAsc';
export const GuitarStringCounts = [4, 6, 7, 12] as const;
