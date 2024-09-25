import { AuthResponse, LoginUser } from "@api/types/user";

export const login = async (credentials: LoginUser): Promise<AuthResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.error);
  }

  return response.json();
};
