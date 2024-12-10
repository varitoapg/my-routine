import React from "react";
import { FieldProps } from "formik";

interface TextAreaInputProps extends FieldProps {
  label: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}

const TextAreaInput = ({
  field,
  form: { touched, errors },
  label,
  required = false,
  rows = 4,
  placeholder = "",
}: TextAreaInputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <div className="relative">
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700"
      >
        {`${label} ${required ? "*" : ""}`}
      </label>
      <textarea
        {...field}
        id={field.name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md border ${
          errorMessage ? "border-accent-red" : "border-gray-300"
        } px-4 py-2 shadow-sm focus:border-primary-green focus:outline-none focus:ring-primary-green sm:text-sm`}
      />
      {errorMessage && (
        <div className="mt-1 text-sm text-accent-red">
          {errorMessage as string}
        </div>
      )}
    </div>
  );
};

export default TextAreaInput;
