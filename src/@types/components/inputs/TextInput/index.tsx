import { JSX } from "solid-js";

export type TextInputProps = {
  class?: string | undefined;
  label: string;
  validationMessage?: string | undefined;
} & JSX.InputHTMLAttributes<HTMLInputElement>;
