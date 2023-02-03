import { Accessor } from "solid-js";
import { createStore } from "solid-js/store";
import { NewNotebookFormFields } from "../../../@types/components/forms/NewNotebookForm";

const submit = (form: NewNotebookFormFields) => {
  // here we can:
  // filter out unneeded data, e.g. the checkbox sameAsAddress
  // map fields, if needed, e.g. shipping_address
  const dataToSubmit = {
    name: form.name,
    description: form.description,
    color: form.color,
  };
  // should be submitting your form to some backend service
  console.log(`submitting ${JSON.stringify(dataToSubmit)}`);
};
const useNewNotebookForm = () => {
  const [form, setForm] = createStore<NewNotebookFormFields>({
    name: "",
    description: "",
    color: "",
  });

  const clearField = (fieldName: string) => {
    setForm({
      [fieldName]: "",
    });
  };

  const updateFormField = (fieldName: string) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    if (inputElement.type === "checkbox") {
      setForm({
        [fieldName]: !!inputElement.checked,
      });
    } else {
      setForm({
        [fieldName]: inputElement.value,
      });
    }
  };

  return { form, submit, updateFormField, clearField };
};

export { useNewNotebookForm };
