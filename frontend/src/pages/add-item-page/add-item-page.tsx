import { JSX } from 'react';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs.tsx';
import AddNewProduct from '../../components/add-new-product/add-new-product.tsx';

function AddItemPage(): JSX.Element {
  return (
    <section className="add-item">
      <div className="container">
        <h1 className="add-item__title">Новый товар</h1>
        <Breadcrumbs />
        <AddNewProduct />
      </div>
    </section>
  );
}

export default AddItemPage;
