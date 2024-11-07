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
}

function ModalComponent({
  children,
  show,
  onHide,
  size = "lg",
  title = "",
  renderButton,
  footer,
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
      >
        <BaseModal.Header />
        <BaseModal.Body />
        <BaseModal.Footer />
      </BaseModal>
      {renderButton && renderButton(handleOpenModal)}
    </>
  );
}

export default ModalComponent;
