/**
 * Тип данных пользователя, возвращаемый из API.
 * Используется на фронте для типизации ответов.
 */
export type UserResponse = {
  id: string;
  name: string;
  email: string;
};
