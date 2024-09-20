"use client";

import { languages } from "../../i18n/settings";
import { useRouter } from "next/navigation";
import i18next from "i18next";
import Dropdown from "@components/Dropdown/Dropdown";
import { useTranslation } from "react-i18next";

interface LangSelectProps {
  currentLanguage: string;
}

export const LangSelect = ({ currentLanguage }: LangSelectProps) => {
  const { t } = useTranslation("footer");
  const router = useRouter();

  const handleChangeLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
    router.refresh();
  };

  return (
    <div>
      <Dropdown onSelect={handleChangeLanguage}>
        <Dropdown.Label>{t("selectLanguage")}</Dropdown.Label>
        <Dropdown.Select placeholder={t(currentLanguage)} className="max-w-36">
          {languages.map((lang) => (
            <Dropdown.Option key={lang} value={lang}>
              {t(lang)}
            </Dropdown.Option>
          ))}
        </Dropdown.Select>
      </Dropdown>
    </div>
  );
};
