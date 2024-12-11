import { fetchAllMeasures } from "@/services/measures/fetchAllMeasures";
import { Measures } from "@api/types/typesFromDB";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetAllMeasures = (
  options?: UseQueryOptions<Measures[], unknown>,
) => {
  return useQuery({
    queryKey: ["measures"],
    queryFn: fetchAllMeasures,
    ...options,
  });
};
