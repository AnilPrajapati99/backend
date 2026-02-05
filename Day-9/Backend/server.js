const app = require("./src/app");
const connectTodb = require("./src/config/database");

require("dotenv").config();

connectTodb();

app.listen(3000, () => {
  console.log("Server is Connected on port 3000");
});
