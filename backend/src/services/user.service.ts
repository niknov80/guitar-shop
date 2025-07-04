import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import env from '../config/env.config';
import { JWT_ALGORITHM, SALT_ROUNDS } from '../constants/auth.constant';
import { ResponseMessages } from '../constants/response-message.constant';
import { UserDocument, UserModel } from '../models/user.model';
import { UserRdo } from '../rdo/user.rdo';

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
  static async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<{ user: UserRdo; token: string }> {
    const existing = await UserModel.findOne({ email });
    if (existing) {
      throw new Error(ResponseMessages.EmailInUse);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await UserModel.create({ name, email, password: hashedPassword });

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      name: user.name,
    };

    const jwtOptions: SignOptions = {
      expiresIn: env.JWT_EXPIRES_IN,
      algorithm: JWT_ALGORITHM as jwt.Algorithm,
    };

    const token = jwt.sign(payload, env.JWT_SECRET, jwtOptions);

    return {
      user: new UserRdo(user),
      token,
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
      throw new Error(ResponseMessages.UserNotFound);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error(ResponseMessages.InvalidPassword);
    }

    const tokenPayload = { email: user.email, name: user.name };
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
  static async getCurrentUser(userId: string): Promise<UserRdo> {
    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      throw new Error(ResponseMessages.UserNotFound);
    }

    return new UserRdo(user as UserDocument);
  }
}
