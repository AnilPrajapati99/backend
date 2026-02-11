const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // 🔥 removes spaces
    lowercase: true, // 🔥 converts to lowercase
  },
  phoneNo: {
    type: Number,
  },
  password: String,
});

const userModel = mongoose.model("data", userScheme);

module.exports = userModel;
