import { Component, useContext } from "solid-js";
import { SelectInputOption } from "../../../@types/components/inputs/SelectInput";
import { AppContext } from "../../../contexts/AppContext";
import { mapColorToClass } from "../../../utils/GenericUtils";
import { SelectInput } from "../../inputs/SelectInput";
import { SubmitInput } from "../../inputs/SubmitInput";
import { TextInput } from "../../inputs/TextInput";
import { useNewNotebookForm } from "./newNotebookFormHook";

export const NewNotebookForm: Component = () => {
  const { form, updateFormField, submit, clearField } = useNewNotebookForm();
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
    event.preventDefault();
    submit(form);
  };

  return (
    <form onSubmit={handleSubmit} class="w-full flex flex-col items-center">
      <TextInput
        label={contextData.t("components.forms.NewNotebookForm.nameField")}
        placeholder={contextData.t(
          "components.forms.NewNotebookForm.nameFieldPlaceholder"
        )}
        value={form.name}
        onChange={updateFormField("name")}
        class="mb-4 mt-4"
      />
      <TextInput
        label={contextData.t(
          "components.forms.NewNotebookForm.descriptionField"
        )}
        placeholder={contextData.t(
          "components.forms.NewNotebookForm.descriptionFieldPlaceholder"
        )}
        value={form.description}
        onChange={updateFormField("description")}
        class="mb-4 mt-4"
      />
      <div class="w-full mb-4 mt-4 relative">
        <SelectInput
          label={contextData.t("components.forms.NewNotebookForm.colorField")}
          options={NOTEBOOK_COLORS}
          value={form.color}
          onChange={updateFormField("color")}
        />
        <div class="absolute top-[4px] left-[52px]">
          <span
            class={
              "block w-5 h-5 rounded-full " +
              mapColorToClass(form.color ?? "bg-black")
            }
          ></span>
        </div>
      </div>
      <div class="w-60">
        <SubmitInput label="Criar" />
      </div>
    </form>
  );
};
