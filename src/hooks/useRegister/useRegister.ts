import { LoginUser } from "@/api/types/user";
import toastGenerator from "@/components/UI/toast/toastGenerator";
import { useMutation } from "@tanstack/react-query";
import { setToken } from "lib/token/setToken";
import { register } from "services/auth/registerService/registerService";

export const useRegister = (onSuccessRedirect: () => void) => {
  return useMutation({
    mutationFn: (credentials: LoginUser) => register(credentials),
    onSuccess: (data) => {
      setToken(data.token);
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
