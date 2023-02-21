import { Component, Show, splitProps } from "solid-js";
import { TextInputProps } from "../../../@types/components/inputs/TextInput";

export const TextInput: Component<TextInputProps> = (props) => {
  const [specificProps, rest] = splitProps(props, [
    "label",
    "class",
    "validationMessage",
  ]);
  return (
    <div
      class={
        specificProps.class +
        " flex flex-col justify-center items-start max-w-full w-full relative"
      }
    >
      <span class="text-lg font-normal mb-1">{specificProps.label}</span>
      <input
        type="text"
        class="py-1 px-2 max-w-full w-full
        rounded-md bg-transparent 
        border-2 border-natural-400  
        hover:border-indigo-500 focus:border-indigo-500 
        focus-within:border-indigo-500 focus-visible:border-indigo-500 outline-none 
        placeholder:italic placeholder:text-natural-400 placeholder:text-sm"
        {...rest}
      ></input>
      <Show when={specificProps.validationMessage}>
        <span class="absolute bottom-[-28px] right-0 text-red-600">
          {specificProps.validationMessage}
        </span>
      </Show>
    </div>
  );
};
