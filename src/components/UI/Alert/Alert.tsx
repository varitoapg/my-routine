import { cva, VariantProps } from "class-variance-authority";
import { FC, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faInfoCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { twMerge } from "tailwind-merge";

const alertVariants = cva("p-4 rounded-lg flex items-center justify-center", {
  variants: {
    variant: {
      success: "bg-green-50 text-green-800 border border-green-200",
      error: "bg-red-50 text-red-800 border border-red-200",
      warning: "bg-yellow-50 text-yellow-800 border border-yellow-200",
      info: "bg-blue-50 text-blue-800 border border-blue-200",
    },
    fullWidth: {
      true: "w-full",
      false: "inline-flex",
    },
  },
  defaultVariants: {
    variant: "info",
    fullWidth: false,
  },
});

type AlertIconProps = {
  variant: "success" | "error" | "warning" | "info";
};

const AlertIcon: FC<AlertIconProps> = ({ variant }) => {
  switch (variant) {
    case "success":
      return (
        <FontAwesomeIcon
          icon={faCheckCircle}
          className="h-6 w-6 text-green-500"
        />
      );
    case "error":
      return (
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="h-6 w-6 text-red-500"
        />
      );
    case "warning":
      return (
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className="h-6 w-6 text-yellow-500"
        />
      );
    case "info":
      return (
        <FontAwesomeIcon
          icon={faInfoCircle}
          className="h-6 w-6 text-blue-500"
        />
      );
    default:
      return null;
  }
};

interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: string;
  children?: ReactNode;
  showIcon?: boolean;
  className?: string;
}

export const Alert: FC<AlertProps> = ({
  variant,
  title,
  children,
  showIcon = false,
  className,
  fullWidth = false,
}) => {
  return (
    <div className={twMerge(alertVariants({ variant, fullWidth }), className)}>
      {showIcon && (
        <div className="flex-shrink-0">
          <AlertIcon variant={variant!} />
        </div>
      )}
      <div className={`${showIcon ? "ml-3" : "w-full text-center"}`}>
        {title && <div className="font-medium">{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
};
