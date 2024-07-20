// utils/authToken.ts
let authToken: string | undefined = undefined;
let refToken: string | undefined = undefined;

export const setAuthToken = (token: string) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

export const setRefToken = (token: string) => {
  refToken = token;
};

export const getRefToken = () => refToken;

