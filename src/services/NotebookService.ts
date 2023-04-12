import { invoke } from "@tauri-apps/api";
import { Notebook } from "../@types/entities/Notebook";

export async function findNotebookById(
  id: number
): Promise<Notebook | undefined> {
  if (!Number.isInteger(id)) {
    throw Error("Informed id is not a integer");
  }
  let notebook = await invoke("find_notebook_by_id", { id: id })
    .then((notebook) => notebook as Notebook)
    .catch((error) => console.error(error));
  if (notebook instanceof Object) {
    return notebook;
  } else {
    return undefined;
  }
}
