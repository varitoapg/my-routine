"use client";

import IngredientForm from "@components/IngredientForm/IngredientForm";
import ModalComponent from "@components/ModalComponent/ModalComponent";
import Button, {
  ButtonBorder,
  ButtonSize,
  ButtonVariant,
} from "@components/UI/Button/Button";
import { useTranslation } from "react-i18next";

interface AddIngredientModalProps {
  openModalButtonProps?: {
    size?: ButtonSize;
    variant?: ButtonVariant;
    border?: ButtonBorder;
  };
}

const AddIngredientModal = ({
  openModalButtonProps,
}: AddIngredientModalProps) => {
  const { t } = useTranslation("ingredient");

  return (
    <ModalComponent
      title={t("newIngredientTitle")}
      renderButton={(handleOpenModal) => (
        <Button
          onClick={handleOpenModal}
          size={openModalButtonProps?.size}
          variant={openModalButtonProps?.variant}
          border={openModalButtonProps?.border}
        >
          {t("ingredientModalButton")}
        </Button>
      )}
      size="sm"
      alignment="start"
      contentClassName="w-full"
    >
      {(setIsModalOpen) => (
        <IngredientForm
          ingredient={null}
          t={t}
          isEdit={false}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </ModalComponent>
  );
};

export default AddIngredientModal;
