import { JSX } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs.tsx';
import Pagination from '../../components/pagination/pagination.tsx';
import Catalog from '../../components/catalog/catalog.tsx';
import AddNewProductButton from '../../components/add-new-product-button/add-new-product-button.tsx';

function ProductListPage(): JSX.Element {
  return (
    <section className="product-list">
      <div className="container">
        <h1 className="product-list__title">Список товаров</h1>
        <Breadcrumbs />
        <Catalog />
        <AddNewProductButton />
        <Pagination />
      </div>
    </section>
  );
}

export default ProductListPage;
