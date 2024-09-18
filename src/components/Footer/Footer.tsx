"use client";

import { useTranslation } from "react-i18next";
import FooterBase from "./FooterBase";

interface FooterProps {
  className?: string;
}
export const Footer = ({ className = "" }: FooterProps) => {
  const { t, i18n } = useTranslation("footer");
  return <FooterBase t={t} i18n={i18n} className={className} />;
};
