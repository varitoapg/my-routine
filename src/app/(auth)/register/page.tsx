"use client";

import LoadingSpinner from "@components/UI/LoadingSpinner/LoadingSpinner";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const RegisterForm = dynamic(
  () => import("@components/RegisterForm/RegisterForm"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);

const RegisterPage = () => {
  const { t } = useTranslation("auth");

  return <RegisterForm t={t} />;
};

export default RegisterPage;
