import { Router } from "express";
import { handleRegister } from "../controlers/user.controlers.js";
const authRouter = Router();

// Start authRouter

authRouter.post("/register", handleRegister);

export default authRouter;
