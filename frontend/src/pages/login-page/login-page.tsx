import { JSX } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants/const';
import { useLogin } from '../../hooks/use-login';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/user/user.selectors.ts';

function LoginPage(): JSX.Element {
  const { formRegister, handleSubmit, errors, isSubmitting } = useLogin();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Index} />;
  }

  return (
    <div className="container">
      <section className="login">
        <h1 className="login__title">Войти</h1>
        <p className="login__text">
          Новый пользователь?{' '}
          <Link className="login__link" to={AppRoute.Register}>
            Зарегистрируйтесь
          </Link>{' '}
          прямо сейчас
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              {...formRegister('email')}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="input-login__error">{errors.email.message}</p>
            )}
          </div>

          <div className="input-login">
            <label htmlFor="passwordLogin">Введите пароль</label>
            <span>
              <input
                type="password"
                placeholder="• • • • • • • • • • • •"
                id="passwordLogin"
                autoComplete="off"
                {...formRegister('password')}
                disabled={isSubmitting}
              />
              <button className="input-login__button-eye" type="button">
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"></use>
                </svg>
              </button>
            </span>
            {errors.password && (
              <p className="input-login__error">{errors.password.message}</p>
            )}
          </div>

          <button
            className="button login__button button--medium"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Входим...' : 'Войти'}
          </button>
        </form>
      </section>
    </div>
  );
}

export default LoginPage;
