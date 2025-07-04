/**
 * Тип ответа API с товаром.
 * Используется на фронте для типизации ответов.
 */
export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  article: string;
  stringCount: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}
