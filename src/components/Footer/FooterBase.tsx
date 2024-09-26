import { i18n } from "i18next";
import clsx from "clsx";
import dynamic from "next/dynamic";
import LoadingSpinner from "@components/UI/LoadingSpinner/LoadingSpinner";

const LangSelect = dynamic(() => import("./LangSelect"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

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
