import { Component, splitProps } from "solid-js";
import { SubmitInputProps } from "../../../@types/components/inputs/SubmitInput";

export const SubmitInput: Component<SubmitInputProps> = (props) => {
  const [specificProps, rest] = splitProps(props, ["label", "class"]);
  return (
    <div
      class={
        specificProps.class +
        " flex flex-col justify-center items-start max-w-full w-full"
      }
    >
      <input
        type="submit"
        class="py-1 px-2 max-w-full w-full h-12
          rounded-md
          border-2 border-natural-400  bg-indigo-500 text-white
          outline-none 
          hover:border-indigo-500 
          active:bg-white active:text-indigo-600
           uppercase text-lg font-medium"
        value={specificProps.label}
        {...rest}
      ></input>
    </div>
  );
};
