export const AppRoute = {
  Index: '/',
  Login: '/login',
  Register: '/register',
  Products: '/products',
  Product: '/products/:id',
  AddProduct: '/add',
  EditProduct: '/products/:id/edit',
  NotFound: '*',

  // функции для генерации ссылок
  getProductPath: (id: string) => `/products/${id}`,
  getEditProductPath: (id: string) => `/products/${id}/edit`,
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

export const ProductLimits = {
  Name: { Min: 10, Max: 100 },
  Description: { Min: 20, Max: 1024 },
  Article: { Min: 5, Max: 40 },
  Price: { Min: 100, Max: 1_000_000 },
};

export const STRING_COUNTS = [4, 6, 7, 12] as const;
