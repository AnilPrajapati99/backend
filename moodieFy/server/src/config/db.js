import mongoose from "mongoose";

export function connectToDb() {
  try {
    mongoose.connect(process.env.DB_URI);
    console.log("Server is runnig");
  } catch (error) {
    console.log(error);
  }
}
