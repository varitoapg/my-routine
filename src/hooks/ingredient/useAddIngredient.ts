import { addIngredient } from "@/services/ingredients/addIngredient";
import { Ingredients } from "@api/types/typesFromDB";
import toastGenerator from "@components/UI/toast/toastGenerator";
import { AppError } from "@lib/errors/AppError";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useAddIngredient = (
  options?: UseMutationOptions<Ingredients, unknown, Partial<Ingredients>>,
) => {
  const { t } = useTranslation(["ingredient", "error"]);

  return useMutation({
    mutationFn: (Ingredients: Partial<Ingredients>) =>
      addIngredient(Ingredients),
    onSuccess: (data, variables, context) => {
      toastGenerator(t("newIngredient"));
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error: unknown) => {
      if (error instanceof AppError) {
        toastGenerator(t(error.code, { ns: "error" }), "error");
      } else {
        toastGenerator(t("generalError", { ns: "error" }), "error");
      }
    },
  });
};
