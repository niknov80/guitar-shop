import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import env from '../config/env.config';
import { JWT_ALGORITHM, SALT_ROUNDS } from '../constants/auth.constant';
import { UserModel } from '../models/user.model';

/**
 * Сервис для работы с пользователями.
 */
export class UserService {
  /**
   * Создаёт нового пользователя с хешированием пароля.
   *
   * @param name - Имя пользователя (1–15 символов)
   * @param email - Уникальный email
   * @param password - Пароль (5–12 символов)
   * @returns Информация о созданном пользователе (без пароля)
   * @throws Error если пользователь с таким email уже существует
   */
  static async createUser(name: string, email: string, password: string) {
    const existing = await UserModel.findOne({ email });
    if (existing) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await UserModel.create({ name, email, password: hashedPassword });

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }

  /**
   * Проверяет логин/пароль и возвращает JWT при успехе.
   *
   * @param email - Email пользователя
   * @param password - Пароль в открытом виде
   * @returns JWT токен
   * @throws Error если пользователь не найден или пароль не совпадает
   */
  static async validateUser(email: string, password: string): Promise<string> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const tokenPayload = { email: user.email };
    const jwtOptions: SignOptions = {
      subject: user._id.toString(),
      expiresIn: env.JWT_EXPIRES_IN,
      algorithm: JWT_ALGORITHM as jwt.Algorithm,
    };

    return jwt.sign(tokenPayload, env.JWT_SECRET, jwtOptions);
  }

  /**
   * Получает информацию об авторизованном пользователе по ID.
   *
   * @param userId - MongoDB ObjectId в виде строки
   * @returns Объект пользователя без пароля
   * @throws Error если пользователь не найден
   */
  static async getCurrentUser(userId: string) {
    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }
}
