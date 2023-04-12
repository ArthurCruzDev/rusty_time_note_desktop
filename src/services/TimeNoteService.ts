import { invoke } from "@tauri-apps/api";
import { TimeNote } from "../@types/entities/TimeNote";
import dayjs, { Dayjs } from "dayjs";

export async function findAllTimeNotesByNotebookId(
  notebook_id: number
): Promise<TimeNote[] | undefined> {
  if (!Number.isInteger(notebook_id)) {
    throw Error("Informed notebook_id is not a integer");
  }
  let notebook = await invoke("find_all_timenotes_by_notebook_id", {
    notebookId: notebook_id,
  })
    .then((timenotes) => {
      return timenotes as Array<TimeNote>;
    })
    .catch((error) => console.error(error));
  if (notebook instanceof Object) {
    return notebook;
  } else {
    return undefined;
  }
}
