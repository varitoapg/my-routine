import FooterBase from "./FooterBase";
import { getServerTranslations } from "@/i18n/server";

interface FooterProps {
  className?: string;
}

export const Footer = async ({ className = "" }: FooterProps) => {
  const { i18n } = await getServerTranslations("footer");

  return <FooterBase i18n={i18n} className={className} />;
};
