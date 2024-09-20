import { i18n } from "i18next";
import { LangSelect } from "./LangSelect";
import clsx from "clsx";

const FooterBase = ({
  i18n,
  className = "",
}: {
  i18n: i18n;
  className?: string;
}) => {
  const lng = i18n.resolvedLanguage!;

  return (
    <footer className={clsx("w-full p-4", className)}>
      <LangSelect currentLanguage={lng} />
    </footer>
  );
};

export default FooterBase;
