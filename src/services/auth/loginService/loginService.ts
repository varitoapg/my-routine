import { LoginUser } from "@/api/types/user";

interface LoginResponse {
  token: string;
}

export const login = async (credentials: LoginUser): Promise<LoginResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error ${response.status}: ${errorData.error}`);
  }

  return response.json();
};
