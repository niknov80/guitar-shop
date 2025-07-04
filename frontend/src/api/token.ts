import { jwtDecode } from 'jwt-decode';

/**
 * Имя ключа токена в localStorage.
 */
const TOKEN_KEY = 'guitar-shop-token';

type TokenPayload = {
  email: string;
  sub: string;
  iat: number;
  exp: number;
  name: string;
};

/**
 * Сохраняет JWT токен в localStorage.
 * @param token JWT токен для сохранения
 */
export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Получает JWT токен из localStorage.
 * @returns JWT токен или null, если отсутствует
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Удаляет JWT токен из localStorage.
 */
export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const decodeToken = (token: string): TokenPayload => {
  return jwtDecode<TokenPayload>(token);
};
