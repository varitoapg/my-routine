import { i18n, TFunction } from "i18next";
import { LangSelect } from "./LangSelect";
import { Trans } from "react-i18next/TransWithoutContext";
import clsx from "clsx";

const FooterBase = ({
  t,
  i18n,
  className = "",
}: {
  t: TFunction;
  i18n: i18n;
  className?: string;
}) => {
  const lng = i18n.resolvedLanguage!;

  return (
    <footer className={clsx("", className)}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from
        <strong>{lng}</strong>
        to:
      </Trans>
      <LangSelect currentLanguage={lng} />
    </footer>
  );
};

export default FooterBase;
