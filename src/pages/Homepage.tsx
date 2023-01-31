import { useContext } from "solid-js";
import { AppContextData } from "../@types/contexts/AppContext";
import { AppContext } from "../contexts/AppContext";
import i18next from "i18next";

export default function Homepage() {
  const [contextData, { switchTheme, switchLang }] = useContext(AppContext);
  console.log(contextData.theme);
  return (
    <div class="w-100 flex flex-col">
      <h1
        class="w-100 text-center mt-2 text-indigo-900 dark:text-indigo-50"
        onClick={() => {
          switchTheme?.();
        }}
      >
        Rusty Time Note
      </h1>
      <h2
        onClick={() => {
          switchLang?.();
        }}
      >
        {"theme: " + contextData.theme}
        {contextData.lang + " : " + contextData.t?.("key", "hello")}
      </h2>
    </div>
  );
}
