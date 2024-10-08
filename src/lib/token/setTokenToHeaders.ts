import { COOKIES, getCookie } from "@lib/cookies/cookies";

export const setTokenToHeaders = (options: RequestInit) => {
  const token = getCookie(COOKIES.AUTH);

  const headers = new Headers(options.headers);
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  return headers;
};
