import { createBrowserRouter } from "react-router-dom";
import Register from "./feauters/auth/pages/Register";
import Login from "./feauters/auth/pages/Login";
import Protected from "./feauters/auth/components/Protected";
import Home from "./feauters/home/pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
]);

export default router;
