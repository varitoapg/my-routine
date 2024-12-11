"use client";

import React, { ReactNode, useEffect } from "react";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import Button from "../Button/Button";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { BaseModalContext, useBaseModalContext } from "./BaseModalContext";

const modalStyles = cva(
  "fixed inset-0 flex-col flex z-50 m-auto justify-start",
  {
    variants: {
      size: {
        sm: "w-1/2 md:w-1/4 h-1/2",
        md: "w-1/2 h-2/3",
        lg: "w-3/4 h-3/4",
      },
      alignment: {
        start: "items-start",
        center: "items-center",
      },
    },
    defaultVariants: {
      size: "md",
      alignment: "center",
    },
  },
);

interface BaseModalProps extends VariantProps<typeof modalStyles> {
  title?: string;
  footer?: ReactNode;
  content?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isCentered?: boolean;
  closeOnEsc?: boolean;
  contentClassName?: string;
  alignment?: "start" | "center";
}

const BaseModal = ({
  title,
  isOpen,
  onClose,
  size = "md",
  alignment = "center",
  closeOnEsc = true,
  content,
  footer,
  contentClassName,
}: BaseModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEsc) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, closeOnEsc]);

  return (
    <BaseModalContext.Provider
      value={{ onClose, title, footer, content, contentClassName }}
    >
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50">
          <div
            className={clsx(
              modalStyles({ size, alignment }),
              "flex flex-col overflow-hidden rounded-lg bg-white shadow-lg",
            )}
          >
            {title && <BaseModal.Header />}
            {content && <BaseModal.Body />}
            {footer && <BaseModal.Footer />}
          </div>
        </div>
      )}
    </BaseModalContext.Provider>
  );
};

BaseModal.Header = function BaseModalHeader() {
  const { onClose, title } = useBaseModalContext();

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200 px-6 py-4 text-lg font-semibold">
      <span>{title}</span>
      <Button
        onClick={onClose}
        className="text-gray-500 hover:text-gray-800"
        icon={faTimesCircle}
        iconClassName="mr-0"
      />
    </div>
  );
};

BaseModal.Body = function BaseModalBody() {
  const { content, contentClassName } = useBaseModalContext();

  return (
    <div
      className={clsx("flex-grow overflow-y-auto px-6 py-4", contentClassName)}
    >
      {content}
    </div>
  );
};

BaseModal.Footer = function BaseModalFooter() {
  const { footer } = useBaseModalContext();
  return <div className="border-t border-gray-200 px-6 py-4">{footer}</div>;
};

export default BaseModal;
