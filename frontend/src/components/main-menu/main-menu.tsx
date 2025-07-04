import { JSX } from 'react';
import MainMenuItem from '../main-menu-item/main-menu-item.tsx';
import { MenuItemType } from '../../types/app.type.ts';

type MainMenuItemProps = {
  menu: MenuItemType[];
};

function MainMenu({ menu }: MainMenuItemProps): JSX.Element {
  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        {menu.map((item, index) => (
          <MainMenuItem title={item.title} link={item.link} key={index} />
        ))}
      </ul>
    </nav>
  );
}

export default MainMenu;
