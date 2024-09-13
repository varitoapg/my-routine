import { useState } from "react";
import Button from "../UI/Button/Button";
import Link from "next/link";

const RegisterForm = () => {
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
          Welcome to your new life
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
              type="text"
              autoComplete="current-password"
              required
              className="focus:ring-primary-green focus:border-primary-green mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none sm:text-sm"
            />
          </div>

          <div className="flex flex-row gap-2">
            <p>Do you already have an account?</p>
            <Link
              href="/login"
              className="text-secondary-blue hover:text-secondary-blue-hover transition-transform duration-300 hover:scale-105"
            >
              Log in
            </Link>
          </div>
          <div>
            <Button fullWidth={true}>Sign up</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
