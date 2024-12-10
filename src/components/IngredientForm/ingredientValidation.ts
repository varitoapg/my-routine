import * as Yup from "yup";
import { TFunction } from "i18next";

export const ingredientValidation = (t: TFunction) =>
  Yup.object().shape({
    name: Yup.string().required(t("nameIngredientRequired")),
    id_measure: Yup.string().required(t("measureIngredientRequired")),
  });
