const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already Exists"],
    required: [true, "Username is Required"],
  },
  email: {
    type: String,
    unique: [true, "Email is Alredy exits"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    select: false,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/tegxajkzp/download.jfif",
  },
  // 2000
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // 100
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const userModel = mongoose.model("User", userShema);

module.exports = userModel;
