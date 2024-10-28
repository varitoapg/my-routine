"use client";

import LoadingSpinner from "@components/UI/LoadingSpinner/LoadingSpinner";
import toastGenerator from "@components/UI/toast/toastGenerator";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const LoginForm = dynamic(() => import("@components/LoginForm/LoginForm"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const LoginPage = () => {
  const searchParams = useSearchParams();
  const { t } = useTranslation("auth");
  const hasShownToastRef = useRef(false);

  useEffect(() => {
    if (searchParams!.has("unauthorized") && !hasShownToastRef.current) {
      toastGenerator(t("unauthorizedAccess"));
      hasShownToastRef.current = true;
    }
  }, [searchParams, t]);

  return <LoginForm t={t} />;
};

export default LoginPage;
