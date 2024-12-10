"use client";

import BaseModal from "@components/UI/Modal/BaseModal";
import React, { useState } from "react";

interface ModalComponentProps {
  children:
    | React.ReactNode
    | ((
        setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
      ) => React.ReactNode);
  show?: boolean;
  onHide?: () => void;
  size?: "md" | "lg" | "sm";
  title?: string;
  scrollBehavior?: "inside" | "outside";
  renderButton?: (handleOpenModal: () => void) => React.ReactNode;
  footer?: React.ReactNode;
  contentClassName?: string;
  alignment?: "start" | "center";
}

function ModalComponent({
  children,
  show,
  onHide,
  size = "lg",
  alignment = "center",
  title = "",
  renderButton,
  footer,
  contentClassName,
}: ModalComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const renderChildren =
    typeof children === "function" ? children(setIsModalOpen) : children;

  return (
    <>
      <BaseModal
        isOpen={show || isModalOpen}
        size={size}
        closeOnEsc
        title={title}
        onClose={onHide || (() => setIsModalOpen(false))}
        content={renderChildren}
        footer={footer}
        contentClassName={contentClassName}
        alignment={alignment}
      >
        {title && <BaseModal.Header />}
        {renderChildren && <BaseModal.Body />}
        {footer && <BaseModal.Footer />}
      </BaseModal>
      {renderButton && renderButton(handleOpenModal)}
    </>
  );
}

export default ModalComponent;
