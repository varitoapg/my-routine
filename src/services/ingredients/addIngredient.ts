import { Ingredients } from "@api/types/typesFromDB";
import { AppError } from "@lib/errors/AppError";
import { setTokenToHeaders } from "@lib/token/setTokenToHeaders";

export const addIngredient = async (
  ingredient: Partial<Ingredients>,
): Promise<Ingredients> => {
  const headers = setTokenToHeaders({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredient),
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}ingredient`, {
    ...headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new AppError(data.code, data.message, response.status);
  }

  return data;
};
