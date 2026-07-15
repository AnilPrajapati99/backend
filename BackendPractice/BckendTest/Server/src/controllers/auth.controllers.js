import userModel from "../models/userModel.js";
import { sendResponse } from "../utlis/response.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { SendEmail } from "../service/resendEmail.js";
import imageKit from "imagekit";

const imagekit = new imageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});

export const handleRegister = async (req, res) => {
  try {
    console.time("total");
    const { name, email, password } = req.body;
    console.log(name);
    console.log(req.body);

    const isUseralredyExits = await userModel.findOne({
      $or: [{ name }, { email }],
    });

    if (isUseralredyExits) {
      return sendResponse(res, 400, "User Already Exits");
    }

    let avtarUrl = "";
    if (req.file) {
      const file = await imagekit.upload({
        file: req.file.buffer,
        fileName: "Profile",
        folder: "Test-Imagekit",
      });
      avtarUrl = file.url;
      console.log(file);
    }

    const user = await userModel.create({
      name,
      email,
      password,
      avatar: avtarUrl,
    });

    const EmailverificationToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.TOKEN,
    );

    sendResponse(res, 201, "User Register Succesfully", {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });

    await SendEmail({
      from: process.env.EMAIL,
      to:
        process.env.NODE_ENV === "production"
          ? user.email
          : "techaishorts0@gmail.com",
      subject: "Verify Your Email",
      html: `
    <h1>Verify Your Email</h1>
    <p>Click the link below to verify your email address:</p>
    <a href="${process.env.APP_URL}/api/auth/verify-email?token=${EmailverificationToken}">
      Verify my email
    </a>
    <p>This link expires in 24 hours. If you didn't sign up, ignore this email.</p>
  `,
    });
  } catch (error) {
    throw error.message;
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  console.log("token", token);
  try {
    const decode = jwt.verify(token, process.env.TOKEN);
    console.log(decode);
    const user = await userModel.findOne({ email: decode.email });

    if (!user) {
      return sendResponse(res, 400, "Error Ocured");
    }

    user.isVerified = true;
    await user.save();

    res.redirect("http://localhost:3000/");
  } catch (error) {
    return sendResponse(res, 400, "Error Ocuured", { error: error.message });
  }
};

export const handleLogin = async (req, res) => {
  try {
    console.log(process.env.TOKEN);
    const { email, password } = req.body;
    const user = await userModel
      .findOne({
        email,
      })
      .select("+password");

    if (!user) {
      return sendResponse(res, 400, "Invalid Email Or password");
    }
    console.log(password);
    const isPasswordMatch = await user.matchPassword(password);

    if (!isPasswordMatch) {
      return sendResponse(res, 400, "Password is Incorrect");
    }

    if (!user.isVerified) {
      return sendResponse(res, 400, "First Verify Your Email");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.TOKEN,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token);

    sendResponse(res, 200, "user login Succesfully", {
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    throw error;
  }
};

export const handleGetme = async (req, res) => {
  const id = req.user;
  const user = await userModel.findById(id);
  return sendResponse(res, 200, "User Fetch Succesfully", {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

export const handleLogOut = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return sendResponse(res, 400, "Token Not Provided");
  }
  res.clearCookie("token");

  return sendResponse(res, 200, "Logout Succesfully");
};
