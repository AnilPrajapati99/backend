import app from "./src/app.js";
import { connectToDb } from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

connectToDb();

app.listen(3000, () => {
  console.log("server is running..");
});
