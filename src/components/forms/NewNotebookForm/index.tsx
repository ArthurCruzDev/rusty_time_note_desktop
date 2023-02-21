import { Component, createEffect, createSignal, useContext } from "solid-js";
import { SelectInputOption } from "../../../@types/components/inputs/SelectInput";
import { AppContext } from "../../../contexts/AppContext";
import { useFormWithValidation } from "../../../hooks/FormWithValidationHook/indext";
import { mapColorToClass } from "../../../utils/GenericUtils";
import { SelectInput } from "../../inputs/SelectInput";
import { SubmitInput } from "../../inputs/SubmitInput";
import { TextInput } from "../../inputs/TextInput";

export const NewNotebookForm: Component = () => {
  const { submit, registerField, watchField, isFieldValid } =
    useFormWithValidation();
  const [contextData, { switchTheme, switchLang }] = useContext(AppContext);

  const NOTEBOOK_COLORS: SelectInputOption[] = [
    // { name: "", value: "black" },
    { name: contextData.t("constants.NotebookColors.red"), value: "red" },
    { name: contextData.t("constants.NotebookColors.purple"), value: "purple" },
    { name: contextData.t("constants.NotebookColors.blue"), value: "blue" },
    { name: contextData.t("constants.NotebookColors.green"), value: "green" },
    { name: contextData.t("constants.NotebookColors.yellow"), value: "yellow" },
    { name: contextData.t("constants.NotebookColors.orange"), value: "orange" },
    { name: contextData.t("constants.NotebookColors.gray"), value: "gray" },
    { name: contextData.t("constants.NotebookColors.black"), value: "black" },
  ];

  const handleSubmit = (event: Event): void => {
    console.log("Form Submitted");
  };

  const validateDescription = (fieldValue: string) => {
    return fieldValue !== "" && fieldValue !== undefined ? true : false;
  };

  console.log("New Notebook Form Rendered");

  return (
    <form
      onSubmit={(event) => submit(event, handleSubmit)}
      class="w-full flex flex-col items-center"
    >
      <TextInput
        label={contextData.t("components.forms.NewNotebookForm.nameField")}
        placeholder={contextData.t(
          "components.forms.NewNotebookForm.nameFieldPlaceholder"
        )}
        {...registerField("testeAltura")}
        class="mb-4 mt-4"
        // validation={(value) => {
        //   if (!value) {
        //     return <span>É obrigatório informar um nome para o caderno</span>;
        //   } else if (value.lenght <= 3) {
        //     return <span>Nome precisa ter pelo menos 3 caracteres</span>;
        //   } else {
        //     return <></>;
        //   }
        // }}
      />
      <TextInput
        label={contextData.t(
          "components.forms.NewNotebookForm.descriptionField"
        )}
        placeholder={contextData.t(
          "components.forms.NewNotebookForm.descriptionFieldPlaceholder"
        )}
        {...registerField("testeAltura2", validateDescription, true)}
        class="mb-4 mt-4"
        validationMessage={
          isFieldValid("testeAltura2") ? undefined : "testeAltura2 inválido"
        }
      />
      <div class="w-full mb-4 mt-4 relative">
        <SelectInput
          label={contextData.t("components.forms.NewNotebookForm.colorField")}
          options={NOTEBOOK_COLORS}
          {...registerField("testeAltura3")}
        />
        <div class="absolute top-[4px] left-[52px]">
          <span
            class={
              "block w-5 h-5 rounded-full " +
              mapColorToClass(watchField("testeAltura3")?.value ?? "bg-black")
            }
          ></span>
        </div>
      </div>
      <div class="w-60 mt-4">
        <SubmitInput label="Criar" />
      </div>
    </form>
  );
};
