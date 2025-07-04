import { JSX } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../constants/const.ts';

/**
 * Компонент-защита маршрутов.
 * Показывает вложенные маршруты (Outlet) только авторизованным пользователям.
 * В противном случае — делает редирект на страницу входа.
 */
export default function PrivateRoute(): JSX.Element {
  const authStatus = useAppSelector((state) => state.USER.authorizationStatus);

  return authStatus === AuthorizationStatus.Auth ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoute.Login} replace />
  );
}
