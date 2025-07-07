import { UserDocument } from '../models/user.model';
import { UserResponse } from '../types/user-response.type';

/**
 * DTO (Response Data Object) для возврата пользователя в API-ответе.
 * Используется для скрытия лишних полей и нормализации структуры.
 */
export class UserRdo implements UserResponse {
  /** Уникальный идентификатор пользователя */
  id: string;

  /** Имя пользователя */
  name: string;

  /** Email пользователя */
  email: string;

  constructor(user: UserDocument) {
    this.id = user._id?.toString();
    this.name = user.name;
    this.email = user.email;
  }
}
