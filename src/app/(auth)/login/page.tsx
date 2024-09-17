"use client";

import LoadingSpinner from "@components/UI/LoadingSpinner/LoadingSpinner";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@components/LoginForm/LoginForm"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
