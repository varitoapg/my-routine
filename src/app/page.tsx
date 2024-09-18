import { fetchSeasonalProduce } from "services/seasonal-produce/fetchSeasonalProduce";
import LoadingSpinner from "@components/UI/LoadingSpinner/LoadingSpinner";
import { SeasonalProduce } from "@/api/types/typesFromDB";
import { getServerTranslations } from "i18n/server";

export default async function HomePage() {
  const { t } = await getServerTranslations("products");
  let data: SeasonalProduce[] = [];
  let isLoading = true;

  try {
    data = await fetchSeasonalProduce("north");
    isLoading = false;
  } catch (error) {
    console.error("Error fetching seasonal produce:", error);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Seasonal Produce</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(data ?? []).map((produce) => (
          <div
            key={produce.seasonal_produce_id}
            className="rounded-lg border p-4 shadow-lg"
          >
            <h2 className="mt-2 text-xl font-semibold">
              {t(`${produce.name}`)}
            </h2>
            <p className="text-gray-600">{produce.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
