import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./feauters/auth/pages/Login";
import Register from "./feauters/auth/pages/Register";
import Feed from "./feauters/post/pages/Feed";
import CreatePost from "./feauters/post/pages/CreatePost";

function AppRoutes() {
  console.log("App rendered");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <h1> Welcome To the Instagram Project</h1>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/feed" element={<Feed/>} />
        <Route path="/create-post" element={<CreatePost/>} />
      </Routes>
    </BrowserRouter>
    // <h1>hey</h1>
  );
}

export default AppRoutes;
