const mongoose = require("mongoose");

const userSchma = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchma);

module.exports = userModel;
