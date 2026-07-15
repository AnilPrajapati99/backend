import "dotenv/config";
import app from "./src/app.js";
import { connectToDb } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

connectToDb();

app.listen(PORT, () => {
  console.log("Serevr is Running " + PORT);
});
