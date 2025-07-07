import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../constants/const.ts';

function AddNewProductButton(): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(AppRoute.AddProduct);
  };

  return (
    <button
      className="button product-list__button button--red button--big"
      type="button"
      onClick={handleClick}
    >
      Добавить новый товар
    </button>
  );
}

export default AddNewProductButton;
