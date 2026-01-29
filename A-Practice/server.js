const app = require("./src/app");
const connectTodb = require("./src/");

require("dotenv").config();

connectToDb();

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server is start 3000");
});

// aJtKFtdqofkEvnji anil
