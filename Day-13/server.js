const app = require("./src/app");

require("dotenv").config();

const connectToDb = require("./config/database");

connectToDb();

app.listen(3000, () => {
  console.log("Server is Running on Port no 3000");
});
