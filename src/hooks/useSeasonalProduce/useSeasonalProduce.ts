import { useQuery } from "@tanstack/react-query";
import { fetchSeasonalProduce } from "services/seasonal-produce/fetchSeasonalProduce";
import { SeasonalProduce } from "@/api/types/typesFromDB";

export const useSeasonalProduce = (hemisphere: string = "north") => {
  return useQuery<SeasonalProduce[], Error>({
    queryKey: ["seasonal-produce"],
    queryFn: () => fetchSeasonalProduce(hemisphere),
  });
};
