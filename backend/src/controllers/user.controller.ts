import { NextFunction, Request, Response } from 'express';
import { ResponseMessages } from '../constants/response-message.constant';
import { UserService } from '../services/user.service';

/**
 * Контроллер для работы с пользователями.
 */
export class UserController {
  /**
   * Регистрация нового пользователя.
   *
   * @route POST /users/register
   */
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    console.log('>> register handler called', req.body);
    try {
      const { name, email, password } = req.body;
      const { user, token } = await UserService.createUser(name, email, password);

      res.status(201).json({
        user,
        accessToken: token,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Авторизация пользователя (логин).
   *
   * @route POST /users/login
   */
  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await UserService.validateUser(email, password);
      res.json({ accessToken: token });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получение текущего авторизованного пользователя.
   *
   * @route GET /users/me
   * @middleware requires auth (token in header)
   */
  static async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: ResponseMessages.Unauthorized });
        return;
      }

      const user = await UserService.getCurrentUser(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async checkAuth(req: Request, res: Response) {
    res.status(200).json(req.user);
  }
}
