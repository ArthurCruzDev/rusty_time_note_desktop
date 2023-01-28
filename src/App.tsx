import { Route, Routes } from "@solidjs/router";
import { lazy } from "solid-js";
import "./App.css";
const Homepage = lazy(() => import("./pages/Homepage"));
// const Users = lazy(() => import("./pages/Users"));

function App() {
  return (
    <Routes>
      <Route path="/" component={Homepage} />
    </Routes>
  );
}

export default App;
