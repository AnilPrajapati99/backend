const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    required: [true, "imgUrl is Required for Creating an Post"],
  },
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "user id is required"],
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
