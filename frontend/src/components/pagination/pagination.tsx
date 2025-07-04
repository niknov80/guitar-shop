import { JSX } from 'react';
import {
  selectCurrentPage,
  selectTotalPages,
} from '../../store/product/product.selectors.ts';
import { setCurrentPage } from '../../store/product/product.slice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './pagination.css';

function Pagination(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);

  const goToPage = (page: number) => (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(setCurrentPage(page));
  };

  const renderPages = () => {
    const pages: JSX.Element[] = [];

    // 1-я страница
    pages.push(
      <li
        key={1}
        className={`pagination__page${
          currentPage === 1 ? ' pagination__page--active' : ''
        }`}
      >
        <a
          href="#1"
          className="link pagination__page-link"
          onClick={goToPage(1)}
        >
          1
        </a>
      </li>,
    );

    // Если нужно вставить ...
    if (totalPages > 3) {
      if (currentPage > 2 && currentPage < totalPages - 1) {
        // current посередине
        pages.push(
          <li key="dots" className="pagination__page">
            <span className="pagination__page-link">...</span>
          </li>,
        );
        pages.push(
          <li
            key={currentPage}
            className="pagination__page pagination__page--active"
          >
            <a
              href={`#${currentPage}`}
              className="link pagination__page-link"
              onClick={goToPage(currentPage)}
            >
              {currentPage}
            </a>
          </li>,
        );
      } else if (currentPage === totalPages - 1) {
        pages.push(
          <li
            key={currentPage}
            className="pagination__page pagination__page--active"
          >
            <a
              href={`#${currentPage}`}
              className="link pagination__page-link"
              onClick={goToPage(currentPage)}
            >
              {currentPage}
            </a>
          </li>,
        );
      } else if (currentPage > 2) {
        pages.push(
          <li key="dots" className="pagination__page">
            <span className="pagination__page-link">...</span>
          </li>,
        );
      }
    }

    // Последняя страница
    if (totalPages > 1) {
      pages.push(
        <li
          key={totalPages}
          className={`pagination__page${
            currentPage === totalPages ? ' pagination__page--active' : ''
          }`}
        >
          <a
            href={`#${totalPages}`}
            className="link pagination__page-link"
            onClick={goToPage(totalPages)}
          >
            {totalPages}
          </a>
        </li>,
      );
    }

    return pages;
  };

  return (
    <div className="pagination product-list__pagination">
      <ul className="pagination__list">
        {/* Назад */}
        <li
          className={`pagination__page pagination__page--prev${
            currentPage === 1 ? ' pagination__page--disabled' : ''
          }`}
        >
          <a
            href={`#${currentPage - 1}`}
            className="link pagination__page-link"
            onClick={currentPage === 1 ? undefined : goToPage(currentPage - 1)}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : 0}
          >
            Назад
          </a>
        </li>

        {renderPages()}

        {/* Далее */}
        <li
          className={`pagination__page pagination__page--next${
            currentPage === totalPages ? ' pagination__page--disabled' : ''
          }`}
        >
          <a
            href={`#${currentPage + 1}`}
            className="link pagination__page-link"
            onClick={
              currentPage === totalPages ? undefined : goToPage(currentPage + 1)
            }
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : 0}
          >
            Далее
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
