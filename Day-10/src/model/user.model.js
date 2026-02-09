const mongoose = require("mongoose");

const userData = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "This email already Existts"],
  },
  password: String,
});

const userModel = mongoose.model("userData", userData);

module.exports = userModel;
