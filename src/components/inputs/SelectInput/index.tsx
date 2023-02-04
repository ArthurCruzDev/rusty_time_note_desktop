import { Component, For, splitProps } from "solid-js";
import { SelectInputProps } from "../../../@types/components/inputs/SelectInput";

export const SelectInput: Component<SelectInputProps> = (props) => {
  const [specificProps, rest] = splitProps(props, [
    "label",
    "class",
    "options",
  ]);
  return (
    <div
      class={
        specificProps.class +
        " flex flex-col justify-center items-start max-w-full w-full"
      }
    >
      <span class="text-lg font-normal mb-1">{specificProps.label}</span>
      <select
        class="py-1 px-2 max-w-full w-full
          rounded-md bg-transparent 
          border-2 border-natural-400  
          hover:border-indigo-500 focus:border-indigo-500 
          focus-within:border-indigo-500 focus-visible:border-indigo-500 outline-none 
          placeholder:italic placeholder:text-natural-400 placeholder:text-sm"
        {...rest}
      >
        <option hidden disabled selected value={undefined}></option>
        <For each={specificProps.options}>
          {(item) => <option value={item.value}>{item.name}</option>}
        </For>
      </select>
    </div>
  );
};
