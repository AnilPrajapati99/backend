import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { registerValidator } from "../validator/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerUser);

export default authRouter;
