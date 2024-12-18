import { FieldProps } from "formik";
import React from "react";
import Select, { OnChangeValue, Options } from "react-select";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "@components/UI/Button/Button";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: Options<Option>;
  label: string;
  required?: boolean;
  refetch?: () => void;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const CustomSelect = ({
  className,
  placeholder,
  field,
  form,
  options,
  label,
  required = false,
  refetch,
  isMulti = false,
}: CustomSelectProps) => {
  const onChange = (option: OnChangeValue<Option | Option[], boolean>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value,
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return isMulti ? [] : ("" as any);
    }
  };

  return (
    <div>
      <label
        htmlFor={field.name}
        className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700"
      >
        {`${label} ${required ? "*" : ""}`}
        {refetch && (
          <Button
            variant="ghost"
            size="sm"
            icon={faSyncAlt}
            onClick={refetch}
            iconClassName="pr-0"
            aria-label="Refresh options"
            border="thin"
            id={field.name}
            type="button"
          />
        )}
      </label>
      <Select
        className={className}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
      />
    </div>
  );
};

export default CustomSelect;
