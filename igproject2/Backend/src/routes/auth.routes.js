const express = require("express");
const auth = express.Router();

const {
  userRegister,
  userLogin,
  userGet,
} = require("../controllers/auth.controlers");

auth.post("/register", userRegister);

auth.get("/getData", userGet);

auth.post("/login", userLogin);

module.exports = auth;
