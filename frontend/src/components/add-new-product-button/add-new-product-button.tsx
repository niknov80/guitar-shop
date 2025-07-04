import { JSX } from 'react';

function AddNewProductButton(): JSX.Element {
  return (
    <button className="button product-list__button button--red button--big">
      Добавить новый товар
    </button>
  );
}

export default AddNewProductButton;
