import { UserDocument } from '../models/user.model';
import { UserResponse } from '../types/user-response.type';

/**
 * DTO для ответа с данными пользователя.
 * Используется для скрытия лишних полей и нормализации ответа.
 */
export class UserRdo implements UserResponse {
  id: string;
  name: string;
  email: string;

  constructor(user: UserDocument) {
    this.id = user._id?.toString();
    this.name = user.name;
    this.email = user.email;
  }
}
