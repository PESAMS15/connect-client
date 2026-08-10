import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/Signin";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<SignIn />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;