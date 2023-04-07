import { createSignal, onMount, useContext } from "solid-js";
import { AppContext } from "../../contexts/AppContext";
import { useParams } from "@solidjs/router";
import BackButton from "../../components/BackButton";
import { Notebook } from "../../@types/entities/Notebook";
import { invoke } from "@tauri-apps/api";

export default function NotebookPage() {
  const [contextData, { switchTheme, switchLang }] = useContext(AppContext);
  const [notebook, setNotebook] = createSignal<Notebook | undefined>(undefined);
  const params = useParams();
  onMount(() => {
    invoke("load_notebook_by_id", { id: parseInt(params.id) })
      .then((notebook) => setNotebook(notebook as Notebook))
      .catch((error) => console.error(error));
  });
  return (
    <div class="flex flex-col h-screen w-screen">
      <div class="fixed top-1 left-1">
        <BackButton returnTo="/" />
      </div>
      <div class="p-6 w-full flex flex-row flex-nowrap justify-center">
        <h1>{notebook?.()?.name ?? ""}</h1>
      </div>
    </div>
  );
}
