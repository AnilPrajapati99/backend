import mongoose from "mongoose";

export function connectTodb() {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Db is COnnected");
    })
    .catch((err) => {
      console.log(err);
    });
}
