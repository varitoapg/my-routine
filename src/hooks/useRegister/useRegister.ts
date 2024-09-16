import { LoginUser } from "@/api/types/user";
import { useMutation } from "@tanstack/react-query";
import { setToken } from "lib/token/setToken";
import { register } from "services/auth/registerService/registerService";

export const useRegister = (onSuccessRedirect: () => void) => {
  return useMutation({
    mutationFn: (credentials: LoginUser) => register(credentials),
    onSuccess: (data) => {
      //TODO: create a toast service
      setToken(data.token);
      onSuccessRedirect();
    },
    onError: (error: unknown) => {
      // TODO: create a toast service
      if (error instanceof Error) {
        alert(`Register failed: ${error.message}`);
      }
    },
  });
};
