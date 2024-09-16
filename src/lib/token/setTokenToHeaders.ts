import { getAuthToken } from "./getToken";

export const setTokenToHeaders = (options: RequestInit) => {
  const token = getAuthToken();

  const headers = new Headers(options.headers);
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  return headers;
};
