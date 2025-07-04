import { JSX, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../header/header.tsx';
import Footer from '../footer/footer.tsx';
import { useAppDispatch } from '../../hooks';
import { checkAuthAction } from '../../store/api-actions.ts';
import { getMenuByRoute } from '../../utils/helpers.ts';

function Layout(): JSX.Element {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  const currentMenu = getMenuByRoute(location.pathname);

  return (
    <div className="wrapper">
      <Header menu={currentMenu} />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
