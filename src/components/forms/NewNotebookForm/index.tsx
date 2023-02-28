import { useNavigate } from "@solidjs/router";
import { invoke } from "@tauri-apps/api";
import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  useContext,
} from "solid-js";
import { toast } from "solid-toast";
import { SelectInputOption } from "../../../@types/components/inputs/SelectInput";
import { Notebook } from "../../../@types/entities/Notebook";
import { FormWithValidationField } from "../../../@types/hooks/FormWithValidationHook";
import { AppContext } from "../../../contexts/AppContext";
import { useFormWithValidation } from "../../../hooks/FormWithValidationHook/indext";
import { mapColorToClass } from "../../../utils/GenericUtils";
import { SelectInput } from "../../inputs/SelectInput";
import { SubmitInput } from "../../inputs/SubmitInput";
import { TextInput } from "../../inputs/TextInput";

const TOAST_DELAY = 3000;

const validateDescription = (fieldValue: string) => {
  return fieldValue !== "" && fieldValue !== undefined ? true : false;
};

const validateName = (fieldValue: string) => {
  return (
    fieldValue !== undefined && fieldValue !== null && fieldValue.trim() !== ""
  );
};

const validateColor = (fieldValue: string) => {
  return (
    fieldValue !== null && fieldValue !== undefined && fieldValue.trim() !== ""
  );
};

const customTimerToast = (msg: string, toastId?: string): string => {
  return toast.custom(
    (t) => {
      const [life, setLife] = createSignal(100);
      const startTime = Date.now();
      createEffect(() => {
        if (t.paused) return;
        const interval = setInterval(() => {
          const diff = Date.now() - startTime - t.pauseDuration;
          setLife(100 - (diff / TOAST_DELAY) * 100);
        });

        onCleanup(() => clearInterval(interval));
      });

      return (
        <div
          class={`${
            t.visible ? "animate-enter" : "animate-leave"
          }  p-3 rounded-md shadow-md min-w-[150px]`}
        >
          <div class="flex">
            <div class="flex flex-1 flex-col">
              <div class="font-medium ">{msg}</div>
            </div>
          </div>
          <div class="relative pt-4">
            <div class="w-full h-1 rounded-full bg-indigo-300"></div>
            <div
              class="h-1 top-4 absolute rounded-full bg-indigo-900"
              style={{ width: `${life()}%` }}
            ></div>
          </div>
        </div>
      );
    },
    {
      duration: TOAST_DELAY,
      id: toastId,
      unmountDelay: 0,
    }
  );
};

export const NewNotebookForm: Component = () => {
  const { submit, registerField, watchField, isFieldValid } =
    useFormWithValidation();
  const [contextData, { switchTheme, switchLang }] = useContext(AppContext);
  const navigation = useNavigate();

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

  const handleSubmit = (formData: FormWithValidationField[]): void => {
    let notebook: Notebook = {
      name: formData.find((field) => field.name === "Name")?.value ?? "",
      description:
        formData.find((field) => field.name === "Description")?.value ?? "",
      color: formData.find((field) => field.name === "Color")?.value ?? "",
    };
    let notebookToast = toast.loading(
      contextData.t("components.forms.NewNotebookForm.msgLoading")
    );

    invoke("create_notebook", { notebook: notebook })
      .then((_) => {
        customTimerToast(
          contextData.t("components.forms.NewNotebookForm.msgSuccess"),
          notebookToast
        );
        setTimeout(() => {
          toast.dismiss(notebookToast);
          navigation("/", { replace: true });
        }, TOAST_DELAY + 200);
      })
      .catch((error: any) => {
        toast.error(
          contextData.t("components.forms.NewNotebookForm.msgError"),
          {
            id: notebookToast,
            duration: TOAST_DELAY - 100,
          }
        );
      });
  };

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
        {...registerField("Name", validateName, true)}
        validationMessage={
          isFieldValid("Name")
            ? undefined
            : contextData.t(
                "components.forms.NewNotebookForm.nameFieldInvalidMsg"
              )
        }
        class="mb-4 mt-4"
      />
      <TextInput
        label={contextData.t(
          "components.forms.NewNotebookForm.descriptionField"
        )}
        placeholder={contextData.t(
          "components.forms.NewNotebookForm.descriptionFieldPlaceholder"
        )}
        {...registerField("Description", validateDescription, true)}
        class="mb-4 mt-4"
        validationMessage={
          isFieldValid("Description")
            ? undefined
            : contextData.t(
                "components.forms.NewNotebookForm.descriptionFieldInvalidMsg"
              )
        }
      />
      <div class="w-full mb-4 mt-4 relative">
        <SelectInput
          label={contextData.t("components.forms.NewNotebookForm.colorField")}
          options={NOTEBOOK_COLORS}
          {...registerField("Color", validateColor, true)}
          validationMessage={
            isFieldValid("Color")
              ? undefined
              : contextData.t(
                  "components.forms.NewNotebookForm.colorFieldInvalidMsg"
                )
          }
        />
        <div class="absolute top-[4px] left-[52px]">
          <span
            class={
              "block w-5 h-5 rounded-full " +
              mapColorToClass(watchField("Color")?.value ?? "bg-black")
            }
          ></span>
        </div>
      </div>
      <div class="w-60 mt-4">
        <SubmitInput
          label={contextData.t(
            "components.forms.NewNotebookForm.submitButtonLabel"
          )}
        />
      </div>
    </form>
  );
};
