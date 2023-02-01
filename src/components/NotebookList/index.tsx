import { For, JSX } from "solid-js";

const mock = [
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

export default function NotebookList(): JSX.Element {
  const mapColorToClass = (color: string) => {
    switch (color) {
      default:
        return "bg-zinc-500";
      case "red":
        return "bg-red-700";
      case "purple":
        return "bg-purple-700";
      case "blue":
        return "bg-blue-700";
      case "green":
        return "bg-green-700";
      case "yellow":
        return "bg-yellow-700";
      case "orange":
        return "bg-orange-700";
      case "gray":
        return "bg-gray-700";
      case "black":
        return "bg-zinc-700";
    }
  };

  return (
    <div class="flex flex-col justify-center items-center h-full w-full overflow-y-auto">
      <div class="mt-5 mb-3 font-[Rubik] font-normal text-2xl w-96 text-center">
        Escolha um notebook
      </div>
      <span class="w-96 h-0.5 bg-indigo-300 mb-4"></span>
      <div class="h-full overflow-auto p-2">
        <For each={mock} fallback={<div>Loadgin...</div>}>
          {(item) => (
            <button
              class="flex flex-row items-center h-28 w-96 bg-indigo-200 mb-4 
              rounded-md drop-shadow-md
              border-solid border-2 border-l-0 border-indigo-400 hover:drop-shadow-lg"
            >
              <div class="h-full mr-4">
                <span
                  class={
                    "rounded-tl-md rounded-bl-md w-1.5 h-full block " +
                    mapColorToClass(item.color)
                  }
                ></span>
              </div>
              <div class="flex flex-col justify-start h-full p-2">
                <div class="text-left font-bold text-lg text-indigo-900 font-['Cabin'] whitespace-nowrap overflow-hidden text-ellipsis min-w-0 max-w-xs">
                  {item.title}
                </div>
                <div class="text-left font-normal text-sm text-zinc-900 font-['Rubik'] whitespace-pre-line overflow-y-clip min-w-0 min-h-0 max-w-xs max-h-14">
                  {item.description}
                </div>
              </div>
            </button>
          )}
        </For>
      </div>
    </div>
  );
}
