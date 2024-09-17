import { LoginUser } from "@/api/types/user";
import toastGenerator from "@/components/UI/toast/toastGenerator";
import { useMutation } from "@tanstack/react-query";
import { setToken } from "lib/token/setToken";
import { login } from "services/auth/loginService/loginService";

export const useLogin = (onSuccessRedirect: () => void) => {
  return useMutation({
    mutationFn: (credentials: LoginUser) => login(credentials),
    onSuccess: (data) => {
      setToken(data.token);
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
