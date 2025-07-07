import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateDto } from '../middlewares/validate-dto.middleware';
import { loginUserSchema } from '../schemas/login-user.schema';
import { registerUserSchema } from '../schemas/register-user.schema';

const router = Router();

/**
 * @route POST /users/register
 * @desc Регистрация нового пользователя
 */
router.post(
  '/register',
  validateDto(registerUserSchema),
  UserController.registerUser.bind(UserController)
);

/**
 * @route POST /users/login
 * @desc Аутентификация пользователя
 */
router.post('/login', validateDto(loginUserSchema), UserController.loginUser.bind(UserController));

/**
 * @route GET /users/me
 * @desc Получение текущего пользователя по токену
 * @access Protected
 */
router.get('/me', authMiddleware, UserController.getCurrentUser.bind(UserController));

router.get('/check', authMiddleware, UserController.checkAuth.bind(UserController));

export default router;
