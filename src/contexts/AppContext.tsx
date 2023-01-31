import { createContext, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { AppContextProps, AppContextData } from "../@types/contexts/AppContext";
import i18next, { TFunction } from "i18next";
import en from "../locales/en/en.json";
import ptbr from "../locales/pt-br/pt-br.json";

export const AppContext = createContext<any>([
  {
    theme: "light",
    lang: "en",
    t: undefined,
  } as AppContextData,
  { switchTheme() {}, switchLang() {} },
]);

export function AppContextProvider(props: AppContextProps) {
  const [state, setState] = createStore<AppContextData>({
    theme: props.theme || "light",
    lang: props.lang || "en",
    t: undefined,
  });

  i18next
    .init({
      lng: "en", // if you're using a language detector, do not define the lng option
      debug: true,
      resources: {
        en,
        ptbr,
      },
    })
    .then((finalT) => {
      setState("t", (_) => {
        return finalT;
      });
    });

  const appContext = [
    state,
    {
      switchTheme() {
        setState("theme", (t) => {
          return t === "light" ? "dark" : "light";
        });
      },
      switchLang() {
        setState("lang", (lang) => {
          if (lang === "en") {
            i18next.changeLanguage("ptbr").then((t) => setState("t", (_) => t));
            return "ptbr";
          } else {
            i18next.changeLanguage("en").then((t) => setState("t", (_) => t));
            return "en";
          }
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
