import { SeasonalProduce } from "@/api/types/typesFromDB";

export const fetchSeasonalProduce = async (
  hemisphere: string = "north",
): Promise<SeasonalProduce[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}seasonal-produce?hemisphere=${hemisphere}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error ${response.status}: ${errorData.error}`);
  }

  return response.json();
};
