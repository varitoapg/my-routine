import { Measures } from "@api/types/typesFromDB";

export const fetchAllMeasures = async (): Promise<Measures[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}measure`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error ${response.status}: ${errorData.error}`);
  }

  const responseData = await response.json();

  return responseData.data;
};
