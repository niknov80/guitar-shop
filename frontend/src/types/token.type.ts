export type TokenType = {
  accessToken: string;
};

export type TokenWithUserType = {
  accessToken: string;
  user: {
    email: string;
    name: string;
    id: string;
  };
};
