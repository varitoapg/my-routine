import { LoginUser } from "@/api/types/user";
import toastGenerator from "@components/UI/toast/toastGenerator";
import { setCookie } from "@lib/cookies/cookies";
import { useMutation } from "@tanstack/react-query";
import { login } from "services/auth/loginService/loginService";

export const useLogin = (onSuccessRedirect: () => void) => {
  return useMutation({
    mutationFn: (credentials: LoginUser) => login(credentials),
    onSuccess: (data) => {
      setCookie("auth_token", data.token, {
        expires: 1,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
      onSuccessRedirect();
      toastGenerator("Welcome back!");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toastGenerator(error.message, "error");
      }
    },
  });
};
