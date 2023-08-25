import {
  For,
  Show,
  createEffect,
  createSignal,
  onMount,
  useContext,
} from "solid-js";
import { AppContext } from "../../contexts/AppContext";
import { useParams } from "@solidjs/router";
import BackButton from "../../components/BackButton";
import { Notebook } from "../../@types/entities/Notebook";
import { findNotebookById } from "../../services/NotebookService";
import { TextInput } from "../../components/inputs/TextInput";
import { TimeNote } from "../../@types/entities/TimeNote";
import { findAllTimeNotesByNotebookId } from "../../services/TimeNoteService";
import styles from "./Notebook.module.css";
import dayjs from "dayjs";
import AddNotebookButton from "../../components/AddNotebookButton";

export default function NotebookPage() {
  const [contextData, { switchTheme, switchLang }] = useContext(AppContext);
  const [notebook, setNotebook] = createSignal<Notebook | undefined>(undefined);
  const [timeNotes, setTimeNotes] = createSignal<TimeNote[] | undefined>(
    undefined
  );
  const params = useParams();
  onMount(async () => {
    setNotebook(await findNotebookById(parseInt(params.id)));
  });
  createEffect(async () => {
    if (notebook() !== undefined) {
      setTimeNotes(await findAllTimeNotesByNotebookId(notebook()?.id!));
    }
  });
  return (
    <div class="flex flex-col h-screen w-screen">
      <div class="fixed top-1 left-1">
        <BackButton returnTo="/" />
      </div>
      <div class="fixed top-1 right-1">
        <AddNotebookButton returnTo="/" />
      </div>
      <Show when={notebook() !== undefined}>
        <div class="p-6 h-full w-full flex flex-col flex-nowrap items-center">
          <h1>{notebook()?.name ?? ""}</h1>
          <div class="flex flex-row w-full h-full">
            <div class="w-1/2 flex flex-col items-center">
              <h2>Apontamentos de Hora</h2>
              <div class="w-96">
                <TextInput
                  placeholder={"Pesquise um apontamento de hora"}
                  class="mb-4 mt-4"
                />
              </div>
              <div class="w-full flex flex-col items-center">
                <Show
                  when={timeNotes() != undefined && timeNotes()?.length! > 0}
                  fallback={
                    <h3 class="mt-12 w-full text-center">
                      Nenhum apontamento de hora encontrado
                    </h3>
                  }
                >
                  <For each={timeNotes()}>
                    {(item: TimeNote) => (
                      <div class={"w-3/4 p-5 " + styles.teste}>
                        <p>{item.description}</p>
                        <div class="flex flex-row flex-wrap w-full">
                          <div class="w-44">
                            {dayjs(item.start_datetime).format(
                              "DD/MM/YYYY HH:mm"
                            )}
                          </div>
                          <div class="w-44">
                            {item.finish_datetime
                              ? dayjs(item.finish_datetime).format(
                                  "DD/MM/YYYY HH:mm"
                                )
                              : " - "}
                          </div>
                        </div>
                      </div>
                    )}
                  </For>
                </Show>
              </div>
            </div>
            <div class="flex w-1/2"></div>
          </div>
        </div>
      </Show>
      <Show when={notebook() === undefined}>
        {/* TODO traduções */}
        <div class="p-6 w-full flex flex-col justify-center items-center">
          <h2>{`Falha ao carregar notebook`}</h2>
          <h2>{`Volte à tela anterior e tente novamente`}</h2>
        </div>
      </Show>
    </div>
  );
}
