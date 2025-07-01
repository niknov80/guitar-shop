import { Navigate } from 'react-router-dom';
import { JSX } from 'react';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
};

export default function PrivateRoute({
  children,
}: PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  return isAuthorized ? children : <Navigate to={AppRoute.Login} />;
}
