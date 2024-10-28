import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { useLogin } from "@hooks/useLogin/useLogin";
import { LoginUser } from "@api/types/user";
import Button from "@components/UI/Button/Button";
import { TFunction } from "i18next";
import TextInput from "@components/Form/TextInput/TextInput";
import PasswordInput from "@components/Form/PasswordInput/PasswordInput";

interface LoginFormProps {
  t: TFunction;
}

const LoginForm = ({ t }: LoginFormProps) => {
  const router = useRouter();

  const redirectToRoutine = () => {
    router.push("/my-routine");
  };

  const { mutate, isPending } = useLogin(redirectToRoutine);

  const handleSubmit = async (values: LoginUser) => {
    try {
      await mutate(values);
    } catch (error) {
      console.error("Error while submitting form: ", error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="mb-6 text-center text-3xl font-semibold text-gray-800">
        {t("loginTitle")}
      </h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <Field
              name="username"
              id="username"
              label={t("username")}
              component={TextInput}
            />
            <Field
              name="password"
              id="password"
              label={t("password")}
              component={PasswordInput}
            />
            <div className="flex flex-row gap-2">
              <p>{t("notAccount")}</p>
              <Link
                href="/register"
                className="text-secondary-blue transition-transform duration-300 hover:scale-105 hover:text-secondary-blue-hover"
              >
                {t("createAccount")}
              </Link>
            </div>
            <div>
              <Button fullWidth={true} disabled={isPending || isSubmitting}>
                {t("signIn")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
