import { LoginUser } from "@/api/types/user";
import { useMutation } from "@tanstack/react-query";
import { setToken } from "lib/token/setToken";
import { login } from "services/auth/loginService/loginService";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginUser) => login(credentials),
    onSuccess: (data) => {
      //TODO: create a toast service
      setToken(data.token);
    },
    onError: (error: unknown) => {
      // TODO: create a toast service
      if (error instanceof Error) {
        alert(`Login failed: ${error.message}`);
      }
    },
  });
};
