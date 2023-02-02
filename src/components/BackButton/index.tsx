import { JSX } from "solid-js";
import { TbArrowBack } from "solid-icons/tb";
import { useNavigate } from "@solidjs/router";

export default function BackButton(props: { returnTo: string }): JSX.Element {
  const navigator = useNavigate();
  return (
    <button class="">
      <TbArrowBack
        size={48}
        class="text-neutral-700 dark:text-white"
        onClick={() => navigator(props.returnTo, { replace: true })}
      />
    </button>
  );
}
