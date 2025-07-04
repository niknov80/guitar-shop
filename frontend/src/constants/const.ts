export const AppRoute = {
  Index: '/',
  Login: '/login',
  Register: '/register',
  Products: '/products',
  Product: '/products/:id',
  AddProduct: '/add',
  EditProduct: '/products/:id/edit',
  NotFound: '*',
};

export const APIRoute = {
  Login: 'users/login',
  Logout: 'users/logout',
  Register: 'users/register',
  CheckAuth: 'users/check',
  Products: '/products',
} as const;

export const LogoStyles = {
  width: 70,
  height: 70,
  src: './img/svg/logo.svg',
  alt: 'Логотип',
};

export const NameSpace = {
  User: 'USER',
  Product: 'PRODUCT',
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

export const MenuItem = {
  Catalog: { title: 'Каталог', link: AppRoute.Products },
  ProductList: { title: 'Список товаров', link: '#' },
  About: { title: 'О компании 122', link: '#' },
  WhereBuy: { title: 'Где купить', link: '#' },
};

export const MainMenuType = {
  Admin: [MenuItem.Catalog, MenuItem.ProductList],
  Public: [MenuItem.Catalog, MenuItem.WhereBuy, MenuItem.About],
};
