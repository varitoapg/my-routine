import React, { useState } from "react";
import { FieldProps } from "formik";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "@components/UI/Button/Button";

interface PasswordInputProps extends FieldProps {
  label: string;
  required?: boolean;
}

const PasswordInput = ({
  field,
  form: { touched, errors },
  label,
  required = false,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <div className="relative">
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700"
      >
        {`${label} ${required ? "*" : ""}`}
      </label>
      <input
        {...field}
        id={field.name}
        type={showPassword ? "text" : "password"}
        required={required}
        autoComplete="off"
        className={`mt-1 block w-full rounded-md border ${
          errorMessage ? "border-accent-red" : "border-gray-300"
        } px-4 py-2 shadow-sm focus:border-primary-green focus:outline-none focus:ring-primary-green sm:text-sm`}
      />
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={toggleShowPassword}
        icon={showPassword ? faEyeSlash : faEye}
        className="absolute right-3 top-8"
        aria-label="Toggle password visibility"
      />
      {errorMessage && (
        <div className="mt-1 text-sm text-accent-red">
          {errorMessage as string}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
