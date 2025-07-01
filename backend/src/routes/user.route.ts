import { Router } from 'express';
import { getCurrentUser, loginUser, registerUser } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateDto } from '../middlewares/validate-dto.middleware';
import { loginUserSchema } from '../schemas/login-user.schema';
import { registerUserSchema } from '../schemas/register-user.schema';

const router = Router();

/**
 * @route POST /users/register
 * @desc Регистрация нового пользователя
 */
router.post('/register', validateDto(registerUserSchema), registerUser);

/**
 * @route POST /users/login
 * @desc Аутентификация пользователя
 */
router.post('/login', validateDto(loginUserSchema), loginUser);

/**
 * @route GET /users/me
 * @desc Получение текущего пользователя по токену
 * @access Protected
 */
router.get('/me', authMiddleware, getCurrentUser);

export default router;
