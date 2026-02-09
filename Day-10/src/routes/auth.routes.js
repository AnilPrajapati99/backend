const express = require("express");
const userModel = require("../model/user.model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserAlreaduExists = await userModel.findOne({ email });

  if (isUserAlreaduExists) {
    return res.status(404).json({
      message: "Email already Exists",
    });
  }

  const userData = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: userData._id,
      name: userData.email,
    },
    process.env.JWT,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user Data Create SuccessFully",
    userData,
    token,
  });
});

authRouter.get("/register", async (req, res) => {
  const userData = await userModel.find();
  res.status(200).json({
    message: "user Data Fetch SuccessFully",
    userData,
  });
});

module.exports = authRouter;
