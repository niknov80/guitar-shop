import { HydratedDocument, model, Schema } from 'mongoose';

// Ограничения валидации
const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 15;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

/**
 * Mongoose-сущность пользователя.
 * Используется только на серверной стороне.
 */
export interface UserEntity {
  name: string;
  email: string;
  password: string;
}

export type UserDocument = HydratedDocument<UserEntity>;

/**
 * Схема пользователя для MongoDB.
 * Используется при регистрации и авторизации.
 */
const userSchema = new Schema<UserEntity>({
  name: {
    type: String,
    required: true,
    minlength: NAME_MIN_LENGTH,
    maxlength: NAME_MAX_LENGTH,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: EMAIL_REGEX,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * Модель пользователя, связанная с коллекцией `users` в MongoDB.
 */
export const UserModel = model('User', userSchema);
