import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Usrename is Reuired"],
    unique: [true, "Usrename must be unique"],
  },
  email: {
    type: String,
    required: [true, "email is Reuired"],
    unique: [true, "email must be unique"],
  },
  password: {
    type: String,
    required: [true, "password is Reuired"],
    select: false,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
