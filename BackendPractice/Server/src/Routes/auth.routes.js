import { Router } from "express";
import {
  handleGetme,
  handleLogin,
  handleLogOut,
  handleRegister,
  verifyEmail,
} from "../controllers/auth.controllers.js";
import { authuser } from "../middleware/auth.middleware.js";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const authRouter = Router();

authRouter.post("/register", upload.single("image"), handleRegister);
authRouter.post("/login", handleLogin);
authRouter.get("/verify-email", verifyEmail);
authRouter.get("/get-me", authuser, handleGetme);
authRouter.post("/logOut", handleLogOut);

export default authRouter;
