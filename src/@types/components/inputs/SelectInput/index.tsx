import { JSX } from "solid-js";

export type SelectInputOption = {
  name: string;
  value: any;
};

export type SelectInputProps = {
  class?: string | undefined;
  label: string;
  options: SelectInputOption[];
  validationMessage?: string | undefined;
} & JSX.SelectHTMLAttributes<HTMLSelectElement>;
