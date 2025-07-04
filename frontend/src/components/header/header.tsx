import { JSX } from 'react';
import Logo from '../logo/logo.tsx';
import {
  AuthorizationStatus,
  LogoStyles,
  MainMenuType,
} from '../../constants/const.ts';
import User from '../user/user.tsx';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/user/user.selectors.ts';
import cx from 'classix';
import { MenuItemType } from '../../types/app.type.ts';
import MainMenu from '../main-menu/main-menu.tsx';

type HeaderProps = {
  menu: MenuItemType[];
};

function Header({ menu = MainMenuType.Public }: HeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return (
    <header
      className={cx(
        authorizationStatus === AuthorizationStatus.Auth && 'header--admin',
        'header',
      )}
      id="header"
    >
      <div className="container">
        <div className="header__wrapper">
          <Logo position={'header'} {...LogoStyles} />
          <MainMenu menu={menu} />
          <User />
        </div>
      </div>
    </header>
  );
}

export default Header;
