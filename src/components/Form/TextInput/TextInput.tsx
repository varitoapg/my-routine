import React from "react";
import { FieldProps } from "formik";

interface TextInputProps extends FieldProps {
  label: string;
  required?: boolean;
}

const TextInput = ({
  field,
  form: { touched, errors },
  label,
  required = false,
}: TextInputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <div>
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700"
      >
        {`${label} ${required ? "*" : ""}`}
      </label>
      <input
        {...field}
        id={field.name}
        type="text"
        required={required}
        autoComplete="off"
        className={`mt-1 block w-full rounded-md border ${
          errorMessage ? "border-red-500" : "border-gray-300"
        } px-4 py-2 shadow-sm focus:border-primary-green focus:outline-none focus:ring-primary-green sm:text-sm`}
      />
      {errorMessage && (
        <div className="mt-1 text-sm text-red-500">
          {errorMessage as string}
        </div>
      )}
    </div>
  );
};

export default TextInput;
