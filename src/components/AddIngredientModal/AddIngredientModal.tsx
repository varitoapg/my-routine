"use client";

import IngredientForm from "@components/IngredientForm/IngredientForm";
import ModalComponent from "@components/ModalComponent/ModalComponent";
import Button from "@components/UI/Button/Button";
import { useTranslation } from "react-i18next";

const AddIngredientModal = () => {
  const { t } = useTranslation("ingredient");

  return (
    <ModalComponent
      title={t("newIngredientTitle")}
      renderButton={(handleOpenModal) => (
        <Button onClick={handleOpenModal}>Add Ingredient</Button>
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
