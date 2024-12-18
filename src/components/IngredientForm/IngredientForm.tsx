import { Formik, Form, Field } from "formik";
import Button from "@components/UI/Button/Button";
import TextInput from "@components/Form/TextInput/TextInput";
import { TFunction } from "i18next";
import { Ingredients } from "@api/types/typesFromDB";
import { ingredientValidation } from "./ingredientValidation";
import TextAreaInput from "@components/Form/TextAreaInput/TextAreaInput";
import { useAddIngredient } from "@hooks/ingredient/useAddIngredient";
import { useGetAllMeasures } from "@hooks/measure/useGetAllMeasures";
import CustomSelect from "@components/Form/CustomSelect/CustomSelect";
import LoadingSpinner from "@components/UI/LoadingSpinner/LoadingSpinner";

interface IngredientFormProps {
  ingredient: null | Partial<Ingredients>;
  t: TFunction;
  isEdit: boolean;
  onClose?: () => void;
}

const IngredientForm = ({
  t,
  ingredient,
  isEdit = false,
  onClose,
}: IngredientFormProps) => {
  const { mutate, isPending } = useAddIngredient({ onSuccess: onClose });

  const { data: measures, isError, isLoading } = useGetAllMeasures();

  const handleSubmit = async (values: Partial<Ingredients>) => {
    try {
      await mutate(values);
    } catch (error) {
      console.error("Error while submitting form: ", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={
          isEdit && ingredient ? ingredient : { name: "", id_measure: "" }
        }
        validationSchema={ingredientValidation(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="flex flex-grow flex-col space-y-6">
            <div className="flex-grow space-y-6 overflow-y-auto">
              <Field
                name="name"
                id="name"
                label={t("name")}
                component={TextInput}
                required
              />

              {/* TODO: Wrap it in a better loading manager */}
              {isLoading || isError ? (
                <LoadingSpinner />
              ) : (
                <Field
                  name="id_measure"
                  id="id_measure"
                  label={t("measure")}
                  component={CustomSelect}
                  options={measures?.map((measure) => ({
                    label: t(`measureUnit.${measure.name}`),
                    value: measure.measure_id,
                  }))}
                  required
                />
              )}

              <Field
                name="description"
                id="description"
                label={t("description")}
                component={TextAreaInput}
                rows={1}
              />
            </div>

            <div className="mt-auto">
              <Button
                fullWidth={true}
                disabled={isPending || isSubmitting || !isValid}
                type="submit"
              >
                {t("addIngredient")}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default IngredientForm;
