const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const authRouter = express.Router();
const crypto = require("crypto");

authRouter.post("/register", async (req, res) => {
  const { name, email, phoneNo, password } = req.body;

  const isalreadyEmail = await userModel.findOne({ email });

  if (isalreadyEmail) {
    return res.status(400).json({
      message: "Email is Already Use 🤣",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const userData = await userModel.create({
    name,
    email,
    phoneNo,
    password: hash,
  });

  const token = jwt.sign(
    {
      name,
      email,
    },
    process.env.JWT,
  );

  res.cookie("JWT_TOKEN", token);

  res.status(201).json({
    message: "User Details Create SuccessFully",
    userData,
    token,
  });
});

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);

  res.status(200).json({
    message: "This is Protected",
  });
});

// Controler

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User Not Exists Please Create User",
    });
  }

  const isPasswordMatch =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User LoggedIn",
    user,
  });
});

authRouter.get("/register", async (req, res) => {
  const data = await userModel.find();

  res.status(200).json({
    message: "Data Fetch SUccessFully",
    data,
  });
});

module.exports = authRouter;
