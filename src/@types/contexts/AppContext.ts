import { TFunction } from "i18next";
import { JSX } from "solid-js";

export type AppTheme = "light" | "dark";
export type AppLang = "en" | "ptbr";

export type AppContextData = {
  theme: AppTheme;
  lang: AppLang;
  t: TFunction<"translation", undefined, "translation"> | undefined;
};

export type AppContextProps = {
  theme?: AppTheme;
  lang?: AppLang;
  children?: JSX.Element | JSX.Element[];
};
