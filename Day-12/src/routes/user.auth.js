const express = require("express");
const userModel = require("../models/user.model");

const userAuth = express.Router();
const jwt = require("jsonwebtoken");

const crypto = require("crypto");

userAuth.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const isEmailAlready = await userModel.findOne({ email });

  if (isEmailAlready) {
    return res.status(404).json({
      message: "Email is Alredy Use",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const userData = await userModel.create({
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      email,
    },
    process.env.JWT_TOKEN,
  );

  res.cookie("JWT-TOKEN", token);

  res.status(201).json({
    message: "User Create SuccessFullly",
    userData,
    token,
  });
});

userAuth.get("/register", async (req, res) => {
  const userDetails = await userModel.find();

  res.status(200).json({
    message: "Fetch Successfully",
    userDetails,
  });
});

userAuth.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User Not Exists..",
    });
  }

  const passwordMatch =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!passwordMatch) {
    return res.status(404).json({
      message: "PAssword Does Not Match",
    });
  }

  const token = jwt.sign(
    {
      user: user._id,
    },
    process.env.JWT_TOKEN,
  );

  res.cookie("JWTTOKEN", token);

  res.status(200).json({
    message: "Login Successfully",
    user,
  });
});

module.exports = userAuth;
