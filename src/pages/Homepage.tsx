import { useContext } from "solid-js";
import { AppContextData } from "../@types/contexts/AppContext";
import { AppContext } from "../contexts/AppContext";

export default function Homepage() {
  const [, { switchTheme }] = useContext(AppContext);
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
    </div>
  );
}
