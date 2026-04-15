import { Router } from "express";
import {
  getMe,
  login,
  logout,
  registerUser,
} from "../controllers/auth.controllers.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", login);
authRouter.get("/get-me", authUser, getMe);
authRouter.post("/logout", authUser, logout);

export default authRouter;
