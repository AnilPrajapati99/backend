import userModel from "../model/user.model.js";
import jwt, { decode } from "jsonwebtoken";

export const handleRegister = async (req, res) => {
  const { name, age, add, email, password } = req.body;

  // If User Have already

  const alreadyUser = await userModel.findOne({
    $or: [{ name }, { email }],
  });

  console.log(alreadyUser);

  if (alreadyUser) {
    return res.status(400).json({
      message: "Already User Exits Please Login",
    });
  }

  const user = await userModel.create({
    name,
    add,
    email,
    age,
    password,
  });

  res.status(200).json({
    message: "User Create  succesfully",
    data: {
      name: user.name,
      email: user.email,
      add: user.add,
    },
  });
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "PLese Register ",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Creadential",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login succesfully",
      data: {
        name: user.name,
        token: token,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const handleGetme = async (req, res) => {
  const id = req.user;
  if (!id) {
    return res.status(400).json({
      message: "Id not Found",
    });
  }
  try {
    const user = await userModel.findById(id);
    console.log(user);
    res.status(200).json({
      message: "User get Succesfully",
      data: {
        name: user.name,
        email: user.email,
        age: user.age,
        add: user.add,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const handleLogOut = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({
      message: "Toekn Not Provided",
    });
  }
  res.clearCookie("token");

  res.send("LogOut succesfully");
};

export const handleAllDataUpdate = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findByIdAndUpdate(
    id,
    { name: "linki", password: "linki@123" },
    { new: true },
  );

  res.status(201).json({
    message: "Update Succesfully",
    data: user,
  });
};

export const handleUpdate = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const user = await userModel.findById(id);
  user.password = password;
  console.log(user);

  await user.save();

  res.status(201).json({
    message: "Update Succesfully",
    data: user,
  });
};
