const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controlers");
const identify = require("../middlewares/auth.middleware");

const { registerController, loginController, getMeController } = authController;

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

authRouter.get("/get-me", identify, getMeController);

module.exports = authRouter;
