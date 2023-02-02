import { useContext } from "solid-js";
import BackButton from "../../components/BackButton";
import { AppContext } from "../../contexts/AppContext";

export default function NewNotebook() {
  const [contextData, { switchTheme, switchLang }] = useContext(AppContext);
  return (
    <div class="flex flex-col h-screen w-screen">
      <div class="fixed top-1 left-1">
        <BackButton returnTo="/" />
      </div>
    </div>
  );
}
