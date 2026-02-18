const express = require("express");
const userModel = require("../model/user.model");
const authRouter = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { profile } = require("console");

authRouter.post("/register", async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;

  //   const isUserExitsByEmail = await userModel.findOne({ email });

  //   if (isUserExitsByEmail) {
  //     return res.status(409).json({
  //       message: "Email is alredy Exits",
  //     });
  //   }

  //   const isUserExitsByUsername = await userModel.findOne({ username });

  //   if (isUserExitsByUsername) {
  //     return res.status(409).json({
  //       message: "username is alredy Exits",
  //     });
  //   }

  const isUserAlredyExits = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlredyExits) {
    return res.status(409).json({
      message:
        "User is Alredy Exits" +
        (isUserAlredyExits.email == email
          ? "Email is Alredy Exits"
          : "Username is Alredy Exits"),
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const userdata = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign({ id: userdata._id }, process.env.Token, {
    expiresIn: "1d",
  });

  res.cookie("JWT_TOKEN", token);

  res.status(200).json({
    message: "User Create SuccessFully",
    user: {
      email: userdata.email,
      username: userdata.username,
      bio: userdata.bio,
      profile: userdata.profileImage,
    },
    token,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password, username } = req.body;

  // LOgin email with password username with password

  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User Not Exits",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const isPasswordMatch = hash === user.password;

  if (!isPasswordMatch) {
    return res.status(404).json({
      message: "password is invalid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },

    process.env.Token,
    { expiresIn: "1d" },
  );

  res.cookie("Token", token);

  res.status(200).json({
    message: "User Login SuccessFully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
});

module.exports = authRouter;
