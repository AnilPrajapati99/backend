import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
  password: {
    type: String,
    minlength: [8, "must be 8 Character Require"],
    maxlength: [12, "mAximum 12 Character"],
    select: false,
  },
});

// Hash Password Before saving

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// compare password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
