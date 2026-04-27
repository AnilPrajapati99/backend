import { createBrowserRouter } from "react-router-dom";
import Register from "./feauters/auth/pages/Register";
import Login from "./feauters/auth/pages/Login";
import Protected from "./feauters/auth/components/Protected";
import Home from "./feauters/home/pages/Home";
import MainHome from "./feauters/home/pages/MainHome";
import Navbar from "./feauters/home/components/Navbar";
import Layout from "./feauters/home/Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<MainHome/>
      },
       {
    path: "player",
    element: <Protected><Home/></Protected>
  },
]},
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
