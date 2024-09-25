import { LoginUser } from "@api/types/user";
import toastGenerator from "@components/UI/toast/toastGenerator";
import { COOKIES, setCookie } from "@lib/cookies/cookies";
import { AppError } from "@lib/errors/AppError";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { login } from "services/auth/loginService/loginService";

export const useLogin = (onSuccessRedirect: () => void) => {
  const { t } = useTranslation("auth");
  return useMutation({
    mutationFn: (credentials: LoginUser) => login(credentials),
    onSuccess: (data) => {
      setCookie(COOKIES.AUTH, data.token, {
        expires: 1,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
      onSuccessRedirect();
      toastGenerator(t("welcomeBack"));
    },
    onError: (error: unknown) => {
      toastGenerator(t((error as AppError).message), "error");
    },
  });
};
