const usermodel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function userRegister(req, res) {
  const { uname, email, password } = req.body;

  const isUserExits = await usermodel.findOne({
    $or: [{ uname }, { email }],
  });

  if (isUserExits) {
    return res.status(409).json({
      message:
        "Username Already Exits" +
        (isUserExits.email === email
          ? " Email Already Exists"
          : " UserName already Exits"),
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const userdata = await usermodel.create({
    uname,
    email,
    password: hash,
  });

  const token = jwt.sign({ id: userdata._id }, process.env.TOKEN, {
    expiresIn: "1d",
  });

  res.cookie("JWT_Token", token);

  res.status(201).json({
    message: "User Create SuccsessFully",
    user: {
      userName: userdata.uname,
      email: userdata.email,
    },
    token,
  });
}

async function userLogin(req, res) {
  const { uname, email, password } = req.body;

  const user = await usermodel.findOne({
    $or: [{ uname: uname }, { email: email }],
  });

  if (!user) {
    return res.status(409).json({
      message: "User Not Register Please First Create Register",
    });
  }

  const passwordMatch =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!passwordMatch) {
    return res.status(409).json({
      message: "Password is Incorrect",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.TOKEN, {
    expiresIn: "1d",
  });

  res.cookie("jwt_Token", token);

  res.status(200).json({
    message: "Login SuccessFully",
    user,
  });
}

async function userGet(req, res) {
  //   const { uname, email } = req.body;
  const data = await usermodel.find();

  res.status(200).json({
    message: "UserData Fatch SuccessFuly",
    data,
  });
}

module.exports = { userRegister, userLogin, userGet };
