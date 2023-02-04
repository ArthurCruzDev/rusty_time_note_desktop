import { JSX } from "solid-js";

export type SubmitInputProps = {
  class?: string | undefined;
  label: string;
} & JSX.InputHTMLAttributes<HTMLInputElement>;
