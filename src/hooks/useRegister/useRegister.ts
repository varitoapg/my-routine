import { LoginUser } from "@api/types/user";
import toastGenerator from "@components/UI/toast/toastGenerator";
import { setCookie } from "@lib/cookies/cookies";
import { AppError } from "@lib/errors/AppError";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { register } from "services/auth/registerService/registerService";

export const useRegister = (onSuccessRedirect: () => void) => {
  const { t } = useTranslation(["auth", "error"]);

  return useMutation({
    mutationFn: (credentials: LoginUser) => register(credentials),
    onSuccess: (data) => {
      setCookie("auth_token", data.token, {
        expires: 1,
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
      toastGenerator(t("welcome"));
      onSuccessRedirect();
    },
    onError: (error: unknown) => {
      if (error instanceof AppError) {
        toastGenerator(t(error.code, { ns: "error" }), "error");
      } else {
        toastGenerator(t("generalError", { ns: "error" }), "error");
      }
    },
  });
};
