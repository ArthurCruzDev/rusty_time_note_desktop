import { createStore } from "solid-js/store";
import {
  FormWithValidation,
  FormWithValidationField,
} from "../../@types/hooks/FormWithValidationHook";

function useFormWithValidation<T extends Object>() {
  const [formData, setFormData] = createStore<FormWithValidation>({
    fields: [],
  });

  function registerField(
    fieldName: string,
    validationFunction?: (fieldValue: any) => boolean,
    validateAfterTouched?: boolean
  ) {
    setFormData("fields", (formData) =>
      formData.filter((field) => field.name !== fieldName)
    );
    setFormData("fields", (formData) => [
      ...formData,
      {
        name: fieldName,
        validation: validationFunction ?? undefined,
        validateAfterTouched: validateAfterTouched ?? false,
        touched: false,
        isValid: true,
        value: "",
      },
    ]);

    const onInput = (event: InputEvent) => {
      let oldField = formData.fields.find((data) => data.name === fieldName);

      let valid = oldField?.isValid;
      if (oldField?.validation) {
        if (oldField.validateAfterTouched) {
          if (oldField.touched) {
            valid = oldField.validation(
              (event.currentTarget as HTMLInputElement).value
            );
          } else {
            valid = true;
          }
        } else {
          valid = oldField.validation(
            (event.currentTarget as HTMLInputElement).value
          );
        }
      }
      setFormData("fields", (field) => field.name === fieldName, {
        touched: true,
        value: (event.currentTarget as HTMLInputElement).value,
        isValid: valid,
      });
    };

    const onFocusOut = (_: any) => {
      let oldField = formData.fields.find((data) => data.name === fieldName);

      let valid = oldField?.isValid;
      if (oldField?.validation) {
        if (oldField.validateAfterTouched) {
          valid = oldField.validation(oldField.value);
        }
      }

      setFormData("fields", (field) => field.name === fieldName, {
        touched: true,
        isValid: valid,
      });
    };

    return {
      onInput,
      onFocusOut,
      name: fieldName,
    };
  }

  function watchField(fieldName: string) {
    return formData.fields.find((data) => data.name === fieldName);
  }

  function isFieldValid(fieldName: string) {
    return formData.fields.find((data) => data.name === fieldName)?.isValid;
  }

  const submit = (
    event: Event,
    externalSubmitFunction: (formData: FormWithValidationField[]) => void
  ) => {
    event.preventDefault();
    let isFormValid = true;

    setFormData(
      "fields",
      (field) => (field.validation ? !field.validation(field.value) : false),
      (field) => {
        let newField = {
          ...field,
          touched: true,
          isValid: false,
        };
        isFormValid = false;
        return newField;
      }
    );

    if (isFormValid) {
      externalSubmitFunction(formData.fields);
    }
  };

  return { submit, registerField, watchField, isFieldValid };
}

export { useFormWithValidation };
