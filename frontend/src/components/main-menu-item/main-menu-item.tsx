import { Link } from 'react-router-dom';
import { JSX } from 'react';

type MainMenuItemProps = {
  title: string;
  link: string;
};

function MainMenuItem({ title, link }: MainMenuItemProps): JSX.Element {
  const isStub = link === '#';

  return (
    <li className="main-nav__item">
      {isStub ? (
        <a
          href="#"
          className="link main-nav__link"
          onClick={(e) => e.preventDefault()}
        >
          {title}
        </a>
      ) : (
        <Link className="link main-nav__link" to={link}>
          {title}
        </Link>
      )}
    </li>
  );
}

export default MainMenuItem;
