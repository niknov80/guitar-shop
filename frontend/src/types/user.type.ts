export type UserType = {
  name: string;
};

export type UserDataType = UserType & {
  sub: string;
  email: string;
};

export type UserAuthorizationType = {
  email: string;
  password: string;
};
