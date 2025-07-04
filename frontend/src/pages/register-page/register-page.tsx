import { JSX } from 'react';
import { useRegister } from '../../hooks/use-register';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/user/user.selectors.ts';
import { AppRoute, AuthorizationStatus } from '../../constants/const.ts';
import { Navigate } from 'react-router-dom';

function RegisterPage(): JSX.Element {
  const { formRegister, handleSubmit, errors, isSubmitting } = useRegister();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Index} />;
  }

  return (
    <div className="container">
      <section className="login">
        <h1 className="login__title">Регистрация</h1>
        <form method="post" onSubmit={handleSubmit}>
          <div className="input-login">
            <label htmlFor="name">Введите имя</label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              {...formRegister('name')}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="input-login__error">{errors.name.message}</p>
            )}
          </div>

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
            <label htmlFor="password">Придумайте пароль</label>
            <span>
              <input
                type="password"
                placeholder="• • • • • • • • • • • •"
                id="password"
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
            {isSubmitting ? 'Регистрируем...' : 'Зарегистрироваться'}
          </button>
        </form>
      </section>
    </div>
  );
}

export default RegisterPage;
