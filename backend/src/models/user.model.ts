import { HydratedDocument, model, Schema } from 'mongoose';

/**
 * Локальный тип для схемы Mongoose
 * (используется только на бэке, без фронтовых DTO)
 */
export interface UserEntity {
  name: string;
  email: string;
  password: string;
}

export type UserDocument = HydratedDocument<UserEntity>;

const userSchema = new Schema<UserEntity>({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = model('User', userSchema);
