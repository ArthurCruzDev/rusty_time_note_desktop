import { JSX } from "solid-js";

export type AppTheme = "light" | "dark";

export type AppContextData = {
  theme: AppTheme;
};

export type AppContextProps = {
  theme?: AppTheme;
  children?: JSX.Element | JSX.Element[];
};
