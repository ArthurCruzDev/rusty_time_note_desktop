import { JSX } from "solid-js";

export type TextInputProps = {
  class?: string | undefined;
  label: string;
} & JSX.InputHTMLAttributes<HTMLInputElement>;
