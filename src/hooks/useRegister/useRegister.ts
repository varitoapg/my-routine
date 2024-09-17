import { LoginUser } from "@/api/types/user";
import toastGenerator from "@/components/UI/toast/toastGenerator";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "lib/cookies/cookies";
import { register } from "services/auth/registerService/registerService";

export const useRegister = (onSuccessRedirect: () => void) => {
  return useMutation({
    mutationFn: (credentials: LoginUser) => register(credentials),
    onSuccess: (data) => {
      setCookie("auth_token", data.token, {
        expires: 1,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
      onSuccessRedirect();
      toastGenerator("Welcome!");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toastGenerator(error.message, "error");
      }
    },
  });
};
