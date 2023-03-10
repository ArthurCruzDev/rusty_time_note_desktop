import { Route, Routes } from "@solidjs/router";
import { lazy, useContext } from "solid-js";
import "./App.css";
import { AppContext, AppContextProvider } from "./contexts/AppContext";
import NewNotebook from "./pages/notebooks/NewNotebook";

const Homepage = lazy(() => import("./pages/Homepage"));

function RoutesComponent() {
  const [state] = useContext(AppContext);

  return (
    <div class={state.theme == "dark" ? "dark " : "light "}>
      <div class="dark:bg-neutral-900 bg-neutral-50">
        <Routes>
          <Route path="/" component={Homepage} />
          <Route path="/notebooks/new" component={NewNotebook} />
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
