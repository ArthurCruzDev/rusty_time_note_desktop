import { createContext, createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import { AppContextProps, AppContextData } from "../@types/contexts/AppContext";

export const AppContext = createContext<any>([
  { theme: "light" } as AppContextData,
  { switchTheme() {} },
]);

export function AppContextProvider(props: AppContextProps) {
  const [state, setState] = createStore<AppContextData>({
    theme: props.theme || "light",
  });
  const appContext = [
    state,
    {
      switchTheme() {
        setState("theme", (t) => {
          return t === "light" ? "dark" : "light";
        });
      },
    },
  ];
  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
}
