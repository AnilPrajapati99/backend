import "dotenv/config";
import app from "./src/app.js";
import { connectTodb } from "./src/config/db.js";

const PORT = process.env.PORT || 8000;

connectTodb();

app.listen(PORT, () => {
  console.log("Server is Listning", PORT);
});
