import { useContext } from "solid-js";
import BackButton from "../../components/BackButton";
import { NewNotebookForm } from "../../components/forms/NewNotebookForm";
import { AppContext } from "../../contexts/AppContext";

export default function NewNotebook() {
  const [contextData, { switchTheme, switchLang }] = useContext(AppContext);
  return (
    <div class="flex flex-col h-screen w-screen">
      <div class="fixed top-1 left-1">
        <BackButton returnTo="/" />
      </div>
      <div class="p-6 w-full flex flex-row flex-nowrap justify-center">
        <div>
          <h1 class="mt-14">Create a new notebook</h1>
          <h3 class="mt-2 font-semibold text-neutral-600">
            Create a new time tracking notebook. It could be for your job for
            example.
          </h3>
          <div class="w-full max-w-2xl">
            <NewNotebookForm />
          </div>
          {/* https://www.solidjs.com/examples/forms */}
          {/* https://codesandbox.io/s/solidjs-submit-form-with-store-6kh4c?file=/src/useForm.ts */}
        </div>
      </div>
    </div>
  );
}
