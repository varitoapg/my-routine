import { AuthResponse, LoginUser } from "@api/types/user";
import { AppError } from "@lib/errors/AppError";

export const register = async (
  credentials: LoginUser,
): Promise<AuthResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new AppError(data.code, data.message, response.status);
  }

  return data;
};
