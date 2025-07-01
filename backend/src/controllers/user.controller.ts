import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';

/**
 * Контроллер для регистрации нового пользователя.
 *
 * @route POST /users/register
 */
export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    const user = await UserService.createUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * Контроллер для входа пользователя по email и паролю.
 *
 * @route POST /users/login
 */
export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const token = await UserService.validateUser(email, password);
    res.json({ accessToken: token });
  } catch (error) {
    next(error);
  }
}

/**
 * Контроллер для получения информации о текущем авторизованном пользователе.
 *
 * @route GET /users/me
 * @middleware requires auth (token in header)
 */
export async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await UserService.getCurrentUser(userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
}
