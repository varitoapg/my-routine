import * as Yup from "yup";
import { TFunction } from "i18next";

export const getRegisterSchema = (t: TFunction) =>
  Yup.object().shape({
    username: Yup.string()
      .required(t("usernameRequired"))
      .min(3, t("usernameMinLength")),
    password: Yup.string()
      .required(t("passwordRequired"))
      .min(8, t("passwordMinLength")),
  });
