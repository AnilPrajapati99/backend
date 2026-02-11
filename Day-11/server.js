const app = require("./src/app");
const connectToDb = require("./src/config/ddatabase");
require("dotenv").config();

connectToDb();

app.listen(3000, () => {
  console.log("Server is rumming Port no 3000...");
});
