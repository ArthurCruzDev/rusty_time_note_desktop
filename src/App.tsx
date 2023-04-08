import { Route, Routes } from "@solidjs/router";

import { Toaster } from "solid-toast";
import "./App.css";
import { AppContext, AppContextProvider } from "./contexts/AppContext";
import { useContext, lazy } from "solid-js";

const Homepage = lazy(() => import("./pages/Homepage"));
const NewNotebook = lazy(() => import("./pages/notebooks/NewNotebook"));
const NotebookPage = lazy(() => import("./pages/notebooks/Notebook"));

function RoutesComponent() {
  const [state] = useContext(AppContext);
  return (
    <div class={state.theme == "dark" ? "dark " : "light "}>
      <Toaster />
      <div class="dark:bg-neutral-900 bg-neutral-50">
        <Routes>
          <Route path="/" component={Homepage} />
          <Route path="/notebooks/new" component={NewNotebook} />
          <Route path="/notebooks/:id" component={NotebookPage} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppContextProvider>
      <RoutesComponent />
    </AppContextProvider>
  );
}

export default App;
