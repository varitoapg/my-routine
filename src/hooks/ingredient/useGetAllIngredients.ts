import { fetchAllIngredients } from "@/services/ingredients/fetchAllIngredients";
import { Ingredients } from "@api/types/typesFromDB";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetAllIngredients = (
  options?: UseQueryOptions<Ingredients[], unknown>,
) => {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchAllIngredients,
    ...options,
  });
};
