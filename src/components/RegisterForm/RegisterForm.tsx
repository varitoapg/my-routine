import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { useRegister } from "@hooks/useRegister/useRegister";
import Button from "@components/UI/Button/Button";
import { Alert } from "@components/UI/Alert/Alert";
import TextInput from "@components/Form/TextInput/TextInput";
import PasswordInput from "@components/Form/PasswordInput/PasswordInput";
import { TFunction } from "i18next";
import { getRegisterSchema } from "./RegisterValidation";
import { LoginUser } from "@api/types/user";

interface RegisterFormProps {
  t: TFunction;
}

const RegisterForm = ({ t }: RegisterFormProps) => {
  const router = useRouter();

  const redirectToRoutine = () => {
    router.push("/my-routine");
  };

  const { mutate, isPending } = useRegister(redirectToRoutine);

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
        {t("registerTitle")}
      </h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={getRegisterSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-6">
            <Field
              name="username"
              id="username"
              label={t("username")}
              component={TextInput}
              required
            />

            <Field
              name="password"
              id="password"
              label={t("password")}
              component={PasswordInput}
              required
            />

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
              <Button
                fullWidth={true}
                disabled={isPending || isSubmitting || !isValid}
                type="submit"
              >
                {t("signUp")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Alert variant="warning" showIcon className="mt-5">
        <p>{t("registerWarning")}</p>
      </Alert>
    </div>
  );
};

export default RegisterForm;
