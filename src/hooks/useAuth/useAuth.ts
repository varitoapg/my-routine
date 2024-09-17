import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

export const useAuth = () => {
  const router = useRouter();
  const cookies = parseCookies();
  const token = cookies.auth_token;

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  return token;
};
