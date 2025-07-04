import { JSX } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../constants/const.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectUserName } from '../../store/user/user.selectors.ts';
import { logoutAction } from '../../store/api-actions.ts';

function User(): JSX.Element {
  const userName = useAppSelector(selectUserName);
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    dispatch(logoutAction());
  };

  return (
    <div className="header__container">
      <span className="header__user-name">{userName}</span>
      <Link
        className="header__link"
        to={AppRoute.Login}
        aria-label="Перейти в личный кабинет"
        onClick={handleClick}
      >
        <svg
          className="header__link-icon"
          width="12"
          height="14"
          aria-hidden="true"
        >
          <use xlinkHref="#icon-account"></use>
        </svg>
        <span className="header__link-text">Вход</span>
      </Link>
    </div>
  );
}

export default User;
