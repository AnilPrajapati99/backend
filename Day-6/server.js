const app = require("./src/app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

function connectTodb() {
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connect To db");
  });
}

connectTodb();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Running in port no ${port}`);
});
