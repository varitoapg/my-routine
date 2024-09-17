"use client";

import LoadingSpinner from "@/components/UI/LoadingSpinner/LoadingSpinner";
import dynamic from "next/dynamic";

const RegisterForm = dynamic(
  () => import("@/components/RegisterForm/RegisterForm"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  },
);

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
