import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";

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

    res.cookie("token", token);

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
