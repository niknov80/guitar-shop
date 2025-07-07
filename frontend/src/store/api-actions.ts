import { createAsyncThunk } from '@reduxjs/toolkit';
import { decodeToken, dropToken, setToken } from '../api/token.ts';
import { APIRoute, NameSpace } from '../constants/const.ts';
import { LoginFormData } from '../schemas/login-schema.ts';
import { RegisterFormData } from '../schemas/register-schema.ts';
import { TokenType, TokenWithUserType } from '../types/token.type.ts';
import { UserDataType } from '../types/user.type.ts';
import { ThunkApiConfig } from './types.ts';
import { ProductListResponse } from '../types/product.type.ts';
import { StateType } from '../types/state.type.ts';
import { ProductResponse } from '../types/product-responce.type.ts';

const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();

export const checkAuthAction = createAppAsyncThunk<UserDataType, undefined>(
  `${NameSpace.User}/checkAuth`,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserDataType>(APIRoute.CheckAuth);
    return data;
  },
);

export const loginAction = createAppAsyncThunk<UserDataType, LoginFormData>(
  `${NameSpace.User}/login`,
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<TokenType>(APIRoute.Login, {
      email,
      password,
    });
    setToken(data.accessToken);
    const tokenData = decodeToken(data.accessToken);

    return {
      email: tokenData.email,
      sub: tokenData.sub,
      name: tokenData.name,
    };
  },
);

export const registerAction = createAppAsyncThunk<
  UserDataType,
  RegisterFormData
>(
  `${NameSpace.User}/register`,
  async ({ email, password, name }, { extra: api }) => {
    const { data } = await api.post<TokenWithUserType>(APIRoute.Register, {
      email,
      password,
      name,
    });
    setToken(data.accessToken);

    return {
      email: data.user.email,
      sub: data.user.id,
      name: data.user.name,
    };
  },
);

export const logoutAction = createAppAsyncThunk<void, undefined>(
  `${NameSpace.User}/logout`,
  async (_arg) => {
    dropToken();
  },
);

export const fetchProducts = createAppAsyncThunk<ProductListResponse, number>(
  `${NameSpace.Product}/fetchProducts`,
  async (page, { getState, extra: api }) => {
    const state = getState() as StateType;
    const sort = state.PRODUCT.sort;
    const filters = state.PRODUCT.filters;

    const { data } = await api.get<ProductListResponse>(APIRoute.Products, {
      params: {
        page,
        limit: 7,
        sort,
        ...filters,
      },
    });

    return data;
  },
);

export const createProductAction = createAppAsyncThunk<
  ProductListResponse,
  FormData
>(`${NameSpace.Product}/create`, async (formData, { extra: api }) => {
  const { data } = await api.post<ProductListResponse>(
    APIRoute.Products,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
});

export const fetchProductById = createAppAsyncThunk<ProductResponse, string>(
  `${NameSpace.Product}/fetchById`,
  async (id, { extra: api }) => {
    const { data } = await api.get<ProductResponse>(
      `${APIRoute.Products}/${id}`,
    );
    return data;
  },
);

export const updateProductAction = createAppAsyncThunk<
  ProductResponse,
  { id: string; formData: FormData }
>(`${NameSpace.Product}/update`, async ({ id, formData }, { extra: api }) => {
  const { data } = await api.patch<ProductResponse>(
    `${APIRoute.Products}/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
});

export const deleteProductAction = createAppAsyncThunk<void, string>(
  `${NameSpace.Product}/delete`,
  async (id, { extra: api }) => {
    await api.delete(`${APIRoute.Products}/${id}`);
  },
);
