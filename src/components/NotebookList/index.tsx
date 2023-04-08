import { useNavigate } from "@solidjs/router";
import { invoke } from "@tauri-apps/api";
import { createSignal, For, JSX, onMount, useContext } from "solid-js";
import { Notebook } from "../../@types/entities/Notebook";
import { AppContext } from "../../contexts/AppContext";
import { mapColorToClass } from "../../utils/GenericUtils";

function NotebookButton(prop: { notebookData: Notebook }): JSX.Element {
  const navigation = useNavigate();
  return (
    <button
      class="flex flex-row items-center h-28 w-96 bg-neutral-50 mb-4 
              rounded-md drop-shadow-md
              border-solid border-2 border-l-0 border-neutral-400 
              hover:drop-shadow-lg hover:border-indigo-500"
      onClick={() =>
        navigation(`/notebooks/${prop.notebookData.id}`, { replace: true })
      }
    >
      <div class="h-full mr-3">
        <span
          class={
            "rounded-tl-md rounded-bl-md w-2 h-full block " +
            mapColorToClass(prop.notebookData.color)
          }
        ></span>
      </div>
      <div class="flex flex-col justify-start h-full p-2">
        <div class="text-left font-bold text-lg text-indigo-900 font-['Cabin'] whitespace-nowrap overflow-hidden text-ellipsis min-w-0 max-w-xs">
          {prop.notebookData.name}
        </div>
        <div class="text-left font-normal text-sm text-zinc-900 font-['Rubik'] whitespace-pre-line overflow-y-clip min-w-0 min-h-0 max-w-xs max-h-14">
          {prop.notebookData.description}
        </div>
      </div>
    </button>
  );
}

function NewNotebookButton(): JSX.Element {
  const [contextData] = useContext(AppContext);
  const navigation = useNavigate();
  return (
    <button
      class="flex flex-row items-center h-28 w-96 bg-indigo-500 mb-4 
              rounded-md drop-shadow-md
              border-solid border-2 border-indigo-500 
              hover:drop-shadow-lg hover:border-indigo-200"
      onClick={() => navigation("/notebooks/new", { replace: true })}
    >
      <div class="flex flex-col justify-around h-full p-2 w-full">
        <div
          class="w-full text-center font-bold text-lg 
        text-white font-['Cabin'] whitespace-nowrap overflow-hidden 
        text-ellipsis min-w-0 max-w-full"
        >
          {contextData.t(
            "components.NotebookList.NewNotebookButton.newNotebookTitle",
            "failed to find translation"
          )}
        </div>
        <div
          class="w-full text-center font-normal text-sm 
        text-white font-['Rubik'] whitespace-pre-line overflow-y-clip 
        min-w-0 min-h-0 max-w-full max-h-14"
        >
          {contextData.t(
            "components.NotebookList.NewNotebookButton.newNotebookSubtitle",
            "failed to find translation"
          )}
        </div>
      </div>
    </button>
  );
}

export default function NotebookList(): JSX.Element {
  const [contextData] = useContext(AppContext);

  const [notebooks, setNotebooks] = createSignal<Notebook[]>([]);

  onMount(() => {
    invoke("list_all_notebooks")
      .then((notebooks) => setNotebooks(notebooks as Notebook[]))
      .catch((error) => console.error(error));
  });

  return (
    <div class="flex flex-col justify-center items-center h-full w-full overflow-y-auto">
      <div class="mt-5 mb-3 font-[Rubik] font-normal text-2xl w-96 text-center">
        {contextData.t("components.NotebookList.selectANotebook")}
      </div>
      <span class="w-96 h-0.5 bg-indigo-300 mb-4"></span>
      <div class="h-full overflow-auto p-2">
        <NewNotebookButton />
        <For each={notebooks()}>
          {(item: Notebook) => <NotebookButton notebookData={item} />}
        </For>
      </div>
    </div>
  );
}
