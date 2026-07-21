import { Router } from "express";
import {
  handleAllDataUpdate,
  handleGetme,
  handleLogin,
  handleLogOut,
  handleRefreshToken,
  handleRegister,
  handleUpdate,
} from "../controlers/user.controlers.js";
import { authUser } from "../middleware/auth.middleware.js";
const authRouter = Router();

// Start authRouter

authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);
authRouter.post("/refresh-token", handleRefreshToken);
authRouter.get("/get-me", authUser, handleGetme);
authRouter.post("/logOut", handleLogOut);
authRouter.put("/allUpdate/:id", authUser, handleAllDataUpdate);
authRouter.patch("/update/:id", authUser, handleUpdate);

export default authRouter;
