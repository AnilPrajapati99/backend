import {createBrowserRouter} from "react-router-dom"
import Login from "../feauter/auth/pages/Login"
import Register from "../feauter/auth/pages/Register"
import Home from "./pages/Home"
import Protected from "../feauter/auth/pages/Protected"
export const router = createBrowserRouter([
    {
        path:"/",
        element:<Protected><Home/></Protected> 
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
])