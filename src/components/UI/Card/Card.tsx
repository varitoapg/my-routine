import { FC, ReactNode } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const cardVariants = cva("rounded-lg shadow-md overflow-hidden", {
  variants: {
    variant: {
      default: "bg-white border border-gray-200",
      primary: "bg-blue-50 border border-blue-200",
      success: "bg-green-50 border border-green-200",
      warning: "bg-yellow-50 border border-yellow-200",
      danger: "bg-red-50 border border-red-200",
    },
    fullWidth: {
      true: "w-full",
      false: "max-w-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    fullWidth: false,
  },
});

interface CardProps extends VariantProps<typeof cardVariants> {
  children: ReactNode;
  className?: string;
}

const CardTitle: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <h2 className={twMerge("border-b p-4 text-lg font-semibold", className)}>
    {children}
  </h2>
);

const CardBody: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={twMerge("p-4", className)}>{children}</div>;

const CardFooter: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => <div className={twMerge("border-t p-4", className)}>{children}</div>;

const Card: FC<CardProps> & {
  Title: typeof CardTitle;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
} = ({ variant, fullWidth, children, className }) => {
  return (
    <div className={twMerge(cardVariants({ variant, fullWidth }), className)}>
      {children}
    </div>
  );
};

Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
