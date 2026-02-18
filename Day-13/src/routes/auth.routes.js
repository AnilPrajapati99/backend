const express = require("express");
const usermodel = require("../models/user.model");
const authRouter = express.Router();
const cryptp = require("crypto");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExists = await usermodel.findOne({ email });

  if (isUserExists) {
    return res.status(409).json({
      message: "User is alredy resgister with this Email . .",
    });
  }

  const hash = cryptp.createHash("md5").update(password).digest("hex");

  const user = await usermodel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT, {
    expiresIn: "1h",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "User Register Successfully",
    user,
    token,
  });
});

authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT);

  const user = await usermodel.findById(decoded.id);

  res.status(200).json({
    message: "Successfully Get",
    user,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usermodel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "User Not Exits",
    });
  }
  const passwordisWalid =
    user.password === cryptp.createHash("md5").update(password).digest("hex");

  if (!passwordisWalid) {
    return res.status(401).json({
      message: "Password is In valid",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT, {
    expiresIn: "1h",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "Login Succesfully",
    user,
  });
});

module.exports = authRouter;
