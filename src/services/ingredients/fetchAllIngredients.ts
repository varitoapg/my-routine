import { Ingredients } from "@api/types/typesFromDB";
import { setTokenToHeaders } from "@lib/token/setTokenToHeaders";

export const fetchAllIngredients = async (): Promise<Ingredients[]> => {
  const headers = setTokenToHeaders({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}ingredient`, {
    ...headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error ${response.status}: ${errorData.error}`);
  }

  const responseData = await response.json();

  return responseData.data;
};
