import mongoose from "mongoose";

export const connectToDb = () => {
  try {
    mongoose.connect(
      "mongodb+srv://anilofficial62_db_user:UdY8959RjiF9cPcB@practicecluster.ktc43kv.mongodb.net/practice",
    );
    console.log("Connected To Db");
  } catch (error) {
    console.log(error);
  }
};
