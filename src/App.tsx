import { Route, Routes } from "@solidjs/router";
import "./App.css";
// const Users = lazy(() => import("./pages/Users"));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>Homescreen Teste</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
