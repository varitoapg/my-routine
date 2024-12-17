import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React from "react";
const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 ease-in-out duration-300 disabled:cursor-not-allowed disabled:opacity-55",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-green text-dark-slate hover:bg-primary-green-hover focus:ring-primary-green-hover",
        secondary:
          "bg-primary-orange text-dark-slate hover:bg-primary-orange-hover focus:ring-primary-orange-hover",
        danger:
          "bg-accent-red text-dark-slate hover:bg-accent-red-hover focus:ring-accent-red-hover",
        alert:
          "bg-accent-yellow text-dark-slate hover:bg-accent-yellow-hover focus:ring-accent-yellow-hover",
        ghost:
          "bg-transparent text-dark-slate hover:bg-gray-100 focus:ring-gray-200",
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      border: {
        none: "",
        thin: "border border-gray-300",
        thick: "border-2 border-gray-500",
        colored: "border border-primary-green",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      border: "none",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  icon?: IconDefinition;
  iconPosition?: "left" | "right";
  iconClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  fullWidth,
  border,
  icon,
  iconPosition = "left",
  iconClassName = "",
  ...props
}) => {
  return (
    <button
      className={buttonStyles({ variant, size, fullWidth, border })}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <FontAwesomeIcon
          icon={icon}
          className={clsx({ "mr-2": !iconClassName }, iconClassName)}
        />
      )}
      {children}
      {icon && iconPosition === "right" && (
        <FontAwesomeIcon
          icon={icon}
          className={clsx({ "ml-2": !iconClassName }, iconClassName)}
        />
      )}
    </button>
  );
};

export default Button;
