"use client";

import { cn } from "@lib/utils";
import React, { useState, createContext, useContext, ReactNode } from "react";

interface DropdownContextProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const DropdownContext = createContext<DropdownContextProps | undefined>(
  undefined,
);

interface DropdownProps {
  children: ReactNode;
  onSelect: (value: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> & {
  Label: React.FC<{ children: ReactNode; className?: string }>;
  Select: React.FC<{
    placeholder?: string;
    children: ReactNode;
    className?: string;
  }>;
  Option: React.FC<{ value: string; children: ReactNode; className?: string }>;
} = ({ children, onSelect, className }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <DropdownContext.Provider
      value={{ selectedValue, setSelectedValue: handleSelectChange }}
    >
      <div className={cn("w-full max-w-xs", className)}>{children}</div>
    </DropdownContext.Provider>
  );
};

const Label: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <label className={cn("mb-2 block text-sm font-medium", className)}>
    {children}
  </label>
);

const Select: React.FC<{
  placeholder?: string;
  children: ReactNode;
  className?: string;
}> = ({ placeholder, children, className }) => {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("Dropdown.Select must be used within Dropdown component");
  }

  const { selectedValue, setSelectedValue } = context;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  return (
    <select
      value={selectedValue}
      onChange={handleChange}
      className={cn(
        "block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-green",
        className,
      )}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );
};

const Option: React.FC<{
  value: string;
  children: ReactNode;
  className?: string;
}> = ({ value, children, className }) => {
  return (
    <option className={cn("", className)} value={value}>
      {children}
    </option>
  );
};

Dropdown.Label = Label;
Dropdown.Select = Select;
Dropdown.Option = Option;

export default Dropdown;
