import { useState } from "react";
import Button from "../UI/Button/Button";
import Link from "next/link";

const LoginForm = () => {
  const initialLogindFormData = {
    username: "",
    password: "",
  };

  const [formLoginData, setFormLoginData] = useState(initialLogindFormData);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormLoginData({
      ...formLoginData,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formDataToSubmit = {
      username: formLoginData.username,
      password: formLoginData.password,
    };

    try {
      console.log("Form data to submit: ", formDataToSubmit);
    } catch (error) {
      console.error("Error while submitting form: ", error);
    }
  };
  return (
    <>
      <div className="w-full max-w-md">
        <h2 className="mb-6 text-center text-3xl font-semibold text-gray-800">
          Login to your account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              onChange={handleFormChange}
              id="username"
              name="username"
              type="username"
              autoComplete="username"
              required
              className="focus:ring-primary-green focus:border-primary-green mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={handleFormChange}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="focus:ring-primary-green focus:border-primary-green mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none sm:text-sm"
            />
          </div>
          <div className="flex flex-row gap-2">
            <p>Don&apos;t you have an account?</p>
            <Link
              href="/register"
              className="text-secondary-blue hover:text-secondary-blue-hover transition-transform duration-300 hover:scale-105"
            >
              Create one
            </Link>
          </div>

          {/* TODO: Implement recover and remember me */}
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="text-primary-green focus:ring-primary-green h-4 w-4 rounded border-gray-300"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="text-primary-green hover:text-primary-green-hover font-medium"
              >
                Forgot your password?
              </a>
            </div>
          </div> */}
          <div>
            <Button fullWidth={true}>Sign in</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
