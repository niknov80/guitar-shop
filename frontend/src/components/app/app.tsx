import { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ProductListPage from '../../pages/product-list-page/product-list-page.tsx';
import LoginPage from '../../pages/login-page/login-page.tsx';
import RegisterPage from '../../pages/register-page/register-page.tsx';
import AddItemPage from '../../pages/add-item-page/add-item-page.tsx';
import ProductPage from '../../pages/product-page/product-page.tsx';
import NotFoundPage from '../../pages/not-found-page/not-found-page.tsx';
import EditItemPage from '../../pages/edit-item-page/edit-item-page.tsx';
import PrivateRoute from '../../routes/private-route/private-route.tsx';
import Layout from '../layout/layout.tsx';
import { AppRoute } from '../../constants/const.ts';
import HistoryRouter from '../../routes/history-router/history-router.tsx';
import { browserHistory } from '../../services/browser-history.ts';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route element={<Layout />}>
            {/* Общедоступные маршруты */}
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Register} element={<RegisterPage />} />
            <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
            <Route
              path={AppRoute.Index}
              element={<Navigate to={AppRoute.Products} />}
            />

            {/* Защищённые маршруты */}
            <Route element={<PrivateRoute />}>
              <Route path={AppRoute.Products} element={<ProductListPage />} />
              <Route path={AppRoute.Product} element={<ProductPage />} />
              <Route path={AppRoute.EditProduct} element={<EditItemPage />} />
              <Route path={AppRoute.AddProduct} element={<AddItemPage />} />
            </Route>
          </Route>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
