import { useContext } from "solid-js";
import { AppContextData } from "../@types/contexts/AppContext";
import { AppContext } from "../contexts/AppContext";
import i18next from "i18next";
import NotebookList from "../components/NotebookList";

export default function Homepage() {
  const [contextData, { switchTheme, switchLang }] = useContext(AppContext);
  return (
    <div class="flex flex-col h-screen w-screen">
      <h1
        class="w-full text-center font-['Cabin'] font-black mt-2 text-indigo-900 dark:text-indigo-50 "
        onClick={() => {
          switchTheme?.();
        }}
      >
        Rusty Time Note
      </h1>
      {/* <h2
        onClick={() => {
          switchLang?.();
        }}
      >
        {"theme: " + contextData.theme}
        {contextData.lang + " : " + contextData.t?.("key", "hello")}
      </h2> */}
      <div class="h-5/6">
        <NotebookList />
      </div>
    </div>
  );
}
