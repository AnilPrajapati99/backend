import userModel from "../model/user.model.js";
import jwt, { decode } from "jsonwebtoken";

const genrateAcessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};

const generateREfreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
};

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

    console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "PLese Register ",
      });
    }

    const isMatch = await user.comparePassword(password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Creadential",
      });
    }

    const accessToken = genrateAcessToken(user._id);
    const refreshToken = generateREfreshToken(user._id);

    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, //15 min
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //15 min
    });

    res.status(200).json({
      message: "Login succesfully",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const handleRefreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken);

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token not found , please login",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    console.log(decoded);

    const user = await userModel.findById(decoded.id).select("+refreshToken");

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        message: "Invalid Rfresh Token",
      });
    }

    const newAccessToken = genrateAcessToken(user._id);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      message: "accessToken REfreshed",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or Expired Refresh Token Please Login",
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
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    const decoded = decode(refreshToken);
    if (decode?.id) {
      await userModel.findByIdAndUpdate(decoded.id, { refreshToken: null });
    }
  }
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

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
