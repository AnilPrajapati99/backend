import { Router } from "express";
import { handleLogin, handleRegister } from "../controlers/user.controlers.js";
const authRouter = Router();

// Start authRouter

authRouter.post("/register", handleRegister);
authRouter.post("/login", handleLogin);

export default authRouter;
