import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./feauters/auth/pages/Login";
import Register from "./feauters/auth/pages/Register";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
