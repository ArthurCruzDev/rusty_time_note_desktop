import { JSX } from "solid-js";
import { RiDocumentFileAddFill } from "solid-icons/ri";
import { useNavigate } from "@solidjs/router";

export default function AddNotebookButton(props: {
  returnTo: string;
}): JSX.Element {
  const navigator = useNavigate();
  return (
    <button class="">
      <RiDocumentFileAddFill
        size={48}
        class="text-neutral-700 dark:text-white"
        onClick={() => navigator(props.returnTo, { replace: true })}
      />
    </button>
  );
}
