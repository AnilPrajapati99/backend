import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nam is must Be Required"],
    minlength: [3, "Name length is minimum is 3 character"],
    maxlength: [10, "Name length is maximum is 10 character"],
  },
  age: Number,
  add: String,
  email: {
    type: String,
    required: [true, "Email must be Required"],
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
