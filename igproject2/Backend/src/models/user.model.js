const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uname: {
    type: String,
    unique: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model("userData", userSchema);

module.exports = userModel;
