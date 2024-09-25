import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginUser } from "@api/types/user";
import { useRegister } from "@hooks/useRegister/useRegister";
import Button from "@components/UI/Button/Button";
import { Alert } from "@components/UI/Alert/Alert";
import { TFunction } from "i18next";

interface RegisterFormProps {
  t: TFunction;
}
const RegisterForm = ({ t }: RegisterFormProps) => {
  const router = useRouter();

  const redirectToRoutine = () => {
    router.push("/my-routine");
  };

  const { mutate, isPending } = useRegister(redirectToRoutine);

  const initialLogindFormData: LoginUser = {
    username: "",
    password: "",
  };

  const [formLoginData, setFormLoginData] = useState<LoginUser>(
    initialLogindFormData,
  );

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormLoginData({
      ...formLoginData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      await mutate(formLoginData);
    } catch (error) {
      console.error("Error while submitting form: ", error);
    }
  };
  return (
    <>
      <div className="w-full max-w-md">
        <h2 className="mb-6 text-center text-3xl font-semibold text-gray-800">
          {t("registerTitle")}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              {t("username")}
            </label>
            <input
              onChange={handleFormChange}
              id="username"
              name="username"
              type="username"
              autoComplete="username"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-primary-green focus:outline-none focus:ring-primary-green sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("password")}
            </label>
            <input
              onChange={handleFormChange}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-primary-green focus:outline-none focus:ring-primary-green sm:text-sm"
            />
          </div>

          <div className="flex flex-row gap-2">
            <p>{t("haveAccount")}</p>
            <Link
              href="/login"
              className="text-secondary-blue transition-transform duration-300 hover:scale-105 hover:text-secondary-blue-hover"
            >
              {t("login")}
            </Link>
          </div>
          <div>
            <Button fullWidth={true} disabled={isPending}>
              {t("signUp")}
            </Button>
          </div>
        </form>
        <Alert variant="warning" showIcon className="mt-5">
          <p>{t("registerWarning")}</p>
        </Alert>
      </div>
    </>
  );
};

export default RegisterForm;
