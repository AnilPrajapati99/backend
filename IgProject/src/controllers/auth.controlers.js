// const crypto = require("crypto");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

// const { profile } = require("console");

// Register

async function registerController(req, res) {
  const { username, email, password, bio, profileImage } = req.body;

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

  const hash = await bcrypt.hash(password, 10);

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
}

// Login

async function loginController(req, res) {
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

  const isPasswordMatch = await bcrypt.compare(password, user.password);

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
}

module.exports = {
  registerController,
  loginController,
};
