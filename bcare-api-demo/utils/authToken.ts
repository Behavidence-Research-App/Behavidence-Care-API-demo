// utils/authToken.ts
let authToken: string | undefined = undefined;

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

