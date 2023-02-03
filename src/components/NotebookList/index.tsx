import { useNavigate } from "@solidjs/router";
import { For, JSX, useContext } from "solid-js";
import { NotebookData } from "../../@types/components/NotebookList/NotebookData";
import { AppContext } from "../../contexts/AppContext";
import { mapColorToClass } from "../../utils/GenericUtils";

const mock: NotebookData[] = [
  {
    title: "Notebook 1",
    description: "Loren Ipsum dolor sit amet",
    color: "red",
  },
  {
    title: "Notebook 2 too long title eeeee eeee eeeee eeeeee",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    color: "purple",
  },
  {
    title: "Notebook 3",
    description: "Loren Ipsum dolor sit amet",
    color: "blue",
  },
  {
    title: "Notebook 4",
    description: "Loren Ipsum dolor sit amet",
    color: "green",
  },
  {
    title: "Notebook 5",
    description: "Loren Ipsum dolor sit amet",
    color: "yellow",
  },
  {
    title: "Notebook 6",
    description: "Loren Ipsum dolor sit amet",
    color: "orange",
  },
  {
    title: "Notebook 7",
    description: "Loren Ipsum dolor sit amet",
    color: "gray",
  },
  {
    title: "Notebook 8",
    description: "Loren Ipsum dolor sit amet",
    color: "black",
  },
];

function NotebookButton(prop: { notebookData: NotebookData }): JSX.Element {
  return (
    <button
      class="flex flex-row items-center h-28 w-96 bg-neutral-50 mb-4 
              rounded-md drop-shadow-md
              border-solid border-2 border-l-0 border-neutral-400 
              hover:drop-shadow-lg hover:border-indigo-500"
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
          {prop.notebookData.title}
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
  return (
    <div class="flex flex-col justify-center items-center h-full w-full overflow-y-auto">
      <div class="mt-5 mb-3 font-[Rubik] font-normal text-2xl w-96 text-center">
        {contextData.t("components.NotebookList.selectANotebook")}
      </div>
      <span class="w-96 h-0.5 bg-indigo-300 mb-4"></span>
      <div class="h-full overflow-auto p-2">
        <NewNotebookButton />
        <For each={mock}>
          {(item) => <NotebookButton notebookData={item} />}
        </For>
      </div>
    </div>
  );
}
