const app = require("./src/app");
const connectTodb = require("./src/config/databse");
require("dotenv").config();

connectTodb();

app.listen(3000, () => {
  console.log("Server is Running 3000");
});
