"use client";

import LoadingSpinner from "@components/UI/LoadingSpinner/LoadingSpinner";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const LoginForm = dynamic(() => import("@components/LoginForm/LoginForm"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const LoginPage = () => {
  const { t } = useTranslation("auth");
  return <LoginForm t={t} />;
};

export default LoginPage;
