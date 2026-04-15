import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import blackListModel from "../models/blacklist.model.js";
import redis from "../config/cache.js";

export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isAlreadyUser = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isAlreadyUser) {
    return res.status(400).json({
      message: "User is Already Plase Login",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", token);

  res.status(201).json({
    messagae: "User Register Succesfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
}

export async function login(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "INvalid credentials",
    });
  }

  const isPAsswordMatch = await bcrypt.compare(password, user.password);

  if (!isPAsswordMatch) {
    return res.status(400).json({
      messagae: "INvalid Credentials 2",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );

  res.cookie("token", token);

  return res.status(200).json({
    messagae: "User LoggedIn Successfuly",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "user fetch Succesfully",
    user,
  });
}

export async function logout(req, res) {
  const token = req.cookies.token;
  res.clearCookie("token");

  await redis.set(token, Date.now().toString(), "EX", 60 * 60);

  res.status(201).json({
    messagae: "Logout Succesfully",
  });
}
