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
import PrivateRoute from '../private-route/private-route.tsx';
import { AppRoute } from '../../const.ts';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        {/* Общедоступные маршруты */}
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />

        {/* Приватные маршруты */}
        <Route
          path={AppRoute.Index}
          element={<Navigate to={AppRoute.Products} />}
        />
        <Route
          path={AppRoute.Products}
          element={
            <PrivateRoute>
              <ProductListPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Product}
          element={
            <PrivateRoute>
              <ProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.EditProduct}
          element={
            <PrivateRoute>
              <EditItemPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.AddProduct}
          element={
            <PrivateRoute>
              <AddItemPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
