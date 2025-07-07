import { matchPath } from 'react-router-dom';
import { AppRoute, MainMenuType, STRING_COUNTS } from '../constants/const.ts';
import { StringCount } from '../types/product.type.ts';

export type TTypeAs<T extends Record<string, string>> = T[keyof T];

export function getMenuByRoute(pathname: string) {
  const matched = (
    [
      [AppRoute.Product, MainMenuType.Admin],
      [AppRoute.EditProduct, MainMenuType.Admin],
      [AppRoute.Products, MainMenuType.Admin],
      [AppRoute.AddProduct, MainMenuType.Admin],
      [AppRoute.Login, MainMenuType.Public],
      [AppRoute.Register, MainMenuType.Public],
    ] as [string, { title: string; link: string }[]][]
  ).find(([pattern]) => matchPath(pattern, pathname));

  return matched?.[1] ?? MainMenuType.Public;
}

export const formatPrice = (price: number): string => {
  return `${price.toLocaleString('ru-RU')} ₽`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU');
};

export const parseCommaSeparated = <T = string>(input?: string): T[] => {
  if (!input) {
    return [];
  }
  return input.split(',').filter(Boolean) as T[];
};

export const isStringCount = (value: unknown): value is StringCount => {
  return (
    typeof value === 'number' && STRING_COUNTS.includes(value as StringCount)
  );
};
