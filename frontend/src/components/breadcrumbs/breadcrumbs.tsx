import { JSX } from 'react';
import { Link } from 'react-router-dom';

function Breadcrumbs(): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to="./main.html">
          Главная
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to="./main.html">
          Каталог
        </Link>
      </li>
      <li className="breadcrumbs__item">
        <a className="link">Товар</a>
      </li>
    </ul>
  );
}

export default Breadcrumbs;
